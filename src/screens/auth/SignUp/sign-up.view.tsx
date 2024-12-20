import { Box, Button, FormInput, FormInputSecurity } from "@/components";
import { SignUpViewModel } from "./sign-up.viewModel";
import { AnimatedFadeEntrance } from "@/animations";

type Props = {
  viewModel: SignUpViewModel;
};

export function SignUpView({ viewModel }: Props) {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box gap="sp10" width={"100%"}>
        <AnimatedFadeEntrance entrance="up">
          <FormInput
            control={viewModel.control}
            name="email"
            placeholder="Email"
            leftIconProps={{
              iconName: "email",
            }}
          />
        </AnimatedFadeEntrance>
        <AnimatedFadeEntrance entrance="up">
          <FormInput
            control={viewModel.control}
            name="phone"
            placeholder="Phone"
            leftIconProps={{
              iconName: "phone",
            }}
          />
        </AnimatedFadeEntrance>
        <AnimatedFadeEntrance entrance="down">
          <FormInputSecurity
            control={viewModel.control}
            name="password"
            placeholder="Password"
          />
        </AnimatedFadeEntrance>
      </Box>

      <Box width={"100%"} mt="sp12">
        <AnimatedFadeEntrance entrance="down">
          <Button
            text="Register"
            disabled={!viewModel.isValidForm}
            loading={viewModel.isLoading}
            onPress={viewModel.onSubmit}
          />
        </AnimatedFadeEntrance>
      </Box>
    </Box>
  );
}
