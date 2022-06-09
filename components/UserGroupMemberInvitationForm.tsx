import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

type UserGroupMemberInvitationFormProps = {
  isLoading: boolean;
  onSubmit: (params: {
    emailOrUsername: string;
    canInviteMembers: boolean;
    canCreatePhotoEvents: boolean;
  }) => Promise<void>;
};

export function UserGroupMemberInvitationForm(
  props: UserGroupMemberInvitationFormProps
) {
  const { onSubmit } = props;
  const { selectedGroup } = useGlobalState();
  const [canCreatePhotoEvents, setCanCreatePhotoEvents] = React.useState(false);
  const [canInviteMembers, setCanInviteMembers] = React.useState(false);
  const [emailOrUsername, setEmailOrUsername] = React.useState("");

  const handleButtonPress = React.useCallback(async () => {
    if (!emailOrUsername) {
      return Alert.alert(
        "Invalid Email or Username",
        "Please enter a valid email or username."
      );
    }
    await onSubmit({
      emailOrUsername,
      canInviteMembers,
      canCreatePhotoEvents,
    });
  }, [emailOrUsername, canInviteMembers, canCreatePhotoEvents, onSubmit]);

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>
        Invite to {selectedGroup ? selectedGroup.name : ""}
      </Text>
      <TextInput
        value={emailOrUsername}
        placeholder={"Username or email"}
        autoCorrect={false}
        autoCapitalize={"none"}
        // @NOTE Fixes crash on Xiaomi/Redmi devices, not an optimal fix!!
        caretHidden
        style={styles.input}
        onChange={setEmailOrUsername}
      />
      <Checkbox
        checked={canCreatePhotoEvents}
        label={"Can create Photo Tasks?"}
        style={styles.canCreatePhotoEventsCheckbox}
        onChange={setCanCreatePhotoEvents}
      />
      <Checkbox
        checked={canInviteMembers}
        label={"Can invite members?"}
        onChange={setCanInviteMembers}
      />
      <View style={styles.submitContainer}>
        <Button
          text={"Invite"}
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
  canCreatePhotoEventsCheckbox: {
    paddingTop: theme.spacing[5],
  },
});
