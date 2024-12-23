import { useSessionActions } from "@/providers";
import { GetProfileUseCase, SignOutUseCase } from "@domain";
import { QueryKeys } from "@infra";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RouteName } from "./profile.model";
import { router } from "expo-router";

type Props = {
  getProfileUseCase: GetProfileUseCase;
  signOutUseCase: SignOutUseCase;
};

export function useProfileViewModel({
  getProfileUseCase,
  signOutUseCase,
}: Props) {
  const { clearSession } = useSessionActions();

  const { data: profile, isLoading } = useQuery({
    queryKey: [QueryKeys.Profile],
    queryFn: getProfileUseCase.execute,
  });

  const { mutate, isLoading: isLoadingSignOut } = useMutation({
    mutationFn: signOutUseCase.execute,
    onSuccess: () => {
      clearSession();
    },
  });

  function onSignOut() {
    mutate();
  }

  function redirectByRouteName(routeName: RouteName) {
    if (routeName === "edit-profile") {
      console.log("REDIRECT-AVATAR-URL", profile?.avatarUrl);
      router.push(
        `/(app)/edit-profile?email=${profile?.email}&username=${profile?.username}&avatarUrl=${profile?.avatarUrl}`
      );
    }
  }

  return {
    profile,
    isLoading,
    onSignOut,
    isLoadingSignOut,
    redirectByRouteName,
  };
}
