import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import * as React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  ToastAndroid,
  Platform,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Sentry from "sentry-expo";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { PhotoEventWalkSubmit } from "../components/PhotoEventWalkSubmitModal";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { useLocationTracker } from "../hooks/useLocationTracker";
import { getLocalizedCapturePromptMessage, screeni18n } from "../lib/i18n";
import { MainNavigatorParamList } from "../navigation/MainNavigator";
import { Photo, PhotoEventWithMetadata } from "../types/models";
import { openAppSettings } from "../utils/app-settings";
import { asyncWithRetry } from "../utils/asyncWithRetry";

type LocationTrackerScreenProps = {
  event: PhotoEventWithMetadata;
  navigation: NavigationProp<MainNavigatorParamList>;
  route: RouteProp<MainNavigatorParamList, "locationTracker">;
};

export default function LocationTrackerScreen(
  props: LocationTrackerScreenProps
) {
  const { isTrackingLocation, setIsTrackingLocation, selectedEvent } =
    useGlobalState();
  const { navigation } = props;
  const api = useApi();
  const { startTracking, stopTracking, currentLocation, getCurrentLocation } =
    useLocationTracker({
      onAccessDenied() {
        Alert.alert(
          screeni18n("LocationTracker.permissionsDeniedErrorTitle"),
          screeni18n("LocationTracker.permissionsDeniedErrorMessage"),
          [
            {
              text: screeni18n(
                "LocationTracker.locationPermissionsErrorOpenSettingsButtonText"
              ),
              onPress: () => {
                openAppSettings();
              },
            },

            {
              text: screeni18n(
                "LocationTracker.locationPermissionsErrorDismissButtonText"
              ),
              style: "cancel",
            },
          ]
        );

        props.navigation.goBack();
      },
    });
  const mapRef = React.useRef<MapView>();
  const [isLoading, setIsLoading] = React.useState(false);
  const startingLocation = React.useRef<Location.LocationObject | null>(null);
  const [walkSubmissionData, setWalkSubmissionData] = React.useState<{
    locationData: Location.LocationObject[];
    startedAt: Date;
    endedAt: Date;
  } | null>(null);
  const didSubmitWalk = React.useRef(false);
  const [photosInWalk, setPhotosInWalk] = React.useState<Photo[]>([]);
  const navigationListener = React.useRef<any | null>(null);
  const photosInWalkMarkers = React.useMemo(() => {
    return photosInWalk
      .filter((photo) => !!photo.locationData)
      .map((photo) => (
        <Marker
          key={`marker-${photo.id}`}
          identifier={`marker-${photo.id}`}
          coordinate={{
            latitude: parseFloat(photo.locationData!.latitude),
            longitude: parseFloat(photo.locationData!.longitude),
          }}
        >
          <View style={styles.photoInWalkMarker} />
        </Marker>
      ));
  }, [photosInWalk]);

  const handleGoBackPress = React.useCallback(() => {
    if (isLoading) return;

    if (isTrackingLocation) {
      return Alert.alert(
        screeni18n("LocationTracker.isStillTrackingPreventExitAlertTitle"),
        screeni18n("LocationTracker.isStillTrackingPreventExitAlertMessage")
      );
    }

    if (walkSubmissionData) {
      return Alert.alert(
        screeni18n("LocationTracker.isSubmittingPreventExitAlertTitle"),
        screeni18n("LocationTracker.isSubmittingPreventExitAlertMessage"),
        [
          {
            text: screeni18n(
              "LocationTracker.isSubmittingPreventExitAlertDeleteButtonText"
            ),
            style: "destructive",
            onPress: () => {
              props.navigation.goBack();
            },
          },
          {
            text: screeni18n(
              "LocationTracker.isSubmittingPreventExitAlertDismissButtonText"
            ),
            style: "cancel",
          },
        ]
      );
    }

    props.navigation.goBack();
  }, [isLoading, isTrackingLocation, walkSubmissionData]);
  const handleStartTrackingPress = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const location = await getCurrentLocation();
      startingLocation.current = location || null;

      if (location) {
        const camera = await mapRef.current?.getCamera();
        if (camera) {
          camera.zoom = 12;
          camera.heading = 0;
          camera.center = location.coords;
        }
      }
    } catch (err) {}

    try {
      await startTracking();
      Alert.alert(
        screeni18n("LocationTracker.locationTrackingStartedAlertTitle"),
        screeni18n("LocationTracker.locationTrackingStartedAlertMessage")
      );
    } catch (err) {
      Alert.alert(
        screeni18n("LocationTracker.startTrackingErrorTitle"),
        screeni18n("LocationTracker.startTrackingErrorMessage")
      );
    } finally {
      setIsLoading(false);
    }
  }, [startTracking]);

  const handleStopTrackingPress = React.useCallback(async () => {
    Alert.alert(
      screeni18n("LocationTracker.stopWalkAlertTitle"),
      screeni18n("LocationTracker.stopWalkAlertMessage"),
      [
        {
          text: screeni18n("LocationTracker.stopWalkAlertDismissButtonText"),
          style: "cancel",
        },
        {
          text: screeni18n("LocationTracker.stopWalkAlertSubmitWalkButtonText"),
          async onPress() {
            const response = await stopTracking();

            setIsTrackingLocation(false);

            // Got an empty locationData array. This can happen if the user restarts their device or tracking was not enabled for long enough. We don't support restarting the device during a walk
            if (
              !response ||
              response.locationData.length === 0 ||
              !selectedEvent
            ) {
              Alert.alert(
                screeni18n("LocationTracker.noLocationDataErrorTitle"),
                screeni18n("LocationTracker.noLocationDataErrorMessage")
              );
              return;
            }

            const locations = [...response.locationData];

            if (startingLocation.current) {
              locations.unshift(startingLocation.current);
            }

            setWalkSubmissionData({
              locationData: locations,
              startedAt: response.walkStartedAt,
              endedAt: response.walkEndedAt,
            });

            mapRef.current?.fitToCoordinates(
              response.locationData.map((location, index) => location.coords)
            );

            try {
              const photos = await api.photos.listForWalk(
                selectedEvent!.id,
                response.walkStartedAt,
                response.walkEndedAt
              );
              setPhotosInWalk(photos);
            } catch (err) {
              Alert.alert(
                screeni18n("LocationTracker.unknownErrorTitle"),
                screeni18n("LocationTracker.unknownErrorMessage")
              );
            }
          },
        },
        {
          text: screeni18n("LocationTracker.stopWalkAlertDeleteWalkButtonText"),
          style: "destructive",
          onPress() {
            return Alert.alert(
              screeni18n("LocationTracker.deleteWalkConfirmAlertTitle"),
              screeni18n("LocationTracker.deleteWalkConfirmAlertMessage"),
              [
                {
                  text: screeni18n(
                    "LocationTracker.deleteWalkConfirmDeleteButtonText"
                  ),
                  style: "destructive",
                  async onPress() {
                    await stopTracking();
                    setIsTrackingLocation(false);
                    props.navigation.goBack();
                  },
                },
                {
                  text: screeni18n(
                    "LocationTracker.deleteWalkConfirmDismissButtonText"
                  ),
                  style: "cancel",
                },
              ]
            );
          },
        },
      ]
    );
  }, [selectedEvent, stopTracking]);

  const handleCameraPress = React.useCallback(async () => {
    navigation.navigate("camera", {
      returnLocation: "LocationTracker",
    });
  }, [navigation]);

  const handleSubmitWalkPress = React.useCallback(
    async (params: { name: string; distance: number; duration: number }) => {
      // Shouldn't happen
      if (!walkSubmissionData || !selectedEvent) return;

      try {
        setIsLoading(true);

        await asyncWithRetry(() => {
          return api.photoEventWalks.create(selectedEvent?.id, {
            ...walkSubmissionData,
            ...params,
            locationData: walkSubmissionData.locationData.map((location) => {
              return {
                latitude: `${location.coords.latitude}`,
                longitude: `${location.coords.longitude}`,
                timestamp: location.timestamp,
              };
            }),
          });
        });

        didSubmitWalk.current = true;

        setIsLoading(false);

        props.navigation.goBack();
      } catch (err) {
        Sentry.Native.captureException(err);
        Alert.alert(
          screeni18n("LocationTracker.unknownErrorTitle"),
          screeni18n("LocationTracker.unknownErrorMessage")
        );
        setIsLoading(false);
      }
    },
    [walkSubmissionData, selectedEvent]
  );

  const handleCenterLocationPress = React.useCallback(async () => {
    const location = await getCurrentLocation();
    if (location) mapRef.current?.fitToCoordinates([location.coords]);
  }, [getCurrentLocation]);

  React.useEffect(() => {
    if (navigationListener.current) {
      navigation.removeListener("beforeRemove", navigationListener.current);
    }

    navigationListener.current = (e: any) => {
      if (!didSubmitWalk.current && (isLoading || isTrackingLocation)) {
        e.preventDefault();
        return;
      }
      navigation.dispatch(e.data.action);
    };

    navigation.addListener("beforeRemove", navigationListener.current);
  }, [navigation, isTrackingLocation, isLoading]);

  React.useEffect(() => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        screeni18n(
          "LocationTracker.locationTrackingPermissionDeclarationToastText"
        ),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, []);

  return (
    <Screen
      header={
        <Header
          variant={"locationTracker"}
          title={selectedEvent?.name}
          canGoBack
          onPressGoBack={handleGoBackPress}
        />
      }
    >
      <View style={styles.container}>
        <MapView
          ref={(ref) => (mapRef.current = ref || undefined)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={
            currentLocation
              ? {
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }
              : undefined
          }
        >
          {walkSubmissionData && (
            <Polyline
              coordinates={walkSubmissionData.locationData.map((location) => ({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }))}
              strokeWidth={8}
              strokeColor={palette.green400}
            />
          )}
          {photosInWalkMarkers}
          {currentLocation && (
            <Marker
              identifier={"current-location"}
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
            >
              <View style={styles.currentLocationMarker} />
            </Marker>
          )}
        </MapView>
        <View style={styles.capturePromptContainer}>
          <Text style={styles.capturePromptLabel}>
            {getLocalizedCapturePromptMessage()}
          </Text>
        </View>
        {!walkSubmissionData &&
          (!isTrackingLocation ? (
            <Button
              text={screeni18n("LocationTracker.startTrackingButtonText")}
              isLoading={isLoading}
              style={styles.startTrackingButton}
              onPress={handleStartTrackingPress}
            />
          ) : (
            <View style={styles.trackingButtonsContainer}>
              <Pressable
                style={styles.sideButton}
                onPress={handleStopTrackingPress}
              >
                <View style={styles.stopIcon} />
              </Pressable>
              <Pressable
                style={styles.cameraButton}
                onPress={handleCameraPress}
              >
                <Icon
                  width={24}
                  height={24}
                  icon={"camera"}
                  color={palette.white}
                />
              </Pressable>
              <Pressable
                style={styles.sideButton}
                onPress={handleCenterLocationPress}
              >
                <Icon
                  width={36}
                  height={36}
                  icon={"paperAirpline"}
                  color={palette.black}
                />
              </Pressable>
            </View>
          ))}
        {walkSubmissionData && (
          <PhotoEventWalkSubmit
            photos={photosInWalk}
            isLoading={isLoading}
            submissionData={walkSubmissionData}
            onPressSubmit={handleSubmitWalkPress}
          />
        )}
      </View>
    </Screen>
  );
}

const buttonShadow: ViewStyle = {
  shadowColor: palette.black,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.12,
  shadowRadius: 20,
  elevation: 8,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventNameLabel: {
    fontFamily: typography.primary,
    color: theme.palette.secondary,
  },
  map: {
    flex: 1,
  },
  startTrackingButton: {
    bottom: 24,
    left: 24,
    right: 24,
    position: "absolute",
  },
  trackingButtonsContainer: {
    bottom: 24,
    left: 24,
    right: 24,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideButton: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
    ...buttonShadow,
  },
  capturePromptContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: theme.palette.primary,
  },
  capturePromptLabel: {
    fontFamily: typography.primaryBold,
    fontSize: 16,
    textAlign: "center",
    color: palette.white,
    lineHeight: 19,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: theme.palette.secondary,
    alignItems: "center",
    justifyContent: "center",
    ...buttonShadow,
  },
  currentLocationMarker: {
    width: 20,
    height: 20,
    backgroundColor: "#09f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.white,
  },
  photoInWalkMarker: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.white,
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: palette.black,
  },
});
