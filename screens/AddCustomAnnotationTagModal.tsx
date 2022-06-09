import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { palette } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { RootNavigatorParamList } from "../navigation";

type AddCustomAnnotationTagModalProps = {
  navigation: NavigationProp<RootNavigatorParamList>;
  route: RouteProp<RootNavigatorParamList, "addCustomAnnotationTagModal">;
};

export default function AddCustomAnnotationTagModal(
  props: AddCustomAnnotationTagModalProps
) {
  const { setCustomAnnotationTag } = useGlobalState();
  const { navigation } = props;
  const [currentTag, setCurrentTag] = React.useState("");

  const handleSubmitPress = React.useCallback(() => {
    if (!currentTag) return;
    setCustomAnnotationTag(currentTag);
    navigation.goBack();
  }, [currentTag, navigation]);

  return (
    <View style={styles.centeredView}>
      <Pressable style={styles.modalContainer} onPress={navigation.goBack}>
        <KeyboardAvoidingView
          behavior={"padding"}
          style={styles.keyboardAvoidingView}
        >
          <Pressable style={styles.modal}>
            <Text style={styles.title}>
              {screeni18n("AddCustomAnnotationTagModel.modalTitle")}
            </Text>
            <TextInput
              autoFocus
              placeholder={screeni18n(
                "AddCustomAnnotationTagModel.textInputPlaceholder"
              )}
              value={currentTag}
              style={styles.input}
              onChange={setCurrentTag}
            />
            <Button
              text={screeni18n("AddCustomAnnotationTagModel.submitButtonText")}
              style={styles.submitButton}
              disabled={!currentTag}
              onPress={handleSubmitPress}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  keyboardAvoidingView: {
    alignSelf: "stretch",
  },
  modal: {
    margin: 24,
    backgroundColor: palette.white,
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    fontFamily: typography.primaryBold,
    color: palette.grey600,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    marginVertical: 24,
  },
  submitButton: {
    alignSelf: "stretch",
  },
});
