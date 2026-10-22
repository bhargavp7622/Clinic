import { Vibration, Platform } from 'react-native';

export const triggerHaptic = (type: 'light' | 'medium' | 'success' | 'warning' = 'light') => {
  try {
    if (Platform.OS === 'android') {
      switch (type) {
        case 'light':
          Vibration.vibrate(12);
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
      // iOS
      Vibration.vibrate();
    }
  } catch {
    // Non-blocking fallback
  }
};
