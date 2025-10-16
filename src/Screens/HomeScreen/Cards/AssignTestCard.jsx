import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Vibration } from 'react-native';
import PenIcon from '../../../Images/AssignTestCard/PenIcon';
import ParaIcon from '../../../Images/AssignTestCard/ParaIcon';
import GetFontSize from '../../../Commons/GetFontSize';
import { Shadow } from 'react-native-shadow-2';
const AssignTestCard = ({ onPress, isActive, cardWidth, cardSpacing }) => {
  const scale = isActive ? 1 : 0.9;
  const { width, height } = useWindowDimensions('screen');

  return (
    <Shadow
      distance={isActive ? 12 : 0}
      offset={[2, isActive ? 12 : 0]}
      startColor={isActive ? '#FEDB85' : '#00000000'}
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
        className="rounded-3xl overflow-hidden"
      >
        <View
          style={{
            backgroundColor: '#FED570',
            flex: 1.5,
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

        <View className="bg-white flex-1 px-6 py-6 rounded-b-3xl">
          <View className="flex-1 justify-center">
            <Text style={{ fontSize: GetFontSize(19) }}
              className="text-[#212B36] font-inter600 text-center mb-3">
              Assign Test
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                letterSpacing: 0.15,
                lineHeight: GetFontSize(13) * 1.5, 
              }}
              className="text-[#454F5B] font-normal text-[13px] text-center"
            >
              Generate comprehensive lesson plans with objectives and activities
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              onPress()
            }
            }
            style={{
              borderTopWidth: 1,
              borderRightWidth: 2,
              borderBottomWidth: 4,
              borderLeftWidth: 2,
            }}
            className="bg-white rounded-xl border-[#E4E4E2] shadow-sm self-center mt-4"
          >
            <Text style={{ fontSize: GetFontSize(14) }}
              className="text-[#FEC434] font-inter700 py-3 px-16 text-center">
              Assign Test
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};

export default AssignTestCard;
