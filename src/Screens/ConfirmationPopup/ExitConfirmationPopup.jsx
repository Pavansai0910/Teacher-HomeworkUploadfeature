import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, Vibration } from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { useNavigation } from '@react-navigation/native';

const ExitConfirmationPopup = ({ visible, onClose, onExit, title }) => {
  const { height: screenHeight } = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/20">
        <View
          className="w-full bg-white rounded-t-3xl px-4 py-5"
          style={{ maxHeight: screenHeight * 0.3 }}
        >
          {/* Title */}
          <Text
            className="text-center mb-4 font-medium text-[#454F5B]"
            style={{ fontSize: GetFontSize(16) }}
          >
            {title || 'Are you sure you want to exit?'}
          </Text>

          {/* Exit Button */}
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabNavigator' }],
              });
            }}
            className="bg-[#E87076] rounded-lg mb-3"
            style={{
              borderColor: '#E03E46',
              borderLeftWidth: 2.5,
              borderRightWidth: 2.5,
              borderTopWidth: 1.5,
              borderBottomWidth: 4,
              paddingVertical: 14,
            }}
          >
            <Text
              className="text-white text-center font-semibold"
              style={{ fontSize: GetFontSize(16) }}
            >
              Exit
            </Text>
          </TouchableOpacity>


          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(50);
              onClose && onClose();
            }}
            className="bg-white py-3 rounded-lg"
            style={{
              borderColor: '#E5E5E3',
              borderLeftWidth: 2.5,
              borderRightWidth: 2.5,
              borderTopWidth: 1.5,
              borderBottomWidth: 4,
              paddingVertical: 14,
            }}
          >
            <Text
              className="text-[#454F5B] text-center font-semibold"
              style={{ fontSize: GetFontSize(16) }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExitConfirmationPopup;
