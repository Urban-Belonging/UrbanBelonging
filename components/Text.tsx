import * as React from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextStyle,
} from "react-native";
import { theme } from "../constants/theme";

interface TextProps {
  style: StyleProp<TextStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  children: React.ReactNode;
}

export function Text(props: TextProps) {
  return (
    <RNText {...props} style={[styles.container, props.style]}>
      {props.children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    color: theme.palette.white,
  },
});
