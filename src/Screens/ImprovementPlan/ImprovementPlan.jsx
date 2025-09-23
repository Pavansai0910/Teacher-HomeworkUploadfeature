import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';
import { getStudentTasks } from '../../Services/StudentAPIV1';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../../Commons/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImprovementPlan() {

  const { studentProfile } = useContext(AuthContext);

  const navigation = useNavigation()
  const formatDate = isoDate => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [studentTasks, setStudentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const response = await getStudentTasks({
        studentId: studentProfile._id,
      });
      setStudentTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      if (error.response.status !== 404 && error.response.status !== 400) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-[20px]">
        <View className="flex flex-row justify-start items-center">
          <TouchableOpacity
            className="ml-4 flex flex-row justify-center items-center "
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="ml-3 font-poppins600 text-[#33569F]">
              Improvement plans
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

      <Text
        style={{ fontSize: GetFontSize(14) }}
        className="mt-[18px] ml-[25px] font-poppins400">To do - tasks</Text>

      {studentTasks && studentTasks?.length > 0 ? (
        <View className="mt-[5%] px-[6%] w-full h-[70vh]">
          <ScrollView showsVerticalScrollIndicator={false}>
            {studentTasks &&
              studentTasks.map((task, index) => (
                // Corrected View component for each task
                <View key={index} className="overflow-hidden bg-[#4473D3] rounded-[14px] pb-4 mb-4">
                  <View className="mt-5 ml-5 mr-7">
                    <View className="flex flex-row items-center justify-between">
                      <View>
                        <Text
                          style={{ fontSize: GetFontSize(13) }}
                          className="font-inter600 line-clamp-1 text-white">
                          {task.title}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{ fontSize: GetFontSize(11) }}
                      className="mt-2 font-inter400 text-[#ACCFFF]">
                      {task.description}
                    </Text>

                    <View className="mt-1 flex flex-row justify-between border border-[#4473D3]">
                      <Text
                        style={{ fontSize: GetFontSize(9) }}
                        className="font-poppins400 text-white">
                        Deadline
                      </Text>
                      <Text
                        style={{ fontSize: GetFontSize(9) }}
                        className="font-inter400 text-white">
                        {formatDate(task.dueDate)}
                      </Text>
                    </View>
                  </View>
                </View>

              ))}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text
            fontSize={GetFontSize(15)}
            className='font-inter500 text-center py-10 text-[#33569F]'>
            No tasks for you
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
