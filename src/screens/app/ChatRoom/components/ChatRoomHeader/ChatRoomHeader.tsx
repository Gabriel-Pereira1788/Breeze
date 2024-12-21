import { Box, Text } from "@/components";
import { If, useAppSafeArea } from "@/helpers";
import { BlurView } from "expo-blur";
import { Image } from "react-native";

type Props = {
  imageUrl: string;
  title: string;
};
export function ChatRoomHeader({ imageUrl, title }: Props) {
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
        <Box
          flex={1}
          gap="sp15"
          flexDirection="row"
          justifyContent="space-between"
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
          <Box gap="sp10" justifyContent="center">
            <Text text={title} preset="medium/16" />
            <Text
              text={"Alice is typing..."}
              preset="regular/14"
              color="neutralGray400"
            />
          </Box>
        </Box>
        <Box flex={1} justifyContent="flex-end" flexDirection="row">
          <Text text="Persons" />
        </Box>
      </Box>
      <Box position="absolute" width={"100%"} height={"100%"} overflow="hidden">
        <BlurView
          intensity={40}
          tint="light"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      </Box>
    </Box>
  );
}
