import { IconName } from "@/components/Icon";
import { useProfileViewModel } from "./profile.viewModel";

export type ProfileViewProps = {
  viewModel: ProfileViewModel;
};

export type ProfileViewModel = ReturnType<typeof useProfileViewModel>;

export type RouteName = "edit-profile" | "notifications" | "settings";
type Option = {
  routeName: RouteName;
  iconName: IconName;
  title: string;
};

export const options: Option[] = [
  {
    routeName: "edit-profile",
    iconName: "user",
    title: "Edit Profile",
  },
  {
    routeName: "notifications",
    iconName: "notification",
    title: "Notifications",
  },
  {
    routeName: "settings",
    iconName: "gear",
    title: "Settings",
  },
];
