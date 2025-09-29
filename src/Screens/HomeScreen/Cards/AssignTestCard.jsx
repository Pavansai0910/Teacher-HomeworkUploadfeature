import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PenIcon from '../../../Images/AssignTestCard/PenIcon';
import ParaIcon from '../../../Images/AssignTestCard/ParaIcon';

const AssignTestCard = ({ onPress, isActive, cardWidth, cardSpacing }) => {
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
          backgroundColor: '#FED570',
          flex: 2,
        }}
        className="rounded-t-3xl justify-center items-center "
      >
        <View className="justify-center items-center w-16 h-16 bg-[#DBF1FF] rounded-xl mb-16 border-4 border-[#FDCA0C] self-start ml-4">
          <ParaIcon />
        </View>

        <View className="self-end mr-4">
          <PenIcon />
        </View>
      </View>

      <View className="bg-white flex-1 px-6 py-6 justify-between rounded-b-3xl">
        <View>
          <Text className="text-gray-800 text-xl font-bold text-center mb-3">
            Assign Test
          </Text>
          <Text className="text-gray-600 text-sm text-center leading-5">
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
          <Text className="text-[#FDCA0C] text-sm font-semibold py-3 px-20 text-center">
            Assign Test
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssignTestCard;
