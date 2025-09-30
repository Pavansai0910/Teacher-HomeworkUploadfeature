import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';
import { useSelector } from 'react-redux';
import StudentsInsightsCard from '../HomeScreen/Cards/StudentsInsightsCard';
import LessonPlannerCard from '../HomeScreen/Cards/LessonPlannerCard';
import AssignTestCard from '../HomeScreen/Cards/AssignTestCard';
import NotificationIcon from '../../Images/Home/NotificationIcon';

const { width } = Dimensions.get('window');

const Home = () => {
  const { teacherProfile } = useContext(AuthContext);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const cardWidth = width * 0.7;
  const cardSpacing = 1;

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / cardWidth);
    setCurrentIndex(index);
  };

  // Get classes with combined class and section data
  const classes = teacherProfile?.assignments?.map(a => ({
    classId: a.classId,
    sectionId: a.sectionId,
    displayName: `${a.classId?.className || 'Class'} - ${a.sectionId?.sectionName || 'Section'}`
  })) || [];

  // Get subjects based on selected class
  const subjects = selectedClass
    ? teacherProfile?.assignments
        ?.filter(a => 
          a.classId?._id === selectedClass.classId?._id && 
          a.sectionId?._id === selectedClass.sectionId?._id
        )
        .map(a => a.subjectId)
        .filter(Boolean) // Remove null/undefined subjects
    : [];

  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  // Initialize with selectedAssignment data
  useEffect(() => {
    if (selectedAssignment) {
      setSelectedClass({
        classId: selectedAssignment.classId,
        sectionId: selectedAssignment.sectionId
      });
      setSelectedSubject(selectedAssignment.subjectId);
    }
  }, [selectedAssignment]);

  useEffect(() => {
    console.log('Selected Assignment:', selectedAssignment);
    console.log('Classes:', classes);
    console.log('Selected Class:', selectedClass);
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
      return selectedSubject.subjectName;
    }
    // Fallback to selectedAssignment
    if (selectedAssignment?.subjectId) {
      return selectedAssignment.subjectId.subjectName;
    }
    return 'Select Subject';
  };

  return (
    <SafeAreaView className="flex-1 mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-2 pb-5 bg-white">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate('Settings')}
        >
          <View className="w-11 h-11 rounded-full bg-[#E75B9C] items-center justify-center mr-3">
            <Text className="text-white font-bold text-base">
              {teacherProfile?.name?.[0] || 'T'}
            </Text>
          </View>
          <View>
            <Text className="text-[#454F5B] text-[16px] font-bold">
              {teacherProfile?.name}
            </Text>
            <Text className="text-[#637381] text-[14px] font-regular">
              Welcome to Adaptmate
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center">
          <NotificationIcon />
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
            }}
            onPress={() => setClassModalVisible(true)}
          >
            <Text className="text-[#DC9047] font-semibold text-sm">
              {getClassDisplayText()}
            </Text>
            <Text className="text-[#DC9047] text-lg">▼</Text>
          </TouchableOpacity>

          {/* Subject Dropdown */}
          <TouchableOpacity
            className="flex-1 mr-2 rounded-[16px] py-3 px-4 flex-row justify-between items-center shadow-sm"
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
            <Text className="text-[#DC9047] font-semibold text-sm">
              {getSubjectDisplayText()}
            </Text>
            <Text className="text-[#DC9047] text-lg">▼</Text>
          </TouchableOpacity>
        </View>

        {/* Class Modal */}
        <Modal visible={classModalVisible} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-3/4 rounded-lg p-4 max-h-80">
              <Text className="text-lg font-bold mb-4 text-center">Select Class & Section</Text>
              <FlatList
                data={classes}
                keyExtractor={(item, index) =>
                  `${item.classId?._id}-${item.sectionId?._id}` || index.toString()
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-gray-200"
                    onPress={() => {
                      setSelectedClass({
                        classId: item.classId,
                        sectionId: item.sectionId
                      });
                      setSelectedSubject(null); 
                      setClassModalVisible(false);
                    }}
                  >
                    <Text className="text-[#454F5B] text-base font-semibold">
                      {item.displayName}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text className="text-center text-gray-500 py-4">
                    No classes available
                  </Text>
                }
              />
              <TouchableOpacity
                className="mt-4 bg-red-500 py-2 rounded-lg"
                onPress={() => setClassModalVisible(false)}
              >
                <Text className="text-white text-center font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Subject Modal - Remove the duplicate one */}
        <Modal visible={subjectModalVisible} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-3/4 rounded-lg p-4 max-h-80">
              <Text className="text-lg font-bold mb-4 text-center">Select Subject</Text>
              <FlatList
                data={subjects}
                keyExtractor={(item, index) =>
                  item?._id || index.toString()
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-gray-200"
                    onPress={() => {
                      setSelectedSubject(item);
                      setSubjectModalVisible(false);
                    }}
                  >
                    <Text className="text-[#454F5B] text-base font-semibold">
                      {item?.subjectName}
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
                <Text className="text-white text-center font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Cards */}
        <View className="flex-1 justify-center">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={cardWidth + cardSpacing}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: width * 0.15,
              alignItems: 'center',
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
              cardSpacing={cardSpacing}
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
                  className="rounded-full mx-1"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: dotColor,
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