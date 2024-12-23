import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";
import Check from "phosphor-react-native/src/icons/Check";
import DoorOpen from "phosphor-react-native/src/icons/DoorOpen";
import Email from "phosphor-react-native/src/icons/Envelope";
import Eye from "phosphor-react-native/src/icons/Eye";
import EyeClosed from "phosphor-react-native/src/icons/EyeClosed";
import EyeSlash from "phosphor-react-native/src/icons/EyeSlash";
import Gear from "phosphor-react-native/src/icons/Gear";
import House from "phosphor-react-native/src/icons/HouseSimple";
import List from "phosphor-react-native/src/icons/List";
import Lock from "phosphor-react-native/src/icons/Lock";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import PlaceHolder from "phosphor-react-native/src/icons/Placeholder";
import User from "phosphor-react-native/src/icons/User";
import Warning from "phosphor-react-native/src/icons/Warning";
import Bell from "phosphor-react-native/src/icons/Bell";
import X from "phosphor-react-native/src/icons/X";
import Phone from "phosphor-react-native/src/icons/Phone";
import PaperPlaneRight from "phosphor-react-native/src/icons/PaperPlaneRight";
import Plus from "phosphor-react-native/src/icons/Plus";
import SignOut from "phosphor-react-native/src/icons/SignOut";
import Notification from "phosphor-react-native/src/icons/Notification";

import { IconProps } from "../Icon";

export const mappedIcons = {
  email: Email,
  lock: Lock,
  eye: Eye,
  eyeClosed: EyeClosed,
  eyeSlash: EyeSlash,
  arrowLeft: ArrowLeft,
  check: Check,
  warning: Warning,
  user: User,
  house: House,
  magnifyingGlass: MagnifyingGlass,
  doorOpen: DoorOpen,
  gear: Gear,
  list: List,
  placeHolder: PlaceHolder,
  bell: Bell,
  arrowRight: ArrowRight,
  phone: Phone,
  paperPlaneRight: PaperPlaneRight,
  plus: Plus,
  signOut: SignOut,
  notification: Notification,

  x: X,
};

export function buildIcon(iconName: IconProps["iconName"]) {
  return mappedIcons[iconName];
}
