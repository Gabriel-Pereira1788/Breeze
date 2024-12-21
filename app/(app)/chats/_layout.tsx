import { Box } from "@/components";
import { useAppSafeArea } from "@/helpers";
import { Stack } from "expo-router";

export default function ChatLayout() {
  const { bottom, top } = useAppSafeArea();
  return <Stack />;
}
