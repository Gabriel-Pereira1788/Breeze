import { Box } from "../Box/Box";
import { BoxGradient } from "../Box";

type ButtonContainerProps = {
  enableGradient?: boolean;
  rightIconName?: boolean;
} & React.PropsWithChildren;
export function ButtonContainer({
  children,
  enableGradient,
  rightIconName,
}: ButtonContainerProps) {
  if (enableGradient) {
    return (
      <BoxGradient
        colors={["primaryMain", "secondaryMain"]}
        flexDirection={rightIconName ? "row" : "column"}
        gap="sp10"
        width={"100%"}
        height={"100%"}
        alignItems="center"
        justifyContent="center"
        startPoint={{
          x: 0.3,
          y: 0.1,
        }}
        endPoint={{
          x: 0.9,
          y: 0.1,
        }}
      >
        {children}
      </BoxGradient>
    );
  }
  return (
    <Box flexDirection={rightIconName ? "row" : "column"} gap="sp10">
      {children}
    </Box>
  );
}
