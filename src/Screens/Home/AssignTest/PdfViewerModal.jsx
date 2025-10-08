import React from 'react';
import { Modal, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewerModal = ({ visible, onClose, pdfUrl }) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={onClose} style={{ padding: 16, alignSelf: 'flex-end' }}>
          <Text style={{ fontSize: 18, color: '#CB9101' }}>Close</Text>
        </TouchableOpacity>
        
        {pdfUrl ? (
          <Pdf
            source={{ uri: pdfUrl, cache: false }}
            style={{ flex: 1 }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`PDF loaded: ${numberOfPages} pages`);
              console.log('PDF URL:', pdfUrl);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.error('PDF Error:', error);
            }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#CB9101" />
            <Text style={{ marginTop: 16, color: '#CB9101' }}>Loading PDF...</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default PdfViewerModal;