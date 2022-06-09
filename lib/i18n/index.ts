import * as Localization from "expo-localization";
// @todo fix this ignore, this works as expected but may need to enable esModuleInterop
// @ts-ignore
import i18n from "i18n-js";
import {
  AnnotationPromptType,
  CapturePromptType,
  ReactionPromptType,
} from "../prompts";
import { daTranslations } from "./da";
import { ComponentKey, enTranslations, ScreenKey } from "./en";
import { itTranslations } from "./it";
import { nlTranslations } from "./nl";

i18n.translations = {
  en: enTranslations,
  nl: nlTranslations,
  da: daTranslations,
  it: itTranslations,
};

i18n.locale = Localization.locale.substring(0, 2);
i18n.defaultLocale = "en";
i18n.fallbacks = true;

export default i18n;

// @todo add capture prompt id to event so we don't need to hardcode this
export function getLocalizedCapturePromptMessage(
  promptType: CapturePromptType = "general:thing-place-situation"
) {
  return i18n.t(`capture-prompt.${promptType}`);
}

export function getLocalizedAnswerOptionLabel(
  promptType: AnnotationPromptType | ReactionPromptType,
  optionIndex: number
) {
  return i18n.t(`${promptType}.option${optionIndex + 1}`);
}

// @todo support translating a value from an answer written in another locale into the user's locale
// export function getLocalizedPreviewAnswerLabel(
//   promptType: AnnotationPromptType | ReactionPromptType,
//   answer: string
// ) {
//   const englishTranslationsForPrompt = (
//     i18n.translations.en as MasterTranslations
//   )[promptType as MasterTranslationKey];
//   const userLocaleTranslationsForPrompt = (i18n.translations[i18n.locale] ||
//     i18n.translations[i18n.defaultLocale]) as MasterTranslations;

//   if (englishTranslationsForPrompt) {
//     let matchingTranslationKey = null;

//     for (const [key, value] of Object.entries(englishTranslationsForPrompt)) {
//       if (value === answer) {
//         matchingTranslationKey = key;
//         break;
//       }
//     }

//     if(matchingTranslationKey) {
//         return userLocaleTranslationsForPrompt[matchingTranslationKey]
//     }
//   }
// }

export function getLocalizedAnnotationPromptMessage(
  promptType: AnnotationPromptType | ReactionPromptType
) {
  return i18n.t(`${promptType}.title`);
}

export function getLocalizedAnswerSliderOptionLabel(
  promptType: AnnotationPromptType | ReactionPromptType,
  value: 1 | 3 | 5
) {
  return i18n.t(`${promptType}.value${value}`);
}

export function screeni18n(key: ScreenKey, args?: i18n.TranslateOptions) {
  return i18n.t(`screens.${key}`, args);
}

export function componentsi18n(
  key: ComponentKey,
  args?: i18n.TranslateOptions
) {
  return i18n.t(`components.${key}`, args);
}
