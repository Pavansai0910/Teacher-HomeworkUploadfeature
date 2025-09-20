import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Modal
} from 'react-native';
import SyllabusCard from './Cards/SyllabusCard';
import FoucsStatsCard from './Cards/FoucsStatsCard';
import SelfAwarenessCard from './Cards/SelfAwarenessCard';
import LessonScheduleCard from './Cards/LessonScheduleCard';
import HelloCard from './Cards/HelloCard';
import GetFontSize from '../../Commons/GetFontSize';
import { AuthContext } from '../../Context/AuthContext';
import LogoutIcon from '../../Images/svg/LogoutIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  const { studentProfile, logout } = useContext(AuthContext);

  const { width, height } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cardWidth = width * 0.78;
  const cardSpacing = width * 0.08;

  const cards = [
    { key: 'hello', component: HelloCard },
    { key: 'syllabus', component: SyllabusCard },
    { key: 'focus', component: FoucsStatsCard },
    { key: 'selfAwareness', component: SelfAwarenessCard },
    { key: 'lessonSchedule', component: LessonScheduleCard },
  ];

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
        <View className=" flex-row justify-start items-center ">
          <Image
            source={require(`../../Images/png/avatar.png`)}
            className="w-[18%]"
          />
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
            // onPress={async () => {
            //   await logout()
            // }}
            onPress={() => setIsModalVisible(true)}
            className='absolute right-0 '>
            <LogoutIcon />
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
            <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={async () => {
                  await logout();
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.noButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
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
  },  modalContainer: {
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
    backgroundColor: '#FF6347',
  },
  noButton: {
    backgroundColor: '#4682B4',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'inter600',
    fontSize: GetFontSize(16),
  },
});


export default HomeScreen;
