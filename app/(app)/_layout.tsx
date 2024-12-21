import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chats" />
      <Stack.Screen
        name="new-room"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
