import { profileService } from "../profileService";

export function GetProfileUseCaseFactory() {
  return {
    execute: async () => {
      return await profileService.getProfile();
    },
  };
}

export type GetProfileUseCase = ReturnType<typeof GetProfileUseCaseFactory>;
