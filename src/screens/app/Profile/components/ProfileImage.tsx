import { Box } from "@/components";
import { Icon } from "@/components/Icon";
import { If } from "@/helpers";
import { Image } from "react-native";

type Props = {
  imageUrl?: string;
};

export function ProfileImage({ imageUrl }: Props) {
  return (
    <Box
      width={100}
      height={100}
      borderRadius="rd100"
      borderColor="borderDark"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      borderWidth={imageUrl ? 0 : 3}
    >
      <If
        condition={!!imageUrl}
        elseRender={<Icon iconName="user" size={60} color="borderDark" />}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </If>
    </Box>
  );
}
