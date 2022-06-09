import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { Button } from "./Button";
import { DateTimePicker } from "./DateTimePicker";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

type PhotoEventCreationFormProps = {
  isLoading: boolean;
  onSubmit: (params: {
    name: string;
    contributionPeriodStartsAt: Date;
    contributionPeriodEndsAt: Date;
    reactionPeriodStartsAt: Date;
    reactionPeriodEndsAt: Date;
  }) => Promise<void>;
};

export function PhotoEventCreationForm(props: PhotoEventCreationFormProps) {
  const { onSubmit } = props;
  const { selectedGroup } = useGlobalState();
  const [name, setName] = React.useState("");
  const [contributionPeriodStartsAt, setContributionPeriodStartsAt] =
    React.useState<Date | null>(null);
  const [contributionPeriodEndsAt, setContributionPeriodEndsAt] =
    React.useState<Date | null>(null);
  const [reactionPeriodStartsAt, setReactionPeriodStartsAt] =
    React.useState<Date | null>(null);
  const [reactionPeriodEndsAt, setReactionPeriodEndsAt] =
    React.useState<Date | null>(null);
  const isValid = React.useMemo(() => {
    if (
      !name ||
      !contributionPeriodStartsAt ||
      !contributionPeriodEndsAt ||
      !reactionPeriodStartsAt ||
      !reactionPeriodEndsAt
    ) {
      return false;
    }
    return true;
  }, [
    name,
    contributionPeriodStartsAt,
    contributionPeriodEndsAt,
    reactionPeriodStartsAt,
    reactionPeriodEndsAt,
  ]);

  const handleButtonPress = React.useCallback(async () => {
    if (
      !name ||
      !contributionPeriodStartsAt ||
      !contributionPeriodEndsAt ||
      !reactionPeriodStartsAt ||
      !reactionPeriodEndsAt
    ) {
      return;
    }

    await onSubmit({
      name,
      contributionPeriodStartsAt,
      contributionPeriodEndsAt,
      reactionPeriodStartsAt,
      reactionPeriodEndsAt,
    });
  }, [
    name,
    contributionPeriodStartsAt,
    contributionPeriodEndsAt,
    reactionPeriodStartsAt,
    reactionPeriodEndsAt,
    onSubmit,
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>
        New Photo Task in {selectedGroup ? selectedGroup.name : "group"}:
      </Text>
      <TextInput
        value={name}
        placeholder={"Name"}
        style={styles.input}
        onChange={setName}
      />
      <Text style={[styles.formLabel, styles.datepickerLabel]}>
        Allow photos to be added between:
      </Text>
      <View style={styles.periodContainer}>
        <DateTimePicker
          label={"start"}
          value={contributionPeriodStartsAt}
          onChange={setContributionPeriodStartsAt}
        />
        <View style={styles.periodSpacer} />
        <DateTimePicker
          label={"end"}
          value={contributionPeriodEndsAt}
          onChange={setContributionPeriodEndsAt}
        />
      </View>
      <Text style={[styles.formLabel, styles.datepickerLabel]}>
        Allow reactions to be added between:
      </Text>
      <View style={styles.periodContainer}>
        <DateTimePicker
          label={"start"}
          value={reactionPeriodStartsAt}
          onChange={setReactionPeriodStartsAt}
        />
        <View style={styles.periodSpacer} />
        <DateTimePicker
          label={"end"}
          value={reactionPeriodEndsAt}
          onChange={setReactionPeriodEndsAt}
        />
      </View>
      <View style={styles.submitContainer}>
        <Button
          text={"Create"}
          disabled={props.isLoading || !isValid}
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
  datepickerLabel: {
    marginTop: theme.spacing[5],
  },
  periodContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: theme.spacing[3],
  },
  periodSpacer: {
    width: theme.spacing[4],
  },
});
