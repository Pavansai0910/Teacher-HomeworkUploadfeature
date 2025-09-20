
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GetFontSize from '../../Commons/GetFontSize';

const MockProgressBar = ({ 
  wrongPercentage, 
  rightPercentage 
}) => {
  const size = 120;
  const strokeWidth = 12;

  return (
    <View style={styles.container}>
      {/* Segment for 'Not Attempted' */}
      
      <AnimatedCircularProgress
  size={size}
  width={strokeWidth}
  fill={wrongPercentage}
  rotation={0} // Start at 0 degrees
  tintColor="#FF6060" // Red
  backgroundColor="transparent"
  lineCap="butt"
  duration={500}
/>

{/* Segment for 'Right Answers' */}
<View style={StyleSheet.absoluteFill}>
  <AnimatedCircularProgress
    size={size}
    width={strokeWidth}
    fill={rightPercentage}
    rotation={wrongPercentage * 3.6} // Start after the 'Wrong' segment
    tintColor="#2BCFA0" // Green
    backgroundColor="transparent"
    lineCap="butt"
    duration={500}
  />
</View>

<Text 
style={{fontSize:GetFontSize(28)}}
className='absolute font-inter700'>
    {rightPercentage || 0}%
</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MockProgressBar;
