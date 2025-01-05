import { Box, Text } from "@/components";
import { IconPress } from "@/components/Icon";
import { BlurView } from "expo-blur";
import { useAppSafeArea } from "@/helpers";
import { useState } from "react";
import { AnimatedFadeEntrance } from "@/animations";
import Animated from "react-native-reanimated";
import { TextInput, ViewStyle } from "react-native";
import { useSearchBarAnimated } from "../hooks";
import { launchOptions } from "@infra";

type HomeListHeaderProps = {
  onChangeText: (text: string) => void;
};

const isTesting = launchOptions.isTesting();

export function HomeListHeader({ onChangeText }: HomeListHeaderProps) {
  const { top } = useAppSafeArea();

  const [showing, setShowing] = useState(false);

  const { animatedStyles, show, hide } = useSearchBarAnimated({
    onShowing: () => setShowing(true),
    onDismiss: () => setShowing(false),
  });

  return (
    <Box position={"relative"} width={"100%"} marginBottom="sp40">
      <Box position={"absolute"} width={"100%"}>
        <Box
          position="relative"
          zIndex={1000}
          width={"100%"}
          style={{ paddingTop: top + 10 }}
        >
          <Box
            width={"100%"}
            alignItems={"center"}
            paddingHorizontal={"sp28"}
            justifyContent={"flex-end"}
            flexDirection={"row"}
            gap={"sp5"}
          >
            {showing && (
              <AnimatedFadeEntrance entrance={"left"}>
                <IconPress
                  iconName={"arrowLeft"}
                  variant={"transparent"}
                  size={25}
                  onPress={hide}
                />
              </AnimatedFadeEntrance>
            )}
            <Animated.View style={[wrapperStyle, animatedStyles]}>
              <TextInput
                placeholder={"Search"}
                style={{ width: "100%" }}
                onChangeText={onChangeText}
              />
            </Animated.View>

            {!showing && (
              <AnimatedFadeEntrance entrance={"right"}>
                <IconPress
                  testID={"search-button"}
                  iconName="magnifyingGlass"
                  variant="transparent"
                  size={25}
                  onPress={show}
                />
              </AnimatedFadeEntrance>
            )}
          </Box>
          <Box
            testID={"title-box"}
            width={"100%"}
            alignItems="flex-start"
            paddingHorizontal={"sp40"}
          >
            <Text text="Chats" preset={"medium/30"} color={"textSecondary"} />
          </Box>
        </Box>
        <Box
          position="absolute"
          width={"100%"}
          height={"100%"}
          overflow="hidden"
        >
          <BlurView
            intensity={30}
            tint="light"
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const wrapperStyle: ViewStyle = {
  backgroundColor: "#fff",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  borderRadius: 10,
  marginBottom: 10,
  padding: 15,
  maxWidth: "100%",
  marginTop: 5,
};
