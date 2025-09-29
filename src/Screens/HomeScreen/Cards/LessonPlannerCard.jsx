import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageIcon from '../../../Images/LessonPlanCard/Page';

const LessonPlannerCard = ({ onPress, isActive, cardWidth, cardSpacing }) => {
  const cardHeight = isActive ? 432 : 380;
  const scale = isActive ? 1 : 0.8;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        transform: [{ scale }],
        marginRight: cardSpacing,
      }}
      className="rounded-3xl overflow-hidden shadow-lg"
    >
      <LinearGradient
        colors={['#B1E3FB', '#1EAFF7']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="rounded-3xl px-6 py-6"
      >
        {/* Top Row: Icon + Small Text */}
        <View className="flex-row items-center">
          <View className="w-20 h-20 bg-[#FED570] rounded-xl items-center justify-center shadow-lg border-4 border-[#1EAFF7] mr-8">
            <PageIcon />
          </View>
          <View>
            <Text className="text-white text-[14px] font-semibold">Save 2+ hours</Text>
            <Text className="text-white text-[12px] opacity-90">Daily planning</Text>
          </View>
        </View>

        {/* Title + Description */}
        <View className="flex-1 items-center justify-center px-2 mt-32">
          <Text className="text-white text-[19px] font-bold text-center mb-3">
            Create Lesson Plan
          </Text>
          <Text className="text-white text-[13px] text-center leading-6">
            Generate comprehensive lesson plans with objectives and activities
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={onPress}
          style={{
            borderTopWidth: 1,
            borderRightWidth: 2,
            borderBottomWidth: 4,
            borderLeftWidth: 2,
          }}
          className="bg-white rounded-xl border-[#89D5FB] shadow-sm self-center"
        >
          <Text className="text-[#1EAFF7] text-sm font-semibold py-3 px-10 text-center">
            Create Lesson Plan
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default LessonPlannerCard;
