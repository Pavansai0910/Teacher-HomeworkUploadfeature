import { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GetFontSize from '../../Commons/GetFontSize';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Commons/Loader';
import Toast from 'react-native-toast-message';
import { getExamById, lgaLog } from '../../Services/StudentAPIV1';
import { submitExam } from '../../Services/StudentAPIV1';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlagPopup from '../../Popup/FlagPopup';
function LGATestScreen({ route }) {
  const examId = route.params.examId;
  const navigation = useNavigation();
  const { studentProfile } = useContext(AuthContext)
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getExamById({ examId });
        setExamData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [examId]);

      useEffect(() => {
       const lgaLogEntries = async () => {
            try {
                const response = await lgaLog({
                    studentId: studentProfile._id,
                    examId,
                    schoolId: studentProfile.schoolId._id,
                    questionpaperId: examData.QuestionPaper[0]._id
                });
            } catch (error) {
            } 
        };
        
        if(examData != null) {
            lgaLogEntries();
        }

    }, [examData]);

  const onAnswerSelect = updatedAnswers => {
    recordTimeSpent(currentQuestion);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: updatedAnswers,
    }));

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions(prev => [...prev, currentQuestion]);
    }

    setQuestionStartTime(Date.now());
  };

  const handleNext = () => {
    recordTimeSpent(currentQuestion);
    if (currentQuestion < examData.QuestionPaper[0].questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    recordTimeSpent(currentQuestion);
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const recordTimeSpent = questionIndex => {
    if (questionStartTime) {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      setTimeSpent(prev => ({
        ...prev,
        [questionIndex]: (prev[questionIndex] || 0) + timeTaken,
      }));
    }
  };

  const handleSubmitExam = async () => {
    setSubmitting(true);
    recordTimeSpent(currentQuestion);

    const answers = examData.QuestionPaper[0].questions
      .map((question, index) => {
        const selectedOption = selectedAnswers[index]
          ? selectedAnswers[index][0]
          : null;

        return {
          questionId: question.questionid,
          selectedOption: selectedOption ? selectedOption.text : '',
          learningObjectiveId: question.learningObjectiveId,
          learningOutcomeId: question.learningOutcomesId,
          subskillsId: selectedOption ? selectedOption.subskillsId : [],
        };
      })
      .filter(answer => answer.selectedOption);

    const payload = {
      studentId: studentProfile._id,
      examId: examId,
      questionPaperCode: examData.QuestionPaper[0].questionPaperCode,
      classId: examData.classSubjectId[0].classId,
      subjectId: examData.classSubjectId[0].subjectId,
      topicId: examData.QuestionPaper[0].topicId,
      chapterId: examData.QuestionPaper[0].chapterId,
      answers,
    };
    try {
      await submitExam(payload, examId);
      Toast.show({
        type: 'success',
        text1: 'Exam submitted successfully',
      });

      navigation.navigate("MainTabNavigator", { screen: 'HomeScreen' });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to submit the exam',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const questions = examData.QuestionPaper[0].questions;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <SafeAreaView className="w-full h-full bg-white">
      {/* Test section */}
      <View className="relative">
        {questions.length > 0 && (
          <View key={currentQuestion} className="w-screen h-screen">
            <View className="mt-[8%] px-[5%]">
              <View className=" flex flex-row justify-between items-center">
                <View className="w-[120px] h-[36px] rounded-full bg-[#EDF5FF] flex flex-row justify-center items-center gap-2 ">
                  <AnimatedCircularProgress
                    size={20}
                    width={3}
                    fill={((currentQuestion + 1) / questions.length) * 100}
                    tintColor={'#33569F'}
                    backgroundColor="#D9D9D9"
                    rotation={0}
                    lineCap="round"
                  />

                  <Text
                    style={{ fontSize: GetFontSize(11) }}
                    className="font-inter600  text-[#33569F]">
                    Question {currentQuestion + 1}
                  </Text>
                </View>

                 <TouchableOpacity
                  onPress={() => setFlagOpen(true)}>
                  <Text>FLAG</Text>
                  </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <BlueCrossIcon width={30} height={30} />
                </TouchableOpacity>
              </View>

              <ScrollView className="h-[75vh]">
                <View className="mt-[6%] flex flex-wrap flex-row gap-5 w-full">
                  {questions.map((question, index) => {
                    const isCurrent = index === currentQuestion;
                    const isAnswered =
                      selectedAnswers[index] && selectedAnswers[index][0];

                    // Choose background color:
                    let buttonBg = '';
                    if (isCurrent) {
                      buttonBg = 'bg-[#062668CF]'; // blue for current
                    } else if (isAnswered) {
                      buttonBg = 'bg-[#1D5AD5BD]'; // green for answered
                    } else {
                      buttonBg = 'bg-[#B20909BD]'; // red for unanswered
                    }

                    // Choose text color for contrast:
                    const textColor = isCurrent
                      ? 'text-white'
                      : 'text-[#FFF]';

                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => setCurrentQuestion(index)}
                          className={`w-[33px] h-[33px] rounded-[10px] flex justify-center items-center ${buttonBg}`}>
                          <Text className={`font-inter700 ${textColor}`}>
                            {index + 1}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                 
                </View>

                <View>

                  <FlagPopup
          open={flagOpen}
          onClose={() => setFlagOpen(false)}
          questionId={questions[currentQuestion].questionid}
          questionPaperId={examData.QuestionPaper[0]._id}
          studentId={studentProfile._id}
        />
          </View>

                <View className="mt-[6%]">
                  <View className="flex justify-center ">
                    <Text
                      style={{ fontSize: GetFontSize(17) }}
                      className="mx-[2px] font-inter700  text-[#33569F]">
                      {questions[currentQuestion].questionText}
                    </Text>
                  </View>
                </View>

                <View className="mt-[6%]">
                  <View className="min-h-[400px] rounded-[21px] bg-[#33569F08] border border-[#E7EFFF] flex justify-between py-4">
                    {questions[currentQuestion].options.map(
                      (option, optionIndex) => {
                        const isSelected =
                          selectedAnswers[currentQuestion] &&
                          selectedAnswers[currentQuestion][0]?.text ===
                          option.text;

                        return (
                          <TouchableOpacity
                            key={optionIndex}
                            onPress={() => onAnswerSelect([option])}
                            className={`min-h-[80px] border rounded-[22px] mx-4 flex flex-row justify-start items-center
                              ${isSelected
                                ? 'bg-[#33569F] border-[#33569F]'
                                : 'bg-white border-[#E7EFFF]'
                              }
                            `}>
                            <Text
                              style={{ fontSize: GetFontSize(14) }}
                              className={`font-inter600 mx-[12px] ${isSelected ? 'text-white' : 'text-[#33569F]'
                                }`}>
                              {option.text}
                            </Text>
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </View>
                </View>
              </ScrollView>

              {/* Navigation Buttons */}
              <View className=" h-[10vh] bg-white border-t-[0.25px] border-[#979797]">
                <View className="flex flex-row justify-between items-center mx-[3%] h-full ">
                  <TouchableOpacity
                    className={`w-[30%] h-[60%] rounded-[14px] border-2 border-[#B4C6ED] flex justify-center items-center ${currentQuestion !== 0 ? 'bg-[#EDF3FF]' : 'bg-[#EDF3FF]'
                    }
                    ${currentQuestion === 0 && "invisible"}  
                    `}
                    onPress={handlePrevious}
                    disabled={currentQuestion === 0}>
                    <Text
                      style={{ fontSize: GetFontSize(17)}}
                      className="text-center font-inter700 text-[#33569F]">
                      Previous
                    </Text>
                  </TouchableOpacity>
                  {isLastQuestion ? (
                    <TouchableOpacity
                      className={`w-[30%] h-[60%] rounded-[14px] border-2 border-[#B4C6ED] flex justify-center items-center ${!submitting ? 'bg-[#EDF3FF]' : 'bg-[#EDF3FF]'
                        }`}
                      onPress={handleSubmitExam}
                      disabled={submitting}>
                      <Text
                        style={{ fontSize: GetFontSize(17)}}
                        className="text-center font-inter700 text-[#33569F]">
                        {submitting ? 'Submitting' : 'Submit'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="w-[30%] h-[60%] rounded-[14px] border-2 border-[#B4C6ED] bg-[#EDF3FF] flex justify-center items-center"
                      onPress={handleNext}>
                      <Text
                        style={{ fontSize: GetFontSize(17)}}
                        className="text-center font-inter700 text-[#33569F]">
                        Next
                      </Text>
                    </TouchableOpacity>
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
export default LGATestScreen;
