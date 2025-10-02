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
import { getAllTopics } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import capitalizeSubject from '../../../Utils/CapitalizeSubject';

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
  const [chapterName, setChapterName] = useState('Selected Chapter');
  

  // Prepare class and subject display
  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) || 'Not selected';

  // Combined display for header
  const classSubjectDisplay = `${selectedAssignment?.classId?.className || 'Class'}-${selectedAssignment?.sectionId?.sectionName || 'Section'} - ${capitalizeSubject(selectedAssignment?.subjectId?.subjectName) || 'Subject'}`;

  useEffect(() => {
    const fetchTopics = async () => {
      if (!chapterId) {
        console.warn('Chapter ID is missing');
        return;
      }

      const classId = selectedAssignment?.classId?._id;
      const subjectId = selectedAssignment?.subjectId?._id;
      const boardId = teacherProfile?.schoolId?.boardId;

      if (!classId || !subjectId || !boardId) {
        console.error('Missing required parameters for fetching topics:', {
          classId,
          subjectId,
          boardId,
          chapterId,
        });
        setTopics([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Fetching topics with params:', { classId, subjectId, boardId, chapterId });
        const response = await getAllTopics({
          classId,
          subjectId,
          boardId,
          chapterId,
        });

        console.log('API Response:', response.data);

        // Extract chapter name from API response
        if (response.data?.chapterName) {
          setChapterName(response.data.chapterName);
        } else if (response.data?.chapter?.name) {
          setChapterName(response.data.chapter.name);
        }

        const topicData =
          response.data?.topics?.map(t => ({
            id: t.id || t._id,
            name: t.name,
            status: t.status || 'pending',
          })) || [];

        console.log('Processed topics:', topicData);
        setTopics(topicData);
      } catch (err) {
        console.error(
          'Failed to fetch topics',
          err.response?.data || err.message,
          err,
        );
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [chapterId, selectedAssignment, teacherProfile]);

  const handleTopicToggle = topic => {
    const isSelected = selectedTopics.some(t => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleContinue = () => {
    if (selectedTopics.length === 0) {
      console.log('No topics selected');
      return;
    }

    const payload = { chapterId, selectedTopics };
    console.log('Navigating with payload:', payload);
    navigation.navigate('AssignTestDate', payload);
  };

  const getFilteredTopics = () => {
    if (activeFilter === 'all') return topics;
    return topics.filter(t => t.status === activeFilter);
  };

  const getStatusCount = status => {
    if (status === 'all') return topics.length;
    return topics.filter(t => t.status === status).length;
  };

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
          bg: 'white',
          text: '#B68201',
          label: 'Pending',
          borderColor: '#B68201',
        };
      default:
        return {
          bg: '#F3F4F6',
          text: '#6B7280',
          label: 'Unknown',
        };
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
            <View className="flex-row justify-between items-center">
              <Text className="text-[#212B36] font-semibold text-[18px] flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('AssignTest')}
              >
                <Text className="text-white text-[14px]">✕</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#454F5B] text-[14px]">
              Assign tests to your students{'\n'}quickly and easily
            </Text>
          </View>
        </View>
        
      </View>

      {/* Class-Section-Subject Display */}
      <View className="mt-6 px-6 bg-white">
        <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
          <View className="flex-[2] mr-4 border-r-2 border-[#E5E5E3] pr-4">
            <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {classDisplay} | {selectedAssignment?.classId?.studentCount || '0'} Students
            </Text>
          </View>
          <View className="flex-1">
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

      <ScrollView className="flex-1">
        {/* Progress Steps */}
        <View className="px-6 mt-6">
          <View className="bg-[#FED570] rounded-2xl px-3 py-6">
            {/* Stepper */}
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
              <View className="flex-1 h-[2px] bg-white" />

              {/* Step 3 */}
              <View className="items-center">
                <View className="flex-row bg-[#CCCCCC] rounded-full px-3 py-3 border-2 border-white items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                    <Text className="font-semibold text-[12px]">3</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View className="flex-1 h-0 border-t-2 border-white border-dashed mb-6" />
            
            {/* Content Header */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text className="text-[#B68201] font-bold text-[16px] mb-1 text-center">
                Zoom in and pick your focus!
              </Text>
              <Text className="text-[#B68201] text-center text-[12px] leading-5 px-4">
                Here is the list of topics from {chapterName}.{'\n'}
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
            ) : topics.length === 0 ? (
              <View className="py-8">
                <Text className="text-center text-[#B68201] text-[14px]">
                  No topics available. Please check console for errors.
                </Text>
              </View>
            ) : (
              <View className="gap-3 items-center">
                {filteredTopics.map(topic => {
                  const isSelected = selectedTopics.some(t => t.id === topic.id);
                  const statusBadge = getStatusBadge(topic.status);
                  const hasBorder = topic.status === 'pending';

                  return (
                    <TouchableOpacity
                      key={topic.id}
                      className={`w-[311px] h-[52px] justify-between opacity-100 rounded-[16px] pr-[14px] pl-[14px] border-t-[1.5px] border-r-[2.5px] border-b-[4px] border-l-[2.5px] border-[#DC9047] ${isSelected ? 'bg-[#F59E0B]' : 'bg-white'} flex-row items-center`}
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
                        className={`ml-3 w-[75px] h-[27px] opacity-100 rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] ${hasBorder ? 'border-t-[0.5px] border-r-[1px] border-b-[2px] border-l-[1px]' : ''} bg-[${statusBadge.bg}] border-[${statusBadge.borderColor || statusBadge.text}] flex-row items-center justify-center`}
                      >
                        <Text
                          className={`text-[12px] font-semibold text-[${statusBadge.text}]`}
                          numberOfLines={1}
                        >
                          {statusBadge.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {filteredTopics.length === 0 && topics.length > 0 && (
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
            <Text className="font-semibold">Pro Tip:</Text> Regular testing
          improves retention by 40%!
          </Text>
        </View>

        <View className="h-[2px] bg-[#DFE3E8] mt-8" />

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