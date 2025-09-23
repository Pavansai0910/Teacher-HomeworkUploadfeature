import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { flagQuestion } from "../Services/StudentAPIV2";
import Toast from "react-native-toast-message";
import GetFontSize from "../Commons/GetFontSize";
import CloseBlack from "../Images/svg/CloseBlack";

const FLAG_OPTIONS = [
  "Question is unclear",
  "Incorrect answer options",
  "Typo or grammatical error",
  "Question is out of syllabus",
  "Other",
];

export default function FlagPopup({
  open,
  onClose,
  questionId,
  questionPaperId,
  studentId,
  studentName,
  schoolName,
}) {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCheckboxChange = (reason) => {
    if (reason === "Other") {
      if (selectedReasons.includes("Other")) {
        setSelectedReasons(selectedReasons.filter((r) => r !== "Other"));
        setOtherText("");
      } else {
        setSelectedReasons([...selectedReasons, "Other"]);
      }
    } else {
      setSelectedReasons((prev) =>
        prev.includes(reason)
          ? prev.filter((r) => r !== reason)
          : [...prev, reason]
      );
    }
  };

  const handleSubmit = async () => {
    let reasonsToSend = selectedReasons.filter((r) => r !== "Other");
    if (selectedReasons.includes("Other") && otherText.trim()) {
      reasonsToSend.push(otherText.trim());
    }

    if (reasonsToSend.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please select at least one reason",
      });
      return;
    }

    setSubmitting(true);
    try {
      await flagQuestion({
        questionId,
        questionPaperId,
        studentId,
        studentName,
        schoolName,
        reasons: reasonsToSend,
      });

      Toast.show({
        type: "success",
        text1: "Flag submitted!",
      });

      onClose();
      setSelectedReasons([]);
      setOtherText("");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed to Submit Flag",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="flex-1 bg-black/30 items-center justify-center">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Report this question</Text>
            <TouchableOpacity
              onPress={() => onClose()}>
              <CloseBlack />
            </TouchableOpacity>
          </View>

          {/* Checkbox Options */}
          <View className="mb-4">
            {FLAG_OPTIONS.map((reason) => (
              <TouchableOpacity
                key={reason}
                onPress={() => handleCheckboxChange(reason)}
                className="flex-row items-center mb-3"
              >
                <View
                  className={`w-5 h-5 mr-2 rounded border-2 ${selectedReasons.includes(reason)
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400"
                    }`}
                />
                <Text className="text-base">{reason}</Text>
              </TouchableOpacity>
            ))}

            {selectedReasons.includes("Other") && (
              <TextInput
                className="mt-2 w-full border border-gray-300 rounded p-2"
                placeholder="Please specify"
                value={otherText}
                onChangeText={setOtherText}
              />
            )}
          </View>

          {/* Footer Buttons */}
          <View className="flex-row justify-end gap-3">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-[#33569F] rounded"
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white">Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
