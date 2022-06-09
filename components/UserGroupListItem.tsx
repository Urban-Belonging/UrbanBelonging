import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { UserGroup } from "../types/models";
import { Icon } from "./Icon";
import { Text } from "./Text";

type UserGroupListItemProps = {
  group: UserGroup;
  onPress: (group: UserGroup) => void;
  onLongPress: (group: UserGroup) => void;
  onInviteMembersPress: (group: UserGroup) => void;
  onAddPhotoEventPress: (group: UserGroup) => void;
};

export function UserGroupListItem(props: UserGroupListItemProps) {
  const {
    group,
    onPress,
    onLongPress,
    onInviteMembersPress: onPressInviteMembers,
    onAddPhotoEventPress: onPressAddPhotoEvent,
  } = props;
  const handlePress = React.useCallback(() => {
    onPress(group);
  }, [group, onPress]);

  const handleLongPress = React.useCallback(() => {
    onLongPress(group);
  }, [group, onLongPress]);
  const handleInviteMemberPress = React.useCallback(
    () => onPressInviteMembers(group),
    [group, onPressInviteMembers]
  );
  const handleAddPhotoEventPress = React.useCallback(
    () => onPressAddPhotoEvent(group),
    [group, onPressAddPhotoEvent]
  );

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.group.name}</Text>
        {/* @TODO implement memberCount <Text style={styles.subtitle}>12 members</Text> */}
      </View>
      <View style={styles.controlsContainer}>
        {group.canInviteMembers && (
          <Icon
            width={32}
            height={32}
            color={palette.blue500}
            icon={"inviteMember"}
            sloppy={false}
            onPress={handleInviteMemberPress}
          />
        )}
        <Icon
          width={38}
          height={36}
          color={palette.blue500}
          icon={"addPhotoEvent"}
          sloppy={false}
          style={styles.addPhotoEventButton}
          onPress={handleAddPhotoEventPress}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: palette.grey100,
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
  },
  title: {
    fontFamily: typography.primary,
    color: palette.blue200,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: typography.primary,
    color: palette.blue300,
    fontSize: 14,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexGrow: 1,
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoEventButton: {
    marginLeft: 8,
  },
});
