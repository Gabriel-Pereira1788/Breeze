import React from "react";

import { IconWeight } from "phosphor-react-native/lib/typescript/index";

import { buildIcon, mappedIcons } from "./library/buildIcon";
import { useTheme } from "@/helpers";
import { Theme } from "@/styles";

export type IconName = keyof typeof mappedIcons;
export type IconProps = {
  iconName: IconName;
  size?: number;
  weight?: IconWeight;
  color?: keyof Theme["colors"];
  hexColor?: string;
};

export function Icon({
  iconName,
  hexColor,
  color = "neutralBlack",
  weight = "regular",
  size = 20,
}: IconProps) {
  const IconRender = buildIcon(iconName);
  const { colors } = useTheme();
  const _color = colors[color];
  return <IconRender color={hexColor || _color} weight={weight} size={size} />;
}
