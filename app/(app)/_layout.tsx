import { useSession } from "@/providers";
import { palette } from "@/styles";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { session } = useSession();

  if (!session) return <Redirect href={"sign-in"} />;
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
      <Stack.Screen
        name="edit-profile"
        options={{
          statusBarStyle: "light",
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
