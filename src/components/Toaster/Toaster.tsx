import React from "react";
import { AnimatedFadeEntrance } from "@/animations";
import { If } from "@/helpers";

import { Icon } from "../Icon";

import { buildColor, buildIconName } from "./library";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { useToaster } from "./useToaster";
import { launchOptions } from "@infra";

export type ToasterConfig = {
  status: "success" | "error" | "warning";
  title: string;
  message: string;
};

export type ToasterRefProps = {
  show: (_toaster: ToasterConfig) => void;
  hide: VoidFunction;
};

const isTesting = launchOptions.isTesting();

export const Toaster = React.forwardRef<ToasterRefProps, {}>((_, ref) => {
  const { height, toasterConfig, onLayout } = useToaster(ref);

  const _iconName = buildIconName(toasterConfig?.status);
  const _color = buildColor(toasterConfig?.status);

  return (
    <Box
      alignSelf="center"
      mb="sp25"
      zIndex={10}
      width={"75%"}
      position={!isTesting ? "absolute" : undefined}
      bottom={height}
    >
      <If condition={!!toasterConfig}>
        <AnimatedFadeEntrance entrance="down">
          <Box
            testID="toast"
            onLayout={onLayout}
            position={!isTesting ? "absolute" : undefined}
            zIndex={10}
            width={"100%"}
            alignItems="center"
            gap="sp15"
          >
            <Box
              position={!isTesting ? "absolute" : undefined}
              width={"100%"}
              height={!isTesting ? "100%" : undefined}
              borderRadius="rd15"
              zIndex={0}
              bottom={3}
              backgroundColor={_color}
            />
            <Box
              width={"100%"}
              height={!isTesting ? "100%" : undefined}
              backgroundColor="background"
              p="sp12"
              flexDirection="row"
              borderRadius="rd12"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.1}
              shadowColor={"neutralBlack"}
              shadowRadius={1}
            >
              <Box flex={1}>
                <Icon iconName={_iconName!} size={25} color={_color} />
              </Box>

              <Box
                width={"100%"}
                alignItems="center"
                justifyContent="center"
                gap="sp10"
              >
                <Text
                  preset="medium/16"
                  text={toasterConfig?.title ?? ""}
                  color="neutralBlack"
                />
                <Text
                  preset="medium/14"
                  text={toasterConfig?.message ?? ""}
                  color="textSecondary"
                />
              </Box>
            </Box>
          </Box>
        </AnimatedFadeEntrance>
      </If>
    </Box>
  );
});
