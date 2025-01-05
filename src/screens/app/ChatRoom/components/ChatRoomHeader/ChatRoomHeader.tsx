import { Avatar, Box, Text, TouchableOpacityBox } from "@/components";
import { If, useAppSafeArea } from "@/helpers";
import { BlurView } from "expo-blur";
import { Image } from "react-native";

type Props = {
  imageUrl: string;
  title: string;
  userImageUrls: string[];
  redirectToChatRoomDetails: VoidFunction;
};

export function ChatRoomHeader({
  imageUrl,
  title,
  userImageUrls,
  redirectToChatRoomDetails,
}: Props) {
  const { top } = useAppSafeArea();
  return (
    <Box position="absolute" marginBottom="sp28">
      <Box
        position="relative"
        zIndex={1000}
        width={"100%"}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        padding="sp20"
        style={{ paddingTop: top }}
      >
        <TouchableOpacityBox
          activeOpacity={0.8}
          testID={"more-info-press"}
          onPress={redirectToChatRoomDetails}
          boxProps={{
            flex: 1,
            gap: "sp15",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <If condition={!!imageUrl}>
            <Avatar size={65} url={imageUrl} />
          </If>
          <Box gap="sp10" justifyContent="center">
            <Text text={title} preset="medium/16" />
          </Box>
        </TouchableOpacityBox>
        <Box flex={1} justifyContent="flex-end" flexDirection="row">
          {userImageUrls &&
            userImageUrls.map((url, index) => (
              <Box
                key={index}
                alignItems="center"
                justifyContent="center"
                style={{
                  transform: [{ translateX: index > 0 ? -20 : 0 }],
                }}
              >
                <Avatar size={30} url={url} />
              </Box>
            ))}
        </Box>
      </Box>
      <Box position="absolute" width={"100%"} height={"100%"} overflow="hidden">
        <BlurView
          intensity={10}
          tint="light"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      </Box>
    </Box>
  );
}
