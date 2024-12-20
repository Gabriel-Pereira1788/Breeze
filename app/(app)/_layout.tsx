import React from "react";
import { Box } from "@/components";
import { palette } from "@/styles";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/providers";
import { useAppSafeArea } from "@/helpers";

export default function AppLayout() {
  const { bottom } = useAppSafeArea();
  return (
    <Stack
      screenLayout={({ children }) => (
        <Box
          paddingHorizontal="sp23"
          style={{ paddingBottom: bottom }}
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
