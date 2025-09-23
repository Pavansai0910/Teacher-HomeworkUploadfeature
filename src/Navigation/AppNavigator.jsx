import React, { useContext, useEffect, useState } from 'react';
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {AuthProvider, useNewAuth} from './Context/AuthContext';
import { AuthContext } from '../Context/AuthContext';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import GetStartedScreen from '../Screens/GetStarted/GetStartedScreen';
import OnBoarding from '../Screens/OnBoardingScreen/OnBorading';
import GeneralAndStressEdumetric from '../Screens/Edumetric/GeneralAndStressEdumetric';
import MathsEdumetric from '../Screens/Edumetric/MathsEdumetric';
import MainTabNavigator from '../Navigation/MainTabNavigator';
import Loader from '../Commons/Loader';
import LearningGap from '../Screens/LearningGaps/LearningGap';
import LearningGapReport from '../Screens/LearningGaps/LearningGapReport';
import SelfAssessmentTip from '../Screens/SelfAware/SelfAssessmentTip';
import SelfAwareTest from '../Screens/SelfAware/SelfAwareTest';
import SelfAwareResult from '../Screens/SelfAware/SelfAwareResult';
import LGATestScreen from '../Screens/LGA/LGATestScreen';
import Setting from '../Screens/Settings/Setting';
// import IndividualTopic from '../Screens/Notes/IndividualTopic';
import PersonalData from '../Screens/Settings/PersonalData';
import Notifications from '../Screens/Settings/Notifications';
import LanguagesAndRegion from '../Screens/Settings/LanguagesAndRegion';
import Privacy from '../Screens/Settings/Privacy';
import ReferralCode from '../Screens/Settings/ReferralCode';
import NewEnglishUI from '../Screens/LearningSubjects/EnglishNotes';
import AllTests from '../Screens/LGA/AllTests';
import SubjectWiseProgress from '../Screens/SubjectwiseProgess/SubjectwiseProgress';
import { versionChecker } from '../Services/StudentAPIV1';
import GetFontSize from '../Commons/GetFontSize';
import checkAuthentication from '../Utils/logout';

const Stack = createNativeStackNavigator();

// const createAutoTask = async () => {
//   const userString = await AsyncStorage.getItem('user');
//   const user = userString ? JSON.parse(userString) : null;
//   const userId = user ? user._id : null;

//   if (!userId) {
//     console.error('User ID not found in await AsyncStorage.');
//     return;
//   }

//   // Get the current date in YYYY-MM-DD format
//   const today = new Date().toISOString().split('T')[0];

//   // Check if the task has already been created today
//   const lastRunDate = await AsyncStorage.getItem('lastAutoTaskRunDate');
//   if (lastRunDate === today) {
//     // console.log("Auto task creation already executed today.");
//     return;
//   }

//   try {
//     const response = await axios.post(`${API_URL}/api/v1/calendar/autotask`, {
//       userId, // Send userId in the request body
//     });

//     // console.log("Auto task created successfully:", response.data);

//     // Update the last run date in await AsyncStorage
//     await AsyncStorage.setItem('lastAutoTaskRunDate', today);
//   } catch (error) {
//     console.error(
//       'Error creating auto task:',
//       error.response ? error.response.data : error.message,
//     );
//   }
// };

// // Call the function wherever necessary
// createAutoTask();

function AppNavigator() {
  const { studentProfile, isAuthLoading, logout } = useContext(AuthContext);
  // const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  // useEffect(() => {
    
  //   const checkVersion = async () => {
  //     try {
  //         const version = await versionChecker({
  //           studentId: studentProfile?._id,
  //           // versionNumber:process.env.APP_VERSION
  //           versionNumber:"1.24.0"
  //         })
  //         console.log("response",version.data);
  //         if(version.data.updateRequired === true) {
  //           setShowUpdatePopup(true)
  //         }else {
  //           setShowUpdatePopup(false)
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  
  //     checkVersion()
  //   }, []); 
  
  if (isAuthLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Loader />
      </View>
    );
  }

  const isAuthenticated = !!studentProfile;

  // if(showUpdatePopup) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: '#000000',
  //       }}>
  //       <Text className="text-white"
  //       style={{fontSize:GetFontSize(16)}}
  //       >Update App</Text>
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainTabNavigator"
              component={MainTabNavigator}
            />
             {/* <Stack.Screen name="IndividualTopic" component={IndividualTopic} /> */}
            <Stack.Screen name="NewEnglishUI" component={NewEnglishUI} />

            <Stack.Screen name="AllTests" component={AllTests} />

            <Stack.Screen
              name="SubjectWiseProgress"
              component={SubjectWiseProgress}
            />

            <Stack.Screen
              name="LearningGapReport"
              component={LearningGapReport}
            />
            <Stack.Screen name="LGATestScreen" component={LGATestScreen} />

            <Stack.Screen
              name="GeneralAndStressEdumetric"
              component={GeneralAndStressEdumetric}
            />
            <Stack.Screen name="MathsEdumetric" component={MathsEdumetric} />

            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="SelfAwareResult" component={SelfAwareResult} />
            <Stack.Screen name="SelfAwareTest" component={SelfAwareTest} />
            <Stack.Screen name="LearningGap" component={LearningGap} />
            <Stack.Screen
              name="SelfAssessmentTip"
              component={SelfAssessmentTip}
            />

            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="PersonalData" component={PersonalData} />
            <Stack.Screen name="ReferralCode" component={ReferralCode} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen
              name="LanguagesAndRegion"
              component={LanguagesAndRegion}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="GetStartedScreen"
              component={GetStartedScreen}
            />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;