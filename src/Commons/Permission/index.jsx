import { PermissionsAndroid, Platform, Linking, Alert, Vibration } from 'react-native';

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
                    onPress: () => {
                        Vibration.vibrate(50);
                        Linking.openSettings()
                    }
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

export const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
        return true; 
    }

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message: "This app needs access to your camera to take homework photos.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            Alert.alert(
                'Camera Permission Required',
                'You must grant Camera access in your device settings to take homework photos.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Open Settings',
                        onPress: () =>{
                            Vibration.vibrate(50);
                            Linking.openSettings();
                        } 
                    },
                ],
                { cancelable: true }
            );
            return false;
        }
    } catch (err) {
        console.warn("Camera Permission Error:", err);
        return false;
    }
};

export const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') {
        return true; 
    }

    let permission;
    // Android 13 (API 33) and above use READ_MEDIA_IMAGES
    if (Platform.Version >= 33) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    } else {
        // Android 12 (API 32) and below use READ_EXTERNAL_STORAGE
        permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    }

    try {
        const granted = await PermissionsAndroid.request(
            permission,
            {
                title: "Gallery Permission",
                message: "This app needs access to your gallery for uploading homework.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            Alert.alert(
                'Gallery Permission Required',
                'You must grant Media/Storage access in your device settings to select photos.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Open Settings',
                        onPress: () => {
                            Vibration.vibrate(50);
                            Linking.openSettings()
                        } 
                    },
                ],
                { cancelable: true }
            );
            return false;
        }
    } catch (err) {
        console.warn("Gallery Permission Error:", err);
        return false;
    }
};