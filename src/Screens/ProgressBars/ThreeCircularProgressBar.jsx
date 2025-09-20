import React, { useContext, useEffect, useState } from 'react';
import { getSubtopicMilestones } from '../../Services/StudentAPIV1';
import GetFontSize from '../../Commons/GetFontSize';
import { AuthContext } from '../../Context/AuthContext';
import { View,Text, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ThreeCircularProgressBar = ({
  width = 180,
  height = 180,
  strokeWidth = 18,
  backgroundColor = '#E5E7EB',
  outerColor = '#FFA500',
  middleColor = '#DD2222',
  innerColors = '#059669',
  duration = 2000,
  outerValue = 0,
  middleValue = 0,
  innerValue = 0,
}) => {
  // Responsive center/radius
  const minDim = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (minDim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Multi ring radii
  const outerRadius = radius;
  const middleRadius = radius - strokeWidth - 12;
  const innerRadius = radius - strokeWidth * 2 - 24;

  // Progress Hooks
  const [rotation] = useState(new Animated.Value(0));
  const [outerProgress] = useState(new Animated.Value(0));
  const [middleProgress] = useState(new Animated.Value(0));
  const [innerProgress] = useState(new Animated.Value(0));

  // Offset calculation based on "maxValue" (can adapt as needed)
  const outerOffset = circumference * (1 - outerValue / 100);
  const middleOffset = circumference * (1 - middleValue / 150);
  const innerOffset = circumference * (1 - innerValue / 300);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 360,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [rotation, duration]);

  useEffect(() => {
    Animated.timing(outerProgress, {
      toValue: outerOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(middleProgress, {
      toValue: middleOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(innerProgress, {
      toValue: innerOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [outerValue, middleValue, innerValue, circumference]);

  // Rotation animations
  const outerRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['-90deg', '270deg'],
  });

  const middleRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['270deg', '-90deg'],
  });

  const innerRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['-90deg', '450deg'],
  });

  return (
    <View>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <G rotation="-90" origin={`${centerX}, ${centerY}`}>
          {/* Outer BG */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={outerRadius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Outer Progress */}
          <AnimatedCircle
            cx={centerX}
            cy={centerY}
            r={outerRadius}
            fill="none"
            stroke={outerColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={outerProgress}
            strokeLinecap="round"
            origin={`${centerX}, ${centerY}`}
            rotation={outerRotation}
          />
          {/* Middle BG */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={middleRadius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Middle Progress */}
          <AnimatedCircle
            cx={centerX}
            cy={centerY}
            r={middleRadius}
            fill="none"
            stroke={middleColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={middleProgress}
            strokeLinecap="round"
            origin={`${centerX}, ${centerY}`}
            rotation={middleRotation}
          />
          {/* Inner BG */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Inner Progress */}
          <AnimatedCircle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill="none"
            stroke={innerColors}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={innerProgress}
            strokeLinecap="round"
            origin={`${centerX}, ${centerY}`}
            rotation={innerRotation}
          />
        </G>
      </Svg>
    </View>
  );
};

let exportedFocusZone = 0; // Define this outside


const StrengthAndWeaknessProgressBar = ({width}) => {
  const graphSize = width;
  const [strengthZone, setStrengthZone] = useState(0);
  const [learningZone, setLearningZone] = useState(0);
  const [focusZone, setFocusZone] = useState(0);
  const { studentProfile } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await getSubtopicMilestones({
        studentId: studentProfile._id,
      });
      const data = response.data;
      setStrengthZone(data.strongZoneCount);
      setLearningZone(data.learningZoneCount);
      setFocusZone(data.weakZoneCount);
      exportedFocusZone = data.weakZoneCount;
    })();
  }, [studentProfile._id]);

  return (
    <View>
      <View className="flex justify-center items-center pt-[42px]">
        <ThreeCircularProgressBar
          width={graphSize}
          height={graphSize}
          outerValue={learningZone}
          middleValue={focusZone}
          innerValue={strengthZone}
        />
      </View>

      {/* Your labels & legend */}
      <View className="pt-[10%] flex flex-row justify-center items-center">
        <View className="flex flex-row items-center">
          <View className="w-[8px] h-[40px] bg-[#059669] rounded-xl" />
          <View className="mx-2">
            <Text style={{ fontSize: GetFontSize(17) }} className="font-poppins600 ">
              {strengthZone || 0}
            </Text>
            <Text style={{ fontSize: GetFontSize(11) }} className="font-poppins400 ">
              Strength
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <View className="w-[8px] h-[40px] bg-[#FEBC2A] rounded-xl" />
          <View className="mx-2">
            <Text style={{ fontSize: GetFontSize(17) }} className="font-poppins600 ">
              {learningZone || 0}
            </Text>
            <Text style={{ fontSize: GetFontSize(11) }} className="font-poppins400 ">
              Learning
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <View className="w-[8px] h-[40px] bg-[#FF0000] rounded-xl" />
          <View className="mx-2">
            <Text style={{ fontSize: GetFontSize(17) }} className="font-poppins600 ">
              {focusZone || 0}
            </Text>
            <Text style={{ fontSize: GetFontSize(11) }} className="font-poppins400 ">
              Focus
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export {exportedFocusZone as focusZone};

export default StrengthAndWeaknessProgressBar;
