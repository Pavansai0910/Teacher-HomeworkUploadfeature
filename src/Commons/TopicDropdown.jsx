import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const TopicDropdown = ({ topics, selectedTopics, onTopicsSelect, placeholder }) => {
  const [showSavedPlans, setShowSavedPlans] = useState(false);

  const handleTopicToggle = (topic) => {
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
        className="bg-white rounded-lg p-3 mb-4 border border-[#E5E5E3]"
        onPress={() => setShowSavedPlans(!showSavedPlans)}
      >
        <Text className="text-[#637381] text-center">
          Saved Lesson plans
        </Text>
      </TouchableOpacity>

      {/* Topics List */}
      <ScrollView className="max-h-64">
        {topics.map((topic, index) => {
          const isSelected = selectedTopics.some(t => t.id === topic.id);
          return (
            <TouchableOpacity
              key={topic.id || index}
              className={`flex-row items-center justify-between p-3 mb-2 rounded-lg border ${
                isSelected 
                  ? 'bg-[#FED570] border-[#FED570]' 
                  : 'bg-white border-[#E5E5E3]'
              }`}
              onPress={() => handleTopicToggle(topic)}
            >
              <Text className={`flex-1 ${
                isSelected ? 'text-[#B8860B]' : 'text-[#637381]'
              }`}>
                {topic.name}
              </Text>
              <View className={`w-6 h-6 rounded-full border-2 ${
                isSelected 
                  ? 'bg-[#B8860B] border-[#B8860B]' 
                  : 'bg-white border-[#E5E5E3]'
              } items-center justify-center`}>
                {isSelected && (
                  <Text className="text-white text-xs">✓</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TopicDropdown;