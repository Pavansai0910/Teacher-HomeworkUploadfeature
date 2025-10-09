import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import TrophyIcon from '../../../Images/StudentInsights/TrophyIcon';
import StudentIcon from '../../../Images/StudentInsights/StudentIcon';
import ChartIcon from '../../../Images/StudentInsights/ChartIcon';
import { Shadow } from 'react-native-shadow-2';
const StudentsInsightsCard = ({
  onPress,
  isActive,
  cardWidth,
  cardSpacing,
}) => {
  const scale = isActive ? 1 : 0.9;
  const { width, height } = useWindowDimensions('screen');

  return (
    <Shadow
      distance={isActive ? 12 : 0}               
      offset={[2, isActive ? 12 : 0 ]}           
      startColor={isActive ? '#BBF192' : '#00000000'}      
      radius={isActive ? 20 : 0}
      style={{ borderRadius: 50 }}
    >

      <View
        style={{
          width: width * 0.7,
          height: height * 0.55,
          transform: [{ scale }],
          marginRight: cardSpacing,
        }}
        className="rounded-3xl overflow-hidden shadow-lg"
      >
        <View
          style={{
            backgroundColor: '#A5ED6F',
            flex: 2,

          }}
          className="rounded-t-3xl justify-center items-center px-6"
        >
          <View className="items-center justify-center flex-1">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg mb-2 border-4 border-[#82E638]">
              <TrophyIcon />
            </View>

            <View className="flex-row justify-between w-60">
              <View className="w-20 h-20 bg-[#17B0F1] rounded-full items-center justify-center shadow-md border-4 border-[#82E638]">
                <StudentIcon />
              </View>
              <View className="w-20 h-20 bg-[#A56643] rounded-full items-center justify-center shadow-md border-4 border-[#82E638]">
                <ChartIcon />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white flex-1 px-6 py-6 rounded-b-3xl">
          <View className="flex-1 justify-center">
            <Text className="text-[#212B36] text-[19px] font-bold text-center mb-3">
              Test insights
            </Text>
            <Text className="text-[#454F5B] text-[13px] text-center leading-6">
              Generate comprehensive lesson plans with objectives and activities
            </Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={{
              borderTopWidth: 1,
              borderRightWidth: 2,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
            }}
            className="bg-white rounded-xl border-[#E4E4E2] shadow-sm self-center mt-4"
          >
            <Text className="text-[#82E638] text-sm font-semibold py-3 px-16 text-center">
              Test insights
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};

export default StudentsInsightsCard;
