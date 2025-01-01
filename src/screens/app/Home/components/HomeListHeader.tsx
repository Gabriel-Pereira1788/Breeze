import { Box, Text } from "@/components";
import { IconPress } from "@/components/Icon";
import { BlurView } from "expo-blur";
import { useAppSafeArea } from "@/helpers";
import { useState } from "react";
import { HomeHeaderSearchInput } from "./HomeHeaderSearchInput";

export function HomeListHeader() {
  const { top } = useAppSafeArea();

  const [showSearch, setShowSearch] = useState(false);

  return (
    <Box position="absolute" width={"100%"} marginBottom="sp28">
      <Box
        position="relative"
        zIndex={1000}
        width={"100%"}
        paddingHorizontal={"sp40"}
        style={{ paddingTop: top + 10 }}
      >
        <Box width={"100%"} alignItems={"flex-end"}>
          {!showSearch ? (
            <Box>
              <IconPress
                iconName="magnifyingGlass"
                variant="transparent"
                size={25}
                onPress={() => setShowSearch(true)}
              />
            </Box>
          ) : (
            <HomeHeaderSearchInput />
          )}
        </Box>
        <Box width={"100%"} alignItems="flex-start">
          <Text text="Chats" preset={"medium/30"} color={"textSecondary"} />
        </Box>
      </Box>
      <Box position="absolute" width={"100%"} height={"100%"} overflow="hidden">
        <BlurView
          intensity={30}
          tint="light"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      </Box>
    </Box>
  );
}
