import React, { useRef, useState, useCallback, useContext } from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import SyllabusCard from './Cards/SyllabusCard';
import FoucsStatsCard from './Cards/FoucsStatsCard';
import SelfAwarenessCard from './Cards/SelfAwarenessCard';
import LessonScheduleCard from './Cards/LessonScheduleCard';
import HelloCard from './Cards/HelloCard';
import GetFontSize from '../../Commons/GetFontSize';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlueSettingIcon from '../../Images/svg/BlueSettingIcon';
import { changeStudentPassword } from '../../Services/StudentAPIV1';
import Toast from 'react-native-toast-message';
import AvatarIcon from '../../Images/svg/AvatarIcon';

const HomeScreen = () => {
  const { studentProfile, logout } = useContext(AuthContext);

  const { width, height } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const cardWidth = width * 0.78;
  const cardSpacing = width * 0.08;

  const cards = [
    { key: 'hello', component: HelloCard },
    { key: 'syllabus', component: SyllabusCard },
    { key: 'focus', component: FoucsStatsCard },
    { key: 'selfAwareness', component: SelfAwarenessCard },
    { key: 'lessonSchedule', component: LessonScheduleCard },
  ];

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {

      try {
        const response = await changeStudentPassword({
          studentId: studentProfile?._id,
          newPassword: newPassword
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        })
      }
      setIsChangePasswordModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');
      Toast.show({
        type: 'success',
        text1: 'Password change successfully',
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `Password doesn't match`,
      })
    }
  };

  const renderCard = useCallback(
    ({ item }) => {
      const CardComponent = item.component;
      return (
        <View style={[styles.cardContainer, { width: cardWidth }]}>
          <CardComponent />
        </View>
      );
    },
    [cardWidth],
  );

  const onScroll = useCallback(
    event => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / (cardWidth + cardSpacing));
      setCurrentIndex(index);
    },
    [cardWidth, cardSpacing],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: cardWidth + cardSpacing,
      offset: (cardWidth + cardSpacing) * index,
      index,
    }),
    [cardWidth, cardSpacing],
  );

  const snapToOffsets = cards.map(
    (_, index) => index * (cardWidth + cardSpacing),
  );


  return (
    <SafeAreaView style={styles.container} className='relative'>
      <View className="mx-[21px] py-[10px] h-[10%]">
        <View className=" flex-row justify-start items-center">
          <Image
            source={require(`../../Images/png/avatar.png`)}
            className="w-[18%]"
          />
          {/* <AvatarIcon width={44} height={44} /> */}
          <View className="ml-[6px] w-[65%]">
            <Text
              style={{ fontSize: GetFontSize(20) }}
              ellipsizeMode='tail'
              numberOfLines={1}
              className="font-inter600 text-black tracking-[-0.55] leading-tight ">
              {studentProfile?.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
            <Text
              style={{ fontSize: GetFontSize(12) }}
              className="font-inter400 text-[#979797] tracking-[-0.45] leading-tight">
              Class {studentProfile?.classId?.className} Section {studentProfile?.sectionId?.sectionName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsSettingsModalVisible(true)}
            className='absolute right-0 '>
            <BlueSettingIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderCard}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={1}
        getItemLayout={getItemLayout}
        initialScrollIndex={0}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingHorizontal: (width - cardWidth) / 2 - cardSpacing / 2 },
        ]}
        ItemSeparatorComponent={() => <View style={{ width: cardSpacing }} />}
      />

      {/* Main Settings Modal */}
      <Modal
        visible={isSettingsModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={() => {
                setIsSettingsModalVisible(false);
                setIsLogoutModalVisible(true);
              }}
            >
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={() => {
                setIsSettingsModalVisible(false);
                setIsChangePasswordModalVisible(true);
              }}
            >
              <Text style={styles.modalOptionText}>Change Password</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.modalOptionButton, styles.cancelButton]}
              onPress={() => setIsSettingsModalVisible(false)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
            <Text className="mt-2 text-[#333333]">Version 1.0.0</Text>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
        <Modal
          visible={isLogoutModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsLogoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.noButton]}
                  onPress={() => setIsLogoutModalVisible(false)}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.yesButton]}
                  onPress={async () => {
                    await logout();
                    setIsLogoutModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={isChangePasswordModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsChangePasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Change Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor={'#979797'}

            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={'#979797'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={handlePasswordChange}
              >
                <Text style={styles.buttonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.noButton]}
                onPress={() => setIsChangePasswordModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: GetFontSize(18),
    fontFamily: 'inter600',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#33569F',
  },
  noButton: {
    backgroundColor: '#979797',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'inter600',
    fontSize: GetFontSize(16),
  },
  modalOptionButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionText: {
    fontSize: GetFontSize(18),
    fontFamily: 'inter600',
    color: '#33569F',
  },
  cancelButton: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'inter400',
    fontSize: GetFontSize(16),
    color: 'black',

  },
});

export default HomeScreen;