import { Box } from "@/components";
import { HomeViewModel } from "./home.viewModel";
import { FlatList } from "react-native";
import { ChatRoomItem } from "./components";
import { useHeaderHeight } from "@react-navigation/elements";

import { Stack } from "expo-router";

type Props = {
  viewModel: HomeViewModel;
};

export function HomeView({ viewModel }: Props) {
  const headerHeight = useHeaderHeight();

  return (
    <Box flex={1} alignItems="center" justifyContent="center" pt="sp20">
      <Stack.Screen
        options={{
          headerTitle: "Chats",
          headerTransparent: true,
          headerBlurEffect: "light",
          headerTintColor: "#000",
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
