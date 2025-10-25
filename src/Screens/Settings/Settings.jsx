// 


import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import CrossIcon from '../../Images/Home/CrossIcon';

const getInitials = (name) => {
  if (!name) return 'T';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Settings = () => {
  const { teacherProfile, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-[#F7EBFF] pt-6 pb-4 items-center justify-center">
        {/* Top Bar */}
        <View className="w-full flex-row justify-between items-center px-5 mb-3">
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#637381] font-inter500" />
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              navigation.navigate('MainTabNavigator');
            }}
            className="w-6 h-6 rounded-full border-2 border-[#BF5CFF] bg-[#CE82FF] items-center justify-center"
          >
            <CrossIcon />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="items-center mb-2">
          <View
            className="rounded-full items-center justify-center"
            style={{
              width: 66,
              height: 66,
              borderWidth: 6,
              borderColor: '#CE82FF',
            }}
          >
            <View className="rounded-full items-center justify-center bg-white" style={{ width: 50, height: 50 }}>
              <Text style={{ fontSize: GetFontSize(24), color: '#CE82FF' }} className="font-inter600">
                {getInitials(teacherProfile?.name)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: GetFontSize(16) }} className="font-inter500 text-[#212B36]">
          {teacherProfile?.name || 'Teacher'}
        </Text>

        {/* <View className="bg-white rounded-2xl px-4 py-1 mt-2">
          <View className="flex-row justify-center">
            <Text style={{ fontSize: GetFontSize(10) }} className="text-[#637381] font-inter400 leading-[135%]">
              Higher score, better leads!{' '}
            </Text>
            <Text
              style={{ fontSize: GetFontSize(10), color: '#B747FF' }}
              className="font-inter500"
            >
              Improve yours now
            </Text>
          </View>
        </View> */}
      </View>

      {/* Scrollable Content */}
      {/* <ScrollView className="flex-1 px-5">
        <View className="border-b-2 border-dashed border-[#CE82FF] my-3" />
        <View
          style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 6,
            borderLeftWidth: 2.5,
            borderColor: '#F7EBFF',
            borderRadius: 20,
          }}
          className="p-4 mb-20" // space for bottom button
        >
          <Text className="text-[#919EAB] font-inter600 text-xs mb-2">SETTINGS</Text>
          <TouchableOpacity className="bg-white rounded-xl p-4 flex-row justify-between items-center border border-[#DFE3E8] mb-2">
            <Text className="font-inter600 text-[#454F5B]" style={{ fontSize: GetFontSize(14) }}>
              Profile Settings
            </Text>
            <Text className="text-[#637381]">{'>'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */}

      {/* Fixed Bottom Log Out Button */}
      <View className="absolute bottom-6 left-0 right-0 px-5">
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);
            logout();
          }}
          className="bg-[#FFE1E1] rounded-xl p-4 flex-row justify-center border-[1.5px] border-red-500"
        >
          <Text style={{ fontSize: GetFontSize(16) }} className="text-red-500 font-inter700">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
