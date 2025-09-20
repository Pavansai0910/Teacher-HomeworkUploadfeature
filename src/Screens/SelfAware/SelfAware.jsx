import React, {useContext, useEffect, useState} from 'react';
import GetFontSize from '../../Commons/GetFontSize';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../Commons/Loader';
import {useNavigation} from '@react-navigation/native';
import ExamDistractionIcon from '../../Images/selfAwareIcons/ExamDistractionIcon';
import ExamStressIcon from '../../Images/selfAwareIcons/ExamStressIcon';
import LearningStyleIcon from '../../Images/selfAwareIcons/LearningStyleIcon';
import TimeManagementIcon from '../../Images/selfAwareIcons/TimeManagementIcon';
import StudyEnvironmentIcon from '../../Images/selfAwareIcons/StudyEnvironmentIcon';
import AcademicExpectaionsIcon from '../../Images/selfAwareIcons/AcademicExpectaionsIcon';
import GoalSettingIcon from '../../Images/selfAwareIcons/GoalSettingIcon';
import CriticalThinkingIcon from '../../Images/selfAwareIcons/CriticalThinkingIcon';
import StudyHabitIcon from '../../Images/selfAwareIcons/StudyHabitIcon';
import MotivationIcon from '../../Images/selfAwareIcons/MotivationIcon';
import SelfTalkIcon from '../../Images/selfAwareIcons/SelfTalkIcon';
import SelfConfidenceIcon from '../../Images/selfAwareIcons/SelfConfidenceIcon';
import SelfWorthIcon from '../../Images/selfAwareIcons/SelfWorthIcon';
import FearOfFailureIcon from '../../Images/selfAwareIcons/FearOfFailureIcon';
import WorkloadManagementIcon from '../../Images/selfAwareIcons/WorkloadManagementIcon';
import CareerExplorationIcon from '../../Images/selfAwareIcons/CareerExplorationIcon';
import SocialInclusionIcon from '../../Images/selfAwareIcons/SocialInclusionIcon';
import ParentalInvolvementIcon from '../../Images/selfAwareIcons/ParentalInvolvementIcon';
import FamilyExpectationIcon from '../../Images/selfAwareIcons/FamilyExpectaionIcon';
import ResilienceIcon from '../../Images/selfAwareIcons/ResilienceIcon';
import Toast from 'react-native-toast-message';
import GreenTick from '../../Images/ticks/GreenTick';
import { getSelfAwareExams } from '../../Services/StudentAPIV2';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
function SelfAware() {

  const navigation = useNavigation();
  const {studentProfile} = useContext(AuthContext)
  const [selfAssessmentData, setSelfAssessmentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSelfAssessment() {
      try {
        setLoading(true);

        const response = await getSelfAwareExams({
          studentId: studentProfile._id
        });
          setSelfAssessmentData(response.data.data);
      } catch (error) {
        Toast.show({
          type:'error',
          text1:`Error: ${error.message || 'Something went wrong' }`
        })
      } finally {
        setLoading(false);
      }
    }

    fetchSelfAssessment();
  }, []);

  const categories = selfAssessmentData ? Object.keys(selfAssessmentData) : [];

  const colors = [
    '#FF8584',
    '#FFA462',
    '#95B2DE',
    '#8CD5A8',
    '#4D3F7E',
    '#005792',
    '#359768',
  ];

  const selfAwareIcons = {
    'Exam Distractions': <ExamDistractionIcon />,
    'Exam Stress': <ExamStressIcon />,
    'Learning Style': <LearningStyleIcon />,
    'Time Management': <TimeManagementIcon />,
    'Study Environment': <StudyEnvironmentIcon />,
    'Academic Expectations': <AcademicExpectaionsIcon />,
    'Goal-Setting': <GoalSettingIcon />,
    'Critical Thinking': <CriticalThinkingIcon />,
    'Study Habits': <StudyHabitIcon />,
    'Motivation': <MotivationIcon />,
    'Self-Talk': <SelfTalkIcon />,
    'Self-Confidence': <SelfConfidenceIcon />,
    'Self-Worth': <SelfWorthIcon />,
    'Fear of Failure': <FearOfFailureIcon />,
    'Workload Management': <WorkloadManagementIcon />,
    'Career Exploration': <CareerExplorationIcon />,
    'Social Inclusion': <SocialInclusionIcon />,
    'Parental Involvement': <ParentalInvolvementIcon />,
    'Family Expectations': <FamilyExpectationIcon />,
    'Resilience': <ResilienceIcon />,
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="mt-[20px]">
        <Text
          style={{fontSize: GetFontSize(26)}}
          className="ml-[30px] text-[#33569F] font-poppins400 leading-tight">
          Hey {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')},
        </Text>
        <Text
          style={{fontSize: GetFontSize(26)}}
          className="ml-[30px] text-[#33569F] font-poppins700 leading-tight">
          Let's identify your
        </Text>
        <Text
          style={{fontSize: GetFontSize(26)}}
          className="ml-[30px] text-[#33569F] font-poppins700 leading-tight">
          academic challenges!
        </Text>
      </View>


      <ScrollView
      style={{height: '100%'}}
        showsVerticalScrollIndicator={false}
        className="mx-[28px] overflow-x-hidden">
        {categories.map(category => (
          <View key={category}>
            <View className="flex flex-row justify-between items-center ">
              <Text
                style={{fontSize: GetFontSize(18)}}
                className="mt-[35px] mb-[25px] font-poppins500 text-[#979797]">
                {category}
              </Text>
              <View className=" h-[2px] bg-[#999999] w-full mt-2 ml-2 opacity-20" />
            </View>

            <View className="flex flex-wrap flex-row gap-[20px]">
              {selfAssessmentData && selfAssessmentData[category].map((assessment, index) => {
                const subjectColor = colors[index % colors.length];
                return (
                  <TouchableOpacity
                    key={assessment.selfAssessmentId}
                    onPress={() => {
                      if (assessment.completed == true) {
                        navigation.navigate('SelfAwareResult', {
                          selfAssessmentId: assessment.selfAssessmentId,
                        });
                      } else {
                        navigation.navigate('SelfAssessmentTip', {
                          selfAssessmentId: assessment.selfAssessmentId,
                        });
                      }
                    }}
                    style={{backgroundColor: subjectColor}}
                    className="w-[142px] h-[142px] rounded-[16px] flex justify-between">
                      {assessment.completed == true && (
                        <View className="absolute mt-2 ml-2">
                          <GreenTick />
                        </View>
                      )}
                    <View className="flex items-end mt-4 mr-2 ">
                      {selfAwareIcons[assessment.name]}
                    </View>

                    <Text
                      style={{fontSize: GetFontSize(18)}}
                      className="font-poppins500 text-white mx-[10px] mb-[10px] leading-tight line-clamp-1">
                      {assessment?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SelfAware;
