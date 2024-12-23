import { EditProfileUseCaseFactory } from "@domain";
import { EditProfileView } from "./edit-profile.view";
import { useEditProfileViewModel } from "./edit-profile.viewModel";

export function EditProfile() {
  const viewModel = useEditProfileViewModel({
    editProfileUseCase: EditProfileUseCaseFactory(),
  });
  return <EditProfileView viewModel={viewModel} />;
}
