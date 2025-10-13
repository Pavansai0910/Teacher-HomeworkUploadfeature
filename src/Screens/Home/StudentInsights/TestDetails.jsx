import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { getTopicPerformanceBySection } from "../../../Services/teacherAPIV1";
import { useSelector } from 'react-redux';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import { AuthContext } from '../../../Context/AuthContext';
import ExpandIcon from '../../../Images/StudentInsights/ExpandIcon';


const TestDetails = ({
    chapterId,
    selectedTopic,
}) => {
    const [chapterData, setChapterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const selectedAssignment = useSelector(
        (state) => state.assignment.selectedAssignment
    );
    const { teacherProfile } = useContext(AuthContext);

    useEffect(() => {
        const fetchSectionPerformance = async () => {
            if (!chapterId || !selectedTopic) return;
            try {
                setLoading(true);
                const result = await getTopicPerformanceBySection({
                    sectionId: selectedAssignment?.sectionId?._id,
                    classId: selectedAssignment?.classId?._id,
                    subjectId: selectedAssignment?.subjectId?._id,
                    chapterId,
                    topicId: selectedTopic,
                    boardId: teacherProfile?.schoolId?.boardId,
                });
                setChapterData(result.data?.data?.learningObjectives || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectionPerformance();
    }, [chapterId, selectedAssignment, selectedTopic]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#71E31C" />
            </View>
        );
    }

    return (
        <ScrollView className="px-4 py-4">
            {chapterData.map((item, index) => {
                const isExpanded = expanded === index;
                return (
                    <View
                        key={item.objectiveId}
                        className={`bg-white rounded-2xl mb-4 ${isExpanded ? 'border border-gray-300' : ''
                            }`}
                    >
                        <View className="flex-row justify-between items-start p-4">
                            <Text className="flex-1 text-[15px] font-inter500 text-gray-800 leading-6">
                                {item.objectiveName}
                            </Text>

                            <TouchableOpacity onPress={() => setExpanded(isExpanded ? null : index)}>
                                <ExpandIcon />
                            </TouchableOpacity>
                        </View>

                        {isExpanded && (
                            <View className="flex-row justify-between px-4 pb-4">
                                <View className="items-center">
                                    <Text className="text-[16px] font-bold text-gray-800">
                                        {item.weakZoneStudents.toString().padStart(2, '0')}
                                    </Text>
                                    <Text className="text-[12px] text-gray-500">Attention</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-[16px] font-bold text-gray-800">
                                        {item.learningZoneStudents.toString().padStart(2, '0')}
                                    </Text>
                                    <Text className="text-[12px] text-gray-500">Improving</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-[16px] font-bold text-gray-800">
                                        {item.strongZoneStudents.toString().padStart(2, '0')}
                                    </Text>
                                    <Text className="text-[12px] text-gray-500">Understood</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-[16px] font-bold text-gray-800">
                                        {item.nonParticipantStudents.toString().padStart(2, '0')}
                                    </Text>
                                    <Text className="text-[12px] text-gray-500">Unattempt</Text>
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
