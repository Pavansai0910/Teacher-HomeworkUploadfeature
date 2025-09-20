import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import getJwtToken from '../../Utils/getJwtToken';
import GetFontSize from '../../Commons/GetFontSize';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LeftArrowIconWhite from '../../Images/svg/LeftArrowIconWhite';
import Loader from '../../Commons/Loader';
import API_URL from '../../Constants/API_URL';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

function LearningGapTopics({route}) {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()
  
  const BASE_URL = API_URL + '/api/v1';

  useEffect(() => {
    const fetchData = async () => {
      try {

        const selectedChapterId = route.params.selectedChapterId;
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
  }, [route.params.selectedChapterId]);

  if (loading) {
    return (
    <Loader />
    );
  }

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <View className="mt-[30px]">
        <View className="flex flex-row justify-start items-center">
          <TouchableOpacity
            className="ml-4"
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />
          </TouchableOpacity>
          <Text
            style={{fontSize: GetFontSize(16)}}
            className="ml-3 font-poppins600 text-[#33569F]">
            {route.params.type}
          </Text>
        </View>
      </View>

      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

      <View className="mt-2 w-full">
      <View className='flex flex-row justify-center gap-[8px]'>
                <View style={{ height: 4, width: '30%', backgroundColor: '#33569F' }}></View>
                <View style={{ height: 4, width: '30%', backgroundColor: '#33569F' }}></View>
                <View style={{ height: 4, width: '30%', backgroundColor: '#33569F' }}></View>
          </View>       
           <View className="mt-[40px] mx-[32px]">
            <Text
            style={{fontSize:GetFontSize(18)}}
            className="font-poppins600 text-[#33569F] ">
          {route.params.selectedChapter}
            </Text>
        </View>
      </View>

      <ScrollView>
      <View className="mx-[23px] mt-3 py-5 bg-[#FFFFFF]">
          {notesData.map((eachTopic, index) => (
            <TouchableOpacity
            onPress={()=>{
                navigation.navigate("LearningGap",{
                  selectedChapterId:route.params.selectedChapterId
                })

            }}
            key={index} 
            className=" w-full h-[65px] bg-[#1D5AD5] mb-[13px] rounded-[15px] border-[2px] border-[#4D83F0] flex flex-row justify-between items-center px-[16px]">
              <Text
                  style={{fontSize: GetFontSize(15)}}
                  className="w-[215px] font-poppins500 text-[#FFFFFF] leading-[16px] ">
                {eachTopic.topic}
              </Text>
              <View className="flex flex-row justify-center items-center">
              <View className="mr-3">
                <AnimatedCircularProgress
                  size={20}
                  width={3}
                  fill={0}
                  tintColor="#EC3737"
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
export default LearningGapTopics;
