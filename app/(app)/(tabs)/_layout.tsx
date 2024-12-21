import React from "react";
import { FooterTabBar } from "@/components";
import { palette } from "@/styles";
import { Tabs } from "expo-router";

import { Icon } from "@/components/Icon";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function AppLayout() {
  function renderTabBar(props: BottomTabBarProps): React.ReactNode | undefined {
    return <FooterTabBar {...props} />;
  }
  return (
    <Tabs
      tabBar={(props) => renderTabBar(props)}
      screenOptions={{
        tabBarActiveTintColor: "blue",

        tabBarStyle: {
          shadowOffset: { width: 0, height: 0 },
          backgroundColor: palette.background,
          borderWidth: 0,
        },
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon iconName="house" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon iconName="user" />,
        }}
      />
    </Tabs>
  );
}
