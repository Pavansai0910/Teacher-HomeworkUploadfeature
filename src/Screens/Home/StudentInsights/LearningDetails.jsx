import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Animated, Easing, Vibration } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import GetFontSize from '../../../Commons/GetFontSize';
import TestAnalytics from './TestAnalytics';
import TestDetails from './TestDetails';
import CrossIcon from '../../../Images/Home/CrossIcon';

const LearningDetails = () => {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const route = useRoute();
    const { topicname, status, assignedDate, dueDate } = route.params || {};

    console.log('fggggggggggggggggggggggggggg', { topicname, status, assignedDate, dueDate });

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const rotation = useRef(new Animated.Value(0)).current;
    const rotateY = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleFlip = () => {
        const nextIndex = currentIndex === 0 ? 1 : 0;
        rotation.setValue(currentIndex === 0 ? 0 : 1);
        Animated.timing(rotation, {
            toValue: nextIndex === 0 ? 0 : 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();
        setTimeout(() => {
            scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
            setCurrentIndex(nextIndex);
        }, 300);
    };

    const renderAnalyticsContent = () => {
        if (status === 'completed') {
            return <TestAnalytics selectedTopic={route.params?.topicId} />;
        } else if (status === 'assigned') {
            return (
                <View className="flex-1 justify-center items-center px-6">
                    <Text
                        className="text-[#454F5B] font-inter500 text-center"
                        style={{ fontSize: GetFontSize(16), lineHeight: 22 }}
                    >
                        Assigned this test to see the analytics
                    </Text>
                </View>
            );
        } else if (status === 'pending') {
            return (
                <View className="flex-1 justify-center items-center px-6">
                    <Text
                        className="text-[#454F5B] font-inter500 text-center"
                        style={{ fontSize: GetFontSize(16), lineHeight: 22 }}
                    >
                        Student has not completed the test yet.
                    </Text>
                </View>
            );
        } else {
            return (
                <View className="flex-1 justify-center items-center px-6">
                    <Text
                        className="text-[#454F5B] font-inter500 text-center"
                        style={{ fontSize: GetFontSize(16), lineHeight: 22 }}
                    >
                        No analytics available for this topic.
                    </Text>
                </View>
            );
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#E8FADB] px-6 py-6">
                <View className="flex-row items-center">
                    <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
                        <SkullIcon />
                    </View>
                    <View className="flex-1">
                        <View className="flex-row justify-between items-start">
                            <Text style={{ fontSize: GetFontSize(18) }} className="text-[#212B36] font-inter600 flex-shrink">
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
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] font-inter400 w-[80%]">
                            Boost your student's progress in just a few taps!
                        </Text>
                    </View>
                </View>
            </View>

            {/* Topic Info */}
            {/* <View className="mt-6 mx-6  gap-4 border-b-2 border-[#E5E5E3] pb-4"> */}
                <View className="mx-6 mt-4 border-b-2 border-[#E5E5E3] pb-2">
                    <Text
                        className="font-inter500 text-[#454F5B]"
                        style={{ fontSize: GetFontSize(16), lineHeight: GetFontSize(20) }}
                        numberOfLines={3}
                    >
                       Topic:- {topicname}
                    </Text>
                </View>
            {/* </View> */}

            <View>
                {(status === 'pending' || status === 'completed') && (
                    <View className="mx-6 mt-2 border-b-2 border-[#E5E5E3] pb-2">
                        <Text className="text-[#919EAB] font-inter400" style={{ fontSize: GetFontSize(13) }}>
                            Assigned on - {formatDate(assignedDate)}
                        </Text>
                        <Text className="text-[#637381] font-inter400" style={{ fontSize: GetFontSize(13) }}>
                            Due date - {formatDate(dueDate)}
                        </Text>
                    </View>
                )}
            </View>


            {/* Animated Scroll */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                    rotation.setValue(index === 0 ? 0 : 1);
                }}
                scrollEventThrottle={16}
                className="mb-4"
            >
                {/* Card 1 */}
                <Animated.View
                    style={{
                        width: width,
                        height: height * 0.7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotateY }],
                    }}
                >
                    <TestDetails
                        chapterId={route.params?.chapterId}
                        selectedAssignment={route.params?.selectedAssignment}
                        selectedTopic={route.params?.topicId}
                    />
                </Animated.View>

                {/* Card 2 */}
                <Animated.View
                    style={{
                        width: width,
                        height: height * 0.7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotateY }],
                    }}
                >
                    {renderAnalyticsContent()}
                </Animated.View>
            </ScrollView>

            {/* <View className="border-b-2 border-[#E5E5E3] mb-4" /> */}


            {/* Bottom Buttons */}
            <View className="px-6 mb-4 pt-2 border-t-2 border-[#DFE3E8] flex-row justify-between items-center">
                <TouchableOpacity
                    className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#DFE3E8] rounded-xl justify-center items-center px-4 py-3"
                    onPress={() => {
                        Vibration.vibrate(50);
                        if (currentIndex === 1) {
                            handleFlip();
                        } else {
                            navigation.goBack();
                        }
                    }}
                >
                    <LeftArrow color="#357A20" />
                    <Text style={{ fontSize: GetFontSize(16) }} className="text-[#357A20] font-inter600">
                        {currentIndex === 1 ? 'Back to Details' : 'Back'}
                    </Text>
                </TouchableOpacity>

                {currentIndex === 0 && (
                    <TouchableOpacity
                        className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#71E31C] bg-[#B0EF80] rounded-xl justify-center items-center px-4 py-3"
                        onPress={() => {
                            Vibration.vibrate(50);
                            handleFlip();
                        }}
                    >
                        <Text style={{ fontSize: GetFontSize(16) }} className="font-inter600 text-[#357A20]">
                            See More
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

        </View>
    );
};

export default LearningDetails;
