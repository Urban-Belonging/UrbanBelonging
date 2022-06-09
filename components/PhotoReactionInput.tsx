import * as React from "react";
import { ReactionPromptType } from "../lib/prompts";
import {
  PhotoAnnotationInput,
  PhotoAnnotationInputProps,
} from "./PhotoAnnotationInput";

type PhotoReactionInputProps = Omit<
  PhotoAnnotationInputProps,
  "promptType" | "type"
> & {
  promptType: ReactionPromptType;
};

export function PhotoReactionInput(props: PhotoReactionInputProps) {
  return <PhotoAnnotationInput {...props} type={"reaction"} />;
}
