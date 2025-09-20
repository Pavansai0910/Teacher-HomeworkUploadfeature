// import React,{ useState, useCallback } from 'react';
// import useAudioRecorder from './useAudioRecorder';
// import useAudioPlayer from './useAudioPlayer';
// import useAudioUpload from './useAudioUpload';

// const useTalkingNotes = () => {
//   const [error, setError] = useState(null);

//   const {
//     isRecording,
//     startRecording,
//     stopRecording,
//   } = useAudioRecorder();

//   const {
//     uploadAudio,
//     uploadStatus,
//     responseAudioUrl,
//     responseText,
//     error: uploadError,
//   } = useAudioUpload();

//   const {
//     isPlaying,
//     hasPlayed,
//     togglePlayPause,
//   } = useAudioPlayer(responseAudioUrl);

//   const toggleRecording = useCallback(async () => {
//     try {
//       if (isRecording) {
//         const blob = await stopRecording();
//         if (blob) {
//           await uploadAudio(blob);
//         }
//       } else {
//         await startRecording();
//       }
//     } catch (err) {
//       console.error('Error in toggleRecording:', err.message);
//       setError(err.message || 'An error occurred');
//     }
//   }, [isRecording, startRecording, stopRecording, uploadAudio]);

//   return {
//     isRecording,
//     uploadStatus,
//     responseAudioUrl,
//     responseText,
//     isPlaying,
//     hasPlayed,
//     error,
//     toggleRecording,
//     togglePlayPause,
//   };
// };

// export default useTalkingNotes;

