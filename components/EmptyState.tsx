import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { palette } from "../constants/theme";
import { typography } from "../constants/typography";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface EmptyStateProps {
  title: string;
  style?: ViewStyle;
  message?: string;
}

export function EmptyState(props: React.PropsWithChildren<EmptyStateProps>) {
  return (
    <View style={[styles.emptyContainer, props.style]}>
      <Icon icon={"empty"} width={54} height={54} color={palette.blue300} />
      <Text style={styles.emptyTitle}>{props.title}</Text>
      {!!props.message && (
        <Text style={styles.emptyMessage}>{props.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: palette.grey50,
    borderRadius: 4,
    padding: 10,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: typography.primaryBold,
    color: palette.grey500,
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: typography.primary,
    color: palette.grey500,
  },
});
