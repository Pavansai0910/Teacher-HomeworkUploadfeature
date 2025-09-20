import { View, Text, TouchableOpacity} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import LeftArow from '../../Images/svg/LeftArrow';
import RewardIcon from '../../Images/svg/RewardIcon';
import CommunityIcon from '../../Images/svg/CommunityIcon';
import HandShakeIcon from '../../Images/svg/HandShakeIcon';
import CoinIcon from '../../Images/svg/CoinIcon';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ReferralCode() {
  const navigation = useNavigation();

  const heading = ['Invite a Friend', 'They Subscribe', 'You Both Earn'];

  const subHeading = [
    'Share your unique referral link with friends.',
    'Once your friend completes their subscription (monthly or annual), you’ve got a successful referral!',
    'As soon as the subscription is confirmed, you and your friend each receive 100EP in rewards.',
  ];

  const rewardsIcon = {
    'Invite a Friend': <CommunityIcon />,
    'They Subscribe': <HandShakeIcon />,
    'You Both Earn': <CoinIcon />,
  };
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
            className="font-inter600 text-[#000000] tracking-[-0.2]">
            Refer your Friends
          </Text>
        </View>
      </View>

      <View className="mt-4 flex items-center ">
        <Text
          style={{fontSize: GetFontSize(20)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
          Earn 100 EP each
        </Text>
      </View>

      <View className="mt-7 mx-5 h-[100px] border border-[#00000040] rounded-[10px] flex justify-center">
        <View className="flex flex-row items-center">
          <View className="ml-2">
            <RewardIcon />
          </View>

          <View className="mx-4">
            <Text
              style={{fontSize: GetFontSize(20)}}
              className="font-inter600 text-[#979797] tracking-[-0.5]">
              Total Rewards
            </Text>

            <View className="mt-1 flex flex-row items-baseline">
              <Text
                style={{fontSize: GetFontSize(32)}}
                className="font-inter600 text-[#000000] tracking-[-0.5]  leading-[33px] ">
                300
              </Text>

              <Text
                style={{fontSize: GetFontSize(16)}}
                className="font-inter600 text-[#000000] tracking-[-0.5]">
                EP
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-5 inline-flex justify-center items-center w-screen">
        <Text
          style={{fontSize: GetFontSize(20)}}
          className="font-inter600 text-[#000000] tracking-[-0.2]">
          Your unique link
        </Text>
      </View>

      <View className="mt-4 mx-5 h-[70px] border border-[#00000040] rounded-[10px] flex justify-center"></View>

      <View className="mt-3 mx-5 bg-[#ACCFFF1A]  rounded-[10px]">

        <View className="mt-1 my-7">
          {heading.map((eachHeading, index) => (

            <View 
            key={index}
            className="mt-7 flex flex-row ">
              <View className="ml-7 w-[30px] h-[30px] rounded-[4px] bg-[#E3ECF9] flex justify-center items-center">
            {rewardsIcon[eachHeading]}
              </View>

              <View className="ml-4 ">
                <Text
                  style={{fontSize: GetFontSize(14)}}
                  className="font-inter500 text-[#000000] tracking-[-0.5]">
                  {eachHeading}
                </Text>

                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="w-[230px] font-inter400 text-[#000000] tracking-[-0.5]">
                  {subHeading[index]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ReferralCode;
