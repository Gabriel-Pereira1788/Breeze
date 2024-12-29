import { SignInUseCaseFactory } from "@domain";
import { SignInView } from "./sign-in.view";
import { useSignInViewModel } from "./sign-in.viewModel";
import { ToasterServiceFactory } from "@/services";

export function SignInScreen() {
  const viewModel = useSignInViewModel({
    signInUseCase: SignInUseCaseFactory(),
    toasterService: ToasterServiceFactory(),
  });

  return <SignInView viewModel={viewModel} />;
}
