import React, { useCallback, useMemo } from 'react';

import Animated, { Clock, Value } from 'react-native-reanimated';
import { createNativeWrapper, State } from 'react-native-gesture-handler';
import { PureNativeButton } from 'react-native-gesture-handler/src/components/GestureButtons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { useInteraction } from './hooks/useInteraction';
import { useMemoOne } from 'hooks/useMemoOne';
import { usePressHandler } from './hooks/usePressHandler';
import { useTransformOrigin } from './hooks/useTransformOrigin';

import { animationProc, buttonPressAnimationProc } from './helper/animation.proc';

import type { IButton } from './@types/Button.types';

const { createAnimatedComponent } = Animated;
const { and, block, call, cond, eq, event, neq, set } = Animated;

const { ACTIVE, CANCELLED, END, UNDETERMINED } = State;
const ANIMATION_STATE_0 = 0;

const AnimatedRawButton: any = createNativeWrapper(createAnimatedComponent(PureNativeButton), { shouldActivateOnStart: true });

export const Button = ({
  activeOpacity,
  children,
  duration,
  disabled,
  onLayout,
  hapticType,
  isInteraction,
  minLongPressDuration,
  onLongPress,
  onPress,
  onPressStart,
  scaleTo = 0.8,
  style,
  transformOrigin
}: IButton) => {
  const optionallyTriggerHaptic = useCallback(() => {
    if (hapticType) ReactNativeHapticFeedback.trigger(hapticType);
  }, [hapticType]);

  const [createHandle, removeHandle, interactionHandle] = useInteraction();
  const { onLayout: measureInnerElement, withTransformOrigin } = useTransformOrigin(transformOrigin);
  const [handlePress, createLongPressHandle, removeLongPressHandle] = usePressHandler({
    interactionHandle,
    minLongPressDuration,
    onLongPress,
    onPress,
    optionallyTriggerHaptic
  });

  const { animationState, durationVal, finished, frameTime, gestureState, onGestureEvent, prevGestureState, scaleValue, time, toValue, zoomClock } =
    useMemoOne(() => {
      const gesState: Animated.Value<number> = new Value(UNDETERMINED);
      const onGestureEventClick = event([{ nativeEvent: { state: gesState } }]);

      return {
        animationState: new Value(CANCELLED),
        durationVal: new Value(duration),
        finished: new Value(0),
        frameTime: new Value(0),
        gestureState: gesState,
        onGestureEvent: onGestureEventClick,
        prevGestureState: new Value(UNDETERMINED),
        scaleValue: new Value(1),
        time: new Value(0),
        toValue: new Value(0.5),
        zoomClock: new Clock()
      };
    }, []);

  const scale = useMemo(
    () =>
      block([
        buttonPressAnimationProc(animationState, gestureState, prevGestureState, zoomClock),
        cond(
          and(eq(prevGestureState, UNDETERMINED), eq(gestureState, END), neq(animationState, ANIMATION_STATE_0)),
          set(animationState, ANIMATION_STATE_0)
        ),
        animationProc(
          animationState,
          durationVal,
          finished,
          frameTime,
          gestureState,
          onGestureEvent,
          prevGestureState,
          scaleValue,
          time,
          toValue,
          zoomClock,
          scaleTo,
          call([], handlePress),
          call([], () => onPressStart && onPressStart()),
          call([gestureState], ([gs]) => {
            if (!onLongPress) {
              return;
            }
            if (gs === ACTIVE) {
              createLongPressHandle();
            } else {
              removeLongPressHandle();
            }
          }),
          call([gestureState], ([gs]) => {
            if (!isInteraction) {
              return;
            }
            if (gs === ACTIVE) {
              createHandle();
            } else {
              removeHandle();
            }
          })
        )
      ]),
    [
      animationState,
      createHandle,
      createLongPressHandle,
      durationVal,
      finished,
      frameTime,
      gestureState,
      handlePress,
      isInteraction,
      onGestureEvent,
      onLongPress,
      onPressStart,
      prevGestureState,
      removeHandle,
      removeLongPressHandle,
      scaleTo,
      scaleValue,
      time,
      toValue,
      zoomClock
    ]
  );

  return (
    <AnimatedRawButton enabled={!disabled} onHandlerStateChange={onGestureEvent} onLayout={onLayout}>
      <Animated.View
        accessible
        onLayout={measureInnerElement}
        style={[
          style,
          {
            opacity: scaleValue.interpolate({
              inputRange: scaleTo > 1 ? [1, scaleTo] : [scaleTo, 1],
              outputRange: scaleTo > 1 ? [1, activeOpacity] : [activeOpacity, 1]
            }),
            transform: withTransformOrigin({ scale })
          }
        ]}>
        {children}
      </Animated.View>
    </AnimatedRawButton>
  );
};

Button.defaultProps = {
  activeOpacity: 1,
  duration: 160,
  enableHapticFeedback: true,
  hapticType: 'selection',
  minLongPressDuration: 500,
  scaleTo: 0.86
};
