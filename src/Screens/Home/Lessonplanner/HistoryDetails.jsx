import React, { useState, useRef, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    Alert,
    Animated,
    Dimensions,
    Vibration
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
import CrossIcon from '../../../Images/Home/CrossIcon';

const HistoryDetails = () => {
    const route = useRoute();
    const [downloadStatus, setDownloadStatus] = useState(false);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const { teacherProfile } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // CHANGED: Default to "Full Lesson Plan"
    const [selectedSection, setSelectedSection] = useState('Full Lesson Plan');
    const dropdownAnimation = useRef(new Animated.Value(0)).current;
    const { height: screenHeight } = Dimensions.get('window');
    const sectionRefs = useRef({});

    const lessonPlanner = useSelector(
        (state) => state.lessonPlanner?.lessonPlannerData
    );

    const { lessonPlanData, chapterName, selectedTopics } = route.params || {};

    if (!lessonPlanData) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <Text style={{ fontSize: GetFontSize(16) }}
                    className="text-[#454F5B] text-center ">
                    No lesson plan data found.{'\n'}
                    <Text style={{ fontSize: GetFontSize(15) }}
                        className="text-[#1A9DDD]"
                        onPress={() => {
                            Vibration.vibrate(50);
                            navigation.goBack()
                        }}>
                        Go back
                    </Text>
                </Text>
            </SafeAreaView>
        );
    }

    const lessonPlanDetails = lessonPlanData || {};

    const topicName =
        lessonPlanData?.topic ||
        selectedTopics?.map((t) => t.name || t.topicName || 'Topic').join(', ') ||
        lessonPlanData?.topicName?.[0] ||
        'Topic';

    const getAvailableSections = () => {
        const availableSections = ['Full Lesson Plan']; // ADDED: Always include this option

        if (lessonPlanDetails.learningObjectives) availableSections.push('Learning Objectives');
        if (lessonPlanDetails.preRequisite) availableSections.push('Pre-Requisites');
        if (lessonPlanDetails.keyTerms) availableSections.push('Key Terms');
        if (lessonPlanDetails.teachingAids) availableSections.push('Teaching Aids');
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

    React.useEffect(() => {
        if (ButtonsOptions.length > 0 && !ButtonsOptions.includes(selectedSection)) {
            setSelectedSection(ButtonsOptions[0]);
        }
    }, [ButtonsOptions]);

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

    const selectSection = (section) => {
        console.log('Selected section:', section);
        setSelectedSection(section);
        setIsDropdownOpen(false);

        Animated.spring(dropdownAnimation, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
        }).start();

        // CHANGED: Scroll to top when changing sections
        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
        }, 200);
    };

    const dropdownHeight = dropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.min(350, screenHeight * 0.4)],
    });

    const rotateIcon = dropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const handleLessonPlanDownload = async (_id) => {
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

    const SectionHeader = ({ title, sectionKey }) => (
        <View
            ref={(ref) => {
                if (ref) {
                    console.log('Setting ref for section:', sectionKey);
                    sectionRefs.current[sectionKey] = ref;
                }
            }}
            style={{ marginTop: 16, marginBottom: 8 }}
        >
            <Text
                style={{ fontSize: GetFontSize(16) }}
                className="font-inter600 text-[#212B36]"
            >
                {title}
            </Text>
        </View>
    );

    const BulletList = ({ items }) => (
        <View className="ml-2">
            {items?.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 4 }}>
                    <Text style={{ fontSize: GetFontSize(14), lineHeight: 20, marginRight: 6 }}>
                        •
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: GetFontSize(14),
                            lineHeight: 20,
                            color: '#454F5B',
                        }}
                    >
                        {item}
                    </Text>
                </View>
            ))}
        </View>
    );

    // NEW: Function to check if section should be shown
    const shouldShowSection = (sectionName) => {
        return selectedSection === 'Full Lesson Plan' || selectedSection === sectionName;
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#E0F5FF] p-5">
                <View className="flex-row items-center">
                    <View className="h-10 rounded-lg mr-3 justify-center items-center">
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
                                className="w-7 h-7 bg-[#1EAFF7] rounded-full border border-[#1A9DDD] justify-center items-center"
                                onPress={() => {
                                    Vibration.vibrate(50);
                                    navigation.goBack()
                                }}>
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{ fontSize: GetFontSize(14) }}
                            className="text-[#454F5B] w-[85%] font-inter400"
                        >
                            Generate a comprehensive lesson plan in seconds
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
                        paddingTop: 8,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {(() => {
                        const topics = typeof topicName === 'string' ? topicName.split(',') : topicName;

                        return topics.map((topic, index) => (
                            <Text
                                key={index}
                                style={{ fontSize: GetFontSize(15) }}
                                className="font-inter500 text-[#212B36]"
                            >
                                • {topic.trim()}
                            </Text>
                        ));
                    })()}

                    {/* Download Button */}
                    <View className="border border-[#E5E5E3] rounded-xl p-4 mt-3">
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                className="bg-[#EBF8FE] border-[#1EAFF7] py-3 px-5 rounded-xl items-center justify-center flex-row flex-1"
                                onPress={() => {
                                    Vibration.vibrate(50);
                                    handleLessonPlanDownload(lessonPlanData._id)
                                }}
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

                        {/* CHANGED: Conditional rendering for each section */}
                        
                        {/* Learning Objectives */}
                        {shouldShowSection('Learning Objectives') && lessonPlanDetails.learningObjectives && (
                            <>
                                <SectionHeader title="Learning Objectives" sectionKey="Learning Objectives" />
                                <BulletList items={lessonPlanDetails.learningObjectives} />
                            </>
                        )}

                        {/* Pre-Requisites */}
                        {shouldShowSection('Pre-Requisites') && lessonPlanDetails.preRequisite && (
                            <>
                                <SectionHeader title="Pre-Requisites" sectionKey="Pre-Requisites" />
                                <View className="ml-4">
                                    {lessonPlanDetails.preRequisite?.map((item, i) => (
                                        <View key={i} className="mb-2">
                                            {item.priorKnowledge && (
                                                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                                    <Text style={{ fontSize: GetFontSize(14), marginRight: 6 }}>•</Text>
                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                            fontSize: GetFontSize(14),
                                                            lineHeight: 20,
                                                            color: '#454F5B',
                                                        }}
                                                    >
                                                        Prior Knowledge: {item.priorKnowledge}
                                                    </Text>
                                                </View>
                                            )}
                                            {item.warmUp && (
                                                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                                    <Text style={{ fontSize: GetFontSize(14), marginRight: 6 }}>•</Text>
                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                            fontSize: GetFontSize(14),
                                                            lineHeight: 20,
                                                            color: '#454F5B',
                                                        }}
                                                    >
                                                        Warm Up: {item.warmUp}
                                                    </Text>
                                                </View>
                                            )}
                                            {item.quickConnect && (
                                                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                                    <Text style={{ fontSize: GetFontSize(14), marginRight: 6 }}>•</Text>
                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                            fontSize: GetFontSize(14),
                                                            lineHeight: 20,
                                                            color: '#454F5B',
                                                        }}
                                                    >
                                                        Quick Connect: {item.quickConnect}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Key Terms */}
                        {shouldShowSection('Key Terms') && lessonPlanDetails.keyTerms && (
                            <>
                                <SectionHeader title="Key Terms" sectionKey="Key Terms" />
                                <BulletList items={lessonPlanDetails.keyTerms} />
                            </>
                        )}

                        {/* Teaching Aids */}
                        {shouldShowSection('Teaching Aids') && lessonPlanDetails.teachingAids && (
                            <>
                                <SectionHeader title="Teaching Aids" sectionKey="Teaching Aids" />
                                <BulletList items={lessonPlanDetails.teachingAids} />
                            </>
                        )}

                        {/* Suggested Flow */}
                        {shouldShowSection('Suggested Flow') && lessonPlanDetails.suggestedFlow && (
                            <>
                                <SectionHeader title="Suggested Flow" sectionKey="Suggested Flow" />
                                <View className="ml-4">
                                    {lessonPlanDetails.suggestedFlow?.map((flow, i) => (
                                        <Text style={{ fontSize: GetFontSize(14) }}
                                            key={i} className="text-[14px] leading-6 text-[#454F5B]">
                                            • <Text className="font-semibold">{flow.phase} ({flow.duration}):</Text> {flow.description}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Learning Flow */}
                        {shouldShowSection('Learning Flow') && lessonPlanDetails.learningFlow && (
                            <>
                                <SectionHeader title="Learning Flow" sectionKey="Learning Flow" />
                                <View>
                                    {Object.entries(lessonPlanDetails.learningFlow).map(([phase, items]) => (
                                        <View key={phase} className="mb-3">
                                            <Text
                                                style={{ fontSize: GetFontSize(14) }}
                                                className="font-inter500 text-[#454F5B] capitalize mb-1"
                                            >
                                                {phase}:
                                            </Text>
                                            <View className="ml-4">
                                                {items?.map((item, i) => (
                                                    <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                                                        <Text style={{ fontSize: GetFontSize(14), marginRight: 6 }}>•</Text>
                                                        <Text
                                                            style={{
                                                                flex: 1,
                                                                fontSize: GetFontSize(14),
                                                                lineHeight: 20,
                                                                color: '#454F5B',
                                                            }}
                                                        >
                                                            {item}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Skills Applied */}
                        {shouldShowSection('Skills Applied') && lessonPlanDetails.skillsApplied && (
                            <>
                                <SectionHeader title="Skills Applied" sectionKey="Skills Applied" />
                                <BulletList items={lessonPlanDetails.skillsApplied} />
                            </>
                        )}

                        {/* Activity Description */}
                        {shouldShowSection('Activity Description') && lessonPlanDetails.activityDescription && (
                            <>
                                <SectionHeader title="Activity Description" sectionKey="Activity Description" />
                                <Text style={{ fontSize: GetFontSize(14) }}
                                    className="text-[#454F5B] ml-4">
                                    {lessonPlanDetails.activityDescription}
                                </Text>
                            </>
                        )}

                        {/* Practice Work */}
                        {shouldShowSection('Practice Work') && lessonPlanDetails.practiceWork && (
                            <>
                                <SectionHeader title="Practice Work" sectionKey="Practice Work" />
                                <Text style={{ fontSize: GetFontSize(14) }}
                                    className="text-[#454F5B] ml-4">
                                    {lessonPlanDetails.practiceWork}
                                </Text>
                            </>
                        )}

                        {/* Inquiry Questions */}
                        {shouldShowSection('Inquiry Questions') && lessonPlanDetails.inquiryQuestions && (
                            <>
                                <SectionHeader title="Inquiry Questions" sectionKey="Inquiry Questions" />
                                <BulletList items={lessonPlanDetails.inquiryQuestions} />
                            </>
                        )}

                        {/* Quick Assessments */}
                        {shouldShowSection('Quick Assessments') && lessonPlanDetails.quickAssessments && (
                            <>
                                <SectionHeader title="Quick Assessments" sectionKey="Quick Assessments" />
                                <View className="ml-4">
                                    {lessonPlanDetails.quickAssessments?.map((assessment, i) => (
                                        <Text style={{ fontSize: GetFontSize(14) }}
                                            key={i} className="leading-6 text-[#454F5B]">
                                            • <Text className="font-inter500">{assessment.question}</Text> ({assessment.cognitiveLevel})
                                        </Text>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Teacher Tips */}
                        {shouldShowSection('Teacher Tips') && lessonPlanDetails.teacherTips && (
                            <>
                                <SectionHeader title="Teacher Tips" sectionKey="Teacher Tips" />
                                <BulletList items={lessonPlanDetails.teacherTips} />
                            </>
                        )}

                        {/* Learning Outcomes */}
                        {shouldShowSection('Learning Outcomes') && lessonPlanDetails.learningOutcomes && (
                            <>
                                <SectionHeader title="Learning Outcomes" sectionKey="Learning Outcomes" />
                                <BulletList items={lessonPlanDetails.learningOutcomes} />
                            </>
                        )}

                        {/* Values Inculcated */}
                        {shouldShowSection('Values Inculcated') && lessonPlanDetails.valuesInculcated && (
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
                                <Text
                                    style={{ fontSize: GetFontSize(18) }}
                                    className="text-[#DC9047] font-inter700 mr-2 flex-1 text-center"
                                >
                                    {selectedSection}
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
        </View>
    );
};

export default HistoryDetails;