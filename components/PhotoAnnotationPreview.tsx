import * as React from "react";
import { StyleSheet, View } from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import {
  componentsi18n,
  getLocalizedAnnotationPromptMessage,
  getLocalizedAnswerSliderOptionLabel,
} from "../lib/i18n";
import {
  AnnotationAnswer,
  AnnotationPrompt,
  ReactionAnswer,
  ReactionPrompt,
} from "../lib/prompts";
import { Button } from "./Button";
import { PhotoAnnotationAttachmentSlider } from "./PhotoAnnotationAttachmentSlider";
import { Text } from "./Text";

export type PhotoAnnotationPreviewProps = {
  title: string;
  prompts: (AnnotationPrompt | ReactionPrompt)[];
  answers: (AnnotationAnswer | ReactionAnswer)[];
  onPressGoBack: () => void;
};

export function PhotoAnnotationPreview(props: PhotoAnnotationPreviewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.prompts.map((prompt, index) => (
        <View
          key={`${prompt.promptType}-${index}`}
          style={styles.annotationContainer}
        >
          <Text style={styles.annotationPromptLabel}>
            {getLocalizedAnnotationPromptMessage(prompt.promptType)}
          </Text>
          <View style={styles.annotationAnswersContainer}>
            {prompt.answerType === "slider" && (
              <View style={styles.answerSliderContainer}>
                <PhotoAnnotationAttachmentSlider
                  lowLabel={getLocalizedAnswerSliderOptionLabel(
                    prompt.promptType,
                    1
                  )}
                  mediumLabel={getLocalizedAnswerSliderOptionLabel(
                    prompt.promptType,
                    3
                  )}
                  highLabel={getLocalizedAnswerSliderOptionLabel(
                    prompt.promptType,
                    5
                  )}
                  value={props.answers[index].sliderAnswer!}
                  disabled
                />
              </View>
            )}
            {prompt.answerType === "single-choice" && (
              <View style={styles.answerChoiceContainer}>
                <Text style={styles.answerChoiceLabel}>
                  {props.answers[index].singleChoiceAnswer}
                </Text>
              </View>
            )}
            {prompt.answerType === "multiple-choice" &&
              props.answers[index].multipleChoiceAnswer?.map(
                (answer, answerIndex) => (
                  <View
                    key={`${answer}-${answerIndex}`}
                    style={styles.answerChoiceContainer}
                  >
                    <Text style={styles.answerChoiceLabel}>{answer}</Text>
                  </View>
                )
              )}
          </View>
        </View>
      ))}
      <Button
        text={componentsi18n("PhotoAnnotationPreview.goBackButtonText")}
        style={styles.goBackButton}
        onPress={props.onPressGoBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  annotationContainer: {
    flexDirection: "column",
    marginBottom: theme.spacing[5],
  },
  title: {
    fontFamily: typography.primaryBold,
    textAlign: "center",
    fontSize: 34,
    color: theme.palette.secondary,
    marginBottom: 32,
  },
  annotationPromptLabel: {
    fontFamily: typography.primaryBold,
    textAlign: "center",
    fontSize: 20,
    color: theme.palette.secondary,
    marginBottom: 16,
  },
  annotationAnswersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  answerChoiceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.green300,
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 6,
  },
  answerSliderContainer: {
    flexGrow: 1,
    alignSelf: "stretch",
  },
  answerChoiceLabel: {
    fontFamily: typography.primary,
    textAlign: "center",
    fontSize: 18,
    color: theme.palette.white,
  },
  goBackButton: {
    alignSelf: "stretch",
    backgroundColor: palette.green400,
    marginTop: 18,
  },
});
