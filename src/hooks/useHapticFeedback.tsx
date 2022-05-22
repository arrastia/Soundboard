import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import type { HapticFeedbackTypes, HapticOptions } from 'react-native-haptic-feedback';

export const useHapticFeedback = (feedbackType: HapticFeedbackTypes, options?: HapticOptions): void => {
  return ReactNativeHapticFeedback.trigger(feedbackType, { enableVibrateFallback: true, ignoreAndroidSystemSettings: false, ...options });
};
