// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Dimensions,
// } from 'react-native';
// import {useEffect, useState} from 'react';
// import RenderHTML from 'react-native-render-html';
// import Loader from '../../Commons/Loader';
// import axios from 'axios';
// import getJwtToken from '../../Utils/getJwtToken';
// import {useNavigation} from '@react-navigation/native';
// import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
// import GetFontSize from '../../Commons/GetFontSize';
// import BlueBgFileIcon from '../../Images/svg/BlueBgFileIcon';
// import YellowBgNotesIcon from '../../Images/svg/YellowBgNotesIcon';
// import LeftArrow from '../../Images/svg/LeftArrow';
// import {updateNotesProgress} from '../../Services/Operations/notesAPI';
// import TalkingNotesIcon from '../../Images/svg/TalkingNotesIcon';
// import CongratulationsCard from './CongralutaionCard';
// import EyeSlashIcon from '../../Images/svg/EyeSlashIcon';
// import CrossFaq from '../../Images/svg/CrossFaq';
// import WhiteEdumetricIcon from '../../Images/svg/WhiteEdumetricIcon';
// import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
// import Dictionary from '../../Commons/Dictionary';
// import TalkingNotes from '../../Commons/TalkingNotes';
// import LightBlueCrossIcon from '../../Images/svg/LightBlueCrossIcon';
// import DropdownComponent from '../../Commons/DropdownComponent';
// import {handleTranslate} from '../../Commons/Translate';
// import API_URL from '../../Constants/API_URL';
// import Toast from 'react-native-toast-message';

// const BASE_URL = API_URL + '/api/v1';

// function IndividualTopic({route}) {
//   const navigation = useNavigation();
//   const screenWidth = Dimensions.get('window').width;

//   const [topicData, setTopicData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [subIndex, setSubIndex] = useState(0);
//   const [completed, setCompleted] = useState(false);
//   const [answer, setAnswer] = useState(null);
//   const [question, setQuestion] = useState('');
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [showSummary, setShowSummary] = useState(false);
//   const [showDictionary, setShowDictionary] = useState(false);
//   const [showTalkingNotes, setShowTalkingNotes] = useState(false);

//   const [showTranslate, setTranslate] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [translatedExamples, setTranslatedExamples] = useState('Examples');

//   const handleLanguageChange = newLanguage => {
//     setSelectedLanguage(newLanguage);
//     setTranslate(false);
//   };

//   useEffect(() => {
//     const translateNotes = async (topicData, selectedLanguage) => {
//       try {
//         // Process the entire topicData object
//         const translatedData = await translateObject(
//           topicData,
//           selectedLanguage,
//           handleTranslate,
//         );
//         setTopicData(translatedData);
//       } catch (error) {
//         Toast.show({
//           type: 'error',
//           text1: `Error: ${error.message || 'Something went wrong'}`,
//         });
//       }
//     };

//     const translateExamples = async (topicData, selectedLanguage) => {
//       const translatedExamples = await handleTranslate(
//         topicData,
//         selectedLanguage,
//       );
//       setTimeout(() => {
//         setTranslatedExamples(translatedExamples);
//       }, 2500);
//     };

//     if (topicData) {
//       translateNotes(topicData, selectedLanguage);
//     }

//     if (translatedExamples) {
//       translateExamples(translatedExamples, selectedLanguage);
//     }
//   }, [selectedLanguage]);

//   const translateObject = async (data, lang, translateFn) => {
//     if (typeof data === 'string') {
//       return await translateFn(data, lang); // Translate strings
//     } else if (Array.isArray(data)) {
//       return Promise.all(
//         data.map(item => translateObject(item, lang, translateFn)),
//       ); // Handle arrays
//     } else if (typeof data === 'object' && data !== null) {
//       const translatedObj = {};
//       for (const key in data) {
//         translatedObj[key] = await translateObject(
//           data[key],
//           lang,
//           translateFn,
//         ); // Recursive call for objects
//       }
//       return translatedObj;
//     }
//     return data; // Return as is if not a string, array, or object
//   };

//   const {subjectId, index, selectedChapterId, totalSubTopics} = route.params;
//   // const totalSubTopics = 1;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await getJwtToken();

//         const response = await axios.get(
//           `${BASE_URL}/note/get-notes/${subjectId}/${selectedChapterId}/${index}/${subIndex}`,
//           // `${BASE_URL}/note/get-notes/66108394e717ed7dd9a0bd55/66108394e717ed7dd9a0bd5a/2/${subIndex}`,

