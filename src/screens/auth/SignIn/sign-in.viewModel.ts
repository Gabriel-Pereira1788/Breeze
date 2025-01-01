import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "./sign-in.model";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Session, SignInUseCase } from "@domain";
import { ToasterService } from "@/services";
import { buildAuthErrorMessage } from "@/helpers";

type Props = {
  signInUseCase: SignInUseCase;
  toasterService: ToasterService;
};

export function useSignInViewModel({ signInUseCase, toasterService }: Props) {
  const { control, handleSubmit, formState } = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isLoading } = useMutation<
    Session | null,
    Error,
    SignInSchema
  >({
    mutationFn: (variables) =>
      signInUseCase.execute(variables.email, variables.password),

    onError: (error) => {
      const { title, message } = buildAuthErrorMessage(error.message);
      toasterService.error(title, message);
    },
  });

  async function onSubmit(signInData: SignInSchema) {
    await mutate(signInData);
  }

  function redirectToSignUpScreen() {
    router.navigate("/sign-up");
  }

  return {
    isValidForm: formState.isValid,
    redirectToSignUpScreen,
    control,
    onSubmit: handleSubmit(onSubmit),
    isLoading,
  };
}

export type SignInViewModel = ReturnType<typeof useSignInViewModel>;
