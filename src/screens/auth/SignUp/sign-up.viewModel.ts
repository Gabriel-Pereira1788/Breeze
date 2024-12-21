import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "./sign-up.model";
import { SignUpUseCase, User } from "@domain";
import { useMutation } from "@tanstack/react-query";

type Props = {
  signUpUseCase: SignUpUseCase;
};
export function useSignUpViewModel({ signUpUseCase }: Props) {
  const { control, handleSubmit, formState } = useForm<SignUpSchema>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isLoading } = useMutation<User | null, Error, SignUpSchema>({
    mutationFn: (variables) =>
      signUpUseCase.execute({
        email: variables.email,
        password: variables.password,
        phone: variables.phone,
        username: variables.username,
      }),
    onSuccess: (data) => {
      console.log("SIGN-UP-DATA", data);
    },
    onError: (error) => {
      console.log("SIGN-UP-ERROR", error);
    },
  });

  function onSubmit(signUpData: SignUpSchema) {
    mutate(signUpData);
  }
  return {
    isValidForm: formState.isValid,
    isLoading,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type SignUpViewModel = ReturnType<typeof useSignUpViewModel>;
