import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';
import SignInScreen from '../Screens/Auth/SignInScreen';
import GetStartedScreen from '../Screens/GetStartedScreen';
import Loader from '../Commons/Loader';
import checkAuthentication from '../Utils/logout';
import Home from '../Screens/Home/Home';
import AssignTest from '../Screens/Home/AssignTest';
import LessonPlanner from '../Screens/Home/LessonPlanner';
import MainTabNavigator from './MainTabNavigator';
import StudentsInsights from '../Screens/Home/StudentsInsights';
import Settings from '../Screens/Settings/Settings';
import LessonPlanTopics from '../Screens/Home/LessonPlanTopics';
import AssignTestTopics from '../Screens/Home/AssignTestTopics';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { teacherProfile, isAuthLoading, logout } = useContext(AuthContext);

  useEffect(() => {
    const checkSessionValidity = async () => {
      // Use your checkAuthentication function
      const isValid = await checkAuthentication();
      if (!isValid) {
        // Call the logout function from your AuthContext
        await logout();
      }
    };
    checkSessionValidity();
  }, [logout]);

  if (isAuthLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Loader />
      </View>
    );
  }

  const isAuthenticated = !!teacherProfile;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainTabNavigator"
              component={MainTabNavigator}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LessonPlanner" component={LessonPlanner} />
            <Stack.Screen name="LessonPlanTopics" component={LessonPlanTopics} />
            <Stack.Screen name="AssignTest" component={AssignTest} />
            <Stack.Screen name="StudentsInsights" component={StudentsInsights} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AssignTestTopics" component={AssignTestTopics} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="GetStartedScreen"
              component={GetStartedScreen}
            />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
