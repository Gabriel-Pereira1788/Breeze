import { Box, Text } from "@/components";
import { IconPress } from "@/components/Icon";

export function HomeListHeader() {
  return (
    <Box width={"100%"} gap="sp10" mb="sp25">
      <Box width={"100%"} alignItems="flex-end">
        <Box>
          <IconPress iconName="magnifyingGlass" variant="transparent" />
        </Box>
      </Box>
      <Box width={"100%"} alignItems="flex-start">
        <Text text="Chats" />
      </Box>
    </Box>
  );
}
