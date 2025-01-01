import { Box, Text } from "@/components";
import { Stack } from "expo-router";
import { useAppSafeArea } from "@/helpers";

export default function HomeLayout() {
  const { top } = useAppSafeArea();
  return (
    <Stack
      screenLayout={({ children }) => (
        <Box
          flex={1}
          backgroundColor="background"
          paddingHorizontal="sp28"
          style={{ paddingTop: top }}
        >
          {children}
        </Box>
      )}
    />
  );
}
