import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Vibration } from 'react-native'
import capitalize from '../../Utils/Capitalize'
import { useSelector } from 'react-redux';
import { getAllStudents } from '../../Services/teacherAPIV1';
import { AuthContext } from '../../Context/AuthContext';
import AssignTestDoc from '../../Images/AssignTestCard/AssignTestDoc';
import GetFontSize from '../../Commons/GetFontSize';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CrossIcon from '../../Images/Home/CrossIcon';
import ExitConfirmationPopup from '../ConfirmationPopup/ExitConfirmationPopup';

function NavHeader() {
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState([]);
  const { teacherProfile } = useContext(AuthContext);
  const [isExitPopupVisible, setIsExitPopupVisible] = useState(false);
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
    <>
      {/* Header */}
      <View className="bg-[#FFF3D6] p-5">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-[#FEE19A] rounded-lg justify-center items-center mr-3">
            <AssignTestDoc />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink"
              >
                Assign Test
              </Text>
              <TouchableOpacity

                className="w-7 h-7 bg-[#FEDB85] rounded-full justify-center items-center border-2 border-[#FDCA0C]"
                onPress={() => {
                  Vibration.vibrate(50);
                  setIsExitPopupVisible(true);
                }
                }
              >
                <CrossIcon />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] font-inter400 w-[85%]"
            >
              Boost your students's progress in just few taps!
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-6 px-6 bg-white">
        <View className="flex-row border-2 border-[#E5E5E3] rounded-xl px-4 py-3">
          <View className="w-[60%] border-r-2 border-[#E5E5E3] pr-4">
            <Text className="text-gray-500 text-xs mb-1">Selected Class</Text>
            <Text
              className="text-gray-800 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Class {selectedAssignment?.classId?.className}-{selectedAssignment?.sectionId?.sectionName} | {studentData?.length} Students
            </Text>
          </View>
          <View className="flex-[1] ml-2">
            <Text className="text-gray-500 text-xs px-2 mb-1">Subject</Text>
            <Text
              className="text-gray-800 px-2 font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {capitalize(selectedAssignment?.subjectId?.subjectName)}
            </Text>
          </View>
        </View>
      </View>

      <ExitConfirmationPopup
        visible={isExitPopupVisible}
        onClose={() => setIsExitPopupVisible(false)}
        modalType="completed"
        title="Are you sure you want to exit?"
      />
    </>

  )
}

export default NavHeader