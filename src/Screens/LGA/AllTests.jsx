import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  useWindowDimensions,
  Modal,
  TextInput,
  StyleSheet
} from 'react-native';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import GetFontSize from '../../Commons/GetFontSize';
import { AuthContext } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';
import { getAllAssignedExam, testReport } from '../../Services/StudentAPIV1';
import Loader from '../../Commons/Loader';
import { formatDate } from '../../Utils/formatDate';
import LeftArrowIconWhite from '../../Images/svg/LeftArrowIconWhite';
import DropDownArrow from '../../Images/svg/DropdownArrow';
import LeftArrow from '../../Images/svg/LeftArrow';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReportPopup from '../../Popup/ReportPopup';

function AllTests({ route }) {
  const navigation = useNavigation();
  const { studentProfile } = useContext(AuthContext);

  const { height } = useWindowDimensions();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status'); // 'All' is default
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [testGivenStatus, setTestGivenStatus] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null)
  const [showReport, setShowReport] = useState(false)

  const STATUS_OPTIONS = [
    { label: 'All Status', value: 'All Status' },
    { label: 'Assigned', value: 'Assigned' }, // not completed & not expired
    { label: 'Completed', value: 'Completed' }, // isCompleted
    { label: 'Due Date Expired', value: 'Expired' }, // isExpired
  ];

  const getFilteredExamData = () => {
    if (!examData) return [];
    if (selectedStatus === 'All Status') return examData;
    if (selectedStatus === 'Assigned')
      return examData.filter(e => !e.isCompleted && !e.isExpired);
    if (selectedStatus === 'Completed')
      return examData.filter(e => e.isCompleted);
    if (selectedStatus === 'Expired') return examData.filter(e => e.isExpired);
    return examData;
  };

  useEffect(() => {
    // Clear any previous timeout to reset the timer
    const debounceTimer = setTimeout(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const response = await getAllAssignedExam({
            studentId: studentProfile?._id,
            subjectId: route.params.subjectId,
            page: currentPage,
            limit: 10
          });
          setExamData(response.data.exams);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        } catch (error) {
          if (error.response.status !== 404 && error.response.status !== 400) {
            Toast.show({
              type: 'error',
              text1: 'Failed to get assigned exams',
            });
          }
          setLoading(false);

        } finally {
          setLoading(false);
        }
      };
      getData();
    }, 500); // 300ms debounce delay

    // Cleanup function to clear the timer if the component unmounts or currentPage changes again
    return () => clearTimeout(debounceTimer);
  }, [currentPage]);


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF] ">
      <View className="mt-[20px]">
        <View className="flex flex-row justify-start items-center">
          <TouchableOpacity
            className="ml-4 flex flex-row justify-center items-center "
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="ml-3 font-poppins600 text-[#33569F]">
              {route.params?.subjectName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

      <View className="mt-[6%] px-[6%] flex flex-row justify-between">
        <Text
          style={{ fontSize: GetFontSize(18) }}
          className="text-[#06286E] font-poppins600">
          Tests
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => setStatusDropdownOpen(prev => !prev)}

            className="py-3 px-5 flex flex-row items-center bg-[#E6F0FF] rounded-md">
            <Text
              style={{ fontSize: GetFontSize(12) }}
              className="text-[#5B77B0] font-inter700 line-clamp-1">
              {selectedStatus}
            </Text>
            {statusDropdownOpen ? (
              <DropDownArrow size={16} flip={'up'} color={'#5B77B0'} />
            ) : (
              <DropDownArrow size={16} flip={'down'} color={'#5B77B0'} />
            )}
          </TouchableOpacity>

          {/* Dropdown Options */}
          {statusDropdownOpen && (
            <View className="absolute z-10 top-10 w-full h-auto bg-[#E6F0FF] rounded-md">
              {STATUS_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    setSelectedStatus(opt.value);
                    setStatusDropdownOpen(false);
                  }}
                  className="p-2">
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className={`${selectedStatus === opt.value
                      ? 'text-[#33569F] font-poppins600'
                      : 'text-[#5B77B0]'
                      }`}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <ReportPopup
        open={showReport}
        onClose={() => setShowReport(false)}
        studentId={studentProfile?._id}
        examId={selectedExamId}
        showGiveTestButton={testGivenStatus}
      />

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={showPopup}
        onRequestClose={!showPopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowPopup(false)} className="absolute top-1 right-3 z-10">
              <Text className="text-gray-500 text-4xl font-normal">&times;</Text>
            </TouchableOpacity>

            <View className="flex flex-col space-y-4 mt-2">
              <Text className="text-base xl:text-lg font-semibold text-gray-800 text-center">Submit Report and Retake Test</Text>

              <TextInput
                className=" h-32 p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your report message here..."
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />

              <View className="w-full grid grid-cols-2 gap-3 mt-[18px]">
                <TouchableOpacity
                  className={`py-2 bg-[#33569F] text-white rounded-md transition-colors duration-200 text-[12px] xl:text-base cursor-pointer ${!description.trim() ? 'opacity-50' : 'hover:bg-[#1E428C]'
                    }`}
                  onPress={sendReport}
                >
                  <Text className="text-white text-center">Submit Report</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2 bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 text-[12px] xl:text-base cursor-pointer hover:bg-gray-300"
                  onPress={() => {
                    setShowPopup(false);
                    navigation.navigate('LGATestScreen', {
                      examId: selectedExamId,
                    })
                  }}
                >
                  <Text className="text-gray-800 text-center">Give Test Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal> */}


      <View>
        <ScrollView
          style={{ height: height * 0.67 }}
          className="mt-7 px-6 w-full">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!examData || getFilteredExamData().length === 0 ? (
                <Text className="text-center text-[#4473D3] pt-20">
                  No Test Assigned to you
                </Text>
              ) : (
                getFilteredExamData().map((assessment, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (!assessment.isCompleted && assessment.isProcessing && assessment.completionStatus === "Processing") {
                        setShowPopup(true);
                        setSelectedExamId(assessment.examId);
                        return
                      } else if (assessment.isCompleted || assessment.isExpired || assessment.isProcessing) {
                        Toast.show({
                          type: 'error',
                          text1: 'Test already completed or expired',
                        });
                        return;
                      }
                      navigation.navigate('LGATestScreen', {
                        examId: assessment.examId,
                      })
                    }}
                    key={index} className="overflow-hidden"
                  >
                    <View
                      style={{ height: height * 0.14 }}

                      className={`relative ${assessment.isCompleted || assessment.isExpired || assessment.isProcessing
                        ? 'bg-[#E5E7EB]'
                        : 'bg-[#4473D3]'
                        } rounded-[14px] mb-4`}>
                      <View
                        style={{ paddingTop: height * 0.07 }}
                        className={`absolute border-b-[0.25px] ${assessment.isCompleted || assessment.isExpired || assessment.isProcessing
                          ? 'border-[#33569F]'
                          : 'border-[#ECEAEA]'
                          }
                    w-screen`}
                      />
                      <View className="px-[18px]">
                        <View
                          style={{ height: height * 0.08 }}
                          className="pt-[3%] flex flex-row justify-between">
                          <View className="w-[75%]">
                            <Text
                              style={{ fontSize: GetFontSize(14) }}
                              className={`font-poppins500 ${assessment.isCompleted || assessment.isExpired || assessment.isProcessing
                                ? 'text-[#33569F]'
                                : 'text-white'
                                } line-clamp-2`}>
                              {assessment.questionPaperTitle}
                            </Text>
                          </View>
                          <View>
                            <LeftArrowIconWhite />
                          </View>
                        </View>
                        <View className="pt-2 flex flex-row justify-between">
                          <View>
                            <Text
                              style={{ fontSize: GetFontSize(10) }}
                              className={`${assessment.isCompleted || assessment.isExpired || assessment.isProcessing
                                ? 'text-[#33569F]'
                                : 'text-white'
                                }`}>
                              Assigned at: {formatDate(assessment.assignedAt)}
                            </Text>
                            <Text
                              style={{ fontSize: GetFontSize(10) }}
                              className={`${assessment.isCompleted || assessment.isExpired || assessment.isProcessing
                                ? 'text-[#33569F]'
                                : 'text-white'
                                }`}>
                              Deadline: {formatDate(assessment.deadline)}
                            </Text>
                          </View>
                          <View className="mr-2">
                            {
                              !assessment.isCompleted && assessment.isProcessing && assessment.completionStatus === "Processing" ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    setTestGivenStatus(assessment.isCompleted);
                                    setShowReport(true);
                                    setSelectedExamId(assessment.examId);
                                  }
                                  }
                                  className="bg-[#FADCDC] px-2 py-1 rounded-full"
                                ><Text style={{ fontSize: GetFontSize(10) }}
                                  className="text-[#DD2222]"
                                >
                                    Report
                                  </Text>
                                </TouchableOpacity>
                              )
                                :
                                assessment.isCompleted ? (
                                  <TouchableOpacity className="bg-[#EFFBF2] px-2 py-1 rounded-full">
                                    <Text
                                      style={{ fontSize: GetFontSize(10) }}
                                      className="text-[#34C759]">
                                      Completed
                                    </Text>
                                  </TouchableOpacity>
                                ) : assessment.isExpired ? (
                                  <TouchableOpacity className="bg-[#FADCDC] px-2 py-1 rounded-full">
                                    <Text
                                      style={{ fontSize: GetFontSize(10) }}
                                      className="text-[#DD2222]">
                                      Due date expired
                                    </Text>
                                  </TouchableOpacity>
                                ) : assessment.isProcessing ? (
                                  <TouchableOpacity className="bg-[#FADCDC] px-2 py-1 rounded-full">
                                    <Text
                                      style={{ fontSize: GetFontSize(10) }}
                                      className="text-[#33569F]">
                                      Analyzing your test
                                    </Text>
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('LGATestScreen', {
                                        examId: assessment.examId,
                                      })
                                    }
                                    className="bg-[#FFEACC] px-2 py-1 rounded-full">
                                    <Text
                                      style={{ fontSize: GetFontSize(10) }}
                                      className="text-[#FF9500]">
                                      Assigned
                                    </Text>
                                  </TouchableOpacity>
                                )}
                          </View>
                          <View
                            // name='Report test'
                            className='cursor-pointer'
                            onPress={() => {
                              setShowReport(true);
                              setTestGivenStatus(assessment.isCompleted);
                              setSelectedExamId(assessment.examId);
                            }}>
                            {/* <EllipsisVertical color='#06286E' /> */}
                            <Text>RRR</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </>
          )}
        </ScrollView>

        <View className='mt-5 flex flex-row justify-between mx-10'>
          <TouchableOpacity
            disabled={loading}
            className={` flex flex-row items-center gap-2 ${currentPage === 1 && 'invisible'} disabled:opacity-50 `}
            onPress={handlePreviousPage}
          >
            <LeftArrow width={12} height={12} />
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className='font-inter600 text-[#33569F]'
            >Previous</Text>
          </TouchableOpacity>

          <Text
            style={{ fontSize: GetFontSize(14) }}
            className='font-inter600 text-[#33569F]'
          >
            {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            disabled={loading}
            onPress={handleNextPage}
            className={` flex flex-row items-center gap-2 disabled:opacity-50 ${currentPage >= totalPages && 'invisible'} `}
          >
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className='font-inter600 text-[#33569F]'
            >Next</Text>
            <LeftArrow width={12} height={12} flip={true} />
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default AllTests;

