import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import UserIcon from '../../Images/svg/UserIcon';
import NotificationIcon from '../../Images/svg/NotificationIcon';
import LanguageIcon from '../../Images/svg/LanguageIcon';
import PrivacyIcon from '../../Images/svg/PrivacyIcon';
import ReferralIcon from '../../Images/svg/ReferralIcon';
import SubscriptionIcon from '../../Images/svg/SubscriptionIcon';
import CommunityIcon from '../../Images/svg/CommunityIcon';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function Setting() {

  const {studentProfile} = useContext(AuthContext)
  const settingOptions = [
    'Personal Data',
    'Notifications',
    'Languages & Region',
    'Privacy',
    'Referral Code',
  ];

  const settingIcons = {
    'Personal Data': <UserIcon />,
    'Notifications': <NotificationIcon />,
    'Languages & Region': <LanguageIcon />,
    'Privacy': <PrivacyIcon />,
    'Referral Code': <ReferralIcon />,
  };

  const navigateScreen = {
    'Personal Data':'PersonalData',
    'Notifications':'Notifications',
    'Languages & Region':'LanguagesAndRegion',
    'Privacy':'Privacy',
    'Referral Code':'ReferralCode'
  } 

  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <View className="ml-4 mt-5 flex-row justify-start items-center ">
        <Image
          source={require(`../../Images/png/avatar.png`)}
          className="w-[18%] "
        />
        <View className="ml-[6px]">
          <Text
            style={{fontSize: GetFontSize(20)}}
            className="font-inter600 text-black tracking-[-0.55] leading-none ">
            {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          </Text>
          <Text
            style={{fontSize: GetFontSize(10)}}
            className="font-inter400 text-[#979797] tracking-[-0.45] leading-none">
            Class {studentProfile.classId.className}
          </Text>
        </View>
      </View>

      {/* Line */}
      <View className="mt-4 mx-4">
        <View className="h-[1px] bg-[#0000001A]"></View>
      </View>

      <View>

        {settingOptions.map((eachOption, index)=> (
          
          <TouchableOpacity 
          onPress={()=> navigation.navigate(`${navigateScreen[eachOption]}`)}
          key={index}
          className="mt-5 flex flex-row justify-between items-center ">
          <View className="flex flex-row items-center gap-4">
            <View className="ml-5 w-[30px] h-[30px] rounded-[4px] bg-[#E3ECF9] flex justify-center items-center">
              {settingIcons[eachOption]}
            </View>

            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#000000] tracking-[-0.2]">
              {eachOption}
            </Text>
          </View>

          <View className="mr-[32px]">
            <LeftArrowIconBlue flip={true} />
          </View>
        </TouchableOpacity>
      ))}

        <TouchableOpacity 
          className="mt-5 flex flex-row justify-between items-center ">
          <View className="flex flex-row items-center gap-4">
            <View className="ml-5 w-[30px] h-[30px] rounded-[4px] bg-[#E3ECF9] flex justify-center items-center">
            <SubscriptionIcon />
            </View>

            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#000000]">
              Subscriptions
            </Text>
          </View>

          <View className="mr-[32px]">
            <LeftArrowIconBlue flip={true} />
          </View>
        </TouchableOpacity>

 {/* Line */}
      <View className="mt-5 mx-4">
        <View className="h-[1px] bg-[#0000001A]"></View>
      </View>

        <TouchableOpacity 
          className="mt-5 flex flex-row justify-between items-center ">
          <View className="flex flex-row items-center gap-4">
            <View className="ml-5 w-[30px] h-[30px] rounded-[4px] bg-[#E3ECF9] flex justify-center items-center">
            <CommunityIcon />
            </View>

            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#000000]">
              Community
            </Text>
          </View>

          <View className="mr-[32px]">
            <LeftArrowIconBlue flip={true} />
          </View>
        </TouchableOpacity>
        
            
      </View>
    </SafeAreaView>
  );
}

export default Setting;
