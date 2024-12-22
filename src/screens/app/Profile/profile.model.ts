import { IconName } from "@/components/Icon";
import { useProfileViewModel } from "./profile.viewModel";

export type ProfileViewProps = {
  viewModel: ProfileViewModel;
};

export type ProfileViewModel = ReturnType<typeof useProfileViewModel>;

type Option = {
  iconName: IconName;
  title: string;
};

export const options: Option[] = [
  {
    iconName: "user",
    title: "Edit Profile",
  },
  {
    iconName: "notification",
    title: "Notifications",
  },
];
