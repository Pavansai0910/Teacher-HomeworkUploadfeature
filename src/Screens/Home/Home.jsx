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

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: 'Students insights',
      subtitle:
        'Generate comprehensive lesson plans with objectives and activities',
      buttonText: 'Student Insights',
      solidColor: '#FFD700',
      gradientColors: ['#FFF4A3', '#FFE066', '#FFD700'],
      onPress: () => navigation.navigate('StudentsInsights'),
    },
    {
      id: 2,
      title: 'Create Lesson Plan',
      subtitle: 'Save 2+ hours Daily planning',
      buttonText: 'Create Lesson Plan',
      solidColor: '#4A90E2',
      gradientColors: ['#87CEEB', '#5BA3E0', '#4A90E2'],
      onPress: () => navigation.navigate('LessonPlanner'),
    },
    {
      id: 3,
      title: 'Assign Test',
      subtitle:
        'Generate comprehensive lesson plans with objectives and activities',
      buttonText: 'Assign Test',
      solidColor: '#7ED321',
      gradientColors: ['#B8E994', '#90E05A', '#7ED321'],
      onPress: () => navigation.navigate('AssignTest'),
    },
  ];

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / (width * 0.85));
    setCurrentIndex(index);
  };

  const renderCard = card => (
    <View
      key={card.id}
      className="mx-2 rounded-3xl overflow-hidden shadow-lg mt-32"
      style={{ width: width * 0.85, height: 320 }}
    >
      <LinearGradient
        colors={card.gradientColors}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View className="flex-1 p-5">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-md mb-4">
              <View className="w-8 h-8 bg-gray-300 rounded-full" />
            </View>

            <View className="flex-row">
              <View className="w-8 h-8 bg-white rounded-full items-center justify-center mx-1 shadow-sm">
                <View className="w-4 h-4 bg-blue-400 rounded-full" />
              </View>
              <View className="w-8 h-8 bg-white rounded-full items-center justify-center mx-1 shadow-sm">
                <View className="w-4 h-4 bg-orange-400 rounded-full" />
              </View>
            </View>
          </View>

          <View className="flex-1 justify-end">
            <View
              className="rounded-2xl p-4 items-center shadow-lg"
              style={{ backgroundColor: card.solidColor, minHeight: 120 }}
            >
              <Text className="text-white text-lg font-bold text-center mb-2">
                {card.title}
              </Text>
              <Text className="text-white text-xs text-center opacity-90 leading-4 mb-4">
                {card.subtitle}
              </Text>

              <TouchableOpacity
                className="bg-white py-2 px-6 rounded-full"
                onPress={card.onPress}
              >
                <Text className="text-gray-800 text-sm font-semibold">
                  {card.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-2 pb-5">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-full bg-orange-500 items-center justify-center mr-3">
            <Text className="text-white font-bold text-base">AS</Text>
          </View>
          <View>
            <Text className="text-[#454F5B] text-[16px] font-bold">
              Aditi Sharma
            </Text>
            <Text className="text-[#637381] text-[14px] font-regular">
              Welcome to Adaptmate
            </Text>
          </View>
        </View>
        <TouchableOpacity className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center">
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Dropdowns */}
      <View className="flex-row px-5 mb-8">
        <TouchableOpacity className="flex-1 flex-row justify-between items-center py-3 px-4 mx-1 bg-white rounded-full border-2 border-orange-500">
          <Text className="text-sm text-orange-500 font-medium">Class</Text>
          <Text className="text-xs text-orange-500">▼</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row justify-between items-center py-3 px-4 mx-1 bg-white rounded-full border-2 border-orange-500">
          <Text className="text-sm text-orange-500 font-medium">Subject</Text>
          <Text className="text-xs text-orange-500">▼</Text>
        </TouchableOpacity>
      </View>

      {/* Sliding Cards - Manual scroll only */}
      <View className="flex-1 justify-center">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {cards.map(renderCard)}
        </ScrollView>

        {/* Dots Indicator */}
        <View className="flex-row justify-center items-center mt-5">
          {cards.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                currentIndex === index ? 'bg-orange-500 w-6' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Bottom spacing */}
      <View className="h-5" />
    </SafeAreaView>
  );
};

export default Home;
