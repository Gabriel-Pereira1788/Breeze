import { authService } from "../authService";
import { SignUpRequest } from "../authTypes";

export function SignUpUseCaseFactory() {
  return {
    execute: async (request: SignUpRequest) => {
      return await authService.signUp(request);
    },
  };
}

export type SignUpUseCase = ReturnType<typeof SignUpUseCaseFactory>;
