import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import Loader from '../../Commons/Loader';
import { getStudentSubjects } from '../../Services/StudentAPIV1';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import subject icons
import BiotechnologyIcon from '../../Images/subjectIcons/BiotechnologyIcon';
import ComputerScienceIcon from '../../Images/subjectIcons/ComputerScienceIcon';
import BiologyIcon from '../../Images/subjectIcons/BiologyIcon';
import ChemistryIcon from '../../Images/subjectIcons/ChemistryIcon';
import EconomicsIcon from '../../Images/subjectIcons/EconomicsIcon';
import PhysicsIcon from '../../Images/subjectIcons/PhysicsIcon';
import HomeScienceIcon from '../../Images/subjectIcons/HomeScienceIcon';
import GeographyIcon from '../../Images/subjectIcons/GeographyIcon';
import HistoryIcon from '../../Images/subjectIcons/HistoryIcon';
import PoliticalScienceIcon from '../../Images/subjectIcons/PoliticalScienceIcon';
import BusinessStudiesIcon from '../../Images/subjectIcons/BusinessStudiesIcon';
import SociologyIcon from '../../Images/subjectIcons/SocioloyIcon';
import InformaticsPracticeIcon from '../../Images/subjectIcons/InformaticsPracticeIcon';
import AccountancyIcon from '../../Images/subjectIcons/AccountancyIcon';
import MathsIcon from '../../Images/subjectIcons/MathsIcon';
import PsychologyIcon from '../../Images/subjectIcons/PsychologyIcon';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

function Subject() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { studentProfile } = useContext(AuthContext)
  const navigation = useNavigation()
  // Define bg colors to cycle through
  const colors = [
    '#34C759',
    '#007AFF',
    '#FF9500',
    '#5856D6',
    '#E45A84',
    '#904CA7',
    '#F3825F',
    '#359768',
  ];

  // Map of subjects to their respective icons
  const subjectIcons = {
    Biotechnology: <BiotechnologyIcon />,
    'Computer Science': <ComputerScienceIcon />,
    Biology: <BiologyIcon />,
    Chemistry: <ChemistryIcon />,
    Economics: <EconomicsIcon />,
    Physics: <PhysicsIcon />,
    science: <PhysicsIcon />,
    'Home Science': <HomeScienceIcon />,
    Geography: <GeographyIcon />,
    History: <HistoryIcon />,
    'social science': <HistoryIcon />,
    Accountancy: <AccountancyIcon />,
    'Political Science': <PoliticalScienceIcon />,
    'Business Studies': <BusinessStudiesIcon />,
    Sociology: <SociologyIcon />,
    'Informatics Practice': <InformaticsPracticeIcon />,
    mathematics: <MathsIcon />,
    Psychology: <PsychologyIcon />,
    english: <PsychologyIcon />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStudentSubjects({
          studentId: studentProfile._id,
        });
        setData(response.data.subjects);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => setData([]);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-[5%]">
        <Text
          style={{ fontSize: GetFontSize(30) }}
          className="ml-[9%] text-[#33569F] font-poppins400 leading-tight">
          Let's check
        </Text>
        <Text
          style={{ fontSize: GetFontSize(30) }}
          className="ml-[9%] text-[#33569F] font-poppins700 leading-tight">
          your understanding
        </Text>
      </View>

      <ScrollView>
        <View className="ml-[9%] mr-[8%] mt-[7%] flex flex-row justify-between flex-wrap gap-5">
          {data && data.length > 0 ? (
            data.map((eachSubject, index) => {
              // Select a color from the colors array using modulus to cycle through them
              const subjectColor = colors[index % colors.length];
              const SubjectIconComponent = subjectIcons[eachSubject.subjectName] || <BusinessStudiesIcon />;

              return (
                <TouchableOpacity
                  key={eachSubject.subjectName}
                  onPress={() => {
                    // navigation.navigate('AllChapterScreen', {
                    //   subjectName: eachSubject.subjectName
                    //   .split(" ")
                    //   .map(
                    //     (word) => word.charAt(0).toUpperCase() + word.slice(1)
                    //   )
                    //   .join(" "),
                    // });
                    navigation.navigate('AllTests', {
                      subjectName: eachSubject.subjectName
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" "),
                      subjectId: eachSubject._id
                    });
                  }}
                  style={{ backgroundColor: subjectColor }}
                  className={`relative w-[142px] h-[142px] rounded-2xl flex justify-between`}>
                  <View className="flex items-end mt-4 mr-4 ">
                    {/* Render the corresponding icon or a default one */}
                    {SubjectIconComponent}                  </View>
                  <Text
                    style={{ fontSize: GetFontSize(18) }}
                    className="font-poppins500 text-[#FFFFFF] mb-[10px] mx-[6px] leading-tight truncate line-clamp-2">
                    {eachSubject.
                      subjectName
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="w-full items-center py-10">
              <Text 
              style={{ fontSize: GetFontSize(18) }}
              className="text-[#33569F]">No subjects found</Text>
            </View>
          )}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default Subject;
