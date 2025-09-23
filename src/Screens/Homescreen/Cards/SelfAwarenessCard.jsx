import React, { useContext, useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, Touchable } from 'react-native';
import SemiCircleProgress from '../../ProgressBars/SemiCircularProgressBar';
import GetFontSize from '../../../Commons/GetFontSize';
import SquareArrow from '../../../Images/svg/SquareArrow';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getSelfAwarePercentage } from '../../../Services/StudentAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
function SelfAwarenessCard() {
  const navigation = useNavigation()
  const [data, setData] = useState(null);
  const [remainData, setRemainData] = useState(null);
  const { studentProfile } = useContext(AuthContext)

  async function fetchData() {
    try {
      const response = await
        getSelfAwarePercentage({
          studentId: studentProfile._id
        });
      setData(response.data.selfAwarePercentage);
      const remainData = 100 - parseInt(response.data.selfAwarePercentage)
      setRemainData(remainData);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Error: ${error.message || 'Something went wrong'}`
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{ width: width * 0.85, height: height * 0.69 }}
      className=" bg-[#33569F] rounded-[12px] shadow-xl">
      <View className="mt-[10%] mx-[8%]">

        <View className='flex flex-row items-center'>
          <Text
            style={{ fontSize: GetFontSize(22) }}
            className=" text-[#77A3FF] font-poppins400 leading-tight ">
            You are just {''} 
          </Text>
          <Text
            style={{ fontSize: GetFontSize(22) }}

            className="text-[#F5F5F5] font-poppins700 leading-tight">{parseInt(remainData) || 0}% </Text>
         <Text
          style={{ fontSize: GetFontSize(22) }}
          className=" text-[#77A3FF] font-poppins400 leading-tight">
          more 
        </Text>
        </View>
        <Text
          style={{ fontSize: GetFontSize(22) }}
          className=" text-[#77A3FF] font-poppins400 leading-tight">
           to complete
        </Text>
        {/* <Text
          style={{ fontSize: GetFontSize(22) }}
          className=" text-[#77A3FF] font-poppins400 leading-tight">
          today!
        </Text> */}
      </View>

      <View className="mt-[12%]">

        <SemiCircleProgress
          percentage={parseFloat(data) || 0}
          width={width * 0.6}      // 60% of screen width
          strokeWidth={25}
          color="#E34F57"
          backgroundColor="#F4F6F8"

        />

      </View>
      <View className="mt-[10%] flex flex-row justify-between mx-[12%]">
        <Text
          style={{ fontSize: GetFontSize(12) }}
          className="text-[#ACCFFF] font-inter400  tracking-[-0.55] ">
          Featured for you
        </Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("SelfAware")}
        >
        <Text
          style={{ fontSize: GetFontSize(10) }}
          className="text-[#ACCFFF] font-inter400  tracking-[-0.55] ">
          See all
        </Text>
            </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("SelfAware")}
        className="mt-[4px] bg-[#4473D3] h-[13%] mx-[12%] rounded-[14px]">

        <View className='absolute right-2 top-2'>
          <SquareArrow />
        </View>
        <Text
          style={{ fontSize: GetFontSize(15) }}
          className="text-white font-inter600 mx-[15px] mt-[12px] leading-tight  tracking-[-0.55]">
          Exam Stress
        </Text>
        <Text
          style={{ fontSize: GetFontSize(11) }}
          className="text-[#ACCFFF] font-inter400 mt-1 mx-[15px] w-[75%] leading-tight tracking-[-0.55]">
          Recognize stress signs during exam time.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SelfAware")}
        className="mt-2 bg-[#4473D3] h-[13%] mx-[12%] rounded-[14px]">

        <View className='absolute right-2 top-2'>
          <SquareArrow />
        </View>
        <Text
          style={{ fontSize: GetFontSize(15) }}
          className="text-white font-inter600 mx-[15px] mt-[12px] leading-tight tracking-[-0.55]">
          Time Management
        </Text>
        <Text
          style={{ fontSize: GetFontSize(11) }}
          className="text-[#ACCFFF] font-inter400 mt-1 mx-[15px] w-[75%] leading-tight tracking-[-0.55]">
          Recognize your distractions and time-wasters.
        </Text>
      </TouchableOpacity>

    </View>
  );
}

export default SelfAwarenessCard;
