import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import EdumetricIcon from '../../Images/svg/EdumetricIcon';
import GetFontSize from '../../Commons/GetFontSize';
import PaperClipIcon from '../../Images/svg/PaperClipIcon';
import API_URL from '../../Constants/API_URL';
import {useState, useRef, useEffect} from 'react';
import RenderHTML from 'react-native-render-html';
import getJwtToken from '../../Utils/getJwtToken';
// import {useNewAuth} from '../../Context/AuthContext';
import axios from 'axios';
import LeftArrow from '../../Images/svg/LeftArrow';
import {EdumetricLoading} from '../../Commons/EdumetricLoading';
import RNFS from 'react-native-fs';
// import DocumentPicker from 'react-native-document-picker';
import Toast, { ErrorToast } from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

function MathsEdumetric() {

  const BASE_URL = process.env.API_URL + '/api/v1/';
  const {width} = useWindowDimensions();
  // const {user} = useNewAuth();
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('maths');
  const uploaddoubtref = useRef(null);
  const [token, setToken] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('studentToken');
        setToken(jwtToken);
      } catch (error) {
        Toast.show({
          type:'error',
          text1: `Error: ${error.message || 'Something went wrong'}`,
        })
      }
    };
    fetchToken();
  }, []);

  //API CALL TO GET AI RESPONSE
  const HandleSend = async () => {
  setValue('maths');

  if (!sendMessage.trim()) {
    Toast.show({ type: 'error', text1: 'Chat is empty' });
    return;
  }

  const newMessage = { text: sendMessage, user: true };
  setMessages(prevMessages => [...prevMessages, newMessage]);
  setSendMessage('');
  setLoading(true);

  try {
    const response = await axios.post(
      'https://hyggex-backend-school-platform-dev-271594907587.us-central1.run.app/api/v1/student/chatbot-for-student',
      { text: sendMessage, value: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // response.data.response is likely a JSON string; parse it
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response.data.response);
    } catch (parseErr) {
      // console.error('Failed to parse JSON response:', parseErr);
      parsedResponse = null;
    }

    // Extract answer array or fallback
    const answers = parsedResponse?.result?.answer;

    // Join all answer parts into one HTML string
    const answerHtml = Array.isArray(answers) ? answers.join('') : '';

    if (!answerHtml) {
      Toast.show({ type: 'error', text1: 'No answer available from AI.' });
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { text: answerHtml || '<p>No answer provided.</p>', user: false },
    ]);
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Something went wrong' });
    // console.error(error);
  } finally {
    setLoading(false);
  }
};

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({animated: true});
    }
  };

  const handleUploaddoubtbutton = () => {
    uploaddoubtref.current.click();
  };
  const handleDoubtUpload = async () => {
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });
    await RNFS.readFile(file.uri, 'base64');

    const formData = new FormData();
    formData.append('file', file);
    setMessages(prevMessages => [
      ...prevMessages,
      {text: 'Solve my doubt', user: true},
    ]);
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}talking-note/solve-doubt`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(prevMessages => [
        ...prevMessages,
        {text: response.data.feedback, user: false},
      ]);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });

      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: 'Apologies! I’m unable to provide a response at the moment.',
          user: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const downloadPdf = () => {
    if (messages.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Chat is empty!!!',
      });

      return null;
    }
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width - 20; // Width for text wrapping with margin
    let yOffset = 10; // Start y position

    messages.forEach((msg, index) => {
      doc.setFontSize(12);
      let textColor = msg.user ? [0, 0, 255] : [0, 0, 0]; // Blue for user, black for bot
      let prefix = msg.user ? `${user.name} : ` : 'Edumetric  : ';

      // Convert HTML to plain text
      let plainText = htmlToText(msg.text, {
        wordwrap: 130, // Optional: control word wrapping
      });

      // Wrap text into multiple lines
      let wrappedText = doc.splitTextToSize(prefix + plainText, pageWidth);

      // Set text color and draw each line
      doc.setTextColor(...textColor);
      wrappedText.forEach(line => {
        doc.text(line, 10, yOffset);
        yOffset += 10; // Increment yOffset for next line
      });

      // Check if we need to add a new page
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 10; // Reset yOffset for the new page
      }
    });
    doc.save('Notes.pdf');
  };

  function cleanLatex(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '')         // Remove all backslashes
    .replace(/{/g, '')          // Remove {
    .replace(/}/g, '')          // Remove }
    .replace(/\^/g, '')         // Remove ^
    .replace(/_+/g, '')         // Remove underscores (for subscript)
    // Optionally more replacements here
    ;
}

  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
      
        >
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled" // Allows taps to bypass the keyboard
          >
            {messages.length == 0 && (
              <View>
                <View className="mt-[86%] flex flex-row items-center">
                  <View className="ml-6">
                    <EdumetricIcon size={38} bg={'#33569F'} star={'#B4C6ED'} />
                  </View>

                  <View className="ml-3">
                    <Text
                      style={{fontSize: GetFontSize(20)}}
                      className="mt-3  font-poppins500  text-[#000000] leading-snug">
                      Ask away—let's solve it
                    </Text>

                    <Text
                      style={{fontSize: GetFontSize(20)}}
                      className=" font-poppins500  text-[#000000] leading-snug">
                      together.
                    </Text>
                  </View>
                </View>

                <TextInput
                  value={sendMessage}
                  onChangeText={text => setSendMessage(text)}
                  multiline={true}
                  textAlignVertical="top"
                  className="mt-3 pb-[40px] mx-[18px] h-[160px] border-[2px] border-[#4D83F0] rounded-[10px] text-[#000000]"></TextInput>

                <View className="absolute bottom-2 w-screen px-[24px] flex flex-row justify-between items-center">
                  <TouchableOpacity onPress={() => handleDoubtUpload()}>
                    {/* <PaperClipIcon size={36} /> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => HandleSend()}
                    className="mr-1 w-[32px] h-[32px] bg-[#EDF3FF] rounded-full flex flex-row justify-center items-center ">
                    <LeftArrow width={20} height={20} flip={true}/>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {messages.length !== 0 && (
        <KeyboardAvoidingView
          behavior="padding"
          className="flex-1"
          keyboardVerticalOffset={20}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex justify-center items-center w-[50px] h-[50px] bg-[#dddddd33] rounded-full ml-4 mt-[16px] mb-[12px]">
            <LeftArrow width={25} height={25} />
          </TouchableOpacity>

          <ScrollView
            ref={messagesEndRef} // Attach the ref here
            className="h-[80%]">
            {messages.map((msg, index) =>
              msg.user ? (
                <View
                  key={index}
                  className="mt-5 flex flex-row justify-end mr-5">
                  <Text
                    style={{fontSize: GetFontSize(16)}}
                    className="font-poppins700 text-[#06286E] ml-[50px]">
                    {msg.text}
                  </Text>
                </View>
              ) : (
                <View className="mt-2 flex flex-row">
                  <View className="ml-5">
                    <EdumetricIcon size={25} bg={'#33569F'} star={'#B4C6ED'} />
                  </View>

                  <View className="ml-3 w-[70%] ">
                    <RenderHTML
                      contentWidth={width}
                      baseStyle={edumetric}
                      source={{html: cleanLatex(msg.text)}}
                    />
                  </View>
                </View>
              ),
            )}

            {/* Loading Indicator */}
            {loading && (
              <View className="h-[50px] inline-flex bg-white justify-start px-4 self-start rounded-2xl">
                <EdumetricLoading value={value} />
              </View>
            )}
          </ScrollView>

          <View className=" flex flex-row items-center">
          

            <View className="ml-3 w-[75%] bg-white h-[50px] border-[2px] border-[#4D83F0] rounded-[10px]">
              <TextInput
                value={sendMessage}
                onChangeText={text => setSendMessage(text)}
                multiline={true}
                className="text-[#06286E]"
              />
            </View>

            <TouchableOpacity
              onPress={() => HandleSend()}
              className="mx-2 w-[20%] h-[38px] bg-[#EDF3FF] rounded-[14px] flex justify-center ">
              <Text
                style={{fontSize: GetFontSize(13)}}
                className="font-inter700  text-[#33569F] text-center">
                Ask
              </Text>
            </TouchableOpacity> 
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
const edumetric = {
  color: '#06286E',
  fontSize: GetFontSize(14),
  fontFamily: 'Poppins-Regular',
  fontWeight: 400,
};
export default MathsEdumetric;

// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard
// } from 'react-native';
// import EdumetricIcon from '../../Images/svg/EdumetricIcon';
// import GetFontSize from '../../Commons/GetFontSize';
// import PaperClipIcon from '../../Images/svg/PaperClipIcon';
// import API_URL from '../../Constants/API_URL';
// import {useState, useRef, useEffect} from 'react';
// import RenderHTML from 'react-native-render-html';
// import getJwtToken from '../../Utils/getJwtToken';
// import LeftArrow from '../../Images/svg/LeftArrow';
// import {EdumetricLoading} from '../../Commons/EdumetricLoading';
// import {useNavigation} from '@react-navigation/native';
// import WhiteEdumetricIcon from '../../Images/svg/WhiteEdumetricIcon';
// import CrossFaq from '../../Images/svg/CrossFaq';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// function MathsEdumetric() {
//   // const BASE_URL = process.env.API_URL + '/api/v1/';
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuesAns, setSelectedQuesAns] = useState();
//   const [searchPerformed, setSearchPerformed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState('');
//   const [token, setToken] = useState(null);

//   const [explainPopUp, setExplainPopup] = useState(false);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const jwtToken = await AsyncStorage.getItem('studentToken');
//         setToken(jwtToken);
//       } catch (error) {
//         console.error('Failed to fetch token:', error);
//       }
//     };
//     fetchToken();
//   }, []);

//   const data = [
//     {
//       chapterId: '6716cd1f5a9260e498ef2e45',
//       question:
//         'Find the value of λ such that the three vectors \\( \\vec{a} = (2, -1, 1) \\), \\( \\vec{b} = (2, -3, 0) \\), and \\( \\vec{c} = (\\lambda, 3, 5) \\) are coplanar.',
//       answerType: 'stepwise',
//       answer: [
//         '<p><b>Step 1:</b> Use the condition for coplanarity: the scalar triple product of the vectors must be zero.</p>',
//         '<p><b>Step 2:</b> Set up the determinant of the vectors:</p> \\[\\begin{vmatrix} 2 & -1 & 1 \\\\ 2 & -3 & 0 \\\\ \\lambda & 3 & 5 \\end{vmatrix} = 0 \\]',
//         '<p><b>Step 3:</b> Expanding the determinant gives \\( \\lambda = \\frac{14}{3} \\).</p>',
//         '<p><b>Final Answer:</b> The value of \\( \\lambda \\) is \\( \\frac{14}{3} \\).</p>',
//       ],
//       createdAt: '2024-10-24T08:00:00Z',
//     },
//     {
//       chapterId: '6716cd1f5a9260e498ef2e45',
//       question:
//         'Find the magnitude of the cross product \\( 2\\hat{b} \\times \\vec{a} \\) where \\( \\hat{b} \\) is the unit vector in the direction of \\( \\vec{b} = \\hat{i} - 2\\hat{k} \\) and \\( \\vec{a} = 4\\hat{i} + 3\\hat{j} + \\hat{k} \\).',
//       answerType: 'stepwise',
//       answer: [
//         '<p><b>Step 1:</b> Find the unit vector \\( \\hat{b} \\): \\( \\hat{b} = \\frac{\\hat{i} - 2\\hat{k}}{\\sqrt{5}} \\).</p>',
//         '<p><b>Step 2:</b> Calculate \\( 2\\hat{b} \\): \\( 2\\hat{b} = 2 \\times \\frac{\\hat{i} - 2\\hat{k}}{\\sqrt{5}} \\).</p>',
//         '<p><b>Step 3:</b> Compute the cross product \\( 2\\hat{b} \\times \\vec{a} \\) using the determinant:</p> \\[ \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{2}{\\sqrt{5}} & 0 & \\frac{-4}{\\sqrt{5}} \\\\ 4 & 3 & 1 \\end{vmatrix} \\]',
//         '<p><b>Step 4:</b> The magnitude of the cross product is \\( \\frac{\\sqrt{504}}{5} \\).</p>',
//         '<p><b>Final Answer:</b> The magnitude of \\( 2\\hat{b} \\times \\vec{a} \\) is \\( \\frac{\\sqrt{504}}{5} \\).</p>',
//       ],
//       createdAt: '2024-10-24T08:00:00Z',
//     },
//     {
//       chapterId: '6716cd1f5a9260e498ef2e45',
//       question:
//         'Find the intervals in which \\( f(x) = \\sin x - \\cos x \\), where \\( 0 < x < 2\\pi \\), is increasing or decreasing.',
//       answerType: 'stepwise',
//       answer: [
//         "<p><b>Step 1:</b> Given function and its derivative:</p> \\( f(x) = \\sin x - \\cos x \\)<p>The derivative is:</p> \\( f'(x) = \\cos x + \\sin x \\)",
//         '<p><b>Step 2:</b> Find the critical points by setting the derivative equal to zero:</p> \\( \\cos x + \\sin x = 0 \\)<p>This simplifies to:</p> \\( \\tan x = -1 \\) <p>The solutions are:</p>\\( x = \\frac{3\\pi}{4}, \\frac{7\\pi}{4} \\)',
//         '<p><b>Step 3:</b> Analyze the intervals:</p><ul><li>\\( 0 < x < \\frac{3\\pi}{4} \\)</li><li>\\( \\frac{3\\pi}{4} < x < \\frac{7\\pi}{4} \\)</li><li>\\( \\frac{7\\pi}{4} < x < 2\\pi \\)</li></ul>',
//         "<p><b>Step 4:</b> Determine where the function is increasing and decreasing:</p><p>For \\( 0 < x < \\frac{3\\pi}{4} \\) and \\( \\frac{7\\pi}{4} < x < 2\\pi \\), \\( f'(x) > 0 \\) (increasing).</p><p>For \\( \\frac{3\\pi}{4} < x < \\frac{7\\pi}{4} \\), \\( f'(x) < 0 \\) (decreasing).</p>",
//         '<p><b>Final Answer:</b> The function increases on \\( (0, \\frac{3\\pi}{4}) \\cup (\\frac{7\\pi}{4}, 2\\pi) \\) and decreases on \\( (\\frac{3\\pi}{4}, \\frac{7\\pi}{4}) \\).</p>',
//       ],
//       createdAt: '2024-10-24T08:00:00Z',
//     },
//     {
//       chapterId: '6716cd1f5a9260e498ef2e45',
//       question:
//         'Find the points of local maxima or minima and corresponding values for the function \\( f(x) = x^4 - 62x^2 + 120x + 9 \\).',
//       answerType: 'stepwise',
//       answer: [
//         "<p><b>Step 1:</b> Given function and its derivative:</p>\\( f(x) = x^4 - 62x^2 + 120x + 9 \\)<p>The first derivative is:</p>\\( f'(x) = 4x^3 - 124x + 120 \\)",
//         '<p><b>Step 2:</b> Set the derivative equal to zero to find critical points:</p>\\( 4(x^3 - 31x + 30) = 0 \\)<p>The critical points are \\( x = 5, 1, -6 \\).</p>',
//         "<p><b>Step 3:</b> Compute the second derivative to classify these points:</p>\\( f''(x) = 12x^2 - 124 \\)",
//         "<p><b>Step 4:</b> Analyze the second derivative at the critical points:</p><ul><li>At \\( x = 5 \\), \\( f''(5) = 176 > 0 \\) (local minimum).</li><li>At \\( x = 1 \\), \\( f''(1) = -112 < 0 \\) (local maximum).</li><li>At \\( x = -6 \\), \\( f''(-6) = 308 > 0 \\) (local minimum).</li></ul><p>",
//         '<b>Step 5:</b> Compute function values at the critical points:</p><ul><li>At \\( x = 1 \\), \\( f(1) = 68 \\) (local maximum).</li><li>At \\( x = 5 \\), \\( f(5) = -316 \\) (local minimum).</li><li>At \\( x = -6 \\), \\( f(-6) = -1647 \\) (local minimum).</li></ul>',
//         '<p><b>Final Answer:</b> Local maximum at \\( x = 1 \\) with value 68. Local minima at \\( x = 5 \\) with value -316, and \\( x = -6 \\) with value -1647.</p>',
//       ],
//       createdAt: '2024-10-24T08:00:00Z',
//     },
//   ];

//   const handleSearch = () => {
//     Keyboard.dismiss()
//     setValue('');
//     setSearchPerformed(true);
//     const matchedQuestions = data.filter(ques =>
//       ques.question.toLowerCase().includes(query.toLowerCase()),
//     );
//     setQuestions(matchedQuestions);
//   };

//   const handleSelectQuestion = ques => {
//     setSelectedQuesAns(ques);
//     setQuestions([]);
//     setSearchPerformed(false);
//   };

//   const askEdumetric = async (userprompt, askingDoubt) => {
//     setQuery('');
//     setValue('');
//     setQuestions([]);
//     try {
//       if (askingDoubt) {
//         userprompt =
//           userprompt +
//           'Explain only this particular step further in more detail';
//       }
//       const response = await axios.post(
//         `https://hyggex-backend-school-platform-dev-271594907587.us-central1.run.app/api/v1/student/chatbot-for-student`,

