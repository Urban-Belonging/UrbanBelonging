import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";

type ScreenProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export function Screen(props: ScreenProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["right", "top", "left"]} style={styles.content}>
        {props.header}
        {props.children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.palette.secondary,
  },
  statusBar: {
    backgroundColor: theme.palette.secondary,
    height: StatusBar.currentHeight || 25,
  },
  content: {
    flex: 1,
    flexGrow: 1,
  },
});
