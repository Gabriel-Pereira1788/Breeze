import { MediaPickerImpl } from "./types";
import { expoImagePicker } from "./implementation/expoImagePicker";

export let mediaPicker: MediaPickerImpl = expoImagePicker;

export function setMediaPickerImpl(mediaPickerImpl: MediaPickerImpl) {
  mediaPicker = mediaPickerImpl;
}
