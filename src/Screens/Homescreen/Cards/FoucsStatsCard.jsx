import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import SquareArrow from '../../../Images/svg/SquareArrow';
import StrengthAndWeaknessProgressBar from '../../ProgressBars/ThreeCircularProgressBar';
import { focusZone } from '../../ProgressBars/ThreeCircularProgressBar';
import { useNavigation } from '@react-navigation/native';
function FoucsStatsCard() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
    const progressBarWidth = width > 500 ? width * 0.4 : width * 0.5;

  return (
    <View
      style={{ width: width * 0.85, height: height * 0.69 }}
      className=" bg-[#FAFAFA] rounded-[12px] shadow-xl border border-[#DDDDDD]">

      <View className="mt-[10%] flex items-center">

        <View className='flex flex-row'>
          <Text
            style={{ fontSize: GetFontSize(23) }}
            className="text-[#FF0000] font-poppins700 leading-snug">{focusZone} </Text>
          <Text
            style={{ fontSize: GetFontSize(23) }}
            className="text-center text-black font-poppins500 leading-snug">focus areas</Text>
        </View>

        <Text
          style={{ fontSize: GetFontSize(23) }}
          className="text-black font-poppins500 leading-snug">
          have been identified
        </Text>
      </View>

      <View
        className="flex justify-center items-center">
        <StrengthAndWeaknessProgressBar width={progressBarWidth} />
      </View>


      <View className="mt-[10%] h-[9%] flex items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('SubjectWiseProgress')

          }
          className="h-full bg-[#1D5AD5] flex flex-row justify-between items-center gap-2 rounded-full ">
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className="font-poppins600 text-center text-white px-[30px]">
            See details
          </Text>
          <View className="mr-5">
            <SquareArrow width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FoucsStatsCard;
