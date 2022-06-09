import * as React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Icon } from "./Icon";
import { Text } from "./Text";

type CheckboxProps = {
  checked: boolean;
  label?: string;
  onChange: (isChecked: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Checkbox(props: CheckboxProps) {
  const { checked, onChange } = props;
  const handlePress = React.useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <Pressable
      {...props}
      style={[styles.container, props.style]}
      onPress={handlePress}
    >
      <View style={[styles.checkboxContainer, props.checked && styles.checked]}>
        <Icon
          icon={"check"}
          width={12}
          height={8}
          color={checked ? palette.white : palette.grey100}
          sloppy={false}
        />
      </View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: theme.spacing[3],
  },
  checkboxContainer: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    borderRadius: 2,
  },
  checked: {
    backgroundColor: theme.palette.primary,
  },
  label: {
    fontFamily: typography.primary,
    color: theme.palette.secondary,
    fontSize: 15,
    paddingLeft: theme.spacing[3],
  },
});
