
import { View, Text, TouchableOpacity } from "react-native";
import GetFontSize from "../../../Commons/GetFontSize";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateStudentOnboarding } from "../../../Services/StudentAPIV1";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
export default function Card6({ width, height, setIsFifth, setIsSixth }) {

  const cardHeight = height * 0.22
  const navigation = useNavigation();
  const { studentProfile } = useContext(AuthContext)

  async function studentOnboarding() {
    try {
      const response = await updateStudentOnboarding({
        studentId: studentProfile._id,
      });
      await AsyncStorage.setItem("studentCount", "true");
      navigation.replace("MainTabNavigator");
    } catch (error) {
      await AsyncStorage.setItem("studentCount", "true");
    }
  }

  return (
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
              Submit & Finish 🎉
            </Text>

            <View className='mt-2'>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className='font-inter500 text-[#525252]'
              >
                Done with your test? Just hit Submit and you're all set. Good luck!
              </Text>
            </View>

          </View>
          <View className="absolute w-[85%] m-[6%] bottom-2 flex flex-row items-center justify-between">
            <Text
              style={{ fontSize: GetFontSize(11) }}
              className="text-[#6A6A6A] ">
              6 of 6
            </Text>

            <View className='flex flex-row'>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: GetFontSize(12) }}
                  onPress={() => {
                    setIsFifth(true);
                    setIsSixth(false);
                  }}
                  className="mr-4 px-4 py-2 text-[#8F8F8F] rounded-md border border-[#B8B7B736]"
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: GetFontSize(12) }}
                  onPress={studentOnboarding}
                  className="px-4 py-2 bg-[#34569E] text-white rounded-md font-inter400"
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
