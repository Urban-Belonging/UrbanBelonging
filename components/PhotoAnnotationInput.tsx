import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { useGlobalState } from "../hooks/useGlobalState";
import i18n, {
  getLocalizedAnnotationPromptMessage,
  getLocalizedAnswerOptionLabel,
  getLocalizedAnswerSliderOptionLabel,
} from "../lib/i18n";
import {
  AnnotationAnswerOptions,
  AnnotationAnswerType,
  AnnotationPromptType,
  ReactionAnswerOptions,
  ReactionPromptType,
} from "../lib/prompts";
import { Icon } from "./Icon";
import { PhotoAnnotationAttachmentSlider } from "./PhotoAnnotationAttachmentSlider";
import { Text } from "./Text";

const SLIDER_CONTAINER_PADDING = 16;

export type PhotoAnnotationInputProps = {
  index: number;
  type?: "annotation" | "reaction";
  answerType?: AnnotationAnswerType;
  promptType: AnnotationPromptType | ReactionPromptType;
  message: string;
  isLoading: boolean;
  canAddCustomTag?: boolean;
  onSelectSingleChoice: (answer: string, index: number) => void;
  onSelectMultipleChoice: (answer: string[], index: number) => void;
  onSelectSlider: (value: number, index: number) => void;
  onDisableScroll: () => void;
  onEnableScroll: () => void;
  onOpenAddCustomTagModal: () => void;
};

