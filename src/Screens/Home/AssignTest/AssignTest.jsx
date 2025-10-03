import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import LessonPlanDropdown from '../../../Commons/LessonPlanDropdown';
import { useState, useEffect } from 'react';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import NavHeader from '../../NavHeader';
import GetFontSize from '../../../Commons/GetFontSize';

const AssignTest = () => {
  const navigation = useNavigation();
  const [selectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const { chapters, loading } = useSelector(state => state.chapters);
  const chapterOptions = chapters?.map(chapter => chapter.name) || [];
  
  useEffect(() => {
    if (selectedChapterName && chapters && chapters.length > 0) {
      const chapterObject = chapters.find(c => c.name === selectedChapterName);
      if (chapterObject) {
        setSelectedChapterId(chapterObject.id);
      } else {
        setSelectedChapterId(null);
      }
    }
  }, [selectedChapterName, chapters]);

  const handleChapterSelect = chapterName => {
    setSelectedChapterName(chapterName);
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
                  <Text style={{fontSize: GetFontSize(12)}}
                  className="text-[#212B36] font-inter600">
                    1
                  </Text>
                </View>
                <Text style={{fontSize: GetFontSize(12)}}
                className="text-white font-inter600">
                  Choose Chapter
                </Text>
              </View>
            </View>

            <View className="flex-1 h-[2px] bg-[#F7F7F5] " />

            <View className="items-center">
              <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                  <Text style={{fontSize: GetFontSize(12)}}
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
                  <Text style={{fontSize: GetFontSize(12)}}
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
          <View className="rounded-xl mt-3">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-xl justify-center items-center mb-2">
                <Document />
              </View>

              <Text style={{fontSize: GetFontSize(16)}}
              className="text-[#B68201] font-inter700 mb-2 text-center">
                Ready to plan smarter?
              </Text>

              <Text style={{fontSize: GetFontSize(16)}}
              className="text-[#B68201] font-inter500 leading-5 px-2">
                Select a chapter for which you want to assign a test.
              </Text>
            </View>
          </View>

          {/* Choose Chapter Button */}
          <View className="w-full">
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <LessonPlanDropdown
                placeholder="Choose a chapter to get started..."
                options={chapterOptions}
                onSelect={handleChapterSelect}
                selectedValue={selectedChapterName}
                className="font-inter700"
                style={{fontSize: GetFontSize(16)}}
              />
            )}
          </View>
        </View>
      </View>

      {/* Pro Tip 
      <View className="px-6 mt-4">
        <Text style={{fontSize: GetFontSize(13)}}
        className="text-gray-600 font-inter500 bg-[#F5F0FD] px-2 py-4 rounded-lg">
          <Text style={{fontSize: GetFontSize(14)}}
          className="font-inter600">Pro Tip:</Text> Regular testing
          improves retention by 40%!
        </Text>
      </View> */}

      <View className="h-[2px] bg-[#DFE3E8] mt-4" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#FFF3D6] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-[#FEE19A] rounded-lg mr-3 justify-center items-center">
            <AssignTestDoc />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text style={{fontSize: GetFontSize(18)}}
              className="text-[#212B36] font-inter600 flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
                onPress={() => navigation.goBack()}
              >
                <Text className="text-white font-inter400">✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: GetFontSize(14)}}
            className="text-[#454F5B] font-inter400">
              Boost your students's progress in{'\n'} just few taps!
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

      {/* Fixed Bottom Buttons */}
      <View className="px-6 py-4 bg-white">
        <View className="flex-row gap-2">
          <TouchableOpacity
          style={{fontSize: GetFontSize(16)}}
            className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3 font-inter600"
            onPress={() => navigation.goBack()}
          >
            <LeftArrow color="#FED570" />
            <Text className="text-[#FED570] ">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{fontSize: GetFontSize(13)}}
            disabled={!selectedChapterId}
            onPress={() =>
              navigation.navigate('AssignTestTopics', {
                chapterId: selectedChapterId,
                chapterName: selectedChapterName,
              })
            }
            className={`flex-row gap-1 flex-1 py-3 rounded-lg justify-center items-center border-2 font-inter600 ${
              selectedChapterId
                ? 'bg-[#FED570] border-[#FEC107]'
                : 'bg-gray-300 border-gray-300'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedChapterId ? 'text-[#B68201]' : 'text-gray-600'
              }`}
            >
              Continue
            </Text>
            {selectedChapterId && <RightArrow color="#B68201" />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AssignTest;
