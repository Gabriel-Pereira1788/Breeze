import { profileService } from "../profileService";
import { ProfileRequest } from "../profileTypes";

export function EditProfileUseCaseFactory() {
  return {
    execute: async (request: ProfileRequest) => {
      return await profileService.editProfile(request);
    },
  };
}

export type EditProfileUseCase = ReturnType<typeof EditProfileUseCaseFactory>;
