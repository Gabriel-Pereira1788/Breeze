import React from "react";
import { Box, Button, FormInput, FormInputSecurity, Text } from "@/components";
import { SignInViewModel } from "./sign-in.viewModel";

import { AnimatedFadeEntrance } from "@/animations";

type Props = {
  viewModel: SignInViewModel;
};

export function SignInView({ viewModel }: Props) {
  return (
    <>
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
            text="Login"
            enableGradient
            disabled={!viewModel.isValidForm}
            loading={viewModel.isLoading}
            onPress={viewModel.onSubmit}
          />
        </AnimatedFadeEntrance>
      </Box>
      <Box
        width={"100%"}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        mt="sp10"
      >
        <Text
          preset="medium/16"
          color="textSecondary"
          text={"Create a new account? "}
        />

        <Button
          text={"Sign Up"}
          variant="transparent"
          onPress={viewModel.redirectToSignUpScreen}
        />
      </Box>
    </>
  );
}
