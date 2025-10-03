import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  Text,
  Modal,
  Linking,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeIcon from '../Images/svg/HomeIcon';
// import SelfAwareIcon from '../Images/svg/SelfAwareIcon';
// import AtoZIcon from '../Images/svg/AtoZIcon';
import { AuthContext } from '../Context/AuthContext';
import LeaderBoard from '../Screens/LeaderBoard/LeaderBoard';
import YourStats from '../Screens/Stats/YourStats';
import Home from '../Screens/Home/Home';
import HomeIcon from '../Images/Home/HomeIcon';
import ScanIcon from '../Images/Home/ScanIcon';
import BarGraphIcon from '../Images/Home/BarGraphIcon';
import { versionChecker, teacherLoginEvent } from '../Services/teacherAPIV1';
import GetFontSize from '../Commons/GetFontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  const { width } = useWindowDimensions(); // Get the screen width
  const iconSize = width > 500 ? 40 : 30; // 40px for larger screens, 30px otherwise
  const [loading, setLoading] = useState(true);
  const { teacherProfile } = useContext(AuthContext);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const selectedAssignment = useSelector(
      (state) => state.assignment.selectedAssignment
    );
  
    async function loginEvent() {
    try {
      const response = await teacherLoginEvent({
        teacherId: teacherProfile?._id,
        classId: selectedAssignment?.classId?._id,
        subjectId: selectedAssignment?.subjectId?._id,
        sectionId: selectedAssignment?.sectionId?._id,

      });
      // Store the current date (YYYY-MM-DD format) when API was called
      const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem('teacherlastLoginEventDate', today);
    } catch (error) {
      // console.error(error);
    }
  }

  const shouldCallApi = async () => {
    const lastCallDate = await AsyncStorage.getItem('teacherlastLoginEventDate');
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    if (!lastCallDate) {
      return true; // First time calling
    }

    // Check if the current date is different from the last call date
    return lastCallDate !== today;
  };

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const version = await versionChecker({
          teacherId: teacherProfile?._id,
          newdownloaded: true,
          versionNumber: process.env.APP_VERSION
        })
        if (version.data?.updateRequired === true) {
          setShowUpdatePopup(true)
        } else {
          setShowUpdatePopup(false)
        }
      } catch (error) {
        setShowUpdatePopup(true)
      }
    };

    checkVersion()
  }, []);

  useEffect(() => {
    // Set timeout to call API after 2 minutes (120000 ms)
    const timer = setTimeout(() => {
      if (shouldCallApi()) {
        loginEvent();
      }
    }, 120000); // 2 minutes

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  // if (loading) {
  //   return (
  //     <ActivityIndicator size="large" color="#06286E" />
  //   );
  // }

  if (showUpdatePopup) {
    return (
      <Modal
        visible={showUpdatePopup}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You are using old version of App </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={() => {
                  const externalUrl = "https://adaptmate.in/download"; // 🔗 replace with your link
                  Linking.openURL(externalUrl).catch(err =>
                    console.error("Failed to open link", err)
                  );
                }}
              >
                <Text style={styles.buttonText}>Please Update App</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: '10%',
          paddingTop: 15,
          backgroundColor: '#FFFFFF',
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        animationEnabled: false,
        tabBarButton: props => (
          <Pressable {...props} android_ripple={null}>
            {props.children}
          </Pressable>
        ),
      }}t
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <HomeIcon size={iconSize} />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="YourStats"
        component={YourStats}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <ScanIcon size={iconSize} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <BarGraphIcon size={iconSize} />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, // Circular shape
    backgroundColor: 'transparent', // Default background
  },
  activeBackground: {
    backgroundColor: '#E2E8F5', // Active tab background color
  },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: GetFontSize(18),
    fontFamily: 'inter600',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#33569F',
  },
  noButton: {
    backgroundColor: '#4682B4',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'inter600',
    fontSize: GetFontSize(16),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingBottom: '25%',
  },
  modalContentCenter: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalOption: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#33569F',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 36,

    // box-shadow: 0px 4px 4px 0px #00000040;
  },
  modalOptionText: {
    fontSize: GetFontSize(16),
    fontFamily: 'poppins500',
    color: '#FFF',
    textAlign: 'center',
  },
});

