import Animated, {
  useSharedValue,
  withSpring,
  ReduceMotion,
} from "react-native-reanimated";
import { TextInput, ViewStyle } from "react-native";
import { useEffect } from "react";
import { dimensions } from "@/helpers";

export function HomeHeaderSearchInput() {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withSpring(dimensions.width, {
      mass: 6.7,
      damping: 30,
      stiffness: 164,
      overshootClamping: false,
      restDisplacementThreshold: 53.31,
      restSpeedThreshold: 46.71,
      reduceMotion: ReduceMotion.System,
    });
  }, []);

  return (
    <Animated.View
      style={{
        width,
        ...wrapperStyle,
      }}
    >
      <TextInput placeholder={"Search"} style={{ width: "100%" }} />
    </Animated.View>
  );
}

const wrapperStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  borderRadius: 10,
  marginBottom: 10,
  padding: 15,
  maxWidth: "100%",
};
