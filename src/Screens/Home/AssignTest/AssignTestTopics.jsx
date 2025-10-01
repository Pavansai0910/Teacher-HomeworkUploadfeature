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
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import { getAllTopics } from '../../../Services/lessonPlanService';
import { AuthContext } from '../../../Context/AuthContext';

const AssignTestTopics = ({ route }) => {
  const navigation = useNavigation();
  const chapterId = route.params.chapterId;
  const { teacherProfile } = useContext(AuthContext);

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

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
            status: t.status || 'pending', // 'assigned', 'completed', 'pending'
          })) || [];

        setTopics(topicData);
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

    navigation.navigate('AssignTestGeneration', {
      chapterId,
      selectedTopics: selectedTopics,
    });
  };

  // Filter topics based on active filter
  const getFilteredTopics = () => {
    if (activeFilter === 'all') return topics;
    return topics.filter(t => t.status === activeFilter);
  };

  // Count topics by status
  const getStatusCount = status => {
    if (status === 'all') return topics.length;
    return topics.filter(t => t.status === status).length;
  };

  // Get status badge style and text
  const getStatusBadge = status => {
    switch (status) {
      case 'assigned':
        return {
          bg: '#E0F2FE',
          text: '#0369A1',
          label: 'Assigned',
        };
      case 'completed':
        return {
          bg: '#D1FAE5',
          text: '#047857',
          label: 'Completed',
        };
      case 'pending':
        return {
          bg: '#FFC466',
          text: '#92400E',
          label: 'Pending',
        };
      default:
        return {
          bg: '#F3F4F6',
          text: '#6B7280',
          label: 'Unknown',
        };
    }
  };

  // Get topic card background color based on status
  const getTopicCardStyle = status => {
    switch (status) {
      case 'assigned':
        return 'bg-white';
      case 'completed':
        return 'bg-white';
      case 'pending':
        return 'bg-[#F59E0B]';
      default:
        return 'bg-white';
    }
  };

  const filteredTopics = getFilteredTopics();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#FEF3C7] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-[#212B36] font-semibold text-[18px] flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('AssignTest')}
              >
                <Text className="text-[#1F2937] text-[14px]">✕</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#454F5B] text-[14px]">
              Assign tests to your students{'\n'}quickly and easily
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Progress Steps */}
        <View className="px-6 mt-6">
          <View className="bg-[#FED570] rounded-2xl px-3 py-6">
            {/* Stepper */}
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 - Completed */}
              <View className="items-center">
                <View style={{
                  width: 41.25,
                  height: 41.25,
                  borderRadius: 63.75,
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 11.25,
                  backgroundColor: '#5FCC3D',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: 'white',
                  }}>
                    1
                  </Text>
                </View>
              </View>
              <View className="flex-1 h-[3px] bg-white/30" />
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
              <View className="flex-1 h-[2px] bg-white/30" />

              {/* Step 3 */}
              <View className="items-center">
                <View style={{
                  width: 41.25,
                  height: 41.25,
                  borderRadius: 63.75,
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 11.25,
                  backgroundColor: '#CCCCCC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: 'white',
                  }}>
                    3
                  </Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-white/50 my-4" />

            {/* Content Header */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text className="text-[#B68201] font-bold text-[16px] mb-1 text-center">
                Zoom in and pick your focus!
              </Text>
              <Text className="text-[#B68201] text-center text-[12px] leading-5 px-4">
                Here is the list of topics from the selected chapter.{'\n'}
                Select a topic you want to assign a test for.
              </Text>
            </View>

            {/* Filter Tabs - Scrollable */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="mb-4"
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'all'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                  }`}
                  onPress={() => setActiveFilter('all')}
                >
                  <Text
                    className={`text-[13px] font-semibold ${
                      activeFilter === 'all' ? 'text-[#B68201]' : 'text-[#6B7280]'
                    }`}
                  >
                    All Tests ({getStatusCount('all')})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'pending'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                  }`}
                  onPress={() => setActiveFilter('pending')}
                >
                  <Text
                    className={`text-[13px] font-semibold ${
                      activeFilter === 'pending'
                        ? 'text-[#B68201]'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    Pending Test ({getStatusCount('pending')})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'assigned'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                  }`}
                  onPress={() => setActiveFilter('assigned')}
                >
                  <Text
                    className={`text-[13px] font-semibold ${
                      activeFilter === 'assigned'
                        ? 'text-[#B68201]'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    Assigned ({getStatusCount('assigned')})
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Topics List */}
            {loading ? (
              <View className="py-8">
                <ActivityIndicator size="large" color="#B68201" />
              </View>
            ) : (
              <View className="gap-3">
                {filteredTopics.map(topic => {
                  const isSelected = selectedTopics.some(t => t.id === topic.id);
                  const statusBadge = getStatusBadge(topic.status);

                  return (
                    <TouchableOpacity
                      key={topic.id}
                      className={`rounded-xl px-4 py-4 flex-row justify-between items-center ${
                        isSelected ? 'bg-[#F59E0B]' : 'bg-white'
                      }`}
                      style={{
                        borderTopWidth: 1.5,
                        borderRightWidth: 2.5,
                        borderBottomWidth: 4,
                        borderLeftWidth: 2.5,
                        borderColor: '#DC9047',
                      }}
                      onPress={() => handleTopicToggle(topic)}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`flex-1 font-semibold text-[14px] ${
                          isSelected ? 'text-white' : 'text-[#212B36]'
                        }`}
                        numberOfLines={2}
                      >
                        {topic.name}
                      </Text>
                      <View
                        className="px-3 py-1 rounded-full ml-3"
                        style={{ backgroundColor: statusBadge.bg }}
                      >
                        <Text
                          className="text-[12px] font-semibold"
                          style={{ color: statusBadge.text }}
                        >
                          {statusBadge.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {filteredTopics.length === 0 && (
                  <View className="py-8">
                    <Text className="text-center text-[#B68201] text-[14px]">
                      No topics found for this filter
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Pro Tip */}
        <View className="px-6 mt-4">
          <Text className="text-gray-600 text-sm bg-[#F5F0FD] px-4 py-4 rounded-lg">
            <Text className="font-semibold">Pro Tip:</Text> Including multiple
            topics helps assess comprehensive understanding!
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
              <Text className="text-[#FED570] font-semibold">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${
                selectedTopics.length > 0
                  ? 'bg-[#FED570] border-[#FEC107]'
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

export default AssignTestTopics;