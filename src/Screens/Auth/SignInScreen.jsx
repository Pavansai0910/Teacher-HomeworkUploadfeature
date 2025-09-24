import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
// import EmailIcon from '../../Images/svg/EmailIcon';
import GetFontSize from '../../Commons/GetFontSize';
import { loginTeacher} from '../../Services/loginAPI';
import { AuthContext } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';
// import Eye from '../../Images/svg/Eye';
// import EyeSlash from '../../Images/svg/EyeSlash';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        identifier: email,
        
        password,
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
    <SafeAreaView className=" h-screen bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1 justify-center items-center mx-[5%] bg-[#FFFFFF]">
          <View className="mt-[20px] w-[100%] max-w-[450px]">
            <Text
              style={{ fontSize: GetFontSize(30) }}
              className="font-inter700 text-center text-[#33569F] tracking-[-0.40] ">
              Login
            </Text>

            <View className="flex flex-row items-center mt-[27px] w-[100%] h-[54px] rounded-[11px] bg-[#A7C4FF66]">
              <View className="mx-[9px]">
                {/* <EmailIcon /> */}
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
              {/* <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)} className="mx-[9px]">
                {passwordHidden ? <EyeSlash /> : <Eye />}
              </TouchableOpacity> */}

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
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            className="w-[100%] max-w-[450px] mt-[27px]"
            onPress={handleLogin}>
            <Text
              style={{ fontSize: GetFontSize(22) }}
              className="text-[#ACCFFF] font-inter700 tracking-[-0.40] ">
              {loading ? 'Signing in...' : 'Sign in'} {'  '}
              {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
