import { Box, Button, Text } from "@/components";
import { ActivityIndicator, FlatList } from "react-native";
import { options, ProfileViewProps } from "./profile.model";
import { ProfileImage } from "./components";
import { Icon } from "@/components/Icon";

export function ProfileView({ viewModel }: ProfileViewProps) {
  if (viewModel.isLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={20} />
      </Box>
    );
  }
  return (
    <Box
      flex={1}
      backgroundColor="background"
      paddingHorizontal="sp28"
      alignItems="center"
      justifyContent="center"
    >
      <ProfileImage imageUrl={viewModel.profile?.avatarUrl} />
      <Box width={"100%"} alignItems="center" my="sp20">
        <FlatList
          data={options}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            width: "100%",
          }}
          ItemSeparatorComponent={() => (
            <Box height={1} my="sp15" backgroundColor="neutralGray300" />
          )}
          renderItem={({ item }) => (
            <Box
              flexDirection="row"
              gap="sp10"
              width={"100%"}
              alignItems="center"
            >
              <Icon iconName={item.iconName} size={25} />
              <Text text={item.title} preset="medium/16" />
            </Box>
          )}
        />
      </Box>
      <Button text="Logout" rightIconName="signOut" />
    </Box>
  );
}
