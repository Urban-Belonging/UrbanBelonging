import * as React from "react";
import { StyleSheet, View } from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import {
  AnnotationAnswer,
  AnnotationPrompt,
  AnnotationType,
  ReactionAnswer,
  ReactionPrompt,
} from "../lib/prompts";
import { Button } from "./Button";
import { PhotoAnnotationInput } from "./PhotoAnnotationInput";
import { PhotoReactionInput } from "./PhotoReactionInput";
import { Text } from "./Text";

export type PhotoAnnotationFormProps = {
  title?: string;
  type?: AnnotationType;
  photoId: string;
  submitButtonText?: string;
  prompts: (AnnotationPrompt | ReactionPrompt)[];
  isLoading: boolean;
  onSubmit: (answers: (AnnotationAnswer | ReactionAnswer)[]) => Promise<void>;
  onDisableScroll: () => void;
  onEnableScroll: () => void;
  onOpenAddCustomTagModal: () => void;
};

export function PhotoAnnotationForm(props: PhotoAnnotationFormProps) {
  const { type = "annotation", prompts, onSubmit } = props;
  const [answers, setAnswers] = React.useState<
    (AnnotationAnswer | ReactionAnswer)[]
  >(getInitialAnswersFromPrompts(prompts));

  const isAnnotationValid = React.useMemo(() => {
    return answers.reduce((result, answer) => {
      if (!result) return result;

      switch (answer.answerType) {
        case "single-choice":
          result = answer.singleChoiceAnswer !== null;
          break;
        case "multiple-choice":
          result =
            answer.multipleChoiceAnswer !== null &&
            answer.multipleChoiceAnswer.length > 0;
          break;
      }
      return result;
    }, true);
  }, [answers]);

  const handleSingleChoiceAnswerSelect = React.useCallback(
    (answer: string, index: number) => {
      setAnswers(
        answers.map((existingAnswer, existingAnswerIndex) => {
          if (index === existingAnswerIndex) {
            return {
              ...existingAnswer,
              singleChoiceAnswer: answer,
            };
          }
          return existingAnswer;
        })
      );
    },
    [answers]
  );

  const handleMultipleChoiceAnswerSelect = React.useCallback(
    (answer: string[], index: number) => {
      setAnswers(
        answers.map((existingAnswer, existingAnswerIndex) => {
          if (index === existingAnswerIndex) {
            return {
              ...existingAnswer,
              multipleChoiceAnswer: answer,
            };
          }
          return existingAnswer;
        })
      );
    },
    [answers]
  );

  const handleSliderAnswerSelect = React.useCallback(
    (answer: number, index: number) => {
      setAnswers(
        answers.map((existingAnswer, existingAnswerIndex) => {
          if (index === existingAnswerIndex) {
            return {
              ...existingAnswer,
              sliderAnswer: answer,
            };
          }
          return existingAnswer;
        })
      );
    },
    [answers]
  );

  const handleSubmitPress = React.useCallback(() => {
    if (!isAnnotationValid) return;
    onSubmit(answers);
  }, [answers, isAnnotationValid]);

  React.useEffect(() => {
    setAnswers(getInitialAnswersFromPrompts(prompts));
  }, [prompts]);

  return (
    <View style={styles.annotationPromptContainer}>
      {props.title && <Text style={styles.title}>{props.title}</Text>}
      <View style={styles.annotationAnswerInputContainer}>
        {prompts.map((prompt, index) =>
          type === "annotation" ? (
            <PhotoAnnotationInput
              key={`annotation-prompt-${index}-${props.photoId}`}
              index={index}
              promptType={(prompt as AnnotationPrompt).promptType}
              answerType={prompt.answerType}
              message={prompt.message}
              isLoading={props.isLoading}
              canAddCustomTag={prompt.canAddCustomTag}
              onSelectSingleChoice={handleSingleChoiceAnswerSelect}
              onSelectMultipleChoice={handleMultipleChoiceAnswerSelect}
              onSelectSlider={handleSliderAnswerSelect}
              onEnableScroll={props.onEnableScroll}
              onDisableScroll={props.onDisableScroll}
              onOpenAddCustomTagModal={props.onOpenAddCustomTagModal}
            />
          ) : (
            <PhotoReactionInput
              key={`reaction-prompt-${index}-${props.photoId}`}
              index={index}
              promptType={(prompt as ReactionPrompt).promptType}
              answerType={prompt.answerType}
              message={prompt.message}
              isLoading={props.isLoading}
              canAddCustomTag={prompt.canAddCustomTag}
              onSelectSingleChoice={handleSingleChoiceAnswerSelect}
              onSelectMultipleChoice={handleMultipleChoiceAnswerSelect}
              onSelectSlider={handleSliderAnswerSelect}
              onEnableScroll={props.onEnableScroll}
              onDisableScroll={props.onDisableScroll}
              onOpenAddCustomTagModal={props.onOpenAddCustomTagModal}
            />
          )
        )}
        <Button
          text={props.submitButtonText || "Submit"}
          isLoading={props.isLoading}
          disabled={!isAnnotationValid}
          style={styles.submitButton}
          onPress={handleSubmitPress}
        />
      </View>
    </View>
  );
}

function getInitialAnswersFromPrompts(
  prompts: (AnnotationPrompt | ReactionPrompt)[]
): (AnnotationAnswer | ReactionAnswer)[] {
  return prompts.map((prompt) => ({
    answerType: prompt.answerType,
    singleChoiceAnswer: null,
    multipleChoiceAnswer: [],
    sliderAnswer: prompt.answerType === "slider" ? 3 : null,
  }));
}

const styles = StyleSheet.create({
  annotationPromptContainer: {
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    fontFamily: typography.primaryBold,
    textAlign: "center",
    fontSize: 34,
    color: palette.green300,
    marginBottom: 32,
  },
  annotationAnswerInputContainer: {
    marginTop: theme.spacing[5],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 24,
    alignSelf: "stretch",
  },
});
