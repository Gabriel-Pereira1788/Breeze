import { Box, Text, TouchableOpacityBox } from "@/components";
import { HomeViewModel } from "./home.viewModel";
import { FlatList } from "react-native";
import { ChatRoomItem, HomeListHeader } from "./components";
import { useHeaderHeight } from "@react-navigation/elements";
import { Icon, IconPress } from "@/components/Icon";
import { router, useNavigation } from "expo-router";
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
            console.log("Click");
          }}
        />
      ),
    });
  }, []);

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <FlatList
        keyboardDismissMode="on-drag"
        // ListHeaderComponent={HomeListHeader}
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
