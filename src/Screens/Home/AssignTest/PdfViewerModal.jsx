import React from 'react';
import { Modal, View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

const PdfViewerModal = ({ visible, onClose, pdfUrl }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    if (visible && pdfUrl) {
      setLoading(true);
      setError(null);
      setNumberOfPages(0);
      setCurrentPage(1);

      // Validate the PDF file
      const filePath = pdfUrl.replace('file://', '');
      RNFS.stat(filePath)
        .then((stat) => {
          console.log('PDF file stats:', stat);
          if (stat.size === 0) {
            setError('PDF file is empty');
            setLoading(false);
          }
          // Reduced timeout to 5 seconds for faster experience
          setTimeout(() => {
            if (loading) {
              console.warn('PDF loading timeout - forcing display');
              setLoading(false);
            }
          }, 5000);
        })
        .catch((err) => {
          console.error('File stat error:', err);
          setError('PDF file not found');
          setLoading(false);
        });
    } else if (!visible) {
      // Reset state when modal closes
      setLoading(true);
      setError(null);
      setNumberOfPages(0);
      setCurrentPage(1);
    }
  }, [visible, pdfUrl]);

  if (error) {
    Alert.alert('PDF Error', error, [{ text: 'OK', onPress: onClose }]);
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-white">
        {/* Compact Header */}
        <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-300 bg-gray-100">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-800">
              Question Paper
            </Text>
            <Text className="text-[10px] text-gray-600">
              {numberOfPages > 0 ? `Page ${currentPage}/${numberOfPages}` : 'Loading...'}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={onClose}
            className="px-3 py-1.5 bg-[#CB9101] rounded-lg"
            accessibilityLabel="Close PDF viewer"
          >
            <Text className="text-xs text-white font-semibold">
              Close
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* PDF Content */}
        {pdfUrl ? (
          <View className="flex-1 bg-white">
            {loading && (
              <View className="absolute inset-0 justify-center items-center bg-white/95 z-50">
                <ActivityIndicator size="large" color="#CB9101" />
                <Text className="mt-3 text-[#CB9101] text-sm">
                  Loading PDF...
                </Text>
              </View>
            )}
            
            <Pdf
              trustAllCerts={false}
              source={{ 
                uri: pdfUrl, 
                cache: true  // Enable cache for faster subsequent loads
              }}
              style={{ flex: 1, backgroundColor: '#fff' }}
              enablePaging={true}
              horizontal={false}
              spacing={0}
              onLoadComplete={(pages, filePath) => {
                console.log(`PDF loaded successfully: ${pages} pages`);
                console.log('PDF file path:', filePath);
                setNumberOfPages(pages);
                setCurrentPage(1); // Ensure page 1 is set
                setLoading(false);
              }}
              onPageChanged={(page, totalPages) => {
                console.log(`Page changed: ${page} of ${totalPages}`);
                setCurrentPage(page);
                setNumberOfPages(totalPages); // Update total pages on every change
              }}
              onError={(error) => {
                console.error('PDF Error:', error);
                setLoading(false);
                Alert.alert(
                  'PDF Loading Error',
                  'Unable to load the PDF. Please try again.',
                  [{ text: 'OK', onPress: onClose }]
                );
              }}
              onLoadProgress={(percent) => {
                console.log(`PDF Loading: ${Math.round(percent * 100)}%`);
                // Force stop loading at 95% to show PDF faster
                if (percent >= 0.95) {
                  setTimeout(() => setLoading(false), 300);
                }
              }}
              enableAntialiasing={true}
              fitPolicy={0}  // Fit width
              minScale={1.0}  // Prevent zooming out too much
              maxScale={3.0}  // Limit zoom in
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-600">No PDF to display</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default PdfViewerModal;