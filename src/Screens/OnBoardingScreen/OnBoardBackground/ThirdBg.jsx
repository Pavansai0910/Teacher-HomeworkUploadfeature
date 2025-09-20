import { View, Text } from "react-native";
import GetFontSize from "../../../Commons/GetFontSize";
import LeftArrowIconBlue from "../../../Images/svg/LeftArrowIconBlue";
export default function ThirdBg() {
  return (
    <View className='w-full h-full '>
      <View className="mt-[30px]">
        <View className="flex flex-row justify-start items-center">
          <View
            className="ml-4 flex flex-row justify-center items-center "
          >
            <LeftArrowIconBlue />
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="ml-3 font-poppins600 text-[#33569F]">
              Social Science
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

      <View className="mt-[6%] px-[6%] flex flex-row justify-between">
        <Text
          style={{ fontSize: GetFontSize(18) }}
          className="text-[#06286E] font-poppins600">
          Tests
        </Text>

        <View
          className="h-[40px] px-2 flex flex-row items-center bg-[#E6F0FF] rounded-md">
          <Text
            style={{ fontSize: GetFontSize(12) }}
            className="text-[#5B77B0] font-inter700 line-clamp-1">
            All Status
          </Text>
        </View>
      </View>
    </View>
  )
}
