import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import GetFontSize from '../../../Commons/GetFontSize';

const LearningNavbar = ({ classDisplay, subjectDisplay }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Header */}
      <View className="bg-[#E8FADB] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <SkullIcon />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink"
              >
                Test Insights
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#A5ED6F] rounded-full border border-[#77E425] justify-center items-center"
                onPress={() => navigation.navigate('MainTabNavigator')}
              >
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-white "
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] font-inter400"
            >
              Boost your students' progress in {'\n'} just a few taps!
            </Text>
          </View>
        </View>
      </View>

      {/* Class & Subject */}
      <View className="mt-6 px-6 bg-white">
        <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
          <View className="flex-[2] mr-4 border-r-2 border-[#E5E5E3] pr-4">
            <Text
              style={{ fontSize: GetFontSize(12) }}
              className="text-[#637381] font-inter400 mb-1"
            >
              Selected Class
            </Text>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#212B36] font-inter500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {classDisplay}
            </Text>
          </View>
          <View className="flex-[1] ml-2">
            <Text
              style={{ fontSize: GetFontSize(12) }}
              className="text-[#637381] font-inter400 mb-1"
            >
              Subject
            </Text>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#212B36] font-inter500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subjectDisplay}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default LearningNavbar;
