import { Stack } from "expo-router";
import { Box } from "@/components";

export default function ChatLayout() {
  return (
    <Stack
      screenLayout={({ children }) => (
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          paddingHorizontal="sp28"
        >
          {children}
        </Box>
      )}
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
      }}
    />
  );
}
