import { View, Text, TouchableOpacity, Animated, _View } from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { useEffect, useState, useRef } from 'react';
import getJwtToken from '../../Utils/getJwtToken';
import axios from 'axios';
import LeftArrowIconWhite from '../../Images/svg/LeftArrowIconWhite';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Commons/Loader';
import API_URL from '../../Constants/API_URL';
import Toast from 'react-native-toast-message';

function EachChapterList({ classSubjectId, subjectName }) {

  const navigation = useNavigation()
  const BASE_URL = API_URL + '/api/v1';

  const [loading, setLoading] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const subjectId = classSubjectId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getJwtToken();
        const response = await axios.get(
          `${BASE_URL}/note/get-chapters/${subjectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setNotesData(response.data.data);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type:'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        })
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subjectId]);

  if (loading) {
    return (
      <View className='mt-[60%] '>
        <Loader />
      </View>
    );
  }

  function AutoScrollingText({ text }) {
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
        })
      );

      scrollAnimation.start();

      return () => scrollAnimation.stop(); // Cleanup when component unmounts
    }, [scrollX]);

    return (
      <View style={{ width: 215, overflow: 'hidden' }}>
        <Animated.ScrollView
          horizontal
          style={{ flexDirection: 'row' }}
          contentContainerStyle={{ flexDirection: 'row' }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: scrollX }}
        >

          <Text
            style={{ fontSize: GetFontSize(15) }}
            className="h-full mt-7 font-poppins500 text-[#FFFFFF] leading-[16px] ">
            {text}
          </Text>
        </Animated.ScrollView>
      </View>
    );
  }

  return (
    <View className="h-full mx-[23px] mt-3 pt-3 pb-5 bg-[#FFFFFF]">

      {notesData.length == 0 && (
        <View className='mt-5'>
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
      )}

      {notesData.map((eachChapter, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("OptionsForChapters", {
              subjectId: subjectId,
              subjectName:subjectName,
              selectedChapterId: eachChapter.chapterId,
              selectedChapter: eachChapter.chapterName
            });
          }}
          key={index}
          className=" w-full h-[65px] bg-[#1D5AD5] mb-[13px] rounded-[15px] border-[2px] border-[#4D83F0] flex flex-row justify-between items-center px-[16px]">
          <AutoScrollingText text={eachChapter.chapterName} />

          <View className="flex flex-row justify-center items-center">
            <View className="mr-3">
              <AnimatedCircularProgress
                size={20}
                width={3}
                fill={eachChapter.progress}
                tintColor={
                  eachChapter.progress < 25 ? "#EC3737" // Red for < 25
                    : eachChapter.progress >= 25 && eachChapter.progress < 50 // Yellow for 25-49
                      ? "#FEBC2A"
                      : "#34C759" // Green for >= 50
                }

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
  );
}

export default EachChapterList;
