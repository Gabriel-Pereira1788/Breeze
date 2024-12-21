import React from "react";
import {
  TextInput as TextInputRN,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { If } from "@/helpers";

import { buildInputStatus, buildStatusStyles } from "./library";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";

export type TextInputProps = {
  LeftElement?: JSX.Element;
  RightElement?: JSX.Element;
  errorMessage?: string;
  disabled?: boolean;
} & RNTextInputProps;

export function TextInput(props: TextInputProps) {
  const { LeftElement, RightElement, errorMessage, ...textInputProps } = props;
  const _status = buildInputStatus(props);
  const _statusStyles = buildStatusStyles(_status);

  return (
    <Box width={"100%"} style={{ gap: 5 }}>
      <Box
        width={"100%"}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px="sp20"
        py="sp20"
        borderRadius="rd30"
        height={textInputProps.multiline ? 200 : 64}
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={10}
        shadowColor={"neutralBlack"}
        {..._statusStyles}
      >
        <If condition={!!LeftElement}>
          <Box mr="sp15">{LeftElement}</Box>
        </If>

        <TextInputRN
          {...textInputProps}
          placeholderTextColor={"#ACADB9"}
          style={{ flex: 1, height: "100%" }}
          autoCapitalize="none"
        />
        <If condition={!!RightElement}>
          <Box>{RightElement}</Box>
        </If>
      </Box>
      <If condition={!!errorMessage}>
        <Box width={"100%"} pl="sp10">
          <Text
            preset="medium/14"
            color="feedbackError"
            text={errorMessage ?? ""}
          />
        </Box>
      </If>
    </Box>
  );
}
