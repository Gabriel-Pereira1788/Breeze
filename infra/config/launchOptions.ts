import { LaunchArguments } from "react-native-launch-arguments";

let launchArgs = LaunchArguments.value();
function isTesting() {
  return launchArgs.isTesting;
}

export const launchOptions = {
  isTesting,
};
