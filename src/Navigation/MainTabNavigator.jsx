import {
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeIcon from '../Images/svg/HomeIcon';
// import SelfAwareIcon from '../Images/svg/SelfAwareIcon';
// import AtoZIcon from '../Images/svg/AtoZIcon';

import LeaderBoard from '../Screens/LeaderBoard/LeaderBoard';
import YourStats from '../Screens/Stats/YourStats';
import Home from '../Screens/Home/Home';
import HomeIcon from '../Images/Home/HomeIcon';
import ScanIcon from '../Images/Home/ScanIcon';
import BarGraphIcon from '../Images/Home/BarGraphIcon';

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
      }}
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
      <Tab.Screen
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
