// AssignTest.js
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import NavHeader from '../../NavHeader';
import GetFontSize from '../../../Commons/GetFontSize';
import { useState, useEffect, useContext } from 'react';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import { getChapters } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import Toast from 'react-native-toast-message';
import ChapterListModal from './ChapterListModal'; 

const AssignTest = () => {
  const navigation = useNavigation();
  const { teacherProfile } = useContext(AuthContext);
  const [selectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allChapters, setAllChapters] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedAssignment = useSelector(
    (state) => state.assignment.selectedAssignment
  );

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await getChapters({
          classId: selectedAssignment?.classId?._id,
          subjectId: selectedAssignment?.subjectId?._id,
          boardId: teacherProfile?.schoolId?.boardId,
        });
        setAllChapters(response.data.chapters);
        console.log(response.data.chapters);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
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

  const handleChapterSelect = (chapterName) => {
    setSelectedChapterName(chapterName);
    setIsModalVisible(false);
  };

  const renderHeader = () => (
    <View>
      <NavHeader />

      <View className="px-4 mt-6">
        <View className="bg-[#FED570] rounded-2xl p-6">
          {/* Progress Steps */}
          <View className="flex-row items-center justify-between mb-5">
            <View className="items-center">
              <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center ">
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                  <Text style={{ fontSize: GetFontSize(12) }}
                    className="text-[#212B36] font-inter600">
                    1
                  </Text>
                </View>
                <Text style={{ fontSize: GetFontSize(12) }}
                  className="text-white font-inter600">
                  Choose Chapter
                </Text>
              </View>
            </View>

            <View className="flex-1 h-[2px] bg-[#F7F7F5] " />

            <View className="items-center">
              <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                  <Text style={{ fontSize: GetFontSize(12) }}
                    className="text-white font-inter600">
                    2
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

            <View className="items-center">
              <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                  <Text style={{ fontSize: GetFontSize(12) }}
                    className="text-white font-inter600">
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

          {/* Content Box */}
          <View className="rounded-xl mt-8">
            <View className="items-center mb-6">
              <View 
                className="justify-center items-center mb-2"
                style={{ width: 27.43, height: 41.71 }}
              >
                <Document />
              </View>

              <Text 
                style={{ 
                  fontSize: 16,
                  lineHeight: 16 * 1.35,
                  letterSpacing: -0.32,
                  fontWeight: '700'
                }}
                className="text-[#B68201] font-inter700 mb-2 text-center">
                Ready to plan smarter?
              </Text>

              <Text 
                style={{ 
                  fontSize: 13,
                  lineHeight: 13 * 1.35,
                  letterSpacing: -0.26,
                  fontWeight: '500'
                }}
                className="text-[#B68201] font-inter500 px-2 text-center">
                Select a chapter for which you want to assign a test.
              </Text>
            </View>
          </View>

          {/* Choose Chapter Button */}
          <View className="w-full">
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <TouchableOpacity 
                onPress={() => setIsModalVisible(true)}
                className="bg-white rounded-lg px-4 py-4"
                style={{ 
                  borderTopWidth: 1,
                  borderRightWidth: 2,
                  borderBottomWidth: 4,
                  borderLeftWidth: 2,
                  borderColor: '#AB6521',
                  borderStyle: 'solid'
                }}
              >
                <Text
                  style={{ fontSize: GetFontSize(16), color: '#DC9047' }}
                  className="font-inter500"
                >
                  {selectedChapterName || "Choose a chapter to get started..."}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#FFF3D6]" style={{ minHeight: 149, paddingTop: 20, paddingRight: 24, paddingBottom: 20, paddingLeft: 24, justifyContent: 'flex-end' }}>
        <View className="flex-row items-center" style={{ height: 65, gap: 12, marginTop: 13 }}>
          <View className="w-20 h-20 bg-[#FEE19A] rounded-lg justify-center items-center">
            <AssignTestDoc />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-7 h-7 justify-center items-center border-2 border-[#FDCA0C] rounded-full"
                onPress={() => navigation.navigate('MainTabNavigator', { screen: 'Home' })}
              >
                <View className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center">
                  <Text className="text-white font-inter400">✕</Text>
                </View>
              </TouchableOpacity> 
            </View>
            <Text style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] font-inter400">
              Boost your students's progress in{'\n'}just few taps!
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={renderHeader}
      />

      {/* Chapter Selection Modal */}
      <ChapterListModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        allChapters={allChapters}
        selectedChapterName={selectedChapterName}
        selectedChapterId={selectedChapterId}
        onChapterSelect={handleChapterSelect}
        navigation={navigation}
      />

      {/* Fixed Bottom Buttons */}
      <View className="px-4 py-4 bg-white border-t border-[#DFE3E8]" style={{ height: 92, gap: 12 }}>
        <View className="flex-row gap-3">
          <TouchableOpacity
            style={{ fontSize: GetFontSize(16) }}
            className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3 font-inter600"
            onPress={() => navigation.goBack()}
          >
            <LeftArrow color="#FED570" />
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="font-inter600 text-[#FED570] "
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ fontSize: GetFontSize(13) }}
            disabled={!selectedChapterId}
            onPress={() =>
              navigation.navigate('AssignTestTopics', {
                chapterId: selectedChapterId,
                chapterName: selectedChapterName,
              })
            }
            className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 ${selectedChapterId
              ? 'bg-[#FED570] border-[#DFAF02]'
              : 'bg-[#FEDB85] border-[#DFAF02]'
            }`}
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className={`font-inter600 ${selectedChapterId ? 'text-[#B68201]' : 'text-[#DFAF02]'}`}
            >
              Continue
            </Text>
            <RightArrow color={selectedChapterId ? "#B68201" : "#DFAF02"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AssignTest;