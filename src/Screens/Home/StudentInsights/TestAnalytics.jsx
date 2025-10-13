import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import capitalize from '../../../Utils/Capitalize';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../Context/AuthContext';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import GetFontSize from '../../../Commons/GetFontSize';
import { getAllStudents } from '../../../Services/teacherAPIV1';
import StudentListModal from './StudentListModal';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import { useRoute } from '@react-navigation/native';


const TestAnalytics = ({ selectedTopic }) => {
    const navigation = useNavigation();
    const [studentData, setStudentData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [completedCount, setCompletedCount] = useState(0);
    const [notCompletedCount, setNotCompletedCount] = useState(0);
    const { teacherProfile } = useContext(AuthContext);
    const selectedAssignment = useSelector(
        (state) => state.assignment.selectedAssignment
    );


    useEffect(() => {
        const getData = async () => {
            try {
                setStudentData([]);
                const response = await getAllStudents({
                    sectionId: selectedAssignment?.sectionId?._id,
                    classId: selectedAssignment?.classId?._id,
                    schoolId: teacherProfile?.schoolId._id,
                    subjectId: selectedAssignment?.subjectId?._id,
                });
                const data = response.data?.data || [];
                setStudentData(data);
                const completed = data.filter(student => student.completed).length;
                const notCompleted = data.length - completed;
                setCompletedCount(completed);
                setNotCompletedCount(notCompleted);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [selectedAssignment]);


    const handleViewDetails = (type) => {
        const filtered = studentData.filter(student =>
            (type === 'completed' && student.completed) ||
            (type === 'notCompleted' && !student.completed)
        );

        const title = type === 'completed' ? 'Students Who Completed Assessment' : 'Students Who Haven\'t Completed Assessment';

        setModalType(type);
        setFilteredStudents(filtered);
        setModalTitle(title);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setFilteredStudents([]);
        setModalTitle('');
    };

    return (
        <View className="flex-1 w-full bg-white justify-start">

            {/* Your page content goes here */}
            <View className="flex-1 px-6 py-4">
                <View className="flex-row gap-[10px]">
                    <View className="flex-1 rounded-[16px] p-4 border-t-2 border-r-2 border-b-4 border-l-2 border-[#E5E5E3] flex-col justify-between">
                        <View className="flex-col items-center gap-[10px]">
                            <View className="w-[30px] h-[30px] rounded-full bg-[#5FCC3D] justify-center items-center">
                                <Text className="text-white font-inter700" style={{ fontSize: GetFontSize(20) }}>
                                    {completedCount}
                                </Text>
                            </View>
                            <Text className="text-[#454F5B] font-inter400 text-center" style={{ fontSize: GetFontSize(12) }}>
                                Students have given Assessment
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="self-center px-6 py-1 rounded-[17.19px] px-5 py-1 bg-[#A88462] border-t-2 border-r-2 border-b-4 border-l-2 border-[#836549] mt-2"
                            onPress={() => {
                                Vibration.vibrate(50);
                                handleViewDetails('completed');
                            }}
                        >
                            <Text className="text-white font-inter400 text-center mt-0.5" style={{ fontSize: GetFontSize(11) }}>
                                View Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 rounded-[16px] p-4 border-t-2 border-r-2 border-b-4 border-l-2 border-[#E5E5E3] flex-col justify-between">
                        <View className="flex-col items-center gap-[10px]">
                            <View className="w-[30px] h-[30px] rounded-full bg-[#E87076] justify-center items-center">
                                <Text className="text-white font-inter700" style={{ fontSize: GetFontSize(20) }}>
                                    {notCompletedCount}
                                </Text>
                            </View>
                            <Text className="text-[#454F5B] font-inter400 text-center" style={{ fontSize: GetFontSize(12) }}>
                                Students haven't given Assessment
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="self-center w-[112px] h-[33px] rounded-[17.19px] px-5 py-1 bg-[#A88462] border-t-2 border-r-2 border-b-4 border-l-2 border-[#836549] mt-2"
                            onPress={() => {
                                Vibration.vibrate(50);
                                handleViewDetails('notCompleted');
                            }}
                        >
                            <Text className="text-white font-inter400 text-center mt-0.5" style={{ fontSize: GetFontSize(11) }}>
                                View Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            {/* Separate Modal Component */}
            <StudentListModal
                visible={showModal}
                onClose={closeModal}
                title={modalTitle}
                students={filteredStudents}
                modalType={modalType}
                selectedTopic={selectedTopic}
            />

        </View>
    );
};

export default TestAnalytics;

