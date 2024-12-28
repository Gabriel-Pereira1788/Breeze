import { Box, Button, FormInput, InsertImage } from "@/components";
import { NewRoomScreenProps } from "./new-room.model";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export function NewRoomView({ viewModel }: NewRoomScreenProps) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, width: "100%" }}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        paddingHorizontal="sp20"
        gap="sp10"
      >
        <InsertImage onPress={viewModel.pickImage} imageUri={viewModel.image} />
        <FormInput control={viewModel.control} name="name" placeholder="Name" />
        <FormInput
          control={viewModel.control}
          name="description"
          placeholder="Description"
          multiline
        />
        <Box mt="sp10" width={"100%"}>
          <Button
            text="Create"
            enableGradient
            disabled={viewModel.loadingSubmit || viewModel.isValidForm}
            onPress={viewModel.onSubmit}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
}
