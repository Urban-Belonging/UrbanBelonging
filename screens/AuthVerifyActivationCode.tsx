import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";

type AuthVerifyActivationCodeScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
};

export default function AuthVerifyActivationCodeScreen(
  props: AuthVerifyActivationCodeScreenProps
) {
  const { navigation } = props;
  const { api } = useGlobalState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [activationCode, setActivationCode] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    if (!activationCode) {
      return Alert.alert(
        screeni18n("AuthVerifyActivationCode.invalidActivationCodeErrorTitle"),
        screeni18n("AuthVerifyActivationCode.invalidActivationCodeErrorMessage")
      );
    }
    try {
      setIsLoading(true);

      const response = await api.auth.verifyActivationCode(activationCode);
      switch (response.type) {
        case "UserGroupInvitation":
        case "UserRegistration":
          navigation.navigate("setupUsername", {
            activationCode,
          });
          break;
        case "UserPasswordResetRequest":
          navigation.navigate("resetPassword", {
            activationCode,
          });
          break;
      }
    } catch (err) {
      console.error(err);
      if (err.statusCode === 400) {
        Alert.alert(
          screeni18n(
            "AuthVerifyActivationCode.expiredOrInvalidActivationCodeErrorTitle"
          ),
          screeni18n(
            "AuthVerifyActivationCode.expiredOrInvalidActivationCodeErrorMessage"
          )
        );
      } else {
        Alert.alert(
          screeni18n("AuthVerifyActivationCode.unknownErrorTitle"),
          screeni18n("AuthVerifyActivationCode.unknownErrorMessage")
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [activationCode]);

  return (
    <Screen>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.goBackContainer}>
          <Icon
            icon={"chevronLeft"}
            color={palette.white}
            width={24}
            height={24}
            onPress={!isLoading ? navigation.goBack : undefined}
          />
        </View>
        <Icon
          icon={"logo"}
          width={64}
          height={46}
          color={palette.white}
          style={styles.logoContainer}
        />
        <Text style={styles.title}>
          {screeni18n("AuthVerifyActivationCode.titleText")}
        </Text>
        <Text style={styles.hintText}>
          {screeni18n("AuthVerifyActivationCode.subtitleText")}
        </Text>
        <TextInput
          placeholder={screeni18n(
            "AuthVerifyActivationCode.activationCodeInputPlaceholer"
          )}
          value={activationCode}
          autoCompleteType={"off"}
          autoCorrect={false}
          autoCapitalize={"none"}
          variant={"dark"}
          onChange={setActivationCode}
        />
        <Button
          text={screeni18n("AuthVerifyActivationCode.submitButtonText")}
          isLoading={isLoading}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: theme.palette.primary,
  },
  goBackContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  logoContainer: {
    marginTop: theme.spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: typography.primaryBold,
    color: palette.white,
    fontSize: 34,
    textAlign: "center",
    marginVertical: 24,
  },
  hintText: {
    fontFamily: typography.primary,
    color: palette.white,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  submitButton: {
    alignSelf: "stretch",
    backgroundColor: palette.green400,
    marginTop: 24,
  },
  submitButtonText: {
    color: palette.white,
  },
});
