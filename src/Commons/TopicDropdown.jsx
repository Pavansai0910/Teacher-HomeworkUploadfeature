import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GetFontSize from './GetFontSize';
import TopArrow from '../Images/LessonPlan/TopArrow';

const TopicDropdown = ({
  topics,
  selectedTopics,
  onTopicsSelect,
  placeholder,
}) => {
  const [showSavedPlans, setShowSavedPlans] = useState(false);

  const handleTopicToggle = topic => {
    const isSelected = selectedTopics.some(t => t.id === topic.id);
    if (isSelected) {
      onTopicsSelect(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      onTopicsSelect([...selectedTopics, topic]);
    }
  };

  return (
    <View className="w-full">
      {/* Saved Lesson Plans Button */}
      <TouchableOpacity
        className="bg-white rounded-xl p-3 mb-4"
        style={{
          borderTopWidth: 1,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 4,
          borderColor: '#89D5FB',
        }}
        onPress={() => setShowSavedPlans(!showSavedPlans)}
      >
        <View className="flex-row justify-center items-center gap-2">
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className="text-[#1EAFF7] font-inter600"
          >
            Saved Lesson plans
          </Text>
          <TopArrow color="#1EAFF7" />
        </View>
      </TouchableOpacity>

      {/* Topics List */}
      <ScrollView className="">
        {topics.map((topic, index) => {
          const isSelected = selectedTopics.some(t => t.id === topic.id);
          return (
            <TouchableOpacity
              key={topic.id || index}
              onPress={() => handleTopicToggle(topic)}
              className={`flex-row items-center justify-between px-4 py-3 mb-1 rounded-xl`}
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 4,
                borderColor: isSelected ? '#DC9047' : '#E5E5E3',
                backgroundColor: isSelected ? '#FFF' : '#FFF',
              }}
            >
              {/* Topic Name */}
              <Text
                style={{ fontSize: GetFontSize(16) }}
                className={`flex-1 font-inter700 ${
                  isSelected ? 'text-[#DC9047]' : 'text-[#637381]'
                }`}
                numberOfLines={1}
              >
                {topic.name}
              </Text>

              {/* Checkbox */}
              <View
                className={`w-6 h-6 rounded-lg border-2  items-center justify-center`}
                style={{
                  borderColor: isSelected ? '#B0743A' : '#E5E5E3',
                  backgroundColor: isSelected ? '#DC9047' : '#FFF',
                }}
              >
                {isSelected && <Text className="text-white text-sm">✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TopicDropdown;
