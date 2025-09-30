import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
// 👉 Import your calendar icon here
// import CalendarIcon from '../../../Images/LessonPlan/CalendarIcon';

const LessonPlanGeneration = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterId, selectedTopics } = route.params;

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null); // "start" or "end"

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    selectedAssignment?.subjectId?.subjectName || 'Not selected';

  const handleGenerate = () => {
    if (!startDate || !endDate) return;
    console.log('Final Payload:', {
      chapterId,
      selectedTopics,
      startDate,
      endDate,
    });
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
              <Text className="text-[#212B36] font-semibold text-[18px] flex-shrink">
                Create Lesson Plan
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#1EAFF7] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('LessonPlanner')}
              >
                <Text className="text-white text-[14px]">✕</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#454F5B] text-[14px]">
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
              <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
              <Text
                className="text-gray-800 font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {classDisplay}
              </Text>
            </View>
            <View className="flex-[1] ml-2">
              <Text className="text-gray-500 text-xs mb-1">Subject</Text>
              <Text
                className="text-gray-800 font-semibold"
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
            {/* Stepper (unchanged) */}

            {/* Content Box */}
            <View className="rounded-xl mt-3">
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-xl justify-center items-center mb-2">
                  <Document />
                </View>
                <Text className="text-white font-semibold text-[16px] mb-2 text-center">
                  Your tailored lesson plan is almost ready!
                </Text>
                <Text className="text-white text-center text-[13px] leading-5 px-2">
                  You selected {selectedTopics.map(t => t.name).join(', ')}. Set
                  the dates and hit Generate Plan to create the perfect plan for
                  you.
                </Text>
              </View>
            </View>

            {/* Date Inputs */}
            <View className="px-3">
              {/* Start Date */}
              <Text className="text-white mb-2">
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
                <Text className="text-[#DC9047] font-semibold text-[16px]">
                  {startDate || 'dd/mm/yyyy'}
                </Text>
                {/* 👉 Replace with your Calendar Icon */}
                <View className="w-5 h-5">
                  {/* <CalendarIcon /> */}
                  {/* <Text>📅</Text> */}
                </View>
              </TouchableOpacity>

              {/* End Date */}
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
                <Text className="text-[#DC9047] font-semibold text-[16px]">
                  {endDate || 'dd/mm/yyyy'}
                </Text>
                {/* 👉 Replace with your Calendar Icon */}
                <View className="w-5 h-5">
                  {/* <CalendarIcon /> */}
                  {/* <Text>📅</Text> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View className="px-6 mt-6 mb-8">
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3"
              onPress={() => navigation.goBack()}
            >
              <LeftArrow />
              <Text className="text-[#1EAFF7] font-semibold">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${
                startDate && endDate
                  ? 'bg-[#1EAFF7] border-[#0786C5]'
                  : 'bg-gray-400 border-gray-400'
              }`}
              onPress={handleGenerate}
              disabled={!startDate || !endDate}
            >
              <Text className="text-white font-semibold">
                Generate Lesson Plan
              </Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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

export default LessonPlanGeneration;
