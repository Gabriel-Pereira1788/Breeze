import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "./sign-up.model";
import { SignUpUseCase, User } from "@domain";
import { useMutation } from "@tanstack/react-query";
import { ToasterService } from "@/services";
import { buildAuthErrorMessage } from "@/helpers";

type Props = {
  signUpUseCase: SignUpUseCase;
  toasterService: ToasterService;
};
export function useSignUpViewModel({ signUpUseCase, toasterService }: Props) {
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
    onError: (error) => {
      const { title, message } = buildAuthErrorMessage(error.message);
      toasterService.error(title, message);
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
