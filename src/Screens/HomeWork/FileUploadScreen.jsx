import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Modal, StyleSheet, ActivityIndicator, Vibration } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from "react-native-toast-message";
import { requestCameraPermission, requestGalleryPermission } from "../../Commons/Permission/index"

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const FileUploadScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveFile = (indexToRemove) => {
    Vibration.vibrate(50);
    setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const processResponse = (response) => {
    setIsSelectionModalVisible(false);
    setIsProcessing(false);

    if (response.didCancel) return;
    if (response.errorCode) {
      return Toast.show({
        type: "error",
        text1: `File selection failed: ${response.errorMessage}`,
      });
    }

    const assets = response.assets || [];

    // Filter by size and type
    const validFiles = assets.filter(
      (file) => file.fileSize <= MAX_FILE_SIZE && ALLOWED_TYPES.includes(file.type)
    );

    if (assets.length > validFiles.length) {
      const reason = assets.some(a => a.fileSize > MAX_FILE_SIZE) ? 'size' : 'format';
      Toast.show({
        type: "info",
        text1: `Only valid files added. (Max 10MB, formats: jpg/jpeg/png)`,
      });
    }

    // Limit to max files
    const remainingSlots = MAX_FILES - selectedFiles.length;
    const newFilesToAdd = validFiles.slice(0, remainingSlots);

    if (newFilesToAdd.length < validFiles.length) {
      Toast.show({
        type: "info",
        text1: `Maximum ${MAX_FILES} files reached.`,
      });
    }

    setSelectedFiles((prev) => [...prev, ...newFilesToAdd]);
  };

  const launchLibrary = async () => {
    Vibration.vibrate(50);
    const galleryPermission = await requestGalleryPermission();
    if (!galleryPermission) {
      return Toast.show({ type: "error", text1: `Gallery permission denied. Please enable in settings.` });
    }

    const remainingSlots = MAX_FILES - selectedFiles.length;
    if (remainingSlots <= 0) {
      setIsSelectionModalVisible(false);
      return Toast.show({ type: "error", text1: `Maximum ${MAX_FILES} files already selected.` });
    }

    setIsProcessing(true);
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: remainingSlots,
    }, processResponse);
  };

  const launchCameraCapture = async () => {
    Vibration.vibrate(50);
    const cameraPermission = await requestCameraPermission();
    if (!cameraPermission) {
      return Toast.show({ type: "error", text1: `Camera permission denied. Please enable in settings.` });
    }

    if (selectedFiles.length >= MAX_FILES) {
      setIsSelectionModalVisible(false);
      return Toast.show({ type: "error", text1: `Maximum ${MAX_FILES} files reached.` });
    }

    setIsProcessing(true);
    launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    }, processResponse);
  };

  const openSelectionModal = () => {
    Vibration.vibrate(50);
    setIsSelectionModalVisible(true);
  };

  const closeSelectionModal = () => {
    setIsSelectionModalVisible(false);
  };

  const handleLocalUpload = async () => {
    if (selectedFiles.length === 0) {
      return Toast.show({
        type: "error",
        text1: `Please select at least one file.`,
      });
    }

    setIsProcessing(true);
    try {
      // Placeholder: Process files locally (e.g., log, save to device, etc.)
      // Extend this as needed, e.g., using react-native-fs for saving
      console.log('Processing files locally:', selectedFiles.map(f => ({ uri: f.uri, name: f.fileName })));

      Toast.show({
        type: "success",
        text1: `Processed ${selectedFiles.length} files locally!`,
      });

      // Optional: Clear files after processing
      setSelectedFiles([]);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Local processing failed: ${error.message}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 14 }}>
      {/* Header */}
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#212B36' }}>Upload Files</Text>
      <Text style={{ fontSize: 14, color: '#637381', marginBottom: 16 }}>
        Select up to 10 images (max 10MB each, jpg/jpeg/png supported)
      </Text>

      {/* File List or Add Button */}
      {selectedFiles.length > 0 ? (
        <View style={{ minHeight: 100, maxHeight: 300, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontWeight: '600', color: '#212B36' }}>Selected Files ({selectedFiles.length}/{MAX_FILES})</Text>
            <TouchableOpacity onPress={openSelectionModal}>
              <Text style={{ color: '#025ECA', fontWeight: '600' }}>+ Add More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 8 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            nestedScrollEnabled={true}
          >
            {selectedFiles.map((file, index) => (
              <View 
                key={index} 
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: 8, 
                  padding: 8, 
                  borderBottomWidth: 1, 
                  borderBottomColor: '#F3F4F6' 
                }}
              >
                <Image 
                  source={{ uri: file.uri }} 
                  style={{ width: 40, height: 40, borderRadius: 4 }} 
                  resizeMode="cover"
                />
                <Text style={{ flex: 1, marginLeft: 12, fontSize: 14 }} numberOfLines={1}>
                  {file.fileName || `File ${index + 1}`}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                  <Text style={{ color: 'red', fontSize: 10, fontWeight: '600' }}>REMOVE</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <TouchableOpacity
          onPress={openSelectionModal}
          style={{ 
            marginBottom: 16, 
            height: 172, 
            borderWidth: 2, 
            borderStyle: 'dashed', 
            borderColor: '#D1D5DB', 
            borderRadius: 8, 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#025ECA', marginBottom: 4 }}>+ Add Files</Text>
          <Text style={{ fontSize: 14, color: '#374151' }}>Tap to select from camera or gallery</Text>
        </TouchableOpacity>
      )}

      {/* Process Files Button */}
      {selectedFiles.length > 0 && (
        <TouchableOpacity
          onPress={handleLocalUpload}
          style={{ 
            backgroundColor: '#3B82F6', 
            height: 40, 
            borderRadius: 8, 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: '600' }}>
              Process Files Locally ({selectedFiles.length})
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Selection Modal */}
      <Modal
        visible={isSelectionModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeSelectionModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select File Source</Text>
            <TouchableOpacity style={styles.modalOption} onPress={launchCameraCapture} disabled={isProcessing}>
              <Text style={styles.optionText}>📷 Take Photo with Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={launchLibrary} disabled={isProcessing}>
              <Text style={styles.optionText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeSelectionModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Processing Modal */}
      <Modal visible={isProcessing} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
              Processing files...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#212B36',
  },
  modalOption: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#025ECA',
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#637381',
  },
});

export default FileUploadScreen;