import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";

interface LoadingStateProps {
  float?: boolean;
  size?: "large" | "small";
}

export function LoadingState(props: LoadingStateProps) {
  return (
    <View style={[styles.container, props.float && styles.floating]}>
      <ActivityIndicator
        size={props.size || "large"}
        color={theme.palette.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floating: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
