import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Button } from "./Button";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

type UserGroupCreationFormProps = {
  isLoading: boolean;
  onSubmit: (name: string) => Promise<void>;
};

export function UserGroupCreationForm(props: UserGroupCreationFormProps) {
  const { onSubmit } = props;
  const [name, setName] = React.useState("");
  const handleButtonPress = React.useCallback(async () => {
    if (!name) return Alert.alert("Group Name", "Please enter a group name");
    await onSubmit(name);
  }, [name, onSubmit]);
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>New group:</Text>
      <TextInput
        value={name}
        placeholder={"New group name"}
        style={styles.input}
        onChange={setName}
      />
      <View style={styles.submitContainer}>
        <Button
          text={"Create"}
          disabled={props.isLoading}
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    backgroundColor: palette.grey100,
    padding: theme.spacing[5],
  },
  input: {
    marginTop: theme.spacing[3],
  },
  submitContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: theme.spacing[5],
  },
  formLabel: {
    fontFamily: typography.primary,
    color: theme.palette.secondary,
    fontSize: 18,
  },
});
