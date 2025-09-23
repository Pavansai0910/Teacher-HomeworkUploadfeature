import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import EdumetricIcon from '../../Images/svg/EdumetricIcon';
import GetFontSize from '../../Commons/GetFontSize';
import { useState, useRef, useEffect } from 'react';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';
import LeftArrow from '../../Images/svg/LeftArrow';
import { EdumetricLoading } from '../../Commons/EdumetricLoading';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

function GeneralAndStressEdumetric({ route }) {

  const BASE_URL = process.env.VITE_SERVER_BASE_URL + '/api/v1/';
  const { width } = useWindowDimensions();
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(route.params.type);
  const [token, setToken] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('studentToken');
        setToken(jwtToken);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        })
      }
    };
    fetchToken();
  }, []);

  //API CALL TO GET AI RESPONSE
  const HandleSend = async () => {
    setValue(route.params.type);

    if (!sendMessage.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Chat is empty',
      });
      return;
    }

    const newMessage = { text: sendMessage, user: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setSendMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        `https://hyggex-backend-school-platform-271594907587.us-central1.run.app/api/v1/student/chatbot-for-student`,
        { text: sendMessage, value: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(prevMessages => [
        ...prevMessages,
        { text: response.data.response, user: false },
      ]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
      console.log(error);
    } finally {
      // This is the correct placement for the finally block
      setLoading(false);
    }
  };
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        {/*
          Use a single parent View to hold both possible states of the UI.
          This ensures consistent layout and sizing.
        */}
        {messages.length === 0 ? (
          <View style={{ flex: 1 }}>
            {/* Your initial chat view content */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                <View>
                  <View className="mt-[86%] flex flex-row items-center">
                    <View className="ml-6">
                      <EdumetricIcon size={38} bg={'#33569F'} star={'#B4C6ED'} />
                    </View>

                    <View className="ml-3">
                      <Text
                        style={{ fontSize: GetFontSize(20) }}
                        className="mt-3 font-poppins500 text-[#000000] leading-snug">
                        Ask away—let's solve it
                      </Text>

                      <Text
                        style={{ fontSize: GetFontSize(20) }}
                        className=" font-poppins500 text-[#000000] leading-snug">
                        together.
                      </Text>
                    </View>
                  </View>

                  <TextInput
                    value={sendMessage}
                    onChangeText={text => setSendMessage(text)}
                    multiline={true}
                    textAlignVertical="top"
                    className="relative mt-3 pb-[40px] mx-[18px] h-[160px] border-[2px] border-[#4D83F0] rounded-[10px] text-[#000000]"></TextInput>

                  <TouchableOpacity
                    onPress={() => HandleSend()}
                    className="absolute bottom-2 right-7 w-[32px] h-[32px] bg-[#EDF3FF] rounded-full flex flex-row justify-center items-center ">
                    <LeftArrow width={20} height={20} flip={true} />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {/* Your chat history view content */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex justify-center items-center w-[50px] h-[50px] bg-[#dddddd33] rounded-full ml-4 mt-[16px] mb-[12px]">
              <LeftArrow width={25} height={25} />
            </TouchableOpacity>

            <ScrollView ref={messagesEndRef} style={{ flex: 1 }}>
              {messages.map((msg, index) =>
                msg.user ? (
                  <View key={index} className="mt-5 flex flex-row justify-end mr-5">
                    <Text
                      style={{ fontSize: GetFontSize(16) }}
                      className="font-poppins700 text-[#06286E] ml-[50px]">
                      {msg.text}
                    </Text>
                  </View>
                ) : (
                  <View className="mt-2 flex flex-row">
                    <View className="ml-5">
                      <EdumetricIcon size={25} bg={'#33569F'} star={'#B4C6ED'} />
                    </View>

                    <View className="ml-3 w-[70%] ">
                      <RenderHTML
                        contentWidth={width}
                        baseStyle={edumetric}
                        source={{ html: msg.text }}
                      />
                    </View>
                  </View>
                ),
              )}

              {loading && (
                <View className="h-[50px] inline-flex bg-white justify-start px-4 self-start rounded-2xl">
                  <EdumetricLoading value={value} />
                </View>
              )}
            </ScrollView>

            <View className="flex flex-row items-center">
              <View className="ml-3 w-[75%] bg-white h-[50px] border-[2px] border-[#4D83F0] rounded-[10px]">
                <TextInput
                  value={sendMessage}
                  onChangeText={text => setSendMessage(text)}
                  multiline={true}
                  className="text-[#06286E]"
                />
              </View>

              <TouchableOpacity
                onPress={() => HandleSend()}
                className="mx-2 w-[20%] h-[38px] bg-[#EDF3FF] rounded-[14px] flex justify-center ">
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="font-inter700 text-[#33569F] text-center">
                  Ask
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const edumetric = {
  color: '#06286E',
  fontSize: GetFontSize(14),
  fontFamily: 'Poppins-Regular',
  fontWeight: 400,
};

export default GeneralAndStressEdumetric;