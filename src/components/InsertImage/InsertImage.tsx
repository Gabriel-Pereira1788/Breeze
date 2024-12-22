import { If } from "@/helpers";
import { Box } from "../Box/Box";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";
import { Icon } from "../Icon";
import { Image } from "react-native";

type Props = {
  onPress: () => void;
  imageUri?: string;
};

export function InsertImage({ onPress, imageUri }: Props) {
  return (
    <TouchableOpacityBox
      activeOpacity={0.8}
      onPress={onPress}
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
          condition={!!imageUri}
          elseRender={<Icon iconName="user" size={60} color="borderDark" />}
        >
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </If>
      </Box>
      <Box position="absolute" bottom={0} right={0}>
        <Icon iconName="plus" size={30} color="borderDark" />
      </Box>
    </TouchableOpacityBox>
  );
}
