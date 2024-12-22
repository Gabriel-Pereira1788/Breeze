import { useForm } from "react-hook-form";
import { roomSchema, RoomSchema } from "./new-room.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomUseCase, NewRoomRequest } from "@domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@infra";
import { router } from "expo-router";

import { fs, storageBucket, useGetImageLibrary } from "@/services";

type Props = {
  createRoomUseCase: CreateRoomUseCase;
};

export function useNewRoomViewModel({ createRoomUseCase }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<null, Error, NewRoomRequest>({
    mutationFn: (variables) => createRoomUseCase.execute(variables),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ChatRooms]);
      router.back();
    },
    onError: (error) => {
      console.log("Error on create new room", error);
    },
  });

  const { control, handleSubmit, formState } = useForm<RoomSchema>({
    defaultValues: {
      description: "",
      name: "",
    },
    mode: "onChange",
    resolver: zodResolver(roomSchema),
  });

  const { image, pickImage } = useGetImageLibrary();

  async function onSubmit(roomData: RoomSchema) {
    if (image && image.uri) {
      try {
        const base64 = await fs.readingInBase64File(image.uri);

        const path = `${new Date().getTime()}.png`;
        const imageUrl = await storageBucket.sendFile({
          path,
          base64,
          bucketName: "images",
          contentType: "image/png",
        });

        mutate({
          description: roomData.description,
          imageUrl,
          name: roomData.name,
        });
      } catch (error) {
        console.log("Error on send image", error);
      }
    }
  }

  return {
    control,
    pickImage,
    image: image?.uri,
    isValidForm: formState.isValid,
    onSubmit: handleSubmit(onSubmit),
    loadingSubmit: isLoading,
  };
}