//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         setTopicData(response.data.topic);
//         setLoading(false);
//       } catch (error) {
//         if (error.response.status == 400) {
//           setCompleted(true);
//         }
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     const updateNotes = async () => {
//       try {
//         const response = await updateNotesProgress(selectedChapterId, index);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     updateNotes();
//   }, [subIndex]);

//   if (!topicData) {
//     return (
//       <View className="w-full h-full bg-[#FFFFFF]">
//         <Loader />
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View className="w-full h-full bg-[#FFFFFF]">
//         <Loader />
//       </View>
//     );
//   }

//   const handleAnswer = async questionText => {
//     try {
//       const token = await getJwtToken();
//       setLoading(true);
//       setQuestion(questionText);
//       const response = await axios.post(
//         `${BASE_URL}/note/get-answer`,
//         {question: questionText},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       setAnswer(response.data.answer);
//       setLoading(false);
//       setShowAnswer(true);
//     } catch {}
//   };

//   return (
//     <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
//       {/* Congratulation Card */}
//       {completed && (
//         <View className="absolute top-[25%] left-[10%] right-[10%]">
//           <CongratulationsCard
//             isOpen={completed}
//             topic={topicData.subTopicTitle}
//           />
//         </View>
//       )}

//       {/* Must learn question's Answer  */}
//       {showAnswer && (
//         <View className="absolute mx-2 z-50 w-[96%] h-[350px] top-[25%] bg-[#EFF4FD] rounded-xl">
//           {/* cross icon */}
//           <View className="absolute top-[10px] right-[10px]">
//             <TouchableOpacity onPress={() => setShowAnswer(false)}>
//               <CrossFaq width={40} height={40} />
//             </TouchableOpacity>
//           </View>

//           {/* question section */}
//           <View className="mt-[45px] ml-[15px]">
//             <View className="flex flex-row items-center">
//               <View>
//                 <WhiteEdumetricIcon width={30} height={30} />
//               </View>
//               <Text
//                 style={{fontSize: GetFontSize(13)}}
//                 className="w-[70%] ml-[10px] font-poppins500 text-[#0F2669] ">
//                 {question}
//               </Text>
//             </View>
//           </View>

//           {/* Answer section */}
//           <View className="h-full mt-4 flex items-center">
//             <View className="w-[85%] h-[60%] bg-[#FFFFFF] rounded-md">
//               <ScrollView style={{maxHeight: '70%'}}>
//                 <Text
//                   style={{fontSize: GetFontSize(12)}}
//                   className="mx-4 my-2 font-poppins400 ">
//                   {answer}
//                 </Text>
//               </ScrollView>
//             </View>
//           </View>
//         </View>
//       )}

//       <View className={`h-screen  bg-[#FFFFFF] ${completed && 'opacity-25'} `}>
//         <View className={`mt-[30px]  ${completed && 'opacity-15'} `}>
//           <View className="flex flex-row justify-start items-center ">
//             <TouchableOpacity
//               className="ml-4 flex flex-row justify-center items-center"
//               onPress={() => {
//                 navigation.goBack();
//               }}>
//               <LeftArrowIconBlue />
//               <Text
//                 style={{fontSize: GetFontSize(16)}}
//                 className="ml-3 font-poppins600 text-[#33569F]">
//                 Back
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Progress Bar */}
//         <View>
//           <View className="mt-[18px] border-b-[2px] border-[#007AFF1A] "></View>

//           <View
//             style={{width: `${((subIndex + 1) / totalSubTopics) * 100}%`}}
//             className="border-b-[2px] border-[#33569F] "></View>
//         </View>

//         {/* Summary */}
//         {showSummary && (
//           <View className="h-[80%] ">
//             {/* Summary */}
//             <View style={{width: screenWidth}}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setShowSummary(false);
//                 }}
//                 className="absolute right-5 top-5 ">
//                 <BlueCrossIcon width={25} height={25} />
//               </TouchableOpacity>

//               <View>
//                 <Text
//                   style={{
//                     fontSize: GetFontSize(20),
//                   }}
//                   className="font-poppins600 leading-[30px] mt-[27px] ml-[23px] text-[#06286E]">
//                   Summary
//                 </Text>
//               </View>

//               <View className="mt-4 ml-[23px]">
//                 {topicData.subTopic.summary.map((eachSummary, index) => (
//                   <View
//                     key={index}
//                     className=" flex flex-row justify-start  mt-2">
//                     <Text
//                       style={{fontSize: GetFontSize(14)}}
//                       className="text-[#010101] font-poppins500 mb-5 leading-[23px]">
//                       {index + 1}.
//                     </Text>
//                     <Text
//                       style={{fontSize: GetFontSize(14)}}
//                       className="text-[#010101] font-poppins500 leading-[23px] mr-[50px]  ">
//                       {eachSummary}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//             {/* Test Navigation */}
//             <CommonTest />
//           </View>
//         )}

