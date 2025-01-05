import { Box, Text, TouchableOpacityBox } from "@/components";
import { If } from "@/helpers";
import { ChatRoom } from "@domain";
import { Image } from "react-native";
import { HomeViewModel } from "../home.viewModel";

type Props = {
  redirectToChatRoom: HomeViewModel["redirectToChatRoom"];
} & ChatRoom;

export function ChatRoomItem({
  name,
  imageUrl,
  description,
  id,
  ownerId,
  redirectToChatRoom,
}: Props) {
  return (
    <TouchableOpacityBox
      activeOpacity={0.7}
      onPress={() => redirectToChatRoom({ name, id, imageUrl, ownerId })}
      boxProps={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: "sp10",
      }}
    >
      <If condition={!!imageUrl}>
        <Box overflow="hidden" borderRadius="rd100">
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{
              width: 65,
              height: 65,
            }}
            resizeMode="cover"
          />
        </Box>
      </If>
      <Box gap="sp10">
        <Text text={name} preset="medium/20" />
        <Text
          text={
            description.length > 50
              ? description.slice(0, 90) + "..."
              : description
          }
          preset="regular/10"
        />
      </Box>
    </TouchableOpacityBox>
  );
}
