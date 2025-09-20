import { View, Text, TouchableOpacity} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { SafeAreaView } from 'react-native-safe-area-context';

function LearningGap({route}) {
  return (
    <SafeAreaView className="relative w-full h-full bg-white">
      <View className="mx-[24px]">

        <View className="mt-[40px] w-[94px] h-[32px] rounded-full bg-[#EDF5FF] flex flex-row justify-center items-center ">
          <Text
            style={{fontSize: GetFontSize(10)}}
            className="font-inter600 text-[#33569F]">
            Question
          </Text>
        </View>

        <View className="mt-[40px]">
          <Text
            style={{fontSize: GetFontSize(17)}}
            className=" font-inter700 text-[#33569F]">
            Which account shows the profit or loss sharing ratio among partners
            in a partnership?{' '}
          </Text>
        </View>
    

      <View className="mt-[40px]">
        <View className="h-[350px] rounded-[21px] bg-[#33569F08] border border-[#E7EFFF] flex justify-between py-4">
          <TouchableOpacity
            className={`h-[70px]  border border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#33569F] mx-[12px]">
              A
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`h-[70px]  border border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#33569F] mx-[12px]">
              A
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`h-[70px] border border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#33569F] mx-[12px]">
              A
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`h-[70px] border border-[#E7EFFF] rounded-[22px] mx-4 flex flex-row justify-start items-center`}>
            <Text
              style={{fontSize: GetFontSize(14)}}
              className="font-inter600 text-[#33569F] mx-[12px]">
              A
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
    //Button section
      <View className="absolute bottom-0 w-full h-[100px] border-t-[0.2px] border-[#979797] ">
        <View className="h-full flex flex-row justify-between items-center mx-[22px]">
          <TouchableOpacity className="w-[112px] h-[52px] bg-[#EDF3FF] border-[2px] border-[#B4C6ED] rounded-[14px] flex justify-center ">
            <Text
              style={{fontSize: GetFontSize(17)}}
              className="text-center font-inter700 text-[#33569F]">
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[112px] h-[52px] bg-[#EDF3FF] border-[2px] border-[#B4C6ED] rounded-[14px] flex justify-center ">
            <Text
              style={{fontSize: GetFontSize(17)}}
              className="text-center font-inter700 text-[#33569F]">
              Check
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default LearningGap;
