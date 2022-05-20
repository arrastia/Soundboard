import { useCallback, useEffect, useRef } from 'react';
import { InteractionManager } from 'react-native';

export const useInteraction = () => {
  const interactionHandle = useRef<number>();

  const createInteractionHandle = useCallback(() => {
    interactionHandle.current = InteractionManager.createInteractionHandle();
  }, []);

  const removeInteractionHandle = useCallback(() => {
    if (interactionHandle.current) {
      InteractionManager.clearInteractionHandle(interactionHandle.current);
      interactionHandle.current = undefined;
    }
  }, []);

  useEffect(() => () => removeInteractionHandle());

  return [createInteractionHandle, removeInteractionHandle, interactionHandle] as const;
};
