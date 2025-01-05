import { ChatRoomDetailsView } from "@/screens/app/ChatRoomDetails/chat-room-details.view";
import { useChatRoomDetailsViewModel } from "@/screens/app/ChatRoomDetails/chat-room-details.viewModel";
import { DeleteRoomUseCaseFactory } from "@domain";

export function ChatRoomDetails() {
  const viewModel = useChatRoomDetailsViewModel({
    deleteRoomUseCase: DeleteRoomUseCaseFactory(),
  });
  return <ChatRoomDetailsView viewModel={viewModel} />;
}
