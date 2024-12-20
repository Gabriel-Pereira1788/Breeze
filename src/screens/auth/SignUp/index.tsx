import { SignUpUseCaseFactory } from "@domain";
import { SignUpView } from "./sign-up.view";
import { useSignUpViewModel } from "./sign-up.viewModel";

export function SignUpScreen() {
  const viewModel = useSignUpViewModel({
    signUpUseCase: SignUpUseCaseFactory(),
  });

  return <SignUpView viewModel={viewModel} />;
}
