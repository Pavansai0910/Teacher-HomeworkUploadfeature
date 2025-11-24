import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Vibration, Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import capitalize from '../../Utils/Capitalize';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserIcon from '../../Images/Settings/UserIcon';

function PersonalInformation() {
  const navigation = useNavigation();
  const { teacherProfile, updateProfile } = useContext(AuthContext);
  const selectedAssignment = useSelector(
    (state) => state.assignment.selectedAssignment
  );

  const screenHeight = Dimensions.get('window').height;
  const headerHeight = (screenHeight * 8.61) / 100;

  const teacher = teacherProfile || {};

  const getFullName = () => {
    if (teacher.name) return teacher.name;
    if (teacher.fullName) return teacher.fullName;
    if (teacher.firstName && teacher.lastName) return `${teacher.firstName} ${teacher.lastName}`;
    return 'N/A';
  };

  const getMobileNumber = () => {
    const mobile = teacher.mobileNumber || '';
    if (mobile.startsWith('+91')) {
      return mobile;
    }
    return `+91 ${mobile}`;
  };

  const handleSaveChanges = () => {
    console.log('Save changes');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View style={{ height: headerHeight }} className="bg-[#F7EBFF] justify-end px-4">
        <View className="flex-row items-center justify-start">
          <View className="flex-row items-center h-20 ml-5 ">
            <View style={{ transform: [{ scale: 1.40 }] }}>
              <UserIcon />
            </View>
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="text-[#212B36] font-inter600 flex-shrink ml-4"
            >
              Personal Information
            </Text>
          </View>
        </View>
      </View>

      {/* 26px gap below header */}
      <View style={{ height: 26 }} />

      {/* Teacher Information Fields */}
      <View className="flex-1 px-5">
        {/* Full Name Field */}
        <Text
          style={{ fontSize: GetFontSize(14), lineHeight: GetFontSize(20) }}
          className="text-[#212B36] font-inter500 mb-3"
        >
          Full Name
        </Text>
        <View className="border border-[#D9D9D9] rounded-lg px-4 py-3 mb-6">
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="text-[#454F5B] font-inter400"
          >
             {capitalize(getFullName())}
          </Text>
        </View>

        {/* Mobile Number Field */}
        {/* <Text
          style={{ fontSize: GetFontSize(14), lineHeight: GetFontSize(20) }}
          className="text-[#212B36] font-inter500 mb-3"
        >
          Mobile number
        </Text>
        <View className="border border-[#D9D9D9] rounded-lg px-4 py-3 mb-6 flex-row items-center">
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="text-[#212B36] font-inter500 mr-2"
          >
            +91
          </Text>
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="text-[#212B36] font-inter500 flex-1"
          >
            {teacher.mobileNumber || 'N/A'}
          </Text>
        </View> */}

        {/* Email Field */}
        <Text
          style={{ fontSize: GetFontSize(14), lineHeight: GetFontSize(20) }}
          className="text-[#212B36] font-inter500 mb-3"
        >
          Email
        </Text>
        <View className="border border-[#D9D9D9] rounded-lg px-4 py-3">
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="text-[#454F5B] font-inter400"
          >
            {teacher.email || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Footer with Buttons */}
      <View className="px-5 py-4 bg-white border-t border-[#E5E5E5]">
        <View className="flex-col">
          {/* <TouchableOpacity
            onPress={handleSaveChanges}
            style={{
              borderTopWidth: 1.5,
              borderRightWidth: 2.5,
              borderBottomWidth: 4,
              borderLeftWidth: 2.5,
              borderColor: '#AF33FF',
            }}
            className="bg-[#C366FF] rounded-[12px] px-5 py-3 items-center mb-[10px]"
          >
            <Text
              style={{ fontSize: GetFontSize(16), color: 'white' }}
              className="font-inter600"
            >
              Save Changes
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
  Vibration.vibrate(50);
  handleCancel();
}}
            style={{
              borderTopWidth: 1.5,
              borderRightWidth: 2.5,
              borderBottomWidth: 4,
              borderLeftWidth: 2.5,
              borderColor: '#E5E5E3',
            }}
            className="rounded-[12px] px-5 py-3 items-center"
          >
            <Text
              style={{ fontSize: GetFontSize(16) }}
              className="text-[#637381] font-inter600"
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PersonalInformation;