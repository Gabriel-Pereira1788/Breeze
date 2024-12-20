import { GetMessagesUseCaseFactory, SendMessageUseCaseFactory } from "@domain";
import { ChatRoomView } from "./chat-room.view";
import { useChatRoomViewModel } from "./chat-room.viewModel";

export function ChatRoomScreen() {
  const viewModel = useChatRoomViewModel({
    getMessagesUseCase: GetMessagesUseCaseFactory(),
    sendMessageUseCase: SendMessageUseCaseFactory(),
  });

  return <ChatRoomView viewModel={viewModel} />;
}
