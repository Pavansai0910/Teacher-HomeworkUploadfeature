import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAssignment, resetAssignment } from '../store/Slices/assignment';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const profileStr = await AsyncStorage.getItem('teacherProfile');
        const profileObj = profileStr ? JSON.parse(profileStr) : null;
        setTeacherProfile(profileObj);

        if (profileObj?.assignments?.length > 0) {
          dispatch(setAssignment(profileObj.assignments[0]));
        }
      } catch (e) {
        setTeacherProfile(null);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  const updateProfile = async profile => {
    setIsAuthLoading(true);

    await AsyncStorage.setItem('loginDate', new Date().toISOString());
    await AsyncStorage.setItem('teacherProfile', JSON.stringify(profile));
    await AsyncStorage.setItem('teacherCount', JSON.stringify(profile.count));

    setTeacherProfile(profile);

    if (profile?.assignments?.length > 0) {
      dispatch(setAssignment(profile.assignments[0]));
    }

    setIsAuthLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('teacherProfile');
    await AsyncStorage.removeItem('teacherCount');
    await AsyncStorage.removeItem('loginDate');
    setTeacherProfile(null);
    dispatch(resetAssignment()); 
  };

  return (
    <AuthContext.Provider
      value={{ teacherProfile, updateProfile, logout, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
