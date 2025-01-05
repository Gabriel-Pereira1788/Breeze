import { useCallback } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export type IUseOpacityReanimatedProps = {
  initialOpacity?: number;
  duration?: number;
  toValue?: number;
};

export const useOpacityReanimated = (props: IUseOpacityReanimatedProps) => {
  const { initialOpacity = 0, duration = 500, toValue = 0 } = props;

  const opacity = useSharedValue(initialOpacity);

  const fadeInOpacity = useCallback(() => {
    opacity.value = withTiming(1, {
      duration,
    });
  }, [opacity, duration]);

  const fadeOutOpacity = useCallback(() => {
    opacity.value = withTiming(toValue, {
      duration,
    });
  }, [opacity, duration]);

  return {
    opacity,
    fadeInOpacity,
    fadeOutOpacity,
  };
};
