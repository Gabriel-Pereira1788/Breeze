export type ImagePicker = {
  uri: string;
};

export interface MediaPickerImpl {
  openLibrary(): Promise<ImagePicker | null>;
}
