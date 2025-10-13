import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Document from '../../../Images/LessonPlan/Document';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';
import { useState, useEffect, useContext } from 'react';
import AssignTestDoc from '../../../Images/AssignTestCard/AssignTestDoc';
import NavHeader from '../../NavHeader';
import GetFontSize from '../../../Commons/GetFontSize';
import { getChapters } from '../../../Services/teacherAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import DropdownArrow from '../../../Images/LessonPlan/DropdownArrow';
import { Shadow } from 'react-native-shadow-2';
import { useSound } from '../../../Context/SoundContext';
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
  // const { playClickSound } = useSound();
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

  const renderHeader = () => (
    <View>

      <NavHeader />

      <View className="px-4 mt-3">
        <View className="bg-[#FED570] rounded-2xl p-6">
          {/* Progress Steps */}
          <View className="flex-row items-center justify-between mb-5">
            <View className="items-center">
              <Shadow
                distance={3}
                startColor="#6FCE62"
                offset={[0, 3]}
                radius={20}
                style={{ borderRadius: 50 }}
              >

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
              </Shadow>
            </View>

            <View className="flex-1 h-[2px] bg-[#F7F7F5] " />
            <View className="items-center">
              <Shadow
                distance={1}
                startColor="#CDCDCD"
                offset={[0, 2]}
                radius={20}
                style={{ borderRadius: 50 }}
              >

                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#FFF] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text style={{ fontSize: GetFontSize(12) }}
                      className="text-white font-inter600">
                      2
                    </Text>
                  </View>
                </View>
              </Shadow>
            </View>

            <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

            <View className="items-center">
              <Shadow
                distance={1}
                startColor="#CDCDCD"
                offset={[0, 2]}
                radius={20}
                style={{ borderRadius: 50 }}
              >

                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#FFF] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text style={{ fontSize: GetFontSize(12) }}
                      className="text-white font-inter600">
                      3
                    </Text>
                  </View>
                </View>
              </Shadow>
            </View>
          </View>

          <View
            className="flex-1 h-0 border-t-2 border-[#F7F7F5]"
            style={{ borderStyle: 'dashed' }}
          />

          {/* Content Box */}
          <View className="rounded-xl mt-8">
            <View className="items-center mb-4">
              {/* Icon Section */}
              <View className="justify-center items-center mb-2">
                <View
                  style={{ width: 27.43, height: 41.71 }}
                >
                  <Document />
                </View>
              </View>

              {/* Title Text Section */}
              <View className="mb-2">
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="text-[#B68201] font-inter700 text-center">
                  Ready to plan smarter?
                </Text>
              </View>

              {/* Subtitle Text Section */}
              <View className="px-2">
                <Text
                  style={{ fontSize: GetFontSize(13) }}

                  className="text-[#B68201] font-inter500 text-center">
                  Select a chapter for which you want to assign a test.
                </Text>
              </View>
            </View>
          </View>
          {/* Choose Chapter Button */}
          <View className="w-full">
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <LinearGradient
                colors={['#E8B787', '#9B7A5A']}
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

                    setIsModalVisible(true)
                  }
                  }
                  className="bg-white rounded-lg px-4 py-4 flex-row justify-between items-center"
                >
                  <Text
                    style={{
                      fontSize: GetFontSize(17),
                      color: '#DC9047',
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      lineHeight: GetFontSize(16) * 1.35,
                      letterSpacing: GetFontSize(16) * -0.02  // -2% of fontSize
                    }}
                    className="font-inter700 flex-1"
                  >
                    {selectedChapterName || "Choose a chapter to get started..."}
                  </Text>
                  <DropdownArrow color="#DC9047" />
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Scrollable Content */}
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={renderHeader}
      />

      {/* Full Page Modal for Chapter Selection */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF3D6' }}>
            {/* Modal Header */}
            <View className="px-4 pt-4 pb-4 border-b border-[#DFE3E8] flex-row justify-between items-center bg-[#FFF3D6]">
              <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600">
                Select Chapter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(50);

                  setIsModalVisible(false)
                }
                }
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center">

                <View className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center">
                  <Text className="text-white font-inter400">✕</Text>
                </View>

              </TouchableOpacity>
            </View>

            {/* Chapter List with ScrollView */}
            <LinearGradient
              colors={['#B8916B', '#E5D6C8']}
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

                      handleChapterSelect(chapter.name)
                    }
                    }
                    className={`p-4 mb-3 rounded-lg ${selectedChapterName === chapter.name
                      ? 'bg-[#FFF9E6]'
                      : 'bg-white'
                      }`}
                    style={{
                      borderTopWidth: 1,
                      borderRightWidth: 2,
                      borderBottomWidth: 4,
                      borderLeftWidth: 2,
                      borderColor: selectedChapterName === chapter.name ? '#DC9047' : '#DFE3E8',
                      borderStyle: 'solid'
                    }}
                  >
                    <Text
                      style={{ fontSize: GetFontSize(15) }}
                      className={`font-inter500 ${selectedChapterName === chapter.name
                        ? 'text-[#B68201]'
                        : 'text-[#637381]'
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

      {/* Fixed Bottom Buttons */}
      <View className="px-4 py-4 bg-white border-t border-[#DFE3E8]" style={{ height: 92, gap: 12 }}>
        <View className="flex-row gap-3">
          <TouchableOpacity
            style={{ fontSize: GetFontSize(16) }}
            className="flex-row gap-1 rounded-xl border-t-[1.5px] border-x-2 border-b-4 border-[#DFE3E8] justify-center items-center px-4 py-3 font-inter600"
            onPress={() => {
              Vibration.vibrate(50);
              navigation.goBack();
            }}
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
            onPress={() => {
              Vibration.vibrate(50);

              // playClickSound();
              navigation.navigate('AssignTestTopics', {
                chapterId: selectedChapterId,
                chapterName: selectedChapterName,
              })
            }
            }
            className={`flex-row gap-1 flex-1 py-3 rounded-xl border-t-[1.5px] border-x-2 border-b-4 justify-center items-center ${selectedChapterId
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