import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load profile once on app start
  useEffect(() => {
    (async () => {
      try {
        const profileStr = await AsyncStorage.getItem("studentProfile");
        setStudentProfile(profileStr ? JSON.parse(profileStr) : null);
      } catch (e) {
        setStudentProfile(null);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  // Method to update the context and AsyncStorage
  const updateProfile = async (profile) => {
    setIsAuthLoading(true);
        await AsyncStorage.setItem("loginDate", new Date().toISOString());
    await AsyncStorage.setItem("studentProfile", JSON.stringify(profile));
    setStudentProfile(profile);
    await AsyncStorage.setItem("studentCount", JSON.stringify(profile.count));
    setIsAuthLoading(false);
  };

  // On logout, clear context and storage
  const logout = async () => {
    await AsyncStorage.removeItem("studentProfile");
    await AsyncStorage.removeItem("studentCount");
        await AsyncStorage.removeItem("loginDate"); 
    setStudentProfile(null);
  };

  return (
    <AuthContext.Provider value={{ studentProfile, updateProfile, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