//         {/* Title */}
//         <ScrollView
//           style={{maxHeight: '80%'}}
//           pagingEnabled={true}
//           horizontal={true}>
//           {showTalkingNotes && (
//             <View className="z-10 absolute w-screen h-[106%]">
//               <TouchableOpacity
//                 onPress={() => setShowTalkingNotes(false)}
//                 className="z-20 absolute top-9 right-9">
//                 <LightBlueCrossIcon size={30} />
//               </TouchableOpacity>

//               <TalkingNotes />
//             </View>
//           )}

//           {/* Data */}
//           <View style={{width: screenWidth}}>
//             <View className="mx-[27px] mt-[20px] flex flex-row justify-between">
//               <RenderHTML
//                 contentWidth={screenWidth}
//                 baseStyle={{
//                   fontSize: GetFontSize(22),
//                   fontFamily: 'Poppins-SemiBold',
//                   fontWeight: 600,
//                   lineHeight: 30,
//                   color: '#06286E',
//                   width: '68%',
//                 }}
//                 source={{html: topicData.topicTitle}}
//               />

//               {!showDictionary ? (
//                 <View className="flex flex-row gap-4 items-center">
//                   <TouchableOpacity
//                     onPress={() => {
//                       setShowSummary(true);
//                     }}>
//                     <BlueBgFileIcon />
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress={() => setShowDictionary(true)}>
//                     <YellowBgNotesIcon />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <TouchableOpacity onPress={() => setShowDictionary(false)}>
//                   <BlueCrossIcon />
//                 </TouchableOpacity>
//               )}
//             </View>

//             {/* Dictionary */}
//             {showDictionary && (
//               <View style={{width: screenWidth}}>
//                 <View className="border-b border-[#B4B4B4] ml-[23px] mr-[17px]">
//                   <Dictionary />
//                 </View>
//               </View>
//             )}

//             <ScrollView>
//               <View className="mt-[22px] ml-[27px] pr-[48px] ">
//                 <RenderHTML
//                   contentWidth={screenWidth}
//                   baseStyle={tagsStyles}
//                   source={{html: topicData.subTopic.subTopicData}}
//                 />
//               </View>

//               {/* Examples */}
//               <View>
//                 <Text
//                   style={{
//                     fontSize: GetFontSize(20),
//                   }}
//                   className="font-poppins600 leading-[30px] mt-2 ml-[27px] text-[#06286E]">
//                   {translatedExamples}:
//                 </Text>
//               </View>

//               <View className=" ml-[27px] mr-[48px] ">
//                 {topicData.subTopic.examples &&
//                   topicData.subTopic.examples.length > 0 && (
//                     <RenderHTML
//                       contentWidth={screenWidth}
//                       baseStyle={tagsStyles}
//                       source={{
//                         html: `<ul>${topicData.subTopic.examples
//                           .map(eachExample => `<li>${eachExample}</li>`)
//                           .join('')}</ul>`,
//                       }}
//                     />
//                   )}
//               </View>
//             </ScrollView>

//             {showTranslate && (
//               <View className="z-10 absolute bottom-0 ml-[15%] w-[90px]">
//                 <DropdownComponent onLanguageChange={handleLanguageChange} />
//               </View>
//             )}

//             {/* Next & Previous Button  */}
//             <View className="  bg-[#FFFFFF] ml-[37px] w-[75%] h-[75px] ">
//               <View 
//               style={{shadowColor: '#5A5A5A29'}}
//               className="rounded-[32px]  h-[63px] shadow-xl bg-[#FFFFFF] ">
//                 <View className="flex flex-row justify-between items-center h-full mx-[6px]">
//                   <TouchableOpacity
//                     onPress={() => {
//                       setSubIndex(prevIndex => prevIndex - 1);
//                       setLoading(true);
//                     }}
//                     className="w-[90px] h-[44px] rounded-full border-[1px] border-[#CEDEFF] ">
//                     <View className=" flex flex-row justify-center items-center gap-2 h-full">
//                       <LeftArrow width={15} height={15} />
//                       <Text
//                         style={{fontSize: GetFontSize(12)}}
//                         className="text-center tracking-[-0.3] font-inter500">
//                         Previous
//                       </Text>
//                     </View>
//                   </TouchableOpacity>