//         {text: userprompt, value: 'maths'}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const fallbackAnswer = 'Sorry, no answer available at the moment.';

//       try {
//         const parsedResponse = JSON.parse(response.data.response);
//         const answer = parsedResponse?.result?.answer || fallbackAnswer;

//         if (!askingDoubt) {
//           setSelectedQuesAns({
//             question: userprompt,
//             answer: answer,
//           });
//         }

//         if (askingDoubt) {
//           setMessages(prevMessages => [
//             ...prevMessages,
//             {text: answer, user: false},
//           ]);
//         }
//       } catch (parseError) {
//         console.error('Error parsing JSON:', parseError);
//         if (!askingDoubt) {
//           setSelectedQuesAns({
//             question: userprompt,
//             answer: fallbackAnswer,
//           });
//         }
//         if (askingDoubt) {
//           setMessages(prevMessages => [
//             ...prevMessages,
//             {text: fallbackAnswer, user: false},
//           ]);
//         }
//       }
//     } catch (error) {
//         Toast.show({
//           type:'error',
//           text1:`Error: ${error.message || 'Something went wrong'}`
//         })      
      
//     } finally {
//       setLoading(false);
//       setSearchPerformed(false);
//     }
//   };

//   return (
//     <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
//       {/* Second Screen Answer from Edumetric */}
//       {selectedQuesAns ? (
//         <KeyboardAvoidingView
//           behavior="padding"
//           className="flex-1"
//           keyboardVerticalOffset={20}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             className="flex justify-center items-center w-[50px] h-[50px] bg-[#dddddd33] rounded-full ml-4 mt-[16px] mb-[12px]">
//             <LeftArrow width={25} height={25} />
//           </TouchableOpacity>

