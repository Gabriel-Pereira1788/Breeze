import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Box } from "../Box/Box";
import { FooterTabItem } from "./FooterTabItem";
import { buildTabItem, KeyTabParamList } from "./library/buildTabItem";
import { useAppSafeArea } from "@/helpers";
import Svg, { Path, Defs, Mask, Circle, Rect } from "react-native-svg";

import { IconPress } from "../Icon";
import { router } from "expo-router";
import { dimensions } from "@/helpers";

export function FooterTabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();

  const tabBarWidth = dimensions.width - 150;
  const height = 64;
  const circleRadius = 32;
  return (
    <Box
      flexDirection="row"
      position="absolute"
      bottom={0}
      padding="sp16"
      alignItems="center"
      justifyContent="center"
      width={"100%"}
      style={{ paddingBottom: bottom - 10 }}
    >
      <Box
        width={tabBarWidth}
        height={height}
        shadowColor="neutralBlack"
        shadowOffset={{
          width: 0,
          height: 4,
        }}
        shadowOpacity={0.1}
        shadowRadius={12}
      >
        <Svg width={tabBarWidth} height={height}>
          <Defs>
            <Mask id="mask">
              <Rect
                x="0"
                y="0"
                width={tabBarWidth}
                height={height}
                fill="white"
              />
              <Circle
                cx={tabBarWidth / 2}
                cy="0"
                r={circleRadius}
                fill="black"
              />
            </Mask>
          </Defs>

          <Path
            d={`
              M ${circleRadius},0
              H ${tabBarWidth - circleRadius}
              Q ${tabBarWidth},0 ${tabBarWidth},${circleRadius}
              V ${height - circleRadius}
              Q ${tabBarWidth},${height} ${tabBarWidth - circleRadius},${height}
              H ${circleRadius}
              Q 0,${height} 0,${height - circleRadius}
              V ${circleRadius}
              Q 0,0 ${circleRadius},0
            `}
            fill={"#fff"}
            mask="url(#mask)"
          />
        </Svg>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          flexDirection="row"
          marginTop="sp10"
          justifyContent="space-between"
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
      </Box>
      <Box position="absolute" top={-10}>
        <IconPress
          iconName="plus"
          variant="rounded"
          backgroundColor="primaryMain"
          tintColor="neutralWhite"
          size={28}
          onPress={() => router.push("new-room")}
        />
      </Box>
    </Box>
  );
}
