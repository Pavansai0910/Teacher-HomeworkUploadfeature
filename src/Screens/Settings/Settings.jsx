import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
      <View className="absolute top-0 z-10 w-full h-[30%] bg-[#F7EBFF] gap-[5px] items-center justify-center left-0 opacity-100 relative">
        {/* New Top Layout Bar */}
        <View className="w-full h-6 flex-row justify-between items-center px-5 opacity-100">
          {/* Left: Settings Text */}
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#637381] font-inter500">Settings</Text>
          {/* Right: Circular Element */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabNavigator')}
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
        <View className="bg-white rounded-[16px] px-4 py-1 justify-center">
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

      <ScrollView className="flex-1 px-5 ">
        {/* Dashed Line Below Header */}
        <View
          className="w-[394.03173828125px] h-0 border-b-2 border-dashed border-[#CE82FF] opacity-100 -left-[1px]"
          style={{
            transform: [{ rotate: '0deg' }]
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
            borderRadius: 20
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
    </SafeAreaView>
  );
};

export default Settings;