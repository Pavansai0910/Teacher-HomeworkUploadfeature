import { View, Text, TouchableOpacity} from 'react-native';
import LeftArow from '../../Images/svg/LeftArrow';
import GetFontSize from '../../Commons/GetFontSize';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LanguagesAndRegion() {
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
            Language & Region
          </Text>
        </View>
      </View>

      <View className='ml-[43px] mr-[24px] mt-[70px] flex flex-row justify-between'>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
          Language
        </Text>

        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter400 text-[#000000] tracking-[-0.5]">
          English
        </Text>

      </View>

      {/* Line */}
      <View className="mt-4 mx-4">
        <View className="h-[1px] bg-[#33569F1A]"></View>
      </View>

      <View className='ml-[43px] mr-[24px] mt-6 flex flex-row justify-between'>
        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter600 text-[#000000] tracking-[-0.5]">
          Country
        </Text>

        <Text
          style={{fontSize: GetFontSize(15)}}
          className="font-inter400 text-[#000000] tracking-[-0.5]">
          India
        </Text>

      </View>
      
      {/* Line */}
      <View className="mt-4 mx-4">
        <View className="h-[1px] bg-[#33569F1A]"></View>
      </View>

    </SafeAreaView>
  );
}

export default LanguagesAndRegion;
