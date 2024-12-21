import { NewRoomView } from "./new-room.view";
import { useNewRoomViewModel } from "./new-room.viewModel";

export function NewRoom() {
  const viewModel = useNewRoomViewModel();
  return <NewRoomView viewModel={viewModel} />;
}
