import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Vibration
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GetFontSize from '../../../Commons/GetFontSize';
import LearningNavbar from './LearningNavbar';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../../Images/LessonPlan/RightArrow';

const LearningTopic = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    status,
    topics = [],
    chapterName = 'Chapter',
    classDisplay = 'Class',
    subjectDisplay = 'Subject',
    chapterId = 'id'
  } = route.params || {};

  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const capitalizedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Topics';

  const handleTopicPress = (topic) => {
    setSelectedTopicId(topic._id || topic.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LearningNavbar
        classDisplay={classDisplay}
        subjectDisplay={subjectDisplay}
      />


      {/* Topics List */}
      <ScrollView
        className="flex-1 p-4 mx-6 mt-6 border border-[#E5E5E3] rounded-xl"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {topics.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-center" style={{ fontSize: GetFontSize(16) }}>
              No {status} topics found for this chapter
            </Text>
          </View>
        ) : (
          topics.map((topic, index) => {
            const isSelected = selectedTopicId === (topic._id || topic.id);
            return (
              <TouchableOpacity
                key={topic._id || topic.id || index}
                onPress={() => {
                  Vibration.vibrate(50);
                  handleTopicPress(topic)}}
                className={`border-2 mb-2 p-3 rounded-xl ${isSelected ? 'border-[#77E425] bg-[#E8FADB]' : 'border-[#DC9047] bg-white'}`}
              >
                <Text className={`font-medium ${isSelected ? 'text-[#454F5B]' : 'text-[#454F5B]'}`} style={{ fontSize: GetFontSize(16) }}>
                  {topic.name || topic.topicName || `Topic ${index + 1}`}
                </Text>
                {/* {topic.description && (
                  <Text className="text-gray-500 mt-1" style={{ fontSize: GetFontSize(12) }}>
                    {topic.description}
                  </Text>
                )} */}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <View className="h-[2px] bg-[#DFE3E8] mt-2 mb-2" />

      {/* Bottom Buttons */}
      <View className="px-6 mb-4">
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#DFE3E8] rounded-xl justify-center items-center px-4 py-3"
            onPress={() => {
              Vibration.vibrate(50);
              navigation.goBack()}}
          >
            <LeftArrow color="#357A20" />
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#357A20] font-inter600"
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!selectedTopicId}
            onPress={() => {
              Vibration.vibrate(50);
              if (selectedTopicId) {
                const selectedTopic = topics.find(t => (t._id || t.id) === selectedTopicId);
                navigation.navigate('LearningDetails', {
                  status,
                  topic: selectedTopic,
                  topicId: selectedTopicId,
                  chapterId: chapterId,
                  topicname: selectedTopic?.name || selectedTopic?.topicName || '',
                  chapterName,
                  classDisplay,
                  subjectDisplay
                });
              }
            }}
            className={`flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#71E31C] flex-1 py-3 rounded-xl justify-center items-center ${selectedTopicId ? 'bg-[#B0EF80]' : 'bg-[#B0EF80]/60'}`}
          >
            <Text
              style={{ fontSize: GetFontSize(16), color: selectedTopicId ? '#357A20' : '#FFFFFF' }}
              className={`font-inter600 text-white`}
            >
              Continue
            </Text>
            <RightArrow color={selectedTopicId ? '#357A20' : '#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LearningTopic;
