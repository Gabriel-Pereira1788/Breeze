import { EditProfileUseCase } from "@domain";
import { useEditProfileViewModel } from "./edit-profile.viewModel";
import { z } from "zod";
export type EditProfileViewProps = {
  viewModel: EditProfileViewModel;
};

export type EditProfileViewModelProps = {
  editProfileUseCase: EditProfileUseCase;
};

export type EditProfileViewModel = ReturnType<typeof useEditProfileViewModel>;

export const editProfileSchema = z.object({
  email: z.string({ required_error: "Empty Field" }).email("Invalid email."),
  username: z
    .string({ required_error: "Empty Field" })
    .min(5, "Name to short."),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
