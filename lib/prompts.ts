/**
 * @NOTE Do not remove old prompts here! The frontend relies on it. You can adjust copy/answer options, but do not remove any prompt types.
 */

export type AnnotationType = "annotation" | "reaction";

export type AnnotationAnswerType =
  | "single-choice"
  | "multiple-choice"
  | "slider";

export type CapturePromptType =
  | "general:thing-place-situation"
  | "general:significant-experience";
export interface CapturePrompt {
  message: string;
}
// @todo use enums
export const CapturePrompts: Record<CapturePromptType, CapturePrompt> = {
  "general:thing-place-situation": {
    message:
      "Take a picture of a thing/place/situation in your city that you want to share",
  },
  "general:significant-experience": {
    message:
      "Take a picture of a place or thing in the urban environment that creates a significant experience for you that you want to share",
  },
};

export type AnnotationPromptType =
  | "annotation:describe-attachment"
  | "annotation:describe-creation-motivation"
  | "annotation:describe-sentiment"
  | "annotation:what-evoked";
export interface AnnotationPrompt {
  promptType: AnnotationPromptType;
  message: string;
  answerType: AnnotationAnswerType;
  canAddCustomTag?: boolean;
}
export const AnnotationPrompts: Record<AnnotationPromptType, AnnotationPrompt> =
  {
    "annotation:describe-attachment": {
      promptType: "annotation:describe-attachment",
      answerType: "slider",
      message: "Do you feel this is for you?",
    },
    "annotation:describe-creation-motivation": {
      promptType: "annotation:describe-creation-motivation",
      answerType: "multiple-choice",
      message: "What made you take this picture?",
      canAddCustomTag: true,
    },
    "annotation:describe-sentiment": {
      promptType: "annotation:describe-sentiment",
      answerType: "single-choice",
      message: "What is the sentiment of your experience?",
    },
    "annotation:what-evoked": {
      promptType: "annotation:what-evoked",
      answerType: "multiple-choice",
      message: "What evoked this experience?",
    },
  };

export type ReactionPromptType =
  | "reaction:describe-attachment"
  | "reaction:describe-creation-motivation"
  | "reaction:describe-sentiment"
  | "reaction:what-evoked";

export interface ReactionPrompt {
  promptType: ReactionPromptType;
  annotationPromptType: AnnotationPromptType;
  message: string;
  answerType: AnnotationAnswerType;
  canAddCustomTag?: boolean;
}

export const ReactionPrompts: Record<ReactionPromptType, ReactionPrompt> = {
  "reaction:describe-attachment": {
    promptType: "reaction:describe-attachment",
    annotationPromptType: "annotation:describe-attachment",
    answerType: "slider",
    message: "Do you feel this is for you?",
  },
  "reaction:describe-creation-motivation": {
    promptType: "reaction:describe-creation-motivation",
    annotationPromptType: "annotation:describe-creation-motivation",
    answerType: "multiple-choice",
    message: "What do you notice in this picture?",
    canAddCustomTag: true,
  },
  "reaction:describe-sentiment": {
    promptType: "reaction:describe-sentiment",
    annotationPromptType: "annotation:describe-sentiment",
    answerType: "single-choice",
    message: "Describe the sentiment this pictore evokes in you",
  },
  "reaction:what-evoked": {
    promptType: "reaction:what-evoked",
    annotationPromptType: "annotation:what-evoked",
    answerType: "multiple-choice",
    message: "What evoked that sentiment?",
  },
};

export interface AnnotationAnswer {
  singleChoiceAnswer: string | null;
  multipleChoiceAnswer: string[] | null;
  sliderAnswer: number | null;
  answerType: AnnotationAnswerType;
}

export const AnnotationAnswerOptions: Record<
  AnnotationPromptType,
  (string | number)[]
> = {
  "annotation:describe-attachment": [1, 2, 3, 4, 5],
  "annotation:describe-creation-motivation": [
    "Architecture",
    "Urban Environment",
    "Objects",
    "Signs & symbols",
    "Urban Nature",
    "Wind & Weather",
    "Culture",
    "Consumption",
    "People /community",
    "Infrastructure",
    "Memories & associations",
    "Atmosphere",
  ],
  "annotation:describe-sentiment": ["Pleasant", "Un-pleasant", "Ambiguous"],
  "annotation:what-evoked": [
    "Smell",
    "Sound",
    "People / Social life",
    "Atmosphere",
    "Memories",
    "Food/drink",
    "Urban environment",
    "Green environment",
    "Access to the space",
    "Other",
  ],
};

export interface ReactionAnswer extends AnnotationAnswer {}

export const ReactionAnswerOptions: Record<
  ReactionPromptType,
  (string | number)[]
> = {
  "reaction:describe-attachment": [1, 2, 3, 4, 5],
  "reaction:describe-creation-motivation": [
    "Architecture",
    "Urban Environment",
    "Objects",
    "Signs & symbols",
    "Urban Nature",
    "Wind & Weather",
    "Culture",
    "Consumption",
    "People /community",
    "Infrastructure",
    "Memories & associations",
    "Atmosphere",
    "Don't know",
  ],
  "reaction:describe-sentiment": ["Pleasant", "Un-pleasant", "Ambiguous"],
  "reaction:what-evoked": [
    "Smell",
    "Sound",
    "People / Social life",
    "Atmosphere",
    "Memories",
    "Food/drink",
    "Urban environment",
    "Green environment",
    "Access to the space",
    "Other",
  ],
};
