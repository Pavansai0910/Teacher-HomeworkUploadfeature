
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import capitalizeSubject from '../Utils/CapitalizeSubject';
import GetFontSize from './GetFontSize';
import DropdownArrow from '../Images/LessonPlan/DropdownArrow';

const LessonPlanDropdown = ({ options, placeholder, onSelect, selectedValue }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (item) => {
    // 3. Call the onSelect prop instead of setting local state
    if (onSelect) {
      onSelect(item);
    }
    setOpen(false);
  };

  return (
    <View className="w-full">
      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={toggleDropdown}
        className="bg-white rounded-xl py-4 px-4 flex-row items-center"
        style={{
          borderTopWidth: 3,
          borderRightWidth: 3,
          borderBottomWidth: 6,
          borderLeftWidth: 3,
          borderColor: '#A17F5E',
        }}
      >
        {/* 4. Use selectedValue for display */}
        <Text
        style={{fontSize: GetFontSize(16)}}
        className="font-inter700 text-[#DC9047]">
          {selectedValue || placeholder}
        </Text>
        <DropdownArrow color="#DC9047" />
      </TouchableOpacity>

      {open && (
        <View className="mt-2 rounded-xl overflow-hidden">
          {/* Brown Background Wrapper */}
          <View className="bg-[#F5E7D3] px-6 py-2 rounded-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((item, index) => {
                const isSelected = selectedValue === item;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelect(item)}
                    className={`my-1 rounded-2xl ${
                      isSelected
                        ? 'bg-white border-4 border-[#DC9047]'
                        : 'bg-white'
                    }`}
                  >
                    <Text
                style={{fontSize: GetFontSize(16)}}

                      className={`font-inter700 text-center py-3 ${
                        isSelected ? 'text-[#DC9047] font-semibold ' : 'text-[#637381]'
                      }`}
                    >
                      {capitalizeSubject(item)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default LessonPlanDropdown;