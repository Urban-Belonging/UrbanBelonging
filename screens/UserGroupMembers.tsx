import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import { UserGroupMemberList } from "../components/UserGroupMemberList";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { UserGroupsNavigatorParamList } from "../navigation/UserGroupsNavigator";
import { UserGroupMember } from "../types/models";

type UserGroupMembersScreenProps = {
  navigation: NavigationProp<UserGroupsNavigatorParamList>;
};

export default function UserGroupMembersScreen(
  props: UserGroupMembersScreenProps
) {
  const { selectedGroup } = useGlobalState();
  const api = useApi();
  const [isInvitationFormOpen, setIsInvitationFormOpen] = React.useState(false);
  const [members, setMembers] = React.useState<UserGroupMember[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddPress = React.useCallback(
    () => setIsInvitationFormOpen(!isInvitationFormOpen),
    [isInvitationFormOpen]
  );

  const fetchMembers = React.useCallback(
    async (skipLoading = false) => {
      if (!selectedGroup) return;
      try {
        if (!skipLoading) setIsLoading(true);
        const members = await api.userGroups.listMembers(selectedGroup.id);
        setMembers(members);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        if (!skipLoading) setIsLoading(false);
      }
    },
    [selectedGroup]
  );
  const handleInviteMemberSubmit = React.useCallback(
    async (params: {
      emailOrUsername: string;
      canInviteMembers: boolean;
      canCreatePhotoEvents: boolean;
    }) => {
      if (!selectedGroup) return;
      try {
        setIsLoading(true);
        await api.userGroups.inviteMember(selectedGroup.id, params);
        setIsInvitationFormOpen(false);
        await fetchMembers();
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedGroup, fetchMembers]
  );

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await fetchMembers(true);
    setIsRefreshing(false);
  }, [fetchMembers]);

  React.useEffect(() => {
    (async () => {
      await fetchMembers();
    })();
  }, [fetchMembers]);

  return (
    <Screen>
      <Header
        variant={"userGroupMembersList"}
        title={"Members"}
        canAdd={selectedGroup?.canInviteMembers || false}
        canGoBack
        onPressGoBack={props.navigation.goBack}
        onPressAdd={handleAddPress}
      />
      <View style={styles.container}>
        <UserGroupMemberList
          data={members}
          isLoading={isLoading}
          isInvitationFormOpen={isInvitationFormOpen}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onInviteMemberSubmit={handleInviteMemberSubmit}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background,
  },
});
