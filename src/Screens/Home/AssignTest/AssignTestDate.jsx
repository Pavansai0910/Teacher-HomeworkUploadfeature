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


const AssignTestDate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterId, selectedTopics } = route.params;

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [dueDate, setDueDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    selectedAssignment?.subjectId?.subjectName || 'Not selected';

  const handleGenerate = () => {
    if (!dueDate) return;
    setShowLoader(true);
    console.log('Final Payload:', {
      chapterId,
      selectedTopics,
      dueDate,
    });
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
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
      if (pickerTarget === 'due') {
        setDueDate(formatDate(selectedDate));
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]">
      {/* Header */}
      <View className="bg-[#FFF3D6] px-5 py-4 rounded-2xl">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[#1A1A1A] font-bold text-[18px]">
                Assign Test
              </Text>
              <TouchableOpacity
                style={{
                  width: 24,
                  height: 24,
                  opacity: 1,
                  borderRadius: 12,
                  borderWidth: 2,
                  padding: 0,
                  borderColor: '#FFD699',
                  backgroundColor: '#FFD699',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('MainTabNavigator')}
              >
                <Text style={{ lineHeight: 24, textAlign: 'center' }} className="text-white text-[14px] font-bold">X</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#6B5D4F] text-[13px]">
              Boost your students' progress in{'\n'}just a few taps!
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Class and Subject */}
        <View className="mt-4 bg-white rounded-2xl p-4 flex-row mx-4">
          <View className="flex-1 pr-3">
            <Text className="text-[#999999] text-[11px] mb-1">Selected Class</Text>
            <Text className="text-[#1A1A1A] font-semibold text-[14px]" numberOfLines={1}>
              {classDisplay}
            </Text>
          </View>
          <View className="w-[1px] bg-[#E5E5E5]" />
          <View className="flex-1 pl-3">
            <Text className="text-[#999999] text-[11px] mb-1">Subject</Text>
            <Text className="text-[#1A1A1A] font-semibold text-[14px]" numberOfLines={1}>
              {subjectDisplay}
            </Text>
          </View>
        </View>

        {/* Progress Steps */}
        <View className="mt-4 bg-[#FED570] rounded-[20px] border-2 border-[#E5E5E5] mx-4" style={{ paddingTop: 24, paddingRight: 20, paddingBottom: 24, paddingLeft: 20 }}>
          <View className="flex-row items-center justify-between mb-5">
            {/* Step 1 - Completed */}
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-white items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                  <Text className="font-semibold text-[12px]">1</Text>
                </View>
              </View>
            </View>
            <View className="flex-1 h-[3px] bg-white" />
            {/* Step 2 - Active */}
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-white items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                  <Text className="font-semibold text-[12px]">2</Text>
                </View>
              </View>
            </View>
            <View className="flex-1 h-[2px] bg-white" />

            {/* Step 3 */}
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                  <Text className="text-[#212B36] font-semibold text-[12px]">
                    3
                  </Text>
                </View>
                <Text className="text-white text-[12px] font-semibold">
                  Generate Plan
                </Text>
              </View>
            </View>
          </View>

          <View
            className="flex-1 h-0 border-t-2 border-[#F7F7F5]"
            style={{ borderStyle: 'dashed' }}
          />

          {/* Content */}
          <View className="rounded-xl mb-6">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text className="text-[#8B6914] font-bold text-[16px] mb-2 text-center">
                Ready to plan smarter?
              </Text>
              <Text className="text-[#8B6914] text-center text-[13px] leading-5">
                Just select a deadline for your students, and{'\n'}you're good to go!
              </Text>
            </View>
          </View>

          {/* Due Date Input */}
          <View className="mb-6 items-center">
            <Text className="text-[#5FCC3D] mb-2 text-[13px] font-medium self-start">
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
              <Text className="text-[#FFB84D] font-medium text-[15px]">
                {dueDate || 'dd\\mm\\yyyy'}
              </Text>
              <Text className="text-[#FFB84D] text-[18px]">📅</Text>
            </TouchableOpacity>
          </View>

          {/* Selected Topics */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-[#1A1A1A] font-semibold text-[14px] flex-1">
                {selectedTopics.map(t => t.name).join(', ')}
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
                <Text className="text-[#FFB84D] text-[11px] font-semibold">
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
              >
                <Text className="text-[#FFB84D] text-[20px] mr-1">👁</Text>
                <Text className="text-[#FFB84D] font-semibold text-[13px]">
                  View test
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
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
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row gap-3 mt-4 mb-6 mx-4">
          <TouchableOpacity
            className="border-2 border-[#E5E5E5] bg-white rounded-xl px-6 py-3 flex-row items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <LeftArrow />
            <Text className="text-[#FFB84D] font-semibold text-[15px] ml-1">back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-1 rounded-xl py-3 flex-row justify-center items-center ${
              dueDate ? 'bg-[#FFD699]' : 'bg-[#E5E5E5]'
            }`}
            onPress={handleGenerate}
            disabled={!dueDate}
          >
            <Text className={`font-semibold text-[15px] mr-1 ${
              dueDate ? 'text-[#8B6914]' : 'text-[#999999]'
            }`}>
              Continue
            </Text>
            <RightArrow />
          </TouchableOpacity>
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

export default AssignTestDate; 