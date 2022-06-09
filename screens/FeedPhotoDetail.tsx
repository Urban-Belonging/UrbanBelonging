import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../components/Header";
import { LoadingState } from "../components/LoadingState";
import { PhotoAnnotationForm } from "../components/PhotoAnnotationForm";
import { PhotoAnnotationPreview } from "../components/PhotoAnnotationPreview";
import { PhotoReactionForm } from "../components/PhotoReactionForm";
import { Screen } from "../components/Screen";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { AnnotationAnswer, ReactionAnswer } from "../lib/prompts";
import { MainNavigatorParamList } from "../navigation/MainNavigator";
import { PhotoReaction } from "../types/models";

type FeedPhotoDetailScreenProps = {
  navigation: NavigationProp<MainNavigatorParamList>;
};

export default function FeedPhotoDetailScreen(
  props: FeedPhotoDetailScreenProps
) {
  const { navigation } = props;
  const {
    selectedPhoto,
    selectedEvent,
    user,
    selectPhoto,
    setPhotoWasReactedTo,
  } = useGlobalState();
  const api = useApi();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true);

  const [myReaction, setMyReaction] = React.useState<PhotoReaction | null>(
    null
  );

  const handleReactionSubmit = React.useCallback(
    async (reactionAnswers: ReactionAnswer[]) => {
      if (!selectedPhoto) return;

      try {
        setIsSubmitting(true);
        const response = await api.photos.createReaction(selectedPhoto.id, {
          answers: reactionAnswers,
        });
        setPhotoWasReactedTo(selectedPhoto.id);
        setMyReaction(response);
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("FeedPhotoDetail.unknownErrorTitle"),
          screeni18n("FeedPhotoDetail.unknownErrorMessage")
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedPhoto]
  );

  const handleAnnotationSubmit = React.useCallback(
    async (annotationAnswers: AnnotationAnswer[]) => {
      try {
        if (!selectedPhoto) return;
        setIsSubmitting(true);
        const updatedPhoto = await api.photos.annotate(selectedPhoto.id, {
          annotationAnswers,
        });
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            y: 0,
            animated: true,
          });
        }
        selectPhoto(updatedPhoto);
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("FeedPhotoDetail.unknownErrorTitle"),
          screeni18n("FeedPhotoDetail.unknownErrorMessage")
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedPhoto]
  );

  const handleOpenAddCustomTagAnnotationModal = React.useCallback(() => {
    navigation.navigate("addCustomAnnotationTagModal");
  }, [navigation]);

  const handleScrollEnable = React.useCallback(
    () => setIsScrollEnabled(true),
    []
  );
  const handleScrollDisable = React.useCallback(
    () => setIsScrollEnabled(false),
    []
  );

  React.useEffect(() => {
    if (!selectedPhoto || !user) {
      setMyReaction(null);
      return;
    }
    if (selectedPhoto.createdBy !== user.id) {
      (async () => {
        try {
          setIsLoading(true);
          const response = await api.photos.getReactions(selectedPhoto.id);
          setMyReaction(response[0] || null);
        } catch (err) {
          console.error(err);
          Alert.alert(
            screeni18n("FeedPhotoDetail.unknownErrorTitle"),
            screeni18n("FeedPhotoDetail.unknownErrorMessage")
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [user, selectedPhoto]);

  return (
    <Screen
      header={
        <Header
          variant={"feedPhotoDetail"}
          title={selectedEvent?.name}
          canGoBack
          onPressGoBack={props.navigation.goBack}
        />
      }
    >
      {selectedPhoto && (
        <ScrollView
          ref={scrollRef}
          style={styles.container}
          scrollEnabled={isScrollEnabled}
          contentContainerStyle={styles.scrollContent}
        >
          <Image
            source={{
              uri: selectedPhoto.imageUrl,
            }}
            style={styles.image}
          />
          <View style={styles.descriptionContainer}>
            {isLoading && <LoadingState />}
            {!isLoading &&
              selectedPhoto.createdBy === user?.id &&
              selectedPhoto.annotationPrompts &&
              selectedPhoto.annotationAnswers &&
              selectedPhoto.annotationAnswers.length > 0 && (
                <PhotoAnnotationPreview
                  title={screeni18n("FeedPhotoDetail.annotationTitle")}
                  prompts={selectedPhoto.annotationPrompts}
                  answers={selectedPhoto.annotationAnswers}
                  onPressGoBack={navigation.goBack}
                />
              )}

            {!isLoading &&
              selectedEvent &&
              selectedPhoto.createdBy === user?.id &&
              (!selectedPhoto.annotationAnswers ||
                selectedPhoto.annotationAnswers.length !==
                  selectedPhoto.annotationPrompts.length) && (
                <PhotoAnnotationForm
                  photoId={selectedPhoto.id}
                  isLoading={isSubmitting}
                  prompts={selectedEvent.annotationPrompts}
                  onSubmit={handleAnnotationSubmit}
                  onEnableScroll={handleScrollEnable}
                  onDisableScroll={handleScrollDisable}
                  onOpenAddCustomTagModal={
                    handleOpenAddCustomTagAnnotationModal
                  }
                />
              )}
            {!isLoading &&
              selectedEvent?.reactionPeriodIsActive &&
              selectedPhoto.createdBy !== user?.id &&
              !myReaction && (
                <PhotoReactionForm
                  photoId={selectedPhoto.id}
                  isLoading={isSubmitting}
                  prompts={selectedPhoto.reactionPrompts}
                  onSubmit={handleReactionSubmit}
                  onEnableScroll={handleScrollEnable}
                  onDisableScroll={handleScrollDisable}
                  onOpenAddCustomTagModal={
                    handleOpenAddCustomTagAnnotationModal
                  }
                />
              )}
            {!isLoading &&
              selectedPhoto.createdBy !== user?.id &&
              myReaction && (
                <PhotoAnnotationPreview
                  title={screeni18n("FeedPhotoDetail.reactionTitle")}
                  prompts={myReaction.prompts}
                  answers={myReaction.answers}
                  onPressGoBack={navigation.goBack}
                />
              )}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: layout.window.width,
    height: layout.window.width,
    backgroundColor: palette.grey100,
  },
  descriptionContainer: {
    padding: theme.spacing[6],
    flexGrow: 1,
  },
});
