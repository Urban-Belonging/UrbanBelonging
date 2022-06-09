import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Text } from "./Text";

type SettingsListItemProps = {
  title: string;
  onPress: () => void;
};

export function SettingsListItem(props: SettingsListItemProps) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
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
    color: theme.palette.secondary,
    fontSize: 18,
  },
});
