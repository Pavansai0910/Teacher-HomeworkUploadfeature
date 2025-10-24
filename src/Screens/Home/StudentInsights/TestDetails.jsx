import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { getTopicPerformanceBySection } from "../../../Services/teacherAPIV1";
import { useSelector } from 'react-redux';
import GetFontSize from '../../../Commons/GetFontSize';
import { AuthContext } from '../../../Context/AuthContext';
import ExpandIcon from '../../../Images/StudentInsights/ExpandIcon';
import ExpandedIcon from '../../../Images/StudentInsights/ExpandedIcon';

const TestDetails = ({
    chapterId,
    selectedTopic,
}) => {
    const [chapterData, setChapterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const selectedAssignment = useSelector(
        (state) => state.assignment.selectedAssignment
    );
    const { teacherProfile } = useContext(AuthContext);
    const { width } = useWindowDimensions();

    useEffect(() => {
        const fetchSectionPerformance = async () => {
            if (!chapterId || !selectedTopic) {
                console.log('Missing chapterId or selectedTopic:', { chapterId, selectedTopic });
                return;
            }
            if (!selectedAssignment?.sectionId?._id || !selectedAssignment?.classId?._id || !selectedAssignment?.subjectId?._id) {
                console.log('Missing selectedAssignment details:', selectedAssignment);
                return;
            }
            if (!teacherProfile?.schoolId?.boardId) {
                console.log('Missing teacherProfile boardId:', teacherProfile);
                return;
            }
            try {
                setLoading(true);
                const result = await getTopicPerformanceBySection({
                    sectionId: selectedAssignment?.sectionId?._id,
                    classId: selectedAssignment?.classId?._id,
                    subjectId: selectedAssignment?.subjectId?._id,
                    chapterId: chapterId,
                    topicId: selectedTopic,
                    boardId: teacherProfile?.schoolId?.boardId,
                });
                const data = result.data?.data?.learningObjectives || [];
                setChapterData(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectionPerformance();
    }, [chapterId, selectedAssignment, selectedTopic, teacherProfile]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#71E31C" />
            </View>
        );
    }

    if (!chapterData.length) {
        return (
            <View className="flex-1 justify-center items-center px-4 py-4">
                <Text className="text-gray-500 text-center">No data available</Text>
            </View>
        );
    }

    const toggleExpand = (index) => {
        if (expanded.includes(index)) {
            setExpanded(expanded.filter(i => i !== index));
        } else {
            setExpanded([...expanded, index]);
        }
    };

    return (
        <ScrollView
            className="px-4"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{
            //     paddingBottom: 4,
            // }}
        >
            {chapterData.map((item, index) => {
                const isExpanded = expanded.includes(index);
                const isLastItem = index === chapterData.length - 1;
                return (
                    <View style={{
                        marginBottom: isLastItem ? 40 : 0
                    }}
                        key={item.objectiveId || index} className="mt-2">
                        {!isExpanded ? (
                            <View className="bg-white rounded-t-2xl">
                                <TouchableOpacity
                                    onPress={() => toggleExpand(index)}
                                    className="w-full"
                                >
                                    <View className="flex-row justify-between items-center px-4 py-4 border-b-2 border-[#E5E5E3]" style={{ width: '100%' }}>
                                        <Text style={{ fontSize: GetFontSize(15), width: '85%' }}
                                            className="font-inter500 text-gray-800 leading-6 ">
                                            {item.objectiveName}
                                        </Text>
                                        <View style={{ width: '15%', alignItems: 'flex-end' }}>
                                            <ExpandIcon />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View
                                style={{
                                    shadowColor: '#7C8DB5',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.16,
                                    shadowRadius: 3,
                                    elevation: 3,
                                    borderRadius: 16,
                                }}
                            >
                                <View className="bg-white rounded-2xl" style={{ width: '100%' }}>
                                    <TouchableOpacity
                                        onPress={() => toggleExpand(index)}
                                        className="w-full"
                                    >
                                        <View className="flex-row justify-between items-center px-4 py-2">
                                            <Text style={{ fontSize: GetFontSize(15), width: '85%' }} className="font-inter500 text-[#454F5B] leading-6">
                                                {item.objectiveName}
                                            </Text>
                                            <View style={{ width: '15%', alignItems: 'flex-end' }}>
                                                <ExpandedIcon />
                                            </View>
                                        </View>
                                        <View className="flex-row w-full px-2 pb-4 pt-2">
                                            <View
                                                style={{ width: '24%' }}
                                                className="pr-1 items-start justify-start border-r border-[#E5E5E3]"
                                            >
                                                <Text style={{ fontSize: GetFontSize(20) }} className="font-inter700 text-[#212B36] text-left">
                                                    {item.weakZoneStudents}
                                                </Text>
                                                <Text style={{ fontSize: GetFontSize(12) }} className="font-inter500 text-[#919EAB] text-left">
                                                    Attention
                                                </Text>
                                            </View>

                                            <View
                                                style={{ width: '24%' }}
                                                className="px-2 items-start justify-start border-r border-[#E5E5E3]"
                                            >
                                                <Text style={{ fontSize: GetFontSize(20) }} className="font-inter700 text-[#212B36] text-left">
                                                    {item.learningZoneStudents}
                                                </Text>
                                                <Text style={{ fontSize: GetFontSize(12) }} className="font-inter500 text-[#919EAB] text-left">
                                                    Improving
                                                </Text>
                                            </View>

                                            <View
                                                style={{ width: '28%' }}
                                                className="px-2 items-start justify-start border-r border-[#E5E5E3]"
                                            >
                                                <Text style={{ fontSize: GetFontSize(20) }} className="font-inter700 text-[#212B36] text-left">
                                                    {item.strongZoneStudents}
                                                </Text>
                                                <Text style={{ fontSize: GetFontSize(11) }} className="font-inter500 text-[#919EAB] text-left">
                                                    Understood
                                                </Text>
                                            </View>

                                            <View
                                                style={{ width: '24%' }}
                                                className="pl-2 items-start justify-start"
                                            >
                                                <Text style={{ fontSize: GetFontSize(20) }} className="font-inter700 text-[#212B36] text-left">
                                                    {item.nonParticipantStudents}
                                                </Text>
                                                <Text style={{ fontSize: GetFontSize(12) }} className="font-inter500 text-[#919EAB] text-left">
                                                    Unattempt
                                                </Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default TestDetails;