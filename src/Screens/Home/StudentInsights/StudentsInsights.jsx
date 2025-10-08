import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import capitalizeSubject from '../../../Utils/CapitalizeSubject';
import LearningNavbar from './LearningNavbar';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import { useState, useRef } from 'react';

const StudentsInsights = () => {
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );

  // Dummy chapter data
  const chaptersData = [
    { id: 1, name: 'Number Systems', isSelected: true },
    { id: 2, name: 'Polynomials', isSelected: false },
    { id: 3, name: 'Coordinate Geometry', isSelected: false },
    { id: 4, name: 'Linear Equations', isSelected: false },
    { id: 5, name: 'Introduction to Euclid\'s Geometry', isSelected: false },
    { id: 6, name: 'Lines and Angles', isSelected: false },
    { id: 7, name: 'Triangles', isSelected: false },
    { id: 8, name: 'Quadrilaterals', isSelected: false },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chaptersData[0]);
  const [chapters, setChapters] = useState(chaptersData);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = Dimensions.get('window');

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  const toggleDropdown = () => {
    const toValue = isDropdownOpen ? 0 : 1;
    setIsDropdownOpen(!isDropdownOpen);
    
    Animated.spring(dropdownAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const selectChapter = (chapter) => {
    const updatedChapters = chapters.map(ch => ({
      ...ch,
      isSelected: ch.id === chapter.id
    }));
    
    setChapters(updatedChapters);
    setSelectedChapter(chapter);
    toggleDropdown();
  };

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(350, screenHeight * 0.4)],
  });

  const rotateIcon = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LearningNavbar
        classDisplay={classDisplay}
        subjectDisplay={subjectDisplay}
      />

      {/* Main Content Area */}
      <View className="flex-1">
        {/* Your main content will go here */}
        <View className="flex-1 justify-center items-center">
          <Text style={{ fontSize: GetFontSize(16) }} className="text-gray-500">
            Content for {selectedChapter.name}
          </Text>
        </View>
      </View>

      {/* Floating Chapter Selector */}
      <View className="absolute bottom-0 left-0 right-0">
        {/* Dropdown Content */}
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
            }}
          >
            <ScrollView 
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 8 }}
              showsVerticalScrollIndicator={false}
            >
              {chapters.map((chapter) => (
                <TouchableOpacity
                  key={chapter.id}
                  onPress={() => selectChapter(chapter)}
                  style={{
                    backgroundColor: chapter.isSelected ? '#FFE4B5' : 'white',
                    marginVertical: 4,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: chapter.isSelected ? '#DC9047' : '#E7B686',
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
                      color: chapter.isSelected ? '#DC9047' : '#8B6914',
                      fontWeight: chapter.isSelected ? '600' : '500'
                    }}
                  >
                    {chapter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Main Chapter Button */}
        <View className="bg-white px-5 py-4">
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
                {selectedChapter.name}
              </Text>
              <Animated.View
                style={{
                  transform: [{ rotate: rotateIcon }]
                }}
              >
                <ScrollUpArrow Width={12} Height={12} color="#DC9047" />
              </Animated.View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Overlay to close dropdown when tapping outside */}
      {isDropdownOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
          activeOpacity={1}
          onPress={toggleDropdown}
        />
      )}
    </SafeAreaView>
  );
};

export default StudentsInsights;