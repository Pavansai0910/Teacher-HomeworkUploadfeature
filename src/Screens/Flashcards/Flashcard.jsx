import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect, useRef} from 'react';
import GetFontSize from '../../Commons/GetFontSize';
import Loader from '../../Commons/Loader';
import {
  fetchFlashcardData,
  fetchQuizData,
  updateTimeSpent,
  updateFlashcardProgress,
  updateQuizProgress,
} from '../../Services/Operations/flashcardsAPI';
import useTimeTracker from '../../Hooks/useTimeTracker';
import Toast from 'react-native-toast-message';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import SlideHandIconWhite from '../../Images/svg/SlideHandIconWhite';
import SwipeRightText from '../../Images/svg/SwipeRightText';
import SwipeUpText from '../../Images/svg/SwipeUpText';
import TapAnywhereText from '../../Images/svg/TapAnywhereText';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

function Flashcard({route}) {
  const navigation = useNavigation();

  const [showFirstScreen, setShowFirstScreen] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState([]); // Track selected answers for each question
  const [correctAnswers, setCorrectAnswers] = useState([]); // Track correct answers for each question
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track if a question has been answered
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track the current quiz

  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [flashcardData, setFlashcardData] = useState([]);
  const [flipAnimations, setFlipAnimations] = useState([]);
  const selectedChapterId = route.params.selectedChapterId;
  const {height, width} = Dimensions.get('window'); // Get screen dimensions

  const {getFinalElapsedTime} = useTimeTracker();
  useEffect(() => {
    // Component unmount effect
    return () => {
      const finalElapsedTime = getFinalElapsedTime();
      // Update the backend with the time spent in the component
      updateTimeSpent(finalElapsedTime);
    };
  }, [getFinalElapsedTime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOfQuiz = await fetchQuizData(selectedChapterId);
        const quizData = responseOfQuiz?.data || []; // Default to an empty array if data is undefined
        setQuizData(quizData);

        const response = await fetchFlashcardData(selectedChapterId);
        const data =
          response?.data.map(item => ({
            ...item,
            flipped: false,
          })) || [];
        setFlashcardData(data);

        // Initialize animation values for each card
        setFlipAnimations(data.map(() => new Animated.Value(0)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        Toast.show({
          type: 'error',
          text1: `Please check Internet Connection`,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedChapterId]);

  const handleFlip = index => {
    if (!flipAnimations[index]) return;

    const flipTo = quizData[index].flipped ? 0 : 1;

    Animated.timing(flipAnimations[index], {
      toValue: flipTo,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setQuizData(prevState =>
      prevState.map((item, i) =>
        i === index ? {...item, flipped: !item.flipped} : item,
      ),
    );

    // Update flashcard progress
    updateFlashcardProgress(selectedChapterId, index + 1);
  };

  const checkAnswer = (questionIndex, selectedOptionIndex, correctAnswer) => {
    // Update selected option for the current question
    setSelectedOptions(prevState => {
      const newState = [...prevState];
      newState[questionIndex] = selectedOptionIndex;
      return newState;
    });

    // Track the correct answer for the current question
    const isCorrect = selectedOptionIndex === correctAnswer;
    setCorrectAnswers(prevState => {
      const newState = [...prevState];
      newState[questionIndex] = correctAnswer; // Store the correct answer to highlight it
      return newState;
    });

    // Mark the question as answered
    setAnsweredQuestions(prevState => {
      const newState = [...prevState];
      newState[questionIndex] = true; // Mark this question as answered
      return newState;
    });
  };

  const handleNext = () => {
    if (!answeredQuestions[currentQuizIndex]) {
      Toast.show({
        type: 'error',
        text1: 'Please select one option',
      });
      return;
    }

    // Update quiz progress
    updateQuizProgress(selectedChapterId, currentQuizIndex + 1);

    setCurrentQuizIndex(prevIndex => prevIndex + 1);
  };

  const changeScreen = () => {
    setShowFirstScreen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!flashcardData.length && !quizData.length) {
    return (
      <View className="flex-1 bg-[#FFFFFF] flex justify-center">
        <Text
          style={{fontSize: GetFontSize(24)}}
          className="text-center font-inter600 mx-[30px] text-[#33569F]">
          Currently working on this Notes
        </Text>
      </View>
    );
  }

  if (showFirstScreen) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFFFFF] flex justify-center items-center  ">
        <TouchableWithoutFeedback onPress={changeScreen}>
          <View className="h-[80%] w-[93%] bg-[#33569F] rounded-xl shadow-xl flex justify-center ">
            <Text
              style={{fontSize: GetFontSize(24)}}
              className="text-center font-inter700 text-[#E2E8F5] mx-[41px] opacity-40 ">
              What is Photosynthesis
            </Text>

            <View className="absolute top-[60px] right-[35px]">
              <SlideHandIconWhite />
            </View>

            <View className="absolute top-[100px] right-[20px]">
              <SwipeRightText />
            </View>

            <View className="absolute top-[55%] left-[35%]">
              <TapAnywhereText />
            </View>

            <View className="absolute bottom-0 left-[40%]">
              <SwipeUpText />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      <View className="flex-1 flex justify-center items-center">
        <View className="w-full h-[90%]">
          //Top Level ScrollView
          <ScrollView pagingEnabled horizontal>
            //Flashcard ScrollView
            <ScrollView
              className="w-screen"
              pagingEnabled
              horizontal={false}
              showsVerticalScrollIndicator={false}>
              {flashcardData.map((eachQuestion, index) => {
                const flipAnimation = flipAnimations[index];

                if (!flipAnimation) {
                  return null;
                }

                const frontInterpolate = flipAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-180deg'],
                });

                const backInterpolate = flipAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-180deg', '-360deg'],
                });

                return (
                  <View key={index}>
                    {/* icon */}
                    <TouchableOpacity
                      className="absolute right-4"
                      onPress={() => navigation.goBack()}>
                      <BlueCrossIcon width={30} height={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => handleFlip(index)}
                      style={{
                        height: height * 0.726,
                        marginHorizontal: 10,
                      }}
                      className="my-[9%]">
                      <View style={{flex: 1, position: 'relative'}}>
                        {/* Front Face */}
                        <Animated.View
                          style={{
                            position: 'absolute',
                            backfaceVisibility: 'hidden',
                            transform: [{rotateY: frontInterpolate}],
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#33569F',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: GetFontSize(24),
                              color: '#E2E8F5',
                              textAlign: 'center',
                            }}
                            className="font-inter700 mx-[42px]">
                            {eachQuestion.front}
                          </Text>
                        </Animated.View>

                        {/* Back Face */}
                        <Animated.View
                          style={{
                            position: 'absolute',
                            backfaceVisibility: 'hidden',
                            transform: [{rotateY: backInterpolate}],
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#1D5AD5',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: GetFontSize(24),
                              color: '#E2E8F5',
                            }}
                            className="font-inter700 mx-[42px] leading-[26px]">
                            {eachQuestion.back}
                          </Text>
                        </Animated.View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            //Quiz section
            <ScrollView
              className="w-screen"
              pagingEnabled
              horizontal={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}>
              {quizData.map((quizQuestion, questionIndex) => {
                if (questionIndex !== currentQuizIndex) return null; // Only show the current quiz question

                return (
                  <View
                    style={{
                      height: height * 0.726,
                      marginHorizontal: 10,
                      marginVertical: 32,
                    }}
                    key={questionIndex}
                    className="mx-[24px]">
                    <View className=" flex flex-row justify-between items-center">
                      <View className="w-[110px] h-[36px] rounded-full bg-[#EDF5FF] flex flex-row justify-center items-center gap-1 ">
                        <AnimatedCircularProgress
                          size={20}
                          width={3}
                          fill={((questionIndex + 1) / quizData.length) * 100}
                          tintColor={'#33569F'}
                          backgroundColor="#D9D9D9"
                          rotation={0}
                          lineCap="round"
                        />

                        <Text
                          style={{fontSize: GetFontSize(11)}}
                          className="font-inter600 leading-[25px] text-[#33569F]">
                          Question {questionIndex + 1}
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BlueCrossIcon width={30} height={30} />
                      </TouchableOpacity>
                    </View>

                    <View className="mt-[22px]">
                      <View className="h-[110px] flex justify-center ">
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={4}
                          style={{fontSize: GetFontSize(22)}}
                          className="  mx-[2px] font-inter700 leading-[25px] text-[#33569F]">
                          {quizQuestion.question}
                        </Text>
                      </View>
                    </View>

                    <View className="mt-[22px]">
                      <View className="h-[310px] rounded-[21px] bg-[#33569F08] border border-[#E7EFFF] flex justify-between py-4">
                        {quizQuestion.options.map((option, optionIndex) => {
                          const isSelected =
                            selectedOptions[questionIndex] === optionIndex + 1;
                          const correctAnswer = correctAnswers[questionIndex];
                          const isCorrect = optionIndex + 1 === correctAnswer;
                          const backgroundColor = isSelected
                            ? isCorrect
                              ? 'bg-[#34C759]'
                              : 'bg-[#EC3737]'
                             : isCorrect
                            ? 'bg-[#34C759]'
                            : 'bg-[#4D83F00D]';
                          // Check if the current question is answered
                          const isAnswered = answeredQuestions[questionIndex];
                          return (
                            <TouchableOpacity
                              key={optionIndex}
                              disabled={isAnswered} // Disable the button if the question is already answered
                              onPress={() =>
                                checkAnswer(
                                  questionIndex,
                                  optionIndex + 1,
                                  quizQuestion.answer,
                                )
                              }
                              className={`h-[60px] ${backgroundColor} border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
                              <Text
                                style={{fontSize: GetFontSize(14)}}
                                className="font-inter600 text-[#33569F] mx-[12px]">
                                {option}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>

                    {currentQuizIndex < quizData.length - 1 && (
                      <View className="mt-6 inline-flex justify-end items-end">
                        <TouchableOpacity
                          className="w-[70px] h-[44px] rounded-full bg-[#EDF3FF] border border-[#FFFFFF] flex justify-center items-center"
                          onPress={handleNext}>
                          <Text
                            style={{fontSize: GetFontSize(14)}}
                            className="text-[#33569F] font-inter700">
                            Next
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Flashcard;
