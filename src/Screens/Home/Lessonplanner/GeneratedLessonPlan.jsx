import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const GeneratedLessonPlan = () => {
  const route = useRoute();
  const { 
    chapterId, 
    selectedTopics, 
    startDate, 
    endDate, 
    classDisplay, 
    subjectDisplay 
  } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          Generated Lesson Plan
        </Text>
        
        <Text>Class: {classDisplay}</Text>
        <Text>Subject: {subjectDisplay}</Text>
        <Text>Start Date: {startDate}</Text>
        <Text>End Date: {endDate}</Text>
        <Text>Topics: {selectedTopics.map(t => t.name).join(', ')}</Text>
        
        {/* Add your lesson plan content here */}
      </View>
    </SafeAreaView>
  );
};

export default GeneratedLessonPlan;