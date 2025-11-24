import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  Linking,
  Alert,
  Dimensions,
  PermissionsAndroid,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import io from 'socket.io-client';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';

const VITE_SERVER_BASE_URL = process.env.VITE_SERVER_BASE_URL;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const requestGalleryPermission = async () => {
  if (Platform.OS !== 'android') return true;
  try {
    const permission = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const checkResult = await PermissionsAndroid.check(permission);
    if (checkResult) return true;
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Allow photo access?',
      message: 'To share images in support chat',
      buttonNegative: 'Deny',
      buttonPositive: 'Allow',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert('Photo Access Required', 'Enable photo access in Settings to share images', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Settings', onPress: () => Linking.openSettings() },
      ]);
    }
    return false;
  } catch (err) {
    return false;
  }
};

function TeacherSupport() {
  const navigation = useNavigation();
  const { teacherProfile } = useContext(AuthContext);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [error, setError] = useState('');
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({ text: 'Initializing...', color: '#9CA3AF' });
  const [inputValue, setInputValue] = useState('');
  const [sendingFile, setSendingFile] = useState(false);
  const [fullImageModal, setFullImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  const screenHeight = Dimensions.get('window').height;
  const headerHeight = (screenHeight * 10.61) / 100;
  const teacherId = teacherProfile?._id;
  const schoolId = teacherProfile?.schoolId?._id;
  const statusBarHeight = StatusBar.currentHeight || 0;

  useEffect(() => {
    if (teacherId && schoolId) startChatSession();
    else {
      setError('Teacher profile not loaded. Please login again.');
      setStatus({ text: 'Profile Error', color: '#EF4444' });
    }
    return () => socketRef.current?.disconnect();
  }, [teacherId, schoolId]);

  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    const socket = io(VITE_SERVER_BASE_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus({ text: 'Connected', color: '#10B981' });
      setCurrentStatus(true);
      setError('');
      socket.emit('joinRoom', chatId);
    });

    socket.on('receiveMessage', (msg) => setMessages((msgs) => [...msgs, msg]));

    socket.on('disconnect', () => {
      setStatus({ text: 'Disconnected', color: '#EF4444' });
      setCurrentStatus(false);
    });

    socket.on('connect_error', (err) => {
      setStatus({ text: 'Connection Failed', color: '#EF4444' });
      setCurrentStatus(false);
      setError('Unable to connect to chat server');
    });

    return () => socket.disconnect();
  }, [chatId]);

  async function startChatSession() {
    setError('');
    setStatus({ text: 'Starting chat...', color: '#9CA3AF' });
    if (!schoolId || !teacherId) {
      setError('School ID and Teacher ID are required.');
      setStatus({ text: 'Profile Error', color: '#EF4444' });
      return;
    }

    try {
      let token = await AsyncStorage.getItem('token') || teacherProfile?.token;
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      const res = await fetch(`${VITE_SERVER_BASE_URL}/api/v1/admin/sessions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ schoolId, teacherId }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = JSON.parse(await res.text());
      if (!res.ok) throw new Error(data.message || data.error || `Server error: ${res.status}`);

      const chatIdValue = data.chatId || data.chat_id || data.id || data.data?.chatId;
      if (chatIdValue) {
        setChatId(chatIdValue);
        setMessages([]);
        setStatus({ text: 'Connecting...', color: '#9CA3AF' });
        setError('');
      } else {
        throw new Error('No chatId received from server.');
      }
    } catch (err) {
      const errorMessage = err.name === 'AbortError' 
        ? 'Request timeout.' 
        : err.message.includes('Network request failed') 
        ? 'Cannot connect to server. Check internet connection.' 
        : err.message.includes('401') 
        ? 'Unauthorized. Please login again.' 
        : err.message;
      setError(errorMessage);
      setStatus({ text: 'Connection Failed', color: '#EF4444' });
    }
  }

  async function sendMessage() {
    Vibration.vibrate(50);
    const content = inputValue.trim();
    if (!content) return;
    setError('');
    Keyboard.dismiss();
    
    // Create the message object
    const newMessage = {
      sender: 'teacher',
      content: content,
      messageType: 'text',
      timestamp: new Date().toISOString()
    };
    
    // Add message to UI immediately
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');
    
    // Send to server
    if (socketRef.current?.connected) {
      socketRef.current.emit('sendMessage', { chatId, sender: 'teacher', content });
    } else {
      setError('Not connected to chat server');
    }
  }

  const onAttachClick = async () => {
    if (!currentStatus) {
      Alert.alert('Error', 'Please wait for connection to establish');
      return;
    }
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
      async (response) => {
        if (response.didCancel || response.errorCode) {
          if (response.errorCode) Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }
        const asset = response.assets?.[0];
        if (!asset) {
          Alert.alert('Error', 'No image selected');
          return;
        }
        if (asset.fileSize > MAX_FILE_SIZE) {
          Alert.alert('Error', 'Image size must be less than 10MB');
          return;
        }

        setSendingFile(true);
        
        // Add image message to UI immediately with local URI
        const tempImageMessage = {
          sender: 'teacher',
          imageUrl: asset.uri,
          messageType: 'image',
          timestamp: new Date().toISOString(),
          content: ''
        };
        setMessages((prevMessages) => [...prevMessages, tempImageMessage]);

        const formData = new FormData();
        formData.append('chatImage', {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || 'image.jpg',
        });
        formData.append('sender', 'teacher');
        formData.append('chatId', chatId);

        try {
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(
            `${VITE_SERVER_BASE_URL}/api/v1/admin/chats/${chatId}/messages`,
            {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to send image');
          }
          setError('');
        } catch (err) {
          setError(`Failed to send image: ${err.message}`);
          Alert.alert('Upload Failed', err.message);
          // Remove the failed image message from UI
          setMessages((prevMessages) => prevMessages.filter(msg => msg !== tempImageMessage));
        } finally {
          setSendingFile(false);
        }
      }
    );
  };

  const openFullImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setFullImageModal(true);
  };

  const closeFullImage = () => {
    setFullImageModal(false);
    setSelectedImage(null);
  };

  function renderMessage(msg, idx) {
    const { sender, content, imageUrl, messageType, timestamp } = msg;
    const isTeacher = sender === 'teacher';

    return (
      <View
        key={idx}
        className={`flex flex-col max-w-[85%] mb-4 ${isTeacher ? 'self-end' : 'self-start'}`}
      >
        <View
          className={`relative py-3 px-4 rounded-[12px] ${isTeacher ? 'bg-[#F4F6F8]' : 'bg-[#E7F6FE]'}`}
        >
          {messageType === 'image' ? (
            <View>
              <TouchableOpacity onPress={() => openFullImage(imageUrl)}>
                <Image source={{ uri: imageUrl }} className="w-[200px] h-[200px] rounded-xl mb-3" resizeMode="cover" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openFullImage(imageUrl)}
                className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded"
              >
                <Text className="text-white text-xs">View Full</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ fontSize: GetFontSize(14), paddingBottom: 14 }} className="text-[#212B36] font-inter400 leading-snug">
              {content}
            </Text>
          )}
          <Text
            style={{ fontSize: GetFontSize(8) }}
            className="absolute right-3 bottom-2 text-[#637381] font-inter400"
            numberOfLines={1}
          >
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  }

  const isDisabled = sendingFile || !currentStatus || !inputValue.trim();

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 30}
      >
        <View style={{ height: headerHeight }} className="bg-[#F7EBFF] justify-end">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => { Vibration.vibrate(50);navigation.goBack()}} className="w-20 h-20 justify-center items-center">
              <Text style={{ fontSize: GetFontSize(24) }} className="text-[#212B36] font-inter600">←</Text>
            </TouchableOpacity>
            <View className="flex-1 pr-5">
              <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600">Support Chat</Text>
              <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] font-inter400 mt-1">
                Your personal virtual assistant
              </Text>
              <Text style={{ fontSize: GetFontSize(12), color: status.color }} className="font-inter400 mt-1 opacity-80">
                {status.text}
              </Text>
            </View>
          </View>
        </View>
        
        {error ? (
          <View className="mx-5 mt-6 mb-4 p-3 bg-[#FEE2E2] border border-[#EF4444] rounded-lg">
            <Text style={{ fontSize: GetFontSize(14) }} className="text-[#EF4444] font-inter500">{error}</Text>
            <TouchableOpacity onPress={startChatSession} className="mt-2">
              <Text style={{ fontSize: GetFontSize(14) }} className="text-[#0976A9] font-inter600">Retry Connection</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            className="px-5"
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(renderMessage)}
          </ScrollView>
        </TouchableWithoutFeedback>
        
        <View className="px-5 py-3 bg-white border-t border-[#DFE3E8]">
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white border border-[#D1D5DB] rounded-full px-4 py-2 mr-2">
              <TextInput
                ref={textInputRef}
                className="flex-1 font-inter400"
                style={{ fontSize: GetFontSize(16), maxHeight: 100, paddingTop: 0, paddingBottom: 0 }}
                placeholder="Type your message..."
                placeholderTextColor="#9CA3AF"
                value={inputValue}
                onChangeText={setInputValue}
                editable={!sendingFile && currentStatus}
                multiline
                textAlignVertical="center"
                onFocus={() => setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 300)}
              />
              <TouchableOpacity onPress={onAttachClick} disabled={sendingFile || !currentStatus} className="p-1 ml-2">
                {sendingFile ? (
                  <ActivityIndicator size="small" color="#919EAB" />
                ) : (
                  <Text style={{ fontSize: GetFontSize(20) }} className="text-[#919EAB]">📎</Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={sendMessage}
              disabled={isDisabled}
              style={{
                borderTopWidth: 1.5,
                borderRightWidth: 2.5,
                borderBottomWidth: 4,
                borderLeftWidth: 2.5,
                borderColor: '#BF5CFF',
                opacity: isDisabled ? 0.5 : 1,
              }}
              className="w-11 h-11 rounded-full bg-[#CE82FF] justify-center items-center"
            >
              <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600">➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Full Image Modal */}
      <Modal
        visible={fullImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeFullImage}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <TouchableOpacity 
            onPress={closeFullImage}
            className="absolute top-10 right-5 z-10 bg-white/20 rounded-full p-2"
          >
            <Text style={{ fontSize: GetFontSize(24) }} className="text-white font-inter600">✕</Text>
          </TouchableOpacity>
          
          <Image 
            source={{ uri: selectedImage }} 
            style={{ 
              width: Dimensions.get('window').width, 
              height: Dimensions.get('window').height 
            }} 
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

export default TeacherSupport;