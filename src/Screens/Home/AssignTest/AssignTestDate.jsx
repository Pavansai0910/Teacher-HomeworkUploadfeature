import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import capitalize from '../../../Utils/Capitalize';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import { assignExam, downloadExam } from '../../../Services/teacherAPIV1';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../../Context/AuthContext';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs';
import NavHeader from '../../NavHeader';
import GetFontSize from '../../../Commons/GetFontSize';
import LinearGradient from 'react-native-linear-gradient';
import AssignSuccessScreen from './AssignSuccessScreen';
import Calendar from '../../../Images/LessonPlan/Calendar';
import ViewIcon from '../../../Images/AssignTestCard/ViewIcon';
import PdfViewerModal from './PdfViewerModal';
import ReactNativeBlobUtil from 'react-native-blob-util';
import TestLoader from '../../../Commons/TestAnimateLoader/TestLoader';

const AssignTestDate = ({ route }) => {
  const navigation = useNavigation();
  const questionPaper = route.params.questionPaper;
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );
  const { teacherProfile } = useContext(AuthContext);

  const [dueDate, setDueDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');


  const [showTestLoader, setShowTestLoader] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const { width, height } = useWindowDimensions();

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalize(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  const formatDate = date => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate && pickerTarget === 'due') {
      setDueDate(selectedDate);
    }
  };

  // Assign test after loader finishes
  const assignTestAfterLoader = async () => {
    setShowLoader(true);
    const selectedDateObj = new Date(dueDate);
    selectedDateObj.setUTCHours(18, 29, 59, 999);

    try {
      const classId = selectedAssignment?.classId?._id;
      const subjectId = selectedAssignment?.subjectId?._id;
      const sectionId = selectedAssignment?.sectionId?._id;

      const payload = {
        boardId: teacherProfile?.schoolId?.boardId,
        teacherId: teacherProfile?._id,
        classIds: [classId],
        sectionIds: [sectionId],
        subjectIds: [subjectId],
        chapterId: questionPaper.chapterId,
        questionPaperIds: [questionPaper._id],
        deadline: selectedDateObj.toISOString(),
      };

      await assignExam(payload);
      setShowLoader(false);
      setShowTestLoader(false);
      setShowSuccessScreen(true);
    } catch (error) {
      setShowLoader(false);
      setShowTestLoader(false);
      Toast.show({ type: 'error', text1: 'Failed to assign the exam' });
    }
  };

  // When user clicks Assign Test button
  const handleAssign = () => {
    setShowTestLoader(true);
  };

  // const handleExamDownload = async questionPaperCode => {
  //   setDownloadLoader(true);
  //   const hasPermission = await requestStoragePermission();
  //   if (!hasPermission) {
  //     setDownloadLoader(false);
  //     return;
  //   }
  //   try {
  //     const response = await downloadExam({
  //       questionPaperCode: questionPaperCode,
  //     });
  //     const base64Data = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(response.data);
  //       reader.onloadend = () => {
  //         const base64 = reader.result.split(',')[1];
  //         resolve(base64);
  //       };
  //       reader.onerror = reject;
  //     });
  //     const directoryPath = `${DownloadDirectoryPath}/Adaptmate Educator App`;
  //     const checkDirectory = await RNFS.exists(directoryPath);
  //     if (!checkDirectory) {
  //       await RNFS.mkdir(directoryPath);
  //     }
  //     const path = `${directoryPath}/LGA_${Date.now()}.pdf`;
  //     await RNFS.writeFile(path, base64Data, 'base64');
  //     Toast.show({
  //       type: 'success',
  //       text1: `Saved in Download/Adaptmate Educator App`,
  //     });
  //     setDownloadLoader(false);
  //   } catch (error) {
  //     console.error('RNFS Write Error:', error);
  //     setDownloadLoader(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Download Failed',
  //       text2: 'Could not save file. Check permissions or internal file error.',
  //     });
  //   } finally {
  //     setDownloadLoader(false);
  //   }
  // };



  // Success screen actions
  const handleViewAssignedTests = () => {
    setShowSuccessScreen(false);
    navigation.navigate('AssignedTests');
  };

  const handleCloseSuccess = () => {
    setShowSuccessScreen(false);
    navigation.navigate('MainTabNavigator', { screen: 'Home' });
  };

  // const handleViewPdf = async (questionPaperCode) => {
  //   try {
  //     setDownloadLoader(true);

  //     // Request the PDF from backend
  //     const response = await downloadExam({ questionPaperCode });
  //     console.log('downloadExam response:', response?.data);

  //     // Case 1: Backend returns a direct URL to PDF
  //     if (response?.data?.url && response.data.url.endsWith('.pdf')) {
  //       setPdfUrl(response.data.url);
  //       setShowPdfViewer(true);
  //     }

  //     // Case 2: Backend returns base64 string directly
  //     else if (typeof response?.data === 'string' && response.data.startsWith('JVBER')) {
  //       const path = `${RNFS.CachesDirectoryPath}/temp_${Date.now()}.pdf`;
  //       await RNFS.writeFile(path, response.data, 'base64');
  //       setPdfUrl(`file://${path}`);
  //       setShowPdfViewer(true);
  //     }

  //     // Case 3: Backend returns blob object with blobId
  //     else if (response?.data?._data?.blobId) {
  //       const blobId = response.data._data.blobId;

  //       // Fetch the actual PDF binary from your API
  //       const base64Data = await ReactNativeBlobUtil.fetch(
  //         'GET',
  //         `https://your-backend-api.com/download/${blobId}`,
  //       ).then(res => res.base64());

  //       const path = `${RNFS.CachesDirectoryPath}/temp_${Date.now()}.pdf`;
  //       await RNFS.writeFile(path, base64Data, 'base64');
  //       setPdfUrl(`file://${path}`);
  //       setShowPdfViewer(true);
  //     }

  //     else {
  //       Toast.show({ type: 'error', text1: 'Unsupported PDF format received' });
  //       console.log('Unknown PDF data type:', response?.data);
  //     }
  //   } catch (error) {
  //     console.error('PDF Load Error:', error);
  //     Toast.show({ type: 'error', text1: 'Failed to load PDF' });
  //   } finally {
  //     setDownloadLoader(false);
  //   }
  // };

  const handleViewPdf = async (questionPaperCode) => {
    try {
      setDownloadLoader(true);

      // Request the PDF from backend
      const response = await downloadExam({ questionPaperCode });
      console.log('downloadExam response type:', typeof response?.data);
      console.log('downloadExam response:', response);

      let base64Data = '';

      // Case 1: Response is already a Blob
      if (response?.data instanceof Blob) {
        base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(response.data);
        });
      }
      // Case 2: Response.data is ArrayBuffer or Uint8Array
      else if (response?.data instanceof ArrayBuffer || response?.data instanceof Uint8Array) {
        const uint8Array = new Uint8Array(response.data);
        let binary = '';
        for (let i = 0; i < uint8Array.byteLength; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        base64Data = btoa(binary);
      }
      // Case 3: Response.data is already base64 string
      else if (typeof response?.data === 'string') {
        // Check if it starts with data:application/pdf
        if (response.data.startsWith('data:application/pdf')) {
          base64Data = response.data.split(',')[1];
        } 
        // Check if it's already base64 (starts with JVBERi which is %PDF in base64)
        else if (response.data.startsWith('JVBER')) {
          base64Data = response.data;
        }
        // Otherwise, it might be a URL
        else if (response.data.startsWith('http')) {
          setPdfUrl(response.data);
          setShowPdfViewer(true);
          setDownloadLoader(false);
          return;
        }
      }
      // Case 4: Response has a nested structure
      else if (response?.data?.data) {
        // Recursively handle nested data
        const nestedBlob = response.data.data;
        if (nestedBlob instanceof Blob) {
          base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result.split(',')[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(nestedBlob);
          });
        }
      }

      if (!base64Data) {
        throw new Error('Unable to extract PDF data from response');
      }

      // Save to cache and display
      const path = `${RNFS.CachesDirectoryPath}/temp_${Date.now()}.pdf`;
      await RNFS.writeFile(path, base64Data, 'base64');
      console.log('PDF saved to:', path);
      
      // Verify file was written correctly
      const fileStats = await RNFS.stat(path);
      console.log('PDF file size:', fileStats.size);
      
      if (fileStats.size === 0) {
        throw new Error('PDF file is empty after writing');
      }
      
      setPdfUrl(`file://${path}`);
      setShowPdfViewer(true);
    } catch (error) {
      console.error('PDF Load Error:', error);
      console.error('Error details:', error.message);
      Toast.show({ 
        type: 'error', 
        text1: 'Failed to load PDF',
        text2: error.message || 'Please try again'
      });
    } finally {
      setDownloadLoader(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      {/* Scrollable Content */}
      <ScrollView>
        <NavHeader />

        {/* Progress Steps */}
        <View
          className="mt-3 bg-[#FED570] rounded-[20px] border-2 border-[#E5E5E5] mx-4"
          style={{ padding: 24 }}
        >
          <View className="flex-row items-center justify-between">
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-white items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className="font-inter600"
                  >
                    1
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-1 h-[3px] bg-white" />
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-white items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className="font-inter600"
                  >
                    2
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-1 h-[2px] bg-white" />
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className="text-[#212B36] font-inter600"
                  >
                    3
                  </Text>
                </View>
                <Text
                  style={{ fontSize: GetFontSize(12) }}
                  className="text-white font-inter600"
                >
                  Assign Test
                </Text>

              </View>
            </View>
          </View>

          <View
            className="flex-1 h-0 border-t-2 mt-8 border-[#F7F7F5]"
            style={{ borderStyle: 'dashed' }}
          />

          {/* Content */}
          {/* <View className="rounded-xl mb-6 mt-8">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-[#B68201] font-inter700 mb-2 text-center"
              >
                Ready to plan smarter?
              </Text>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="text-[#B68201] text-center font-inter500"
              >
                Just select a deadline for your students, and{'\n'}you're good
                to go!
              </Text>
            </View>
          </View> */}

          {/* Due Date Input */}
          <View className="mb-6 items-center mt-3">
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#B68201] mb-2 font-inter500 self-start"
            >
              Select Due Date <Text className="text-[#E74C3C]">*</Text>
            </Text>


            <LinearGradient
              colors={['#E8B787', '#9B7A5A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: width * 0.8,
                height: height * 0.07,
                borderRadius: 12,
                paddingTop: 1.5,
                paddingLeft: 3,
                paddingRight: 3,
                paddingBottom: 4,
              }}
            >
              <TouchableOpacity
                className="bg-white rounded-xl flex-row justify-between items-center "
                style={{
                  flex: 1,
                  paddingHorizontal: 14,
                }}
                onPress={() => {
                  setPickerTarget('due');
                  setShowPicker(true);
                }}
              >
                <Text
                  style={{ fontSize: GetFontSize(15) }}
                  className="text-[#DC9047] font-inter500"
                >
                  {dueDate ? formatDate(dueDate) : 'dd\\mm\\yyyy'}
                </Text>
                <Calendar width={20} height={20} color="#DC9047" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Selected Topics */}
          <View className="bg-white rounded-xl p-6">
            <View className="flex-row justify-between items-start mb-3">
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="text-[#454F5B] font-inter600 flex-1"
              >
                {questionPaper.questionPaperTitle}
              </Text>
              <View
                className="px-3 py-1 rounded-full ml-2"
                style={{
                  backgroundColor: '#FEF6EB',
                  borderTopWidth: 0.5,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  borderColor: '#FFC466',
                }}
              >
                <Text
                  style={{
                    fontSize: GetFontSize(11),
                    color: '#FFB133',

                  }}
                  className="font-inter500"
                >
                  Pending
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="flex-1 bg-[#FFF6E0] rounded-xl py-2 mr-2 flex-row justify-center items-center"
                style={{
                  borderTopWidth: 1,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 3,
                  borderColor: '#DFAF02',
                }}
                onPress={() => handleViewPdf(questionPaper.questionPaperCode)}
                disabled={downloadLoader} // Disable while loading
              >
                {downloadLoader ? (
                  <ActivityIndicator size="small" color="#FFB84D" />
                ) : (
                  <View className="flex-row items-center gap-2">
                    <ViewIcon color='#CB9101' />
                    <Text
                      style={{ fontSize: GetFontSize(14) }}
                      className=" font-inter600 text-[#CB9101]"
                    >
                      View test
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View className="px-6 pb-6 pt-5 bg-white border-t border-gray-200">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="border-2 border-[#E5E5E5] bg-white rounded-xl px-6 py-3 flex-row items-center justify-center"
            onPress={() => navigation.goBack()}
            disabled={showLoader}
          >
            <LeftArrow color="#FFB84D" />
            <Text
              style={{ fontSize: GetFontSize(15) }}
              className="text-[#FFB84D] font-inter600 ml-1"
            >
              back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 rounded-xl py-3 flex-row justify-center items-center border-2 ${dueDate ? 'bg-[#FED570] border-[#DFAF02]' : 'bg-[#FEDB85] border-[#DFAF02]'}`}
            onPress={handleAssign}
            disabled={!dueDate || showLoader}
          >
            {showLoader ? (
              <View className="flex-row items-center">
                <Text className="text-[#8B6914]">Assigning Test</Text>
                <ActivityIndicator size="small" color="#FFB84D" />
              </View>
            ) : (
              <View className="flex-row items-center">
                <Text
                  style={{ fontSize: GetFontSize(15) }}
                  className={`font-inter600 mr-1 ${dueDate ? 'text-[#B68201]' : 'text-[#DFAF02]'}`}
                >
                  Assign Test
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      {/* Loader Modal */}
      <Modal visible={showTestLoader} transparent animationType="fade">
        <TestLoader
          isVisible={showTestLoader}
          onClose={assignTestAfterLoader}
        />
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessScreen} transparent animationType="fade">
        <AssignSuccessScreen
          topic={questionPaper.questionPaperTitle}
          classDisplay={classDisplay}
          onViewAssignedTests={handleViewAssignedTests}
          onClose={handleCloseSuccess}
        />
      </Modal>

      <PdfViewerModal
        visible={showPdfViewer}
        onClose={() => {
          setShowPdfViewer(false);
          // Optionally clean up the temp file
          if (pdfUrl.startsWith('file://')) {
            RNFS.unlink(pdfUrl.replace('file://', '')).catch(() => {});
          }
        }}
        pdfUrl={pdfUrl}
      />
    </SafeAreaView>
  );
};

export default AssignTestDate;