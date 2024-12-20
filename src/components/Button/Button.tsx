import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { If } from "@/helpers";

import { buildVariant } from "./library";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";
import { Text } from "../Text/Text";
import { Icon, IconName } from "../Icon";
import { Box } from "../Box/Box";

export type ButtonProps = {
  text: string;
  loading?: boolean;
  variant?: "outline" | "filled" | "transparent";
  rightIconName?: IconName;
} & TouchableOpacityProps;

export function Button({
  text,
  loading,
  variant = "filled",
  rightIconName,
  disabled,
  ...touchableOpacityProps
}: ButtonProps) {
  const _variant = buildVariant(variant);

  return (
    <TouchableOpacityBox
      boxProps={{
        borderRadius: "rd30",
        alignItems: "center",
        justifyContent: "center",
        opacity: loading || disabled ? 0.7 : 1,
        ..._variant.container,
      }}
      activeOpacity={0.8}
      disabled={loading}
      {...touchableOpacityProps}
    >
      <Box flexDirection={!!rightIconName ? "row" : "column"} gap="sp10">
        <If
          condition={!!loading}
          elseRender={
            <Text preset="medium/16" text={text} color={_variant.textColor} />
          }
        >
          <ActivityIndicator size={20} />
        </If>

        <If condition={!!rightIconName && !loading}>
          <Icon iconName={rightIconName!} color={_variant.textColor} />
        </If>
      </Box>
    </TouchableOpacityBox>
  );
}
