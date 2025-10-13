import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const LeaderBoard = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Overall');

  const categories = ['Overall', 'Weekly', 'Monthly'];

  const leaderboardData = [
    { rank: 1, name: 'Alex Johnson', score: 2850, avatar: '👨‍🎓', streak: 15, badge: '🏆' },
    { rank: 2, name: 'Sarah Chen', score: 2720, avatar: '👩‍🔬', streak: 12, badge: '🥈' },
    { rank: 3, name: 'Mike Wilson', score: 2650, avatar: '👨‍💻', streak: 10, badge: '🥉' },
    { rank: 4, name: 'Emma Davis', score: 2580, avatar: '👩‍🎨', streak: 8, badge: '⭐' },
    { rank: 5, name: 'You', score: 2520, avatar: '👤', streak: 7, badge: '⭐', isCurrentUser: true },
    { rank: 6, name: 'John Smith', score: 2480, avatar: '👨‍🏫', streak: 6, badge: '⭐' },
    { rank: 7, name: 'Lisa Wang', score: 2420, avatar: '👩‍💼', streak: 5, badge: '⭐' },
    { rank: 8, name: 'David Brown', score: 2380, avatar: '👨‍🔧', streak: 4, badge: '⭐' },
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Ranked #1 this week', icon: '🏆', color: 'bg-yellow-400' },
    { title: 'Consistent Learner', description: '7 day streak', icon: '🔥', color: 'bg-red-400' },
    { title: 'Quick Learner', description: 'Fastest completion', icon: '⚡', color: 'bg-blue-400' },
  ];

  const LeaderboardItem = ({ item }) => (
    <View className={`flex-row items-center p-4 mx-4 mb-3 rounded-2xl shadow-sm ${
      item.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'
    }`}>
      <View className="items-center mr-4">
        <Text className="text-2xl font-bold text-gray-800">{item.rank}</Text>
        <Text className="text-lg">{item.badge}</Text>
      </View>
      
      <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-4">
        <Text className="text-2xl">{item.avatar}</Text>
      </View>
      
      <View className="flex-1">
        <Text className={`text-base font-bold ${
          item.isCurrentUser ? 'text-blue-600' : 'text-gray-800'
        }`}>
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500">
          {item.score} points • {item.streak} day streak
        </Text>
      </View>
      
      {item.isCurrentUser && (
        <View className="bg-blue-500 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">YOU</Text>
        </View>
      )}
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
          <Text className="text-2xl font-bold text-gray-800">🏆 Leaderboard</Text>
          <View className="w-10" />
        </View>
        <Text className="text-base text-gray-600">See how you rank among peers</Text>
      </View>

      {/* Category Filter */}
      <View className="flex-row justify-center px-5 mb-5">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`py-2 px-5 mx-1 rounded-2xl border ${
              selectedCategory === category 
                ? 'bg-blue-500 border-blue-500' 
                : 'bg-white border-gray-200'
            }`}
            onPress={() => {
              Vibration.vibrate(50);

              setSelectedCategory(category)}
            } 
          >
            <Text className={`text-sm ${
              selectedCategory === category ? 'text-white font-semibold' : 'text-gray-600'
            }`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top 3 Podium */}
      <View className="flex-row justify-center items-end px-5 mb-8">
        {/* Second Place */}
        <View className="items-center mx-2">
          <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-2">
            <Text className="text-3xl">{leaderboardData[1].avatar}</Text>
          </View>
          <Text className="text-sm font-bold text-gray-800 text-center">{leaderboardData[1].name}</Text>
          <Text className="text-xs text-gray-500">{leaderboardData[1].score} pts</Text>
          <View className="w-16 h-12 bg-gray-400 rounded-t-lg mt-2 items-center justify-center">
            <Text className="text-white font-bold">2</Text>
          </View>
        </View>

        {/* First Place */}
        <View className="items-center mx-2">
          <View className="w-20 h-20 bg-yellow-200 rounded-full items-center justify-center mb-2 border-4 border-yellow-400">
            <Text className="text-4xl">{leaderboardData[0].avatar}</Text>
          </View>
          <Text className="text-base font-bold text-gray-800 text-center">{leaderboardData[0].name}</Text>
          <Text className="text-sm text-gray-500">{leaderboardData[0].score} pts</Text>
          <View className="w-20 h-16 bg-yellow-400 rounded-t-lg mt-2 items-center justify-center">
            <Text className="text-white font-bold text-lg">1</Text>
          </View>
        </View>

        {/* Third Place */}
        <View className="items-center mx-2">
          <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-2">
            <Text className="text-3xl">{leaderboardData[2].avatar}</Text>
          </View>
          <Text className="text-sm font-bold text-gray-800 text-center">{leaderboardData[2].name}</Text>
          <Text className="text-xs text-gray-500">{leaderboardData[2].score} pts</Text>
          <View className="w-16 h-10 bg-orange-400 rounded-t-lg mt-2 items-center justify-center">
            <Text className="text-white font-bold">3</Text>
          </View>
        </View>
      </View>

      {/* Your Achievements */}
      <View className="px-5 mb-5">
        <Text className="text-lg font-bold text-gray-800 mb-3">Your Recent Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {achievements.map((achievement, index) => (
            <View key={index} className={`${achievement.color} p-3 rounded-2xl mr-3 items-center shadow-sm`} style={{ width: 120 }}>
              <Text className="text-2xl mb-1">{achievement.icon}</Text>
              <Text className="text-white text-xs font-bold text-center">{achievement.title}</Text>
              <Text className="text-white text-xs text-center opacity-90">{achievement.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Full Leaderboard */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800 px-5 mb-3">Full Rankings</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {leaderboardData.map((item, index) => (
            <LeaderboardItem key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoard;