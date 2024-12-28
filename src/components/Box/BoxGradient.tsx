import { Theme } from "@/styles";
import { Box, BoxProps } from "./Box";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/helpers";
import { buildGradientColors } from "./library/buildGradientColors";

export type KeyColors = keyof Theme["colors"];

export type BoxGradientProps = {
  colors: [KeyColors, KeyColors, ...KeyColors[]];
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
} & BoxProps;

export function BoxGradient({
  colors,
  startPoint,
  endPoint,
  children,
  ...boxProps
}: BoxGradientProps & React.PropsWithChildren) {
  const theme = useTheme();
  const gradientColors = buildGradientColors(colors, theme);

  return (
    <Box overflow="hidden" {...boxProps}>
      <LinearGradient
        colors={gradientColors}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        start={startPoint}
        end={endPoint}
      />
      {children}
    </Box>
  );
}
