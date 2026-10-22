import { Vibration, Platform, PermissionsAndroid } from 'react-native';

let hasCheckedPermission = false;
let isVibrationAllowed = true;

const checkVibrationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check('android.permission.VIBRATE' as any);
      isVibrationAllowed = granted;
    } catch {
      isVibrationAllowed = true;
    }
  }
  hasCheckedPermission = true;
};

if (Platform.OS === 'android') {
  checkVibrationPermission();
}

export const triggerHaptic = (type: 'light' | 'medium' | 'success' | 'warning' = 'light') => {
  if (Platform.OS === 'android' && hasCheckedPermission && !isVibrationAllowed) {
    return;
  }

  try {
    if (Platform.OS === 'android') {
      switch (type) {
        case 'light':
          Vibration.vibrate(10);
          break;
        case 'medium':
          Vibration.vibrate(25);
          break;
        case 'success':
          Vibration.vibrate([0, 15, 60, 20]);
          break;
        case 'warning':
          Vibration.vibrate([0, 30, 40, 30]);
          break;
      }
    } else {
      Vibration.vibrate();
    }
  } catch {
    isVibrationAllowed = false;
  }
};
