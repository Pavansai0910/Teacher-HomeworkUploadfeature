import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import GetFontSize from "./GetFontSize";
function Dropdown({ data, selectedValue, onSelect, placeholder }) {
  const [visible, setVisible] = useState(false);

  const selectedItem = data.find(item => item.value === selectedValue);

  return (
    <View className="flex-1 mx-1">
      <TouchableOpacity
        className="bg-[#E6F0FF] rounded-md px-3 py-2"
        onPress={() => setVisible(true)}
      >
        <Text className="text-[#5B77B0] text-[15px] font-semibold">
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        {/* Overlay to close modal */}
        <TouchableOpacity
          className="absolute inset-0 bg-black/10"
          onPress={() => setVisible(false)}
          activeOpacity={1}
        />

        <View className="bg-white mt-32 rounded-xl max-h-72 shadow-lg overflow-hidden">
          <FlatList
            data={data}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-[#E6F0FF]"
                onPress={() => {
                  onSelect(item.value);
                  setVisible(false);
                }}
              >
                <Text 
                style={{fontSize: GetFontSize(15)}}
                className="text-[#5B77B0] line-clamp-1">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

export function SubjectDropdown({ subjects, selectedSubject, setSelectedSubject }) {
  const data = subjects.map(sub => ({
    value: sub._id,
    label: sub.subjectName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));

  return (
    <Dropdown
      data={data}
      selectedValue={selectedSubject?._id || null}
      onSelect={val => {
        const subject = subjects.find(s => s._id === val);
        setSelectedSubject(subject);
      }}
      placeholder="Select Subject"
    />
  );
}

export function ChapterDropdown({ chapters, selectedChapter, setSelectedChapter }) {
  const data = chapters.map(c => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Dropdown
      data={data}
      selectedValue={selectedChapter || null}
      onSelect={setSelectedChapter}
      placeholder="Select Chapter"
      className="line-clamp-1 text-ellipsis truncate"
    />

  );
}
