import React, {useState, useEffect, useContext} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import SquareArrow from '../../../Images/svg/SquareArrow';
import {getLgaScore, unattemptedExam} from '../../../Services/StudentAPIV1';
import {AuthContext} from '../../../Context/AuthContext';
import Toast from 'react-native-toast-message';
function SyllabusCard() {
  const {width, height} = useWindowDimensions('screen');
  const [lgaScore, setLgaScore] = useState(0);
  const [lastAttemptedTest, setLastAttemptedTest] = useState('');
  const {studentProfile} = useContext(AuthContext);

  useEffect(() => {
    fetchLgaScore();
    fetchAttemptedExam();
  }, []);
  // egData

  // const data = {
    // "lastAttemptedExamTitle": "Citizen Duties in Urban Governance (e.g. waste safety)",
    // "subjectName": "Economics",
// } 

  async function fetchLgaScore() {
    try {
      const response = await getLgaScore({
        studentId: studentProfile._id,
      });
      setLgaScore(response.data.totalAcademicTests);
    } catch (error) {
      if (response.status !== 404 && response.status !== 400) {
        Toast.show({
          type: 'error',
          text1: 'Unable to get LGA Score',
        });
      }
    }
  }

  async function fetchAttemptedExam() {
    try {
      const response = await unattemptedExam({
        studentId: studentProfile._id,
      });
      setLastAttemptedTest(response.data);
      } catch (error) {
      if (response.status !== 404 && response.status !== 400) {
        Toast.show({
          type: 'error',
          text1: 'Unable to get LGA Score',
        });
      }
    }
  }

  return (
    <View
      style={{width: width * 0.85, height: height * 0.69}}
      className=" bg-[#33569F] rounded-[12px] shadow-xl">
        <View className='mx-[10%]'>
      <View className="mt-[10%] md:h-auto flex flex-row items-baseline ">
        <Text
          style={{fontSize: GetFontSize(96)}}
          className=" text-[#ECEAEA] font-inter600 leading-none ">
          {lgaScore}
        </Text>
      </View>

      <Text
        style={{fontSize: GetFontSize(17)}}
        className="font-inter500 text-[#ECEAEA]">
        Learning objective achieved
      </Text>

      <Text
        style={{fontSize: GetFontSize(13)}}
        className="mt-[15%] text-[#77A3FF] font-inter400 tracking-[-0.55]">
        Last attempted test
      </Text>

      <View className="mt-2 h-[25%] bg-[#4473D3] rounded-md">
        {/* <View className="absolute right-2 top-2">
          <SquareArrow />
        </View> */}

        <Text
        style={{fontSize: GetFontSize(12)}}
        className="mx-[10px] mt-[10px] text-[#ECEAEA] font-inter400 tracking-[-0.55]">
          {lastAttemptedTest?.subjectName}
        </Text>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{fontSize: GetFontSize(14)}}
          className="mx-[10px] w-[80%] mt-[2px] text-[#ECEAEA] font-inter600 tracking-[-0.55] ">
          {lastAttemptedTest?.lastAttemptedExamTitle}
          </Text>
       
      </View>
    </View>
          </View>
  );
}

export default SyllabusCard;
