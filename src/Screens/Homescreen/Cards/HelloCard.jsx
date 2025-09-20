import React, {useContext} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {AuthContext} from '../../../Context/AuthContext';
import GetFontSize from '../../../Commons/GetFontSize';
import SlideHandIcon from '../../../Images/svg/SlideHandIcon';
function HelloCard() {
  const {studentProfile} = useContext(AuthContext);
  const {width, height} = useWindowDimensions('screen');
  return (
    <View
      style={{width: width * 0.85, height: height * 0.71}}
      className="bg-[#FFFFFF] pl-[21px] inline-flex justify-center">
      <View className="mt-[50%]">
        <Text
          style={{fontSize: GetFontSize(18)}}
          className=" text-[#4C4848] font-inter600 ">
          Hi,{' '}
          {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Text>
        <Text
          style={{fontSize: GetFontSize(23)}}
          className="text-[#33569F] font-poppins600 pt-[14px] leading-tight">
          Learn something {"\n"}
          new today
        </Text>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="text-[#979797] pt-[14px] font-poppins500 leading-snug">
          Start your study session {"\n"} 
          with a positive thought; {"\n"} 
          mindset shapes your {"\n"}
          productivity.
        </Text>
      </View>

      <View className="absolute bottom-[-10] right-2">
        <SlideHandIcon />
      </View>
    </View>
  );
}
export default HelloCard;
