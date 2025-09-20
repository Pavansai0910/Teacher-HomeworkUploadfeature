// import { useState, useCallback, useEffect } from 'react';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import { Platform } from 'react-native';
// import RNFS from 'react-native-fs';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const useAudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioPath, setAudioPath] = useState(null);
//   const [permissionGranted, setPermissionGranted] = useState(false);

//   useEffect(()=> {
//     checkPermission();
//   })

//   const checkPermission = useCallback(async () => {
//     if (Platform.OS === 'android') {
//       const permissionsToCheck = [
//         PERMISSIONS.ANDROID.RECORD_AUDIO,
//         // PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//         // PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//       ];
  
//       let allGranted = true;
  
//       for (const permission of permissionsToCheck) {
//         const status = await check(permission);
  
//         if (status === RESULTS.GRANTED) {
//           continue; // Permission already granted
//         } else if (status === RESULTS.DENIED) {
//           const requestStatus = await request(permission);
//           if (requestStatus !== RESULTS.GRANTED) {
//             allGranted = false;
//           }
//         } else if (status === RESULTS.BLOCKED) {
//           // Permission is blocked; guide the user to app settings
//           console.warn(
//             `Permission ${permission} is blocked. Please enable it in the app settings.`
//           );
//           allGranted = false;
//         }
//       }
  
//       setPermissionGranted(allGranted);
//     } else {
//       // iOS permission handling
//       const microphoneStatus = await check(PERMISSIONS.IOS.MICROPHONE);
//       if (microphoneStatus === RESULTS.GRANTED) {
//         setPermissionGranted(true);
//       } else {
//         const requestStatus = await request(PERMISSIONS.IOS.MICROPHONE);
//         if (requestStatus === RESULTS.GRANTED) {
//           setPermissionGranted(true);
//         } else {
//           console.warn('Microphone permission is required');
//           setPermissionGranted(false);
//         }
//       }
//     }
//   }, []);
  
    
//   const ensureDirectoryExists = async (path) => {
//     const exists = await RNFS.exists(path);
//     if (!exists) {
//       await RNFS.mkdir(path);
//     }
//   };
  
//   const startRecording = useCallback(async () => {
//     if (!permissionGranted) {
//       console.warn(` Permissions not granted`);
//       return;
//     }
  
//     try {
//       const androidPath = `${RNFS.CachesDirectoryPath}/audio`;
//       await ensureDirectoryExists(androidPath);
  
//       const path = Platform.select({
//         ios: 'recording.m4a',
//         android: `${androidPath}/recording.mp4`,
//       });
  
//       setIsRecording(true);
//       const uri = await audioRecorderPlayer.startRecorder(path);
//       setAudioPath(uri);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//       setIsRecording(false);
//     }
//   }, [permissionGranted]);
  
    
//   const stopRecording = useCallback(async () => {
//     if (!isRecording) return null;

//     try {
//       const result = await audioRecorderPlayer.stopRecorder();
//       setIsRecording(false);
//       setAudioPath(result);
//       return result;
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//       setIsRecording(false);
//       return null;
//     }
//   }, [isRecording]);

//   return {
//     isRecording,
//     startRecording,
//     stopRecording,
//     audioPath,
//   };
// };

// export default useAudioRecorder;

