import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getGeneratedLessonPlan } from '../../../Services/teacherAPIV2'; // adjust path
// import { ArrowLeft, ChevronRight } from 'lucide-react-native';

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

      const plans = response?.data?.lessonPlans?.map(item => ({
        id: item._id,
        topic: item.topic,
        subject: item.subject,
        date: new Date(item.generatedAt).toISOString().slice(0, 10),
      }));

      setLessonPlans(plans || []);
    } catch (error) {
      console.log('Error fetching lesson plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonPlanHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-2xl py-3 px-4 mb-3 flex-row justify-between items-center border border-[#DDE9F3] shadow-sm">
      <Text className="text-[#06286E] text-[15px] font-medium">
        {item.topic}
      </Text>
      {/* <ChevronRight color="#1EAFF7" size={18} /> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {/* Header */}
      <View className="bg-[#E1F4FF] flex-row items-center p-5 space-x-3">
        <View className="w-12 h-12 bg-[#1EAFF7] rounded-xl" />
        <View>
          <Text className="text-[#06286E] text-[18px] font-bold">
            Saved Lesson Plans
          </Text>
          <Text className="text-[#5B6474] text-[13px]">
            Generate a comprehensive lesson plan in seconds
          </Text>
        </View>
      </View>

      {/* Lesson List */}
      <View className="px-4 mt-5 flex-1">
        {/* <Text className="text-[#1EAFF7] text-[16px] font-semibold mb-3">
         Chapter name :
        </Text> */}

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
          <Text className="text-gray-500 text-center mt-6">
            No saved lesson plans found.
          </Text>
        )}
      </View>

      {/* Back Button */}
      <View className="bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center space-x-2"
        >
          {/* <ArrowLeft color="#1EAFF7" size={18} /> */}
          <Text className="text-[#1EAFF7] text-[15px] font-medium">back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LessonPlanHistory;
