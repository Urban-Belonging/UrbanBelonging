import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { LocationObject } from "expo-location";
import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { PhotoAnnotationForm } from "../components/PhotoAnnotationForm";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { useLocationTracker } from "../hooks/useLocationTracker";
import { AnnotationAnswer, AnnotationPrompt } from "../lib/prompts";
import { RootNavigatorParamList } from "../navigation";
import { Photo } from "../types/models";
import { openAppSettings } from "../utils/app-settings";
import { asyncWithRetry } from "../utils/asyncWithRetry";
import { Config } from "../lib/config";
import { getLocalizedCapturePromptMessage, screeni18n } from "../lib/i18n";

type Stage = "cameraConfirm" | "cameraCapture" | "cameraAnnotate";
type CameraOrientation = "front" | "back";
type CameraZoomLevel = 0 | 0.25 | 0.5;

type CameraScreenProps = {
  navigation: NavigationProp<RootNavigatorParamList>;
  route: RouteProp<RootNavigatorParamList, "camera">;
};

export default function CameraScreen(props: CameraScreenProps) {
  const { navigation, route } = props;
  const { getCurrentLocation, hasLocationPermissions } = useLocationTracker({
    onAccessDenied() {
      Alert.alert(
        screeni18n("Camera.locationPermissionsErrorTitle"),
        screeni18n("Camera.locationPermissionsErrorMessage"),
        [
          {
            text: screeni18n(
              "Camera.locationPermissionsErrorOpenSettingsButtonText"
            ),
            onPress: () => {
              openAppSettings();
            },
          },

          {
            text: screeni18n(
              "Camera.locationPermissionsErrorDismissButtonText"
            ),
            style: "cancel",
          },
        ]
      );
    },
  });
  const { selectedEvent, setShouldRefreshPhotoList, setShouldRefreshFeed } =
    useGlobalState();
  const api = useApi();
  const [stage, setStage] = React.useState<Stage>("cameraCapture");
  const [hasCameraPermissions, setHasCameraPermissions] = React.useState(false);
  const hasMediaLibraryPermissions = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cameraOrientation, setCameraOrientation] =
    React.useState<CameraOrientation>("back");
  const [previewPhotoUri, setPreviewPhotoUri] = React.useState<string | null>(
    null
  );
  const exifData = React.useRef<any | null>(null);
  const locationData = React.useRef<LocationObject | null>(null);
  const [isCapturing, setIsCapturing] = React.useState(false);
  const isCameraReady = React.useRef(false);
  const cameraRef = React.useRef<Camera>();
  const [zoomLevel, setZoomLevel] = React.useState<CameraZoomLevel>(0);
  const [photoToAnnotate, setPhotoToAnnotate] = React.useState<Photo | null>(
    null
  );
  const didAnnotate = React.useRef(false);
  const navigationListener = React.useRef<any | null>(null);

  const handleFlipCameraPress = React.useCallback(
    () =>
      setCameraOrientation(cameraOrientation === "front" ? "back" : "front"),
    [cameraOrientation]
  );

  const handleGoBackPress = React.useCallback(() => {
    if (isLoading || isCapturing) return;

    switch (stage) {
      case "cameraConfirm":
        setPreviewPhotoUri(null);
        setStage("cameraCapture");
      case "cameraAnnotate": // Shouldn't happen
        return;
      default:
        props.navigation.goBack();
        break;
    }
  }, [isLoading, isCapturing, stage, previewPhotoUri]);

  const handleZoomLevelCycle = React.useCallback(() => {
    switch (zoomLevel) {
      case 0:
        setZoomLevel(0.25);
        break;
      case 0.25:
        setZoomLevel(0.5);
        break;
      case 0.5:
        setZoomLevel(0);
        break;
    }
  }, [zoomLevel]);

  const handleCapturePress = React.useCallback(async () => {
    // @todo handle camera error
    if (!isCameraReady.current || !cameraRef.current || isCapturing) return;
    setIsCapturing(true);

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      exif: true,
    });

    setStage("cameraConfirm");

    const actions: ImageManipulator.Action[] = [
      {
        resize: {
          width: Math.min(photo.width, Config.compressedImageWidth),
          height: Math.min(photo.height, Config.compressedImageHeight),
        },
      },
    ];

    if (cameraOrientation === "front") {
      actions.push({
        flip: ImageManipulator.FlipType.Horizontal,
      });
    }

    /**
     * If the orientation is 6, this image is likely erroneously landscape, so rotate it back 90 degrees
     */
    if (photo.exif?.Orientation === 6) {
      actions.push({
        rotate: -90,
      });
    }

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      actions,
      {
        compress: 0.5,
      }
    );

    exifData.current = photo.exif || null;
    setPreviewPhotoUri(resizedPhoto.uri);

    if (hasLocationPermissions.current) {
      try {
        const location = await getCurrentLocation();
        locationData.current = location || null;
      } catch (err) {
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravity(
            screeni18n("Camera.failedFetchLocationMessage") + err.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
      }
    }

    setIsCapturing(false);
  }, [isCapturing, cameraOrientation]);

  const handleCameraReady = React.useCallback(
    () => (isCameraReady.current = true),
    []
  );

  const handlePhotoUpdated = React.useCallback(
    (updatedPhoto: ImageManipulator.ImageResult) =>
      setPreviewPhotoUri(updatedPhoto.uri),
    []
  );

  const handleAnnotationSubmit = React.useCallback(
    async (annotationAnswers: AnnotationAnswer[]) => {
      try {
        if (!photoToAnnotate) return;
        setIsLoading(true);

        await asyncWithRetry(async () => {
          return await api.photos.annotate(photoToAnnotate.id, {
            annotationAnswers,
          });
        });

        didAnnotate.current = true;
        setShouldRefreshPhotoList(true);
        setShouldRefreshFeed(true);
        setIsLoading(false);

        switch (route.params.returnLocation) {
          case "LocationTracker":
            navigation.navigate("locationTracker");
            break;
          case "FeedPhotoDetail":
            // @ts-ignore
            navigation.navigate("main", {
              screen: "feed",
              params: {
                screen: "photoEventDetail",
              },
            });
            break;
        }
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("Camera.unknownErrorTitle"),
          screeni18n("Camera.unknownErrorMessage") + err.message
        );
        setIsLoading(false);
      }
    },
    [photoToAnnotate, navigation, route]
  );

  const handlePhotoUpload = React.useCallback(async () => {
    if (isLoading || !selectedEvent || !previewPhotoUri) return;
    setIsLoading(true);
    try {
      if (hasMediaLibraryPermissions.current) {
        await MediaLibrary.saveToLibraryAsync(previewPhotoUri);
      }

      const photo = await asyncWithRetry<Photo>(() => {
        return api.photos.uploadToEvent(selectedEvent.id, previewPhotoUri);
      });

      await asyncWithRetry(async () => {
        return await api.photos.updateMetadata(photo.id, {
          exifData: exifData.current,
          locationData: locationData.current
            ? {
                latitude: `${locationData.current.coords.latitude}`,
                longitude: `${locationData.current.coords.longitude}`,
              }
            : null,
        });
      });

      setPhotoToAnnotate(photo);
      setStage("cameraAnnotate");
    } catch (err) {
      console.error(err);
      Alert.alert(
        screeni18n("Camera.uploadErrorTitle"),
        screeni18n("Camera.uploadErrorMessage")
      );
      // @todo log exception
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, previewPhotoUri, selectedEvent]);

  const handleOpenAddCustomTagAnnotationModal = React.useCallback(() => {
    navigation.navigate("addCustomAnnotationTagModal");
  }, [navigation]);

  React.useEffect(() => {
    (async () => {
      const alreadyHasCameraPermissionsResponse =
        await Camera.getPermissionsAsync();
      if (alreadyHasCameraPermissionsResponse.granted)
        return setHasCameraPermissions(true);

      const requestCameraPermissionsResponse =
        await Camera.requestPermissionsAsync();
      if (requestCameraPermissionsResponse.granted) {
        setHasCameraPermissions(true);
      } else {
        Alert.alert(
          screeni18n("Camera.cameraPermissionsErrorTitle"),
          screeni18n("Camera.cameraPermissionsErrorMessage")
        );
        navigation.goBack();
      }

      const requestMediaLibraryPermissionsResponse =
        await MediaLibrary.requestPermissionsAsync(true);

      if (requestMediaLibraryPermissionsResponse.granted) {
        hasMediaLibraryPermissions.current = true;
      }
    })();
  }, []);

  React.useEffect(() => {
    if (navigationListener.current) {
      navigation.removeListener("beforeRemove", navigationListener.current);
    }

    navigationListener.current = (e: any) => {
      if (
        // If the user already annotated their picture we should not prevent the event as beforeRemove is called with programattic navigation calls
        !didAnnotate.current &&
        (isCapturing || isLoading || stage === "cameraAnnotate")
      ) {
        e.preventDefault();
        return;
      } else if (stage === "cameraConfirm") {
        e.preventDefault();
        setPreviewPhotoUri(null);
        setStage("cameraCapture");
        return;
      }

      navigation.dispatch(e.data.action);
    };

    navigation.addListener("beforeRemove", navigationListener.current);
  }, [navigation, stage, isCapturing, isLoading]);

  function getContent() {
    if (!hasCameraPermissions || !selectedEvent) return null;

    if (stage === "cameraCapture") {
      return (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => (cameraRef.current = ref || undefined)}
            ratio={"1:1"}
            type={cameraOrientation}
            style={styles.camera}
            zoom={zoomLevel}
            useCamera2Api
            onCameraReady={handleCameraReady}
          />

          <Pressable
            style={styles.cameraFlipButton}
            onPress={handleFlipCameraPress}
          >
            <Icon
              icon={"cameraFlip"}
              width={24}
              height={24}
              color={theme.palette.white}
            />
          </Pressable>
          <Pressable style={styles.zoomButton} onPress={handleZoomLevelCycle}>
            <Text style={styles.zoomButtonText}>
              {getZoomLevelLabel(zoomLevel)}
            </Text>
          </Pressable>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
          >
            <CameraCaptureControls
              promptMessage={getLocalizedCapturePromptMessage()}
              isCapturing={isCapturing}
              onPressCapture={handleCapturePress}
            />
          </ScrollView>
        </View>
      );
    } else if (stage === "cameraConfirm") {
      return (
        <CameraPreview
          photoUri={previewPhotoUri}
          isLoading={isLoading}
          onPressNext={handlePhotoUpload}
          onPreviewImageUpdated={handlePhotoUpdated}
        />
      );
    } else if (stage === "cameraAnnotate" && photoToAnnotate) {
      return (
        <CameraPhotoAnnotation
          annotationPrompts={selectedEvent.annotationPrompts}
          isLoading={isLoading}
          photo={photoToAnnotate}
          onSubmitAnnotation={handleAnnotationSubmit}
          onOpenAddCustomAnnotationTagModal={
            handleOpenAddCustomTagAnnotationModal
          }
        />
      );
    }
  }

  return (
    <Screen
      header={
        <Header
          variant={stage}
          canGoBack={stage !== "cameraAnnotate"}
          onPressGoBack={handleGoBackPress}
        />
      }
    >
      {getContent()}
    </Screen>
  );
}

