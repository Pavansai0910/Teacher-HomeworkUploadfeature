import {  View, Text, TouchableOpacity } from 'react-native';
import EdumetricIcon from '../../Images/svg/EdumetricIcon';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
function Edumetric() {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="relative w-full h-full bg-[#ffffff]">

      <View className='absolute bottom-0 w-full'>

        <View className="ml-4">
          <EdumetricIcon size={50} bg={'#33569F'} star={'#B4C6ED'} />
        </View>

        <View>
          <Text
            style={{ fontSize: GetFontSize(20) }}
            className="mt-3 ml-7 font-poppins500 text-[#000000] leading-tight">
            How can we assist you
          </Text>

          <Text
            style={{ fontSize: GetFontSize(20) }}
            className="ml-7 font-poppins500 text-[#000000] leading-tight">
            today?
          </Text>
        </View>

        <View className="flex items-end pr-3 ">
          <TouchableOpacity
            onPress={() => navigation.navigate('MathsEdumetric')}
            className="py-2 mt-5 w-[74%] border-[2px] border-[#4D83F0] rounded-[18px] flex items-center">
            <View>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mt-2 font-poppins600 text-[#4D83F0]">
                Struggling with a formula, concept
              </Text>

              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mb-2 font-poppins600 text-[#4D83F0]">
                or calculation?
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('GeneralAndStressEdumetric', {
              type: 'stress'
            })}
            className="py-2 mt-3 w-[74%] border-[2px] border-[#4D83F0] rounded-[18px] flex items-center">
            <View>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mt-2 font-poppins600 text-[#4D83F0]">
                Need to boost your confidence or
              </Text>

              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mb-2 font-poppins600 text-[#4D83F0]">
                talk through worries?
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('GeneralAndStressEdumetric', {
              type: 'gen'
            })}
            className="py-2 mt-3 mb-[56px] w-[74%] border-[2px] border-[#4D83F0] rounded-[18px] flex items-center">
            <View>
              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mt-2 font-poppins600 text-[#4D83F0]">
                Have a question about a general
              </Text>

              <Text
                style={{ fontSize: GetFontSize(13) }}
                className="ml-[18px] mr-2 mb-2 font-poppins600 text-[#4D83F0]">
                topic?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Edumetric;
