import { Box } from "@/components";
import { HomeViewModel } from "./home.viewModel";
import { ChatRoomItem, HomeListHeader } from "./components";
import { dimensions, InfinityScrollList } from "@/helpers";
import { Stack } from "expo-router";

type Props = {
  viewModel: HomeViewModel;
};

export function HomeView({ viewModel }: Props) {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" pt="sp20">
      <Stack.Screen
        options={{
          header: () => (
            <HomeListHeader onChangeText={viewModel.onSearchText} />
          ),
        }}
      />
      <Box flex={1} width={"100%"}>
        <InfinityScrollList
          fetchNextPage={viewModel.fetchNextPage}
          keyboardDismissMode="on-drag"
          refreshing={viewModel.refreshing}
          onRefresh={viewModel.refresh}
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            height: "100%",
            marginTop: dimensions.height / 9,
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
    </Box>
  );
}
