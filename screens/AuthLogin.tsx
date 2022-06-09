import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
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

type AuthLoginScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
};

export default function AuthLoginScreen(props: AuthLoginScreenProps) {
  const { navigation } = props;
  const { api, setUser } = useGlobalState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await api.auth.login(username, password);
      const authenticatedUser = await api.auth.me();
      setUser(authenticatedUser);
    } catch (err) {
      setIsLoading(false);
      if (err.statusCode === 401) {
        Alert.alert(
          screeni18n("AuthLogin.invalidCredentialsErrorTitle"),
          screeni18n("AuthLogin.invalidCredentialsErrorMessage")
        );
      } else {
        Alert.alert(
          screeni18n("AuthLogin.unknownErrorTitle"),
          screeni18n("AuthLogin.unknownErrorMessage")
        );
      }
    }
  }, [username, password]);

  const handleForgottenPasswordPress = React.useCallback(() => {
    navigation.navigate("recoverPassword");
  }, [navigation]);

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
        <Text style={styles.title}>{screeni18n("AuthLogin.titleText")}</Text>
        <TextInput
          placeholder={screeni18n("AuthLogin.usernameInputPlaceholder")}
          value={username}
          autoCompleteType={"off"}
          autoCorrect={false}
          autoCapitalize={"none"}
          variant={"dark"}
          onChange={setUsername}
        />
        <TextInput
          placeholder={screeni18n("AuthLogin.passwordInputPlaceholder")}
          value={password}
          autoCompleteType={"password"}
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          style={styles.passwordInput}
          variant={"dark"}
          onChange={setPassword}
        />
        <Button
          text={screeni18n("AuthLogin.submitButtonText")}
          isLoading={isLoading}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
          onPress={handleSubmit}
        />
        <Pressable
          style={styles.forgottenPasswordContainer}
          hitSlop={{
            top: 16,
            left: 32,
            right: 32,
            bottom: 32,
          }}
          onPress={handleForgottenPasswordPress}
        >
          <Text style={styles.forgottenPasswordLabel}>
            {screeni18n("AuthLogin.forgotPasswordLabel")}
          </Text>
        </Pressable>
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
  passwordInput: {
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
  forgottenPasswordContainer: {
    marginTop: 32,
  },
  forgottenPasswordLabel: {
    fontFamily: typography.primaryBold,
    color: palette.green400,
    fontSize: 16,
    textAlign: "center",
  },
});
