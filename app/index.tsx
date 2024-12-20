import { Box, Text } from "@/components";
import { useSession } from "@/providers";
import { Redirect } from "expo-router";

export default function Page() {
  const { session } = useSession();
  console.log("SESSION-PAGE", session);
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return <Redirect href={"/(app)/chat-room"} />;
}
