import React, { useState, useEffect } from 'react';
// import { Sparkles, Star, Trophy, X } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';
import { View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import GetFontSize from '../../Commons/GetFontSize';

const CongratulationsCard = ({ topic, isOpen }) => {

    const [isVisible, setIsVisible] = useState(isOpen);

    const navigation = useNavigation()

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <View className="fixed z-50 flex items-center justify-center">
            <View className="relative w-full overflow-hidden rounded-lg shadow-lg bg-white">
                <View className="p-8 text-white rounded-2xl">
                    <View className="flex justify-center mb-6">
                        <View className="relative pt-16">
                            {/* <Trophy className="w-16 h-16 text-yellow-300" /> */}

                            {/* <Star className="w-6 h-6 text-yellow-300 absolute top-0 right-0 animate-ping" />
                            <Star className="w-6 h-6 text-yellow-300 absolute bottom-0 left-0 animate-pulse" /> */}
                        </View>
                    </View>
                    <Text 
                    style={{fontSize:GetFontSize(26)}}
                    className="font-inter700 text-center mb-4 text-yellow-300">Congratulations!</Text>
                    <Text 
                        style={{fontSize:GetFontSize(16)}}
                        className="text-center font-inter400 mb-4">
                        You've mastered the topic:
                    </Text>
                    <Text
                    style={{fontSize:GetFontSize(20)}}
                    className="text-center font-poppins600 mb-3 bg-white text-blue-600 py-2 px-1 rounded-full shadow-inner">
                        {topic}
                    </Text>
                    {/* <View className="mt-6 flex justify-center space-x-2"> */}
                        {/* <Sparkles className="w-6 h-6 animate-spin text-yellow-300" />
                        <Sparkles className="w-6 h-6 animate-pulse text-yellow-300" />
                        <Sparkles className="w-6 h-6 animate-bounce text-yellow-300" /> */}
                    {/* </View> */}
                </View>
                <View className="bg-white p-6 flex justify-center">
                    <TouchableOpacity
                        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full "
                        onPress={()=> navigation.goBack()
                        }

                    ><Text
                    style={{fontSize:GetFontSize(16)}}
                    className='font-inter400 text-center text-[#FFFFFF]'>
                        Continue Your Journey
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CongratulationsCard