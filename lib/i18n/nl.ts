import { MasterTranslationKey } from "./en";

export const nlTranslations: Record<MasterTranslationKey, any> = {
  // Capture prompt
  "capture-prompt": {
    "general:thing-place-situation":
      "Maak een foto van een plek, situatie of ding in jouw stad die je graag wil delen.",
  },

  // Used for annotations/reactions
  "add-custom-tag-button-label": "Anders",

  /* Annotations */

  // annotation:annotation-creation-motivation
  "annotation:describe-creation-motivation": {
    title: "Waarom heb je dit gefotografeerd?",
    option1: "Architectuur",
    option2: "Stedelijke omgeving",
    option3: "Objecten",
    option4: "Tekens en symbolen",
    option5: "Stadsnatuur",
    option6: "Wind en weer",
    option7: "Cultuur",
    option8: "Consumptie",
    option9: "Mensen/ gemeenschap",
    option10: "Infrastructuur",
    option11: "Herinneringen en associaties",
    option12: "Sfeer",
  },

  // annotation:describe-attachment
  "annotation:describe-attachment": {
    title: "In hoeverre denk je dat dit iets voor jou is?",
    value1: "Niet voor mij",
    value3: "Twijfelgeval",
    value5: "Iets voor mij",
  },

  /* Reactions */

  // reaction:describe-attachment
  "reaction:describe-attachment": {
    title: "In hoeverre denk je dat dit iets voor jou is?",
    value1: "Niet voor mij",
    value3: "Twijfelgeval",
    value5: "Iets voor mij",
  },

  // reaction:describe-creation-motivation
  "reaction:describe-creation-motivation": {
    title: "Wat valt je op in deze foto?",
    option1: "Architectuur",
    option2: "Stedelijke omgeving",
    option3: "Objecten",
    option4: "Tekens en symbolen",
    option5: "Stadsnatuur",
    option6: "Wind en weer",
    option7: "Cultuur",
    option8: "Consumptie",
    option9: "Mensen/gemeenschap",
    option10: "Infrastructuur",
    option11: "Herinneringen en associaties",
    option12: "Sfeer",
    option13: "Weet niet",
  },
};
