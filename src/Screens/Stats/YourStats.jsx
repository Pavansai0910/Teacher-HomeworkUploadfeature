import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const YourStats = () => {
  const navigation = useNavigation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Week');

  const timeframes = ['This Week', 'This Month', 'All Time'];

  const quickStats = [
    { title: 'Tests Completed', value: '24', change: '+12%', icon: '📝', color: 'bg-blue-500' },
    { title: 'Average Score', value: '87%', change: '+5%', icon: '📊', color: 'bg-green-500' },
    { title: 'Study Time', value: '18h', change: '+3h', icon: '⏰', color: 'bg-purple-500' },
    { title: 'Streak', value: '7 days', change: '+2', icon: '🔥', color: 'bg-red-500' },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 92, tests: 8, improvement: '+8%', color: 'bg-blue-400', icon: '🔢' },
    { subject: 'Science', score: 89, tests: 6, improvement: '+5%', color: 'bg-green-400', icon: '🧪' },
    { subject: 'English', score: 85, tests: 7, improvement: '+3%', color: 'bg-yellow-400', icon: '📖' },
    { subject: 'History', score: 91, tests: 3, improvement: '+12%', color: 'bg-purple-400', icon: '🏛️' },
  ];

  const recentActivity = [
    { date: 'Today', activity: 'Completed Math Test #12', score: '95%', time: '2:30 PM' },
    { date: 'Yesterday', activity: 'Science Quiz - Chapter 5', score: '88%', time: '4:15 PM' },
    { date: '2 days ago', activity: 'English Grammar Test', score: '92%', time: '1:45 PM' },
    { date: '3 days ago', activity: 'History Assignment', score: '87%', time: '3:20 PM' },
  ];

  const goals = [
    { title: 'Complete 30 tests this month', progress: 80, current: 24, target: 30, icon: '🎯' },
    { title: 'Maintain 90% average', progress: 97, current: 87, target: 90, icon: '📈' },
    { title: 'Study 25 hours this month', progress: 72, current: 18, target: 25, icon: '📚' },
  ];

  const QuickStatCard = ({ stat }) => (
    <View className="bg-white p-4 rounded-2xl shadow-sm mr-4" style={{ width: width * 0.4 }}>
      <View className={`w-12 h-12 ${stat.color} rounded-full items-center justify-center mb-3`}>
        <Text className="text-xl">{stat.icon}</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</Text>
      <Text className="text-sm text-gray-600 mb-1">{stat.title}</Text>
      <Text className="text-xs text-green-500 font-semibold">{stat.change}</Text>
    </View>
  );

  const SubjectCard = ({ subject }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className={`w-10 h-10 ${subject.color} rounded-full items-center justify-center mr-3`}>
            <Text className="text-lg">{subject.icon}</Text>
          </View>
          <View>
            <Text className="text-base font-bold text-gray-800">{subject.subject}</Text>
            <Text className="text-sm text-gray-500">{subject.tests} tests completed</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-xl font-bold text-gray-800">{subject.score}%</Text>
          <Text className="text-xs text-green-500 font-semibold">{subject.improvement}</Text>
        </View>
      </View>
    </View>
  );

  const ActivityItem = ({ activity }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 shadow-sm">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-sm font-bold text-gray-800 mb-1">{activity.activity}</Text>
          <Text className="text-xs text-gray-500">{activity.date} • {activity.time}</Text>
        </View>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-green-600 text-xs font-bold">{activity.score}</Text>
        </View>
      </View>
    </View>
  );

  const GoalCard = ({ goal }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 shadow-sm">
      <View className="flex-row items-center mb-3">
        <Text className="text-xl mr-3">{goal.icon}</Text>
        <Text className="text-sm font-bold text-gray-800 flex-1">{goal.title}</Text>
      </View>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs text-gray-500">
          {goal.current} / {goal.target}
        </Text>
        <Text className="text-xs font-bold text-gray-800">{goal.progress}%</Text>
      </View>
      <View className="w-full h-2 bg-gray-200 rounded-full">
        <View 
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${goal.progress}%` }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="items-center py-5 px-5">
        <View className="flex-row items-center justify-between w-full mb-2">
          <TouchableOpacity 
            onPress={() => {
                          Vibration.vibrate(50);

              navigation.goBack()}
            }
            className="p-2 rounded-full bg-white shadow-sm"
          >
            <Text className="text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">📊 Your Stats</Text>
          <View className="w-10" />
        </View>
        <Text className="text-base text-gray-600">Your learning journey overview</Text>
      </View>

      {/* Timeframe Filter */}
      <View className="flex-row justify-center px-5 mb-5">
        {timeframes.map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            className={`py-2 px-4 mx-1 rounded-2xl border ${
              selectedTimeframe === timeframe 
                ? 'bg-blue-500 border-blue-500' 
                : 'bg-white border-gray-200'
            }`}
            onPress={() => {
              Vibration.vibrate(50);

              setSelectedTimeframe(timeframe)}
            } 
          >
            <Text className={`text-xs ${
              selectedTimeframe === timeframe ? 'text-white font-semibold' : 'text-gray-600'
            }`}>
              {timeframe}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 px-5 mb-3">Quick Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {quickStats.map((stat, index) => (
              <QuickStatCard key={index} stat={stat} />
            ))}
          </ScrollView>
        </View>

        {/* Subject Performance */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Subject Performance</Text>
          {subjectPerformance.map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </View>

        {/* Goals Progress */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Your Goals</Text>
          {goals.map((goal, index) => (
            <GoalCard key={index} goal={goal} />
          ))}
        </View>

        {/* Recent Activity */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Recent Activity</Text>
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </View>

        {/* Action Buttons */}
        <View className="px-5 mb-8">
          <TouchableOpacity className="bg-blue-500 p-4 rounded-2xl mb-3 shadow-sm">
            <Text className="text-white text-center font-bold text-base">View Detailed Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-2 border-blue-500 p-4 rounded-2xl shadow-sm">
            <Text className="text-blue-500 text-center font-bold text-base">Export Progress Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourStats;