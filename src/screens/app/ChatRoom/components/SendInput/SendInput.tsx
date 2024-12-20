import { TextInput } from "@/components";
import { IconPress } from "@/components/Icon";
import { useRef, useState } from "react";

type Props = {
  onSend: (inputText: string) => void;
};

export function SendInput({ onSend }: Props) {
  const [text, setText] = useState("");

  function handleOnSend() {
    onSend(text);
    setText("");
  }

  return (
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
  );
}
