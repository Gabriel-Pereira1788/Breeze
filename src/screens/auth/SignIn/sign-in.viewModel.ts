import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "./sign-in.model";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Session, SignInUseCase } from "@domain";

type Props = {
  signInUseCase: SignInUseCase;
};

export function useSignInViewModel({ signInUseCase }: Props) {
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
    onSuccess: (data) => {
      console.log("SIGN-IN-DATA", data);
    },
    onError: (error) => {
      console.log("SIGN-UP-ERROR", error);
    },
  });

  function onSubmit(signInData: SignInSchema) {
    mutate(signInData);
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
