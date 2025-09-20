import { View, Text, Image } from "react-native"
import { useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import LogoutIcon from "../../../Images/svg/LogoutIcon"
import GetFontSize from "../../../Commons/GetFontSize"
export default function FirstBg() {
  const { studentProfile } = useContext(AuthContext) 
  return (

    <View className="w-[95%] mx-[21px] py-[10px] h-[10%]">
        <View className=" flex-row justify-start items-center ">
          <Image
            source={require(`../../../Images/png/avatar.png`)}
            className="w-[18%] "
          />
          <View className="ml-[6px]">
            <Text
              style={{ fontSize: GetFontSize(20) }}
              className="font-inter600 text-black tracking-[-0.55] leading-tight">
              {studentProfile?.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}            
                </Text>
            <Text
              style={{ fontSize: GetFontSize(12) }}
              className="font-inter400 text-[#979797] tracking-[-0.45] leading-tight">
              Class {studentProfile?.classId?.className}
            </Text>
          </View>
     
          <View 
            className='absolute right-0 '>
            <LogoutIcon />
          </View>

        </View>
      </View>
  )
}