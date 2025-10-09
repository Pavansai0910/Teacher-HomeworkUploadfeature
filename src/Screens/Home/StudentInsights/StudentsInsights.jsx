import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import capitalizeSubject from '../../../Utils/Capitalize';
import LearningNavbar from './LearningNavbar';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import { useState, useRef, useEffect, useContext } from 'react';
import { getChapters } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import RightArrowIcon from '../../../Images/LessonPlan/RightArrowIcon';

const StudentsInsights = () => {
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );
  const { teacherProfile } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null); 
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = Dimensions.get('window');

  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalizeSubject(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  // Get selected chapter object
  const selectedChapter = chapters.find(ch => ch.id === selectedChapterId) || null;

  // ✅ Fetch Chapters API call
  useEffect(() => {
    const fetchChapters = async () => {
      if (
        !selectedAssignment?.classId?._id ||
        !selectedAssignment?.subjectId?._id ||
        !teacherProfile?.schoolId?.boardId
      ) {
        console.log('Missing required parameters for API call');
        return;
      }

      setLoading(true);
      console.log('Fetching chapters...');

      try {
        const response = await getChapters({
          classId: selectedAssignment.classId._id,
          subjectId: selectedAssignment.subjectId._id,
          boardId: teacherProfile.schoolId.boardId,
        });

        console.log('API Response:', response.data);

        const chapterList =
          response.data?.chapters?.map((ch, index) => ({
            id: ch._id || `chapter_${index}`, // Ensure unique ID
            name: ch.name || 'Untitled Chapter',
            originalData: ch, // Keep original data if needed
          })) || [];

        console.log('Processed chapters:', chapterList);
        setChapters(chapterList);

        // Set the first chapter as selected if available
        if (chapterList.length > 0) {
          setSelectedChapterId(chapterList[0].id);
          console.log('Selected first chapter:', chapterList[0].name);
        }
      } catch (err) {
        console.error('Failed to fetch chapters:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [selectedAssignment]);

  // 🔄 Dropdown open/close animation
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

  // ✅ Handle chapter selection - COMPLETELY REWRITTEN
  const selectChapter = (chapter) => {
    console.log('Selecting chapter:', chapter.name, 'with ID:', chapter.id);

    // Simply update the selected chapter ID
    setSelectedChapterId(chapter.id);

    // Close dropdown
    setIsDropdownOpen(false);
    Animated.spring(dropdownAnimation, {
      toValue: 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();

    console.log('Chapter selection completed');
  };

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(350, screenHeight * 0.43)],
  });

  const rotateIcon = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Helper function to check if chapter is selected
  const isChapterSelected = (chapterId) => {
    return selectedChapterId === chapterId;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LearningNavbar
        classDisplay={classDisplay}
        subjectDisplay={subjectDisplay}
      />

      <View className="bg-[#D0F5B3] p-6 mx-6 mt-6 rounded-2xl ">
        <TouchableOpacity style={{ borderTopWidth: 1, borderBottomWidth: 4, borderLeftWidth: 2, borderRightWidth: 2, borderColor: '#77E425' }}
          className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white">
          <Text className="text-[#454F5B] font-inter500" style={{ fontSize: GetFontSize(16) }}>
            Completed
          </Text>
          <RightArrowIcon color='#77E425' />
        </TouchableOpacity>

        <TouchableOpacity style={{ borderTopWidth: 1, borderBottomWidth: 4, borderLeftWidth: 2, borderRightWidth: 2, borderColor: '#77E425' }}
        className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white">
          <Text className="text-[#454F5B] font-inter500" style={{ fontSize: GetFontSize(16) }}>
            Assigned
          </Text>
          <RightArrowIcon color='#77E425' />
        </TouchableOpacity>
        
        <TouchableOpacity style={{ borderTopWidth: 1, borderBottomWidth: 4, borderLeftWidth: 2, borderRightWidth: 2, borderColor: '#77E425' }}
        className="flex-row justify-between mb-4 p-2 rounded-2xl bg-white">
          <Text className="text-[#454F5B] font-inter500" style={{ fontSize: GetFontSize(16) }}>
            Pending
          </Text>
          <RightArrowIcon color='#77E425' />
        </TouchableOpacity>
      </View>

      {/* Floating Dropdown - */}
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
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 8 }}
              showsVerticalScrollIndicator={false}
            >
              {chapters.map(chapter => {
                const isSelected = isChapterSelected(chapter.id);

                return (
                  <TouchableOpacity
                    key={chapter.id}
                    onPress={() => selectChapter(chapter)}
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
                {selectedChapter ? selectedChapter.name : (loading ? 'Loading...' : 'Select Chapter')}
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
            zIndex: 500,
          }}
          activeOpacity={1}
          onPress={toggleDropdown}
        />
      )}
    </SafeAreaView>
  );
};

export default StudentsInsights;