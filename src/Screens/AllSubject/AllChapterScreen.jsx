import {
ScrollView,
Text,
TouchableOpacity,
View,
} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import EachChapterList from './EachChaptersList';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function AllChapterScreen({ route }) {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-[#FFFFFF] ">
            <View className="mt-[30px]">
                <View className="flex flex-row justify-start items-center">
                    <TouchableOpacity
                        className="ml-4 flex flex-row justify-center items-center "
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <LeftArrowIconBlue />
                    <Text
                        style={{ fontSize: GetFontSize(18) }}
                        className="ml-3 font-poppins600 text-[#33569F]">
                        {route.params.subjectName} 
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

            <View className="mt-2 w-full">
                <View className='flex flex-row justify-center gap-[8px]'>
                <View style={{ height: 4, width: '30%', backgroundColor: '#33569F' }}></View>
                <View style={{ height: 4, width: '30%', backgroundColor: '#F0F0F0' }}></View>
                <View style={{ height: 4, width: '30%', backgroundColor: '#F0F0F0' }}></View>
                </View>

                    <View className="mt-[24%] mx-[32px]">
                        <Text
                        style={{ fontSize: GetFontSize(18) }}
                        className="font-poppins600 text-[#33569F] ">
                        Chapters
                        </Text>
                    </View>
                <ScrollView className='h-[73%]'>
                    <EachChapterList classSubjectId={route.params.classSubjectId} subjectName={route.params.subjectName} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default AllChapterScreen;