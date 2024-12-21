import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Box } from "../Box/Box";
import { FooterTabItem } from "./FooterTabItem";
import { buildTabItem, KeyTabParamList } from "./library/buildTabItem";
import { useAppSafeArea } from "@/helpers";

export function FooterTabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();
  return (
    <Box
      flexDirection="row"
      pt="sp10"
      backgroundColor="background"
      style={{ paddingBottom: bottom - 20 }}
    >
      {state.routes.map((route, index) => {
        const tabItem = buildTabItem(route.name as KeyTabParamList);
        if (!tabItem) return null;
        const isFocused = state.index === index;

        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true } as any);
          }
        }
        return (
          <FooterTabItem
            key={index}
            iconColor="#475569"
            iconName={tabItem.iconName}
            focused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </Box>
  );
}
