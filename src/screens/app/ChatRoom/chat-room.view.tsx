import { Box } from "@/components";
import { ChatRoomViewModel } from "./chat-room.viewModel";

import { If } from "@/helpers";
import { FlatList } from "react-native";
import { SendInput } from "./components/SendInput";
import { Stack } from "expo-router";
import { ChatRoomHeader, MessageContent } from "./components";

type Props = {
  viewModel: ChatRoomViewModel;
};

const ITEM_HEIGHT = 200;

export function ChatRoomView({ viewModel }: Props) {
  return (
    <Box flex={1}>
      <Stack.Screen
        options={{
          header: () => (
            <ChatRoomHeader
              imageUrl={viewModel.imageUrl}
              title={viewModel.title}
              userImageUrls={viewModel.userImageUrls}
              redirectToChatRoomDetails={viewModel.redirectToChatRoomDetails}
            />
          ),
        }}
      />
      <Box flex={1} width={"100%"}>
        <If condition={!!viewModel.messages && viewModel.messages.length > 0}>
          <FlatList
            ref={viewModel.flatlistRef}
            data={viewModel.messages}
            initialNumToRender={20}
            scrollEventThrottle={1}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              paddingHorizontal: 2,
            }}
            contentContainerStyle={{
              gap: 15,
              paddingBottom: 50,
              paddingTop: 150,
            }}
            renderItem={({ item }) => {
              return (
                <MessageContent
                  key={item.id}
                  message={item}
                  isUserMessage={viewModel.userId === item.userId}
                />
              );
            }}
          />
        </If>
      </Box>
      <SendInput onSend={viewModel.send} />
    </Box>
  );
}
