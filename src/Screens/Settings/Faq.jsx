import React, { useState, useContext } from 'react'
import { View, Text, Vibration, Dimensions, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';
import GetFontSize from '../../Commons/GetFontSize';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuestionIcon from '../../Images/Settings/QuestionIcon';

function Faq() {
  const navigation = useNavigation();
  const { teacherProfile } = useContext(AuthContext);
  
  const screenHeight = Dimensions.get('window').height;
  const headerHeight = (screenHeight * 8.61) / 100;

  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqData = [
    {
      question: "How do I generate NEP-aligned Lesson Plans?",
      answer: "In the Teaching Tools tab,you can generate NEP-aligned Lesson Plans with one click.These are pre-structured for your class and subject-just click,download,and use them in class or share with students."
    },
    {
      question: "What do Smart Insights tell me about my students?",
      answer: "Smart Insights provide AI-powered chapter summaries showing which students are doing well,still learning,or need extra help."
    },
    // {
    //   question: "What is your refund policy?",
    //   answer: "We offer a 30-day money-back guarantee for all our services."
    // },
    {
      question: "How do I assign Learning Gap Assessments?",
      answer: "On the Assign Test screen,you can assign chapter-level topic tests to your whole class with one click.The tests are pre-made and ready to use,with no extra setup needed."
    },
    // {
    //   question: "What is your refund policy?",
    //   answer: "We offer a 30-day money-back guarantee for all our services."
    // },
    // {
    //   question: "How can I reset my password?",
    //   answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page."
    // },
    // {
    //   question: "What is your refund policy?",
    //   answer: "We offer a 30-day money-back guarantee for all our services."
    // },
    // {
    //   question: "How can I reset my password?",
    //   answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page."
    // }
  ];

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
    <View style={{ height: headerHeight }} className="bg-[#F7EBFF] justify-end px-4">
  <View className="flex-row items-center justify-start">
    <View className="flex-row items-center h-20 ml-5">
      <View style={{ transform: [{ scale: 1.40 }] }}>
        <QuestionIcon style={{ width: 26, height: 26 }} />
      </View>
      <Text
        style={{ fontSize: GetFontSize(18) }}
        className="text-[#212B36] font-inter600 flex-shrink ml-4"
      >
        FAQ
      </Text>
    </View>
  </View>
</View>

      {/* Content Container */}
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text
          style={{ fontSize: GetFontSize(16) }}
          className="text-[#212B36] font-inter600 mb-4"
        >
          Frequently Asked Questions
        </Text>

        {/* FAQ List */}
        <View>
          {faqData.map((faq, index) => (
            <View key={index} className="border-b border-[#E5E5E5]">
              <TouchableOpacity
                onPress={() => toggleFaq(index)}
                className="flex-row justify-between items-center py-3"
              >
                <Text
                  style={{ 
                    fontSize: GetFontSize(14),
                    color: expandedIndex === index ? '#AF33FF' : '#212B36'
                  }}
                  className="font-inter500 flex-1 pr-3"
                >
                  {faq.question}
                </Text>
                <Text
                  style={{ 
                    fontSize: GetFontSize(20),
                    color: expandedIndex === index ? '#AF33FF' : '#ADBAC7'
                  }}
                  className="font-inter400"
                >
                  {expandedIndex === index ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedIndex === index && (
                <View className="pb-3" style={{ paddingTop: 2 }}>
                  <Text
                    style={{ fontSize: GetFontSize(14) }}
                    className="text-[#637381] font-inter400"
                  >
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Back Button Footer */}
      <View className="bg-white border-t border-[#E5E5E5] px-5 py-4">
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);
            handleBack();
          }}
          style={{
            borderTopWidth: 1.5,
            borderRightWidth: 2.5,
            borderBottomWidth: 4,
            borderLeftWidth: 2.5,
            borderColor: '#DFE3E8',
            alignSelf: 'flex-start',
          }}
          className="bg-white rounded-[12px] px-5 py-3"
        >
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="text-[#AF33FF] font-inter600"
          >
            ← back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Faq;