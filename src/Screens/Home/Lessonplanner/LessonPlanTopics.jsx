import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Vibration
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import { getAllTopics } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import capitalize from '../../../Utils/Capitalize';
import GetFontSize from '../../../Commons/GetFontSize';
import TopArrow from '../../../Images/LessonPlan/TopArrow';
import LessonPlanNavbar from './LessonPlanNavbar';
import { Shadow } from 'react-native-shadow-2';
import CrossIcon from '../../../Images/Home/CrossIcon';

const LessonPlanTopics = ({ route }) => {
  const navigation = useNavigation();
  const chapterId = route.params.chapterId;
  const { teacherProfile } = useContext(AuthContext);
  const selectedAssignment = useSelector(
    state => state.assignment.selectedAssignment,
  );
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Prepare class and subject display
  const classDisplay = selectedAssignment
    ? `${selectedAssignment.classId?.className || 'Class'}-${selectedAssignment.sectionId?.sectionName || 'Section'}`
    : 'Not selected';
  const subjectDisplay =
    capitalize(selectedAssignment?.subjectId?.subjectName) ||
    'Not selected';
  const selectedTopicsDisplay = selectedTopics.length > 0
    ? `${selectedTopics.length} topic${selectedTopics.length > 1 ? 's' : ''} selected`
    : 'Select topics...';
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
    Vibration.vibrate(50);

    const isSelected = selectedTopics.some(t => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  const handleContinue = () => {
    if (selectedTopics.length === 0) return;
    Vibration.vibrate(50);
    navigation.navigate('LessonPlanGeneration', {
      chapterId,
      selectedTopics: selectedTopics,
    });
  };

  const renderTopicItem = ({ item }) => {
    const isSelected = selectedTopics.some(t => t.id === item.id);
    return (

      <TouchableOpacity
        onPress={() => handleTopicToggle(item)}
        className={`p-3 mb-3 rounded-lg ${isSelected ? 'bg-[#FCF5EE]' : 'bg-white'
          }`}
        style={{
          borderTopWidth: 1,
          borderRightWidth: 2,
          borderBottomWidth: 4,
          borderLeftWidth: 2,
          borderColor: '#E8B787',
          borderStyle: 'solid'
        }}
      >
        <View className="flex-row justify-between items-center ">
          <Text
            style={{ fontSize: GetFontSize(15) }}
            className={`flex-1 font-inter500 pr-2 ${isSelected ? 'text-[#B0743A]' : 'text-[#212B36]'
              }`}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <View
            className={`w-5 h-5 rounded justify-center items-center ${isSelected ? 'bg-[#DC9047] border-2' : 'border-2 bg-white'
              }`}
            style={{
              borderColor: isSelected ? '#B0743A' : '#DFE3E8',
              borderWidth: 2,
            }}
          >
            {isSelected && (
              <Text className="text-white font-inter600 text-xs">✓</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
            <View className="flex-row items-center justify-between mb-5">
              {/* Step 1 - Completed */}
              <View className="items-center">
                <Shadow
                  distance={1}
                  startColor="#6FCE62"
                  offset={[0, 2]}
                  radius={20}
                  style={{ borderRadius: 50 }}
                >
                  <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-[#FFF] items-center">
                    <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="font-inter600"
                      >
                        1
                      </Text>
                    </View>
                  </View>
                </Shadow>
              </View>
              <View className="flex-1 h-[3px] bg-[#F7F7F5]" />
              {/* Step 2 - Active */}
              <View className="items-center">
                <Shadow
                  distance={3}
                  startColor="#6FCE62"
                  offset={[0, 3]}
                  radius={20}
                  style={{ borderRadius: 50 }}
                >
                  <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
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
                      Select Topics
                    </Text>
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
                <View className="w-16 h-16 rounded-xl justify-center items-center">
                  <Document />
                </View>
                {/* <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-white font-inter600 mb-2 text-center"
                >
                  Pick the topics you want to cover!
                </Text>
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className="text-white font-inter400 leading-5 px-2 text-center"
                >
                  Select one or more topics from the list to generate a
                  comprehensive lesson plan.
                </Text> */}
              </View>
            </View>
            {/* Topics Selection */}
            {/* <TouchableOpacity
              className="bg-white rounded-xl p-3 mb-4"
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 4,
                borderColor: '#89D5FB',
              }}
              onPress={() => {
                Vibration.vibrate(50);

                navigation.navigate('LessonPlanHistory')
              }
              }>
              <View className="flex-row justify-center items-center gap-2">
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-[#1EAFF7] font-inter600"
                >
                  Saved Lesson plans
                </Text>
                <TopArrow color="#1EAFF7" />
              </View>
            </TouchableOpacity> */}

            {loading ? (
              <View className="py-8">
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
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
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Vibration.vibrate(50);

                    setIsModalVisible(true)
                  }
                  }
                  className="bg-white rounded-lg px-4 py-4"
                >
                  <Text
                    style={{
                      fontSize: GetFontSize(16),
                      color: '#DC9047',
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      lineHeight: GetFontSize(16) * 1.35,
                      letterSpacing: GetFontSize(16) * -0.02
                    }}
                    className="font-inter700"
                  >
                    {selectedTopicsDisplay}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </View>
        {/* Pro Tip */}
        <View className="px-6 mt-4">
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
            Select multiple topics to create a comprehensive lesson plan!
          </Text>
        </View>
        {/* <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-2 mb-2" /> */}
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 mb-4 pt-2 border-t-2 border-[#DFE3E8]">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-row gap-1 border-[#DFE3E8] rounded-xl border-t-[1.5px] border-x-2 border-b-4 justify-center items-center px-4 py-3"
            onPress={() => {
              Vibration.vibrate(50);

              navigation.goBack()
            }
            }
          >
            <LeftArrow color="#1EAFF7" />
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#1EAFF7] font-inter600"
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-row gap-1 flex-1 py-3 justify-center items-center rounded-xl border-t-[1.5px] border-x-2 border-b-4 ${selectedTopics.length > 0
              ? 'bg-[#1EAFF7] border-[#0786C5]'
              : 'bg-[#1EAFF7] border-[#0786C5] opacity-60'
              }`}
            onPress={handleContinue}
            disabled={selectedTopics.length === 0}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-white font-inter600"
            >
              Continue
            </Text>
            <RightArrow />
          </TouchableOpacity>
        </View>
      </View>
      {/* Topics Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View className="bg-[#e0f5ff] " style={{ flex: 1, backgroundColor: 'white' }}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Modal Header */}
            <View className="px-8 pt-8 flex-row justify-between items-center bg-[#e0f5ff] ">
              <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600">
                Select Topics
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(50);

                  setIsModalVisible(false)
                }
                }
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center">
                <View className="w-7 h-7 bg-[#1EAFF7] border border-[#1A9DDD] rounded-full justify-center items-center">
                  <CrossIcon />
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#637381] font-inter400 px-8 bg-[#e0f5ff] pb-4"
            >
              {selectedTopics.length} of {topics.length} selected
            </Text>
            {/* Topics List with FlatList */}
            <View
              className="flex-1 bg-[#e0f5ff] p-6"
            >
              <View className="flex-1 bg-[#1eaff7] rounded-lg p-2">
                <FlatList
                  data={topics}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderTopicItem}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                  showsVerticalScrollIndicator={true}
                />
              </View>
            </View>
            {/* Modal Footer */}
            <View className="px-6 py-4 border-t-2 border-[#DFE3E8] bg-white">
              <TouchableOpacity
                className={`py-3 rounded-lg justify-center items-center ${selectedTopics.length > 0
                  ? 'bg-[#1EAFF7]'
                  : 'bg-gray-400 '
                  }`}
                onPress={() => {
                  Vibration.vibrate(50);

                  setIsModalVisible(false);
                  if (selectedTopics.length > 0) {
                    handleContinue();
                  }
                }}
                disabled={selectedTopics.length === 0}
              >
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className={`font-inter600 ${selectedTopics.length > 0 ? 'text-white' : 'text-gray-500'
                    }`}
                >
                  Done ({selectedTopics.length})
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};
export default LessonPlanTopics; 