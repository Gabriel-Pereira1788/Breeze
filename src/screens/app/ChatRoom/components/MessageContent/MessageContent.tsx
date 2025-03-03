import React from "react";
import { Message } from "@domain";

import { AnimatedFadeEntrance } from "@/animations";
import { Avatar, Box, Text } from "@/components";
import { If } from "@/helpers";
import { Icon } from "@/components/Icon";
import { formatUsername } from "./library/formatUsername";
import { formatHours } from "./library/formatHours";

type Props = {
  message: Message;
  isUserMessage: boolean;
};

export function MessageContent({ message, isUserMessage }: Props) {
  const formatedUsername = formatUsername(message.user.username ?? "");
  const hours = formatHours(message.createdAt);

  return (
    <AnimatedFadeEntrance entrance="down">
      <Box
        flexDirection="row"
        width={"100%"}
        justifyContent={isUserMessage ? "flex-end" : "flex-start"}
      >
        <If
          condition={!!message.user.avatarUrl && !isUserMessage}
          elseRender={
            !isUserMessage ? <Icon iconName="user" size={20} /> : undefined
          }
        >
          <Avatar size={40} url={message.user.avatarUrl!} />
        </If>

        <Box gap="sp10" maxWidth={"50%"}>
          <Box
            padding="sp16"
            backgroundColor={isUserMessage ? "primaryMain" : "neutralWhite"}
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.1}
            shadowRadius={2}
            borderRadius="rd12"
            gap="sp10"
            borderBottomRightRadius={isUserMessage ? "rd4" : undefined}
            borderBottomLeftRadius={!isUserMessage ? "rd4" : undefined}
            shadowColor={"neutralBlack"}
          >
            <If condition={!isUserMessage}>
              <Text
                text={formatedUsername}
                preset="medium/10"
                color="neutralGray600"
              />
            </If>

            <Text
              text={message.content}
              color={isUserMessage ? "neutralWhite" : "neutralBlack"}
            />
          </Box>
          <Box alignSelf={isUserMessage ? "flex-end" : "flex-start"}>
            <Text text={hours} color="neutralGray400" preset="regular/14" />
          </Box>
        </Box>
      </Box>
    </AnimatedFadeEntrance>
  );
}
