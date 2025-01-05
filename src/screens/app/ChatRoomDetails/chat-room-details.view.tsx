import { Avatar, Box, Button, Text } from "@/components";
import { ChatRoomDetailsViewProps } from "./chat-room-details.model";
import { If } from "@/helpers";

export function ChatRoomDetailsView({ viewModel }: ChatRoomDetailsViewProps) {
  return (
    <Box
      gap={"sp20"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Avatar size={105} url={viewModel.imageUrl} />
      </Box>
      <Text text={viewModel.title} preset={"medium/20"} />
      <If condition={viewModel.isOwner}>
        <Button
          text={"Delete"}
          enableGradient={true}
          loading={viewModel.isLoading}
          onPress={viewModel.deleteChatRoom}
        />
      </If>
    </Box>
  );
}
