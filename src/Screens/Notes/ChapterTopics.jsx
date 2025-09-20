import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import getJwtToken from '../../Utils/getJwtToken';
import GetFontSize from '../../Commons/GetFontSize';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LeftArrowIconWhite from '../../Images/svg/LeftArrowIconWhite';
import Loader from '../../Commons/Loader';
import API_URL from '../../Constants/API_URL';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChapterTopics({route}) {
  const [notesData, setNotesData] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const subjectId = route.params.subjectId;

  const selectedChapterId = route.params.selectedChapterId;

  const BASE_URL = API_URL + '/api/v1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getJwtToken();

        const response = await axios.get(
          `${BASE_URL}/note/get-notes/${selectedChapterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setNotesData(response.data.data);
        setProgress(response?.data?.progress);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type:'error',
          text1:`Error: ${error.message || 'Something went wrong'} `
        })
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [route.params.selectedChapterId]);

  function AutoScrollingText({text}) {
    const scrollX = useRef(new Animated.Value(0)).current; // Animated value to control scroll position

    useEffect(() => {
      const scrollWidth = 215; // You can adjust this to the width of your container
      const textWidth = 800; // Adjust this value to match the width of the text you expect

      // Loop the scroll animation
      const scrollAnimation = Animated.loop(
        Animated.timing(scrollX, {
          toValue: textWidth - scrollWidth, // Scroll to the right edge
          duration: 5000, // Time in milliseconds for a full scroll
          useNativeDriver: true,
        }),
      );

      scrollAnimation.start();

      return () => scrollAnimation.stop(); // Cleanup when component unmounts
    }, [scrollX]);

    return (
      <View style={{width: 215, overflow: 'hidden'}}>
        <Animated.ScrollView
          horizontal
          style={{flexDirection: 'row'}}
          contentContainerStyle={{flexDirection: 'row'}}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: scrollX}}>
          <Text
            style={{fontSize: GetFontSize(15)}}
            className="h-full mt-7 font-poppins500 text-[#FFFFFF] leading-[16px] ">
            {text}
          </Text>
        </Animated.ScrollView>
      </View>
    );
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <View className="mt-[30px]">
        <View className="flex flex-row justify-start items-center">
          <TouchableOpacity
            className="ml-4 flex flex-row justify-center items-center"
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />
          <Text
            style={{fontSize: GetFontSize(16)}}
            className="ml-3 font-poppins600 text-[#33569F]">
            {route.params.type} 
          </Text>
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
              backgroundColor: '#33569F',
            }}></View>
        </View>

        {notesData.length == 0 && (
          <View className='w-screen h-screen bg-[#FFFFFF]'>
        <View className='mx-[32px] mt-[50%]'>
          <Text
            style={{ fontSize: GetFontSize(18) }}
            className="font-poppins600 text-[#33569F] text-center ">
            Currently We are working on our new notes!
          </Text>
          <Text
            style={{ fontSize: GetFontSize(18) }}
            className="font-poppins600 text-[#33569F] text-center ">
            Thank you for Being Patient.
          </Text>
        </View>
        </View>
      )}

        <View className="mt-[40px] mx-[32px]">
          <Text
            style={{fontSize: GetFontSize(18)}}
            className="font-poppins600 text-[#33569F] ">
            {route.params.selectedChapter}
          </Text>
        </View>
      </View>

      <ScrollView>
        <View className="mx-[23px] mt-3 py-5 bg-[#FFFFFF]">
          {notesData.map((eachTopic, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('IndividualTopic', {
                  subjectId: subjectId,
                  selectedChapterId: selectedChapterId,
                  index: index,
                  totalSubTopics: eachTopic.subTopics.length 
                });
              }}
              key={index}
              className="w-full h-[65px] bg-[#1D5AD5] mb-[13px] rounded-[15px] border-[2px] border-[#4D83F0] flex flex-row justify-between items-center px-[16px]">
              <AutoScrollingText text={eachTopic.topic} />

              <View className="flex flex-row justify-center items-center">
                <View className="mr-3">
                  <AnimatedCircularProgress
                    size={20}
                    width={3}
                    fill={progress.includes(index) ? 100 : 0} // Completed if in progress array
                    tintColor={progress.includes(index) ? '#34C759' : '#ECEAEA'} // Green if completed
                    backgroundColor="#ECEAEA"
                    rotation={0}
                    lineCap="round"
                  />
                </View>

                <View>
                  <LeftArrowIconWhite />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ChapterTopics;
