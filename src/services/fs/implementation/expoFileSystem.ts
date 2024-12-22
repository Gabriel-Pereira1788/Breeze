import * as FileSystem from "expo-file-system";
import { FsImpl } from "../types";

async function readingInBase64File(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  return base64;
}

export const expoFileSystem: FsImpl = {
  readingInBase64File,
};
