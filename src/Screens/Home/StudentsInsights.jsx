import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const StudentsInsights = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  const statsData = {
    totalTests: 45,
    averageScore: 87.5,
    studyHours: 28.5,
    streak: 12,
    totalQuestions: 1250,
    correctAnswers: 1087,
    improvement: '+15%',
    rank: 3,
  };

  const subjectStats = [
    { subject: 'Mathematics', score: 92, progress: 85, color: 'bg-blue-500', icon: '📐' },
    { subject: 'Science', score: 88, progress: 78, color: 'bg-green-500', icon: '🔬' },
    { subject: 'English', score: 85, progress: 72, color: 'bg-yellow-500', icon: '📚' },
    { subject: 'History', score: 89, progress: 80, color: 'bg-purple-500', icon: '🏛️' },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 4.2, tests: 3 },
    { day: 'Tue', hours: 3.8, tests: 2 },
    { day: 'Wed', hours: 5.1, tests: 4 },
    { day: 'Thu', hours: 2.9, tests: 2 },
    { day: 'Fri', hours: 4.7, tests: 5 },
    { day: 'Sat', hours: 6.2, tests: 4 },
    { day: 'Sun', hours: 3.5, tests: 1 },
  ];

  const achievements = [
    { title: 'Perfect Score', description: 'Scored 100% in 5 tests', icon: '🎯', earned: true },
    { title: 'Study Streak', description: '10 days in a row', icon: '🔥', earned: true },
    { title: 'Speed Runner', description: 'Complete 20 tests in a day', icon: '⚡', earned: false },
    { title: 'Subject Master', description: 'Master all subjects', icon: '👑', earned: false },
  ];

  const periods = ['Week', 'Month', 'Year'];

  const StatCard = ({ title, value, subtitle, icon, color = 'border-blue-500' }) => (
    <View className={`bg-white p-4 rounded-2xl mb-2 border-l-4 ${color} shadow-sm`} style={{ width: (width - 50) / 2 }}>
      <View className="flex-row items-center mb-2">
        <Text className="text-lg mr-2">{icon}</Text>
        <Text className="text-sm text-gray-600 font-medium">{title}</Text>
      </View>
      <Text className="text-2xl font-bold text-blue-500 mb-1">{value}</Text>
      {subtitle && <Text className="text-xs text-gray-400">{subtitle}</Text>}
    </View>
  );

  const SubjectCard = ({ subject, score, progress, color, icon }) => (
    <View className="bg-white p-4 rounded-2xl mb-2 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Text className="text-2xl mr-4">{icon}</Text>
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-800 mb-1">{subject}</Text>
          <Text className="text-sm text-gray-600">Average: {score}%</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex-1 h-2 bg-gray-200 rounded-full mr-3">
          <View 
            className={`h-full ${color} rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-xs font-bold text-gray-600">{progress}%</Text>
      </View>
    </View>
  );

  const ActivityBar = ({ day, hours, tests, maxHours = 6.5 }) => (
    <View className="items-center">
      <View className="h-16 justify-end mb-1">
        <View 
          className={`w-5 rounded-full ${hours > 4 ? 'bg-green-500' : hours > 2 ? 'bg-yellow-500' : 'bg-red-400'}`}
          style={{ height: (hours / maxHours) * 60 }}
        />
      </View>
      <Text className="text-xs font-bold text-gray-800 mb-1">{day}</Text>
      <Text className="text-xs text-gray-600">{hours}h</Text>
      <Text className="text-xs text-gray-500">{tests} tests</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header with Back Button */}
      <View className="items-center py-5 px-5">
        <View className="flex-row items-center justify-between w-full mb-2">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-white shadow-sm"
          >
            <Text className="text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">📊 Your Stats</Text>
          <View className="w-10" />
        </View>
        <Text className="text-base text-gray-600">Track your learning progress</Text>
      </View>

      {/* Period Filter */}
      <View className="flex-row justify-center px-5 mb-5">
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            className={`py-2 px-5 mx-1 rounded-2xl border ${
              selectedPeriod === period 
                ? 'bg-blue-500 border-blue-500' 
                : 'bg-white border-gray-200'
            }`}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text className={`text-sm ${
              selectedPeriod === period ? 'text-white font-semibold' : 'text-gray-600'
            }`}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            <StatCard
              title="Tests Taken"
              value={statsData.totalTests}
              icon="📝"
              color="border-blue-500"
            />
            <StatCard
              title="Average Score"
              value={`${statsData.averageScore}%`}
              subtitle={`${statsData.improvement} this week`}
              icon="📈"
              color="border-green-500"
            />
            <StatCard
              title="Study Hours"
              value={`${statsData.studyHours}h`}
              subtitle="This week"
              icon="⏰"
              color="border-yellow-500"
            />
            <StatCard
              title="Current Streak"
              value={`${statsData.streak} days`}
              icon="🔥"
              color="border-red-500"
            />
          </View>
        </View>

        {/* Subject Performance */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Subject Performance</Text>
          {subjectStats.map((subject, index) => (
            <SubjectCard key={index} {...subject} />
          ))}
        </View>

        {/* Weekly Activity */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Weekly Activity</Text>
          <View className="bg-white p-5 rounded-2xl shadow-sm">
            <View className="flex-row justify-around">
              {weeklyActivity.map((day, index) => (
                <ActivityBar key={index} {...day} />
              ))}
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Achievements</Text>
          <View className="flex-row flex-wrap justify-between">
            {achievements.map((achievement, index) => (
              <View 
                key={index} 
                className={`p-4 rounded-2xl mb-2 items-center shadow-sm ${
                  achievement.earned ? 'bg-white' : 'bg-gray-100'
                }`}
                style={{ width: (width - 50) / 2 }}
              >
                <Text className={`text-2xl mb-2 ${!achievement.earned && 'opacity-30'}`}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </Text>
                <Text className={`text-sm font-bold text-center mb-1 ${
                  achievement.earned ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {achievement.title}
                </Text>
                <Text className={`text-xs text-center ${
                  achievement.earned ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Detailed Stats */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Detailed Statistics</Text>
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-sm text-gray-600">Total Questions Answered</Text>
              <Text className="text-base font-bold text-gray-800">{statsData.totalQuestions}</Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-sm text-gray-600">Correct Answers</Text>
              <Text className="text-base font-bold text-gray-800">{statsData.correctAnswers}</Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-sm text-gray-600">Accuracy Rate</Text>
              <Text className="text-base font-bold text-gray-800">
                {((statsData.correctAnswers / statsData.totalQuestions) * 100).toFixed(1)}%
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-sm text-gray-600">Current Rank</Text>
              <Text className="text-base font-bold text-gray-800">#{statsData.rank}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentsInsights;