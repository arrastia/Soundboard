import type { Direction } from '../../../../@types/Direction';
import type { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';

export interface IButton {
  activeOpacity: number;
  children?: ReactNode;
  disabled?: boolean;
  duration: number;
  enableHapticFeedback?: boolean;
  hapticType?: HapticFeedbackTypes;
  isInteraction?: boolean;
  minLongPressDuration: number;
  onLayout?: () => void;
  onLongPress?: () => void;
  onPress?: () => void;
  onPressStart?: () => void;
  pressOutDuration?: number;
  scaleTo?: number;
  style?: StyleProp<any>;
  transformOrigin?: number[] | Direction;
  useLateHaptic?: boolean;
}
