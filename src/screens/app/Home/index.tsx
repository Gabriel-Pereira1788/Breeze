import { GetRoomsUseCaseFactory } from "@domain";
import { HomeView } from "./home.view";
import { useHomeViewModel } from "./home.viewModel";

export function Home() {
  const viewModel = useHomeViewModel({
    getRoomsUseCase: GetRoomsUseCaseFactory(),
  });
  return <HomeView viewModel={viewModel} />;
}
