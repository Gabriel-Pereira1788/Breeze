import { SignInUseCaseFactory } from "@domain";
import { SignInView } from "./sign-in.view";
import { useSignInViewModel } from "./sign-in.viewModel";

export function SignInScreen() {
  const viewModel = useSignInViewModel({
    signInUseCase: SignInUseCaseFactory(),
  });

  return <SignInView viewModel={viewModel} />;
}
