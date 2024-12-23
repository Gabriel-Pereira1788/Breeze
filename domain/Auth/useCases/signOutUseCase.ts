import { authService } from "../authService";

export function SignOutUseCaseFactory() {
  return {
    execute: async () => {
      return await authService.signOut();
    },
  };
}

export type SignOutUseCase = ReturnType<typeof SignOutUseCaseFactory>;
