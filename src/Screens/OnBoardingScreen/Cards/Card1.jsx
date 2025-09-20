import { View, Text, TouchableOpacity } from "react-native";
import GetFontSize from "../../../Commons/GetFontSize";
export default function Card1({ width, height, setIsFirst, setIsSecond }) {
  const cardHeight = height * 0.22
  return (
    <View className="flex flex-row w-screen justify-center">
      <View
        style={{ width: width * 0.83, height: cardHeight }}
        className="relative rounded-xl ">
        <View
          style={{ height: cardHeight }}
          className=" bg-white rounded-xl shadow-lg border-2 border-[#2D4B8A]">
          <View className="m-[6%]">
            <Text
              style={{ fontSize: GetFontSize(15) }}
              className="text-left text-[#34569E] font-inter600 ">
              Welcome to Tests 🎯
            </Text>

            <View className='mt-2'>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className='font-inter500 text-[#525252]'
              >
                Here's the place where all your subject-wise tests will appear. Let's see how it works!.
              </Text>
            </View>
          </View>

          <View className="absolute w-[85%] m-[6%] bottom-2 flex flex-row items-center justify-between">
            <Text
              style={{ fontSize: GetFontSize(11) }}
              className="text-[#6A6A6A] ">
              1 of 6
            </Text>
            <TouchableOpacity>
              <Text
                style={{ fontSize: GetFontSize(12) }}
                onPress={() => {
                  setIsFirst(false);
                  setIsSecond(true);
                }}
                className="px-4 py-2 bg-[#34569E] text-white rounded-md font-inter400"
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
