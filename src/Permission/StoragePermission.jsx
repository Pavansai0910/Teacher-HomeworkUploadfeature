import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';

export async function requestStoragePermission() {
  // This permission is typically only relevant for Android 10 and below for general file storage/downloads.
  // For media selection (Gallery), use requestGalleryPermission.
  if (Platform.OS === 'android' && Platform.Version <= 29) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download files.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel', // Added Cancel for consistency
        }
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        // Use Alert to guide the user to Settings on persistent denial
        Alert.alert(
            'Storage Permission Required',
            'You must grant Storage access in your device settings to download files.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings(),
                },
            ],
            { cancelable: true }
        );
        return false;
      }

    } catch (err) {
      console.warn("Storage Permission Error:", err);
      return false;
    }
  }
  // Android 11+ (SDK 30+) handles storage differently and generally doesn't require this permission.
  return true; 
}
