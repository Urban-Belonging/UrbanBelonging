import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { Config } from "../lib/config";
import { ProfileNavigatorParamList } from "../navigation/ProfileNavigator";
import { ScrollView } from "react-native-gesture-handler";
import { screeni18n } from "../lib/i18n";

type ProfileScreenProps = {
  navigation: NavigationProp<ProfileNavigatorParamList>;
};

export default function ProfileScreen(props: ProfileScreenProps) {
  const { user } = useGlobalState();
  const handleSettingsPress = React.useCallback(() => {
    props.navigation.navigate("settings");
  }, []);
  const handleViewDataPolicyPress = React.useCallback(() => {
    Linking.openURL("https://urbanbelonging.com/?page=5");
  }, []);
  return (
    <Screen>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{screeni18n("Profile.title")}</Text>
            <Icon
              icon={"settings"}
              width={24}
              height={24}
              color={palette.black}
              onPress={handleSettingsPress}
            />
          </View>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Icon
                icon={"logo"}
                width={80}
                height={58}
                color={palette.white}
              />
            </View>
            <Text style={styles.usernameLabel}>{`@${user?.username}`}</Text>
          </View>
          <Text style={styles.descriptionTitle}>
            {screeni18n("Profile.descriptionTitle")}
          </Text>
          <Text style={styles.descriptionBody}>
            {screeni18n("Profile.descriptionMessage")}
          </Text>
          <Button
            text={screeni18n("Profile.viewDataPolicyButtonText")}
            onPress={handleViewDataPolicyPress}
            style={styles.viewDataPolicyButton}
          />
          <Text style={styles.appVersionLabel}>{Config.appVersion}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background,
    padding: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    alignSelf: "stretch",
  },
  headerText: {
    fontFamily: typography.primaryBold,
    fontSize: 34,
    color: palette.black,
  },
  logoContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: theme.palette.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  usernameLabel: {
    fontFamily: typography.primaryBold,
    fontSize: 20,
    color: palette.black,
    textAlign: "center",
  },
  descriptionTitle: {
    fontFamily: typography.primaryBold,
    fontSize: 16,
    color: palette.black,
    marginVertical: 8,
  },
  descriptionBody: {
    fontFamily: typography.primary,
    fontSize: 16,
    color: palette.grey500,
    marginBottom: 24,
    flexGrow: 1,
  },
  viewDataPolicyButton: {
    alignSelf: "stretch",
    marginBottom: 16,
  },
  appVersionLabel: {
    fontFamily: typography.primary,
    color: palette.grey400,
    fontSize: 10,
    textAlign: "center",
    alignSelf: "center",
  },
});
