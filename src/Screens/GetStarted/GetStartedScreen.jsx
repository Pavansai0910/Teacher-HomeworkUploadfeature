import { View, Text, useWindowDimensions, Image } from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';
import StartLearningIcon from '../../Images/svg/StartLearningIcon';
import SwipeButton from 'rn-swipe-button';
import AdaptmateLogoWhitePng from '../../Images/png/AdaptmateLogoWhite.png';
import { SafeAreaView } from 'react-native-safe-area-context';

function GetStartedScreen() {

  const navigation = useNavigation()
  const { height } = useWindowDimensions()

  const buttonHeight = height * 0.08
  const handleSwipeSuccess = () => {
    navigation.replace("SignInScreen")
  };

  return (
    <SafeAreaView className="relative w-screen h-screen bg-[#33569F]">
      <View className="absolute mt-[85px] w-screen items-center">
        <View className=' w-full h-[6vh]'>
          <Image
            source={AdaptmateLogoWhitePng}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            className=''
          />
        </View>
      </View>
      <View className="justify-center items-center h-full">
        <Text
          style={{ fontSize: GetFontSize(30) }}
          className="text-[#ECEAEA] font-inter600 leading-tight">
          Why study?
        </Text>
        <Text
          style={{ fontSize: GetFontSize(30) }}
          className="text-[#ECEAEA] font-inter600 leading-tight">
          Because your
        </Text>
        <Text>
          <Text
            style={{ fontSize: GetFontSize(30) }}
            className="text-[#FFDC5D] font-inter600 leading-tight">
            dreams{' '}
          </Text>
          <Text
            style={{ fontSize: GetFontSize(30) }}
            className="text-[#ECEAEA] font-inter600 leading-tight">
            deserve it
          </Text>
        </Text>
      </View>

      <View
        className="absolute bottom-[10%] w-screen items-center">
        <View className=" w-[84%] rounded-[1000px] bg-white">

          <SwipeButton
            style={{ width: '100%' }}
            thumbIconComponent={StartLearningIcon}
            thumbIconBackgroundColor="#06286E"
            railBackgroundColor="#FFFFFF"
            railFillBackgroundColor="rgba(0, 0, 0, 0)"
            railFillBorderColor="rgba(0, 0, 0, 0)"
            onSwipeSuccess={handleSwipeSuccess}
            height={buttonHeight}
            titleFontSize={16}
            title='Slide to Start >>>'
            titleColor='#06286E'
            titleStyles={{
              fontFamily: 'inter500',
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: buttonHeight
            }}
          />
        </View>

      </View>

      <View className="absolute bottom-[2%] w-screen items-center">
        <Text
          style={{ fontSize: GetFontSize(10) }}
          className="text-white text-center">Version 1.0.0</Text>
      </View>

    </SafeAreaView>

  );
}

export default GetStartedScreen;
