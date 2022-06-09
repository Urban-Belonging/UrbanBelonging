import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";

type TextInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  variant?: "light" | "dark";
  style?: StyleProp<ViewStyle>;
} & Partial<Omit<RNTextInputProps, "onChange">>;

export function TextInput(props: TextInputProps) {
  const { onChange, ...rest } = props;
  return (
    <RNTextInput
      {...rest}
      placeholderTextColor={palette.blue300}
      style={[
        styles.input,
        props.style,
        props.variant === "dark" && styles.dark,
      ]}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    height: 50,
    backgroundColor: theme.palette.background,
    fontFamily: typography.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: palette.blue300,
  },
  dark: {
    borderWidth: 0,
  },
});
