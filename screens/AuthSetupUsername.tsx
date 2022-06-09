import { NavigationProp, RouteProp } from "@react-navigation/native";
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
import { screeni18n } from "../lib/i18n";
import { AuthNavigatorParamList } from "../navigation/AuthNavigator";

type AuthSetupUsernameScreenProps = {
  navigation: NavigationProp<AuthNavigatorParamList>;
  route: RouteProp<AuthNavigatorParamList, "setupUsername">;
};

export default function AuthSetupUsernameScreen(
  props: AuthSetupUsernameScreenProps
) {
  const { navigation, route } = props;
  const [username, setUsername] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    if (!username) {
      return Alert.alert(
        screeni18n("AuthSetupUsername.invalidUsernameErrorTitle"),
        screeni18n("AuthSetupUsername.invalidUsernameErrorMessage")
      );
    }

    navigation.navigate("setupPassword", {
      username,
      activationCode: route.params.activationCode,
    });
  }, [navigation, route.params, username]);

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
          {screeni18n("AuthSetupUsername.titleText")}
        </Text>
        <Text style={styles.hintText}>
          {screeni18n("AuthSetupUsername.subtitleText")}
        </Text>
        <TextInput
          placeholder={screeni18n("AuthSetupUsername.usernameInputPlaceholder")}
          value={username}
          autoCorrect={false}
          autoCapitalize={"none"}
          variant={"dark"}
          onChange={setUsername}
        />
        <Button
          text={screeni18n("AuthSetupUsername.submitButtonText")}
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
