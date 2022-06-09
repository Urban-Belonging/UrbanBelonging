import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Screen } from "../components/Screen";
import { Header } from "../components/Header";
import { theme } from "../constants/theme";
import { MainNavigatorParamList } from "../navigation/MainNavigator";
import { SettingsListItem } from "../components/SettingsListItem";
import { useGlobalState } from "../hooks/useGlobalState";
import { Auth } from "../lib/auth";
import { useApi } from "../hooks/useApi";
import { screeni18n } from "../lib/i18n";

type SettingsScreenProps = {
  navigation: NavigationProp<MainNavigatorParamList>;
};

export default function SettingsScreen(props: SettingsScreenProps) {
  const { deviceToken, setUser } = useGlobalState();
  const api = useApi();
  const handleLogoutPress = React.useCallback(() => {
    Alert.alert(
      screeni18n("Settings.logoutConfirmAlertTitle"),
      screeni18n("Settings.logoutConfirmAlertMessage"),
      [
        {
          text: screeni18n("Settings.logoutConfirmAlertLogoutButton"),
          onPress: async () => {
            await api.auth.logout(deviceToken);
            await Auth.updateState(null, null);
            setUser(null);
          },
          style: "destructive",
        },
        {
          text: screeni18n("Settings.logoutConfirmAlertDismissButton"),
          style: "cancel",
        },
      ]
    );
  }, [setUser]);
  return (
    <Screen
      header={
        <Header
          variant={"settings"}
          canGoBack
          onPressGoBack={props.navigation.goBack}
        />
      }
    >
      <View style={styles.container}>
        <SettingsListItem
          title={screeni18n("Settings.logoutListItemTitle")}
          onPress={handleLogoutPress}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background,
  },
});
