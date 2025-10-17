import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import CrossIcon from '../../Images/Home/CrossIcon';

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return 'T';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    // If only one word, take first two letters
    return parts[0].substring(0, 2).toUpperCase();
  }
  // Otherwise, take first letter of first and last word
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Settings = () => {
  const { teacherProfile, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View
        style={{
          backgroundColor: '#F7EBFF',
          paddingTop: 30, // For safe area and spacing
          paddingBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        {/* Top Bar */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#637381] font-inter500">
            {/* Settings */}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabNavigator')}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              backgroundColor: '#CE82FF',
              borderColor: '#BF5CFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              <CrossIcon />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Icon with Border */}
        <View className="items-center justify-center" style={{ marginBottom: 8 }}>
          <View
            className="rounded-full items-center justify-center"
            style={{
              width: 66,
              height: 66,
              borderWidth: 6,
              borderColor: '#CE82FF',
              borderRadius: 33,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
          >
            <View
              className="rounded-full items-center justify-center"
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#FFFFFF'
              }}
            >
              <Text style={{ fontSize: GetFontSize(24), color: '#CE82FF' }} className="font-inter600">
                {getInitials(teacherProfile?.name)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: GetFontSize(16) }} className="text-lg font-inter500 text-[#212B36]">
          {teacherProfile?.name || 'Teacher'}
        </Text>
        <View className="bg-white rounded-[16px] px-4 py-1 justify-center" style={{ marginBottom: 4 }}>
          {/* <View className="flex-row justify-center">
            <Text
              style={{
                fontSize: GetFontSize(12),
              }}
              className="text-[#637381] font-inter500"
            >
              Your Adaptmate rank is{" "}
            </Text>
            <Text
              style={{
                fontSize: GetFontSize(12),
              }}
              className="text-[#637381] font-inter500"
            >
              <Text
                style={{
                  fontSize: GetFontSize(14),
                }}
                className="font-inter600"
              >
                16
              </Text>
              /36
            </Text>
          </View> */}
          <View className="flex-row justify-center">
            <Text
              style={{
                fontSize: GetFontSize(10),
              }}
              className="text-[#637381] font-inter400 leading-[135%]"
            >
              Higher score, better leads!{" "}
            </Text>
            <Text
              style={{
                fontSize: GetFontSize(10),
                color: '#B747FF'
              }}
              className=" font-inter500 "
            >
              Improve yours now
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-5">
        {/* Dashed Line Below Header */}
        <View
          className="h-0 border-b-2 border-dashed border-[#CE82FF] opacity-100 -left-[1px]"
          style={{
            transform: [{ rotate: '0deg' }],
            marginBottom: 12
          }}
        />

        {/* Options Box */}
        <View
          style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 6,
            borderLeftWidth: 2.5,
            borderStyle: 'solid',
            borderColor: '#F7EBFF',
            borderRadius: 20,
            marginTop: 8,
          }}
          className="mt-6"
        >
          {/* Account Details */}
          {/* <View className="pt-6 pb-3 px-4">
            <Text style={{ fontSize: GetFontSize(12), color: '#919EAB' }} className="font-inter600  mb-2">ACCOUNT DETAILS</Text>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Personal Information</Text>
              <Text className="text-[#637381]">{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Professional Details</Text>
              <Text className="text-[#637381]">{'>'}</Text>
            </TouchableOpacity>
          </View> */}

          {/* Help & Support */}
          <View className="py-4 px-4">
            {/* <Text style={{ fontSize: GetFontSize(12), color: '#919EAB' }} className="font-inter600  mb-2">HELP AND SUPPORT</Text>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Support</Text>
              <Text className="text-[#637381]">{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">FAQ</Text>
              <Text className="text-[#637381]">{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Feedback</Text>
              <Text className="text-[#637381]">{'>'}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={logout}
              className="bg-[#ffffff] rounded-xl p-4 flex-row justify-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <Text style={{ fontSize: GetFontSize(16) }} className="text-red-500 font-inter700">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;