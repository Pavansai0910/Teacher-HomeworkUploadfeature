import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Dimensions } from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';


const StudentListModal = ({ visible, onClose, title, students, modalType }) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    const statusColor = modalType === 'completed' ? '#5FCC3D' : '#E87076';
    const dynamicTitle = modalType === 'completed' ? 'Students have given Assessment' : "Students haven't given Assessment";
    const paddingHorizontal = 24 * 2;
    const borderWidth = 1;
    const containerWidth = screenWidth - paddingHorizontal;
    const fullWidth = screenWidth;
    const pairInnerWidth = containerWidth;
    const leftBoxWidth = Math.floor(pairInnerWidth / 2);
    const rightBoxWidth = pairInnerWidth - leftBoxWidth;
    const singleBoxWidth = containerWidth;
    const dashLength = 5;
    const gapLength = 5;
    const lineHeight = 2;
    const numDashes = Math.ceil(fullWidth / (dashLength + gapLength));
    const baseBoxStyle = {
        height: 79,
        backgroundColor: 'white',
    };
    // Group students into rows of 2
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
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
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
                    {/* Close Button - Top Right Corner */}
                    {/* Close Button - Top Right Corner (or Left by swapping 'right' to 'left') */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 8, // Matches top-4
                            right: 13, // Matches right-10; change to 'left: 40' to test left side
                            width: 32, // w-8
                            height: 32, // h-8
                            borderRadius: 16, // rounded-full

                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1, // Ensures it layers above content
                        }}
                        onPress={onClose}
                    >
                        <Text style={{ fontSize: GetFontSize(16), color: '#454F5B' }}>
                            ✕
                        </Text>
                    </TouchableOpacity>
                    {/* Modal Content */}
                    <View className="flex-1 px-6 pt-4 pb-6">
                        {/* Student Count Circle - Centered at Top, with extra mt */}
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
                        {/* Title - Centered */}
                        <Text
                            className="text-[#454F5B] font-inter500 text-center mb-4"
                            style={{
                                fontSize: GetFontSize(16),
                                lineHeight: 21.6,
                                letterSpacing: -0.32,
                                textAlignVertical: 'center'
                            }}
                        >
                            {dynamicTitle}
                        </Text>
                        {/* Dashed Line */}
                        <View className="mb-4 border-b-2 border-dashed border-[#E5E7EB]" />

                        {/* Student List - Paired Rectangle Boxes Side by Side */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className="flex-1"
                            contentContainerStyle={{ gap: 0 }}
                        >
                            {students.length > 0 ? (
                                groupedStudents.map((row, rowIndex) => {
                                    const isFirstRow = rowIndex === 0;
                                    const isLastRow = rowIndex === groupedStudents.length - 1;
                                    const topRadius = isFirstRow ? 8 : 0;
                                    const bottomRadius = isLastRow ? 8 : 0;
                                    const topBorderWidth = isFirstRow ? borderWidth : 0;
                                    return (
                                        <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center', gap: 0 }}>
                                            {row[1] ? (
                                                <>
                                                    {/* First Student Box - Left */}
                                                    <View style={{
                                                        ...baseBoxStyle,
                                                        width: leftBoxWidth,
                                                        paddingTop: 20,
                                                        paddingLeft: 28,
                                                        paddingBottom: 20,
                                                        paddingRight: 28,
                                                        borderWidth: borderWidth,
                                                        borderColor: '#E5E7EB',
                                                        borderTopLeftRadius: topRadius,
                                                        borderBottomLeftRadius: bottomRadius,
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: 0,
                                                        borderLeftWidth: borderWidth,
                                                        borderTopWidth: topBorderWidth,
                                                        borderBottomWidth: borderWidth,
                                                        borderRightWidth: borderWidth,
                                                    }}>
                                                        {renderStudentContent(row[0])}
                                                    </View>
                                                    {/* Second Student Box - Right */}
                                                    <View style={{
                                                        ...baseBoxStyle,
                                                        width: rightBoxWidth,
                                                        paddingTop: 20,
                                                        paddingLeft: 28,
                                                        paddingBottom: 20,
                                                        paddingRight: 28,
                                                        borderWidth: borderWidth,
                                                        borderColor: '#E5E7EB',
                                                        borderTopRightRadius: topRadius,
                                                        borderBottomRightRadius: bottomRadius,
                                                        borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: 0,
                                                        borderRightWidth: borderWidth,
                                                        borderTopWidth: topBorderWidth,
                                                        borderBottomWidth: borderWidth,
                                                        borderLeftWidth: 0,
                                                    }}>
                                                        {renderStudentContent(row[1])}
                                                    </View>
                                                </>
                                            ) : (
                                                <View style={{
                                                    ...baseBoxStyle,
                                                    width: singleBoxWidth,
                                                    borderWidth: borderWidth,
                                                    borderColor: '#E5E7EB',
                                                    borderTopLeftRadius: topRadius,
                                                    borderTopRightRadius: topRadius,
                                                    borderBottomLeftRadius: bottomRadius,
                                                    borderBottomRightRadius: bottomRadius,
                                                    borderTopWidth: topBorderWidth,
                                                    borderBottomWidth: borderWidth,
                                                    paddingTop: 20,
                                                    paddingRight: 28,
                                                    paddingBottom: 20,
                                                    paddingLeft: 28,
                                                }}>
                                                    {renderStudentContent(row[0])}
                                                </View>
                                            )}
                                        </View>
                                    );
                                })
                            ) : (
                                <Text className="text-[#9CA3AF] font-inter400 text-center mt-8" style={{ fontSize: GetFontSize(14) }}>
                                    No students found.
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default StudentListModal;

