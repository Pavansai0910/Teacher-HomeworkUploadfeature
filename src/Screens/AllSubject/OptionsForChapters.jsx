import React,{useEffect, useRef} from 'react';
import {View, Text,  TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GetFontSize from '../../Commons/GetFontSize';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import LearningGapIcon from '../../Images/svg/LearningGapIcon';
import FlashcardIcon from '../../Images/svg/FlashcardIcon';
import AdaptiveNotesIcon from '../../Images/svg/AdaptiveNotesIcon';
import PracticeIcon from '../../Images/svg/PracticeIcon';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

function OptionsForChapters({route}) {
  const navigation = useNavigation();

  const subjectId = route.params.subjectId
  const subjectName = route.params.subjectName
  const optionNames = [
    'Learning Gaps',
    'Flashcards',
    'Adaptive Notes',
    'Practice',
  ];
  const optionIcons = [
    LearningGapIcon,
    FlashcardIcon,
    AdaptiveNotesIcon,
    PracticeIcon,
  ];
  const OptionBgColor = ['#260980', '#283996', '#3AA3C1', '#202E24'];

  function ScrollingText({ text }) {
    const scrollX = useRef(new Animated.Value(0)).current; // Animated value to control scroll position
  
    useEffect(() => {
      const scrollWidth = 215; // Adjust this to the width of your container
      const textWidth = 800; // Adjust this value to match the width of the text you expect
  
      // Loop the scroll animation
      const scrollAnimation = Animated.loop(
        Animated.timing(scrollX, {
          toValue: textWidth - scrollWidth, // Scroll to the right edge
          duration: 5000, // Time in milliseconds for a full scroll
          useNativeDriver: true,
        })
      );
  
      scrollAnimation.start();
  
      return () => scrollAnimation.stop(); // Cleanup when component unmounts
    }, [scrollX]);
  
    return (
      <View style={{ width: '83%', overflow: 'hidden' }}>
        <Animated.ScrollView
          horizontal
          style={{ flexDirection: 'row' }}
          contentContainerStyle={{ flexDirection: 'row' }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: scrollX }}
        >
          <Text
            style={{
              fontSize: GetFontSize(18),
            }}
            numberOfLines={2}
            className="ml-3 font-poppins600 leading-[24px] text-[#33569F]  ">
          
            {text}
          </Text>
        </Animated.ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <View className="mt-[30px]">
        <View className="flex flex-row justify-start items-center ">
          <TouchableOpacity
            className=" flex flex-row justify-center items-center"
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />

          <ScrollingText text={route.params.selectedChapter} />

          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>
      <View className="mt-2 w-full">
        <View className="flex flex-row justify-center gap-[8px]">
          <View
            style={{
              height: 4,
              width: '30%',
              backgroundColor: '#33569F',
            }}></View>
          <View
            style={{
              height: 4,
              width: '30%',
              backgroundColor: '#33569F',
            }}></View>
          <View
            style={{
              height: 4,
              width: '30%',
              backgroundColor: '#F0F0F0',
            }}></View>
        </View>
      </View>

      <View className="my-[18%] mx-[32px]">
        <Text
          style={{fontSize: GetFontSize(20)}}
          className="text-center font-poppins600 text-[#06286E] leading-[22px]">
          What would you like to{' '}
        </Text>

        <Text
          style={{fontSize: GetFontSize(20)}}
          className="text-center font-poppins600 text-[#06286E] leading-[22px]">
          do in this chapter?
        </Text>
      </View>

      <View className=" flex flex-row justify-center flex-wrap gap-[24px]">
        {optionNames.map((eachOptions, index) => (
          <TouchableOpacity
            onPress={() => {

              if( optionNames[index] === 'Flashcards' ){
                navigation.navigate('Flashcard', {
                  selectedChapterId: route.params.selectedChapterId,
                  selectedChapter: route.params.selectedChapter,
                  type: optionNames[index],
                });
              }
              
              // If English subjectName is English then navigate to English UI
              else if( optionNames[index] === 'Adaptive Notes' && subjectName === 'English'){
                navigation.navigate('NewEnglishUI', {
                  subjectId: subjectId,
                  selectedChapterId: route.params.selectedChapterId,
                  selectedChapter: route.params.selectedChapter,
                  type: optionNames[index],
                });
              }

              else if( optionNames[index] === 'Adaptive Notes' ){
                navigation.navigate('ChapterTopics', {
                  subjectId: subjectId,
                  selectedChapterId: route.params.selectedChapterId,
                  selectedChapter: route.params.selectedChapter,
                  type: optionNames[index],
                });
              }

              else if( optionNames[index] === 'Practice' ){
                navigation.navigate('PracticeTest', {
                  subjectId: subjectId,
                  selectedChapterId: route.params.selectedChapterId,
                  selectedChapter: route.params.selectedChapter,
                  type: optionNames[index],
                });
              }
                else{
                  Toast.show({
                    type:'info',
                    text1:"Under development"
                  })
                
              // }else if( optionNames[index] === 'Learning Gaps' ){
              //   navigation.navigate('LearningGapReport', {
              //     selectedChapterId: route.params.selectedChapterId,
              //     selectedChapter: route.params.selectedChapter,
              //     type: optionNames[index],
              //   });

                // navigation.navigate('EachChapterTopic', {
                //   selectedChapterId: route.params.selectedChapterId,
                //   selectedChapter: route.params.selectedChapter,
                //   type: optionNames[index],
                // });
              }
            }}
            style={{backgroundColor: OptionBgColor[index]}}
            key={index}
            className="w-[142px] h-[142px] rounded-2xl inline-flex justify-center items-center ">
            <View>{React.createElement(optionIcons[index])}</View>
            <Text
              style={{fontSize: GetFontSize(18)}}
              className="mt-2 font-poppins600 text-[#FFFFFF] text-center leading-[20px] mx-[10px]">
              {eachOptions}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
export default OptionsForChapters;