//           <ScrollView className="h-[80%]">
//             {selectedQuesAns.answer.map((ans, index) => (
//               <View className="relative " key={index}>
//                 <View className="mt-2 flex flex-row">
//                   <View className="ml-5">
//                     <EdumetricIcon size={25} bg={'#33569F'} star={'#B4C6ED'} />
//                   </View>

//                   <View style={{width: '65%'}} className="pl-3 ">
//                     <RenderHTML
//                       // tagsStyles={edumetric}
//                       baseStyle={edumetric}
//                       source={{html: ans}}
//                     />
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setExplainPopup(true);

//                       const newMessage = {text: ans, user: true};
//                       setMessages(prevMessages => [
//                         ...prevMessages,
//                         newMessage,
//                       ]);
//                       askEdumetric(ans, true);
//                     }}
//                     className="absolute mt-5 right-4 border border-[#0F266980] rounded-full">
//                     <Text className="text-[#0F266980] text-opacity-60 px-2 py-1 ">
//                       Explain
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}

//             {/* Popup explain */}
//             {explainPopUp && messages.length !== 0 && (
//               <View className="absolute z-100 w-full h-full ">
//                 {messages.map((msg, index) =>
//                   msg.user ? (
//                     <View
//                       key={index}
//                       className="absolute  mx-2 w-[96%] h-[350px] bg-[#EFF4FD] rounded-xl">
//                       {/* cross icon */}
//                       <View className="absolute top-[10px] right-[10px]">
//                         <TouchableOpacity
//                           onPress={() => {
//                             setMessages('');
//                             setExplainPopup(false);
//                           }}>
//                           <CrossFaq width={40} height={40} />
//                         </TouchableOpacity>
//                       </View>

