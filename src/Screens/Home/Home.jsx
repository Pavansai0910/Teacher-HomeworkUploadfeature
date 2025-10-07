import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';
import StudentsInsightsCard from '../HomeScreen/Cards/StudentsInsightsCard';
import LessonPlannerCard from '../HomeScreen/Cards/LessonPlannerCard';
import AssignTestCard from '../HomeScreen/Cards/AssignTestCard';
import NotificationIcon from '../../Images/Home/NotificationIcon';
import capitalizeSubject from '../../Utils/CapitalizeSubject';
import GetFontSize from '../../Commons/GetFontSize';
import { useSelector, useDispatch } from 'react-redux';
import { setAssignment } from '../../store/Slices/assignment';
import DropdownArrow from '../../Images/LessonPlan/DropdownArrow';

const Home = () => {
  const { teacherProfile } = useContext(AuthContext);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions('screen');

  // Dropdown states
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);

  const gradientBackgrounds = [
    ['#FFFFFF', '#BBF192'],
    ['#FFFFFF', '#93D8FB'],
    ['#FFFFFF', '#FEDB85'],
  ];

  const cardWidth = width * 0.8;
  const cardSpacing = 2;

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (cardWidth + cardSpacing));
    setCurrentIndex(index);
  };

  // Get classes with combined class and section data
  const classes =
    teacherProfile?.assignments?.reduce((acc, a) => {
      const key = `${a.classId?._id}-${a.sectionId?._id}`;
      if (!acc.some(item => item.key === key)) {
        acc.push({
          key,
          classId: a.classId,
          sectionId: a.sectionId,
          displayName: `${a.classId?.className || 'Class'} - ${a.sectionId?.sectionName || 'Section'}`,
        });
      }
      return acc;
    }, []) || [];

  // Get subjects based on selected class
  const subjects = selectedClass
    ? teacherProfile?.assignments
      ?.filter(
        a =>
          a.classId?._id === selectedClass.classId?._id &&
          a.sectionId?._id === selectedClass.sectionId?._id,
      )
      .map(a => a.subjectId)
      .filter(Boolean)
    : [];

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  // Initialize with selectedAssignment data
  useEffect(() => {
    if (selectedAssignment) {
      setSelectedClass({
        classId: selectedAssignment.classId,
        sectionId: selectedAssignment.sectionId,
      });
      setSelectedSubject(selectedAssignment.subjectId);
    }
  }, [selectedAssignment]);

  useEffect(() => {
    // console.log('Selected Assignment:', selectedAssignment);
    // console.log('Classes:', classes);
    // console.log('Selected Class:', selectedClass);
  }, [selectedAssignment, classes, selectedClass]);

  // Get display text for class dropdown
  const getClassDisplayText = () => {
    if (selectedClass) {
      return `${selectedClass.classId?.className || 'Class'} - ${selectedClass.sectionId?.sectionName || 'Section'}`;
    }
    // Fallback to selectedAssignment
    if (selectedAssignment) {
      return `${selectedAssignment.classId?.className || 'Class'} - ${selectedAssignment.sectionId?.sectionName || 'Section'}`;
    }
    return 'Select Class';
  };

  // Get display text for subject dropdown
  const getSubjectDisplayText = () => {
    if (selectedSubject) {
      return capitalizeSubject(selectedSubject.subjectName);
    }
    // Fallback to selectedAssignment
    if (selectedAssignment?.subjectId) {
      return capitalizeSubject(selectedAssignment.subjectId.subjectName);
    }
    return 'Select Subject';
  };

  const styles = StyleSheet.create({
    shadowContainer: {
      backgroundColor: '#FFF',
      shadowColor: '#025ECA',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <SafeAreaView className="flex-1 mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-2 pb-5 bg-white">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate('Settings')}
        >
          <View className="w-11 h-11 rounded-full bg-[#E75B9C] items-center justify-center mr-3">
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-white font-poppins400"
            >
              {teacherProfile?.name?.[0] || 'T'}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#454F5B] font-inter700"
            >
              {teacherProfile?.name
                ?.split(' ')
                .map(
                  word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                )
                .join(' ')}
            </Text>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#637381] font-inter400"
            >
              Welcome to Adaptmate
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Gradient Background */}
      <LinearGradient
        colors={gradientBackgrounds[currentIndex]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Dropdowns */}
        <View className="flex-row justify-between px-6 pt-4 pb-6">
          {/* Class Dropdown */}
          <TouchableOpacity
            className="flex-1 mr-2 rounded-[16px] py-3 px-4 flex-row justify-between items-center shadow-sm"
            style={{
              backgroundColor: '#FFF',
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderBottomWidth: 6,
              borderLeftWidth: 3,
              borderColor: '#A17F5E',
            }
            }
            onPress={() => setClassModalVisible(true)}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#DC9047] font-inter700"
            >
              Class: {getClassDisplayText()}
            </Text>
            <DropdownArrow color="#DC9047" />
          </TouchableOpacity>

          {/* Subject Dropdown */}
          <TouchableOpacity
            className="flex-1 rounded-[16px] py-3 px-6 flex-row"
            style={{
              backgroundColor: '#FFF',
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderBottomWidth: 6,
              borderLeftWidth: 3,
              borderColor: '#A17F5E',
            }}
            onPress={() => {
              if (!selectedClass && !selectedAssignment) {
                alert('Please select a class first');
                return;
              }
              setSubjectModalVisible(true);
            }}
            disabled={!selectedClass && !selectedAssignment}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#DC9047] font-inter700"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {getSubjectDisplayText()}
            </Text>
            <DropdownArrow color="#DC9047" />
          </TouchableOpacity>
        </View>

        {/* Class Modal */}
        <Modal visible={classModalVisible} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-3/4 rounded-lg p-4 max-h-80">
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="font-inter700 mb-4"
              >
                Select Class & Section
              </Text>
              <FlatList
                data={classes}
                keyExtractor={(item, index) =>
                  `${item.classId?._id || 'class'}-${item.sectionId?._id || 'section'}-${index}`
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-gray-200"
                    onPress={() => {
                      const updatedAssignment = {
                        ...selectedAssignment,
                        classId: item.classId,
                        sectionId: item.sectionId,
                      };

                      setSelectedClass({
                        classId: item.classId,
                        sectionId: item.sectionId,
                      });
                      setSelectedSubject(null);

                      dispatch(setAssignment(updatedAssignment));

                      setClassModalVisible(false);
                    }}
                  >
                    <Text
                      style={{ fontSize: GetFontSize(16) }}
                      className="text-[#454F5B] font-inter700"
                    >
                      Class: {item.displayName}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text
                    style={{ fontSize: GetFontSize(16) }}
                    className="text-center font-inter700 py-4"
                  >
                    No classes available
                  </Text>
                }
              />

              <TouchableOpacity
                className="mt-4 bg-red-500 py-2 rounded-lg"
                onPress={() => setClassModalVisible(false)}
              >
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-white text-center font-inter700"
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Subject Modal */}
        <Modal visible={subjectModalVisible} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-3/4 rounded-lg p-4 max-h-80">
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="font-inter700 mb-4 text-center"
              >
                Select Subject
              </Text>
              <FlatList
                data={subjects}
                keyExtractor={(item, index) =>
                  `${item?._id || 'subject'}-${index}`
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-gray-200"
                    onPress={() => {
                      const updatedAssignment = {
                        ...selectedAssignment,
                        subjectId: item,
                      };

                      setSelectedSubject(item);

                      // update redux
                      dispatch(setAssignment(updatedAssignment));

                      setSubjectModalVisible(false);
                    }}
                  >
                    <Text className="text-[#454F5B] text-base font-semibold">
                      {capitalizeSubject(item?.subjectName)}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text className="text-center text-gray-500 py-4">
                    No subjects available for selected class
                  </Text>
                }
              />

              <TouchableOpacity
                className="mt-4 bg-red-500 py-2 rounded-lg"
                onPress={() => setSubjectModalVisible(false)}
              >
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-white text-center font-inter700"
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Cards */}
        <View className="flex-1 justify-center items-center">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={cardWidth + cardSpacing}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - cardWidth) / 2,
            }}
          >
            <StudentsInsightsCard
              onPress={() => navigation.navigate('StudentsInsights')}
              isActive={currentIndex === 0}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
            <LessonPlannerCard
              onPress={() => navigation.navigate('LessonPlanner')}
              isActive={currentIndex === 1}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
            <AssignTestCard
              onPress={() => navigation.navigate('AssignTest')}
              isActive={currentIndex === 2}
              cardWidth={cardWidth}
              cardSpacing={0}
            />
          </ScrollView>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center mt-5 mb-8">
            {gradientBackgrounds.map((_, index) => {
              let dotColor = '#FFFFFF';
              if (currentIndex === index) {
                if (index === 0) dotColor = '#A5ED6F';
                else if (index === 1) dotColor = '#1EAFF7';
                else if (index === 2) dotColor = '#FED570';
              }
              return (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5, 
                    backgroundColor: dotColor,
                    marginHorizontal: 4, 
                  }}
                />
              );
            })}
          </View>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
