import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import capitalize from '../../../Utils/Capitalize';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../Context/AuthContext';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import GetFontSize from '../../../Commons/GetFontSize';
import { getAllStudents } from '../../../Services/teacherAPIV1'
import CrossIcon from '../../../Images/Home/CrossIcon';

const LearningNavbar = ({ classDisplay, subjectDisplay }) => {
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState([]);
  const { teacherProfile } = useContext(AuthContext);
  const selectedAssignment = useSelector(
    (state) => state.assignment.selectedAssignment
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setStudentData([]);
        const response = await getAllStudents({
          sectionId: selectedAssignment?.sectionId?._id,
          classId: selectedAssignment?.classId?._id,
          schoolId: teacherProfile?.schoolId._id,
          subjectId: selectedAssignment?.subjectId?._id,
        });
        setStudentData(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [selectedAssignment]);

  return (
    <View>
      {/* Header */}
      <View className="bg-[#E8FADB] p-5">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <SkullIcon />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink"
              >
                Test Insights
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#A5ED6F] rounded-full border border-[#77E425] justify-center items-center"
                onPress={() => {
                  Vibration.vibrate(50);
                  navigation.navigate('MainTabNavigator')
                }
                }
              >
                {/* <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-white "
                >
                  ✕
                </Text> */}
                <CrossIcon />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] font-inter400 w-[85%]"
            >
              Boost your student's progress in just a few taps!
            </Text>
          </View>
        </View>
      </View>

      {/* Class & Subject */}
      <View className="mt-6 px-6 bg-white">
        <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
          <View className="">
            <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Class {selectedAssignment?.classId?.className}-{selectedAssignment?.sectionId?.sectionName} | {studentData?.length} Students
            </Text>
          </View>
          {/* <View className="flex-[1] ml-2">
            <Text className="text-gray-500 text-xs mb-1">Subject</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {capitalize(selectedAssignment?.subjectId?.subjectName)}
            </Text>
          </View> */}
        </View>
      </View>

           <View className="mt-3 px-6 bg-white">
        <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
          {/* <View className="w-[60%] border-r-2 border-[#E5E5E3] pr-4">
            <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Class {selectedAssignment?.classId?.className}-{selectedAssignment?.sectionId?.sectionName} | {studentData?.length} Students
            </Text>
          </View> */}
          <View className="flex-[1] ml-2">
            <Text className="text-gray-500 text-xs mb-1">Subject</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {capitalize(selectedAssignment?.subjectId?.subjectName)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LearningNavbar;
