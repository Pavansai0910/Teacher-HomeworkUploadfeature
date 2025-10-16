import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Folder from '../../../Images/LessonPlan/Folder';
import Download from '../../../Images/LessonPlan/Download';
import LinearGradient from 'react-native-linear-gradient';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs';
import GetFontSize from '../../../Commons/GetFontSize';
import { downloadLessonPlan, saveLessonPlan } from '../../../Services/teacherAPIV2';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../../Context/AuthContext';
import { requestStoragePermission } from '../../../Permission/StoragePermission';

const GeneratedLessonPlan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const { teacherProfile } = useContext(AuthContext);
  const sectionRefs = useRef({});
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = Dimensions.get('window');

  const lessonPlanner = useSelector(
    state => state.lessonPlanner?.lessonPlannerData,
  );

  const {
    lessonPlanData,
    selectedTopics,
  } = route.params;

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [isSavedClicked, setIsSavedClicked] = useState(false);
  const [generatedLessonPlanId, setGeneratedLessonPlanId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const lessonPlanDetails = lessonPlanData?.generatedContent || {};
  const topicName =
    lessonPlanData?.topic ||
    selectedTopics?.map(t => t.name || t.topicName || 'Topic').join(', ') ||
    lessonPlanner?.topicNames?.join(', ') ||
    'Topic';
  const chapterName = lessonPlanData?.chapter || lessonPlanner?.chapter || 'Chapter';

  const getAvailableSections = () => {
    const availableSections = [];

    if (lessonPlanDetails.learningObjectives) availableSections.push('Learning Objectives');
    if (lessonPlanDetails.keyTerms) availableSections.push('Key Terms');
    if (lessonPlanDetails.preRequisite) availableSections.push('Pre-Requisites');
    if (lessonPlanDetails.teachingAids) availableSections.push('Teaching Aids');
    if (lessonPlanDetails.methodology) availableSections.push('Methodology');
    if (lessonPlanDetails.suggestedFlow) availableSections.push('Suggested Flow');
    if (lessonPlanDetails.learningFlow) availableSections.push('Learning Flow');
    if (lessonPlanDetails.skillsApplied) availableSections.push('Skills Applied');
    if (lessonPlanDetails.activityDescription) availableSections.push('Activity Description');
    if (lessonPlanDetails.practiceWork) availableSections.push('Practice Work');
    if (lessonPlanDetails.inquiryQuestions) availableSections.push('Inquiry Questions');
    if (lessonPlanDetails.quickAssessments) availableSections.push('Quick Assessments');
    if (lessonPlanDetails.teacherTips) availableSections.push('Teacher Tips');
    if (lessonPlanDetails.learningOutcomes) availableSections.push('Learning Outcomes');
    if (lessonPlanDetails.valuesInculcated) availableSections.push('Values Inculcated');

    return availableSections;
  };

  const ButtonsOptions = getAvailableSections();

  useEffect(() => {
    if (selectedSection && ButtonsOptions.length > 0 && !ButtonsOptions.includes(selectedSection)) {
      setSelectedSection(ButtonsOptions[0]);
    }
  }, [ButtonsOptions]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedSection(null);
      setIsDropdownOpen(false);
      dropdownAnimation.setValue(0);
    });

    return unsubscribe;
  }, [navigation]);

  const toggleDropdown = () => {
    Vibration.vibrate(50);
    const toValue = isDropdownOpen ? 0 : 1;
    setIsDropdownOpen(!isDropdownOpen);

    Animated.spring(dropdownAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const scrollToSpecificSection = useCallback((sectionName) => {
    const sectionRef = sectionRefs.current[sectionName];
    if (!sectionRef || !scrollViewRef.current) {
      console.warn(`Ref not found for section: ${sectionName}`);
      return;
    }
    sectionRef.measure((x, y, width, height, pageX, pageY) => {
      if (scrollViewRef.current && pageY !== undefined) {
        const offsetY = Math.max(0, pageY - 100);
        scrollViewRef.current.scrollTo({
          y: offsetY,
          animated: true
        });
      }
    });
  }, []);

  const selectSection = useCallback((section) => {
    setSelectedSection(section);
    setIsDropdownOpen(false);

    Animated.spring(dropdownAnimation, {
      toValue: 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start((finished) => {
      if (finished) {
        scrollToSpecificSection(section);
      }
    });
  }, [scrollToSpecificSection]);

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(350, screenHeight * 0.4)],
  });

  const rotateIcon = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleSaveDoc = async () => {
    Vibration.vibrate(50);

    if (isSaved) {
      Toast.show({
        type: 'info',
        text1: 'Already Saved',
        text2: 'This lesson plan has already been saved!',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    setIsSaving(true);
    try {
      const boardId = teacherProfile?.schoolId?.boardId;
      const payload = {
        ...lessonPlanner,
        boardId,
      };
      const response = await saveLessonPlan(payload);

      // Mark as saved on success
      setIsSaved(true);
      Toast.show({
        type: 'success',
        text1: response.data.message || 'Lesson Plan Saved Successfully!',
        visibilityTime: 3000,
      });
      setIsSavedClicked(true);
      setGeneratedLessonPlanId(response.data?.savedPlan._id);
    } catch (error) {

      // Handle 409 conflict (already exists)
      if (error.response?.status === 409) {
        setIsSaved(true); // Mark as saved since it exists on server
        Toast.show({
          type: 'info',
          text1: 'Already Saved',
          visibilityTime: 3000,
        });
      } else {
        // Handle other errors
        const errorMessage = error.response?.data?.message || 'Unable to save lesson plan. Please try again.';
        Toast.show({
          type: 'error',
          text1: 'Save Failed',
          text2: errorMessage,
          visibilityTime: 4000,
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handle download
  const handleLessonPlanDownload = async (generatedLessonPlanId) => {

    if (!isSavedClicked) {
      return Toast.show({
        type: 'info',
        text1: 'First Save Lesson Plan then you can download it.',
        visibilityTime: 3000,
      });
    }

    // 1. Permission Check
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }

    setDownloadStatus(true);
    try {
      const response = await downloadLessonPlan({ _id: generatedLessonPlanId });

      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });

      const directoryPath = `${DownloadDirectoryPath}/Adaptmate Educator App/Lesson Plan`;
      const checkDirectory = await RNFS.exists(directoryPath);
      if (!checkDirectory) {
        await RNFS.mkdir(directoryPath);
      }

      const path = `${directoryPath}/Lesson Plan_${Date.now()}.pdf`;
      await RNFS.writeFile(path, base64Data, 'base64');

      Alert.alert('Lesson Plan Downloaded Successfully', 'Saved in Downloads/Adaptmate Educator App/Lesson Plan');
      setDownloadStatus(false);
    } catch (error) {
      setDownloadStatus(false);
      Toast.show({
        type: 'error',
        text1: "Download Failed",
        text2: "Could not save file. Check permissions or internal file error.",
      });
    } finally {
      setDownloadStatus(false);
    }
  };

  const SectionHeader = ({ title, sectionKey }) => (
    <View
      ref={(ref) => {
        if (ref) {
          sectionRefs.current[sectionKey] = ref;
        }
      }}
      style={{ marginTop: 16, marginBottom: 8 }}
    >
      <Text style={{ fontSize: GetFontSize(16) }}
        className="font-inter500 text-[#212B36]">
        {title}
      </Text>
    </View>
  );

  const BulletList = ({ items }) => (
    <View className="ml-0">
      {items?.map((item, index) => (
        <Text style={{ fontSize: GetFontSize(14) }}
          key={index} className="leading-6 mx-2 text-[#454F5B]">
          • {item}
        </Text>
      ))}
    </View>
  );

  if (!lessonPlanData?.generatedContent) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text style={{ fontSize: GetFontSize(16) }} className="text-[#454F5B] text-center">
          No lesson plan data found.{'\n'}
          <Text style={{ fontSize: GetFontSize(15) }} className="text-[#1A9DDD]" onPress={() => {
            Vibration.vibrate(50);  
            navigation.goBack()
          }}>
            Go back
          </Text>
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#E0F5FF] px-6 py-6">
        <View className="flex-row items-center">
          <View className="w-[54px] h-10 rounded-xl mr-3 justify-center items-center">
            <Bluepage />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                style={{ fontSize: GetFontSize(18) }}
                className="text-[#212B36] font-inter600 flex-shrink"
              >
                Lesson Plan
              </Text>
              <TouchableOpacity
                className="w-6 h-6 bg-[#1EAFF7] rounded-full justify-center items-center"
                onPress={() => {
                  Vibration.vibrate(50);

                  navigation.navigate('MainTabNavigator')
                }
                }
              >
                <Text
                  style={{ fontSize: GetFontSize(14) }}
                  className="text-white "
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="text-[#454F5B] "
            >
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
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className=" font-inter600 text-[#212B36] mb-1"
            >
              {topicName}
            </Text>
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className=" font-inter400 text-[#454F5B] mb-5"
            >
              Chapter :- {chapterName}
            </Text>
          </View>

          {/* Save Button with Download Icon */}
          <View className="border border-[#E5E5E3] rounded-xl p-4">
            <View className="flex-row items-center ">
              <TouchableOpacity
                className={`bg-[#EBF8FE] border-[#1EAFF7] py-3 px-5 rounded-xl border-t-[1.5px] border-x-2 border-b-4 items-center justify-center flex-row flex-1 mr-3  ${isSaved ? 'opacity-75' : ''
                  }`}
                onPress={handleSaveDoc}
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
                    color="#1EAFF7"
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <Text
                    style={{ fontSize: GetFontSize(14) }}
                    className="text-[#1EAFF7] font-inter500 justify-center items-center"
                  >
                    {isSaved ? 'Saved ✓' : 'Save Lesson Plan'}
                  </Text>
                )}
                <View className="ml-2">
                  <Folder />
                </View>
              </TouchableOpacity>

              {/* Download Icon */}
              <TouchableOpacity
                className="bg-white justify-center items-center"
                onPress={() => {
                  Vibration.vibrate(50);

                  handleLessonPlanDownload(generatedLessonPlanId)
                }
                }>
                <View
                  className="justify-center items-center rounded-xl border border-[#E1F4FE] p-3"
                  style={{
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderTopWidth: 1,
                    borderBottomWidth: 3,
                  }}
                >
                  {downloadStatus ? (
                    <ActivityIndicator size="small" color="#1EAFF7" />
                  ) : (
                    <Download width={24} height={24} color="#1EAFF7" />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            {/* Learning Objectives */}
            <SectionHeader title="Learning Objectives" sectionKey="Learning Objectives" />
            <BulletList items={lessonPlanDetails.learningObjectives} />

            {/* Key Terms */}
            <SectionHeader title="Key Terms" sectionKey="Key Terms" />
            <BulletList items={lessonPlanDetails.keyTerms} />

            {/* Pre-Requisites */}
            {lessonPlanDetails.preRequisite &&
              lessonPlanDetails.preRequisite.length > 0 && (
                <>
                  <SectionHeader title="Pre-Requisites" sectionKey="Pre-Requisites" />
                  {lessonPlanDetails.preRequisite.map((prereq, index) => (
                    <View key={index} className="">
                      {prereq.priorKnowledge && (
                        <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 leading-6 mb-2 text-[#454F5B]">
                          • Prior Knowledge:{' '}
                          <Text style={{ fontSize: GetFontSize(13)}}
                            className="text-[#454F5B]">
                            {prereq.priorKnowledge}
                          </Text>
                        </Text>
                      )}
                      {prereq.warmUp && (
                        <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 leading-6 mb-2 text-[#454F5B]">
                          • Warm Up: 
                          <Text style={{ fontSize: GetFontSize(13)}}
                            className="text-[#454F5B]">
                            {prereq.warmUp}
                          </Text>
                        </Text>
                      )}
                      {prereq.quickConnect && (
                        <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 leading-6 text-[#454F5B]">
                          • Quick Connect: 
                          <Text style={{ fontSize: GetFontSize(13)}}
                            className="text-[#454F5B]">
                            {prereq.quickConnect}
                          </Text>
                        </Text>
                      )}
                    </View>
                  ))}
                </>
              )}

            {/* Teaching Aids */}
            {lessonPlanDetails.teachingAids && (
              <>
                <SectionHeader title="Teaching Aids" sectionKey="Teaching Aids" />
                <BulletList items={lessonPlanDetails.teachingAids} />
              </>
            )}

            {/* Methodology */}
            {lessonPlanDetails.methodology && (
              <>
                <SectionHeader title="Methodology" sectionKey="Methodology" />
                <BulletList items={lessonPlanDetails.methodology} />
              </>
            )}

            {/* Suggested Flow */}
            {lessonPlanDetails.suggestedFlow && (
              <>
                <SectionHeader title="Suggested Flow" sectionKey="Suggested Flow" />
                {lessonPlanDetails.suggestedFlow.map((flow, index) => (
                  <View key={index} className="mb-4">
                    <Text style={{ fontSize: GetFontSize(16) }} className="text-base font-inter600 text-[#454F5B] mb-1">
                      {flow.phase} ({flow.duration})
                    </Text>
                    <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 text-[#637381] leading-6 ml-2">
                      {flow.description}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* Learning Flow */}
            {lessonPlanDetails.learningFlow && (
              <>
                <SectionHeader title="Learning Flow" sectionKey="Learning Flow" />
                {Object.entries(lessonPlanDetails.learningFlow).map(
                  ([phase, items]) => (
                    <View key={phase} className="mb-2">
                      <Text style={{ fontSize: GetFontSize(15) }} className=" font-inter500 text-[#212B36] mb-2 capitalize">
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
                <SectionHeader title="Skills Applied" sectionKey="Skills Applied" />
                <BulletList items={lessonPlanDetails.skillsApplied} />
              </>
            )}

            {/* Activity Description */}
            {lessonPlanDetails.activityDescription && (
              <>
                <SectionHeader title="Activity Description" sectionKey="Activity Description" />
                <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 leading-6 text-[#637381]">
                  {lessonPlanDetails.activityDescription}
                </Text>
              </>
            )}

            {/* Practice Work */}
            {lessonPlanDetails.practiceWork && (
              <>
                <SectionHeader title="Practice Work" sectionKey="Practice Work" />
                <Text style={{ fontSize: GetFontSize(15) }} className="font-inter500 leading-6 text-[#637381]">
                  {lessonPlanDetails.practiceWork}
                </Text>
              </>
            )}

            {/* Inquiry Questions */}
            {lessonPlanDetails.inquiryQuestions && (
              <>
                <SectionHeader title="Inquiry Questions" sectionKey="Inquiry Questions" />
                <BulletList items={lessonPlanDetails.inquiryQuestions} />
              </>
            )}

            {/* Quick Assessments */}
            {lessonPlanDetails.quickAssessments && (
              <>
                <SectionHeader title="Quick Assessments" sectionKey="Quick Assessments" />
                {lessonPlanDetails.quickAssessments.map((assessment, index) => (
                  <View key={index} className="mb-2">
                    <Text style={{ fontSize: GetFontSize(15) }} className=" font-500 text-[#637381] mb-1">
                      • {assessment.question}
                    </Text>
                    <Text style={{ fontSize: GetFontSize(16) }} className="font-600 text-[#6B7280] ml-4">
                      Cognitive Level: {assessment.cognitiveLevel}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* Teacher Tips */}
            {lessonPlanDetails.teacherTips && (
              <>
                <SectionHeader title="Teacher Tips" sectionKey="Teacher Tips" />
                <BulletList items={lessonPlanDetails.teacherTips} />
              </>
            )}

            {/* Learning Outcomes */}
            {lessonPlanDetails.learningOutcomes && (
              <>
                <SectionHeader title="Learning Outcomes" sectionKey="Learning Outcomes" />
                <BulletList items={lessonPlanDetails.learningOutcomes} />
              </>
            )}

            {/* Values Inculcated */}
            {lessonPlanDetails.valuesInculcated && (
              <>
                <SectionHeader title="Values Inculcated" sectionKey="Values Inculcated" />
                <BulletList items={lessonPlanDetails.valuesInculcated} />
              </>
            )}
          </View>
        </ScrollView>

        {/* Floating Section Selector */}
        <View className="absolute bottom-0 left-0 right-0">
          {/* Dropdown Content */}
          {isDropdownOpen && (
            <Animated.View
              style={{
                height: dropdownHeight,
                backgroundColor: '#F8F4E6',
                marginHorizontal: 20,
                marginBottom: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#E7B686',
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                zIndex: 1000,
              }}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 8 }}
                showsVerticalScrollIndicator={false}
              >
                {ButtonsOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      Vibration.vibrate(50);
                      selectSection(option)
                    }}
                    style={{
                      backgroundColor: option === selectedSection ? '#FFE4B5' : 'white',
                      marginVertical: 4,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: option === selectedSection ? '#DC9047' : '#E7B686',
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: GetFontSize(14),
                        color: option === selectedSection ? '#DC9047' : '#8B6914',
                        fontWeight: option === selectedSection ? '600' : '500'
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}

          {/* Main Section Button */}
          <View className="bg-white px-5 py-4" style={{ zIndex: 999 }}>
            <LinearGradient
              colors={['#9C7B5B', '#E7B686']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 24, padding: 2 }}
            >

              <TouchableOpacity
                className="bg-white py-4 px-5 rounded-3xl items-center flex-row justify-center"
                style={{
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderTopWidth: 1,
                  borderBottomWidth: 3,
                  borderColor: '#E7B686',
                }}
                onPress={toggleDropdown}
              >
                <Text style={{ fontSize: GetFontSize(18) }} className="text-[#DC9047]  font-inter700 mr-2 flex-1 text-center">
                  {selectedSection || 'Lesson Plan Sections'}
                </Text>
                <Animated.View
                  style={{
                    transform: [{ rotate: rotateIcon }]
                  }}
                >
                  <ScrollUpArrow Width={12} Height={12} color="#DC9047" />
                </Animated.View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Overlay to close dropdown when tapping outside */}
        {isDropdownOpen && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.1)',
              zIndex: 500,
            }}
            activeOpacity={1}
            onPress={toggleDropdown}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GeneratedLessonPlan;