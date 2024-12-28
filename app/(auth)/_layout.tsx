import React, { useState } from "react";
import { Box } from "@/components";
import { palette } from "@/styles";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/providers";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Logo } from "@/assets";
import { AnimatedSplashScreen } from "@/splash-screen/AnimatedSplashScreen";
import { settingsService } from "@/services";

export default function AuthLayout() {
  const { session, loading } = useSession();
  const [visible, setVisible] = useState(true);

  if (loading || visible)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <AnimatedSplashScreen
          onInitializeApp={async () => {
            setVisible(false);
            settingsService.hideSplashScreen();
          }}
        />
      </Box>
    );

  if (session && !visible) return <Redirect href={"home"} />;

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
          <Box alignItems="center" justifyContent="center">
            <Logo width={400} height={150} />
          </Box>
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
