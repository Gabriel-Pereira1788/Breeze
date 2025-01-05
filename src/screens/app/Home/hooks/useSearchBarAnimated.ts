import { useOpacityReanimated } from "@/animations";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  onShowing?: VoidFunction;
  onDismiss?: VoidFunction;
};

export function useSearchBarAnimated({ onShowing, onDismiss }: Props) {
  const {
    opacity: searchBarOpacity,
    fadeInOpacity,
    fadeOutOpacity,
  } = useOpacityReanimated({ duration: 300 });

  const searchBarWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const widthInterpolate = interpolate(
      searchBarWidth.value,
      [0, 1],
      [20, 95],
      { extrapolateLeft: Extrapolation.CLAMP },
    );
    return {
      opacity: searchBarOpacity.value,
      width: withSpring(`${widthInterpolate}%`, {
        damping: 35,
        stiffness: 500,
      }),
    };
  });

  function show() {
    fadeInOpacity();

    searchBarWidth.value = withSpring(1, {
      damping: 35,
      stiffness: 300,
    });
    onShowing?.();
  }

  function hide() {
    fadeOutOpacity();

    searchBarWidth.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });

    onDismiss?.();
  }

  return {
    animatedStyles,
    show,
    hide,
  };
}
