import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import Loader from '../../../Commons/AnimatedLoader/Loader';
import { createLessonPlan } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import Calendar from '../../../Images/LessonPlan/Calendar';
import capitalizeSubject from '../../../Utils/CapitalizeSubject';
import GetFontSize from '../../../Commons/GetFontSize';
import { setLessonPlanner } from '../../../store/Slices/lessonPlannerSlice'; // ADDED

const LessonPlanGeneration = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch(); // ADDED
  const { chapterId, selectedTopics } = route.params;
  const { teacherProfile } = useContext(AuthContext);

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [lessonPlanData, setLessonPlanData] = useState(null);

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  const handleGenerate = async () => {
    if (!startDate || !endDate) return;

    setShowLoader(true);

    try {
      const payload = {
        boardId:
          teacherProfile?.schoolId?.boardId || selectedAssignment?.boardId,
        teacherId: teacherProfile?._id || teacherProfile?.teacherId,
        classId:
          selectedAssignment?.classId?._id || selectedAssignment?.classId,
        subjectId:
          selectedAssignment?.subjectId?._id || selectedAssignment?.subjectId,
        sectionId:
          selectedAssignment?.sectionId?._id || selectedAssignment?.sectionId,
        chapterId: chapterId,
        topicId: selectedTopics.map(topic => topic._id || topic.id || topic),
        depth: 'Introductory',
        dateRange: {
          startDate: convertDateFormat(startDate),
          endDate: convertDateFormat(endDate),
        },
      };

      const requiredFields = [
        'boardId',
        'teacherId',
        'classId',
        'subjectId',
        'sectionId',
        'chapterId',
      ];
      const missingFields = requiredFields.filter(field => !payload[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      if (!payload.topicId || payload.topicId.length === 0) {
        throw new Error('No topics selected');
      }

      const response = await createLessonPlan(payload);

      if (response?.data) {
        // SHAPE DATA FOR REDUX AND SAVING
        const lessonPlanForRedux = {
          lessonPlanRequestId: response.data.lessonPlanRequestId,
          grade: selectedAssignment?.classId?.className,
          subject: selectedAssignment?.subjectId?.subjectName,
          topicId: selectedTopics.map(topic => topic._id || topic.id || topic),
          topicNames: Array.isArray(response.data.topic)
            ? response.data.topic
            : [response.data.topic],
          generatedContent: response.data.generatedContent,
          chapter: response.data.chapter,
          topic: response.data.topic, // include if needed for display
        };
        dispatch(setLessonPlanner(lessonPlanForRedux)); // STORE IN REDUX

        setLessonPlanData(response.data);
        setTimeout(() => {
          handleLoaderComplete(response.data);
        }, 1000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      setShowLoader(false);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to generate lesson plan. Please try again.';

      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    }
  };

  const handleLoaderComplete = (apiData = lessonPlanData) => {
    setShowLoader(false);
    navigation.navigate('GeneratedLessonPlan', {
      chapterId,
      selectedTopics,
      startDate,
      endDate,
      classDisplay,
      subjectDisplay,
      lessonPlanData: apiData,
    });
  };

  const convertDateFormat = dateString => {
    return dateString.replace(/\//g, '-');
  };

  const formatDate = date => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      if (pickerTarget === 'start') {
        setStartDate(formatDate(selectedDate));
      } else if (pickerTarget === 'end') {
        setEndDate(formatDate(selectedDate));
      }
    }
  };

  const isValidDateRange = () => {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate.split('/').reverse().join('-'));
    const end = new Date(endDate.split('/').reverse().join('-'));
    return end >= start;
  };

  if (showLoader) {
    return <Loader isVisible={showLoader} onClose={() => {}} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#E0F5FF] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink"
              >
                Create Lesson Plan
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#1EAFF7] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('MainTabNavigator')}
              >
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-white "
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] "
            >
              Generate a comprehensive lesson{'\n'} plan in seconds
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Class and Subject */}
        <View className="mt-6 px-6 bg-white">
          <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
            <View className="flex-[2] mr-4 border-r-2 border-[#E5E5E3] pr-4">
              <Text
                style={{ fontSize: GetFontSize(12) }}
                className="text-[#637381] font-inter400 mb-1"
              >
                Selected Class
              </Text>
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="text-[#212B36] font-inter500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {classDisplay}
              </Text>
            </View>
            <View className="flex-[1] ml-2">
              <Text
                style={{ fontSize: GetFontSize(12) }}
                className="text-[#637381]  font-inter400 mb-1"
              >
                Subject
              </Text>
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="text-[#212B36] font-inter500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {subjectDisplay}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Steps */}
        <View className="px-6 mt-6">
          <View className="bg-[#1CB0F6] rounded-2xl px-3 py-6">
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 - Completed */}
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="font-inter600 "
                    >
                      1
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[3px] bg-[#F7F7F5]" />
              {/* Step 2 - Active */}
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="font-inter600 "
                    >
                      2
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

              {/* Step 3 */}
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-[#212B36] font-inter600 "
                    >
                      3
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className="text-[#FFFFFF]  font-inter600"
                  >
                    Generate Plan
                  </Text>
                </View>
              </View>
            </View>

            <View
              className="h-[2px] border-t border-white"
              style={{ borderStyle: 'dashed' }}
            />

            {/* Content Box */}
            <View className="rounded-xl mt-3">
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-xl justify-center items-center mb-2">
                  <Document />
                </View>
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-[#FFFFFF] font-inter600 mb-2 text-center"
                >
                  Your tailored lesson plan is almost ready!
                </Text>
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className="text-[#FFFFFF] text-center  leading-5 px-2"
                >
                  You selected
                  {selectedTopics
                    ?.map(t => t.name || t.topicName || 'Topic')
                    .join(', ')}
                  . Set the dates and hit Generate Plan to create the perfect
                  plan for you.
                </Text>
              </View>
            </View>

            {/* Date Inputs */}
            <View className="px-3">
              <Text className="text-[#FFFFFF] mb-2">
                Start Date <Text className="text-[#E34F57]">*</Text>
              </Text>
              <TouchableOpacity
                className="bg-white rounded-lg px-4 py-3 border border-[#E5E5E3] mb-3 flex-row justify-between items-center"
                style={{
                  borderTopWidth: 1,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 4,
                  borderColor: '#9B7A5A',
                }}
                onPress={() => {
                  setPickerTarget('start');
                  setShowPicker(true);
                }}
              >
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-[#DC9047] font-inter600"
                >
                  {startDate || 'dd/mm/yyyy'}
                </Text>
                <Calendar width={20} height={20} color="#DC9047" />
              </TouchableOpacity>

              <Text className="text-white mb-2">
                End Date <Text className="text-[#E34F57]">*</Text>
              </Text>
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 4,
                  borderColor: '#9B7A5A',
                }}
                className="bg-white rounded-lg px-4 py-3 border border-[#E5E5E3] flex-row justify-between items-center"
                onPress={() => {
                  setPickerTarget('end');
                  setShowPicker(true);
                }}
              >
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-[#DC9047] font-inter600 text-"
                >
                  {endDate || 'dd/mm/yyyy'}
                </Text>
                <Calendar width={20} height={20} color="#DC9047" />
              </TouchableOpacity>

              {/* Date validation error */}
              {startDate && endDate && !isValidDateRange() && (
                <Text
                  style={{ fontSize: GetFontSize(12) }}
                  className="text-red-200 text-inter400 mt-2"
                >
                  End date should be after or same as start date
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-2 mb-2" />
        </ScrollView>

        {/* Navigation Buttons */}
        <View className="px-6 mb-4">
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3"
              onPress={() => navigation.goBack()}
            >
              <LeftArrow color="#1EAFF7" />
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-[#1EAFF7] font-inter600"
              >
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${
                startDate && endDate && isValidDateRange()
                  ? 'bg-[#1EAFF7] border-[#0786C5]'
                  : 'bg-gray-400 border-gray-400'
              }`}
              onPress={handleGenerate}
              disabled={!startDate || !endDate || !isValidDateRange()}
            >
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-white font-inter400"
              >
                Generate Lesson Plan
              </Text>
              <RightArrow />
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
          minimumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
};

export default LessonPlanGeneration;
