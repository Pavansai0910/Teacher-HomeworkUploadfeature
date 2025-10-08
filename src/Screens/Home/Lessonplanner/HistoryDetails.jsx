import React, { useState, useRef, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import RNFS, { DownloadDirectoryPath } from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { downloadLessonPlan } from '../../../Services/teacherAPIV2';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import Download from '../../../Images/LessonPlan/Download';
import ScrollUpArrow from '../../../Images/LessonPlan/ScrollUpArrow';
import GetFontSize from '../../../Commons/GetFontSize';
import { AuthContext } from '../../../Context/AuthContext';
import { requestStoragePermission } from '../../../Permission/StoragePermission';

const HistoryDetails = () => {
    const route = useRoute();
    const [downloadStatus, setDownloadStatus] = useState(false);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const { teacherProfile } = useContext(AuthContext);

    const lessonPlanner = useSelector(
        (state) => state.lessonPlanner?.lessonPlannerData
    );

    const {
        lessonPlanData,
        chapterId,
        selectedTopics,
    } = route.params || {};

    console.log("Route params:", route.params);

    // Add validation like web
    if (!lessonPlanData) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <Text className="text-[#454F5B] text-center">
                    No lesson plan data found.{'\n'}
                    <Text
                        className="text-[#1A9DDD]"
                        onPress={() => navigation.goBack()}
                    >
                        Go back
                    </Text>
                </Text>
            </SafeAreaView>
        );
    }

    // Use the same structure as web - lessonPlanData is the main data
    const lessonPlanDetails = lessonPlanData || {};

    const topicName =
        lessonPlanData?.topic ||
        selectedTopics?.map((t) => t.name || t.topicName || 'Topic').join(', ') ||
        lessonPlanData?.topicName?.[0] ||
        'Topic';

    const chapterName =
        lessonPlanData?.chapter || 'Chapter';

    // Scroll to top (sections)
    const scrollToSection = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    // Handle download
    const handleLessonPlanDownload = async (_id) => {
        console.log("Initiating download for lesson plan ID:", _id);
        
        // 1. Permission Check
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            return;
        }
        
        setDownloadStatus(true);
        try {
            const response = await downloadLessonPlan({ _id: _id });

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
            console.error("RNFS Write Error:", error);
            Toast.show({
                type: 'error',
                text1: "Download Failed",
                text2: "Could not save file. Check permissions or internal file error.",
            });
        } finally {
            setDownloadStatus(false);
        }
    };

    const SectionHeader = ({ title }) => (
        <Text className="text-[16px] font-semibold text-[#212B36] mt-4 mb-2">
            {title}
        </Text>
    );

    const BulletList = ({ items }) => (
        <View className="ml-4">
            {items?.map((item, index) => (
                <Text
                    key={index}
                    className="text-[14px] leading-6 text-[#454F5B] mb-1"
                >
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
                            <Text
                                style={{ fontSize: GetFontSize(18) }}
                                className="text-[#212B36] font-inter600"
                            >
                                Lesson Plan
                            </Text>
                            <TouchableOpacity
                                className="w-6 h-6 bg-[#1EAFF7] rounded-full justify-center items-center"
                                onPress={() => navigation.goBack()}
                            >
                                <Text
                                    style={{ fontSize: GetFontSize(14) }}
                                    className="text-white"
                                >
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{ fontSize: GetFontSize(14) }}
                            className="text-[#454F5B]"
                        >
                            Generate a comprehensive lesson{'\n'}plan in seconds
                        </Text>
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <View className="flex-1">
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text
                        style={{ fontSize: GetFontSize(18) }}
                        className="font-inter600 text-[#212B36] mb-1"
                    >
                        {topicName}
                    </Text>
                    <Text
                        style={{ fontSize: GetFontSize(14) }}
                        className="text-[#454F5B] mb-5"
                    >
                        Chapter: {chapterName}
                    </Text>

                    {/* Download Button */}
                    <View className="border border-[#E5E5E3] rounded-xl p-4 mb-3">
                        <View className="flex-row items-center mb-4">
                            <TouchableOpacity
                                className="bg-[#EBF8FE] border-[#1EAFF7] py-3 px-5 rounded-xl items-center justify-center flex-row flex-1"
                                onPress={() => handleLessonPlanDownload(lessonPlanData._id)}
                                // disabled={downloadingHomework.includes(chapterId)}
                                style={{
                                    borderRightWidth: 2,
                                    borderLeftWidth: 2,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 3,
                                }}
                            >
                                {downloadStatus ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#1EAFF7"
                                        style={{ marginRight: 8 }}
                                    />
                                ) : (
                                    <Text
                                        style={{ fontSize: GetFontSize(14) }}
                                        className="text-[#1EAFF7] font-inter500"
                                    >
                                        Download Lesson Plan
                                    </Text>
                                )}
                                <View className="ml-2">
                                    <Download width={24} height={24} color="#1EAFF7" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Content Sections - Matching your web structure */}

                        {/* Timeline */}
                        {lessonPlanDetails.timelinePeriods && (
                            <>
                                <SectionHeader title="Timeline" />
                                <Text className="text-[14px] text-[#454F5B] mb-4">
                                    {lessonPlanDetails.timelinePeriods}
                                </Text>
                            </>
                        )}

                        {/* Learning Objectives */}
                        {lessonPlanDetails.learningObjectives && (
                            <>
                                <SectionHeader title="Learning Objectives" />
                                <BulletList items={lessonPlanDetails.learningObjectives} />
                            </>
                        )}

                        {/* Pre-Requisites */}
                        {lessonPlanDetails.preRequisite && (
                            <>
                                <SectionHeader title="Pre-Requisites" />
                                <View className="ml-4">
                                    {lessonPlanDetails.preRequisite?.map((item, i) => (
                                        <View key={i} className="mb-2">
                                            {item.priorKnowledge && (
                                                <Text className="text-[14px] leading-6 text-[#454F5B]">
                                                    • Prior Knowledge: {item.priorKnowledge}
                                                </Text>
                                            )}
                                            {item.warmUp && (
                                                <Text className="text-[14px] leading-6 text-[#454F5B]">
                                                    • Warm Up: {item.warmUp}
                                                </Text>
                                            )}
                                            {item.quickConnect && (
                                                <Text className="text-[14px] leading-6 text-[#454F5B]">
                                                    • Quick Connect: {item.quickConnect}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Key Terms */}
                        {lessonPlanDetails.keyTerms && (
                            <>
                                <SectionHeader title="Key Terms" />
                                <BulletList items={lessonPlanDetails.keyTerms} />
                            </>
                        )}

                        {/* Teaching Aids */}
                        {lessonPlanDetails.teachingAids && (
                            <>
                                <SectionHeader title="Teaching Aids" />
                                <BulletList items={lessonPlanDetails.teachingAids} />
                            </>
                        )}

                        {/* Suggested Flow */}
                        {lessonPlanDetails.suggestedFlow && (
                            <>
                                <SectionHeader title="Suggested Flow" />
                                <View className="ml-4">
                                    {lessonPlanDetails.suggestedFlow?.map((flow, i) => (
                                        <Text key={i} className="text-[14px] leading-6 text-[#454F5B] mb-2">
                                            • <Text className="font-semibold">{flow.phase} ({flow.duration}):</Text> {flow.description}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Learning Flow */}
                        {lessonPlanDetails.learningFlow && (
                            <>
                                <SectionHeader title="Learning Flow" />
                                <View className="ml-4">
                                    {Object.entries(lessonPlanDetails.learningFlow).map(([phase, items]) => (
                                        <View key={phase} className="mb-3">
                                            <Text className="text-[14px] font-semibold text-[#454F5B] capitalize mb-1">
                                                {phase}:
                                            </Text>
                                            <View className="ml-4">
                                                {items?.map((item, i) => (
                                                    <Text key={i} className="text-[14px] leading-6 text-[#454F5B] mb-1">
                                                        • {item}
                                                    </Text>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
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
                                <Text className="text-[14px] text-[#454F5B] mb-4">
                                    {lessonPlanDetails.activityDescription}
                                </Text>
                            </>
                        )}

                        {/* Practice Work */}
                        {lessonPlanDetails.practiceWork && (
                            <>
                                <SectionHeader title="Practice Work" />
                                <Text className="text-[14px] text-[#454F5B] mb-4">
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
                                <View className="ml-4">
                                    {lessonPlanDetails.quickAssessments?.map((assessment, i) => (
                                        <Text key={i} className="text-[14px] leading-6 text-[#454F5B] mb-2">
                                            • <Text className="font-semibold">{assessment.question}</Text> ({assessment.cognitiveLevel})
                                        </Text>
                                    ))}
                                </View>
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

                {/* Bottom Floating Button */}
                <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
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
                            onPress={scrollToSection}
                        >
                            <Text
                                style={{ fontSize: GetFontSize(18) }}
                                className="text-[#DC9047] font-inter700 mr-2"
                            >
                                Lesson Plan Sections
                            </Text>
                            <ScrollUpArrow Width={12} Height={12} color="#DC9047" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HistoryDetails;