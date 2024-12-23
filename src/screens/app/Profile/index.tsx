import { GetProfileUseCaseFactory, SignOutUseCaseFactory } from "@domain";
import { ProfileView } from "./profile.view";
import { useProfileViewModel } from "./profile.viewModel";

export function Profile() {
  const viewModel = useProfileViewModel({
    getProfileUseCase: GetProfileUseCaseFactory(),
    signOutUseCase: SignOutUseCaseFactory(),
  });
  return <ProfileView viewModel={viewModel} />;
}
