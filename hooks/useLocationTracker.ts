import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as React from "react";
import { Alert, AppState, AppStateStatus, Platform } from "react-native";
import { theme } from "../constants/theme";
import { LocationTracking } from "../lib/locationTracking";
import { useGlobalState } from "./useGlobalState";

const LocationTrackerState = new LocationTracking();
const LOCATION_TRACKING_TASK_NAME = "UrbanBelongingTracking";

// @TODO Stop tracking location when app starts
export function useLocationTracker({
  onAccessDenied,
}: {
  onAccessDenied: () => void;
}) {
  const { isTrackingLocation, setIsTrackingLocation, selectedEvent } =
    useGlobalState();
  const appState = React.useRef(AppState.currentState);
  const [currentLocation, setCurrentLocation] =
    React.useState<Location.LocationObject | null>(null);
  const hasLocationPermissions = React.useRef(false);
  const userDidStartLocationTracking = React.useRef(false);
  const updateLocationTimer = React.useRef<NodeJS.Timeout>();

  const getCurrentLocation = React.useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return Alert.alert(
        "Location Permissions",
        "Urban Belonging needs your permission to attach your location to captured photos. You can enable foreground location permissions in the settings of your device."
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy:
        Platform.OS === "android"
          ? Location.Accuracy.Lowest
          : Location.Accuracy.High,
      timeInterval: 15000,
    });
    setCurrentLocation(location);

    return location;
  }, []);

  const startTracking = React.useCallback(async () => {
    const hasStartedUpdates = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING_TASK_NAME
    );

    if (!selectedEvent || isTrackingLocation || hasStartedUpdates) {
      return;
    }

    userDidStartLocationTracking.current = true;
    setIsTrackingLocation(true);

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Urban Belonging is tracking your location",
        notificationBody: "You can stop tracking in the app",
        notificationColor: theme.palette.secondary,
      },
    });

    LocationTrackerState.startUpdates(selectedEvent.id);
  }, [selectedEvent, getCurrentLocation]);

  const checkIsTrackingLocation = React.useCallback(async () => {
    try {
      const isCurrentlyTracking = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME
      );
      if (isCurrentlyTracking) setIsTrackingLocation(true);
    } catch (err) {
      // Permissions error, nothing to do here as we check for permissions when the component mounts anyway
    }
  }, []);

  const stopTracking = React.useCallback(async () => {
    if (
      !(await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME
      ))
    ) {
      return null;
    }

    const { walkStartedAt, trackingData } = LocationTrackerState.stopUpdates();
    await Location.stopLocationUpdatesAsync(LOCATION_TRACKING_TASK_NAME);
    setIsTrackingLocation(false);

    return {
      walkStartedAt: walkStartedAt!,
      walkEndedAt: new Date(),
      locationData: [...trackingData],
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestBackgroundPermissionsAsync();

        if (status !== "granted") {
          throw new Error(`Permission status: ${status}`);
        }

        hasLocationPermissions.current = true;
        await checkIsTrackingLocation();
      } catch (err) {
        onAccessDenied();
      }
    })();
  }, [/*Should never change */ checkIsTrackingLocation]);

  React.useEffect(() => {
    const handleStateChange = async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Is now in foreground
        await checkIsTrackingLocation();
      }

      appState.current = nextAppState;
    };
    AppState.addEventListener("change", handleStateChange);

    return () => {
      AppState.removeEventListener("change", handleStateChange);
    };
  }, [checkIsTrackingLocation]);

  React.useEffect(() => {
    if (isTrackingLocation) {
      updateLocationTimer.current = setInterval(() => {
        const latestLocation = LocationTrackerState.getLatestLocation();
        if (latestLocation) setCurrentLocation(latestLocation);
      }, 5000);
    } else if (!isTrackingLocation && updateLocationTimer.current) {
      clearInterval(updateLocationTimer.current);
    }

    return () => {
      if (updateLocationTimer.current)
        clearInterval(updateLocationTimer.current);
    };
  }, [isTrackingLocation]);

  return {
    startTracking,
    stopTracking,
    currentLocation,
    getCurrentLocation,
    hasLocationPermissions,
  };
}

TaskManager.defineTask(LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(`${LOCATION_TRACKING_TASK_NAME} Error: ${error.message}`);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };

    LocationTrackerState.onLocationUpdate(locations);
  }
});
