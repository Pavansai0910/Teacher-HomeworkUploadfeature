import { View, Text } from "react-native";
import GetFontSize from "../../../Commons/GetFontSize";
export default function Secondbg() {
  return (
    <View className="mt-[9%]">
      <Text
        style={{ fontSize: GetFontSize(30) }}
        className="ml-[9%] text-[#33569F] font-poppins400 leading-tight">
        Let's check
      </Text>
      <Text
        style={{ fontSize: GetFontSize(30) }}
        className="ml-[9%] text-[#33569F] font-poppins700 leading-tight">
        your understanding
      </Text>
    </View>
  )
}

