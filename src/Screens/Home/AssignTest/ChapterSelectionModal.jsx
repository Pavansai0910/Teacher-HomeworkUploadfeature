// ChapterListModal.js
import { View, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GetFontSize from '../../../Commons/GetFontSize';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';

const ChapterListModal = ({
  visible,
  onClose,
  allChapters,
  selectedChapterName,
  selectedChapterId,
  onChapterSelect,
  navigation
}) => {
  const handleContinue = () => {
    if (selectedChapterId) {
      onClose();
      navigation.navigate('AssignTestTopics', {
        chapterId: selectedChapterId,
        chapterName: selectedChapterName,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
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
              onPress={onClose}
              className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
            >
              <Text className="text-white font-inter400">✕</Text>
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
                  onPress={() => onChapterSelect(chapter.name)}
                  className={`p-4 mb-3 rounded-lg ${
                    selectedChapterName === chapter.name
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
                    className={`font-inter500 ${
                      selectedChapterName === chapter.name
                        ? 'text-[#B68201]'
                        : 'text-[#212B36]'
                    }`}
                  >
                    {chapter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </LinearGradient>

          {/* Fixed Bottom Buttons in Modal */}
          <View className="px-4 py-4 bg-white border-t border-[#DFE3E8]" style={{ height: 92, gap: 12 }}>
            <View className="flex-row gap-3">
              <TouchableOpacity
                style={{ fontSize: GetFontSize(16) }}
                className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3 font-inter600"
                onPress={onClose}
              >
                <LeftArrow color="#FED570" />
                <Text
                  style={{ fontSize: GetFontSize(16) }}
                  className="font-inter600 text-[#FED570]"
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ fontSize: GetFontSize(13) }}
                disabled={!selectedChapterId}
                onPress={handleContinue}
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
      </View>
    </Modal>
  );
};

export default ChapterListModal;