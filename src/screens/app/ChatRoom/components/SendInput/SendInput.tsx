import { Box, TextInput } from "@/components";
import { IconPress } from "@/components/Icon";
import { useAppSafeArea } from "@/helpers";
import { useState } from "react";

type Props = {
  onSend: (inputText: string) => void;
};

export function SendInput({ onSend }: Props) {
  const { bottom } = useAppSafeArea();
  const [text, setText] = useState("");

  function handleOnSend() {
    onSend(text);
    setText("");
  }

  return (
    <Box style={{ marginBottom: bottom }}>
      <TextInput
        placeholder="Message ..."
        value={text}
        onChangeText={setText}
        RightElement={
          <IconPress
            iconName="paperPlaneRight"
            variant="transparent"
            onPress={handleOnSend}
          />
        }
      />
    </Box>
  );
}
