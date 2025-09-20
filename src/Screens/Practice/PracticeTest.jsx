import {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {
  fetchSectionalTestQuestions,
  fetchSectionalResult,
} from '../../Services/Operations/sectionalAPI';
import GetFontSize from '../../Commons/GetFontSize';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import {useNavigation} from '@react-navigation/native';
import MockProgressBar from '../ProgressBars/MockProgressBar';
import Loader from '../../Commons/Loader';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function PracticeTest({route}) {
  const {studentProfile} = useContext(AuthContext);
  const chapterId = route.params.selectedChapterId;

  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responseArray, setResponseArray] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const navigation = useNavigation();

  const averageTimeForPrevious = 0;

  const checkForResult = async (
    chapterId,
    responseArray,
    timeTaken,
    averageTime,
  ) => {
    const response = await fetchSectionalResult(
      chapterId,
      responseArray,
      timeTaken,
      averageTime,
    );

    setResultData(response.data);
    const checked = response;

    if (checked.success == true) {
      setLoading(false);
      setShowResult(true);
    }
  };

  useEffect(() => {
    checkForResult(chapterId, responseArray, timeTaken, averageTimeForPrevious);
  }, []);

  let interval;

  const startInterval = () => {
    if (!showResult) {
      interval = setInterval(() => {
        setTimeTaken(prev => prev + 1);
      }, 1000);
    }
  };

  const clearTimer = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

    useEffect(() => {
      startInterval();
  
      return () => {
        clearTimer();
      };
    }, [showResult]);

  useEffect(() => {
    const fetchQuestions = async chapterId => {
      try {
        const response = await fetchSectionalTestQuestions(chapterId);
        setQuizData(response.data);
        setLoading(false);
        
      } catch (error) {
        Toast.show({
          type:'error',
          text1:`Error: ${error.message || 'Something went wrong' }`
        })
      }
    };

    fetchQuestions(chapterId);
  }, [chapterId]);

  const handleOptionSelect = optionIndex => {
    setResponseArray(prev => [...prev, optionIndex]);

    const averageTime = quizData.length > 0 ? timeTaken / quizData?.length : 0;

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setLoading(true);
      checkForResult(chapterId, responseArray, timeTaken, averageTime);
    }
  };

  const totalCount = resultData
    ? resultData.rightCount +
      resultData.wrongCount +
      resultData.notAttemptedCount
    : 0;

  const rightPercentage =
    totalCount > 0 ? parseInt((resultData.rightCount / totalCount) * 100) : 0;

  const wrongPercentage =
    totalCount > 0 ? parseInt((resultData.wrongCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      {showResult && (
        <View className="mx-[20px] mb-[90px] h-full">
          <View className="mt-[28px] ">
            <Text
              style={{fontSize: GetFontSize(22)}}
              className="font-inter700 leading-[24px]">
              Hello {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute right-0">
              <BlueCrossIcon width={30} height={30} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
             setShowResult(false);
             setCurrentQuestionIndex(0);
            }}
            className='bg-[#33569F] mt-[16%] rounded-md py-1 px-2 absolute right-0 '>
              <Text className='text-[#FFFFFF]'>
                Re-attempt
              </Text>
            </TouchableOpacity>

            <Text
              style={{fontSize: GetFontSize(11)}}
              className="mt-3  text-[#616161] font-inter400 leading-[13px]">
              Here is your personalized learning
            </Text>
            <Text
              style={{fontSize: GetFontSize(11)}}
              className="  text-[#616161] font-inter400 leading-[13px]">
              progress report.
            </Text>
          </View>

          <View className="w-full mt-[38px] flex flex-row justify-between items-center gap-[14px]">
            <View style={{width: '28%'}} className="gap-[14px] ">
              {/* Correct */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#246F41]">
                  Correct
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#366C43] opacity-80">
                  {resultData?.rightCount}
                </Text>
              </View>

              {/* Incorrect */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#DD2222]">
                  Incorrect
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#dd2222] opacity-80">
                  {resultData?.wrongCount}
                </Text>
              </View>
              {/* Time taken */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#316ADE]">
                  Time taken
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#316ADE] opacity-80">
                  {resultData?.timeTaken}s
                </Text>
              </View>

              {/* Average time */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#316ADE]">
                  Average time
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#316ADE] opacity-80">
                  {resultData?.averageTime}s
                </Text>
              </View>
            </View>

            {/* Right side box */}
            <View
              style={{width: '70%', shadowColor: '#5189FC'}}
              className="h-[320px] bg-white rounded-[10px] shadow-lg ">
              <View className="mt-[18px] ml-4 flex flex-row items-end">
                <MockProgressBar
                  rightPercentage={rightPercentage}
                  wrongPercentage={wrongPercentage}
                />

                <View className="ml-1">
                  <View className="flex flex-row items-baseline">
                    <View className="w-4 h-4 rounded-[4px] bg-[#2BCFA0]">
                      {' '}
                    </View>
                    <Text
                      style={{fontSize: GetFontSize(14)}}
                      className="ml-1 font-inter700">
                      Correct
                    </Text>
                  </View>

                  <View className=" flex flex-row items-baseline">
                    <View className="w-4 h-4 rounded-[4px] bg-[#FF6060]">
                      {' '}
                    </View>
                    <Text
                      style={{fontSize: GetFontSize(14)}}
                      className="ml-1 font-inter700">
                      Incorrect
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-6 border-t border-[#5189FC57] "></View>

              <View>
                <Text 
                style={{fontSize: GetFontSize(14)}}
                className='ml-2 mt-2 font-inter700 text-[#316ADE] '>
                {resultData?.percentage >= 80
            ? "Awesome! You did great!"
            : resultData?.percentage >= 40
              ? "Keep up the good work!"
              : "Needs Improvement!"}
                </Text>

                <Text
                style={{fontSize: GetFontSize(12)}}
                className='ml-2 mt-1 font-inter700 text-[#316ADE] '>
                
                {resultData?.percentage >= 80
            ? "Your hard work and dedication have paid off. Keep aiming high and reaching for your dreams!"
            : resultData?.percentage >= 40
              ? "Your effort and determination are paving the way for success. Keep moving forward with confidence!"
              : "Every setback is an opportunity for growth. Keep pushing forward!"}

                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Test section */}
      <View>
        {quizData.length > 0 && (
          <View key={currentQuestionIndex} className="w-screen h-screen">
            <View className="mt-[50px] mx-[24px]">
              <View className=" flex flex-row justify-between items-center">
                <View className="w-[110px] h-[36px] rounded-full bg-[#EDF5FF] flex flex-row justify-center items-center gap-1 ">
                  <AnimatedCircularProgress
                    size={20}
                    width={3}
                    fill={((currentQuestionIndex + 1) / quizData.length) * 100}
                    tintColor={'#33569F'}
                    backgroundColor="#D9D9D9"
                    rotation={0}
                    lineCap="round"
                  />

                  <Text
                    style={{fontSize: GetFontSize(11)}}
                    className="font-inter600 leading-[25px] text-[#33569F]">
                    Question {currentQuestionIndex + 1}
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
                    {quizData[currentQuestionIndex].question}
                  </Text>
                </View>
              </View>

              <View className="mt-[22px]">
                <View className="h-[400px] rounded-[21px] bg-[#33569F08] border border-[#E7EFFF] flex justify-between py-4">
                  {quizData[currentQuestionIndex].options.map(
                    (option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        onPress={() => handleOptionSelect(optionIndex)}
                        className={`h-[80px] border border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
                        <Text
                          style={{fontSize: GetFontSize(14)}}
                          className="font-inter600 text-[#33569F] mx-[12px]">
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default PracticeTest;
