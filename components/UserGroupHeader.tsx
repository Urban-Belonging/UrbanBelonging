import * as React from "react";
import { StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { PhotoEventWithGroup, PhotoEventWithMetadata } from "../types/models";
import { Icon } from "./Icon";
import { Text } from "./Text";

type UserGroupHeaderProps = {
  event: PhotoEventWithMetadata | PhotoEventWithGroup;
};

export function UserGroupHeader(props: UserGroupHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Icon icon={"groups"} width={20} height={18} color={palette.blue300} />
        <Text style={styles.groupLabel}>{props.event.group.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    backgroundColor: palette.grey50,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing[5],
  },
  groupLabel: {
    fontFamily: typography.primaryBold,
    color: palette.blue300,
    fontSize: 18,
    marginLeft: theme.spacing[3],
  },
});
