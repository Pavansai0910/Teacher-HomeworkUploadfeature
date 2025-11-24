import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Vibration, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import capitalize from '../../Utils/Capitalize';
import RightArrowIcon from '../../Images/LessonPlan/RightArrowIcon';
import { changeTeacherPassword } from '../../Services/teacherAPIV1';
import Buildingicon from '../../Images/Settings/Buildingicon';
import UserIcon from '../../Images/Login/UserIcon';
import SupportIcon from '../../Images/Settings/SupportIcon';
import QuestionIcon from '../../Images/Settings/QuestionIcon';
import FeedbackIcon from '../../Images/Settings/FeedbackIcon';
import BackIcon from '../../Images/Settings/BackIcon';
import SmallRightArrow from '../../Images/Settings/SmallRightArrow';
import ForgotPasswordIcon from '../../Images/Settings/ForgotPasswordIcon';


const Settings = () => {

  const { teacherProfile, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    // Validation
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Get teacher ID from context
    const teacherId = teacherProfile?._id || teacherProfile?.id;

    if (!teacherId) {
      Alert.alert('Error', 'Teacher ID not found. Please try logging in again.');
      return;
    }

    try {
      setLoading(true);

      const response = await changeTeacherPassword({
        teacherId,
        newPassword
      });

      // Check different possible success indicators
      if (response?.success || response?.data?.success || response?.status === 200) {
        Alert.alert('Success', 'Password changed successfully', [
          {
            text: 'OK',
            onPress: () => {
              handleCloseModal();
            }
          }
        ]);
      } else {
        const errorMessage = response?.message || response?.data?.message || 'Failed to change password';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to change password. Please try again.';

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-[#F7EBFF] pt-6 pb-4 items-center justify-center">
        {/* Top Bar */}
        <View className="w-full flex-row justify-between items-center px-5 mb-3">
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#637381] font-inter500">
            Settings
          </Text>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              navigation.navigate('MainTabNavigator');
            }}
            className="w-6 h-6 rounded-full border-2 border-[#BF5CFF] bg-[#CE82FF] items-center justify-center"
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
                fontSize: 11,
                lineHeight: 10.504477500915527,
                textAlign: 'center',
                includeFontPadding: false
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="items-center mb-2">
          <View
            className="rounded-full items-center justify-center"
            style={{
              width: 66,
              height: 66,
              borderWidth: 5,
              borderColor: '#CE82FF',
              backgroundColor: '#FFFFFF'
            }}
          >
            <View
              className="rounded-full items-center justify-center"
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#AD50E9'
              }}
            >
              <Text style={{ fontSize: GetFontSize(24), color: '#FFFFFF' }} className="font-inter600">
                {teacherProfile?.name
                  ? teacherProfile.name
                    .split(' ')
                    .slice(0, 2)
                    .map(word => word[0].toUpperCase())
                    .join('')
                  : 'T'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: GetFontSize(16) }} className="text-lg font-inter500 text-[#212B36]">
          {capitalize(teacherProfile?.name || 'Teacher')}
        </Text>
        {/* <View className="bg-white rounded-[16px] w-[311px] h-[53px] px-3 py-1 justify-center">
          <View className="flex-row justify-center">
            <Text
              style={{
                fontSize: GetFontSize(12),
              }}
              className="text-[#637381] font-inter500"
            >
              Your Adaptmate rank is
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
              <Text
                style={{
                  fontSize: GetFontSize(12),
                }}
                className="text-[#637381] font-inter500"
              >
                /36
              </Text>
            </Text>
          </View>
          <View className="flex-row justify-center">
            <View className="flex-row items-center">
              <Text
                style={{
                  fontSize: GetFontSize(10),
                  color: '#B747FF'
                }}
                className="font-inter500"
              >
                Improve yours now
              </Text>
              <SmallRightArrow />
            </View>
          </View>
        </View> */}
      </View>
      <View
        className="w-full h-0 border-b-2 border-dashed border-[#CE82FF] opacity-100"
        style={{
          transform: [{ rotate: '0deg' }]
        }}
      />

      <ScrollView className="flex-1 px-5">
        {/* Options Box */}
        <View
          style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 6,
            borderLeftWidth: 2.5,
            borderColor: '#F7EBFF',
            borderRadius: 20,
          }}
          className="mt-6"
        >
          {/* Account Details */}
          <View className="pt-6 pb-3 px-4">
            <Text style={{ fontSize: GetFontSize(12), color: '#919EAB' }} className="font-inter600 mb-2">ACCOUNT DETAILS</Text>

            {/* Personal Information */}
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('PersonalInformation');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className="flex-row items-center ml-2">
                <View className="mr-4">
                  <UserIcon size={GetFontSize(16)} />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600 ">Personal Information</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity>

            {/* Professional Details */}
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('ProfessionalDetails');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className="flex-row items-center ml-2">
                <View className="mr-4">
                  <Buildingicon size={GetFontSize(16)} />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Professional Details</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity>

            {/* Change Password */}
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                setShowPasswordModal(true);
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className="flex-row items-center ml-2">
                <View className="mr-4">
                  <ForgotPasswordIcon size={GetFontSize(16)} />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Change Password</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity>
          </View>

          {/* Help & Support */}
          <View className="pt-1 pb-6 px-4">
            <Text style={{ fontSize: GetFontSize(12), color: '#919EAB' }} className="font-inter600 mb-2">HELP AND SUPPORT</Text>

            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('TeacherSupport');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className=" flex-row items-center ml-2">
                <View className="mr-4">
                  <SupportIcon />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Support</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />


            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('SelfAware');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className=" flex-row items-center ml-2">
                <View className="mr-4">
                  <SupportIcon />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Support</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity> */}


            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('Faq');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className="flex-row items-center ml-2">
                <View className="mr-4">
                  <QuestionIcon />
                </View>

                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">FAQ</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                navigation.navigate('Support');
              }}
              className="bg-white rounded-[16px] p-4 mb-3 flex-row justify-between items-center border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
            >
              <View className="flex-row items-center ml-2">
                <View className="mr-4">
                  <FeedbackIcon />
                </View>
                <Text style={{ fontSize: GetFontSize(14), color: '#454F5B' }} className="font-inter600">Feedback</Text>
              </View>
              <RightArrowIcon color="#CE82FF" />
            </TouchableOpacity> */}

            <TouchableOpacity
  onPress={() => {
    Vibration.vibrate(50);
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => logout(),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  }}
  className="bg-[#ffffff] rounded-[16px] p-4 mt-3 flex-row  border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-solid border-[#DFE3E8]"
