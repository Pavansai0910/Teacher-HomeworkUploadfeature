import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Animated, Easing } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkullIcon from '../../../Images/StudentInsights/SkullIcon';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import GetFontSize from '../../../Commons/GetFontSize';
import TestAnalytics from './TestAnalytics';
import TestDetails from './TestDetails';


const LearningDetails = () => {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const route = useRoute();
    const { topicname } = route.params || {};

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Animated rotation value
    const rotation = useRef(new Animated.Value(0)).current;

    // Interpolate rotation to degrees
    const rotateY = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleFlip = () => {
        const nextIndex = (currentIndex + 1) % 2;

        // Animate rotation
        Animated.timing(rotation, {
            toValue: currentIndex === 0 ? 1 : 0, // flip between 0 and 1
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();

        // Scroll to next card after a small delay to sync with rotation
        setTimeout(() => {
            scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
            setCurrentIndex(nextIndex);
        }, 300); // half of animation duration
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
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
                                onPress={() => navigation.navigate('MainTabNavigator')}
                            >
                                <Text style={{ fontSize: GetFontSize(14) }} className="text-white">
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: GetFontSize(14) }} className="text-[#454F5B] font-inter400">
                            Boost your students' progress in {'\n'} just a few taps!
                        </Text>
                    </View>
                </View>
            </View>

            {/* Topic Info */}
            <View className="mt-6 mx-10 flex-row justify-between items-start gap-4">
                <View className="flex-1 pr-3">
                    <Text
                        className="font-inter500 text-[#454F5B]"
                        style={{ fontSize: GetFontSize(16), lineHeight: GetFontSize(20) }}
                        numberOfLines={3}
                    >
                        {topicname}
                    </Text>
                </View>
                <View className="items-end">
                    <Text className="text-[#919EAB] font-inter400" style={{ fontSize: GetFontSize(13) }}>
                        Assigned on - Aug 4, 2025
                    </Text>
                    <Text className="text-[#637381] font-inter400" style={{ fontSize: GetFontSize(13) }}>
                        Due on - Aug 5, 2025
                    </Text>
                </View>
            </View>

            {/* Dashed Line */}
            <View className="border-b-2 border-dashed border-[#E5E5E3] mx-6 mt-4 mb-4" />

            {/* Animated Scroll Cards */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                className="mb-4"
            >
                {/* Card 1 */}
                <Animated.View
                    style={{
                        width: width * 1,
                        height: height * 0.6,
                        borderRadius: 16,
                        // backgroundColor: '#FFFFFF',
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
                        width: width * 1,
                        height: height * 0.6,
                        borderRadius: 16,
                        backgroundColor: '#D0F5B3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotateY }],
                    }}
                >
                    <TestAnalytics 
                    selectedTopic={route.params?.topicId}     
                    />
                </Animated.View>
            </ScrollView>

            <View className="border-b-2 border-[#E5E5E3] mt-4 mb-4" />
            {/* Buttons */}
            <View className="px-6 mb-4 flex-row justify-between items-center">
                <TouchableOpacity
                    className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#DFE3E8] rounded-xl justify-center items-center px-4 py-3"
                    onPress={() => navigation.goBack()}
                >
                    <LeftArrow color="#357A20" />
                    <Text style={{ fontSize: GetFontSize(16) }} className="text-[#357A20] font-inter600">
                        Back
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row gap-1 border-t-[1.5px] border-x-2 border-b-4 border-[#71E31C] rounded-xl justify-center items-center px-4 py-3 bg-[#B0EF80]"
                    onPress={handleFlip}
                >
                    <Text style={{ fontSize: GetFontSize(16) }} className="text-[#357A20] font-inter600">
                        Flip
                    </Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default LearningDetails;
