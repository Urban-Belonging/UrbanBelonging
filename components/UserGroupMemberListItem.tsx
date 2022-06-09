import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { UserGroupMember } from "../types/models";
import { Text } from "./Text";

type UserGroupMemberListItemProps = {
  member: UserGroupMember;
};

export function UserGroupMemberListItem(props: UserGroupMemberListItemProps) {
  const handleLongPress = React.useCallback(() => {}, []);
  return (
    <Pressable style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.title}>{props.member.username}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: palette.grey100,
    padding: theme.spacing[5],
  },
  title: {
    fontFamily: typography.primary,
    color: palette.blue200,
    fontSize: 18,
  },
});
