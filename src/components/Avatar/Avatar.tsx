import { Image } from "react-native";
import { Box } from "../Box/Box";

type Props = {
  url: string;
  size: number;
};
export function Avatar({ url, size }: Props) {
  return (
    <Box
      width={size}
      height={size}
      borderRadius="rd100"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      alignSelf="flex-end"
      mr="sp10"
    >
      <Image
        source={{ uri: url }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </Box>
  );
}
