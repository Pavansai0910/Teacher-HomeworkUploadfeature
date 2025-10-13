// import { AppState } from 'react-native';
// import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
// import Sound from 'react-native-sound';

// export const SoundContext = createContext({
//   playClickSound: () => {},
//   soundLoaded: false,
// });

// const SOUND_FILE = 'button_click.wav';
// // const DESIRED_VOLUME = 0.05;

// export const SoundProvider = ({ children }) => {
//   const soundRef = useRef(null);
//   const [soundLoaded, setSoundLoaded] = useState(false);

//   const loadSound = useCallback((callback) => {
//     // If already loaded, use existing sound
//     if (soundRef.current) {
//       callback && callback(soundRef.current);
//       return;
//     }

//     Sound.setCategory('Playback');

//     const sound = new Sound(SOUND_FILE, Sound.MAIN_BUNDLE, (error) => {
//       if (error) {
//         console.error('❌ Failed to load sound:', error);
//         setSoundLoaded(false);
//         return;
//       }

//       // sound.setVolume(DESIRED_VOLUME);
//       soundRef.current = sound;
//       setSoundLoaded(true);
//       console.log('✅ Sound loaded globally');

//       if (callback) callback(sound);
//     });
//   }, []);

//   useEffect(() => {
//     loadSound();

//     const subscription = AppState.addEventListener('change', (nextAppState) => {
//       if (nextAppState === 'active' && !soundRef.current) {
//         console.log('🔁 Reloading sound on app resume');
//         loadSound();
//       }
//     });

//     return () => {
//       subscription.remove();
//       // ⚠️ Don't release here — we want to persist across screens
//     };
//   }, [loadSound]);

//   const playClickSound = useCallback(() => {
//     console.log('🔊 Attempting to play click sound');
//     const sound = soundRef.current;

//     if (!sound) {
//       console.warn('⚠️ Sound not ready, reloading...');
//       loadSound((newSound) => {
//         newSound.play((success) => {
//           if (!success) console.warn('⚠️ Fallback play failed after reload');
//         });
//       });
//       return;
//     }

//     try {
//       sound.stop(() => {
//         sound.setCurrentTime(0);
//         sound.play((success) => {
//           if (!success) {
//             console.warn('⚠️ Playback failed — reloading sound');
//             soundRef.current = null;
//             setSoundLoaded(false);
//             loadSound((newSound) => newSound.play());
//           }
//         });
//       });
//     } catch (err) {
//       console.error('❌ Sound play error:', err);
//       soundRef.current = null;
//       loadSound((newSound) => newSound.play());
//     }
//   }, [loadSound]);

//   return (
//     <SoundContext.Provider value={{ playClickSound, soundLoaded }}>
//       {children}
//     </SoundContext.Provider>
//   );
// };

// export const useSound = () => useContext(SoundContext);
