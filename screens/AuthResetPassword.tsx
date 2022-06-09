import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { MAXIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_LENGTH } from "../lib/auth";
import { screeni18n } from "../lib/i18n";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";

type AuthResetPasswordScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
  route: RouteProp<AuthNavigatorParamList, "setupPassword">;
};

export default function AuthResetPasswordScreen(
  props: AuthResetPasswordScreenProps
) {
  const { navigation, route } = props;
  const api = useApi();
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    if (
      password.length < MINIMUM_PASSWORD_LENGTH ||
      password.length > MAXIMUM_PASSWORD_LENGTH
    ) {
      return Alert.alert(
        screeni18n("AuthResetPassword.invalidPasswordErrorTitle"),
        screeni18n("AuthResetPassword.invalidPasswordErrorMessage")
      );
    }

    if (confirmPassword !== password) {
      return Alert.alert(
        screeni18n("AuthResetPassword.passwordsDoNotMatchErrorTitle"),
        screeni18n("AuthResetPassword.passwordsDoNotMatchErrorMessage")
      );
    }

    // Shouldn't happen
    if (!route.params.activationCode) {
      return Alert.alert(
        screeni18n("AuthResetPassword.unknownErrorTitle"),
        screeni18n("AuthResetPassword.unknownErrorMessage")
      );
    }

    setIsLoading(true);

    try {
      await api.auth.completePasswordReset(
        password,
        route.params.activationCode
      );
      navigation.navigate("login");
    } catch (err) {
      console.error(err);
      Alert.alert(
        screeni18n("AuthResetPassword.unknownErrorTitle"),
        screeni18n("AuthResetPassword.unknownErrorMessage")
      );
      setIsLoading(false);
    }
  }, [navigation, route.params, password, confirmPassword]);

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
            onPress={navigation.goBack}
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
          {screeni18n("AuthResetPassword.titleText")}
        </Text>
        <TextInput
          placeholder={screeni18n("AuthResetPassword.passwordInputPlaceholder")}
          value={password}
          autoCompleteType={"password"}
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          variant={"dark"}
          onChange={setPassword}
        />
        <TextInput
          placeholder={screeni18n(
            "AuthResetPassword.confirmPasswordInputPlaceholder"
          )}
          value={confirmPassword}
          autoCompleteType={"password"}
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          style={styles.confirmPasswordInput}
          variant={"dark"}
          onChange={setConfirmPassword}
        />
        <Button
          text={screeni18n("AuthResetPassword.submitButtonText")}
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
  confirmPasswordInput: {
    marginTop: 16,
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
