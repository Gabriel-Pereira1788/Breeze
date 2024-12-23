import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  EditProfileSchema,
  EditProfileViewModelProps,
} from "./edit-profile.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { fs, storageBucket, useGetImageLibrary } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@infra";
import { useState } from "react";

export function useEditProfileViewModel({
  editProfileUseCase,
}: EditProfileViewModelProps) {
  const queryClient = useQueryClient();
  const { email, username, avatarUrl } = useLocalSearchParams();

  const { image, pickImage } = useGetImageLibrary();

  const { control, handleSubmit } = useForm<EditProfileSchema>({
    values: {
      email: (email as string) ?? "",
      username: (username as string) ?? "",
    },
    resolver: zodResolver(editProfileSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation<
    null,
    Error,
    EditProfileSchema & { avatarUrl: string }
  >({
    mutationFn: ({ email, username, avatarUrl }) =>
      editProfileUseCase.execute({
        email,
        username,
        avatarUrl,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Profile],
      });
      router.back();
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  async function onSubmit(editProfileData: EditProfileSchema) {
    const url = image?.uri || (avatarUrl as string);
    if (url) {
      setIsLoading(true);
      const base64 = await fs.readingInBase64File(url);

      const path = `${username}-${new Date().getTime()}.png`;
      const imageUrl = await storageBucket.sendFile({
        path,
        base64,
        bucketName: "images",
        contentType: "image/png",
      });

      mutate({
        email: editProfileData.email,
        username: editProfileData.username,
        avatarUrl: imageUrl,
      });
    }
  }

  return {
    avatarUrl: image?.uri ?? (avatarUrl as string),
    control,
    pickImage,
    isLoading,
    onSubmit: handleSubmit(onSubmit),
  };
}
