import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as Localization from "expo-localization";
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

type AuthSetupPasswordScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
  route: RouteProp<AuthNavigatorParamList, "setupPassword">;
};

export default function AuthSetupPasswordScreen(
  props: AuthSetupPasswordScreenProps
) {
  const { navigation, route } = props;
  const api = useApi();
  const { setUser } = useGlobalState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    if (
      password.length < MINIMUM_PASSWORD_LENGTH ||
      password.length > MAXIMUM_PASSWORD_LENGTH
    ) {
      return Alert.alert(
        "Invalid Password",
        "Please enter a password between 8 and 24 characters in length."
      );
    }

    if (confirmPassword !== password) {
      return Alert.alert(
        "Passwords Don't Match",
        "Please double check your passwords match."
      );
    }

    // Shouldn't happen
    if (!route.params.username || !route.params.activationCode) {
      return Alert.alert("Error", "An error occurred");
    }

    setIsLoading(true);

    try {
      await api.auth.completeRegistration(
        route.params.username,
        password,
        route.params.activationCode,
        Localization.locale
      );
      const authenticatedUser = await api.auth.me();
      setUser(authenticatedUser);
    } catch (err) {
      console.error(err);
      if (err.statusCode === 400 && err.message === "Username already taken") {
        Alert.alert(
          "Username Already in Use",
          "This username is already being used. You can go back and choose another one."
        );
      } else {
        Alert.alert("Error", "An error occurred");
      }
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
          {screeni18n("AuthSetupPassword.titleText", {
            username: props.route.params.username,
          })}
        </Text>
        <Text style={styles.hintText}>
          {screeni18n("AuthSetupPassword.subtitleText")}
        </Text>
        <TextInput
          placeholder={screeni18n("AuthSetupPassword.passwordInputPlaceholder")}
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
            "AuthSetupPassword.confirmPasswordInputPlaceholder"
          )}
          value={confirmPassword}
          autoCompleteType={"password"}
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          variant={"dark"}
          style={styles.confirmPasswordInput}
          onChange={setConfirmPassword}
        />
        <Button
          text={screeni18n("AuthSetupPassword.submitButtonText")}
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