//                       {/* question section */}
//                       <View className="mt-[45px] ml-[15px]">
//                         <View className="flex flex-row items-center ">
//                           <View className="">
//                             <WhiteEdumetricIcon width={30} height={30} />
//                           </View>
//                           <RenderHTML source={{html: msg.text.slice(0, 10)}} />
//                         </View>
//                       </View>

//                       {/* Answer section */}
//                       <View className="h-full mt-[23px] flex items-center">
//                         <View className="w-[85%] h-[50%] bg-[#FFFFFF] rounded-md ">
//                           <ScrollView style={{maxHeight: '70%'}}>
//                             <RenderHTML
//                               baseStyle={explain}
//                               source={{html: msg.text.slice(11, 10000)}}
//                             />
//                           </ScrollView>
//                         </View>
//                       </View>
//                     </View>
//                   ) : null,
//                 )}
//               </View>
//             )}

//             {loading && (
//               <View className="h-[50px] inline-flex bg-white justify-start px-4 self-start rounded-2xl                  <EdumetricLoading value={value} />
//               </View>
//             )}
//           </ScrollView>

//           {/* Bottom search bar */}
//           <View className=" flex flex-row items-center">
//             <View className="ml-3 w-[75%] bg-white h-[44px] border-[2px] border-[#4D83F0] rounded-[10px]">
//               <TextInput
//                 value={query}
//                 onChangeText={text => setQuery(text)}
//                 multiline={true}
//                 className="text-[#06286E]"
//               />
//             </View>

