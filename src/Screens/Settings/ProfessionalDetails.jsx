import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Vibration, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import capitalize from '../../Utils/Capitalize';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import Buildingicon from '../../Images/Settings/Buildingicon';
import { getTeacherClasses } from '../../Services/teacherAPIV1';


function ProfessionalDetails() {
  const navigation = useNavigation();
  const { teacherProfile } = useContext(AuthContext);

  const screenHeight = Dimensions.get('window').height;
  const headerHeight = (screenHeight * 8.61) / 100;

  const teacher = teacherProfile || {};

  // API data
  const [classesData, setClassesData] = useState({ subjects: [], classes: [] });
  const [loading, setLoading] = useState(true);

  // Fetch teacher classes
  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        const teacherId = teacher._id || teacher.id;

        if (!teacherId) {
          console.error('Teacher ID missing', teacher);
          setLoading(false);
          return;
        }

        const response = await getTeacherClasses({ teacherId });
        const assignments = response.data?.assignments || [];

        const subjectsList = assignments.map(item => item?.subjectId?.subjectName);
        const classesList = assignments.map(item => {
          const className = item?.classId?.className;
          const sectionName = item?.sectionId?.sectionName;
          return `${className}-${sectionName}`;
        });

        setClassesData({
          subjects: [...new Set(subjectsList)],
          classes: [...new Set(classesList)]
        });

      } catch (error) {
        console.error('Error fetching teacher classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherClasses();
  }, [teacher._id, teacher.id]);

  const subjects = classesData.subjects;
  const classes = classesData.classes;

  const getFullName = () => {
    if (teacher.name) return teacher.name;
    return '';
  };

  const getInitials = () => {
    const fullName = getFullName();
    if (!fullName) return '';

    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const handleBack = () => navigation.goBack();

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View style={{ height: headerHeight }} className="bg-[#F7EBFF] justify-end px-4">
        <View className="flex-row items-center justify-start">
          <View className="flex-row items-center h-20 ml-5">
            <View style={{ transform: [{ scale: 1.40 }] }}>
              <Buildingicon />
            </View>
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="text-[#212B36] font-inter600 flex-shrink ml-4"
            >
              Professional Details
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-5 pt-6">

        {/* Profile */}
        <View className="bg-white rounded-2xl border border-[#E5E5E5] p-4 mb-4">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-[#C366FF] justify-center items-center mr-3">
              <Text style={{ fontSize: GetFontSize(16) }} className="text-white font-inter600">
                {getInitials()}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: GetFontSize(16) }} className="text-[#212B36] font-inter600 mb-1">
               {capitalize(getFullName())}
              </Text>
              <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] font-inter400">
                {teacher.email || ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Subjects */}
        <View className="bg-white rounded-2xl border border-[#E5E5E5] p-4 mb-4">
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#212B36] font-inter600 mb-3">
            Subjects
          </Text>

          {loading ? (
            <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] mb-3">
              Loading...
            </Text>
          ) : (
            <View className="flex-row flex-wrap mb-3">
              {subjects.map((subject, index) => (
                <View
                  key={index}
                  className="border border-[#DFE3E8] rounded-[20px] px-4 py-2 mr-2 mb-2"
                >
                  <Text style={{ fontSize: GetFontSize(12) }} className="text-[#454F5B] font-inter500">
                     {capitalize(subject)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Classes */}
        <View className="bg-white rounded-2xl border border-[#E5E5E5] p-4 mb-4">
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#212B36] font-inter600 mb-3">
            Classes & Sections
          </Text>

          {loading ? (
            <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] mb-3">
              Loading...
            </Text>
          ) : (
            <View className="flex-row flex-wrap mb-3">
              {classes.map((classItem, index) => (
                <View
                  key={index}
                  className="border border-[#DFE3E8] rounded-[20px] px-4 py-2 mr-2 mb-2"
                >
                  <Text style={{ fontSize: GetFontSize(12) }} className="text-[#454F5B] font-inter500">
                    {classItem}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Back Button */}
      <View className="bg-white border-t border-[#E5E5E5] px-5 py-4">
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);
            handleBack();
          }}
          style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 4,
            borderLeftWidth: 2.5,
            borderColor: '#DFE3E8',
            alignSelf: 'flex-start',
          }}
          className="bg-white rounded-[12px] px-5 py-3"
        >
          <Text style={{ fontSize: GetFontSize(16) }} className="text-[#AF33FF] font-inter600">
            ← back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfessionalDetails;
