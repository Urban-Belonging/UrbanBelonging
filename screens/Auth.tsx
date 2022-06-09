import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
// @ts-ignore
import backgroundImage from "../assets/images/background.jpg";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { screeni18n } from "../lib/i18n";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";

type AuthScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
};

export default function AuthScreen(props: AuthScreenProps) {
  const { navigation } = props;

  const handleCreateAccountPress = React.useCallback(
    () => navigation.navigate("createAccount"),
    [navigation]
  );
  const handleVerifyActivationCodePress = React.useCallback(
    () => navigation.navigate("verifyActivationCode"),
    [navigation]
  );
  const handleLoginPress = React.useCallback(
    () => navigation.navigate("login"),
    [navigation]
  );

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={backgroundImage}
          resizeMode={"cover"}
        />
        <View style={styles.logoContainer}>
          <Icon
            icon={"logo"}
            width={128}
            height={120}
            color={palette.white}
            style={styles.logoContainer}
          />
          <Text style={styles.welcomeText}>
            {screeni18n("Auth.welcomeLabel")}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={screeni18n("Auth.activationCodeFlowButtonText")}
            style={[styles.activationCodeButton, styles.button]}
            textStyle={styles.lightButtonText}
            onPress={handleVerifyActivationCodePress}
          />
          <Button
            text={screeni18n("Auth.loginFlowButtonText")}
            style={[styles.loginButton, styles.button]}
            textStyle={styles.darkButtonText}
            onPress={handleLoginPress}
          />
          <Button
            text={screeni18n("Auth.createAccountFlowButtonText")}
            style={[styles.createAccountButton, styles.button]}
            textStyle={styles.darkButtonText}
            onPress={handleCreateAccountPress}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    marginTop: theme.spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: typography.primaryBold,
    fontSize: 34,
    color: palette.white,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 24,
  },
  button: {
    marginTop: 24,
  },
  activationCodeButton: {
    backgroundColor: palette.grey50,
  },
  loginButton: {
    backgroundColor: theme.palette.primary,
  },
  createAccountButton: {
    backgroundColor: palette.green400,
  },
  lightButtonText: {
    color: palette.grey600,
  },
  darkButtonText: {
    color: palette.white,
  },
});
