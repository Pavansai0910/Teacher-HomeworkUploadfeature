import React, {useState, useEffect, useContext} from 'react'
import { View, Text } from 'react-native'
import capitalizeSubject from '../../Utils/CapitalizeSubject'
import { useSelector } from 'react-redux';
import { getAllStudents } from '../../Services/teacherAPIV1';
import { AuthContext } from '../../Context/AuthContext';
function NavHeader() {
    const [studentData, setStudentData] = useState([]);
    const {teacherProfile} = useContext(AuthContext);
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

    return(
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
               <Text className="text-gray-500 text-xs mb-1">Subject</Text>
               <Text
                 className="text-gray-800 font-semibold"
                 numberOfLines={1}
                 ellipsizeMode="tail"
               >
                 {capitalizeSubject(selectedAssignment?.subjectId?.subjectName)}
               </Text>
             </View>
           </View>
         </View>
    
        
    )
}

export default NavHeader