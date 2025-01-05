import { ChatRoomDetailsViewModel } from "./chat-room-details.viewModel";
import { DeleteRoomUseCase } from "@domain";

export type ChatRoomDetailsViewProps = {
  viewModel: ChatRoomDetailsViewModel;
};

export type ChatRoomDetailsViewModelProps = {
  deleteRoomUseCase: DeleteRoomUseCase;
};
