import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const SemiCircleProgress = ({
  percentage,
  width = 200,          // Accept from parent
  height,                // Optional: let parent control height
  strokeWidth = 20,
  color = '#DD2222',
  backgroundColor = '#F5F5F5',
}) => {
  // Size logic: if height not set, use half of width (semi-circle)
  const svgWidth = width;
  const svgHeight = height !== undefined ? height : width / 2;
  const progress = Math.min(100, Math.max(0, percentage));
  const centerX = svgWidth / 2;
  const centerY = svgHeight;
  const radius = (svgWidth - strokeWidth) / 2;

  // Helper
  const polarToCartesian = (cx, cy, r, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  // Arc path builders, using width for all calculations
  const createArc = (startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
  };

  const progressAngle = (progress * 180) / 100;
  const backgroundArc = createArc(0, 180);
  const progressArc = createArc(0, progressAngle);

  return (
    <View style={styles.container}>
      <Svg width={svgWidth} height={svgHeight}>
        {/* Background Arc */}
        <Path
          d={backgroundArc}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Progress Arc */}
        <Path
          d={progressArc}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="none"
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  percentageLeft: {
    fontSize: 16,
    color: '#333',
  },
  percentageRight: {
    fontSize: 16,
    color: '#333',
  },
});

export default SemiCircleProgress;
