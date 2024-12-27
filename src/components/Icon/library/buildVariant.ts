import { BoxProps } from "@/components/Box/Box";
import { IconPressProps } from "../IconPress";

export function buildVariant(
  variant: IconPressProps["variant"]
): BoxProps | undefined {
  switch (variant) {
    case "filled":
      return {
        backgroundColor: "neutralWhite",
        padding: "sp12",
        borderRadius: "rd12",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: "neutralGray500",
        elevation: 2,
      };
    case "transparent":
      return undefined;
    case "rounded":
      return {
        backgroundColor: "neutralWhite",
        padding: "sp12",
        borderRadius: "rd100",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: "neutralGray500",
        elevation: 2,
      };
  }
}
