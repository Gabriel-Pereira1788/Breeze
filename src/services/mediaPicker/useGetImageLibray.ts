import { useState } from "react";
import { mediaPicker } from "./mediaPicker";
import { ImagePicker } from "./types";

export function useGetImageLibrary() {
  const [image, setImage] = useState<ImagePicker | null>(null);

  //TODO: IMPLEMENT PERMISSION

  async function pickImage() {
    try {
      const imageAsset = await mediaPicker.openLibrary();
      if (imageAsset) {
        setImage(imageAsset);
      }
    } catch (err) {
      console.log("ERROR ON PICK IMAGE", err);
    }
  }

  return {
    image,
    pickImage,
  };
}
