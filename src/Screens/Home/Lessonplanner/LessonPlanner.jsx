import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Vibration
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import capitalize from '../../../Utils/Capitalize';
import GetFontSize from '../../../Commons/GetFontSize';
import DropdownArrow from '../../../Images/LessonPlan/DropdownArrow';
import LessonPlanNavbar from './LessonPlanNavbar';
import { Shadow } from 'react-native-shadow-2';
import { getChapters } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import TopArrow from '../../../Images/LessonPlan/TopArrow';


const LessonPlanner = () => {
  const navigation = useNavigation();
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );
  const [selectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allChapters, setAllChapters] = useState([]);
  const { teacherProfile } = useContext(AuthContext);


  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await getChapters({
          classId: selectedAssignment?.classId?._id,
          subjectId: selectedAssignment?.subjectId?._id,
          boardId: teacherProfile?.schoolId?.boardId,
        });
        setAllChapters(response.data.chapters);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response.status != 400 && error.response.status != 404) {
          Toast.show({
            type: 'error',
            text1: "Unable to fetch chapters"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [selectedAssignment]);

  useEffect(() => {
    if (selectedChapterName && allChapters.length > 0) {
      const chapterObject = allChapters.find(c => c.name === selectedChapterName);
      if (chapterObject) {
        setSelectedChapterId(chapterObject.id || chapterObject._id);
      } else {
        setSelectedChapterId(null);
      }
    }
  }, [selectedChapterName, allChapters]);

  const handleChapterSelect = chapterName => {
    setSelectedChapterName(chapterName);
    setIsModalVisible(false);
  };


  // Prepare class and subject display
  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';

  const subjectDisplay =
    capitalize(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';

  const chapterOptions = allChapters?.map(chapter => chapter.name) || [];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <LessonPlanNavbar
        classDisplay={classDisplay}
        subjectDisplay={subjectDisplay}
      />
      <ScrollView className="flex-1">
        {/* Progress Steps */}
        <View className="px-6 mt-3">
          <View className="bg-[#1CB0F6] rounded-2xl px-3 py-6">
            {/* Stepper */}
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 */}
              <View className="items-center">
                <Shadow
                  distance={3}
                  startColor="#6FCE62"
                  offset={[0, 3]}
                  radius={20}
                  style={{ borderRadius: 50 }}
                >
                  <View
                    className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center"
                  >
                    <View
                      className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="text-[#212B36] font-inter600"
                      >
                        1
                      </Text>
                    </View>
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-white font-inter600"
                    >
                      Choose Chapter
                    </Text>
                  </View>
                </Shadow>
              </View>
              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />
              {/* Step 2 */}
              <View className="items-center">
                <Shadow
                  distance={1}
                  startColor="#CDCDCD"
                  offset={[0, 2]}
                  radius={20}
                  style={{ borderRadius: 50 }}
                >

                  <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                    <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="text-white font-inter600"
                      >
                        2
                      </Text>
                    </View>
                  </View>
                </Shadow>
              </View>
              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />
              {/* Step 3 */}
              <View className="items-center">
                <Shadow
                  distance={1}
                  startColor="#CDCDCD"
                  offset={[0, 2]}
                  radius={20}
                  style={{ borderRadius: 50 }}
                >
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
                </Shadow>
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
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-white font-inter600mb-2 text-center"
                >
                  Ready to plan smarter?
                </Text>
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className="text-white font-inter400 leading-5 px-2 text-center"
                >
                  Select a chapter for which you want to generate a lesson plan
                  or quickly view your saved plans for this class.
                </Text>
              </View>
            </View>
            <View className="w-full">
              {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <LinearGradient
                  colors={['#A17F5E', '#B8916B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 8,
                    paddingTop: 3,
                    paddingRight: 3,
                    paddingBottom: 6,
                    paddingLeft: 3,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Vibration.vibrate(50);
                      setIsModalVisible(true);
                    }}
                    className="bg-white rounded-lg px-4 py-4"
                  >
                    <View className="flex-row items-center justify-between">
                      <Text
                        style={{
                          fontSize: GetFontSize(17),
                          color: '#DC9047',
                          fontFamily: 'Inter',
                          fontWeight: '700',
                          lineHeight: GetFontSize(16) * 1.35,
                          letterSpacing: GetFontSize(16) * -0.02,
                          flex: 1, // Takes available space
                          flexWrap: 'wrap', // Allows text to wrap
                          marginRight: 8, // Space between text and icon
                        }}
                        className="font-inter700"
                        numberOfLines={2} // Limits to 2 lines max
                      >
                        {selectedChapterName || "Choose a chapter to get started"}
                      </Text>
                      <DropdownArrow color="#DC9047" />
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </View>

            <TouchableOpacity
              className="bg-white rounded-xl p-3 mt-6 items-center "
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 4,
                borderColor: '#A17F5E',
              }}
              onPress={() => {
                Vibration.vibrate(50);

                navigation.navigate('LessonPlanHistory')
              }
              }>
              <View className="flex-row justify-center items-center gap-2">
                <Text
                  style={{ fontSize: GetFontSize(15) }}
                  className="text-[#DC9047] font-inter700"
                >
                  Saved Lesson plans
                </Text>
                <TopArrow color="#DC9047" />
              </View>
            </TouchableOpacity>
          </View>
        </View>



        {/* Pro Tip */}
        {/* <View className="px-6 mt-4">
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className="text-[#454F5B] font-inter600 bg-[#F5F0FD] px-2 py-4 rounded-lg"
          >
            <Text
              style={{ fontSize: GetFontSize(13) }}
              className="font-inter500"
            >
              Pro Tip:
            </Text>{' '}
            Regular testing improves retention by 40%!
          </Text>
        </View> */}

        {/* <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-2 mb-2" /> */}
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 mb-4 pt-2 border-t-2 border-[#DFE3E8]">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#DFE3E8] rounded-xl justify-center items-center px-4 py-3"
            onPress={() => {
              Vibration.vibrate(50);

              navigation.goBack()
            }
            }>
            <LeftArrow color="#1EAFF7" />
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#1EAFF7] font-inter600"
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!selectedChapterId}
            onPress={() => {
              Vibration.vibrate(50);
              navigation.navigate('LessonPlanTopics', {
                chapterId: selectedChapterId,
              })
            }
            }
            className={`flex-row gap-1 flex-1 py-3 rounded-xl justify-center items-center border-t-[1.5px] border-x-2 border-b-4 ${selectedChapterId
              ? 'bg-[#1EAFF7] border-[#0786C5]'
              : 'bg-[#1EAFF7] border-[#0786C5] opacity-60'
              }`}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className={'font-inter600 text-white'}
            >
              Continue
            </Text>
            <RightArrow color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chapter Selection Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Modal Header */}
            <View className="px-4 pt-8 pb-4 border-b-4 border-[#DFE3E8] flex-row justify-between items-center bg-[#E0F5FF]">
              <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600">
                Select Chapter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(50);

                  setIsModalVisible(false)
                }
                }
              >
                <View className="w-6 h-6 bg-[#1EAFF7] border border-[#1A9DDD] rounded-full justify-center items-center">
                  <Text className="text-white font-inter400">✕</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Chapter List with ScrollView */}
            <LinearGradient
              colors={['#E0F5FF', '#1EAFF7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={true}
              >
                {allChapters.map((chapter, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      Vibration.vibrate(50);

                      handleChapterSelect(chapter.name);
                      setIsModalVisible(false);
                    }}
                    className={`p-4 mb-3 rounded-lg ${selectedChapterName === chapter.name
                      ? 'bg-[#1EAFF7]'
                      : 'bg-white'
                      }`}
                    style={{
                      borderTopWidth: 1,
                      borderRightWidth: 2,
                      borderBottomWidth: 4,
                      borderLeftWidth: 2,
                      borderColor: selectedChapterName === chapter.name ? '#077FBB' : '#1A9DDD',
                      borderStyle: 'solid'
                    }}
                  >
                    <Text
                      style={{ fontSize: GetFontSize(15) }}
                      className={`font-inter500 ${selectedChapterName === chapter.name
                        ? 'text-white'
                        : 'text-[#212B36]'
                        }`}
                    >
                      {chapter.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </LinearGradient>


          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

export default LessonPlanner;