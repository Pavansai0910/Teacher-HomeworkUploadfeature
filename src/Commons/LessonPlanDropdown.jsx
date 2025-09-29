import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const LessonPlanDropdown = ({ options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (item) => {
    setSelected(item);
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
        <Text className="text-[#DC9047] font-bold text-[16px] flex-1">
          {selected || placeholder}
        </Text>
        <Text className="text-[#DC9047] text-lg font-bold">{open ? '⌃' : '⌄'}</Text>
      </TouchableOpacity>

      {open && (
        <View className="mt-2 rounded-xl overflow-hidden">
          {/* Brown Background Wrapper */}
          <View className="bg-[#F5E7D3] px-6 py-2 rounded-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((item, index) => {
                const isSelected = selected === item;
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
                      className={`text-center py-3 text-[15px] ${
                        isSelected ? 'text-[#DC9047] font-semibold ' : 'text-[#637381]'
                      }`}
                    >
                      {item}
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