export function PhotoAnnotationInput(props: PhotoAnnotationInputProps) {
  const {
    index,
    type = "annotation",
    onSelectSingleChoice,
    onSelectMultipleChoice,
    onSelectSlider,
  } = props;
  const answerOptions =
    type === "annotation"
      ? AnnotationAnswerOptions[props.promptType as AnnotationPromptType]
      : ReactionAnswerOptions[props.promptType as ReactionPromptType];
  const { customAnnotationTag, setCustomAnnotationTag } = useGlobalState();
  const [singleChoiceAnswer, setSingleChoiceAnswer] = React.useState<
    string | null
  >(null);
  const [sliderAnswer, setSliderAnswer] = React.useState(3);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = React.useState<
    string[]
  >([]);
  const [
    additionalMultipleChoiceAnswerOptions,
    setAdditionalMultipleChoiceAnswerOptions,
  ] = React.useState<string[]>([]);

  const handleMultipleChoiceAnswerPress = React.useCallback(
    (answer: string) => {
      let newAnswers;

      if (multipleChoiceAnswers.includes(answer)) {
        newAnswers = multipleChoiceAnswers.filter(
          (currentAnswer) => currentAnswer !== answer
        );
      } else {
        newAnswers = [...multipleChoiceAnswers, answer];
      }

      setMultipleChoiceAnswers(newAnswers);
      onSelectMultipleChoice(newAnswers, index);
    },
    [multipleChoiceAnswers, index, onSelectMultipleChoice]
  );

  const handleSingleChoiceAnswerPress = React.useCallback(
    (answer: string) => {
      setSingleChoiceAnswer(answer);
      onSelectSingleChoice(answer, index);
    },
    [index, onSelectSingleChoice]
  );

  const handleSliderAnswerChange = React.useCallback(
    (answer: number) => {
      setSliderAnswer(answer);
      onSelectSlider(answer, index);
    },
    [index, onSelectSlider]
  );

  React.useEffect(() => {
    if (customAnnotationTag) {
      setCustomAnnotationTag(null);
      setAdditionalMultipleChoiceAnswerOptions([
        ...additionalMultipleChoiceAnswerOptions,
        customAnnotationTag,
      ]);

      const newAnswers = [...multipleChoiceAnswers, customAnnotationTag];
      setMultipleChoiceAnswers(newAnswers);
      onSelectMultipleChoice(newAnswers, index);
    }
  }, [
    customAnnotationTag,
    additionalMultipleChoiceAnswerOptions,
    multipleChoiceAnswers,
    onSelectMultipleChoice,
  ]);

  return (
    <View style={styles.answerContainer}>
      <Text style={styles.annotationPromptLabel}>
        {getLocalizedAnnotationPromptMessage(props.promptType)}
      </Text>
      {props.answerType === "slider" ? (
        <PhotoAnnotationAttachmentSlider
          lowLabel={getLocalizedAnswerSliderOptionLabel(props.promptType, 1)}
          mediumLabel={getLocalizedAnswerSliderOptionLabel(props.promptType, 3)}
          highLabel={getLocalizedAnswerSliderOptionLabel(props.promptType, 5)}
          value={sliderAnswer}
          onChange={handleSliderAnswerChange}
          onEnableScroll={props.onEnableScroll}
          onDisableScroll={props.onDisableScroll}
        />
      ) : props.answerType === "single-choice" ? (
        <View style={styles.singleChoiceOptionsContainer}>
          {answerOptions.map((option, index) => (
            <Pressable
              key={`${option}-${index}`}
              style={[
                styles.selectAnswerButton,
                singleChoiceAnswer === option &&
                  styles.selectAnswerButtonActive,
              ]}
              onPress={() => handleSingleChoiceAnswerPress(option as string)}
            >
              <Text
                style={[
                  styles.selectAnswerButtonLabel,
                  singleChoiceAnswer === option &&
                    styles.selectAnswerButtonLabelActive,
                ]}
              >
                {getLocalizedAnswerOptionLabel(props.promptType, index)}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : props.answerType === "multiple-choice" ? (
        <View style={styles.multipleChoiceOptionsContainer}>
          {answerOptions.map((option, index) => (
            <MultipleChoiceAnswerOption
              key={`${option}-${index}`}
              label={getLocalizedAnswerOptionLabel(props.promptType, index)}
              option={option as string}
              isActive={multipleChoiceAnswers.includes(option as string)}
              onPress={handleMultipleChoiceAnswerPress}
            />
          ))}
          {additionalMultipleChoiceAnswerOptions.map((option, index) => (
            <MultipleChoiceAnswerOption
              key={`additional-${option}-${index}`}
              label={option as string}
              option={option as string}
              isActive={multipleChoiceAnswers.includes(option as string)}
              onPress={handleMultipleChoiceAnswerPress}
            />
          ))}
          {props.canAddCustomTag && (
            <Pressable
              style={styles.addCustomTagButton}
              onPress={props.onOpenAddCustomTagModal}
            >
              <Icon icon={"add"} height={16} width={16} color={palette.black} />
              <Text style={styles.addCustomTagButtonLabel}>
                {i18n.t("add-custom-tag-button-label")}
              </Text>
            </Pressable>
          )}
        </View>
      ) : null}
    </View>
  );
}

type MultipleChoiceAnswerOptionProps = {
  label: string;
  option: string;
  isActive: boolean;
  onPress: (option: string) => void;
};

function MultipleChoiceAnswerOption(props: MultipleChoiceAnswerOptionProps) {
  const { label, option, isActive, onPress } = props;

  const handlePress = React.useCallback(() => {
    onPress(option);
  }, [option, onPress]);

  return (
    <Pressable
      style={[
        styles.selectAnswerButton,
        isActive && styles.selectAnswerButtonActive,
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.selectAnswerButtonLabel,
          isActive && styles.selectAnswerButtonLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: "column",
    paddingBottom: theme.spacing[4],
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  annotationPromptLabel: {
    fontFamily: typography.primaryBold,
    textAlign: "center",
    fontSize: 20,
    color: theme.palette.secondary,
    marginBottom: 16,
  },
  singleChoiceOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectAnswerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.grey50,
    borderRadius: 8,
    margin: 6,
  },
  selectAnswerButtonActive: {
    backgroundColor: theme.palette.primary,
  },
  selectAnswerButtonLabel: {
    fontFamily: typography.primary,
    textAlign: "center",
    fontSize: 18,
    color: palette.black,
  },
  selectAnswerButtonLabelActive: {
    color: theme.palette.white,
  },
  multipleChoiceOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sliderContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
    overflow: "visible",
    marginBottom: 32,
    marginTop: 64,
    paddingHorizontal: SLIDER_CONTAINER_PADDING,
    position: "relative",
  },
  slider: {
    alignSelf: "stretch",
    // margin: 16,
    paddingVertical: 16,
  },
  sliderNotch: {
    backgroundColor: palette.grey75,
    width: 4,
    top: 0,
    bottom: 0,
    position: "absolute",
    borderRadius: 4,
  },
  sliderNotchText: {
    fontSize: 14,
    fontFamily: typography.primary,
    color: palette.grey500,
    position: "absolute",
    top: -24,
  },
  addCustomTagButton: {
    borderWidth: 1,
    borderColor: palette.grey600,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addCustomTagButtonLabel: {
    fontFamily: typography.primary,
    textAlign: "center",
    fontSize: 18,
    color: palette.black,
    marginLeft: 4,
  },
});
