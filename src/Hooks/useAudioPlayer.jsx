// import React, {useState, useEffect} from 'react';
// import Sound from 'react-native-sound';

// const useAudioPlayer = audioUrl => {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [hasPlayed, setHasPlayed] = useState(false);
//   const [audio, setAudio] = useState(null);
  
//   useEffect(() => {
//     if (audioUrl) {
//       const sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
//         if (error) {
//           console.error('Failed to load sound', error);
//           return;
//         }
//         setAudio(sound);
//         setHasPlayed(false);
//         sound.play(() => {
//           setIsPlaying(false);
//           setHasPlayed(true);
//         });
//       });

//       return () => {
//         sound.release();
//       };
//     }
//   }, [audioUrl]);

//   const togglePlayPause = () => {
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play(() => {
//         setIsPlaying(false);
//         setHasPlayed(true);
//       });
//       setIsPlaying(true);
//     }
//   };

//   return {isPlaying, hasPlayed, togglePlayPause};
// };

// export default useAudioPlayer;
