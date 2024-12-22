import * as ImagePicker from "expo-image-picker";
import { MediaPickerImpl } from "../types";

async function openLibrary() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true,
  });
  if (!result.canceled) {
    return result.assets[0] as ImagePicker.ImagePickerAsset;
  }

  return null;
}

export const expoImagePicker: MediaPickerImpl = {
  openLibrary,
};
