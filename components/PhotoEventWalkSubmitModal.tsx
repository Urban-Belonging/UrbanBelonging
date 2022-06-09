import * as Location from "expo-location";
import * as React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { Photo } from "../types/models";
import {
  calculateWalkDistanceAndDuration,
  formatDistance,
  formatDuration,
} from "../utils/photo-event-walk";
import { Button } from "./Button";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

interface PhotoEventWalkSubmitProps {
  photos: Photo[];
  submissionData: {
    locationData: Location.LocationObject[];
    startedAt: Date;
    endedAt: Date;
  };
  isLoading: boolean;
  onPressSubmit: (params: {
    name: string;
    distance: number;
    duration: number;
  }) => void;
}

export function PhotoEventWalkSubmit(props: PhotoEventWalkSubmitProps) {
  const { submissionData, onPressSubmit } = props;
  const [name, setName] = React.useState("");

  const { duration, distance, formattedDistance, formattedDuration } =
    React.useMemo(() => {
      const { duration: rawDuration, distance: rawDistance } =
        calculateWalkDistanceAndDuration(
          submissionData.startedAt,
          submissionData.endedAt,
          submissionData.locationData.map((locationData) => locationData.coords)
        );

      return {
        duration: rawDuration,
        distance: rawDistance,
        formattedDistance: formatDistance(rawDistance),
        formattedDuration: formatDuration(rawDuration),
      };
    }, [submissionData]);

  const handleSubmitPress = React.useCallback(() => {
    if (!name) {
      Alert.alert(
        componentsi18n("PhotoEventWalkSubmitModal.invalidNameErrorTitle"),
        componentsi18n("PhotoEventWalkSubmitModal.invalidNameErrorMessage")
      );
      return;
    }

    onPressSubmit({
      name,
      distance,
      duration,
    });
  }, [name, distance, duration, onPressSubmit]);

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>
        {componentsi18n("PhotoEventWalkSubmitModal.walkNameInputTitle")}
      </Text>
      <TextInput
        value={name}
        placeholder={componentsi18n(
          "PhotoEventWalkSubmitModal.walkNameInputPlaceholder"
        )}
        onChange={setName}
      />
      <Text style={styles.title}>
        {componentsi18n("PhotoEventWalkSubmitModal.summaryTitle")}
      </Text>
      <Text style={styles.subtitle}>
        {componentsi18n("PhotoEventWalkSubmitModal.durationLabel")}{" "}
        <Text style={styles.label}>{formattedDuration}</Text>
      </Text>
      <Text style={styles.subtitle}>
        {componentsi18n("PhotoEventWalkSubmitModal.distanceLabel")}{" "}
        <Text style={styles.label}>{formattedDistance}</Text>
      </Text>
      <Text style={styles.title}>
        {componentsi18n("PhotoEventWalkSubmitModal.distanceLabel", {
          numberOfPhotos: props.photos.length,
        })}
      </Text>
      <View style={styles.photoList}>
        {props.photos.map((photo) => (
          <View key={photo.id} style={styles.photoContainer}>
            <Image source={{ uri: photo.imageUrl }} style={styles.photo} />
          </View>
        ))}
      </View>
      <Button
        text={componentsi18n("PhotoEventWalkSubmitModal.submitButtonText")}
        isLoading={props.isLoading}
        style={styles.submitButton}
        onPress={handleSubmitPress}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexGrow: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: palette.white,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: typography.primaryBold,
    color: palette.black,
    fontSize: 34,
    marginVertical: 16,
  },
  subtitle: {
    fontFamily: typography.primaryBold,
    color: palette.black,
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    color: theme.palette.primary,
    fontSize: 16,
  },
  photoList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  photoContainer: {
    flexGrow: 1,
    aspectRatio: 1,
    marginHorizontal: 2,
    maxWidth: "30%",
  },
  photo: {
    flexGrow: 1,
    borderRadius: 4,
  },
  submitButton: {
    marginTop: 16,
  },
});
