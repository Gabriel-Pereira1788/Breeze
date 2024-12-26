import { Box } from "@/components";
import { HomeViewModel } from "./home.viewModel";
import { FlatList } from "react-native";
import { ChatRoomItem } from "./components";
import { useHeaderHeight } from "@react-navigation/elements";
import { IconPress } from "@/components/Icon";
import { router, Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
type Props = {
  viewModel: HomeViewModel;
};

export function HomeView({ viewModel }: Props) {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconPress
          iconName="plus"
          variant="transparent"
          activeOpacity={0.3}
          onPress={() => {
            router.navigate("new-room");
          }}
        />
      ),
    });
  }, []);

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Stack.Screen
        options={{
          headerTitle: "Chats",
          headerTransparent: true,
          headerBlurEffect: "light",
          headerSearchBarOptions: {
            placeholder: "Search",
            shouldShowHintSearchIcon: false,
            onChangeText: (event) => {
              const text = event.nativeEvent.text;
              viewModel.onSearchText(text);
            },
          },
        }}
      />
      <FlatList
        keyboardDismissMode="on-drag"
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          marginTop: headerHeight,
          gap: 20,
        }}
        data={viewModel.rooms}
        renderItem={({ item }) => (
          <ChatRoomItem
            {...item}
            redirectToChatRoom={viewModel.redirectToChatRoom}
          />
        )}
      />
    </Box>
  );
}
