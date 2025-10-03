import React, { useContext, useEffect, useState } from 'react';
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
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import { getExamsByClassAndSubject } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import capitalizeSubject from '../../../Utils/CapitalizeSubject';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import Toast from 'react-native-toast-message';
import GetFontSize from '../../../Commons/GetFontSize';
import NavHeader from '../../NavHeader';

const AssignTestTopics = ({ route }) => {
  const navigation = useNavigation();
  const chapterId = route.params.chapterId;
  const chapterName = route.params.chapterName;
  const { teacherProfile } = useContext(AuthContext);

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!chapterId) return;
    try {
      setLoading(true);
      setExamData(null);
      const response = await getExamsByClassAndSubject({
        subjectId: selectedAssignment?.subjectId?._id,
        classId: selectedAssignment?.classId?._id,
        sectionId: selectedAssignment?.sectionId?._id,
        teacherId: teacherProfile?._id,
        chapterId: chapterId,
        boardId: teacherProfile?.schoolId?.boardId,
      });
      setExamData(response.data?.questionPapers);
      setLoading(false);
    } catch (error) {
      if (error.response?.status !== 404 && error.response?.status !== 400) {
        Toast.show({
          type: 'error',
          text1: `Failed to fetch exam data`,
        });
      }
      setLoading(false);
    }
  };

  const handlePaperToggle = paper => {
    if (paper.isAssigned) {
      return Toast.show({
        type: 'error',
        text1: 'This paper is already assigned',
      });
    }
    if (selectedTopic?._id === paper._id) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(paper);
    }
  };

  const handleContinue = () => {
    if (!selectedTopic) return;
    const payload = { questionPaper: selectedTopic };
    navigation.navigate('AssignTestDate', payload);
  };

  const getFilteredExamData = () => {
    if (activeFilter === 'all') return examData;

    return examData?.filter(paper => {
      let status;
      if (paper.isAssigned && paper.lastAttempted) status = 'completed';
      else if (paper.isAssigned) status = 'assigned';
      else status = 'pending';

      return status === activeFilter;
    });
  };

  const statusCounts = {
    all: examData?.length || 0,
    pending: examData?.filter(p => !p.isAssigned && !p.lastAttempted)?.length,
    assigned: examData?.filter(p => p.isAssigned && !p.lastAttempted)?.length,
    completed: examData?.filter(p => p.isAssigned && p.lastAttempted)?.length,
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'assigned':
        return { bg: '#E0F2FE', text: '#0369A1', label: 'Assigned' };
      case 'completed':
        return { bg: '#D1FAE5', text: '#047857', label: 'Completed' };
      case 'pending':
        return {
          bg: 'white',
          text: '#B68201',
          label: 'Pending',
          borderColor: '#B68201',
        };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', label: 'Pending' };
    }
  };

  const getFilteredExam = getFilteredExamData();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#FEF3C7] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-[#FEE19A] rounded-lg mr-3 justify-center items-center">
            <AssignTestDoc />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-poppins600 flex-shrink"
              >
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('Home')}
              >
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-white"
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B]"
            >
              Assign tests to your students{'\n'}quickly and easily
            </Text>
          </View>
        </View>
      </View>

      {/* Class-Section-Subject Display */}
      <NavHeader />

      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        <View className="px-6 mt-6">
          <View className="bg-[#FED570] rounded-2xl px-3 py-6">
            {/* Content Header */}
            <View className="flex-row items-center justify-between mb-5">
              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-white font-inter600"
                    >
                      1
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 h-[2px] bg-[#F7F7F5] " />

              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center ">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-[#212B36] font-inter600"
                    >
                      2
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: GetFontSize(12) }}
                    className="text-white font-inter600"
                  >
                    Select Topic
                  </Text>
                </View>
              </View>

              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-white font-inter600"
                    >
                      3
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              className="flex-1 h-0 border-t-2 border-[#F7F7F5]"
              style={{ borderStyle: 'dashed' }}
            />

            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-3">
                <Document />
              </View>
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-[#B68201] font-inter700 mb-1 text-center"
              >
                Zoom in and pick your focus!
              </Text>
              <Text
                style={{ fontSize: GetFontSize(12) }}
                className="text-[#B68201] text-center font-inter700 px-4"
              >
                Here is the list of topics from {chapterName}.{'\n'}
                Select a topic you want to assign a test for.
              </Text>
            </View>

            {/* Filter Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${activeFilter === 'all'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                    }`}
                  onPress={() => setActiveFilter('all')}
                >
                  <Text
                    style={{ fontSize: GetFontSize(13) }}
                    className={`font-inter600 ${activeFilter === 'all'
                        ? 'text-[#B68201]'
                        : 'text-[#6B7280]'
                      }`}
                  >
                    All Tests ({statusCounts.all})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${activeFilter === 'pending'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                    }`}
                  onPress={() => setActiveFilter('pending')}
                >
                  <Text
                    style={{ fontSize: GetFontSize(13) }}
                    className={`font-inter600 ${activeFilter === 'pending'
                        ? 'text-[#B68201]'
                        : 'text-[#6B7280]'
                      }`}
                  >
                    Pending ({statusCounts.pending})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`px-4 py-2 rounded-full ${activeFilter === 'assigned'
                      ? 'bg-white border-2 border-[#FED570]'
                      : 'bg-white'
                    }`}
                  onPress={() => setActiveFilter('assigned')}
                >
                  <Text
                    style={{ fontSize: GetFontSize(13) }}
                    className={`font-inter600 ${activeFilter === 'assigned'
                        ? 'text-[#B68201]'
                        : 'text-[#6B7280]'
                      }`}
                  >
                    Assigned ({statusCounts.assigned})
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Topics List */}
            {loading ? (
              <View className="py-8">
                <ActivityIndicator size="large" color="#B68201" />
              </View>
            ) : !examData || examData.length === 0 ? (
              <View className="py-8">
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-center text-[#B68201] font-inter500"
                >
                  No exams available.
                </Text>
              </View>
            ) : (
              <View className="gap-3 items-center">
                {getFilteredExam.map(paper => {
                  const isSelected = selectedTopic?._id === paper._id;
                  let status;
                  if (paper.isAssigned && paper.lastAttempted)
                    status = 'completed';
                  else if (paper.isAssigned) status = 'assigned';
                  else status = 'pending';

                  const statusBadge = getStatusBadge(status);

                  return (
                    <TouchableOpacity
                      key={paper._id}
                      className={`w-[94%] justify-between rounded-[16px] px-[14px] border-t-[1.5px] border-r-[2.5px] border-b-[4px] border-l-[2.5px] border-[#DC9047] ${isSelected ? 'bg-[#F59E0B]' : 'bg-white'} flex-row items-center`}
                      onPress={() => handlePaperToggle(paper)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={{ fontSize: GetFontSize(14) }}
                        className={`flex-1 font-inter600 ${isSelected ? 'text-white' : 'text-[#212B36]'}`}
                        numberOfLines={2}
                      >
                        {paper.questionPaperTitle}
                      </Text>

                      <View
                        className={`ml-3 w-[75px] h-[27px] rounded-full px-[10px] justify-center items-center`}
                        style={{
                          backgroundColor: statusBadge.bg,
                          borderColor:
                            statusBadge.borderColor || statusBadge.text,
                          borderWidth: statusBadge.borderColor ? 1 : 0,
                        }}
                      >
                        <Text
                          className="font-inter600"
                          style={{
                            fontSize: GetFontSize(12),
                            color: statusBadge.text,
                          }}
                          numberOfLines={1}
                        >
                          {statusBadge.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View className="px-6 pb-6 pt-2 bg-white border-t border-gray-200">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3"
            onPress={() => navigation.goBack()}
          >
            <LeftArrow color="#FED570" />
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#FED570] font-semibold"
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${selectedTopic ? 'bg-[#FED570] border-[#FEC107]' : 'bg-gray-300 border-gray-300'}`}
            onPress={handleContinue}
            disabled={!selectedTopic}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className={`font-inter600 ${selectedTopic ? 'text-[#B68201]' : 'text-gray-600'}`}
            >
              Continue
            </Text>
            {selectedTopic && <RightArrow color="#B68201" />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AssignTestTopics;
