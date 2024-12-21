import { Box, Button, FormInput, Text } from "@/components";
import { NewRoomScreenProps } from "./new-room.model";
import { ScrollView } from "react-native";

export function NewRoomView({ viewModel }: NewRoomScreenProps) {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, width: "100%" }}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        paddingHorizontal="sp20"
        gap="sp10"
      >
        <FormInput control={viewModel.control} name="name" placeholder="Name" />
        <FormInput
          control={viewModel.control}
          name="description"
          placeholder="Description"
          multiline
        />
        <Box mt="sp10" width={"100%"}>
          <Button text="Create" />
        </Box>
      </Box>
    </ScrollView>
  );
}
