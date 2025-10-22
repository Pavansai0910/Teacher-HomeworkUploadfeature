import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GetFontSize  from '../../../Commons/GetFontSize';

const AssignSuccessScreen = ({
  topic,
  classDisplay,
  onViewAssignedTests,
  onClose,
}) => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text style={{ fontSize: GetFontSize(16) }}
        className="text-slate-700 font-inter600 text-lg">
          Test Assigned 🎯
        </Text>
        <Text style={{ fontSize: GetFontSize(13) }}
        className="text-slate-500 mt-1">
          Test successfully assigned — let the learning begin!
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-4">
        {/* Big Green Checkmark */}
        <View className="mb-6">
          <View className="w-20 h-20 bg-green-500 rounded-2xl items-center justify-center">
            <Text className="text-4xl text-white font-bold">✓</Text>
          </View>
        </View>

        {/* Success Title */}
        <Text style={{ fontSize: GetFontSize(16) }}
        className="font-inter600 text-slate-700 text-center">
          Test Assigned Successfully!
        </Text>

        {/* Success Description - Dynamic content */}
        <View className="text-center text-slate-500 mt-2">
          <Text style={{ fontSize: GetFontSize(13) }}
          className="text-slate-700 font-inter600">
            Topic:- {topic || 'Topic Name'}
          </Text>
        </View>
        <Text style={{ fontSize: GetFontSize(13) }}
        className="text-slate-700 font-inter600 mt-2">
          Grade:- {classDisplay || 'Class name'}
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View className="px-6 pb-8">
        {/* Uncomment if you want the View Assigned Tests button */}
        {/* <TouchableOpacity
          className="bg-blue-50 border border-blue-500 rounded-xl py-4 px-3 mb-4 items-center w-full"
          onPress={onViewAssignedTests}
        >
          <Text className="text-blue-500 font-bold text-base">
            👁️ View Assigned Tests
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={onClose} className="items-center">
          <Text className="text-gray-400 text-base font-semibold">
            Close
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={onClose}
          className="bg-[#ffffff] rounded-xl p-4 flex-row justify-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
        >
          <Text style={{ fontSize: GetFontSize(16) }} className="text-red-500 font-inter700">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssignSuccessScreen;