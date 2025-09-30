import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Bluepage from '../../Images/LessonPlan/LessonPlanner';
import Document from '../../Images/LessonPlan/Document';
import LeftArrow from '../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../Images/LessonPlan/RightArrow';
import { getAllTopics } from '../../Services/teacherAPIV1';
import TopicDropdown from '../../Commons/TopicDropdown';
import { AuthContext } from '../../Context/AuthContext';

const LessonPlanTopics = ({ route }) => {
  const navigation = useNavigation();
  const chapterId = route.params.chapterId;
  console.log('Chapter ID:', chapterId);
  const { teacherProfile } = useContext(AuthContext);

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Prepare class and subject display
  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    selectedAssignment?.subjectId?.subjectName || 'Not selected';

  useEffect(() => {
    const fetchTopics = async () => {
      if (!chapterId) {
        return;
      }

      setLoading(true);
      try {
        const response = await getAllTopics({
          classId: selectedAssignment?.classId?._id,
          subjectId: selectedAssignment?.subjectId?._id,
          boardId: teacherProfile?.schoolId?.boardId,
          chapterId,
        });

        const topicData =
          response.data?.topics?.map(t => ({
            id: t.id,
            name: t.name,
          })) || [];

        setTopics(topicData);
        console.log('Fetched topics successfully:', topicData);
      } catch (err) {
        console.error(
          'Failed to fetch topics',
          err.response?.data || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [chapterId]);

  const handleTopicToggle = topic => {
    const isSelected = selectedTopics.some(t => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleContinue = () => {
    if (selectedTopics.length === 0) return;

    navigation.navigate('LessonPlanGeneration', {
      chapterId,
      selectedTopics: selectedTopics,
    });
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
            {/* Stepper */}
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 - Completed */}
              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text className="text-white font-semibold text-[12px]">
                      2
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 h-[3px] bg-[#F7F7F5]" />
              {/* Step 2 - Active */}
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                    <Text className="text-[#212B36] font-semibold text-[12px]">
                      2
                    </Text>
                  </View>
                  <Text className="text-white text-[12px] font-semibold">
                    Select Topics
                  </Text>
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

            {/* Content Box */}
            <View className="rounded-xl mt-3">
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-xl justify-center items-center mb-2">
                  <Document />
                </View>
                <Text className="text-white font-semibold text-[16px] mb-2 text-center">
                  Pick the topics you want to cover
                </Text>
                <Text className="text-white text-center text-[13px] leading-5 px-2">
                  Select one or more topics from the list to generate a
                  comprehensive lesson plan.
                </Text>
              </View>
            </View>

            {/* Topics List */}
            {loading ? (
              <View className="py-8">
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              <TopicDropdown
                topics={topics}
                selectedTopics={selectedTopics}
                onTopicsSelect={setSelectedTopics}
                placeholder="Select topics..."
              />
            )}
          </View>
        </View>

        {/* Pro Tip */}
        <View className="px-6 mt-4">
          <Text className="text-gray-600 text-sm bg-[#F5F0FD] px-2 py-4 rounded-lg">
            <Text className="font-semibold">Pro Tip:</Text> Select multiple
            topics to create a comprehensive lesson plan!
          </Text>
        </View>

        <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-8" />

        {/* Navigation Buttons */}
        <View className="px-6 mt-2 pb-6">
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
                selectedTopics.length > 0
                  ? 'bg-[#1EAFF7] border-[#0786C5]'
                  : 'bg-gray-400 border-gray-400'
              }`}
              onPress={handleContinue}
              disabled={selectedTopics.length === 0}
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

export default LessonPlanTopics;
