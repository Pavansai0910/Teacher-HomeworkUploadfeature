import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestLoader = ({ isVisible, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isTablet = screenWidth > 600;

  const circleSize = isTablet ? 180 : 120;
  const strokeWidth = isTablet ? 16 : 12;

  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const topics = [
    { number: 1, text: 'Selecting the subject and topic...' },
    { number: 2, text: 'Choosing the test type and duration...' },
    { number: 3, text: 'Adding questions to the test...' },
    { number: 4, text: 'Setting difficulty levels...' },
    { number: 5, text: 'Reviewing and finalizing the test...' },
    { number: 6, text: 'Assigning test to students...' },
    { number: 7, text: 'Generating test summary...' },
  ];

  // Spinner animation
  useEffect(() => {
    if (isVisible) {
      rotationAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
    return () => rotationAnim.stopAnimation();
  }, [isVisible]);

  // Auto progress through topics
  useEffect(() => {
    if (!isVisible) return;

    setCompletedTopics(new Set());
    setCurrentTopicIndex(0);
    setProgress(0);
    progressAnim.setValue(0);

    const processTopic = (index) => {
      if (index >= topics.length) {
        setCurrentTopicIndex(-1);
        setTimeout(onClose, 1000);
        return;
      }

      setCurrentTopicIndex(index);

      setTimeout(() => {
        setCompletedTopics((prev) => {
          const newCompleted = new Set(prev);
          newCompleted.add(index);
          return newCompleted;
        });

        const newProgress = ((index + 1) / topics.length) * 100;
        setProgress(newProgress);

        Animated.timing(progressAnim, {
          toValue: newProgress,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start();

        setTimeout(() => processTopic(index + 1), 500);
      }, 1000);
    };

    processTopic(0);

    return () => setCurrentTopicIndex(-1);
  }, [isVisible]);

  if (!isVisible) return null;

  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: isTablet ? 32 : 16,
          paddingHorizontal: isTablet ? 40 : 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-white w-full">
          <Text
            className="text-[#212B36] font-semibold text-center mb-1"
            style={{ fontSize: isTablet ? 22 : 18 }}
          >
            Assigning the test
          </Text>
          <Text
            className="text-[#637381] text-center mb-6"
            style={{ fontSize: isTablet ? 16 : 13 }}
          >
            AI is preparing and assigning the test to selected students
          </Text>

          {/* Circular Progress */}
          <View className="items-center justify-center">
            <View style={{ width: circleSize, height: circleSize }}>
              <Svg width={circleSize} height={circleSize}>
                <Defs>
                  <LinearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="4.62%" stopColor="#1EAFF7" />
                    <Stop offset="93.01%" stopColor="#0679B1" />
                  </LinearGradient>
                </Defs>
                <Circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="#E8F4FD"
                  strokeWidth={strokeWidth}
                  fill="white"
                />
                <Circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
                />
              </Svg>

              {/* % Text */}
              <View className="absolute inset-0 items-center justify-center">
                <Animated.Text
                  className="text-[#1EAFF7] font-bold"
                  style={{ fontSize: isTablet ? 26 : 20 }}
                >
                  {Math.round(progress)}%
                </Animated.Text>
                <Text
                  className="text-[#67717a] mt-1"
                  style={{ fontSize: isTablet ? 13 : 10 }}
                >
                  Complete
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Topics Section */}
        <View
          className="rounded-2xl bg-white p-4 shadow-md"
          style={{
            width: isTablet ? '90%' : Math.min(330, screenWidth - 32),
            maxWidth: isTablet ? 600 : 340,
          }}
        >
          <Text
            className="text-[#212B36] font-semibold text-center mb-4"
            style={{ fontSize: isTablet ? 18 : 15 }}
          >
            Crafting Your Perfect Test
          </Text>

          <View className="gap-2">
            {topics.map((topic, index) => {
              const isCompleted = completedTopics.has(index);
              const isCurrent = index === currentTopicIndex;

              let containerClasses =
                'rounded-xl p-3 flex-row items-center border';
              let numberCircleClasses =
                'w-8 h-8 rounded-full justify-center items-center mr-3';
              let textClasses = 'flex-1';
              let showSpinner = false;
              let showCheckmark = false;

              if (isCompleted) {
                containerClasses += ' bg-[#D4F5B8] border-[#7FD45A]';
                numberCircleClasses += ' bg-[#7FD45A]';
                textClasses += ' text-[#5CB92B] font-semibold';
                showCheckmark = true;
              } else if (isCurrent) {
                containerClasses += ' bg-[#F4F6F8] border-[#E5E7EB]';
                numberCircleClasses += ' bg-[#1EAFF7]';
                textClasses += ' text-[#637381] font-semibold';
                showSpinner = true;
              } else {
                containerClasses += ' bg-[#F4F6F8] border-[#E5E7EB]';
                numberCircleClasses += ' bg-[#9CA3AF]';
                textClasses += ' text-[#637381] font-normal';
              }

              return (
                <Animated.View key={index} className={containerClasses}>
                  <View className={numberCircleClasses}>
                    <Text className="text-white font-semibold text-sm">
                      {topic.number}
                    </Text>
                  </View>

                  <Text
                    className={textClasses}
                    style={{ fontSize: isTablet ? 15 : 13 }}
                  >
                    {topic.text}
                  </Text>

                  {showSpinner && (
                    <Animated.View
                      style={{ transform: [{ rotate: spin }] }}
                      className="w-5 h-5 rounded-full border-2 border-[#1EAFF7] ml-2"
                    />
                  )}

                  {showCheckmark && (
                    <View className="w-5 h-5 rounded-full bg-[#7FD45A] items-center justify-center ml-2">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}
                </Animated.View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestLoader;
