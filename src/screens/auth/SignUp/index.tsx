import { SignUpUseCaseFactory } from "@domain";
import { SignUpView } from "./sign-up.view";
import { useSignUpViewModel } from "./sign-up.viewModel";
import { ToasterServiceFactory } from "@/services";

export function SignUpScreen() {
  const viewModel = useSignUpViewModel({
    signUpUseCase: SignUpUseCaseFactory(),
    toasterService: ToasterServiceFactory(),
  });

  return <SignUpView viewModel={viewModel} />;
}
