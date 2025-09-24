import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load profile once on app start
  useEffect(() => {
    (async () => {
      try {
        const profileStr = await AsyncStorage.getItem("teacherProfile");
        setTeacherProfile(profileStr ? JSON.parse(profileStr) : null);
      } catch (e) {
        setTeacherProfile(null);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  // Method to update the context and AsyncStorage
  const updateProfile = async (profile) => {
    setIsAuthLoading(true);
        await AsyncStorage.setItem("loginDate", new Date().toISOString());
    await AsyncStorage.setItem("teacherProfile", JSON.stringify(profile));
    setTeacherProfile(profile);
    await AsyncStorage.setItem("teacherCount", JSON.stringify(profile.count));
    setIsAuthLoading(false);
  };

  // On logout, clear context and storage
  const logout = async () => {
    await AsyncStorage.removeItem("teacherProfile");
    await AsyncStorage.removeItem("teacherCount");
    await AsyncStorage.removeItem("loginDate");
    setTeacherProfile(null);
  };

  return (
    <AuthContext.Provider value={{ teacherProfile, updateProfile, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
