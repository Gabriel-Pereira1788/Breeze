import React from "react";
import { Box, Text } from "@/components";
import { palette } from "@/styles";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/providers";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function AuthLayout() {
  const { session, loading } = useSession();

  if (loading)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text text="Loading..." />
      </Box>
    );
  if (session) return <Redirect href={"home"} />;

  return (
    <Stack
      screenLayout={({ children }) => (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: palette.background,
            padding: 40,
          }}
        >
          {children}
        </KeyboardAwareScrollView>
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
