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
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import Toast from 'react-native-toast-message';
import GetFontSize from '../../../Commons/GetFontSize';
import NavHeader from '../../NavHeader';
import LinearGradient from 'react-native-linear-gradient';
import TopicSelectionModal from './TopicSelectionModal';

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
  const [showModal, setShowModal] = useState(false);

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
    setSelectedTopic(paper);
  };

  const handleContinue = () => {
    if (!selectedTopic) return;
    const payload = { questionPaper: selectedTopic };
    navigation.navigate('AssignTestDate', payload);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
<View className="bg-[#FFF3D6] px-6 py-6">
  <View className="flex-row items-center">
    <View className="w-20 h-20 bg-[#FEE19A] rounded-lg justify-center items-center mr-3">
      <AssignTestDoc />
    </View>
    <View className="flex-1">
      <View className="flex-row justify-between items-start">
        <Text
          style={{ fontSize: GetFontSize(18) }}
          className="text-[#212B36] font-inter600 flex-shrink"
        >
          Assign Test
        </Text>
        <TouchableOpacity
          className="w-6 h-6 bg-[#FDCA0C] rounded-full justify-center items-center"
          onPress={() => navigation.navigate('MainTabNavigator', { screen: 'Home' })}
        >
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className="text-white font-inter400"
          >
            ✕
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{ fontSize: GetFontSize(14) }}
        className="text-[#454F5B] font-inter400"
      >
        Boost your students's progress in{'\n'}just few taps!
      </Text>
    </View>
  </View>
</View>

      {/* Class-Section-Subject Display */}
      <NavHeader />

      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        <View className="px-6 mt-3">
          <View className="bg-[#FED570] rounded-2xl px-3 py-6">
            {/* Content Header */}
            <View className="flex-row items-center justify-between mb-5">
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center">
                    <Text
                      style={{ fontSize: GetFontSize(12) }}
                      className="text-black font-inter600"
                    >
                      1
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

              <View className="items-center">
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

            <View className="items-center mb-4 mt-8">
              <View className="w-16 h-16 rounded-xl justify-center items-center ">
                <Document />
              </View>
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className="text-[#B68201] font-inter600 mb-1 text-center"
              >
                Zoom in and pick your focus!
              </Text>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="text-[#B68201] text-center font-inter500 mb-6">
                Here is the list of topics from{' '}
                <Text className="font-inter700">{chapterName}</Text>.{'\n'}
                {'\n'}
                Select a topic you want to assign a test for.
              </Text>

              {/* Select Topics Button */}
              

                <LinearGradient
                  colors={['#E8B787', '#9B7A5A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 12,
                    paddingTop: 3,
                    paddingRight: 3,
                    paddingBottom: 6,
                    paddingLeft: 3,
                  }}
                >
                  <TouchableOpacity
                    className="bg-white rounded-xl px-6 py-4 flex-row items-center justify-between w-full"
                    onPress={() => setShowModal(true)}
                  >
                    <View className="flex-1">
                      <Text
                        style={{ 
                          fontSize: GetFontSize(16),
                          color: '#DC9047',
                          fontWeight: '700',
                          lineHeight: GetFontSize(14) * 1.35,
                          letterSpacing: GetFontSize(14) * -0.02
                        }}
                        className="font-inter700 mb-1"
                      >
                        {selectedTopic ? selectedTopic.questionPaperTitle : 'Select Topics'}
                      </Text>
                      {!selectedTopic && (
                        <Text
                          style={{ 
                            fontSize: GetFontSize(12),
                            color: '#DC9047',
                            fontWeight: '400',
                            lineHeight: GetFontSize(12) * 1.35,
                            letterSpacing: GetFontSize(12) * -0.02
                          }}
                          className="font-inter400"
                        >
                          Tap to choose from available topics
                        </Text>
                      )}
                    </View>
                    
                  </TouchableOpacity>
                </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View className="px-6 pb-6 pt-5 bg-white border-t border-gray-200">
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
            className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${
              selectedTopic ? 'bg-[#FED570] border-[#DFAF02]' : 'bg-[#FEDB85] border-[#DFAF02]'
            }`}
            onPress={handleContinue}
            disabled={!selectedTopic}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className={`font-inter600 ${selectedTopic ? 'text-[#B68201]' : 'text-[#DFAF02]'}`}
            >
              Continue
            </Text>
            <RightArrow color={selectedTopic ? "#B68201" : "#DFAF02"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Topic Selection Modal */}
      <TopicSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        examData={examData}
        loading={loading}
        selectedTopic={selectedTopic}
        onTopicSelect={handlePaperToggle}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        chapterName={chapterName}
      />
    </SafeAreaView>
  );
};

export default AssignTestTopics;