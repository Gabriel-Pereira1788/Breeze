import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Box, BoxProps } from "../Box/Box";
import { BoxGradient, BoxGradientProps } from "../Box";
import { If } from "@/helpers";

export interface ITouchableOpacityBoxProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  boxProps?: BoxProps;
  boxGradientProps?: BoxGradientProps;
}

export function TouchableOpacityBox({
  children,
  boxProps,
  boxGradientProps,
  ...rest
}: ITouchableOpacityBoxProps) {
  return (
    <TouchableOpacity {...rest} style={{ width: boxProps?.width }}>
      <If
        condition={!!boxGradientProps}
        elseRender={<Box {...boxProps}>{children && children}</Box>}
      >
        <BoxGradient {...boxGradientProps!}>{children && children}</BoxGradient>
      </If>
    </TouchableOpacity>
  );
}
