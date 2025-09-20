import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../Constants/API_URL";
import GetFontSize from "../../Commons/GetFontSize";
import Toast from "react-native-toast-message";
import { SafeAreaView } from 'react-native-safe-area-context';

const Calendar = () => {

  const screenWidth = Dimensions.get('screen').width 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  }, [currentDate]);

  const daysNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#FFFFFF]">

      <Text className=" text-center text-[#33569F] text-[20px] font-inter700 mt-20 mx-10">We are working on this feature coming soon

</Text>
     
      {/* <View className="mt-4 border border-[#E2E2E2] h-[70px] bg-white overflow-hidden">
        <View
        style={{width:screenWidth}}
        className="flex-row h-full ">
          <TouchableOpacity
          style={{width:'12.5%'}}
            onPress={handlePrevWeek}
            className="
             h-full border-[#E2E2E2] items-center justify-center"
          >
            <Text
            style={{fontSize:GetFontSize(20)}}
            className="font-poppins500 text-[#0F2669] ">&lt;</Text>
          </TouchableOpacity>
          <View
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
          >
            <View className="flex-row h-full"
                    style={{width:screenWidth}}
            >
              {daysNames.map((day, index) => (
                <View key={day}
                style={{width:'12.5%'}}
                className={` items-center justify-center border-l border-[#E2E2E2] ${isToday(weekDates[index]) ? 'bg-[#5189FCCC] m-1 rounded-md md:rounded-xl' : 'border-r'}`}>
                  <Text 
                    style={{fontSize:GetFontSize(14)}}
                    className={`font-poppins500 text-[#0F2669] ${isToday(weekDates[index]) ? 'text-white' : ''}`}>{day}</Text>
                  <Text 
                    style={{fontSize:GetFontSize(14)}}
                    className={`font-poppins500 text-[#0F2669] ${isToday(weekDates[index]) ? 'text-white' : ''}`}>{weekDates[index]?.getDate() || ""}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={handleNextWeek}
            className="w-1/9 h-full border-l border-[#E2E2E2] items-center justify-center"
          >
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-2 h-[60px] bg-[#5189FCCC] rounded-t-[20px]">
        <View className="pl-0 flex-row justify-center items-center h-full">
          <TouchableOpacity className="bg-[#FFFFFF] w-[92px] h-[24px] rounded-[12px] justify-center items-center">
            <Text 
            style={{fontSize:GetFontSize(14)}}
            className="font-poppins500 text-[#4F4F4F]">View all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DetailedTimeTableSection /> */}

    </SafeAreaView>
  );
};

const DetailedTimeTableSection = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      setUserId(user ? user._id : null);
    };
    fetchUser();
  }, []);

  const colors = [
    "#fde4cb", "#ceffe2", "#dad7ff", "#ffd3e1", "#d7f4fe", "#a4f9c7", "#fdd7c3", "#e2f0cb",
  ];

  const currentDate = new Date().toISOString().split("T")[0];

  const fetchTasks = useCallback(async () => {
    if (!userId) {
      console.error("User ID not found in AsyncStorage.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/v1/calendar/task/${userId}/${currentDate}`);
      const tasksWithColors = response.data.tasks.map((task, index) => ({
        ...task,
        color: colors[index % colors.length],
      }));
      setTasks(tasksWithColors);
    } catch (error) {
      Toast.show({
        type:'error',
        text1: `Error: ${'Something went wrong'}`,
      })
    }
  }, [userId, currentDate]);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId, fetchTasks]);

  const handleCompleteClick = async (taskId, taskName) => {
    try {
      const response = await axios.patch(`${API_URL}/api/v1/calendar/task/complete`, {
        userId: userId,
        date: currentDate,
        taskName: taskName,
        isComplete: true,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isComplete: true } : task
        )
      );
    } catch (error) {
      Toast.show({
        type:'error',
        text1: `Error: ${'Something went wrong'}`,
      })
    }
  };

  return (
    <ScrollView>
      <View className="m-4 rounded-[20px] px-[13px] pt-[20px] pb-[0.1px] bg-white border">
        {tasks.length === 0 ? (
          <View className="mb-4 p-6 bg-[#fef2d4] items-center rounded-xl border-2 border-[#fcd04b] shadow-md">
            <Text className="text-xl text-[#0F2669]">Your study plan is complete!</Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task._id}>
              <Cards
                cardBgColor={task.color}
                text={task.taskName}
                time={task.time}
                onCompleteClick={() => handleCompleteClick(task._id, task.taskName)}
                isComplete={task.isComplete}
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const Cards = ({ cardBgColor, text, time, onCompleteClick, isComplete }) => {
  return (
    <View className="h-[68px] rounded-[16px] mb-[20px]" style={{ backgroundColor: cardBgColor }}>
      <View className="flex-row justify-between px-[12px] items-center h-full">
        <View className="flex-1 h-full pb-[11px] pt-2 justify-between">
          <Text className=" text-[#0F2669] w-[250px]">{text}</Text>
          <Text className=" text-[#0F2669]">{time}</Text>
        </View>
        <TouchableOpacity
          onPress={onCompleteClick}
          className={`w-[124px] h-[28px] mb-2 rounded-full border items-center justify-center ${isComplete ? 'bg-green-500' : 'bg-white border-[#E2E2E2]'}`}
          disabled={isComplete}
        >
          <Text className={`text-[12px] ${isComplete ? 'text-white' : 'text-black'}`}>
            {isComplete ? "Completed" : "Complete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calendar;

