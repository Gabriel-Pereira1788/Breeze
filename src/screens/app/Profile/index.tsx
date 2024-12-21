import { ProfileView } from "./profile.view";
import { useProfileViewModel } from "./profile.viewModel";

export function Profile() {
  const viewModel = useProfileViewModel();
  return <ProfileView viewModel={viewModel} />;
}