//                   {/* Total Sub Topics Text */}
//                   <Text
//                     style={{fontSize: GetFontSize(12)}}
//                     className="absolute text-center w-full font-poppins500">
//                     {subIndex + 1} / {totalSubTopics}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => {
//                       setSubIndex(prevIndex => prevIndex + 1);
//                       setLoading(true);
//                     }}
//                     className="w-[90px] h-[44px] rounded-full border-[1px] border-[#CEDEFF] bg-[#CEDEFF]">
//                     <View className="mx-5 flex flex-row justify-between items-center h-full">
//                       <Text
//                         style={{fontSize: GetFontSize(12)}}
//                         className="text-center tracking-[-0.3] font-inter500">
//                         Next
//                       </Text>
//                       <LeftArrow width={15} height={15} flip={true} />
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* FAQ */}
//           <View style={{width: screenWidth}}>
//             <Text
//               style={{fontSize: GetFontSize(20)}}
//               className=" font-poppins600 leading-[30px] text-[#06286E] mt-[27px] ml-[23px] ">
//               Must learn questions
//             </Text>

//             <View className="mt-4 ml-[23px] mr-4 ">
//               {topicData.subTopic.faq.map((eachFaq, index) => (
//                 <View
//                   key={index}
//                   className=" flex flex-row justify-between  mt-2">
//                   <Text
//                     style={{fontSize: GetFontSize(14)}}
//                     className="text-[#010101] font-poppins500 mb-5 leading-[23px]">
//                     {index + 1}.
//                   </Text>
//                   <Text
//                     style={{fontSize: GetFontSize(14)}}
//                     className="text-[#010101] font-poppins500 leading-[23px] w-[70%]  ">
//                     {eachFaq}
//                   </Text>

//                   <TouchableOpacity
//                     className="w-[82px] h-[26px] bg-[#EDF3FF] border-[2px] border-[#B4C6ED] rounded-full flex justify-center items-center "
//                     onPress={() => handleAnswer(eachFaq)}>
//                     <Text
//                       style={{fontSize: GetFontSize(12)}}
//                       className="font-inter700 text-[#33569F]">
//                       Answer
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>

//             {/* Test Navigation */}
//             <CommonTest />
//           </View>
//         </ScrollView>

//         {/* Bottom Navigation */}

//         <View className="absolute bg-[#FFFFFF] bottom-0 h-[70px] ml-[20px] mr-[29px] ">
//           <View className="h-full flex flex-row items-center gap-[15px]">
//             <TouchableOpacity
//               onPress={() => setShowTalkingNotes(!showTalkingNotes)}>
//               <TalkingNotesIcon />
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => setTranslate(!showTranslate)}>
//               <View className="w-[42px] h-[42px] bg-[#33569F] rounded-lg flex justify-center items-center">
//                 <Image
//                   source={require(`../../Images/png/LanguageIcon.png`)}
//                   className="w-[30px] h-[30px] "
//                   style={{resizeMode: 'contain'}}
//                 />
//               </View>
//             </TouchableOpacity>

//             <EyeSlashIcon />

//             <TouchableOpacity className="ml-[5px] h-[42px] bg-[#EDF3FF] w-[142px] border-[2px] rounded-[14px] border-[#B4C6ED] flex flex-row justify-center items-center">
//               <Text
//                 style={{fontSize: GetFontSize(12)}}
//                 className="font-inter700 text-[#33569F] text-center">
//                 Adaptive Tools
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const tagsStyles = {
//   color: '#292929',
//   fontSize: GetFontSize(16),
//   lineHeight: 24,
//   fontFamily: 'Poppins-Medium',
//   fontWeight: 500,
// };

// export default IndividualTopic;

// const CommonTest = () => {
//   return (
//     <View className="absolute bottom-0 bg-[#FFFFFF] ml-[37px] w-[75%] h-[65px] ">
//       <View 
//                     style={{shadowColor: '#5A5A5A29'}}
//       className="rounded-[32px] h-[50px] shadow-xl bg-[#FFFFFF] ">
//         <View className="flex flex-row justify-between items-center h-full mx-7">
//           <Text
//             style={{fontSize: GetFontSize(10)}}
//             className="font-poppins500 w-[50%] leading-[15px] tracking-[-0.03] ">
//             Ready to Test Your Understanding?
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               // setSubIndex(prevIndex => prevIndex + 1);
//               // setLoading(true);
//             }}
//             className="w-[85px] h-[34px] rounded-full border-[1px] border-[#CEDEFF] bg-[#CEDEFF]">
//             <View className="ml-2 flex flex-row items-center gap-1 h-full">
//               <Text
//                 style={{fontSize: GetFontSize(10)}}
//                 className="text-center tracking-[-0.3] font-inter500">
//                 Take the test
//               </Text>
//               <LeftArrow width={10} height={10} flip={true} />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
