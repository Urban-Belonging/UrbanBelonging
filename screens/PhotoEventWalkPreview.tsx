import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View, ViewStyle } from "react-native";
import MapView, { LatLng, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Header } from "../components/Header";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { palette } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { MainNavigatorParamList } from "../navigation/MainNavigator";

type PhotoEventWalkPreviewScreenProps = {
  navigation: NavigationProp<MainNavigatorParamList>;
  route: RouteProp<MainNavigatorParamList, "locationTracker">;
};

export default function PhotoEventWalkPreviewScreen(
  props: PhotoEventWalkPreviewScreenProps
) {
  const { selectedWalk } = useGlobalState();
  const api = useApi();
  const mapRef = React.useRef<MapView>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [parsedCoordinates, setParsedCoordinates] = React.useState<
    LatLng[] | null
  >(null);

  const polylines = React.useMemo(() => {
    if (!parsedCoordinates) return null;

    return (
      <Polyline
        coordinates={parsedCoordinates.map((location) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        }))}
        strokeWidth={8}
        strokeColor={palette.green400}
      />
    );
  }, [parsedCoordinates]);

  const fetchWalk = React.useCallback(async () => {
    if (!selectedWalk) return;
    try {
      setIsLoading(true);

      const walk = await api.photoEventWalks.get(selectedWalk.id);
      const parsed = walk.locationData.map((location) => ({
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      }));

      setParsedCoordinates(parsed);

      mapRef.current?.fitToCoordinates(parsed);
    } catch (err) {
      console.error(err);
      Alert.alert(
        screeni18n("PhotoEventWalkPreview.unknownErrorTitle"),
        screeni18n("PhotoEventWalkPreview.unknownErrorMessage")
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedWalk]);

  React.useEffect(() => {
    (async () => {
      await fetchWalk();
    })();
  }, [fetchWalk]);

  return (
    <Screen
      header={
        <Header
          variant={"photoEventWalkPreview"}
          title={selectedWalk?.name}
          canGoBack
          onPressGoBack={props.navigation.goBack}
        />
      }
    >
      <View style={styles.container}>
        <MapView
          ref={(ref) => (mapRef.current = ref || undefined)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          {polylines}
        </MapView>
        {isLoading && <LoadingState float />}
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
  map: {
    flex: 1,
  },
});
