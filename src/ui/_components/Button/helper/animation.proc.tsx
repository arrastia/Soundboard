import { Platform } from 'react-native';

import Animated, { EasingNode } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

import type { Clock, Node, Value } from 'react-native-reanimated';

const ios = Platform.OS === 'ios';

const { and, block, cond, eq, neq, not, or, proc, set, startClock, stopClock, timing, clockRunning } = Animated;

const maybeProc = ios ? <T extends unknown>(a: T) => a : proc;

const { ACTIVE, END, UNDETERMINED } = State;
const END_TOUCHED = 7;
const ANIMATION_STATE_0 = 0;
const ANIMATION_STATE_1 = 1;
const ANIMATION_STATE_2 = 2;
const ANIMATION_STATE_3 = 3;

export const buttonPressAnimationProc = maybeProc(
  (animationState: Value<3>, gestureState: Value<number>, prevGestureState: Value<number>, zoomClock: Clock) => {
    return block([
      cond(and(eq(gestureState, END), eq(prevGestureState, END_TOUCHED), not(clockRunning(zoomClock))), set(prevGestureState, UNDETERMINED))
    ]);
  }
);

export const animationProc = maybeProc(function (
  animationState: Value<number>,
  durationVal: Value<number>,
  finished: Value<number>,
  frameTime: Value<number>,
  gestureState: Value<number>,
  onGestureEvent: (...args: any[]) => void,
  prevGestureState: Value<number>,
  scaleValue: Value<number>,
  time: Value<number>,
  toValue: Value<number>,
  zoomClock: any,
  scaleTo: any,
  onPressCall: Node<number>,
  onPressStartCall: Node<number>,
  onLongPressCall: Node<number>,
  interactionCall: Node<number>
) {
  return block([
    cond(neq(prevGestureState, gestureState), [
      cond(or(eq(gestureState, ACTIVE), and(neq(prevGestureState, ACTIVE), eq(gestureState, UNDETERMINED))), [
        set(animationState, ANIMATION_STATE_0)
      ]),
      cond(eq(gestureState, END), onPressCall),
      cond(eq(gestureState, ACTIVE), [onLongPressCall, interactionCall, onPressStartCall])
    ]),
    set(prevGestureState, gestureState),
    cond(eq(animationState, ANIMATION_STATE_0), [
      startClock(zoomClock),
      set(finished, 0),
      set(animationState, ANIMATION_STATE_1),
      set(frameTime, 0),
      set(time, 0),
      set(toValue, scaleTo)
    ]),
    cond(and(eq(animationState, ANIMATION_STATE_1), neq(gestureState, ACTIVE), finished), [
      set(finished, 0),
      set(animationState, ANIMATION_STATE_2),
      set(frameTime, 0),
      set(time, 0),
      set(toValue, 1)
    ]),
    cond(and(eq(animationState, ANIMATION_STATE_2), finished), [set(animationState, ANIMATION_STATE_3), stopClock(zoomClock)]),
    cond(
      or(eq(animationState, ANIMATION_STATE_1), eq(animationState, ANIMATION_STATE_2)),
      timing(
        zoomClock,
        { finished, frameTime, position: scaleValue, time },
        { duration: durationVal, easing: EasingNode.bezier(0.25, 0.46, 0.45, 0.94), toValue }
      )
    ),
    cond(eq(prevGestureState, END), [set(prevGestureState, END_TOUCHED), set(gestureState, END_TOUCHED)]),
    scaleValue
  ]);
});
