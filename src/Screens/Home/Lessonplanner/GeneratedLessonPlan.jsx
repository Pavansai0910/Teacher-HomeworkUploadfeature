import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Folder from '../../../Images/LessonPlan/Folder';
import Download from '../../../Images/LessonPlan/Download';
import LinearGradient from 'react-native-linear-gradient';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs';
import Toast from 'react-native-toast-message'; // Ensure you have installed react-native-toast-message

const GeneratedLessonPlan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const {
    lessonPlanData,
    chapterId,
    selectedTopics,
    startDate,
    endDate,
    classDisplay,
    subjectDisplay,
  } = route.params;

  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [downloadingHomework, setDownloadingHomework] = useState([]);

  const lessonPlanDetails = lessonPlanData?.generatedContent || {};
  const topicName =
    lessonPlanData?.topic ||
    selectedTopics?.map(t => t.name || t.topicName || 'Topic').join(', ') ||
    'Topic';
  const chapterName = lessonPlanData?.chapter || 'Chapter';

  const scrollToSection = sectionName => {
    setActiveSection(sectionName);
    if (sectionName === 'sections') {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleSaveLessonPlan = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Lesson plan saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save lesson plan');
    } finally {
      setIsSaving(false);
    }
  };

  // Request storage permission (Android only)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download files',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleHomeworkDownload = async (homeworkId) => {
    setDownloadingHomework(prev => [...prev, homeworkId]);

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      setDownloadingHomework(prev => prev.filter(id => id !== homeworkId));
      return;
    }

    try {
      // Replace this with your actual API call
      const response = await downloadHomeworkExam({ homeworkId });

      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });

      const directoryPath = `${DownloadDirectoryPath}/Adaptmate Learner App`;
      const checkDirectory = await RNFS.exists(directoryPath);
      if (!checkDirectory) {
        await RNFS.mkdir(directoryPath);
      }

      const path = `${directoryPath}/Homework_${Date.now()}.pdf`;
      await RNFS.writeFile(path, base64Data, 'base64');

      Toast.show({
        type: 'success',
        text1: 'Saved in Download/Adaptmate Learner App',
      });
    } catch (error) {
      console.error("RNFS Write Error:", error);
      Toast.show({
        type: 'error',
        text1: "Download Failed",
        text2: "Could not save file. Check permissions or internal file error.",
      });
    } finally {
      setDownloadingHomework(prev => prev.filter(id => id !== homeworkId));
    }
  };

  const SectionHeader = ({ title }) => (
    <Text className="text-[16px] font-semibold text-[#212B36] mt-4">{title}</Text>
  );

  const BulletList = ({ items }) => (
    <View className="ml-0">
      {items?.map((item, index) => (
        <Text key={index} className="text-[14px] leading-6 mx-2 text-[#454F5B]">
          • {item}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#E0F5FF] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-[#212B36] font-semibold text-[18px] flex-shrink">
                Lesson Plan
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#1EAFF7] rounded-full justify-center items-center"
                onPress={() => navigation.navigate('MainTabNavigator')}
              >
                <Text className="text-white text-[14px]">✕</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#454F5B] text-[14px]">
              Generate a comprehensive lesson{'\n'} plan in seconds
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Topic Header */}
          <View className="">
            <Text className="text-[18px] font-semibold text-black mb-1">
              {topicName}
            </Text>
            <Text className="text-[14px] font-medium text-[#454F5B] mb-5">
              Chapter :- {chapterName}
            </Text>
          </View>

          {/* Save Button with Download Icon */}
          <View className="border border-[#E5E5E3] rounded-xl p-4">
            <View className="flex-row items-center ">
              <TouchableOpacity
                className="bg-[#EBF8FE] border-[#1EAFF7] py-3 px-5 rounded-xl items-center justify-center flex-row flex-1 mr-3 shadow-lg shadow-red-500/25"
                onPress={handleSaveLessonPlan}
                disabled={isSaving}
                style={{
                  borderRightWidth: 2,
                  borderLeftWidth: 2,
                  borderTopWidth: 1,
                  borderBottomWidth: 3,
                }}
              >
                {isSaving ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <Text className="text-[#1EAFF7] text-[14px] font-medium justify-center items-center">
                    Save Lesson Plan
                  </Text>
                )}
                <View className="ml-2">
                  <Folder />
                </View>
              </TouchableOpacity>

              {/* Download Icon */}
              <TouchableOpacity
                className="bg-white justify-center items-center"
                onPress={() => handleHomeworkDownload(chapterId)} 
              >
                <View
                  className="justify-center items-center rounded-lg border border-[#E1F4FE] p-3"
                  style={{
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderTopWidth: 1,
                    borderBottomWidth: 3,
                  }}
                >
                  <Download width={24} height={24} color="#1EAFF7" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Learning Objectives */}
            <SectionHeader title="Learning Objectives" />
            <BulletList items={lessonPlanDetails.learningObjectives} />

            {/* Key Terms */}
            <SectionHeader title="Key Terms" />
            <BulletList items={lessonPlanDetails.keyTerms} />

            {/* Pre-Requisites */}
            {lessonPlanDetails.preRequisite &&
              lessonPlanDetails.preRequisite.length > 0 && (
                <>
                  <SectionHeader title="Pre-Requisites" />
                  {lessonPlanDetails.preRequisite.map((prereq, index) => (
                    <View key={index} className="">
                      {prereq.priorKnowledge && (
                        <Text className="text-sm leading-6 mb-2 text-gray-700">
                          • Prior Knowledge: {prereq.priorKnowledge}
                        </Text>
                      )}
                      {prereq.warmUp && (
                        <Text className="text-sm leading-6 mb-2 text-gray-700">
                          • Warm Up: {prereq.warmUp}
                        </Text>
                      )}
                      {prereq.quickConnect && (
                        <Text className="text-sm leading-6 mb-2 text-gray-700">
                          • Quick Connect: {prereq.quickConnect}
                        </Text>
                      )}
                    </View>
                  ))}
                </>
              )}

            {/* Teaching Aids */}
            {lessonPlanDetails.teachingAids && (
              <>
                <SectionHeader title="Teaching Aids" />
                <BulletList items={lessonPlanDetails.teachingAids} />
              </>
            )}

            {/* Methodology */}
            {lessonPlanDetails.methodology && (
              <>
                <SectionHeader title="Methodology" />
                <BulletList items={lessonPlanDetails.methodology} />
              </>
            )}

            {/* Suggested Flow */}
            {lessonPlanDetails.suggestedFlow && (
              <>
                <SectionHeader title="Suggested Flow" />
                {lessonPlanDetails.suggestedFlow.map((flow, index) => (
                  <View key={index} className="mb-4">
                    <Text className="text-base font-semibold text-[#0976A9] mb-1">
                      {flow.phase} ({flow.duration})
                    </Text>
                    <Text className="text-sm text-gray-700 leading-6 ml-2">
                      {flow.description}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* Learning Flow */}
            {lessonPlanDetails.learningFlow && (
              <>
                <SectionHeader title="Learning Flow" />
                {Object.entries(lessonPlanDetails.learningFlow).map(
                  ([phase, items]) => (
                    <View key={phase} className="mb-4">
                      <Text className="text-base font-semibold text-[#212B36] mb-2 capitalize">
                        {phase}:
                      </Text>
                      <BulletList items={items} />
                    </View>
                  ),
                )}
              </>
            )}

            {/* Skills Applied */}
            {lessonPlanDetails.skillsApplied && (
              <>
                <SectionHeader title="Skills Applied" />
                <BulletList items={lessonPlanDetails.skillsApplied} />
              </>
            )}

            {/* Activity Description */}
            {lessonPlanDetails.activityDescription && (
              <>
                <SectionHeader title="Activity Description" />
                <Text className="text-sm leading-6 text-gray-700 mb-4">
                  {lessonPlanDetails.activityDescription}
                </Text>
              </>
            )}

            {/* Practice Work */}
            {lessonPlanDetails.practiceWork && (
              <>
                <SectionHeader title="Practice Work" />
                <Text className="text-sm leading-6 text-gray-700 mb-4">
                  {lessonPlanDetails.practiceWork}
                </Text>
              </>
            )}

            {/* Inquiry Questions */}
            {lessonPlanDetails.inquiryQuestions && (
              <>
                <SectionHeader title="Inquiry Questions" />
                <BulletList items={lessonPlanDetails.inquiryQuestions} />
              </>
            )}

            {/* Quick Assessments */}
            {lessonPlanDetails.quickAssessments && (
              <>
                <SectionHeader title="Quick Assessments" />
                {lessonPlanDetails.quickAssessments.map((assessment, index) => (
                  <View key={index} className="mb-3">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                      • {assessment.question}
                    </Text>
                    <Text className="text-xs text-gray-500 ml-4">
                      Cognitive Level: {assessment.cognitiveLevel}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* Teacher Tips */}
            {lessonPlanDetails.teacherTips && (
              <>
                <SectionHeader title="Teacher Tips" />
                <BulletList items={lessonPlanDetails.teacherTips} />
              </>
            )}

            {/* Learning Outcomes */}
            {lessonPlanDetails.learningOutcomes && (
              <>
                <SectionHeader title="Learning Outcomes" />
                <BulletList items={lessonPlanDetails.learningOutcomes} />
              </>
            )}

            {/* Values Inculcated */}
            {lessonPlanDetails.valuesInculcated && (
              <>
                <SectionHeader title="Values Inculcated" />
                <BulletList items={lessonPlanDetails.valuesInculcated} />
              </>
            )}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 ">
          <LinearGradient
            colors={['#9C7B5B', '#E7B686']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 24, padding: 2 }} 
          >
            <TouchableOpacity
              className="bg-white py-4 px-5 rounded-3xl items-center flex-row justify-center"
              style={{ borderLeftWidth : 2, borderRightWidth: 2, borderTopWidth: 1, borderBottomWidth: 3, borderColor: '#E7B686' }}
              onPress={() => scrollToSection('sections')}
            >
              <Text className="text-[#DC9047] text-[16px] font-bold mr-2">
                Lesson plan Sections
              </Text>
              <ScrollUpArrow Width={12} Height={12} color="#DC9047" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GeneratedLessonPlan;
