import { GetProfileUseCase } from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";

type Props = {
  getProfileUseCase: GetProfileUseCase;
};

export function useProfileViewModel({ getProfileUseCase }: Props) {
  const { data: profile, isLoading } = useQuery({
    queryKey: [QueryKeys.Profile],
    queryFn: getProfileUseCase.execute,
  });

  console.log("PROFILE", profile);
  return {
    profile,
    isLoading,
  };
}