type CameraPreviewProps = {
  photoUri: string | null;
  isLoading: boolean;
  onPressNext: () => void;
  onPreviewImageUpdated: (image: ImageManipulator.ImageResult) => void;
};

function CameraPreview(props: CameraPreviewProps) {
  const { photoUri, onPreviewImageUpdated } = props;

  const handleRotatePress = React.useCallback(async () => {
    if (!photoUri) return;

    try {
      const rotatedPhoto = await ImageManipulator.manipulateAsync(
        photoUri,
        [
          {
            rotate: 90,
          },
        ],
        {
          compress: 0.5,
        }
      );
      onPreviewImageUpdated(rotatedPhoto);
    } catch (err) {
      Alert.alert(
        screeni18n("Camera.unknownErrorTitle"),
        screeni18n("Camera.unknownErrorMessage")
      );
      // @todo log exception
    }
  }, [photoUri, onPreviewImageUpdated]);

  return (
    <View style={styles.cameraContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {!!photoUri ? (
          <Image
            style={styles.previewImage}
            source={{ uri: photoUri as string }}
          />
        ) : (
          <View style={styles.previewPlaceholder}>
            <ActivityIndicator size={"large"} color={palette.white} />
          </View>
        )}
        <Pressable style={styles.rotateButton} onPress={handleRotatePress}>
          <Icon
            icon={"rotate"}
            width={24}
            height={24}
            color={theme.palette.white}
          />
        </Pressable>
        <View style={styles.confirmContainer}>
          <Button
            text={screeni18n("Camera.nextButtonText")}
            isLoading={props.isLoading}
            onPress={props.onPressNext}
          />
        </View>
      </ScrollView>
    </View>
  );
}

type CameraCaptureControlsProps = {
  promptMessage: string | undefined;
  isCapturing: boolean;
  onPressCapture: () => void;
};

function CameraCaptureControls(props: CameraCaptureControlsProps) {
  const { promptMessage, isCapturing, onPressCapture } = props;
  return (
    <>
      <Text style={styles.capturePromptLabel}>{promptMessage || ""}</Text>
      <Pressable
        style={[
          styles.captureCtaButton,
          isCapturing && styles.captureCtaButtonDisabled,
        ]}
        onPress={onPressCapture}
      >
        <View style={styles.captureCtaButtonInner}>
          {isCapturing && (
            <ActivityIndicator size={"large"} color={theme.palette.white} />
          )}
        </View>
      </Pressable>
    </>
  );
}

type CameraPhotoAnnotationProps = {
  photo: Photo;
  isLoading: boolean;
  annotationPrompts: AnnotationPrompt[];
  onSubmitAnnotation: (answers: AnnotationAnswer[]) => Promise<void>;
  onOpenAddCustomAnnotationTagModal: () => void;
};

function CameraPhotoAnnotation(props: CameraPhotoAnnotationProps) {
  const { photo, annotationPrompts, isLoading, onSubmitAnnotation } = props;
  const scrollRef = React.useRef<ScrollView | null>(null);
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true);

  const handleScrollEnable = React.useCallback(
    () => setIsScrollEnabled(true),
    []
  );
  const handleScrollDisable = React.useCallback(
    () => setIsScrollEnabled(false),
    []
  );

  return (
    <View style={styles.photoAnnotationContainer}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        scrollEnabled={isScrollEnabled}
        contentContainerStyle={styles.photoAnnotationScrollContent}
      >
        <Image
          source={{
            uri: photo.imageUrl,
          }}
          style={styles.photoToAnnotate}
        />
        <View style={styles.photoAnnotationFormContainer}>
          <PhotoAnnotationForm
            photoId={photo.id}
            isLoading={isLoading}
            prompts={annotationPrompts}
            onSubmit={onSubmitAnnotation}
            onEnableScroll={handleScrollEnable}
            onDisableScroll={handleScrollDisable}
            onOpenAddCustomTagModal={props.onOpenAddCustomAnnotationTagModal}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.secondary,
  },
  camera: {
    width: layout.window.width,
    height: layout.window.width,
  },
  cameraFlipButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: layout.window.width,
    height: layout.window.width,
  },
  previewPlaceholder: {
    width: layout.window.width,
    height: layout.window.width,
    alignItems: "center",
    justifyContent: "center",
  },
  rotateButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[6],
  },
  zoomButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: layout.window.width - 64,
  },
  zoomButtonText: {
    fontFamily: typography.primaryBold,
    fontSize: 16,
    color: palette.white,
    textAlign: "center",
  },
  captureCtaButton: {
    width: 88,
    height: 88,
    borderRadius: 88,
    borderWidth: 2,
    borderColor: theme.palette.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing[3],
  },
  captureCtaButtonInner: {
    width: 76,
    height: 76,
    borderRadius: 76,
    backgroundColor: theme.palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  captureCtaButtonDisabled: {
    opacity: 0.5,
  },
  capturePromptLabel: {
    fontFamily: typography.primary,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 24,
    color: theme.palette.white,
  },
  confirmContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  photoToAnnotate: {
    width: layout.window.width,
    height: layout.window.width,
    backgroundColor: palette.grey100,
  },
  photoAnnotationContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.background,
  },
  photoAnnotationScrollContent: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  photoAnnotationFormContainer: {
    padding: theme.spacing[6],
    flexGrow: 1,
  },
});

function getZoomLevelLabel(zoomLevel: CameraZoomLevel) {
  switch (zoomLevel) {
    case 0:
      return "x1";
    case 0.25:
      return "x2";
    case 0.5:
      return "x3";
  }
}
