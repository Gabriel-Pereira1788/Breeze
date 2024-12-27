import { Icon, IconProps } from "./Icon";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";
import { BoxProps } from "../Box/Box";
import { buildVariant } from "./library/buildVariant";
import { Theme } from "@/styles";

export type IconPressProps = {
  onPress?: () => void;
  testID?: string;
  variant?: "filled" | "transparent" | "rounded";
  backgroundColor?: keyof Theme["colors"];
  tintColor?: keyof Theme["colors"];
  activeOpacity?: number;
} & IconProps;

export function IconPress({
  onPress,
  testID,
  variant = "filled",
  activeOpacity,
  backgroundColor,
  tintColor,
  ...iconProps
}: IconPressProps) {
  const boxProps: BoxProps | undefined = buildVariant(variant);

  return (
    <TouchableOpacityBox
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.8}
      testID={testID}
      boxProps={{
        ...boxProps,
        backgroundColor: backgroundColor ?? boxProps?.backgroundColor,
      }}
    >
      <Icon {...iconProps} color={tintColor} />
    </TouchableOpacityBox>
  );
}
