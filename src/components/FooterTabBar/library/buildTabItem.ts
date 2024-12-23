import { IconProps } from "../../Icon";

export type KeyTabParamList = "home" | "profile";
const mappedScreenToProps: Record<
  KeyTabParamList,
  { iconName: IconProps["iconName"] }
> = {
  home: {
    iconName: "house",
  },
  profile: {
    iconName: "user",
  },
};
export function buildTabItem(routeName: KeyTabParamList) {
  return mappedScreenToProps[routeName];
}
