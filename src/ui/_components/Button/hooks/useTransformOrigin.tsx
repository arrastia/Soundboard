import { useCallback, useMemo } from 'react';

import Animated, { Value } from 'react-native-reanimated';
import { transformOrigin as transformOriginUtil, useValues } from 'react-native-redash/src/v1';

import type { LayoutChangeEvent } from 'react-native';
import type { Direction } from '../../../../@types/Direction';
import type { Adaptable, Value as ValueType } from 'react-native-reanimated';

const { divide, floor, multiply } = Animated;

type Transform2dName = 'translateX' | 'translateY' | 'scale' | 'skewX' | 'skewY' | 'scaleX' | 'scaleY' | 'rotateZ' | 'rotate';
type Transformations = {
  [Name in Transform2dName]: Animated.Adaptable<number>;
};
export type Transforms2d =
  | Pick<Transformations, 'translateX'>
  | Pick<Transformations, 'translateY'>
  | Pick<Transformations, 'scale'>
  | Pick<Transformations, 'scaleX'>
  | Pick<Transformations, 'scaleY'>
  | Pick<Transformations, 'skewX'>
  | Pick<Transformations, 'skewY'>
  | Pick<Transformations, 'rotateZ'>
  | Pick<Transformations, 'rotate'>;

export const useTransformOrigin = (transformOrigin?: number[] | Direction, onLayoutProp?: any) => {
  const [height, width]: ValueType<number>[] = useValues(0, 0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (transformOrigin && !Number(height) && !Number(width)) {
        height.setValue(event.nativeEvent.layout.height);
        width.setValue(event.nativeEvent.layout.width);
      }

      if (onLayoutProp) {
        onLayoutProp(event);
      }
    },
    [height, onLayoutProp, transformOrigin, width]
  );

  const { offsetX, offsetY } = useMemo(() => {
    const offsetMultiplier = transformOrigin === 'left' || transformOrigin === 'top' ? -1 : 1;

    const x = new Value(0);
    const y = new Value(0);

    if (transformOrigin === 'left' || transformOrigin === 'right') {
      x.setValue(multiply(floor(divide(width, 2)), offsetMultiplier) as Adaptable<0>);
    } else if (transformOrigin === 'bottom' || transformOrigin === 'top') {
      y.setValue(multiply(floor(divide(height, 2)), offsetMultiplier) as Adaptable<0>);
    }
    return { offsetX: x, offsetY: y };
  }, [height, transformOrigin, width]);

  const withTransformOrigin = useCallback(
    (transform: Transforms2d) => transformOriginUtil({ x: offsetX, y: offsetY }, transform),
    [offsetX, offsetY]
  );

  return { onLayout, withTransformOrigin };
};
