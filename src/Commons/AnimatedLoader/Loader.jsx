import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const Loader = ({ isVisible, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [clickedTopics, setClickedTopics] = useState(new Set());
  const screenWidth = Dimensions.get('window').width;
  const circleSize = 120;
  const strokeWidth = 12;

  const topics = [
    { number: 1, text: 'Analyzing curriculum standards...' },
    { number: 2, text: 'Adding learning objectives...' },
    { number: 3, text: 'Selecting teaching methodologies...' },
    { number: 4, text: 'Adding interactive activities...' },
    { number: 5, text: 'Preparing assessment strategies...' },
    { number: 6, text: 'Adding teaching aids & resources..' },
    { number: 7, text: 'Finalizing lesson structure...' },
  ];

  const handleTopicClick = (index) => {
    if (!clickedTopics.has(index) && progress < 100) {
      setClickedTopics(prev => new Set([...prev, index]));
      const increment = 100 / topics.length;
      const newProgress = Math.min(progress + increment, 100);
      setProgress(newProgress);
    }
  };

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, onClose, isVisible]);

  if (!isVisible) return null;

  // Calculate SVG circle properties
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 16 
        }}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            backgroundColor: '#1EAFF7',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
          onPress={onClose}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>✕</Text>
        </TouchableOpacity>

        {/* Top Section */}
        <View style={{
          padding: 20,
          marginBottom: 20,
          backgroundColor: 'white',
        }}>
          {/* Title */}
          <Text style={{ 
            color: '#212B36', 
            fontWeight: '600', 
            fontSize: 18, 
            marginBottom: 6,
            textAlign: 'center'
          }}>
            Generating Lesson Plan
          </Text>

          {/* Subtitle */}
          <Text style={{ 
            color: '#637381', 
            fontFamily: 'Inter',
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: 14,
            lineHeight: 19,
            letterSpacing: -0.28,
            marginBottom: 24,
            textAlign: 'center'
          }}>
            AI is analyzing best teaching practices for your topic
          </Text>

          {/* Circular Progress - Centered */}
          <View style={{ 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              padding: 20,
              backgroundColor: 'white',
            }}>
              <View style={{ 
                width: circleSize, 
                height: circleSize,
                position: 'relative' 
              }}>
                <Svg width={circleSize} height={circleSize}>
                  {/* Define gradient */}
                  <Defs>
                    <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <Stop offset="4.62%" stopColor="#1EAFF7" />
                      <Stop offset="93.01%" stopColor="#0679B1" />
                    </LinearGradient>
                  </Defs>

                  {/* Background circle */}
                  <Circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="#E8F4FD"
                    strokeWidth={strokeWidth}
                    fill="white"
                  />
                  
                  {/* Progress circle with gradient */}
                  <Circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={[circumference, circumference]}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${circleSize / 2}, ${circleSize / 2}`}
                  />
                </Svg>
                
                {/* Percentage text overlay */}
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ 
                    color: '#1EAFF7', 
                    fontWeight: 'bold', 
                    fontSize: 24 
                  }}>
                    {Math.round(progress)}%
                  </Text>
                  <Text style={{
                    color: '#67717aff',
                    fontSize: 11,
                    marginTop: 2
                  }}>
                    Complete
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={{
          width: 327.625,
          height: 482,
          opacity: 1,
          borderRadius: 20,
          paddingTop: 24,
          paddingRight: 16,
          paddingBottom: 24,
          paddingLeft: 16,
          backgroundColor: '#FFFFFF',
          borderWidth: 3.75,
          borderColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}>
          {/* Section Title */}
          <Text style={{
            color: '#212B36',
            fontWeight: '600',
            fontSize: 16,
            marginBottom: 10,
            textAlign: 'center'
          }}>
            Crafting Your Perfect Lesson
          </Text>

          {/* Topics List */}
          <View style={{ gap: 10 }}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: clickedTopics.has(index) ? '#D4F5B8' : '#F4F6F8',
                  borderRadius: 12,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderRightWidth: 2,
                  borderBottomWidth: 3,
                  borderLeftWidth: 2,
                  borderColor: clickedTopics.has(index) ? '#7FD45A' : '#E5E7EB',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                  width: 295.625,
                  height: 48,
                  opacity: 1,
                  transform: [{ rotate: '0deg' }],
                }}
                onPress={() => handleTopicClick(index)}
                activeOpacity={0.7}
              >
                {/* Number Circle */}
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: clickedTopics.has(index) ? '#7FD45A' : '#9CA3AF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                  <Text style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 14,
                  }}>
                    {topic.number}
                  </Text>
                </View>

                {/* Topic Text */}
                <Text style={{ 
                  color: clickedTopics.has(index) ? '#5CB92B' : '#637381',
                  fontSize: 14,
                  flex: 1,
                  fontWeight: clickedTopics.has(index) ? '600' : '400',
                }}>
                  {topic.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Loader;