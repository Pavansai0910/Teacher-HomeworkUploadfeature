import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import GetFontSize from '../../Commons/GetFontSize';
import { useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import Loader from '../../Commons/Loader';
import { useNavigation } from '@react-navigation/native';
import { getSelfAwareResult } from '../../Services/StudentAPIV1';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
function SelfAwareResult({ route }) {
  const { studentProfile } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  const selfAssessmentId = route.params.selfAssessmentId;

  useEffect(() => {
    const fetchResult = async () => {
      try {

        const response = await getSelfAwareResult({
          studentId: studentProfile._id,
          examId: selfAssessmentId,
        });
        setResult(response.data);
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
    fetchResult();
  }, []);

  const bubblesPositions = [
    { position: 'top-[9%]  left-[37%] ' },
    { position: 'top-[32%] left-[12%] ' },
    { position: 'top-[30%] left-[60%] ' },
    { position: 'top-[56%] left-[77%] ' },
    { position: 'top-[45%] left-[38%] ' },
    { position: 'top-[77%] left-[55%] ' },
    { position: 'top-[-5%] left-[5%]  ' },
    { position: 'top-[70%] left-[18%] ' },
    { position: 'top-[4%]  left-[77%] ' },
  ];

  let bubblePositionIndex = 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="mt-[10%]">
          <View className="flex flex-row justify-between">
            <View>
              <Text
                style={{ fontSize: GetFontSize(24) }}
                className="ml-[12%] font-poppins700 text-[#33569F] leading-tight">
                Your Assessment
              </Text>
              <Text
                style={{ fontSize: GetFontSize(24) }}
                className="ml-[12%] font-poppins700 text-[#33569F] leading-tight">
                Result
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.replace('MainTabNavigator', { screen: 'SelfAware' })
              }
              className="mr-[5%]">
              <BlueCrossIcon width={30} height={30} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelfAssessmentTip', {
                selfAssessmentId: route.params.selfAssessmentId,
              });
            }}
            className="bg-[#33569F] mt-[14%] rounded-md py-2 px-4 absolute right-[27px] ">
            <Text className="text-[#FFFFFF]">Re-attempt</Text>
          </TouchableOpacity>
          <View className="mt-[5%] mx-[27px] flex flex-row justify-between flex-wrap">
            <View className="w-[63%]">
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="font-poppins600 text-[#000000]">
                Hey {studentProfile?.name
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')},
              </Text>

              <Text
                style={{ fontSize: GetFontSize(11) }}
                className="mt-[1%] font-poppins400 text-[#000000]">
                Based on the responses, here are the
              </Text>
              <Text
                style={{ fontSize: GetFontSize(11) }}
                className="font-poppins400 text-[#000000]">
                areas where you might be lacking
              </Text>
              <Text
                style={{ fontSize: GetFontSize(11) }}
                className="font-poppins400 text-[#000000]">
                and need improvement.
              </Text>
            </View>

            <View className="mt-8">
              <View className="points-section flex flex-row items-center gap-[6px]">
                <View className="w-[14px] h-[14px] bg-[#46D5AC] rounded"></View>
                <Text
                  style={{ fontSize: GetFontSize(10) }}
                  className="text-[#06286E] font-inter500">
                  Strong points
                </Text>
              </View>

              <View className="mt-3 flex flex-row items-center gap-[6px]">
                <View className="w-[14px] h-[14px] bg-[#FCC03F] rounded"></View>
                <View>
                  <Text
                    style={{ fontSize: GetFontSize(10) }}
                    className="text-[#06286E] font-inter500">
                    Areas needing
                  </Text>
                  <Text
                    style={{ fontSize: GetFontSize(10) }}
                    className="text-[#06286E] font-inter500">
                    improvement
                  </Text>
                </View>
              </View>

              <View className="mt-3 flex flex-row items-center gap-[6px]">
                <View className="w-[14px] h-[14px] bg-[#EC7979] rounded"></View>
                <Text
                  style={{ fontSize: GetFontSize(10) }}
                  className="text-[#06286E] font-inter500">
                  Weak Points
                </Text>
              </View>
            </View>
          </View>

          {/* Bubble Views */}
          <View className="w-[99%] h-[250px] sticky">
            {result?.summary?.keywords?.strong?.map((bubble, index) => {
              return (
                <View
                  key={index}
                  className={`bubble rounded-full text-center flex justify-center items-center  bg-[#46D5AC] absolute ${bubblesPositions[bubblePositionIndex++]?.position
                    }  w-[75px] aspect-square `}
                  style={{
                    boxShadow: '10px 12px 9.5px rgba(128, 121, 121, 0.25)',
                  }}>
                  <Text
                    style={{ fontSize: GetFontSize(9) }}
                    className="font-poppins500 text-[#FFFFFF] text-center ">
                    {' '}
                    {bubble}
                  </Text>
                </View>
              );
            })}
            {result?.summary?.keywords?.weak?.map((bubble, index) => {
              return (
                <View
                  key={index}
                  className={`bubble rounded-full text-center flex justify-center items-center  bg-[#EC7979] absolute ${bubblesPositions[bubblePositionIndex++]?.position
                    }  w-[75px] aspect-square `}
                  style={{
                    boxShadow: '10px 12px 9.5px rgba(128, 121, 121, 0.25)',
                  }}>
                  <Text
                    style={{ fontSize: GetFontSize(9) }}
                    className="font-poppins500 text-[#FFFFFF] text-center ">
                    {' '}
                    {bubble}
                  </Text>
                </View>
              );
            })}
            {result?.summary?.keywords?.medium?.map((bubble, index) => {
              return (
                <View
                  key={index}
                  className={`bubble rounded-full text-center flex justify-center items-center  bg-[#FCC03F] absolute ${bubblesPositions[bubblePositionIndex++]?.position
                    }  w-[75px] aspect-square `}
                  style={{
                    boxShadow: '10px 12px 9.5px rgba(128, 121, 121, 0.25)',
                  }}>
                  <Text
                    style={{ fontSize: GetFontSize(9) }}
                    className="font-poppins500 text-[#FFFFFF] text-center ">
                    {' '}
                    {bubble}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="mt-6 mx-[27px] flex flex-row justify-between items-center gap-1 overflow-hidden pr-[20px]">
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="font-inter600 text-[#979797] ">
              See your highlights
            </Text>

            <View className="bg-[#97979747] h-[2px] w-full " />
          </View>
        </View>

        {/* Great  */}
        <View
          style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
          className="mt-1 h-auto mx-[14px] bg-[#FFFFFF] rounded-md ">
          <View className="mt-[10px] mx-[5px] h-[30px] bg-[#E3ECF9] rounded-lg flex flex-row items-center">
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="font-inter500 text-[#06286E] ml-[10px]">
              What you're great at
            </Text>
          </View>

          <View className="h-auto pb-2 bg-[#F3F8FC] my-[6px] mx-2 rounded-lg">
            {result?.summary?.strong?.length > 0 && (
              <View className=" mt-3 ml-2 mr-4">
                {result?.summary?.strong
                  .slice(0, 3)
                  .flatMap((point, pointIndex) =>
                    point
                      .split('.')
                      .filter(Boolean)
                      .map((sentence, sentenceIndex) => (
                        <View
                          className="flex flex-row mt-[4px]"
                          key={`${pointIndex}-${sentenceIndex}`}>
                          <Text
                            style={{ fontSize: GetFontSize(12) }}
                            className="mr-1 font-inter500 text-[#06286E] ">
                            {pointIndex * 1 + sentenceIndex + 1}.
                          </Text>
                          <View className="inline-block">
                            <Text
                              style={{ fontSize: GetFontSize(12) }}
                              className="font-inter500 text-[#06286E] pr-4">
                              {sentence.trim()}
                            </Text>
                          </View>
                        </View>
                      )),
                  )}
              </View>
            )}
          </View>
        </View>

        {/* Growth */}
        <View
          style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
          className="mt-4 h-auto mx-[14px] bg-[#FFFFFF] rounded-md ">
          <View className="mt-[10px] mx-[5px] h-[30px] bg-[#E3ECF9] rounded-lg flex flex-row items-center">
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="font-inter500 text-[#06286E] ml-[10px]">
              Room for Growth
            </Text>
          </View>

          <View className="h-auto pb-2 bg-[#F3F8FC] my-[6px] mx-2 rounded-lg">
            {result?.summary?.medium.length > 0 && (
              <View className=" mt-3 ml-2 mr-4">
                {result.summary?.medium
                  .slice(0, 3)
                  .flatMap((point, pointIndex) =>
                    point
                      .split('.')
                      .filter(Boolean)
                      .map((sentence, sentenceIndex) => (
                        <View
                          className="flex flex-row mt-[4px]"
                          key={`${pointIndex}-${sentenceIndex}`}>
                          <Text
                            style={{ fontSize: GetFontSize(12) }}
                            className="mr-1 font-inter500 text-[#06286E] ">
                            {pointIndex * 1 + sentenceIndex + 1}.
                          </Text>
                          <View className="inline-block">
                            <Text
                              style={{ fontSize: GetFontSize(12) }}
                              className="font-inter500 text-[#06286E] pr-4">
                              {sentence.trim()}
                            </Text>
                          </View>
                        </View>
                      )),
                  )}
              </View>
            )}
          </View>
        </View>
        {/* Improve */}
        <View
          style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
          className="mt-4 h-auto mx-[14px] bg-[#FFFFFF] rounded-md ">
          <View className="mt-[10px] mx-[5px] h-[30px] bg-[#E3ECF9] rounded-lg flex flex-row items-center">
            <Text
              style={{ fontSize: GetFontSize(14) }}
              className="font-inter500 text-[#06286E] ml-[10px]">
              Things to Improve
            </Text>
          </View>

          <View className="h-auto pb-2 bg-[#F3F8FC] my-[6px] mx-2 rounded-lg">
            {result?.summary?.weak?.length > 0 && (
              <View className=" mt-3 ml-2 mr-4">
                {result.summary?.weak.slice(0, 3).flatMap((point, pointIndex) =>
                  point
                    .split('.')
                    .filter(Boolean)
                    .map((sentence, sentenceIndex) => (
                      <View
                        className="flex flex-row mt-[4px]"
                        key={`${pointIndex}-${sentenceIndex}`}>
                        <Text
                          style={{ fontSize: GetFontSize(12) }}
                          className="mr-1 font-inter500 text-[#06286E] ">
                          {pointIndex * 1 + sentenceIndex + 1}.
                        </Text>
                        <View className="inline-block">
                          <Text
                            style={{ fontSize: GetFontSize(12) }}
                            className="font-inter500 text-[#06286E] pr-4">
                            {sentence.trim()}
                          </Text>
                        </View>
                      </View>
                    )),
                )}
              </View>
            )}
          </View>
        </View>

        {/* progress so far */}
        <View
          style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
          className=" mt-4 h-auto pb-2 mx-[14px] bg-[#FFFFFF] rounded-md ">
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className=" mt-5 ml-4 text-[#06286E] font-inter600">
            Your progress so far
          </Text>

          <Text
            style={{ fontSize: GetFontSize(12) }}
            className="mt-[18px] mx-4 font-inter500 text-[#000000]">
            {result?.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SelfAwareResult;
