import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Vibration } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageIcon from '../../../Images/LessonPlanCard/Page';
import GetFontSize from '../../../Commons/GetFontSize';
import { Shadow } from 'react-native-shadow-2';
const LessonPlannerCard = ({ onPress, isActive, cardWidth, cardSpacing }) => {
  const scale = isActive ? 1 : 0.9;
  const { width, height } = useWindowDimensions('screen');

  return (
    <Shadow
      distance={isActive ? 12 : 0}
      offset={[2, isActive ? 12 : 0]}
      startColor={isActive ? '#1EAFF766' : '#00000000'}
      radius={isActive ? 20 : 0}
      style={{ borderRadius: 50 }}
    >


      <View
        style={{
          width: width * 0.7,
          height: height * 0.55,
          transform: [{ scale }],
          marginRight: cardSpacing,
        }} className="rounded-3xl overflow-hidden shadow-lg"
      >
        <LinearGradient
          colors={['#B1E3FB', '#1EAFF7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="rounded-3xl"
          style={{
            flex: 1,
            paddingHorizontal: width * 0.06,
            paddingVertical: height * 0.03,
          }}
        >
          {/* Top Row: Icon + Small Text */}
          <View className="flex-row items-center">
            <View className="w-20 h-20 bg-[#FED570] rounded-xl items-center justify-center shadow-lg border-4 border-[#1EAFF7] mr-8">
              <PageIcon />
            </View>
            <View>
              <Text style={{ fontSize: GetFontSize(14) }}
                className="text-white font-inter600">Save 2+ hours</Text>
              <Text style={{ fontSize: GetFontSize(12) }}
                className="text-white opacity-90 font-inter400">Daily planning</Text>
            </View>
          </View>

          {/* Title + Description */}
          <View className="flex-1 items-center justify-center px-2 mt-32">
            <Text style={{ fontSize: GetFontSize(19) }}
              className="text-white font-inter700 text-center mb-3">
              Create Lesson Plan
            </Text>
            <Text
              style={{
                fontSize: GetFontSize(14),
                fontFamily: 'Inter-Regular',
                letterSpacing: 0.15,
                lineHeight: GetFontSize(14) * 1.5,
              }}
              className="text-white font-inter400 text-center"
            >
              Generate comprehensive lesson plans with objectives and activities
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              onPress();
            }
            }
            style={{
              borderTopWidth: 1,
              borderRightWidth: 2,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
            }}
            className="bg-white rounded-xl border-[#89D5FB] shadow-sm self-center w-full"
          >
            <Text style={{ fontSize: GetFontSize(15) }}
              className="font-inter700 py-3 text-center">
              Create Lesson Plan
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Shadow>
  );
};

export default LessonPlannerCard;
