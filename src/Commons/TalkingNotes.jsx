// import React, {useEffect} from 'react';
// import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
// import useTalkingNotes from '../Hooks/useTalkingNotes';
// import Toast from 'react-native-toast-message';
// import MicIcon from '../Images/svg/MicIcon';
// import Animations from './Animations';
// import GetFontSize from './GetFontSize';
// import PausedButton from '../Images/svg/PausedButton';
// import PlayButton from '../Images/svg/PlayButton';

// const TalkingNotes = () => {

//   const {
//     isRecording,
//     uploadStatus,
//     responseAudioUrl,
//     isPlaying,
//     hasPlayed,
//     error,
//     toggleRecording,
//     togglePlayPause,
//     responseText,
//   } = useTalkingNotes();

//   useEffect(() => {
//     if (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Something went wrong! Please try again later',
//       });
//     }
    
//   }, [error]);
      
//   return (

//     <View className="w-full h-full ">
//       <View className="w-screen z-20 absolute top-[30%] ">
//         {isRecording ? (
//           <Animations />
//         ) : uploadStatus === 'Uploading' ? (
//         <View className='flex items-center'>
//           <Image
//             source={require(`../Images/png/LoadingIcon.png`)}
//             className="w-16 h-16 bg-blue-500 rounded-full animate-spin"
//           />
//         </View>
//         ) : null}
//       </View>

//       <View className="m-[18px] h-[90%] bg-[#EFF4FD] rounded-xl overflow-hidden">
        
//         <AudioControl
//           responseAudioUrl={responseAudioUrl}
//           isPlaying={isPlaying}
//           togglePlayPause={togglePlayPause}
//           isRecording={isRecording}
//           uploadStatus={uploadStatus}
//           toggleRecording={toggleRecording}
//           pauseplayposition="md:top-5 md:right-10 right-2 top-2"
//         />

//         {responseText && (
//           <View className="w-[96%] absolute bottom-1 mx-2 bg-white h-[38%] rounded-xl">
//             <View className="mx-[15px] mt-[20px] mb-[15px] ">
//               <ScrollView className="p-2 bg-[#5189FC1A] rounded-xl">
//                 <Text
//                   style={{fontSize: GetFontSize(12)}}
//                   className="font-poppins400 text-[#0F2669] tracking-[-0.1] ">
//                   {responseText}
//                 </Text>
//               </ScrollView>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>

//   );
// };

// const AudioControl = ({
//   isRecording,
//   uploadStatus,
//   responseAudioUrl,
//   isPlaying,
//   toggleRecording,
//   togglePlayPause,
//   pauseplayposition,
// }) => (
//   <View className="mt-[87%] flex items-center ">

//     {uploadStatus === 'Uploading' ? (
//       'Loading'
//     ) : (
//       <TouchableOpacity onPress={toggleRecording}>
//         <MicIcon size={50} />
//       </TouchableOpacity>
//     )}

//     {responseAudioUrl && (

//       <TouchableOpacity
//         onPress={togglePlayPause}
//         className={`absolute ${pauseplayposition}`}
//       >
//           {isPlaying ? <PausedButton /> : <PlayButton /> }
//       </TouchableOpacity>
//     )}

//     <View>
//       <Text>
//         {isRecording && 'Recording...'}
//         {!isRecording && uploadStatus !== 'Uploading' && 'Speak Here'}
//         {uploadStatus === 'Uploading' && 'Loading...'}
//       </Text>
//     </View>
//   </View>
// );

// export default TalkingNotes;
