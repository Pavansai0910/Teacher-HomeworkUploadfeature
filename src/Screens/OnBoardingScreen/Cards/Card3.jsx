import { View, Text, Image, TouchableOpacity } from "react-native";
import GetFontSize from "../../../Commons/GetFontSize";
export default function Card3({ width, height, setIsSecond, setIsThird, setIsFourth }) {
    const cardHeight = height * 0.22
    return (
        <View className='flex flex-col w-screen h-screen justify-end items-center'>
            <Image
                source={require('../../../Images/png/onc3.png')}
                resizeMode='contain'
                style={{ width: width * 0.83, height: '50%' }}
            />
            <View className="flex flex-row w-screen justify-center">
                <View
                    style={{ width: width * 0.83, height: cardHeight }}
                    className="relative rounded-xl mb-10">
                    <View
                        style={{ height: cardHeight }}
                        className="relative bg-white rounded-xl shadow-lg border-2 border-[#2D4B8A]">
                        <View className="m-[6%]">
                            <Text
                                style={{ fontSize: GetFontSize(15) }}
                                className="text-left text-[#34569E] font-inter600 ">
                                Check Your Tests ✅
                            </Text>

                            <View className='mt-2'>
                                <Text
                                    style={{ fontSize: GetFontSize(13) }}
                                    className='font-inter500 text-[#525252]'
                                >
                                    See all your tests here. Assigned, Submitted, and Due. Never miss a deadline again!
                                </Text>
                            </View>

            </View>
          <View className="absolute w-[85%] m-[6%] bottom-2 flex flex-row items-center justify-between">
                                <Text
                                    style={{ fontSize: GetFontSize(11) }}
                                    className="text-[#6A6A6A] ">
                                    3 of 6
                                </Text>


                                <View className='flex flex-row'>
                                    <TouchableOpacity>
                                        <Text
                                            style={{ fontSize: GetFontSize(12) }}
                                            onPress={() => {
                                                setIsSecond(true);
                                                setIsThird(false);
                                            }}
                  className="mr-4 px-4 py-2 text-[#8F8F8F] rounded-md border border-[#B8B7B736]"
                                        >
                                            Back
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text
                                            style={{ fontSize: GetFontSize(12) }}
                                            onPress={() => {
                                                setIsFourth(true);
                                                setIsThird(false);
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
            </View>
        </View>
    )
}
