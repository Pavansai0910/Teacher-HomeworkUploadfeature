import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { X } from "lucide-react-native"; // alternative for RxCross2
import { testReport } from "../Services/StudentAPIV1";
import Toast from 'react-native-toast-message';

const FLAG_OPTIONS = [
  "Unable to Submit Test",
  "Test Screen is not opening",
  "Other",
];

export default function ReportPopup({
  open,
  onClose,
  studentId,
  examId,
  showGiveTestButton,
}) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigation = useNavigation();
  const handleRadioChange = (reason) => {
    setSelectedReason(reason);
    if (reason !== "Other") {
      setOtherText("");
    }
  };

  const handleSubmit = async () => {
    let reasonToSend =
      selectedReason === "Other" ? otherText.trim() : selectedReason;

    if (!reasonToSend) {
      Toast.show({
        type: "error",
        text1: "Please select or enter a reason",
      });
      return;
    }

    setSubmitting(true);
    try {
      await testReport({
        description: reasonToSend,
        studentId,
        examId,
      });
      console.log("Report submitted successfully!");

      Toast.show({
        type:'success',
        text1: 'Report Submitted Successfully!',
      })
      onClose();
      setSelectedReason("");
      setOtherText("");
    } catch (error) {
        Toast.show({
          type:'error',
          text1: 'Failed to submit report',
        })
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
            <Text className="text-lg font-bold">Report this test</Text>
            <TouchableOpacity onPress={onClose}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          {/* Radio Options */}
          <View className="mb-4">
            {FLAG_OPTIONS.map((reason) => (
              <TouchableOpacity
                key={reason}
                onPress={() => handleRadioChange(reason)}
                className="flex-row items-center mb-3"
              >
                <View
                  className={`w-5 h-5 mr-2 rounded-full border-2 ${
                    selectedReason === reason
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400"
                  }`}
                />
                <Text className="text-base">{reason}</Text>
              </TouchableOpacity>
            ))}

            {selectedReason === "Other" && (
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
            {!showGiveTestButton && (
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate('LGATestScreen', {
                      examId: examId,
                    })
                }}
                disabled={submitting}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                <Text className="text-white">Give Test</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-blue-700 rounded"
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
