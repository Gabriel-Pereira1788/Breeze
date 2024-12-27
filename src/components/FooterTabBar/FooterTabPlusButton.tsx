import { Icon } from "../Icon";
import { TouchableOpacityBox } from "../TouchableOpacityBox/TouchableOpacityBox";

export function FooterTabPlusButton() {
  return (
    <TouchableOpacityBox
      boxProps={{
        position: "absolute",
        top: -22,
        width: 56,
        height: 56,
        borderRadius: "rd100",
        backgroundColor: "primaryMain",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "neutralBlack",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Icon size={28} color="neutralWhite" iconName="plus" />
    </TouchableOpacityBox>
  );
}
