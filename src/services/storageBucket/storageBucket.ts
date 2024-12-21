import { decode } from "base64-arraybuffer";
import { supabase } from "../../../infra/supabase/supabase";

type SendFileParams = {
  bucketName: "images";
  path: string;
  base64: string;
  contentType: "image/png";
};

async function sendFile({
  bucketName,
  contentType,
  path,
  base64,
}: SendFileParams) {
  const { data, error } = await supabase.storage
    .from(bucketName) // Nome do bucket
    .upload(path, decode(base64), { contentType });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(path);

  return publicUrl;
}

export const storageBucket = {
  sendFile,
};
