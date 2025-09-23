import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import CircleTick from '../../Images/ticks/CircleTick';
import Loader from '../../Commons/Loader';
import Toast from 'react-native-toast-message';
import {
  getSelfAwareExambyId,
  submitSelfAwareExam,
} from '../../Services/StudentAPIV1';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
function SelfAwareTest({ route }) {
  const [checkedStates, setCheckedStates] = useState([]); // Array of arrays to track selected options
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmiting] = useState(false);
  const navigation = useNavigation();
  const { studentProfile } = useContext(AuthContext)
  const selfAssessmentId = route.params.selfAssessmentId;
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getSelfAwareExambyId({
          examId: selfAssessmentId,
        });
        setQuestions(response.data.questions);
        setCheckedStates(response.data.questions.map(() => [])); // Initialize each question's selected options as an empty array
        setLoading(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const toggleCheckbox = (questionIndex, optionIndex) => {
    setCheckedStates(prev => {
      const updated = [...prev];
      const selectedOptions = updated[questionIndex];
      if (selectedOptions.includes(optionIndex)) {
        // Deselect the option
        updated[questionIndex] = selectedOptions.filter(i => i !== optionIndex);
      } else {
        // Select the option
        updated[questionIndex] = [...selectedOptions, optionIndex];
      }
      return updated;
    });
  };

  const handleNext = () => {
    if (checkedStates[currentQuestionIndex].length === 0) {
      Toast.show({
        type: 'error',
        text1: 'select atleast one option',
      });
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    }
  };

  const submitExam = async () => {
    try {
      setSubmiting(true);
      const responses = questions.map((q, qIndex) => ({
        questionId: q.questionId,
        selectedOptions: checkedStates[qIndex].map(
          optionIdx => q.options[optionIdx], // get the string for each selected index
        ),
      }));

      const payload = {
        studentId: studentProfile._id,
        classId: studentProfile.classId._id,
        testId: selfAssessmentId,
        responses,
      };

      const response = await submitSelfAwareExam(payload);
      setSubmiting(false);
      navigation.navigate('SelfAwareResult', {
        selfAssessmentId: selfAssessmentId,
      });
    } catch (error) {
      setSubmiting(false);
    } finally {
      setSubmiting(false);
    }
  };
  const handleNextOrSubmit = () => {
    if (currentQuestionIndex === questions.length - 1) {
      submitExam();
    } else {
      handleNext();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Loading overlay */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={submitting}
        onRequestClose={() => { }}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg items-center">
            <ActivityIndicator size="large" color="#5189FC" />
            <Text className="mt-4 text-lg font-inter700 text-[#33569F]">
              Submitting your answers...
            </Text>
          </View>
        </View>
      </Modal>

      {/* Main content with disabled state when submitting */}
      <View pointerEvents={submitting ? 'none' : 'auto'} className="flex-1">
        <ScrollView scrollEnabled={false} className="relative mx-2">
          <View className="flex flex-row justify-center items-center">
            <View key={currentQuestionIndex} className="mx-[3%]">
              <View>
                <TouchableOpacity
                  onPress={() => navigation.pop(2)}
                  className="mt-[15%] flex items-end ">
                  <BlueCrossIcon width={30} height={30} />
                </TouchableOpacity>

                {/* Progress bar */}
                <View className="w-full mt-[8%] h-[16px] bg-[#D9D9D970] rounded-full">
                  <View
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100
                        }%`,
                      borderRadius: 50,
                    }}
                    className=" h-[16px] bg-[#1D5AD5] flex items-center">
                    <Text
                      style={{ fontSize: GetFontSize(9) }}
                      className="font-inter500 text-center text-[#FFFFFFBA]">
                      {currentQuestionIndex + 1}/{questions.length}
                    </Text>
                  </View>
                </View>

                <View className="mt-[10%] mx-[2px] min-h-[120px] flex flex-row items-center">
                  <Text
                    style={{ fontSize: GetFontSize(20) }}
                    className=" font-inter700  text-[#33569F]">
                    {currentQuestion.questionText}
                  </Text>
                </View>

                <View className="mt-[25px]">
                  {currentQuestion.options.map((eachOption, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      className={` ${checkedStates[currentQuestionIndex]?.includes(optionIndex)
                          ? 'bg-[#5189FC]'
                          : ''
                        } flex justify-center mb-3 min-h-[75px] rounded-lg border-[1px] border-[#33569F21]`}
                      onPress={() =>
                        toggleCheckbox(currentQuestionIndex, optionIndex)
                      }>
                      <View className="flex flex-row gap-[10px] px-[15px] items-center">
                        {/* Custom Checkbox */}
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: checkedStates[
                              currentQuestionIndex
                            ]?.includes(optionIndex)
                              ? '#5189FC'
                              : '#000000',
                            borderRadius: 2,
                            backgroundColor: checkedStates[
                              currentQuestionIndex
                            ]?.includes(optionIndex)
                              ? '#5189FC'
                              : 'white',
                          }}>
                          {checkedStates[currentQuestionIndex]?.includes(
                            optionIndex,
                          ) && <CircleTick width={25} height={25} />}
                        </View>

                        <Text className="w-[90%]">{eachOption}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <View className="mt-2 flex flex-row justify-between">
                  <TouchableOpacity
                    onPress={handlePrev}
                    className={` ${currentQuestionIndex === 0 ? 'invisible' : 'visible'
                      } w-[30%] h-[35%] rounded-[14px] border-[2px] border-[#FFFFFF] bg-[#EDF3FF] flex justify-center`}>
                    <Text
                      style={{ fontSize: GetFontSize(15) }}
                      className=" font-inter700 text-[#33569F] text-center">
                      Prev
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleNextOrSubmit}
                    className="w-[30%] h-[35%] rounded-[14px] border-[2px] border-[#FFFFFF] bg-[#EDF3FF] flex justify-center">
                    <Text
                      style={{ fontSize: GetFontSize(15) }}
                      className=" font-inter700 text-[#33569F] text-center">
                      {currentQuestionIndex === questions.length - 1
                        ? 'Submit'
                        : 'Next'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default SelfAwareTest;
