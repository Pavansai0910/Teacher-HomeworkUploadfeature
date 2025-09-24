import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-black text-xl mb-6">Welcome to the Home Screen</Text>

      {/* Lesson Planner Card */}
      <TouchableOpacity
        className="w-3/4 h-20 bg-blue-500 mb-4 rounded-xl justify-center items-center"
        onPress={() => navigation.navigate('LessonPlanner')}
      >
        <Text className="text-white text-lg">Lesson Planner</Text>
      </TouchableOpacity>

      {/* Assign Test Card */}
      <TouchableOpacity
        className="w-3/4 h-20 bg-green-500 rounded-xl justify-center items-center"
        onPress={() => navigation.navigate('AssignTest')}
      >
        <Text className="text-white text-lg">Assign Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
