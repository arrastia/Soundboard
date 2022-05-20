import { useCallback, useEffect, useRef } from 'react';

import type { MutableRefObject } from 'react';

interface HandlerProps {
  interactionHandle: MutableRefObject<number | undefined>;
  minLongPressDuration: number;
  onLongPress?: () => void;
  onPress?: () => void;
  optionallyTriggerHaptic: () => void;
}

export const usePressHandler = ({ interactionHandle, minLongPressDuration, onLongPress, onPress, optionallyTriggerHaptic }: HandlerProps) => {
  const longPressHandle = useRef<ReturnType<typeof setInterval>>(null) as MutableRefObject<any>;

  const createHandle = useCallback(() => {
    longPressHandle.current = setTimeout(() => {
      if (onLongPress) onLongPress();
      longPressHandle.current = null;
      optionallyTriggerHaptic();
    }, minLongPressDuration);
  }, [minLongPressDuration, onLongPress, optionallyTriggerHaptic]);

  const handlePress = useCallback(() => {
    if (onLongPress && !longPressHandle.current) return;
    onPress && onPress();
    optionallyTriggerHaptic();
  }, [longPressHandle, onLongPress, onPress, optionallyTriggerHaptic]);

  const removeHandle = useCallback(() => {
    if (interactionHandle.current) {
      clearTimeout(longPressHandle.current);
      longPressHandle.current = null;
    }
  }, [interactionHandle]);

  useEffect(() => () => removeHandle());

  return [handlePress, createHandle, removeHandle];
};
