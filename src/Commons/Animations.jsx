import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing, // Importing Easing from react-native-reanimated
} from 'react-native-reanimated';

import LoadingTalkingIcon from '../Images/svg/LoadingTalkingIcon';

const Animations = () => {
  // Shared values for animation scaling and opacity
  const scale1 = useSharedValue(0.9);
  const opacity1 = useSharedValue(1);
  const scale2 = useSharedValue(0.9);
  const opacity2 = useSharedValue(1);
  const scale3 = useSharedValue(0.9);
  const opacity3 = useSharedValue(1);

  // Animations for the first circle
  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }));

  // Animations for the second circle
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }));

  // Animations for the third circle
  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: opacity3.value,
  }));

  useEffect(() => {
    // Start animations for the first circle
    scale1.value = withRepeat(
      withTiming(1.3, { duration: 2500, easing: Easing.linear }), // Using Easing.linear
      -1, 
      true
    );
    opacity1.value = withRepeat(
      withTiming(0, { duration: 2500, easing: Easing.linear }), 
      -1, 
      true
    );

    // Start animations for the second circle
    scale2.value = withRepeat(
      withTiming(1.3, { duration: 2500, delay: 300, easing: Easing.linear }), 
      -1, 
      true
    );
    opacity2.value = withRepeat(
      withTiming(0, { duration: 2500, delay: 300, easing: Easing.linear }), 
      -1, 
      true
    );

    // Start animations for the third circle
    scale3.value = withRepeat(
      withTiming(1.3, { duration: 2500, delay: 600, easing: Easing.linear }), 
      -1, 
      true
    );
    opacity3.value = withRepeat(
      withTiming(0, { duration: 2500, delay: 600, easing: Easing.linear }), 
      -1, 
      true
    );
  }, []);

  return (
    <View className=" items-center justify-center bg-gray-100">
      {/* Animated Circles */}
      <Animated.View
        className="absolute h-[60px] w-[60px] border-2 border-blue-400 rounded-full"
        style={animatedStyle1}
      />
      <Animated.View
        className="absolute h-[80px] w-[80px] border-2 border-blue-300 rounded-full"
        style={animatedStyle2}
      />
      <Animated.View
        className="absolute h-[100px] w-[100px] border-2 border-blue-200 rounded-full"
        style={animatedStyle3}
      />

      {/* Icon in the center */}
      <View className="absolute flex items-center justify-center">
        <LoadingTalkingIcon size={50} />
      </View>
    </View>
  );
};

export default Animations;
