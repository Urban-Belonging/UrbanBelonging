import * as React from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { theme } from "../constants/theme";
import { UserGroup } from "../types/models";
import { Text } from "./Text";
import { UserGroupCreationForm } from "./UserGroupCreationForm";
import { UserGroupListItem } from "./UserGroupListItem";
import { LoadingState } from "./LoadingState";

type UserGroupListProps = {
  data: UserGroup[];
  isLoading: boolean;
  isCreationFormOpen: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onCreateGroupSubmit: (name: string) => Promise<void>;
  onItemPress: (group: UserGroup) => void;
  onItemLongPress: (group: UserGroup) => void;
  onAddPhotoEventPress: (group: UserGroup) => void;
  onInviteMemberPress: (group: UserGroup) => void;
};

export function UserGroupList(props: UserGroupListProps) {
  if (props.isLoading) return <LoadingState />;
  return (
    <FlatList
      data={props.data}
      contentContainerStyle={styles.listContentContainer}
      ListHeaderComponent={
        props.isCreationFormOpen ? (
          <UserGroupCreationForm
            isLoading={props.isLoading}
            onSubmit={props.onCreateGroupSubmit}
          />
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't belong to any groups.</Text>
        </View>
      }
      refreshing={props.isRefreshing}
      renderItem={({ item }) => (
        <UserGroupListItem
          key={item.id}
          group={item}
          onPress={props.onItemPress}
          onLongPress={props.onItemLongPress}
          onAddPhotoEventPress={props.onAddPhotoEventPress}
          onInviteMembersPress={props.onInviteMemberPress}
        />
      )}
      onRefresh={props.onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flex: 1,
  },
  emptyContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: theme.palette.secondary,
  },
});
