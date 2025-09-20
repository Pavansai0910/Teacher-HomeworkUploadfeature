import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'English',  value: 'en'},
  {label: 'Bengoli',  value: 'bn'},
  {label: 'Hindi',    value: 'hi'},
  {label: 'Tamil',    value: 'ta'},
  {label: 'Telugu',   value: 'te'},
  {label: 'Punjabi',  value: 'pa'},
  {label: 'Marathi',  value: 'mr'},
  {label: 'Assamese', value: 'as'},
  {label: 'Bhojpuri', value: 'bh'},
  {label: 'Gujarati', value: 'gu'},
  {label: 'Kannada',  value: 'kn'},
];

const DropdownComponent = ({onLanguageChange}) => {

  const [value, setValue] = useState("en");
  const [isFocus, setIsFocus] = useState(false);

  const handleLanguageChange = (item) => {
    setValue(item.value);
    setIsFocus(false);
    // Notify parent component about the language change
    if (onLanguageChange) {
      onLanguageChange(item.value); // Passing the selected value to the parent
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'English' : ''}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleLanguageChange} // Handling the language change

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DropdownComponent;
