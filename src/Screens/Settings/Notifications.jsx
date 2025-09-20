import { View, Text, TouchableOpacity, Switch} from 'react-native';
import LeftArow from '../../Images/svg/LeftArrow';
import GetFontSize from '../../Commons/GetFontSize';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function Notifications() {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [weeklyNewsletter, setWeeklyNewsletter] = useState(false);

  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">

      <View className="mt-[40px] flex flex-row items-center ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute ml-5">
          <LeftArow width={30} height={30} />
        </TouchableOpacity>

        <View className="inline-flex justify-center items-center w-screen">
          <Text
            style={{fontSize: GetFontSize(15)}}
            className="font-inter600 text-[#000000] tracking-[-0.5]">
            Notifications
          </Text>
        </View>
      </View>

        
        <View className='mt-[68px] ml-[43px] mr-[39px] flex flex-row justify-between'>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
        Push Notifications
        </Text>

        <View>
        <Switch 
        value={pushNotifications}
        onValueChange={()=> setPushNotifications(!pushNotifications)}
        trackColor={{false:'#E6E6E7' , true:'#ACCFFF'}}
        thumbColor='#33569F'
        />
        </View>

      </View>

         {/* Line 1 */}
      <View className="mt-4 mx-6">
        <View className="h-[1px] bg-[#0000001A]"></View>
            
      </View>

      <View className='mt-6 ml-[43px] mr-[39px] flex flex-row justify-between'>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
        Email Notifications
        </Text>

        <View>
        <Switch 
        value={emailNotifications}
        onValueChange={()=> setEmailNotifications(!emailNotifications)}
        trackColor={{false:'#E6E6E7' , true:'#ACCFFF'}}
        thumbColor='#33569F'
        />
        </View>

      </View>

         {/* Line 2 */}
      <View className="mt-4 mx-6">
        <View className="h-[1px] bg-[#0000001A]"></View>
            
      </View>

      <View className='mt-6 ml-[43px] mr-[39px] flex flex-row justify-between'>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
        Weekly Newsletter
        </Text>

        <View>
        <Switch 
        value={weeklyNewsletter}
        onValueChange={()=> setWeeklyNewsletter(!weeklyNewsletter)}
        trackColor={{false:'#E6E6E7' , true:'#ACCFFF'}}
        thumbColor='#33569F'
        />
        </View>

      </View>

         {/* Line 3 */}
      <View className="mt-4 mx-6">
        <View className="h-[1px] bg-[#0000001A]"></View>
            
      </View>

    </SafeAreaView>
  );
}

export default Notifications;