//             {/* Search from Edumetric */}
//             <TouchableOpacity
//               onPress={() => askEdumetric(query, false)}
//               className="ml-2 w-[68px] h-[38px] bg-[#EDF3FF] rounded-[14px] flex justify-center ">
//               <Text
//                 style={{fontSize: GetFontSize(13)}}
//                 className="font-inter700  text-[#33569F] text-center">
//                 Ask
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       ) : (
//         <View>
//           {loading && (
//             <View
//               className="w-screen h-screen bg-[#FFFFFF]"
//               keyboardVerticalOffset={20}>
//               <TouchableOpacity
//                 onPress={() => navigation.goBack()}
//                 className="flex justify-center items-center w-[50px] h-[50px] bg-[#dddddd33] rounded-full ml-4 mt-[16px] mb-[12px]">
//                 <LeftArrow width={25} height={25} />
//               </TouchableOpacity>

//               <View className="ml-6 h-[50px] inline-flex items-start">
//                 <EdumetricLoading value={value} />
//               </View>
//             </View>
//           )}

//           {/* Alert when not found in DB */}
//           {searchPerformed && questions.length === 0 && !selectedQuesAns && (
//             <View className="w-screen h-screen">
//               <View className="h-[200px] absolute bottom-0">
//                 <Text
//                   style={{fontSize: GetFontSize(16)}}
//                   className=" mx-3 text-center text-[#06286E]">
//                   We don't have this answer right now. Want our AI to try and
//                   solve it for you?
//                 </Text>

//                 <TouchableOpacity
//                   onPress={() => {
//                     setLoading(true);
//                     askEdumetric(query, false);
//                   }}
//                   className="mt-5 border border-[#5189FC] w-[136px] self-center rounded-xl h-[38px] flex items-center justify-center gap-2 bg-white">
//                   <Text className="text-[#5189FC]">Ask Edumetric</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           {/* First screen */}
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
//           <KeyboardAvoidingView
//         //  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         //           style={{ flex: 1 }}
//         >
//           <ScrollView
//             contentContainerStyle={{flexGrow: 1}}
//             keyboardShouldPersistTaps="handled" // Allows taps to bypass the keyboard
//           >
//               <View className="mt-[86%] flex flex-row items-center">
//                 <View className="ml-6 ">
//                   <EdumetricIcon size={38} bg={'#33569F'} star={'#B4C6ED'} />
//                 </View>

//                 <View className="ml-3">
//                   <Text
//                     style={{fontSize: GetFontSize(20)}}
//                     className="mt-3  font-poppins500  text-[#000000]">
//                     Ask away—let's solve it
//                   </Text>

//                   <Text
//                     style={{fontSize: GetFontSize(20)}}
//                     className=" font-poppins500  text-[#000000]">
//                     together
//                   </Text>
//                 </View>
//               </View>

//               <TextInput
//                 value={query}
//                 onChangeText={text => setQuery(text)}
//                 multiline={true}
//                 textAlignVertical="top"
//                 className="mt-3 pb-[40px] mx-[18px] h-[160px] border-[2px] border-[#4D83F0] rounded-[10px] text-[#000000]"></TextInput>

// <View className="absolute bottom-1 w-screen px-[20px] flex flex-row justify-between items-center">
// {/* <PaperClipIcon size={36} /> */}

//                 {/* Search in DB */}
//                 <TouchableOpacity
//                     onPress={() => handleSearch() }
//                     className="mr-1 w-[32px] h-[32px] bg-[#EDF3FF] rounded-full flex flex-row justify-center items-center ">
//                     <LeftArrow width={20} height={20} flip={true}/>
//                   </TouchableOpacity>
//               </View>

//           </ScrollView>
//             </KeyboardAvoidingView>

//             </TouchableWithoutFeedback>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const explain = {
//   marginHorizontal: 16,
//   marginTop: 16,
//   fontFamily: 'Poppins-Regular',
//   fontWeight: 400,
//   color: '#0F2669',
//   fontSize: GetFontSize(13),
// };

// const edumetric = {
//   fontSize: GetFontSize(14),
//   fontFamily: 'Poppins-Medium',
//   fontWeight: 500,
//   color: '#06286E',
//   lineHeight: 18,
// };

// export default MathsEdumetric;
