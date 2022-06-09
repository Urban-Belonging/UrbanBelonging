import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { LoadingState } from "../components/LoadingState";
import { PhotoReactionForm } from "../components/PhotoReactionForm";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { UserGroupHeader } from "../components/UserGroupHeader";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { ReactionAnswer } from "../lib/prompts";
import { FeedNavigatorParamList } from "../navigation/FeedNavigator";
import { Photo } from "../types/models";
import { getBestSizeThumbnailForPhoto } from "../utils/photo";

type FeedPhotoEventSliderReactionScreenProps = {
  navigation: NavigationProp<FeedNavigatorParamList>;
  route: RouteProp<FeedNavigatorParamList, "photoEventSliderReaction">;
};

export default function FeedPhotoEventSliderReactionScreen(
  props: FeedPhotoEventSliderReactionScreenProps
) {
  const { navigation } = props;
  const { selectedEvent, setPhotoWasReactedTo } = useGlobalState();
  const api = useApi();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [remainingCount, setRemainingCount] = React.useState(-1);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState<number>(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true);
  const activePhoto = React.useMemo<Photo | undefined>(() => {
    return photos[activePhotoIndex];
  }, [activePhotoIndex, photos]);

  const fetchPhotos = React.useCallback(
    async (eventId: string, skipLoading = false) => {
      try {
        if (!skipLoading) setIsLoading(true);

        const response = await api.photos.randomListForEvent(eventId);

        setPhotos(response.photos);
        setRemainingCount(response.remainingCount);

        if (response.photos.length > 0) setActivePhotoIndex(0);
        if (!skipLoading) setIsLoading(false);

        return response.photos;
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("FeedPhotoEventSliderReaction.fetchPhotosErrorTitle"),
          screeni18n("FeedPhotoEventSliderReaction.fetchPhotosErrorMessage")
        );
        if (!skipLoading) setIsLoading(false);
      }
    },
    []
  );

  const handleReactionSubmit = React.useCallback(
    async (reactionAnswers: ReactionAnswer[]) => {
      try {
        if (!activePhoto) return;
        setIsSubmitting(true);

        await api.photos.createReaction(activePhoto.id, {
          answers: reactionAnswers,
        });

        setPhotoWasReactedTo(activePhoto.id);

        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            y: 0,
            animated: true,
          });
        }

        setActivePhotoIndex(activePhotoIndex + 1);
      } catch (err) {
        console.error(err);

        Alert.alert(
          screeni18n("FeedPhotoEventSliderReaction.reactionSubmitErrorTitle"),
          screeni18n("FeedPhotoEventSliderReaction.reactionSubmitErrorMessage")
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [activePhoto, photos, activePhotoIndex]
  );

  const handleRequestBatchPress = React.useCallback(async () => {
    if (!selectedEvent) return;
    await fetchPhotos(selectedEvent.id);
  }, [selectedEvent]);

  const handleScrollEnable = React.useCallback(
    () => setIsScrollEnabled(true),
    []
  );
  const handleScrollDisable = React.useCallback(
    () => setIsScrollEnabled(false),
    []
  );

  const handleOpenAddCustomTagAnnotationModal = React.useCallback(() => {
    navigation.navigate("addCustomAnnotationTagModal");
  }, [navigation]);

  React.useEffect(() => {
    (async () => {
      if (!selectedEvent) return;
      await fetchPhotos(selectedEvent.id);
    })();
  }, [selectedEvent]);

  return (
    <Screen
      header={
        <Header
          variant={"feedPhotoEventSliderReaction"}
          title={selectedEvent?.name}
          canGoBack
          onPressGoBack={props.navigation.goBack}
        />
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        <ScrollView
          ref={scrollRef}
          style={styles.scrollContainer}
          scrollEnabled={isScrollEnabled}
          contentContainerStyle={styles.scrollContent}
        >
          <UserGroupHeader event={selectedEvent!} />
          <View style={styles.container}>
            {activePhoto ? (
              <>
                <View style={styles.sliderContainer}>
                  <SliderPhotoItem photo={photos[activePhotoIndex]} />
                  <View style={styles.sliderProgressContainer}>
                    <Text style={styles.sliderProgressLabel}>
                      <Text style={styles.sliderProgressLabelActive}>{`${
                        activePhotoIndex + 1
                      }`}</Text>
                      {`/${photos.length}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.reactionFormContainer}>
                  <PhotoReactionForm
                    photoId={activePhoto.id}
                    prompts={activePhoto.reactionPrompts}
                    isLoading={isSubmitting}
                    submitButtonText={screeni18n(
                      "FeedPhotoEventSliderReaction.reactionFormSubmitButtonText"
                    )}
                    onSubmit={handleReactionSubmit}
                    onEnableScroll={handleScrollEnable}
                    onDisableScroll={handleScrollDisable}
                    onOpenAddCustomTagModal={
                      handleOpenAddCustomTagAnnotationModal
                    }
                  />
                </View>
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <View />
                <View>
                  <Text style={styles.emptyTitle}>
                    {screeni18n("FeedPhotoEventSliderReaction.emptyTitle")}
                  </Text>
                  <Text style={styles.emptyLabel}>
                    {!!remainingCount
                      ? `You have ${remainingCount} more photos to react to. Start a new round below`
                      : screeni18n(
                          "FeedPhotoEventSliderReaction.emptyLabelWithNoRemainingPhotos",
                          {
                            remainingCount,
                          }
                        )}
                  </Text>
                </View>
                <View>
                  {!!remainingCount && (
                    <Button
                      text={screeni18n(
                        "FeedPhotoEventSliderReaction.newRoundButtonText"
                      )}
                      icon={"slider"}
                      onPress={handleRequestBatchPress}
                    />
                  )}
                  <Button
                    text={screeni18n(
                      "FeedPhotoEventSliderReaction.goBackButtonText"
                    )}
                    style={styles.goBackButton}
                    onPress={navigation.goBack}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
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
    justifyContent: "flex-start",
    backgroundColor: theme.palette.background,
  },
  sliderContainer: {
    width: layout.window.width,
    flexGrow: 0,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  sliderProgressContainer: {
    paddingTop: 8,
  },
  sliderProgressLabel: {
    fontFamily: typography.primaryBold,
    color: theme.palette.secondary,
    textAlign: "center",
    fontSize: 18,
  },
  sliderProgressLabelActive: {
    color: theme.palette.primary,
  },
  reactionFormContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[6],
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 24,
  },
  emptyTitle: {
    fontFamily: typography.primaryBold,
    color: palette.grey600,
    fontSize: 34,
    textAlign: "center",
    marginBottom: 16,
  },
  emptyLabel: {
    fontFamily: typography.primary,
    color: palette.grey600,
    fontSize: 13,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: palette.green400,
    marginTop: 24,
  },
});

type SliderPhotoItemProps = {
  photo: Photo;
};

export function SliderPhotoItem(props: SliderPhotoItemProps) {
  const { photo } = props;
  const thumbnail = React.useMemo(() => {
    if (!photo.thumbnails || photo.thumbnails.length === 0)
      return photo.imageUrl;

    const closestSizeThumbnail = getBestSizeThumbnailForPhoto(
      photo,
      layout.window.width
    );

    if (closestSizeThumbnail) return closestSizeThumbnail.url;

    return photo.imageUrl;
  }, [photo]);
  return (
    <View style={photoStyles.container}>
      <Image source={{ uri: thumbnail }} style={photoStyles.image} />
    </View>
  );
}

const photoStyles = StyleSheet.create({
  container: {
    width: layout.window.width,
    height: layout.window.width,
    alignSelf: "center",
  },
  image: {
    flexGrow: 1,
  },
});
