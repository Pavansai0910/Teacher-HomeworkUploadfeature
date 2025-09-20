import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const permissionsMap = {
  android: [
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ],
  ios: [PERMISSIONS.IOS.MICROPHONE],
};

export const checkAndRequestPermissions = async () => {
  const platformPermissions = permissionsMap[Platform.OS];

  if (!platformPermissions) {
    console.warn('Unsupported platform for permissions');
    return false;
  }

  const checkResults = await Promise.all(
    platformPermissions.map(permission => check(permission))
  );

  const allGranted = checkResults.every(result => result === RESULTS.GRANTED);

  if (allGranted) {
    return true;
  }

  const requestResults = await Promise.all(
    platformPermissions.map(permission => request(permission))
  );

  return requestResults.every(result => result === RESULTS.GRANTED);
};
