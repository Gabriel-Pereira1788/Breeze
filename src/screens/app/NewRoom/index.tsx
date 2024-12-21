import { CreateRoomUseCaseFactory } from "@domain";
import { NewRoomView } from "./new-room.view";
import { useNewRoomViewModel } from "./new-room.viewModel";

export function NewRoom() {
  const viewModel = useNewRoomViewModel({
    createRoomUseCase: CreateRoomUseCaseFactory(),
  });
  return <NewRoomView viewModel={viewModel} />;
}
