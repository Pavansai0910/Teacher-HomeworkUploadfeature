import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Dimensions, ActivityIndicator } from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import { getExamParticipationByTopic } from '../../../Services/teacherAPIV2';
import { useSelector } from 'react-redux';

const StudentListModal = ({ visible, onClose, modalType, selectedTopic }) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedAssignment = useSelector((state) => state.assignment.selectedAssignment);

    const statusColor = modalType === 'completed' ? '#5FCC3D' : '#E87076';
    const dynamicTitle =
        modalType === 'completed'
            ? 'Students have given Assessment'
            : "Students haven't given Assessment";

    useEffect(() => {
        const fetchStudents = async () => {
            if (!visible || !selectedTopic) return;

        console.log('Calling API with:', {
            classId: selectedAssignment?.classId?._id,
            sectionId: selectedAssignment?.sectionId?._id,
            subjectId: selectedAssignment?.subjectId?._id,
            topicId: selectedTopic,
        });

            try {
                setLoading(true);
                const response = await getExamParticipationByTopic({
                    classId: selectedAssignment?.classId?._id,
                    sectionId: selectedAssignment?.sectionId?._id,
                    subjectId: selectedAssignment?.subjectId?._id,
                    topicId: selectedTopic,
                });

                console.log('API Response (Exam Participation):', response.data);

                const allStudents =
                    modalType === 'completed'
                        ? response.data?.data?.completedStudents || []
                        : response.data?.data?.notCompletedStudents || [];

                setStudents(allStudents);
            } catch (error) {
                console.log('Failed to fetch student list:', error.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [visible, selectedTopic, modalType]);

    const groupedStudents = [];
    for (let i = 0; i < students.length; i += 2) {
        groupedStudents.push(students.slice(i, i + 2));
    }

    const renderStudentContent = (student) => (
        <>
            <Text
                className="text-[#212B36] font-inter600 mb-1"
                style={{ fontSize: GetFontSize(14) }}
                numberOfLines={2}
            >
                {student.name || student.studentName || 'Unknown Student'}
            </Text>
            <Text
                className="text-[#9CA3AF] font-inter400"
                style={{ fontSize: GetFontSize(12) }}
            >
                Roll no. {student.rollNo || student.rollNumber || ''}
            </Text>
        </>
    );

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: '#00000033', justifyContent: 'flex-end' }}>
                <View
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: screenHeight * 0.6,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }}
                >
                    {/* Close Button */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 13,
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                        }}
                        onPress={onClose}
                    >
                        <Text style={{ fontSize: GetFontSize(16), color: '#454F5B' }}>✕</Text>
                    </TouchableOpacity>

                    <View className="flex-1 px-6 pt-4 pb-6">
                        {/* Student Count Circle */}
                        <View className="items-center mb-3 mt-4">
                            <View
                                className="w-[30px] h-[30px] rounded-full justify-center items-center"
                                style={{ backgroundColor: statusColor }}
                            >
                                <Text className="text-white font-inter700" style={{ fontSize: GetFontSize(20) }}>
                                    {students.length}
                                </Text>
                            </View>
                        </View>

                        {/* Title */}
                        <Text
                            className="text-[#454F5B] font-inter500 text-center mb-4"
                            style={{
                                fontSize: GetFontSize(16),
                                lineHeight: 21.6,
                                letterSpacing: -0.32,
                            }}
                        >
                            {dynamicTitle}
                        </Text>

                        <View className="mb-4 border-b-2 border-dashed border-[#E5E7EB]" />

                        {loading ? (
                            <View className="flex-1 justify-center items-center">
                                <ActivityIndicator size="large" color={statusColor} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                                {students.length > 0 ? (
                                    groupedStudents.map((row, rowIndex) => (
                                        <View
                                            key={rowIndex}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {row.map((student, colIndex) => (
                                                <View
                                                    key={colIndex}
                                                    style={{
                                                        width: groupedStudents.length > 1 ? '50%' : '100%',
                                                        borderWidth: 1,
                                                        borderColor: '#E5E7EB',
                                                        paddingVertical: 20,
                                                        paddingHorizontal: 28,
                                                        backgroundColor: 'white',
                                                    }}
                                                >
                                                    {renderStudentContent(student)}
                                                </View>
                                            ))}
                                        </View>
                                    ))
                                ) : (
                                    <Text
                                        className="text-[#9CA3AF] font-inter400 text-center mt-8"
                                        style={{ fontSize: GetFontSize(14) }}
                                    >
                                        No students found.
                                    </Text>
                                )}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default StudentListModal;
