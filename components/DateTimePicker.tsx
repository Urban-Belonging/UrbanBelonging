import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { formatDate } from "../utils/date";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface DateTimePickerProps {
  value: Date | null;
  label: string;
  onChange: (value: Date) => void;
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { value, label, onChange } = props;
  const previewLabel = React.useMemo(() => {
    if (!value) return label;
    return formatDate(value);
  }, [value, label]);
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const handleCancel = React.useCallback(() => setIsPickerVisible(false), []);
  const handlePress = React.useCallback(() => setIsPickerVisible(true), []);
  const handleConfirm = React.useCallback(
    (date: Date) => {
      const now = new Date();
      let toChange = date;

      if (date.valueOf() < now.valueOf()) {
        toChange = now;
      }

      setIsPickerVisible(false);
      onChange(toChange);
    },
    [onChange]
  );

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Icon icon={"calendar"} width={18} height={20} color={palette.blue500} />
      <Text style={styles.label}>{previewLabel}</Text>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        // date={value || new Date()}
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
    padding: theme.spacing[3],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },
  label: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: palette.blue300,
    marginLeft: theme.spacing[3],
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});
