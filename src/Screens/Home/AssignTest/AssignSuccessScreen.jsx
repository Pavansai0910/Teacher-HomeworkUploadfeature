import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AssignSuccessScreen = ({
  topic,
  classDisplay,
  onViewAssignedTests,
  onClose,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-slate-700 font-semibold text-lg">
          Assign a Test 🎯
        </Text>
        <Text className="text-slate-500 text-sm mt-1">
          Boost your students' progress in just a few taps!
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Big Green Checkmark */}
        <View className="mb-6">
          <View className="w-20 h-20 bg-green-500 rounded-2xl items-center justify-center">
            <Text className="text-4xl text-white font-bold">✓</Text>
          </View>
        </View>

        {/* Success Title */}
        <Text className="font-bold text-xl text-slate-700 text-center mb-4">
          Test Assigned Successfully!
        </Text>

        {/* Success Description - Dynamic content */}
        <Text className="text-center text-slate-500 text-base leading-6 mb-20 px-4">
          Your test on{' '}
          <Text className="text-green-500 font-bold">
            {topic || 'Topic Name'}
          </Text>
          has been successfully assigned to
          <Text className="text-green-500 font-bold">
            {classDisplay || 'Class name'}
          </Text>
          . Adaptmate will keep track, so you can focus on guiding your students.
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

        <TouchableOpacity onPress={onClose} className="items-center">
          <Text className="text-gray-400 text-base font-semibold">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AssignSuccessScreen;