import React from "react";
import { Box, Text } from "@/components";
import { palette } from "@/styles";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/providers";

export default function AuthLayout() {
  const { session, loading } = useSession();

  if (loading)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text text="Loading..." />
      </Box>
    );
  if (session) return <Redirect href={"/(app)/chat-room"} />;

  return (
    <Stack
      screenLayout={({ children }) => (
        <Box
          padding="sp40"
          flex={1}
          justifyContent="center"
          backgroundColor="background"
        >
          {children}
        </Box>
      )}
      screenOptions={{
        statusBarStyle: "light",
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: palette.background,
        },
      }}
    />
  );
}
