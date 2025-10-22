import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { initializeChapterStore } from "./store/Slices/chapterSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './Context/AuthContext';
// import { SoundProvider } from './Context/SoundContext';
import AppNavigator from './Navigation/AppNavigator';
import NetworkInfo from './Network/NetworkInfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import * as Clarity from '@microsoft/react-native-clarity';
import { SafeAreaView } from 'react-native-safe-area-context';

function AppContent() {
  const dispatch = useDispatch();
  const [teacherProfile, setTeacherProfile] = useState(null);

  const selectedAssignment = useSelector(
    (state) => state.assignment.selectedAssignment
  );

  const classId = selectedAssignment?.classId?._id;
  const subjectId = selectedAssignment?.subjectId?._id;
  const sectionId = selectedAssignment?.sectionId?._id;
  const boardId = teacherProfile?.schoolId?.boardId;

  // Load teacherProfile from AsyncStorage once
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('teacherProfile');
        if (storedProfile) {
          setTeacherProfile(JSON.parse(storedProfile));
        }
      } catch (err) {
        console.error('Error loading teacherProfile:', err);
      }
    };
    loadProfile();
  }, []);

  // Dispatch chapters when dependencies change
  useEffect(() => {
    if (teacherProfile && classId && subjectId && boardId) {
      dispatch(initializeChapterStore());
    }
  }, [dispatch, teacherProfile, classId, subjectId, boardId, sectionId]);

  return (
    <>
      <NetworkInfo />
      <AppNavigator />
      <Toast />
    </>
  );
}

function App() {

  const ClarityProjectId = process.env.PROJECT_ID

  useEffect(() => {
    Clarity.initialize(ClarityProjectId, {
      logLevel: Clarity.LogLevel.None, 
    });
  }, []); 

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              {/* <SoundProvider> */}
              <AppContent />
              {/* </SoundProvider> */}
            </AuthProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
