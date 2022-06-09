import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import { UserGroupList } from "../components/UserGroupList";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { UserGroupsNavigatorParamList } from "../navigation/UserGroupsNavigator";
import { UserGroup } from "../types/models";

type UserGroupsScreenProps = {
  navigation: NavigationProp<UserGroupsNavigatorParamList>;
};

export default function UserGroupsScreen(props: UserGroupsScreenProps) {
  const globalState = useGlobalState();
  const api = useApi();
  const [isCreationFormOpen, setIsCreationFormOpen] = React.useState(false);
  const [groups, setGroups] = React.useState<UserGroup[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddPress = React.useCallback(
    () => setIsCreationFormOpen(!isCreationFormOpen),
    [isCreationFormOpen]
  );
  const handleItemPress = React.useCallback((group: UserGroup) => {}, []);
  const handleItemLongPress = React.useCallback((group: UserGroup) => {
    if (group.canInviteMembers) {
      Alert.alert("Group ID", group.id);
    }
  }, []);
  const handleAddPhotoEventPress = React.useCallback(
    (group: UserGroup) => {
      globalState.selectGroup(group);
      props.navigation.navigate("photoEventsList");
    },
    [globalState]
  );
  const handleInviteMemberPress = React.useCallback(
    (group: UserGroup) => {
      globalState.selectGroup(group);
      props.navigation.navigate("userGroupMembersList");
    },
    [globalState]
  );
  const fetchGroups = React.useCallback(async (skipLoading = false) => {
    try {
      if (!skipLoading) setIsLoading(true);
      const groups = await api.userGroups.listForMe();
      setGroups(groups);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Please try again.");
    } finally {
      if (!skipLoading) setIsLoading(false);
    }
  }, []);
  const handleCreateGroupSubmit = React.useCallback(async (name: string) => {
    try {
      setIsLoading(true);
      await api.userGroups.create({
        name,
      });
      setIsCreationFormOpen(false);
      await fetchGroups();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await fetchGroups(true);
    setIsRefreshing(false);
  }, [fetchGroups]);

  React.useEffect(() => {
    (async () => {
      await fetchGroups();
    })();
  }, [fetchGroups]);

  return (
    <Screen>
      <Header variant={"userGroupList"} onPressAdd={handleAddPress} />
      <View style={styles.container}>
        <UserGroupList
          data={groups}
          isLoading={isLoading}
          isCreationFormOpen={isCreationFormOpen}
          isRefreshing={isRefreshing}
          onCreateGroupSubmit={handleCreateGroupSubmit}
          onRefresh={handleRefresh}
          onItemPress={handleItemPress}
          onItemLongPress={handleItemLongPress}
          onAddPhotoEventPress={handleAddPhotoEventPress}
          onInviteMemberPress={handleInviteMemberPress}
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