>
  <View className="flex-row items-center">
    <View className="mr-4">
      <BackIcon />
    </View>
    <Text style={{ fontSize: GetFontSize(14) }} className="text-[#DC2626] font-inter600">Log Out</Text>
  </View>
</TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full p-6" style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 6,
            borderLeftWidth: 2.5,
            borderColor: '#F7EBFF',
          }}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text style={{ fontSize: GetFontSize(18) }} className="font-inter600 text-[#212B36]">
                Change Password
              </Text>
            </View>

            {/* New Password Input */}
            <View className="mb-4">
              <Text style={{ fontSize: GetFontSize(12) }} className="text-[#637381] font-inter500 mb-2">
                New Password
              </Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholder="Enter new password"
                placeholderTextColor="#919EAB"
                className="bg-[#F9FAFB] rounded-xl p-4 border border-[#DFE3E8]"
                style={{ fontSize: GetFontSize(14), color: '#212B36' }}
              />
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text style={{ fontSize: GetFontSize(12) }} className="text-[#637381] font-inter500 mb-2">
                Confirm Password
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirm new password"
                placeholderTextColor="#919EAB"
                className="bg-[#F9FAFB] rounded-xl p-4 border border-[#DFE3E8]"
                style={{ fontSize: GetFontSize(14), color: '#212B36' }}
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(50);
                  handleCloseModal();
                }}
                className="flex-1 bg-[#F9FAFB] rounded-xl p-4 border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-[#DFE3E8]"
              >
                <Text style={{ fontSize: GetFontSize(14) }} className="text-[#637381] font-inter600 text-center">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(50);
                  handleChangePassword();
                }}
                disabled={loading}
                className="flex-1 bg-[#CE82FF] rounded-xl p-4 border-t-[1px] border-r-[2px] border-b-[4px] border-l-[2px] border-[#BF5CFF]"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ fontSize: GetFontSize(14) }} className="text-white font-inter600 text-center">
                    Update
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;