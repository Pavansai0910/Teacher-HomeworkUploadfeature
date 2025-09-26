import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LessonPlanDropdown = ({ options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = item => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <SafeAreaView>
      <View className="w-full">
        {/* Dropdown Button */}
        <TouchableOpacity
          onPress={toggleDropdown}
          className="bg-white rounded-xl py-4 px-4 flex-row items-center border-4 border-[#9BDDFD]"
        >
          <Text className="text-[#1CB0F6] font-bold text-[16px] flex-1">
            {selected || placeholder}
          </Text>
          <Text className="text-[#1CB0F6] text-lg">{open ? '⌃' : '⌄'}</Text>
        </TouchableOpacity>

        {/* Dropdown List */}
        {open && (
          <View className="mt-2 bg-white rounded-xl border-2 border-[#9BDDFD] overflow-hidden">
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className={`px-4 py-3 ${
                    index === 0 ? 'bg-[#E5F6FF]' : 'bg-[#F7FBFF]'
                  } border-b border-[#D9F1FF]`}
                >
                  <Text className="text-[#1CB0F6] font-semibold text-center">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LessonPlanDropdown;
