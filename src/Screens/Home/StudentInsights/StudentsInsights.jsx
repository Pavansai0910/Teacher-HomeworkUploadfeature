import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Vibration,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import capitalizeSubject from '../../../Utils/Capitalize';
import LearningNavbar from './LearningNavbar';
import GetFontSize from '../../../Commons/GetFontSize';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import RightArrowIcon from '../../../Images/LessonPlan/RightArrowIcon';
import { getChapters } from '../../../Services/teacherAPIV1';
import { gettopicAssessmentStats } from '../../../Services/teacherAPIV2';
import { AuthContext } from '../../../Context/AuthContext';

const StudentsInsights = () => {
  const navigation = useNavigation();
  const selectedAssignment = useSelector(
    (state) => state.assignment.selectedAssignment
  );
  const { teacherProfile } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topicsData, setTopicsData] = useState({
    completed: [],
    assigned: [],
    pending: [],
  });
  const [topicsLoading, setTopicsLoading] = useState(false);

  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = Dimensions.get('window');

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';
  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  const selectedChapter =
    chapters.find((ch) => ch.id === selectedChapterId) || null;

  // ✅ Fetch Chapters API call
  useEffect(() => {
    const fetchChapters = async () => {
      if (
        !selectedAssignment?.classId?._id ||
        !selectedAssignment?.subjectId?._id ||
        !teacherProfile?.schoolId?.boardId
      ) {
        return;
      }

      setLoading(true);
      try {
        const response = await getChapters({
          classId: selectedAssignment.classId._id,
          subjectId: selectedAssignment.subjectId._id,
          boardId: teacherProfile.schoolId.boardId,
        });

        const chapterList =
          response.data?.chapters?.map((ch, index) => ({
            id: ch.id || ch._id || `chapter_${index}`,
            name: ch.name || 'Untitled Chapter',
            originalData: ch,
          })) || [];

        setChapters(chapterList);

        if (chapterList.length > 0) {
          setSelectedChapterId(chapterList[0].id);
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status !== 400 && status !== 404) {
          console.error('Failed to fetch chapters:', err?.response?.data || err?.message || err);
        } else {
          console.log(`ℹSkipped logging for status ${status}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [selectedAssignment]);

  // ✅ Fetch Topics when chapter is selected
  useEffect(() => {
    const fetchTopics = async () => {
      if (
        !selectedChapterId ||
        !selectedAssignment?.classId?._id ||
        !selectedAssignment?.sectionId?._id ||
        !selectedAssignment?.subjectId?._id ||
        !teacherProfile?.schoolId?.boardId
      ) {
        return;
      }

      setTopicsLoading(true);
      try {
        const response = await gettopicAssessmentStats({
          classId: selectedAssignment.classId._id,
          sectionId: selectedAssignment.sectionId._id,
          subjectId: selectedAssignment.subjectId._id,
          boardId: teacherProfile.schoolId.boardId,
          chapterId: selectedChapterId,
        });

        const topics = response.data?.topics || [];

        const completedTopics = response.data?.completed || [];
        const assignedTopics = response.data?.notAssigned || [];
        const pendingTopics = response.data?.pending || [];

        setTopicsData({
          completed: completedTopics,
          assigned: assignedTopics,
          pending: pendingTopics,
        });
      } catch (err) {
        const status = err?.response?.status;
        if (status !== 400 && status !== 404) {
          console.error(' Failed to fetch topics:', err?.response?.data || err?.message || err);
        } else {
          console.log(`ℹ Skipped logging for status ${status}`);
        }
        setTopicsData({ completed: [], assigned: [], pending: [] });
      } finally {
        setTopicsLoading(false);
      }
    };

    fetchTopics();
  }, [selectedChapterId, selectedAssignment]);

  // 🔄 Dropdown open/close animation
  const toggleDropdown = () => {
    Vibration.vibrate(50);

    const toValue = isDropdownOpen ? 0 : 1;
    setIsDropdownOpen(!isDropdownOpen);

    Animated.spring(dropdownAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  // ✅ Handle chapter selection
  const selectChapter = (chapter) => {
    setSelectedChapterId(chapter.id);
    setIsDropdownOpen(false);

    Animated.spring(dropdownAnimation, {
      toValue: 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  // ✅ Navigate to LearningTopic screen
  const navigateToLearningTopic = (status) => {
    if (!selectedChapter || topicsLoading) return;

    const topicsToPass = topicsData[status] || [];
    navigation.navigate('LearningTopic', {
      status: status,
      topics: topicsToPass,
      chapterName: selectedChapter.name,
      classDisplay: classDisplay,
      subjectDisplay: subjectDisplay,
      chapterId: selectedChapter.id,
    });
  };

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(350, screenHeight * 0.43)],
  });

  const rotateIcon = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const isChapterSelected = (chapterId) => selectedChapterId === chapterId;
  const getTopicCount = (status) => topicsData[status]?.length || 0;

  return (
    <View className="flex-1 bg-white">
      <LearningNavbar
        classDisplay={classDisplay}
        subjectDisplay={subjectDisplay}
      />

      <View className="bg-[#D0F5B3] p-6 mx-6 mt-6 rounded-2xl">
        {/* Loading Overlay */}
        {topicsLoading && (
          <View className="absolute inset-0 bg-[#D0F5B3] rounded-2xl z-10 justify-center items-center">
            <ActivityIndicator size="large" color="#77E425" />
          </View>
        )}
        
        <View>
          {/* Completed */}
          <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: '#77E425',
            }}
            className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white"
            onPress={() => {
              Vibration.vibrate(50);
              navigateToLearningTopic('completed')
            }}
            disabled={topicsLoading || !selectedChapter}
          >
            <View className="flex-row items-center">
              <Text
                className="text-[#454F5B] font-inter500 py-1 px-2"
                style={{ fontSize: GetFontSize(16) }}
              >
                Completed
              </Text>
              <Text
                className="text-[#454F5B] font-inter600"
                style={{ fontSize: GetFontSize(14) }}
              >
                ({getTopicCount('completed')})
              </Text>
            </View>
            <RightArrowIcon color="#77E425" />
          </TouchableOpacity>

          {/* Pending */}
          <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: '#77E425',
            }}
            className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white"
            onPress={() => {
              Vibration.vibrate(50);
              navigateToLearningTopic('pending')
            }}
            disabled={topicsLoading || !selectedChapter}
          >
            <View className="flex-row items-center">
              <Text
                className="text-[#454F5B] font-inter500 py-1 px-2"
                style={{ fontSize: GetFontSize(16) }}
              >
                Pending
              </Text>
              <Text
                className="text-[#454F5B] font-inter600"
                style={{ fontSize: GetFontSize(14) }}
              >
                ({getTopicCount('pending')})
              </Text>
            </View>
            <RightArrowIcon color="#77E425" />
          </TouchableOpacity>

          {/* Assigned */}
          <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: '#77E425',
            }}
            className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white"
            onPress={() => {
              Vibration.vibrate(50);
              navigateToLearningTopic('assigned')
            }}
            disabled={topicsLoading || !selectedChapter}
          >
            <View className="flex-row items-center">
              <Text
                className="text-[#454F5B] font-inter500 py-1 px-2"
                style={{ fontSize: GetFontSize(16) }}
              >
                Not Assigned
              </Text>
              <Text
                className="text-[#454F5B] font-inter600"
                style={{ fontSize: GetFontSize(14) }}
              >
                ({getTopicCount('assigned')})
              </Text>
            </View>
            <RightArrowIcon color="#77E425" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Dropdown */}
      <View className="absolute bottom-0 left-0 right-0">
        {isDropdownOpen && (
          <Animated.View
            style={{
              height: dropdownHeight,
              backgroundColor: '#F8F4E6',
              marginHorizontal: 20,
              marginBottom: 10,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#E7B686',
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 8 }}
              showsVerticalScrollIndicator={false}
            >
              {chapters.map((chapter) => {
                const isSelected = isChapterSelected(chapter.id);
                return (
                  <TouchableOpacity
                    key={chapter.id}
                    onPress={() => {
                      Vibration.vibrate(50);
                      selectChapter(chapter)
                    }}
                    style={{
                      backgroundColor: isSelected ? '#FFE4B5' : 'white',
                      marginVertical: 4,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: isSelected ? '#DC9047' : '#E7B686',
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: GetFontSize(14),
                        color: isSelected ? '#DC9047' : '#8B6914',
                        fontWeight: isSelected ? '600' : '500',
                      }}
                    >
                      {chapter.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}

        {/* Main Chapter Button */}
        <View className="bg-white px-5 py-4" style={{ zIndex: 999 }}>
          <LinearGradient
            colors={['#9C7B5B', '#E7B686']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 24, padding: 2 }}
          >
            <TouchableOpacity
              className="bg-white py-4 px-5 rounded-3xl items-center flex-row justify-center"
              style={{
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderTopWidth: 1,
                borderBottomWidth: 3,
                borderColor: '#E7B686',
              }}
              onPress={toggleDropdown}
            >
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#DC9047] font-inter700 mr-2 flex-1 text-center"
              >
                {selectedChapter
                  ? selectedChapter.name
                  : loading
                    ? 'Loading...'
                    : 'Select Chapter'}
              </Text>
              <Animated.View
                style={{
                  transform: [{ rotate: rotateIcon }],
                }}
              >
                <ScrollUpArrow Width={12} Height={12} color="#DC9047" />
              </Animated.View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 500,
          }}
          activeOpacity={1}
          onPress={toggleDropdown}
        />
      )}
    </View>
  );
};

export default StudentsInsights;