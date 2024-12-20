import { authService } from "../authService";

type SignUpRequest = {
  email: string;
  password: string;
  phone: string;
};

export function SignUpUseCaseFactory() {
  return {
    execute: async ({ email, password, phone }: SignUpRequest) => {
      return await authService.signUp(email, password, phone);
    },
  };
}

export type SignUpUseCase = ReturnType<typeof SignUpUseCaseFactory>;
