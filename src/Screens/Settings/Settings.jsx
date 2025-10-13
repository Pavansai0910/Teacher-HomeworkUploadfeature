import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';

const Settings = () => {
  const { teacherProfile, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="absolute top-0 z-10 w-full h-[37.44%] bg-[#F7EBFF] gap-[29px] items-center justify-center left-0 opacity-100">
        {/* New Top Layout Bar */}
        <View className="w-full h-6 flex-row justify-between items-center px-5 opacity-100">
          {/* Left: Settings Text */}
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#637381] font-inter500">Settings</Text>
          {/* Right: Circular Element */}
          <TouchableOpacity 
            onPress={() => {
              Vibration.vibrate(50);

              navigation.navigate('Home')}
            } 
            className="w-6 h-6 rounded-[20px] border-2 bg-[#CE82FF] border-[#BF5CFF] p-1 opacity-100 relative items-center justify-center"
          >
            <Text 
              className="text-white text-center absolute"
              style={{
                width: 10.503851890563965,
                height: 10.504477500915527,
                top: 2.75,
                left: 2.75,
                opacity: 1,
                transform: [{ rotate: '0deg' }],
                fontSize: 8,
                lineHeight: 10.504477500915527,
                textAlign: 'center',
                includeFontPadding: false
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Profile Icon with Border */}
       {/* Profile Icon with Border */}
<View className="items-center justify-center">
  {/* Profile Avatar with Border */}
  <View 
    className="rounded-full items-center justify-center"
    style={{
      width: 66,
      height: 66,
      borderWidth: 6,
      borderColor: '#CE82FF',
      opacity: 1,
      backgroundColor: 'transparent'
    }}
  >
    <View 
      className="rounded-full items-center justify-center"
      style={{
        width: 50,
        height: 50,
        backgroundColor: '#FFFFFF'  // Changed to white
      }}
    >
      <Text style={{ fontSize: GetFontSize(24), color: '#CE82FF' }} className="font-inter600">
        {teacherProfile?.name?.charAt(0) ?? 'T'}
      </Text>
    </View>
  </View>
</View>
        
        <Text style={{ fontSize: GetFontSize(16) }} className="text-lg font-inter500 text-[#212B36]">
          {teacherProfile?.name || 'Teacher'}
        </Text>
        <Text className="text-[#637381] text-sm">
          Your Adaptmate rank is 16/36
        </Text>
      </View>
      
      <ScrollView className="flex-1 px-5 ">
        {/* Dashed Line Below Header */}
        <View 
          className="w-[394.03173828125px] h-0 border-b-2 border-dashed border-[#CE82FF] opacity-100 -left-[1px]"
          style={{
            transform: [{ rotate: '0deg' }]
          }}
        />
        
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
        <TouchableOpacity 
          onPress={() => {
                          Vibration.vibrate(50);

            logout()
          }} 
          className="bg-[#ffffff] rounded-xl p-4 mt-3 flex-row justify-center"
          style={{
            borderTopWidth: 1,
            borderRightWidth: 2,
            borderBottomWidth: 4,
            borderLeftWidth: 2,
            borderStyle: 'solid',
            borderColor: '#DFE3E8'
          }}
        >
          <Text style={{ fontSize: GetFontSize(16) }} className="text-red-500 font-inter700">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings; 