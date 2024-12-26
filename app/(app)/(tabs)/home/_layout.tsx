import { Box, Text } from "@/components";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenLayout={({ children }) => (
        <Box flex={1} backgroundColor="background" paddingHorizontal="sp28">
          {children}
        </Box>
      )}
    />
  );
}
