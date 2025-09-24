import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const LessonPlanner = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-black">Lesson Planner Screen</Text>
    </SafeAreaView>
  );
};

export default LessonPlanner;
