import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {useNewAuth} from '../../Context/AuthContext';
import OtpInput from '../../Utils/OtpInput';
import EmailIcon from '../../Images/svg/EmailIcon';
import NameIcon from '../../Images/svg/NameIcon';
import WhiteBackButton from '../../Images/svg/WhiteBackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GetFontSize from '../../Commons/GetFontSize';
const SignUpScreen = () => {

  const navigation = useNavigation()
  // const {sendOTP, verifyOTP, checkUserExist, googleSignUp, loading} =
    // useNewAuth();
  const [formData, setFormData] = useState({fullName: '', email: ''});
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendAfter, setResendAfter] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (resendAfter > 0) {
      timerRef.current = setTimeout(
        () => setResendAfter(resendAfter - 1),
        1000,
      );
    } else {
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendAfter]);

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSendOtp = async () => {
    if (!formData.fullName || !formData.email) {
      Alert.alert('Warning', 'Please fill all fields.');
      return;
    }

    try {
      const response = await checkUserExist(formData.email);
      if (response && response.exists) {
        Alert.alert('Error', 'User already registered! Please log in instead.');
        return;
      }

      const otpResponse = await sendOTP(
        formData.email,
        formData.fullName,
        true,
      );
      if (otpResponse.success) {
        setOtpSent(true);
        setResendAfter(otpResponse.resendAfter || 45);
      } else {
        Alert.alert('Error', `Failed to send OTP`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP, please try again.');
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid OTP.');
      return;
    }
    try {
      const verifyResponse = await verifyOTP(
        formData.email,
        otp,
        formData.fullName,
        true,
      );
      if (verifyResponse.success) {
        Alert.alert('Success', 'Registration successful!');
        await AsyncStorage.setItem('flag', JSON.stringify(true));
        navigation.navigate('MainTabNavigator');
      } else {
        Alert.alert('Error', `Failed to verify OTP. ${verifyResponse.message}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Error verifying OTP. Please try again.');
      console.error('Error in handleVerifyOtpAndRegister:', error);
    }
  };


  if (otpSent) {
    return (
     
      <SafeAreaView className="relative h-[100%]">
      <View className='h-[50%] bg-[#33569F] flex justify-end items-center'>
      <View className="absolute top-[20px] left-[13px] flex flex-row justify-center items-center">
        <TouchableOpacity onPress={()=>{
          setOtpSent(false)
        }}>
      <WhiteBackButton />
        </TouchableOpacity>
      <Text 
      style={{fontSize:GetFontSize(20)}}
      className='font-inter700 tracking-[-0.4] text-white ml-1'> 
        Confirmation
      </Text>
          </View>
       <Image 
       source={require('../../Images/png/otpImage.png')} />
       </View>

        <View className='h-[50%] mx-[22px] mt-[29px]'>

          <OtpInput length={6} onOtpChange={setOtp} />

            <Text 
            style={{fontSize:GetFontSize(13)}}
            className='font-inter600 text-center mt-[25px] tracking-[-0.10]'>
              Didn't get the OTP?{' '}
              <Text className="underline text-[#33569F]" onPress={handleSendOtp}>
                Click to resend
              </Text>
            </Text>
         
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleVerifyOtpAndRegister}
            className="w-[100%] mt-[36px]">
            <Text 
            style={{fontSize:GetFontSize(24)}}
            className="font-inter700 text-[#ACCFFF]">Verify</Text>
          </TouchableOpacity>

              </View>
          </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-screen">
      <View className="flex justify-center items-center h-full mx-[21px]">
        
        <View className='mt-[25%]'>
          <Text
            style={{fontSize: GetFontSize(30)}}
            className="font-inter700 text-center text-[#33569F] leading-[33px] tracking-[-0.40] ">
            Sign up
          </Text>
        </View>

          <View className="flex flex-row items-center mt-[27px] w-[100%] h-[54px] rounded-[11px] bg-[#A7C4FF66]">
            <View className="mx-[9px]">
              <NameIcon />
            </View>
            <TextInput
              style={{fontSize: GetFontSize(15)}}
              placeholder="Your name"
              placeholderTextColor="#33569F"
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
              className="text-[#33569F] w-[254px] font-inter500 "
            />
          </View>

          <View className="flex flex-row items-center mt-[27px] w-[100%] h-[54px] rounded-[11px] bg-[#A7C4FF66]">
            <View className="mx-[9px]">
              <EmailIcon />
            </View>
            <TextInput
              style={{fontSize: GetFontSize(15)}}
              placeholder="Email address"
              placeholderTextColor="#33569F"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="name"
              className="text-[#33569F] w-[254px] font-inter500 "
            />
          </View>

          {/* Implement Google Sign-In button here */}
          {/* You'll need to use a library like @react-native-google-signin/google-signin */}

          <View className="mt-[27px]">
            <Text
              style={{fontSize: GetFontSize(13)}}
              className="font-inter600 tracking-[-0.10] text-[#000000] text-center">
              <Text>Already have an account? </Text>
              <Text
                className="underline text-[#33569F]  font-inter600"
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}>
                Log in here{' '}
              </Text>
            </Text>
          </View>

          <View className='mt-[47px]'>
            <Text
              style={{fontSize: GetFontSize(11)}}
              className="font-inter500 tracking-[-0.10] text-[#4C4848] text-center">
              <Text>By registering, you agree to our </Text>
              <Text className="underline font-inter700">
                Terms and Conditions{' '}
              </Text>
              <Text>and </Text>
              <Text className="underline font-inter700">Privacy Policy.</Text>
              <Text>Your data is securely encrypted with TLS.</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            className="w-[100%] mt-[16px]"
            onPress={handleSendOtp}>
            <Text
              style={{fontSize: GetFontSize(22)}}
              className="text-[#ACCFFF] font-inter700 leading-[29px] tracking-[-0.40] ">
              Sign up {'  '}
              {'>'}
            </Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.7,
  },

  button: {
    height: 60,
    backgroundColor: '#33569F',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
