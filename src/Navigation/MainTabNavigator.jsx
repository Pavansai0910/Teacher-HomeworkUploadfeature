import { StyleSheet, View, Pressable, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Subject from '../Screens/AllSubject/Subject';
import HomeIcon from '../Images/svg/HomeIcon';
import SelfAwareIcon from '../Images/svg/SelfAwareIcon';
import AtoZIcon from '../Images/svg/AtoZIcon';
import EdumetricIcon from '../Images/svg/EdumetricIcon';
import CalendarIcon from '../Images/svg/CalendarIcon';
import SelfAware from '../Screens/SelfAware/SelfAware';
import HomeScreen from '../Screens/Homescreen/HomeScreen';
import Edumetric from '../Screens/Edumetric/Edumetric';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Commons/Loader';
import ImprovementPlan from '../Screens/ImprovementPlan/ImprovementPlan';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import { studentLoginEvent } from '../Services/StudentAPIV1';
// import Calendar from '../Screens/Calendar/Calendar';
// import PracticeTest from '../Screens/Practice/PracticeTest';
// import AllTests from '../Screens/LGA/AllTests';
// import AllChapterScreen from '../Screens/AllSubject/AllChapterScreen';
// import EachChapterList from '../Screens/AllSubject/EachChaptersList';
// import LearningGapTopics from '../Screens/AllSubject/LearningGapTopics';
// import OptionsForChapters from '../Screens/AllSubject/OptionsForChapters';
// import ChapterTopics from '../Screens/Notes/ChapterTopics';
// import Flashcard from '../Screens/Flashcards/Flashcard';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      {/* <Stack.Screen name="ImprovementPlan" component={ImprovementPlan} /> */}
    </Stack.Navigator>
  );
}

function EdumetricStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Edumetric" component={Edumetric} />
    </Stack.Navigator>
  );
}

function SubjectStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Subject" component={Subject} />
      {/* <Stack.Screen name="AllTests" component={AllTests} /> */}
      {/* <Stack.Screen name="AllChapterScreen" component={AllChapterScreen} />
      <Stack.Screen name="EachChapterList" component={EachChapterList} />
      <Stack.Screen name="OptionsForChapters" component={OptionsForChapters} />
      <Stack.Screen name="Flashcard" component={Flashcard} />
      <Stack.Screen name="ChapterTopics" component={ChapterTopics} />
      <Stack.Screen name="PracticeTest" component={PracticeTest} />
      <Stack.Screen name="LearningGapTopics" component={LearningGapTopics} /> */}
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  const [loading, setLoading] = useState(true);
  const iconSize = width > 500 ? 40 : 30; // 40px for larger screens, 30px otherwise
  const centerIconSize = width > 500 ? 55 : 45;
  const { width } = useWindowDimensions(); // Get the screen width
  const { studentProfile } = useContext(AuthContext)
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await AsyncStorage.getItem("studentCount");
        if (count === 'false') {
          navigation.replace('OnBoarding');
        }
        setLoading(false);
      } catch (error) {
        // console.error('Error fetching flag from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }

    };
    fetchCount();
  }, []);

    async function loginEvent() {
      try {
        const response = await studentLoginEvent({
          studentId: studentProfile?._id,
        });
  
        // Store the current date (YYYY-MM-DD format) when API was called
        const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem('studentlastLoginEventDate', today);
      } catch (error) {
        // console.error(error);
      }
    }
  
    const shouldCallApi = async() => {
      const lastCallDate = await AsyncStorage.getItem('studentlastLoginEventDate');
      const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  
      if (!lastCallDate) {
        return true; // First time calling
      }
  
      // Check if the current date is different from the last call date
      return lastCallDate !== today;
    };


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
  

  if (loading) {
    return (
        <Loader />
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
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={null}>
            {props.children}
          </Pressable>
        ),

      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeBackground,
              ]}>
              <HomeIcon size={iconSize} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SelfAware"
        component={SelfAware}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeBackground,
              ]}>
              <SelfAwareIcon size={iconSize} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Subjects"
        component={SubjectStack}
        options={{
          tabBarIcon: () => <AtoZIcon size={centerIconSize} />,
        }}
      />
      <Tab.Screen
        name="EdumetricStack"
        component={EdumetricStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeBackground,
              ]}>
              <EdumetricIcon bg={'#979797'} star={'#FFFFFF'} size={iconSize} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ImprovementPlan"
        component={ImprovementPlan}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeBackground,
              ]}>
              <CalendarIcon size={iconSize} />
            </View>
          ),
        }}
      />
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
});
