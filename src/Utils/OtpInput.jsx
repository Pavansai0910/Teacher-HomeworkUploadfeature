import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length, onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  
  useEffect(() => {
    onOtpChange(otp.join(''));
  }, [otp, onOtpChange]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          value={digit}
          accessibilityLabel={`OTP digit ${index + 1}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    backgroundColor:'#A7C4FF66',
    width: 43,
    height: 58,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default OtpInput;
