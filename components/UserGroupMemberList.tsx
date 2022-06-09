import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { UserGroupMember } from "../types/models";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { UserGroupMemberInvitationForm } from "./UserGroupMemberInvitationForm";
import { UserGroupMemberListItem } from "./UserGroupMemberListItem";

type UserGroupMemberListProps = {
  data: UserGroupMember[];
  isLoading: boolean;
  isInvitationFormOpen: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onInviteMemberSubmit: (params: {
    emailOrUsername: string;
    canInviteMembers: boolean;
    canCreatePhotoEvents: boolean;
  }) => Promise<void>;
};

export function UserGroupMemberList(props: UserGroupMemberListProps) {
  if (props.isLoading) return <LoadingState />;
  return (
    <FlatList
      data={props.data}
      ListHeaderComponent={
        props.isInvitationFormOpen ? (
          <UserGroupMemberInvitationForm
            isLoading={props.isLoading}
            onSubmit={props.onInviteMemberSubmit}
          />
        ) : null
      }
      ListEmptyComponent={
        <EmptyState title={"There's no members in this group"} />
      }
      refreshing={props.isRefreshing}
      renderItem={({ item }) => (
        <UserGroupMemberListItem key={item.id} member={item} />
      )}
      onRefresh={props.onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
});
