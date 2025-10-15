import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Vibration
} from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getGeneratedLessonPlan, getAllLessonPlans } from '../../../Services/teacherAPIV2';
import Bluepage from '../../../Images/LessonPlan/LessonPlanner';
import GetFontSize from '../../../Commons/GetFontSize';
import RightArrowIcon from '../../../Images/LessonPlan/RightArrowIcon';
import LeftArrow from '../../../Images/LessonPlan/LeftArrow';
import Toast from 'react-native-toast-message';

const LessonPlanHistory = () => {
  const navigation = useNavigation();
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherProfile } = useContext(AuthContext);

  const fetchLessonPlanHistory = async () => {
    try {
      const response = await getGeneratedLessonPlan({
        teacherId: teacherProfile?._id,
      });

      // Match the web structure exactly
      const plans = response?.data?.lessonPlans?.map(item => ({
        id: item.lessonPlanId || item._id || item.id,
        topic: item.topic || item.topicName?.[0],
        subject: item.subject,
        date: new Date(item.generatedAt || item.metadata?.generatedAt).toISOString().slice(0, 10),
      }));

      setLessonPlans(plans || []);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load lesson plan history.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonPlanDetails = async (lessonPlanId) => {
    try {
      setLoading(true);
      const response = await getAllLessonPlans({ lessonPlanId });

      // Use the same structure as web
      const lessonPlanData = response?.data?.lessonPlan;

      if (lessonPlanData) {
        navigation.navigate('HistoryDetails', {
          lessonPlanData,
          chapterId: lessonPlanData.chapterId || lessonPlanId,
          chapterName: lessonPlanData.chapter || lessonPlanData.chapterName,
          selectedTopics: [{ name: lessonPlanData.topic || lessonPlanData.topicName?.[0] }]
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not load lesson plan details.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch lesson plan details.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonPlanHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        Vibration.vibrate(50);

        fetchLessonPlanDetails(item.id)
      }
      }
      className="bg-white rounded-2xl py-3 px-6 mb-3 flex-row justify-between items-center"
      style={{
        borderTopWidth: 1,
        borderRightWidth: 2,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderColor: '#DBE1E6',
      }}
    >
      <Text
        style={{ fontSize: GetFontSize(16) }}
        className="text-[#637381] font-inter500"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.topic}
      </Text>
      <RightArrowIcon color={"#1A9DDD"} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-6 bg-[#E0F5FF]">
        <View className="w-[54px] h-10 rounded-lg mr-3 justify-center items-center">
          <Bluepage />
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="text-[#212B36] font-inter600 flex-shrink"
            >
              Saved Lesson Plans
            </Text>
          </View>
          <Text
            style={{ fontSize: GetFontSize(14) }}
            className="text-[#454F5B] font-inter400"
          >
            Generate a comprehensive lesson {'\n'} plan in seconds
          </Text>
        </View>
      </View>

      {/* Lesson List */}
      <View className="px-7 mt-7 flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#1EAFF7" className="mt-6" />
        ) : lessonPlans.length > 0 ? (
          <FlatList
            data={lessonPlans}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={{ fontSize: GetFontSize(14) }}
            className="text-[#454F5B] text-center mt-6">
            No saved lesson plans found.
          </Text>
        )}
      </View>

      <View className="h-[2px] border-t border-[#E3E8EE] my-4" />

      {/* Back Button */}
      <View className="bg-white px-6 mb-4">
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);

            navigation.goBack()
          }
          }
          style={{
            borderTopWidth: 1,
            borderRightWidth: 2,
            borderBottomWidth: 4,
            borderLeftWidth: 2,
            borderColor: '#DDE9F3',
          }}
          className="flex-row items-center justify-center rounded-xl py-2 px-3 bg-white"
        >
          <LeftArrow width={16} height={16} color="#1A9DDD" />
          <Text
            style={{ fontSize: GetFontSize(15) }}
            className="text-[#1A9DDD] font-inter500 ml-1.5"
          >
            back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LessonPlanHistory;