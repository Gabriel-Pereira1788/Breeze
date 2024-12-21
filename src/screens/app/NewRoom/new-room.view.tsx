import {
  Box,
  Button,
  FormInput,
  Text,
  TouchableOpacityBox,
} from "@/components";
import { NewRoomScreenProps } from "./new-room.model";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Icon } from "@/components/Icon";
import { If } from "@/helpers";

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
        <TouchableOpacityBox
          activeOpacity={0.8}
          onPress={viewModel.openLibrary}
          boxProps={{
            mb: "sp25",
          }}
        >
          <Box
            width={100}
            height={100}
            borderRadius="rd100"
            borderColor="borderDark"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            borderWidth={3}
          >
            <If
              condition={!!viewModel.image}
              elseRender={<Icon iconName="user" size={60} color="borderDark" />}
            >
              <Image
                source={{ uri: viewModel.image! }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </If>
          </Box>
          <Box position="absolute" bottom={0} right={0}>
            <Icon iconName="plus" size={30} color="borderDark" />
          </Box>
        </TouchableOpacityBox>
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
            disabled={viewModel.loadingSubmit || viewModel.isValidForm}
            onPress={viewModel.onSubmit}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
}
