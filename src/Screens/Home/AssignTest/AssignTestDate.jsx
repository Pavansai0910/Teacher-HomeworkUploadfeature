import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import capitalizeSubject from '../../../Utils/CapitalizeSubject';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import { assignExam } from '../../../Services/teacherAPIV1';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../../Context/AuthContext';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs';
import { downloadExam } from '../../../Services/teacherAPIV1';
import { requestStoragePermission } from '../../../Permission/StoragePermission';
import NavHeader from '../../NavHeader';
import GetFontSize from '../../../Commons/GetFontSize';

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

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) ||
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

  const handleAssign = async questionPaper => {
    setShowLoader(true);
    const selectedDate = new Date(dueDate);
    selectedDate.setUTCHours(18, 29, 59, 999);

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
        deadline: selectedDate.toISOString(),
      };

      await assignExam(payload);
      setShowLoader(false);
      Toast.show({ type: 'success', text1: 'Yeah! You assigned test' });
      navigation.navigate("MainTabNavigator", { screen: 'Home' });
    } catch (error) {
      setShowLoader(false);
      console.error(error);
      Toast.show({ type: 'error', text1: 'Failed to assign the exam' });
    }
  };

  const handleExamDownload = async questionPaperCode => {
    setDownloadLoader(true);
    // 1. Permission Check
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      setDownloadLoader(false);
      return;
    }

    try {
      const response = await downloadExam({
        questionPaperCode: questionPaperCode,
      });

      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });

      const directoryPath = `${DownloadDirectoryPath}/Adaptmate Educator App`;
      const checkDirectory = await RNFS.exists(directoryPath);
      if (!checkDirectory) {
        await RNFS.mkdir(directoryPath);
      }

      const path = `${directoryPath}/LGA_${Date.now()}.pdf`;
      await RNFS.writeFile(path, base64Data, 'base64');

      Toast.show({
        type: 'success',
        text1: `Saved in Download/Adaptmate Educator App`,
      });
      setDownloadLoader(false);
    } catch (error) {
      console.error('RNFS Write Error:', error);
      setDownloadLoader(false);
      Toast.show({
        type: 'error',
        text1: 'Download Failed',
        text2: 'Could not save file. Check permissions or internal file error.',
      });
    } finally {
      setDownloadLoader(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      {/* Header */}
       <View className="bg-[#FFF3D6]" style={{ minHeight: 149, paddingTop: 20, paddingRight: 24, paddingBottom: 20, paddingLeft: 24, justifyContent: 'flex-end' }}>
        <View className="flex-row items-center" style={{ height: 80, gap: 12, marginTop: 13 }}>
          <View className="w-16 h-16 bg-[#FEE19A] rounded-lg justify-center items-center">
            <AssignTestDoc />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-7 h-7 justify-center items-center border-2 border-[#FDCA0C] rounded-full"
                onPress={() => navigation.navigate('MainTabNavigator', { screen: 'Home' })}
              >
                <View className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center">
                  <Text className="text-white font-inter400">✕</Text>
                </View>
              </TouchableOpacity> 
            </View>
            <Text style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] font-inter400">
              Boost your students's progress in{'\n'}just few taps!
            </Text>
          </View>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView>
        <NavHeader />

        {/* Progress Steps */}
        <View
          className="mt-4 bg-[#FED570] rounded-[20px] border-2 border-[#E5E5E5] mx-4"
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
                  Generate Plan
                </Text>
              </View>
            </View>
          </View>

          <View
            className="flex-1 h-0 border-t-2 mt-8 border-[#F7F7F5]"
            style={{ borderStyle: 'dashed' }}
          />

          {/* Content */}
          <View className="rounded-xl mb-6 mt-8">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-[#8B6914] font-inter700 mb-2 text-center"
              >
                Ready to plan smarter?
              </Text>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="text-[#8B6914] text-center font-inter500"
              >
                Just select a deadline for your students, and{'\n'}you're good
                to go!
              </Text>
            </View>
          </View>

          {/* Due Date Input */}
          <View className="mb-6 items-center">
            <Text
              style={{ fontSize: GetFontSize(13) }}
              className="text-[#5FCC3D] mb-2 font-inter500 self-start"
            >
              Select Due Date <Text className="text-[#E74C3C]">*</Text>
            </Text>
            <TouchableOpacity
              className="bg-white rounded-xl flex-row justify-between items-center"
              style={{
                width: 311,
                height: 56,
                paddingHorizontal: 14,
                borderTopWidth: 1.5,
                borderLeftWidth: 2.5,
                borderRightWidth: 2.5,
                borderBottomWidth: 4,
                borderColor: '#63738140',
              }}
              onPress={() => {
                setPickerTarget('due');
                setShowPicker(true);
              }}
            >
              <Text
                style={{ fontSize: GetFontSize(15) }}
                className="text-[#FFB84D] font-inter500"
              >
                {dueDate ? formatDate(dueDate) : 'dd\\mm\\yyyy'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Selected Topics */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row justify-between items-start mb-3">
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="text-[#1A1A1A] font-inter600 flex-1"
              >
                {questionPaper.questionPaperTitle}
              </Text>
              <View
                className="px-3 py-1 rounded-full ml-2"
                style={{
                  backgroundColor: '#FEF6EB',
                  borderTopWidth: 1,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 3,
                  borderColor: '#DFAF02',
                }}
              >
                <Text
                  style={{ fontSize: GetFontSize(11) }}
                  className="text-[#FFB84D] font-inter600"
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
                  borderColor: '#63738140',
                }}
                onPress={() =>
                  handleExamDownload(questionPaper.questionPaperCode)
                }
              >
                {downloadLoader ? (
                  <ActivityIndicator size="small" color="#FFB84D" />
                ) : (
                  <Text
                    style={{ fontSize: GetFontSize(13) }}
                    className="text-[#FFB84D] font-inter600"
                  >
                    Download LGA
                  </Text>
                )}
              </TouchableOpacity>
              {/* <TouchableOpacity
                className="w-10 h-10 rounded-xl justify-center items-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTopWidth: 1,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 3,
                  borderColor: '#DFAF02',
                }}
              >
                <Text className="text-[#FFB84D] text-[18px]">⬇</Text>
              </TouchableOpacity> */}
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
            onPress={() => handleAssign(questionPaper)}
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
                {/* <RightArrow color={dueDate ? '#8B6914' : '#999999'} /> */}
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
    </SafeAreaView>
  );
};

export default AssignTestDate;
