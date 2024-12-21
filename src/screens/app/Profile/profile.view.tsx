import { Box, Text } from "@/components";
import { ProfileViewModel } from "./profile.viewModel";

type Props = {
  viewModel: ProfileViewModel;
};

export function ProfileView({ viewModel }: Props) {
  return (
    <Box>
      <Text text="Profile" />
    </Box>
  );
}
