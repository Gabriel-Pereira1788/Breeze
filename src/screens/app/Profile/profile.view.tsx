import { Box, Button, Text, TouchableOpacityBox } from "@/components";
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
      <Box gap="sp10" alignItems="center" mb="sp20">
        <ProfileImage imageUrl={viewModel.profile?.avatarUrl} />
        <Text
          text={`@${viewModel.profile?.username ?? ""}`}
          preset="medium/14"
          color="neutralGray500"
        />
        <Text
          text={viewModel.profile?.email ?? ""}
          preset="medium/14"
          color="neutralGray500"
        />
      </Box>

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
            <TouchableOpacityBox
              onPress={() => viewModel.redirectByRouteName(item.routeName)}
              boxProps={{
                flexDirection: "row",
                gap: "sp10",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Icon iconName={item.iconName} size={25} />
              <Text text={item.title} preset="medium/16" />
            </TouchableOpacityBox>
          )}
        />
      </Box>
      <Button
        enableGradient
        text="Logout"
        rightIconName="signOut"
        loading={viewModel.isLoadingSignOut}
        onPress={viewModel.onSignOut}
      />
    </Box>
  );
}
