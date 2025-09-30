import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Bluepage from '../../Images/LessonPlan/LessonPlanner';
import Document from '../../Images/LessonPlan/Document';
import LeftArrow from '../../Images/LessonPlan/LeftArrow';
import RightArrow from '../../Images/LessonPlan/RightArrow';
import LessonPlanDropdown from '../../Commons/LessonPlanDropdown';

const AssignTest = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header (fixed at the top) */}
      <View className="bg-[#FFF3D6] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-[#212B36] font-semibold text-[18px] flex-shrink">
                Assign Test
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#FED570] rounded-full justify-center items-center"
                onPress={() => navigation.goBack()}
              >
                <Text className="text-white text-[14px]">✕</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#454F5B] text-[14px]">
              Boost your students' progress in{'\n'} just a few taps!
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Class and Subject Selection */}
        <View className="mt-6 px-6 bg-white">
          <View className="flex-row border-2 border-gray-200 rounded-xl px-4 py-3">
            <View className="flex-[2] mr-4 border-r-2 border-gray-200 pr-4">
              <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
              <Text
                className="text-gray-800 font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Class 9-A | 50 Students
              </Text>
            </View>
            <View className="flex-[1] ml-2">
              <Text className="text-gray-500 text-xs mb-1">Subject</Text>
              <Text
                className="text-gray-800 font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Mathematics
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Steps */}
        <View className="px-6 mt-6">
          <View className="bg-[#FED570] rounded-2xl px-3 py-6">
            {/* Progress Steps */}
            <View className="flex-row items-center justify-between mb-5">
              <View className="items-center">
                <View className="flex-row bg-[#5FCC3D] rounded-full px-2 py-2 border-2 border-[#CBF8A7] items-center">
                  <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-3 border border-[#CBF8A7]">
                    <Text className="text-[#212B36] font-semibold text-[12px]">
                      1
                    </Text>
                  </View>
                  <Text className="text-white text-[12px] font-semibold">
                    Choose Chapter
                  </Text>
                </View>
              </View>

              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text className="text-white font-semibold text-[12px]">
                      2
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 h-[2px] bg-[#F7F7F5]" />

              <View className="items-center">
                <View className="flex-row bg-white rounded-full px-3 py-3 border-2 border-[#CCCCCC] items-center">
                  <View className="w-8 h-8 bg-[#CCCCCC] rounded-full justify-center items-center">
                    <Text className="text-white font-semibold text-[12px]">
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

                <Text className="text-[#B68201] font-semibold text-[16px] mb-2 text-center">
                  Ready to plan smarter?
                </Text>

                <Text className="text-[#B68201] text-center text-[13px] leading-5 px-2">
                  Select a chapter for which you want to assign a test.
                </Text>
              </View>
            </View>
            {/* Choose Chapter Button */}
            <View className="w-full">
              <LessonPlanDropdown
                placeholder="Choose a chapter to get started..."
                placeholderStyle={{ fontSize: 12 }}
                options={[
                  'Number Systems',
                  'Polynomials',
                  'Coordinate Geometry',
                  'Linear Equations in Two Variables',
                  "Euclid's Geometry",
                  'Lines and Angles',
                  'Triangles',
                ]}
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </View>
        {/* Pro Tip */}
        <View className="px-6 mt-4">
          <Text className="text-gray-600 text-sm bg-[#F5F0FD] px-2 py-4 rounded-lg">
            <Text className="font-semibold">Pro Tip:</Text> Regular testing
            improves retention by 40%!
          </Text>
        </View>

        <View className="flex-1 h-[2px] bg-[#DFE3E8] mt-14" />

        <View className="px-6 mt-2">
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row gap-1 border-2 border-[#DFE3E8] rounded-lg justify-center items-center px-4 py-3"
              onPress={() => navigation.goBack()}
            >
              <LeftArrow />
              <Text className="text-[#FED570] font-semibold">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row gap-1 flex-1 py-3 bg-[#FED570] rounded-lg justify-center items-center border-2 border-[#FEC107]">
              <Text className="text-white font-semibold">Continue </Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssignTest;