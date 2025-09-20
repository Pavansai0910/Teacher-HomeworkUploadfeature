import React, { useContext, useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';
import SquareArrow from '../../../Images/svg/SquareArrow';
import { getStudentTasks } from '../../../Services/StudentAPIV1';
import { AuthContext } from '../../../Context/AuthContext';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
function LessonScheduleCard() {
  const { width, height } = useWindowDimensions('screen');
  const { studentProfile } = useContext(AuthContext);

  const [studentTasks, setStudentTasks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getTasks();
  }, []);
  async function getTasks() {
    try {
      const response = await getStudentTasks({
        studentId: studentProfile._id,
      });
      setStudentTasks(response.data.tasks);
    } catch (error) {
      if (error.response.status !== 404 && error.response.status !== 400) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        });
      }
    }
  }

  return (
    <View
      style={{ width: width * 0.85, height: height * 0.69 }}
      className=" bg-[#FAFAFA] rounded-[12px] shadow-xl border border-[#DDDDDD]">
      <View className="mt-[10%] mx-[8%]">
        <Text
          style={{ fontSize: GetFontSize(23) }}
          className="font-poppins600 text-black leading-tight">
          Improvement
        </Text>
        <Text
          style={{ fontSize: GetFontSize(23) }}
          className="font-poppins600 text-black leading-tight">
          Plans
        </Text>
      </View>

      {studentTasks && studentTasks.length > 0 ? (
        <View className="mt-[5%] mx-[8%] h-[50vh]">
          {studentTasks.slice(0, 3).map((task, index) => (
            <View
              key={index}
              className="mt-3 pb-3 rounded-[14px] bg-[#4473D3] inline-flex justify-center Significanceitems-center ">

              <Text
                style={{ fontSize: GetFontSize(14)}}
                numberOfLines={2}
                className="pt-3 font-inter600 mx-[15px] text-ellipsis truncate line-clamp-2 text-white tracking-[-0.55] w-[80%]">
                {task.title}
              </Text>

              <Text
                style={{ fontSize: GetFontSize(11)}}
                numberOfLines={2}
                className="mt-1 font-inter400 text-[#ACCFFF] mx-[15px]">
                {task.description}
              </Text>
            </View>
          ))}

          <View className="absolute bottom-0  min-h-[50px] h-[12%] inline-flex items-center justify-center w-full">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ImprovementPlan')
              }
              }
              className="h-full bg-[#1D5AD5] flex flex-row justify-center items-center gap-2 rounded-full">
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="font-poppins600 text-center text-white px-[28px]">
                See all plans
              </Text>
              <View className="mr-5">
                <SquareArrow width={20} height={20} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      ) : (
        <Text
          style={{ fontSize: GetFontSize(16) }}
          className="pt-40 text-center">No tasks for you</Text>
      )}
    </View>
  );
}

export default LessonScheduleCard;
