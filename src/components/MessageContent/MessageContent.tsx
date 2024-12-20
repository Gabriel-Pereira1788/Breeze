import { Message } from "@domain";
import { Text } from "../Text/Text";
import { Box } from "../Box/Box";
import { AnimatedFadeEntrance } from "@/animations";

type Props = {
  message: Message;
  isUserMessage: boolean;
};

export function MessageContent({ message, isUserMessage }: Props) {
  return (
    <AnimatedFadeEntrance entrance="down">
      <Box
        alignSelf={isUserMessage ? "flex-end" : "flex-start"}
        alignItems={isUserMessage ? "flex-end" : "flex-start"}
        gap="sp3"
      >
        <Box
          padding="sp16"
          maxWidth={"70%"}
          backgroundColor={isUserMessage ? "primaryMain" : "neutralWhite"}
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.1}
          shadowRadius={2}
          borderRadius="rd12"
          borderBottomRightRadius={isUserMessage ? "rd4" : undefined}
          borderBottomLeftRadius={!isUserMessage ? "rd4" : undefined}
          shadowColor={"neutralBlack"}
        >
          <Text
            text={message.content}
            color={isUserMessage ? "neutralWhite" : "neutralBlack"}
          />
        </Box>
        <Text text="5:25 pm" color="neutralGray400" preset="regular/14" />
      </Box>
    </AnimatedFadeEntrance>
  );
}
