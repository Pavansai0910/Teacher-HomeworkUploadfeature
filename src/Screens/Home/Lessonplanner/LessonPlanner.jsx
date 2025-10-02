import React, { useState, useEffect } from 'react';
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
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import LessonPlanDropdown from '../../../Commons/LessonPlanDropdown';

const LessonPlanner = () => {
  const navigation = useNavigation();
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );
  const { chapters, loading } = useSelector(state => state.chapters);
  const [selectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  useEffect(() => {
    if (selectedChapterName && chapters && chapters.length > 0) {
      // Find the full chapter object using the selected name
      const chapterObject = chapters.find(c => c.name === selectedChapterName);
      if (chapterObject) {
        setSelectedChapterId(chapterObject.id);
      } else {
        setSelectedChapterId(null);
      }
    }
  }, [selectedChapterName, chapters]);

  // 2. Updated: The handler only sets the name (the immediate action)
  const handleChapterSelect = chapterName => {
    setSelectedChapterName(chapterName);
  };

  // Prepare class and subject display
  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    selectedAssignment?.subjectId?.subjectName || 'Not selected';

  // 3. Updated: Map chapters for dropdown options (only names)
  const chapterOptions = chapters?.map(chapter => chapter.name) || [];

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
                onPress={() => navigation.navigate('MainTabNavigator')}
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
            {/* Stepper */}
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 */}
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                    <Text className="text-[#212B36] font-semibold text-[12px]">
                      1
                    </Text>
                  </View>
                  <Text className="text-white text-[12px] font-semibold">
                    Choose Chapter
                  </Text>
                </View>
              </View>
              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />
              {/* Step 2 */}
              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text className="text-white font-semibold text-[12px]">
                      2
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />
              {/* Step 3 */}
              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text className="text-white font-semibold text-[12px]">
                      3
                    </Text>
                  </View>
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
                <Text className="text-white font-semibold text-[16px] mb-2 text-center">
                  Ready to plan smarter?
                </Text>
                <Text className="text-white text-center text-[13px] leading-5 px-2">
                  Select a chapter for which you want to generate a lesson plan
                  or quickly view your saved plans for this class.
                </Text>
              </View>
            </View>

            {/* Dynamic Chapter Dropdown */}
            <View className="w-full">
              {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <LessonPlanDropdown
                  placeholder="Choose a chapter to get started..."
                  options={chapterOptions}
                  onSelect={handleChapterSelect} // New prop
                  selectedValue={selectedChapterName} // New prop
                />
              )}
            </View>
          </View>
        </View>

        {/* Pro Tip */}
        <View className="px-6 mt-4">
          <Text className="text-gray-600 text-sm bg-[#F5F0FD] px-2 py-4 rounded-lg">
            <Text className="font-semibold">Pro Tip:</Text> Regular testing
            improves retention by 40%!
          </Text>
        </View>

        <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-14" />

        {/* Navigation Buttons */}
        <View className="px-6 mt-2">
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3"
              onPress={() => navigation.goBack()}
            >
              <LeftArrow />
              <Text className="text-[#1EAFF7] font-semibold">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LessonPlanTopics', {
                  chapterId: selectedChapterId,
                })
              }
              className="flex-row gap-1 flex-1 py-3 bg-[#1EAFF7] rounded-lg justify-center items-center border-2 border-[#0786C5]"
            >
              <Text className="text-white font-semibold">Continue</Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonPlanner;
