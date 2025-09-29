import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TrophyIcon from '../../../Images/StudentInsights/TrophyIcon';
import StudentIcon from '../../../Images/StudentInsights/StudentIcon';
import ChartIcon from '../../../Images/StudentInsights/ChartIcon';

const StudentsInsightsCard = ({
  onPress,
  isActive,
  cardWidth,
  cardSpacing,
}) => {
  const cardHeight = isActive ? 432 : 380;
  const scale = isActive ? 1 : 0.9;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
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
            Student insights
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentsInsightsCard;
