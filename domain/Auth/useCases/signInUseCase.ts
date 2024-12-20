import { authService } from "../authService";

export function SignInUseCaseFactory() {
  return {
    execute: async (email: string, password: string) => {
      return await authService.signIn(email, password);
    },
  };
}

export type SignInUseCase = ReturnType<typeof SignInUseCaseFactory>;
