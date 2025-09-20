import { View, Text, Image, TouchableOpacity} from 'react-native';
import LeftArow from '../../Images/svg/LeftArrow';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function PersonalData() {
  const {studentProfile} = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <SafeAreaView className="w-full h-full bg-[#FFFFFF]">
      <View className="mt-[40px] flex flex-row items-center ">

        <TouchableOpacity 
        onPress={()=> navigation.goBack() }
        className="absolute ml-5">
          <LeftArow width={30} height={30} />
        </TouchableOpacity>

        <View className="inline-flex justify-center items-center w-screen">
          <Text
            style={{fontSize: GetFontSize(15)}}
            className="font-inter600 text-[#000000] tracking-[-0.2]">
            Personal Data
          </Text>
        </View>
      </View>

      <View className="mt-5 flex flex-row justify-center">
        <Image
          source={require(`../../Images/png/avatar.png`)}
          className="w-[80px]"
        />
      </View>

      <View className='mt-[46px]'>

        <View className='mx-6'>
          <Text
          style={{fontSize:GetFontSize(13)}}
          className='font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            Your Name 
          </Text>

          <View className='mt-2 bg-[#B4C3E366] rounded-md h-[50px] flex justify-center '>
          <Text
            style={{fontSize:GetFontSize(13)}}
            className='ml-2 font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          </Text>
          </View>
        </View>

        <View className='mt-6 mx-6'>
          <Text
          style={{fontSize:GetFontSize(13)}}
          className='font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            Date of Birth 
          </Text>

          <View className='mt-2 bg-[#B4C3E366] rounded-md h-[50px] flex justify-center '>
          <Text
            style={{fontSize:GetFontSize(13)}}
            className='ml-2 font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            {/* {user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 10) : ''} */}
          </Text>
          </View>
        </View>

        <View className='mt-6 mx-6'>
          <Text
          style={{fontSize:GetFontSize(13)}}
          className='font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            Your Class 
          </Text>

          <View className='mt-2 bg-[#B4C3E366] rounded-md h-[50px] flex justify-center '>
          <Text
            style={{fontSize:GetFontSize(13)}}
            className='ml-2 font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            {studentProfile.classId.className}
          </Text>
          </View>
        </View>

        <View className='mt-6 mx-6'>
          <Text
          style={{fontSize:GetFontSize(13)}}
          className='font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            Email id 
          </Text>

          <View className='mt-2 bg-[#B4C3E366] rounded-md h-[50px] flex justify-center '>
          <Text
            style={{fontSize:GetFontSize(13)}}
            className='ml-2 font-inter600 tracking-[-0.2] text-[#06286E] leading-[13px]'>
            {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

export default PersonalData;
