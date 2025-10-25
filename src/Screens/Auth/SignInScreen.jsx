import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Vibration
} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { loginTeacher } from '../../Services/loginAPI';
import { AuthContext } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';
import Eye from '../../Images/Login/Eye';
import EyeSlash from '../../Images/Login/EyeSlash';
import RightArrow from '../../Images/LessonPlan/RightArrow';
import UserIcon from '../../Images/Login/UserIcon';
import Logo from '../../Images/Login/Logo';

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { updateProfile } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter a valid email!');
      return;
    }
    try {
      setLoading(true);
      const result = await loginTeacher({
        identifier: email.trim(),
        password: password.trim(),
        role: 'teacher',
      });
      updateProfile(result.data.profile);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: ` ${error.response.data.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#0574A8] flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="w-screen items-center mt-8 ">
          <Logo />
        </View>
        <View className="mt-[40px] bg-white flex-1 justify-center items-center rounded-t-[40px]">
          <View className="w-[100%] max-w-[450px] bg-[#FFFFFF] rounded-t-[30px]">
            <Text
              style={{ fontSize: GetFontSize(30) }}
              className="font-inter700 text-center text-[#212B36] tracking-[-0.40] mb-4">
              Login
            </Text>

            <View className="mx-[5%]">
              <View className="flex flex-row items-center w-[100%] h-[54px] rounded-[11px] bg-white border border-[#DFE3E8]">
                <View className="mx-[9px]">
                  <UserIcon />
                </View>
                <TextInput
                  style={{ fontSize: GetFontSize(15) }}
                  placeholder="username"
                  placeholderTextColor="#637381"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  className="text-[#637381] w-[254px] font-inter500 "
                />
              </View>

              <View className="flex flex-row items-center mt-[12px] w-[100%] h-[54px] rounded-[11px] bg-white border border-[#DFE3E8]">
                <TouchableOpacity onPress={() => {
                  Vibration.vibrate(50);
                  setPasswordHidden(!passwordHidden)
                }
                }
                  className="mx-[9px]">
                  {passwordHidden ? <EyeSlash /> : <Eye />}
                </TouchableOpacity>

                <TextInput
                  style={{ fontSize: GetFontSize(15) }}
                  placeholder="password"
                  placeholderTextColor="#637381"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={passwordHidden}
                  className="text-[#637381] w-[254px] font-inter500"
                />

              </View>


              <TouchableOpacity
                className={`w-[100%] max-w-[450px] mt-[27px] h-[60px] bg-[#0584BD] rounded-[11px] justify-center items-center ${loading ? 'opacity-70' : ''
                  }`}
                style={{
                  borderLeftWidth: 2.5,
                  borderRightWidth: 2.5,
                  borderTopWidth: 1.5,
                  borderBottomWidth: 4,
                  borderColor: '#046795',
                }}
                onPress={() => {
                  Vibration.vibrate(50);
                  handleLogin();
                }}>
                <Text
                  style={{ fontSize: GetFontSize(22) }}
                  className="text-white font-inter700 tracking-[-0.40] flex-row items-center">
                  {loading ? 'Signing in...' : 'Sign in'}
                  {!loading && (
                    <>
                      <RightArrow />
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;



// <View className="w-screen items-center mt-8 ">
//     <Image
//         source={AdaptmateBlueLogo}
//         style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//         className=''
//       />
//   </View>
{/* <View className="flex-1 justify-center items-center ">
          <View className="w-[100%] max-w-[450px] bg-[#FFFFFF] rounded-t-[30px]">
            <Text
              style={{ fontSize: GetFontSize(30) }}
              className="font-inter700 text-center text-[#33569F] tracking-[-0.40] mb-4">
              Login
            </Text>

            <View className="mx-[5%]">
              <View className="flex flex-row items-center w-[100%] h-[54px] rounded-[11px] bg-[#A7C4FF66]">
                <View className="mx-[9px]">
                  <UserIcon />
                </View>
                <TextInput
                  style={{ fontSize: GetFontSize(15) }}
                  placeholder="username"
                  placeholderTextColor="#33569F"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  className="text-[#33569F] w-[254px] font-inter500 "
                />
              </View>

              <View className="flex flex-row items-center mt-[12px] w-[100%] h-[54px] rounded-[11px] bg-[#A7C4FF66]">
                <TouchableOpacity onPress={() => {
                  Vibration.vibrate(50);
                  setPasswordHidden(!passwordHidden)
                }
                }
                  className="mx-[9px]">
                  {passwordHidden ? <EyeSlash /> : <Eye />}
                </TouchableOpacity>

                <TextInput
                  style={{ fontSize: GetFontSize(15) }}
                  placeholder="password"
                  placeholderTextColor="#33569F"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={passwordHidden}
                  className="text-[#33569F] w-[254px] font-inter500"
                />

              </View>


              <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                className="w-[100%] max-w-[450px] mt-[27px]"
                onPress={() => {
                  Vibration.vibrate(50);
                  handleLogin();
                }}>
                <Text
                  style={{ fontSize: GetFontSize(22) }}
                  className="text-[#ACCFFF] font-inter700 tracking-[-0.40] ">
                  {loading ? 'Signing in...' : 'Sign in'} {'  '}
                  {'>'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}