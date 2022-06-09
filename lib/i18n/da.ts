import { MasterTranslationKey } from "./en";

export const daTranslations: Record<MasterTranslationKey, any> = {
  // Capture prompt
  "capture-prompt": {
    "general:thing-place-situation":
      "Tag et billede af en ting, et sted eller en situation i København som du gerne vil dele",
  },

  // Used for annotations/reactions
  "add-custom-tag-button-label": "Andet",

  /* Annotations */

  // annotation:describe-creation-motivation
  // title
  "annotation:describe-creation-motivation": {
    title: "Hvad fik dig til at tage billedet?",
    option1: "Arkitektur",
    option2: "Urbant miljø",
    option3: "Objekter",
    option4: "Tegn & symboler",
    option5: "Bynatur",
    option6: "Vind og vejr",
    option7: "Kultur",
    option8: "Forbrug",
    option9: "Mennesker/fællesskaber",
    option10: "Infarstruktur",
    option11: "Minder & associationer",
    option12: "Stemning",
  },

  // annotation:describe-attachment
  "annotation:describe-attachment": {
    title: "I hvilken grad føler du dette er for dig?",
    value1: "Ikke for mig",
    value3: "Ambivalent",
    value5: "For mig",
  },

  /* Reactions */

  // reaction:describe-attachment
  "reaction:describe-attachment": {
    title: "I hvilken grad føler du dette er for dig?",
    value1: "Ikke for mig",
    value3: "Ambivalent",
    value5: "For mig",
  },

  // reaction:describe-creation-motivation
  "reaction:describe-creation-motivation": {
    title: "Hvad fik dig til at tage billedet?",
    option1: "Arkitektur",
    option2: "Urbant miljø",
    option3: "Objekter",
    option4: "Tegn & symboler",
    option5: "Bynatur",
    option6: "Vind og vejr",
    option7: "Kultur",
    option8: "Forbrug",
    option9: "Mennesker/fællesskaber",
    option10: "Infarstruktur",
    option11: "Minder & associationer",
    option12: "Stemning",
    option13: "Ved ikke",
  },

  screens: {
    AddCustomAnnotationTagModel: {
      modalTitle: "Tilføj nyt tag",
      textInputPlaceholder: "Skriv dit nye tag",
      submitButtonText: "Tilføj",
    },
    Auth: {
      welcomeLabel: "Velkommen til Urban Belonging",
      activationCodeFlowButtonText: "Jeg har en kode",
      loginFlowButtonText: "Login på min konto",
      createAccountFlowButtonText: "Opret en ny konto",
    },
    AuthCreateAccount: {
      invalidEmailErrorTitle: "Ugyldig email",
      invalidEmailErrorMessage: "Angiv en gyldig email",
      emailAlreadyInUseErrorTitle: "Email allerede i brug",
      emailAlreadyInUseErrorMessage: "Denne email er allerede i brug",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      titleText: "Opret en konto",
      subtitleText: "Vi sender dig en aktiveringskode via email",
      submitButtonText: "Opret en konto",
      emailInputPlaceholder: "Din email",
    },
    AuthLogin: {
      invalidCredentialsErrorTitle: "Ugyldigt brugernavn eller adgangskode",
      invalidCredentialsErrorMessage:
        "Tjek venligst dit brugernavn og din adgangskode",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      titleText: "Login på din konto",
      usernameInputPlaceholder: "Brugernavn",
      passwordInputPlaceholder: "Adgangskode",
      submitButtonText: "Login",
      forgotPasswordLabel: "Glemt din adgangskode?",
    },
    AuthRecoverPassword: {
      invalidEmailOrUsernameErrorTitle: "Ugyldig email eller brugernavn",
      invalidEmailOrUsernameErrorMessage:
        "Indtast venligst en gyldig email eller brugernavn",
      titleText: "Gendan adgangskode",
      subtitleText:
        "Vi sender dig en email med en kode, du kan bruge til at nulstille din adgangskode.",
      emailOrUsernameInputPlaceholder: "Email eller brugernavn",
      submitButtonText: "Indsend",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
    },
    AuthResetPassword: {
      titleText: "Vælg en ny adgangskode",
      subtitleText:
        "Vi sender dig en email med en kode, du kan bruge til at nulstille din adgangskode.",
      passwordInputPlaceholder: "Adgangskode",
      confirmPasswordInputPlaceholder: "Bekræft adgangskode",
      submitButtonText: "Indstil ny adgangskode",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      invalidPasswordErrorTitle: "Ugyldig adgangskode",
      invalidPasswordErrorMessage:
        "Angiv en adgangskode på mellem 8 og 24 tegn",
      passwordsDoNotMatchErrorTitle: "Adgangskoder er ikke ens",
      passwordsDoNotMatchErrorMessage:
        "Kontroller venligst, om dine adgangskoder er ens",
    },
    AuthSetupPassword: {
      titleText: "Hej %{username},",
      subtitleText:
        "Vælg en adgangskode. Du bruger denne adgangskode til at få adgang til din konto sammen med dit brugernavn.",
      passwordInputPlaceholder: "Adgangskode",
      confirmPasswordInputPlaceholder: "Bekræft adgangskode",
      submitButtonText: "Næste",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      usernameInUseErrorTitle: "Brugernavn allerede i brug",
      usernameInUseErrorMessage:
        "Dette brugernavn er allerede i brug. Gå tilbage og vælg et andet",
      invalidPasswordErrorTitle: "Ugyldigt kodeord",
      invalidPasswordErrorMessage:
        "Angiv en adgangskode på mellem 8 og 24 tegn",
      passwordsDoNotMatchErrorTitle: "Adgangskoder er ikke ens",
      passwordsDoNotMatchErrorMessage:
        "Kontroller venligst, om dine adgangskoder er ens",
    },
    AuthSetupUsername: {
      titleText: "Vælg et brugernavn",
      subtitleText:
        "Dit brugernavn vil kun være synligt for administratorer af de grupper, du deltager i",
      usernameInputPlaceholder: "Brugernavn",
      submitButtonText: "Næste",
      invalidUsernameErrorTitle: "Ugyldigt brugernavn",
      invalidUsernameErrorMessage: "Indtast venligst et gyldigt brugernavn",
    },
    AuthVerifyActivationCode: {
      exiredOrInvalidActivationCodeErrorTitle: "Ugyldig kode",
      expiredOrInvalidActivationCodeErrorMessage:
        "Denne aktiveringskode er ugyldig eller udløbet",
      invalidActivationCodeErrorTitle: "Ugyldig kode",
      invalidActivationCodeErrorMessage: "Indsæt venligst en gyldig kode",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      titleText: "Indsæt din kode",
      subtitleText: "Vi har sendt en aktiveringskode til din email",
      activationCodeInputPlaceholer: "Indtast kode",
      submitButtonText: "Næste",
    },
    Camera: {
      locationPermissionsErrorTitle: "Lokalitetstjenester",
      locationPermissionsErrorMessage:
        "Urban Belonging har brug for tilladelse til at tilføje lokation til dit foto. Tryk på knappen nedenfor, åben dine app settings og vælg 'tillad altid' . Åben derefter dit kamera igen",
      locationPermissionsErrorDismissButtonText: "Fortsæt",
      locationPermissionsErrorOpenSettingsButtonText: "Åben indstillinger",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      uploadErrorTitle: "Uploadfejl",
      uploadErrorMessage:
        "Noget gik galt, da du uploaded dit billede. Prøv venligst igen.",
      cameraPermissionsErrorTitle: "Kamera tilladelser",
      cameraPermissionsErrorMessage:
        "Dine tilladelser er nødvendige for at bruge dit kamera.",
      nextButtonText: "Næste",
    },
    Feed: {
      fetchPhotoEventsErrorTitle: "Fejl",
      fetchPhotoEventsErrorMessage: "En fejl opstod",
    },
    FeedActivePhotoEvent: {
      titleText: "Hej!",
      subtitleText:
        "Skal du på en 'belonging' gåtur, eller vil du bare tage et billede?",
      startWalkButtonText: "Jeg vil gå en tur",
      takePhotoButtonText: "Jeg vil tage et billede",
    },
    FeedPhotoDetail: {
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      annotationTitle: "Din annotering",
      reactionTitle: "Din reaktion",
    },
    FeedPhotoEventDetail: {
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
    },
    FeedPhotoEventSliderReaction: {
      fetchPhotosErrorTitle: "Fejl",
      fetchPhotosErrorMessage: "En fejl opstod",
      reactionSubmitErrorTitle: "Fejl",
      reactionSubmitErrorMessage: "En fejl opstod",
      reactionFormSubmitButtonText: "Næste billede",
      emptyTitle: "Du er færdig!",
      emptyLabelWithRemainingPhotos:
        "Du har %{remainingCount} flere billeder at reagere på. Start ny runde nedenfor",
      emptyLabelWithNoRemainingPhotos:
        "Der er ikke flere billeder at reagere på",
      newRoundButtonText: "Start ny runde",
      goBackButtonText: "Gå tilbage",
    },
    FeedPhotoEventWalks: {
      headerTitle: "Dine gåture",
      fetchWalksErrorTitle: "Fejl",
      fetchWalksErrorMessage: "En fejl opstod",
    },
    LocationTracker: {
      permissionsDeniedErrorTitle: "",
      permissionsDeniedErrorMessage: "",
      locationPermissionsErrorDismissButtonText: "Fortsæt",
      locationPermissionsErrorOpenSettingsButtonText: "Åben indstillinger",
      isStillTrackingPreventExitAlertTitle: "Stop sporing af lokalitet",
      isStillTrackingPreventExitAlertMessage:
        "Du skal stoppe sporing af lokalitet inden du afslutter",
      isSubmittingPreventExitAlertTitle:
        "Er du sikker på at du vil slette din gåtur?",
      isSubmittingPreventExitAlertMessage:
        "Ved at forlade denne skærm sletter du din gang. Er du sikker på, at du vil gøre dette?",
      isSubmittingPreventExitAlertDeleteButtonText: "Slet min gåtur",
      isSubmittingPreventExitAlertDismissButtonText: "Fortsæt",
      locationTrackingStartedAlertTitle: "Sporing af lokalitet er startet",
      locationTrackingStartedAlertMessage:
        "Din placering bliver nu sporet. Hvis du vil tage et billede, skal du bruge kameraknappen nedenfor. Når du er klar til at indsende din gåtur, skal du trykke på stopknappen til venstre.",
      stopWalkAlertTitle: "Stop gåtur",
      stopWalkAlertMessage: "Er du sikker på du vil stoppe din gåtur?",
      stopWalkAlertDismissButtonText: "Bliv ved med at gå",
      stopWalkAlertSubmitWalkButtonText: "Insend min gåtur",
      stopWalkAlertDeleteWalkButtonText: "Slet min gåtur",
      deleteWalkConfirmAlertTitle: "Slet din gåtur?",
      deleteWalkConfirmAlertMessage:
        "Er du sikker på at du vil slette din gåtur?",
      deleteWalkConfirmDeleteButtonText: "Slet min gåtur",
      deleteWalkConfirmDismissButtonText: "Fortsæt",
      submitWalkErrorTitle: "Fejl",
      submitWalkErrorMessage: "En fejl opstod",
      locationTrackingPermissionDeclarationToastText:
        "Urban Belonging samler lokations data for note tine ture. Dette data samles også når appen er slukket eller ikke bruges.",
      startTrackingErrorTitle: "Fejl",
      startTrackingErrorMessage: "En fejl opstod i lokations tracking",
      noLocationDataErrorTitle: "Ingen lokationsdata",
      noLocationDataErrorMessage:
        "Vi kunne ikke få lokationsdata fra din mobil. Prøv igen.",
      unknownErrorTitle: "Fejl",
      unknownErrorMessage: "En fejl opstod",
      startTrackingButtonText: "Start nu",
    },
    PhotoEventWalkPreview: {
      unknownErrorTitle: "En fejl opstod",
      unknownErrorMessage: "En fejl opstod",
    },
    Profile: {
      title: "Profil",
      subtitle: "@%{username}",
      descriptionTitle: "Hvad er Urban Belonging appen?",
      descriptionMessage:
        "Urban Belonging appen er designet til at studere folks tilknytning til byer. Den er bevidst designet til at se byen gennem brugernes øjne samt se mønstre i hvordan forskellige brugere giver mening til byen på forskellig vis. Når du bruger appen bidarger du med billeder, tags og lokationsdata til vores forksningsprojekt. Vi takker dig for at deltage i projektet og opfordrere dig til at kontakte projektlederen hvis du har spørgsmål om hvad vi bruger dine data til.",
      viewDataPolicyButtonText: "Se vores data politik",
    },
    Settings: {
      logoutConfirmAlertTitle: "Log ud",
      logoutConfirmAlertMessage: "Er du sikker på at du vil logge ud?",
      logoutConfirmAlertLogoutButton: "Log ud",
      logoutConfirmAlertDismissButton: "Cancel",
      headerTitle: "Indstillinger",
      logoutListItemTitle: "Log ud",
    },
  },

  components: {
    Header: {
      settingsPageTitle: "Indstillinger",
      yourWalksPageTitle: "Dine gåture",
    },
    PhotoAnnotationInput: {
      addCustomTagButtonText: "Tilføj andet",
    },
    PhotoAnnotationPreview: {
      goBackButtonText: "Gå tilbage",
    },
    PhotoEventWalkList: {
      emptyTitle: "Der er ingen gåture i denne opgave",
    },
    PhotoEventWalkListItem: {
      emptyTitle: "Der er ingen billeder i denne gåtur",
      dateTitle: "Dato:",
      durationTitle: "Tid:",
      distanceTitle: "Distance:",
    },
    PhotoEventWalkSubmitModal: {
      invalidNameErrorTitle: "Ugyldigt navn",
      invalidNameErrorMessage: "Giv venligst dit gåtur et navn",
      walkNameInputTitle: "Din gåturs navn:",
      walkNameInputPlaceholder: "Navnet på din gåtur",
      summaryTitle: "Din oversigt",
      durationLabel: "Tid:",
      distanceLabel: "Distance:",
      yourPhotosTitle: "Dine billeder (%{numberOfPhotos})",
      submitButtonText: "Indsend gåtur",
    },
    PhotoList: {
      startTaskButtonText: "Start opgave",
      startReactionRoundButtonText: "Start reaktionsrunde",
      emptyTitle: "Der er ingen billeder i denne opgave.",
      contributionPeriodSubtitle: "Vær den, der tilføjer det første billede!",
    },
    PhotoListItem: {
      newPhotoLabel: "ny",
    },
    PhotoThumbnailList: {
      emptyTitle: "Endnu ingen billeder",
    },
    SuggestedPhotoEventList: {
      headerTitle: "Foto opgave",
      emptyTitle: "Velkommen til Urban Belonging!",
      emptySubtitle: "Der er ingen aktive opgaver",
      emptyText: "Du bliver snart inviteret!",
    },
    SuggestedPhotoEventListItem: {
      eventEndedHoursAgoText: "%{hours} timer siden",
      eventEndedDaysAgoText: "%{days} dage siden",
      eventEndsInHoursText: "%{hours} timer tilbage",
      eventEndsInDaysText: "%{days} dage tilbage",
      contributionPeriodActiveLabel: "Aktiv",
      reactionPeriodActiveLabel: "Reager nu",
      hasNotStartedLabel: "Kommende",
      hasFinishedLabel: "Udløbet",
      emptyLabel: "Endnu ingen billeder",
    },
  },
};
