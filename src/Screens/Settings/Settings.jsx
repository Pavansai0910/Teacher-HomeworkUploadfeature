import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';


const Settings = () => {
  const { teacherProfile, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5">
        {/* Header */}
        <View className="items-center mt-6">
          <View className="w-20 h-20 rounded-full bg-[#E75B9C] items-center justify-center">
            <Text className="text-white text-2xl font-bold">
              {teacherProfile?.name
                ? teacherProfile.name.charAt(0)
                : 'Section'}
            </Text>
          </View>
          <Text className="mt-3 text-lg font-bold text-[#454F5B]">
            {teacherProfile?.name || 'Teacher'}
          </Text>
          {/* <Text className="text-[#637381] text-sm">
            Your Adaptmate rank is 16/36
          </Text> */}
        </View>

        {/* Account Details */}
        {/* <View className="mt-6">
          <Text className="text-xs text-gray-400 mb-2">ACCOUNT DETAILS</Text>

          <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-[#454F5B]">Personal Information</Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-[#454F5B]">Professional Details</Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>
        </View> */}

        {/* Help & Support */}
        {/* <View className="mt-6">
          <Text className="text-xs text-gray-400 mb-2">HELP AND SUPPORT</Text>

          <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-[#454F5B]">Support</Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-[#454F5B]">FAQ</Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-[#454F5B]">Feedback</Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>
        </View> */}

        {/* Logout */}
        <TouchableOpacity onPress={logout}
        className="bg-red-50 rounded-xl p-4 mt-6 flex-row justify-center">
          <Text className="text-red-500 font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
