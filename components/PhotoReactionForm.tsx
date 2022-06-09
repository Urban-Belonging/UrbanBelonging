import * as React from "react";
import {
  PhotoAnnotationForm,
  PhotoAnnotationFormProps,
} from "./PhotoAnnotationForm";

type PhotoReactionFormProps = Omit<PhotoAnnotationFormProps, "type">;

export function PhotoReactionForm(props: PhotoReactionFormProps) {
  return <PhotoAnnotationForm {...props} type={"reaction"} />;
}
