import { Box, Button, FormInput, InsertImage, Text } from "@/components";
import { EditProfileViewProps } from "./edit-profile.model";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { palette } from "@/styles";
import { AnimatedFadeEntrance } from "@/animations";

export function EditProfileView({ viewModel }: EditProfileViewProps) {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: palette.background,
        padding: 40,
      }}
    >
      <Box
        width={"100%"}
        gap="sp10"
        justifyContent="center"
        alignItems="center"
      >
        <InsertImage
          onPress={viewModel.pickImage}
          imageUri={viewModel.avatarUrl}
        />

        <AnimatedFadeEntrance entrance="up">
          <FormInput
            control={viewModel.control}
            name="email"
            placeholder="Email"
          />
        </AnimatedFadeEntrance>
        <AnimatedFadeEntrance entrance="up">
          <FormInput
            control={viewModel.control}
            name="username"
            placeholder="@ username"
          />
        </AnimatedFadeEntrance>
      </Box>

      <Box width={"100%"} mt="sp12">
        <AnimatedFadeEntrance entrance="down">
          <Button
            text="Edit"
            onPress={viewModel.onSubmit}
            loading={viewModel.isLoading}
          />
        </AnimatedFadeEntrance>
      </Box>
    </KeyboardAwareScrollView>
  );
}
