import React from 'react';
import { View, Text, TouchableOpacity, Modal, Vibration } from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';

const ExitConfirmationPopup = ({ visible, onExit, onCancel }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // ✅ Semi-transparent background
          justifyContent: 'flex-end',
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: GetFontSize(18),
              fontWeight: '600',
              color: '#212B36',
              marginBottom: 8,
            }}
          >
            Confirm Exit
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: GetFontSize(14),
              color: '#637381',
              marginBottom: 20,
            }}
          >
            Are you sure you want to exit Assign Test
          </Text>

          {/* Exit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6B6B',
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: 'center',
              marginBottom: 12,
            }}
            onPress={() => {
              Vibration.vibrate(50);
              onExit();
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: GetFontSize(16),
                fontWeight: '600',
              }}
            >
              Exit
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: 'center',
            }}
            onPress={() => {
              Vibration.vibrate(50);
              onCancel();
            }}
          >
            <Text
              style={{
                color: '#637381',
                fontSize: GetFontSize(16),
                fontWeight: '500',
              }}
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