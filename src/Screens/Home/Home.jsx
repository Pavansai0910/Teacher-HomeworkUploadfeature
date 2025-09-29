import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import NotificationIcon from '../../Images/Home/NotificationIcon';
import StudentsInsightsCard from '../HomeScreen/Cards/StudentsInsightsCard';
import LessonPlannerCard from '../HomeScreen/Cards/LessonPlannerCard';
import AssignTestCard from '../HomeScreen/Cards/AssignTestCard';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const { width } = Dimensions.get('window');

// Function to get initials from name
const getInitials = name => {
  if (!name) return 'AS'; // Default fallback

  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const Home = () => {
  const { teacherProfile } = useContext(AuthContext);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gradientBackgrounds = [
    ['#FFFFFF', '#BBF192'],
    ['#FFFFFF', '#93D8FB'],
    ['#FFFFFF', '#FEDB85'],
  ];

  const cardWidth = width * 0.7;
  const cardSpacing = 1;

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / cardWidth);
    setCurrentIndex(index);
  };

  const userInitials = getInitials(teacherProfile?.name);

  return (
    <SafeAreaView className="flex-1 mt-6">
      <View className="flex-row justify-between items-center px-5 pt-2 pb-5 bg-white">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate('Settings')}
        >
          <View className="w-11 h-11 rounded-full bg-[#E75B9C] items-center justify-center mr-3">
            <Text className="text-white font-bold text-base">
              {userInitials}
            </Text>
          </View>
          <View>
            <Text className="text-[#454F5B] text-[16px] font-bold">
              {teacherProfile?.name}
            </Text>
            <Text className="text-[#637381] text-[14px] font-regular">
              Welcome to Adaptmate
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center">
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={gradientBackgrounds[currentIndex]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View className="flex-row justify-between px-6 pt-4 pb-6">
          <TouchableOpacity
            className="flex-1 mr-2 rounded-[16px] py-3 px-4 flex-row justify-between items-center shadow-sm"
            style={{
              backgroundColor: '#FFF',
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderBottomWidth: 6,
              borderLeftWidth: 3,
              borderColor: '#A17F5E',
            }}
          >
            <Text className="text-[#DC9047] font-semibold text-sm">Class</Text>
            <Text className="text-[#DC9047] text-lg">▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 mr-2 rounded-[16px] py-3 px-4 flex-row justify-between items-center shadow-sm"
            style={{
              backgroundColor: '#FFF',
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderBottomWidth: 6,
              borderLeftWidth: 3,
              borderColor: '#A17F5E',
            }}
          >
            <Text className="text-[#DC9047] font-semibold text-sm">
              Subject
            </Text>
            <Text className="text-[#DC9047] text-lg">▼</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-center">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={cardWidth + cardSpacing}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: width * 0.15,
              alignItems: 'center',
            }}
          >
            <StudentsInsightsCard
              onPress={() => navigation.navigate('StudentsInsights')}
              isActive={currentIndex === 0}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
            <LessonPlannerCard
              onPress={() => navigation.navigate('LessonPlanner')}
              isActive={currentIndex === 1}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
            <AssignTestCard
              onPress={() => navigation.navigate('AssignTest')}
              isActive={currentIndex === 2}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
          </ScrollView>

          <View className="flex-row justify-center items-center mt-5 mb-8">
            {gradientBackgrounds.map((_, index) => {
              let dotColor = '#FFFFFF'; // default inactive color
              if (currentIndex === index) {
                if (index === 0) dotColor = '#A5ED6F';
                else if (index === 1) dotColor = '#1EAFF7';
                else if (index === 2) dotColor = '#FED570';
              }
              return (
                <View
                  key={index}
                  className="rounded-full mx-1"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: dotColor,
                  }}
                />
              );
            })}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
