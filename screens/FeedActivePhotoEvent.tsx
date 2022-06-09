import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { UserGroupHeader } from "../components/UserGroupHeader";
import { theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { FeedNavigatorParamList } from "../navigation/FeedNavigator";

type FeedActivePhotoEventScreenProps = {
  navigation: NavigationProp<FeedNavigatorParamList>;
  route: RouteProp<FeedNavigatorParamList, "activePhotoEvent">;
};

export default function FeedActivePhotoEventScreen(
  props: FeedActivePhotoEventScreenProps
) {
  const { selectedEvent } = useGlobalState();

  const handleStartWalkPress = React.useCallback(() => {
    props.navigation.navigate("locationTracker");
  }, []);

  const handleViewWalksPress = React.useCallback(() => {
    props.navigation.navigate("photoEventWalks");
  }, []);

  const handleCapturePhotoPress = React.useCallback(() => {
    props.navigation.navigate("camera", {
      returnLocation: "FeedPhotoDetail",
    });
  }, []);

  return (
    <Screen
      header={
        <Header
          variant={"feedPhotoEventDetail"}
          title={selectedEvent?.name}
          canGoBack
          onPressGoBack={props.navigation.goBack}
          onPressViewWalks={handleViewWalksPress}
        />
      }
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <UserGroupHeader event={selectedEvent!} />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeLabel}>
              {screeni18n("FeedActivePhotoEvent.titleText")}
            </Text>
            <Text style={styles.welcomeMessage}>
              {screeni18n("FeedActivePhotoEvent.subtitleText")}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              text={screeni18n("FeedActivePhotoEvent.startWalkButtonText")}
              onPress={handleStartWalkPress}
            />
            <Button
              text={screeni18n("FeedActivePhotoEvent.takePhotoButtonText")}
              style={styles.captureButton}
              onPress={handleCapturePhotoPress}
            />
          </View>
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
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background,
  },
  welcomeLabel: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: typography.primary,
    color: theme.palette.secondary,
  },
  welcomeMessage: {
    fontFamily: typography.primaryBold,
    color: theme.palette.secondary,
    fontSize: 18,
    textAlign: "center",
    marginTop: 18,
  },
  textContainer: {},
  buttonsContainer: {
    marginTop: 80,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  captureButton: {
    marginTop: 16,
    backgroundColor: theme.palette.secondary,
  },
});
