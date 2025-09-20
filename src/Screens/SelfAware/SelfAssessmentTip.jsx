import { Text, TouchableOpacity, View } from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import BlueCrossIcon from '../../Images/svg/BlueCrossIcon';
import { useNavigation } from '@react-navigation/native';
import GreenClock from '../../Images/svg/GreenClock';
import BlueFileIcon from '../../Images/svg/BlueFileIcon';
import YellowBulb from '../../Images/svg/YellowBulb';
import {SafeAreaView} from 'react-native-safe-area-context';
function SelfAssessmentTip({ route }) {
  const navigation = useNavigation()

  const icons = [<GreenClock />, <BlueFileIcon />, <YellowBulb />]

  const titles = [
    'Choose your answers in just minutes',
    'No paperwork required',
    'Personalize your study approach',
  ];

  const description = [
    'Select options that reflect your academic behaviors and challenges. Quick and easy!',
    'Select options that reflect your academic behaviors and challenges. Quick and easy!',
    'Select options that reflect your academic behaviors and challenges. Quick and easy!',
  ];

  const buttonText = ['Fast', 'Seamless', 'Efficient'];
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="mx-[20px]">

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='mt-[25%] flex items-end mr-6'
        >
          <BlueCrossIcon width={30} height={30} />
        </TouchableOpacity>

        <View>
          <Text
            style={{ fontSize: GetFontSize(24) }}
            className="font-inter700 text-[#33569F] mt-[10%]">
            Boost your Self-Awareness with our quick assessment
          </Text>
        </View>

        <View className="mt-6">
          {titles.map((eachTitle, index) => (
            <View
              key={index}
              className="mb-5 h-[100px] border-[1px] border-[#33569F21] rounded-lg">

              <View className='flex flex-row items-end '>
                <View className='ml-[12px]'>
                  {icons[index]}
                </View>

                <View className="flex flex-row">
                  <Text
                    style={{ fontSize: GetFontSize(13)}}
                    className=" font-inter700 ml-[10px] mt-[22px] text-[#000000]">
                    {eachTitle}
                  </Text>

                  <View className="mt-[22px] ml-[8px] bg-[#33569F21] border-[2px] border-[#33569F21] py-[1px] px-[6px] rounded-full ">
                    <Text
                      style={{ fontSize: GetFontSize(10)}}
                      className="font-inter500 tracking-[-0.6]">
                      {buttonText[index]}
                    </Text>
                  </View>
                </View>

              </View>

              <Text
                style={{ fontSize: GetFontSize(11)}}
                className="mt-2 ml-[42px] font-inter500 text-[#00000047] mr-[20px]">
                {description[index]}
              </Text>
            </View>
          ))}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SelfAwareTest", {
              selfAssessmentId: route.params.selfAssessmentId
            }
            )}
            className="mt-2 h-[70px] bg-[#1D5AD5] border-[1px] border-[#33569F] rounded-[18px] flex justify-center">
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className='font-poppins500 text-[#FFFFFF] text-center'
            >Start Assessment </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

export default SelfAssessmentTip;
