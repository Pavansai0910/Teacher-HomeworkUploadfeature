import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BlueCrossIcon from "../../../Images/svg/BlueCrossIcon";
import GetFontSize from "../../../Commons/GetFontSize";
export default function FourthBg() {
    return (
        <View className='w-full'>
            <View className="mt-[8%] mx-[5%] flex flex-row justify-between items-center">
                <View className="w-[120px] h-[36px] rounded-full bg-[#EDF5FF] flex flex-row justify-center items-center gap-2 ">
                    <AnimatedCircularProgress
                        size={20}
                        width={3}
                        fill={1 / 10 * 100}
                        tintColor={'#33569F'}
                        backgroundColor="#D9D9D9"
                        rotation={0}
                        lineCap="round"
                    />

                    <Text
                        style={{ fontSize: GetFontSize(11) }}
                        className="font-inter600  text-[#33569F]">
                        Question 1
                    </Text>
                </View>

                <BlueCrossIcon width={30} height={30} />

            </View>

        </View>
    )
}