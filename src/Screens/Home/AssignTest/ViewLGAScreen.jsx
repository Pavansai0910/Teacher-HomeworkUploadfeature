import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const ViewLGAScreen = ({ route }) => {
  const { pdfPath } = route.params; // path to the PDF file

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={{ uri: pdfPath }}
        style={{ flex: 1, width: Dimensions.get('window').width }}
      />
    </View>
  );
};

export default ViewLGAScreen;