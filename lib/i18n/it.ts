import { MasterTranslationKey } from "./en";

export const itTranslations: Record<MasterTranslationKey, any> = {
  // Capture prompt
  "capture-prompt": {
    "general:thing-place-situation":
      "Fai una foto ad una cosa, un luogo o una situazione nella tua cittá che vuoi condividere",
  },

  // Used for annotations/reactions
  "add-custom-tag-button-label": "Altro",

  /* Annotations */

  // annotation:annotation-creation-motivation
  "annotation:describe-creation-motivation": {
    title: "Che cosa ti ha spinto a fare questa foto?",
    option1: "Architettura",
    option2: "Ambiente Urbano",
    option3: "Oggetti",
    option4: "Segni e/o Simboli",
    option5: "Paesaggio",
    option6: "Condizioni Meteo",
    option7: "Patrimonio storico e culturale",
    option8: "Consumo",
    option9: "Persone/Comunitá",
    option10: "Infrastruttura",
    option11: "Ricordi e/o associazioni",
    option12: "Atmosfera",
  },

  // annotation:describe-attachment
  "annotation:describe-attachment": {
    title: "Ti piace ció che vedi?",
    value1: "Mi piace",
    value3: "Non saprei",
    value5: "Non mi piace",
  },

  /* Reactions */

  // reaction:describe-attachment
  "reaction:describe-attachment": {
    title: "Ti piace ció che vedi?",
    value1: "Mi piace",
    value3: "Non saprei",
    value5: "Non mi piace",
  },

  // reaction:describe-creation-motivation
  "reaction:describe-creation-motivation": {
    title: "Che cosa noti in questa foto?",
    option1: "Architettura",
    option2: "Ambiente Urbano",
    option3: "Oggetti",
    option4: "Segni e/o Simboli",
    option5: "Paesaggio",
    option6: "Condizioni Meteo",
    option7: "Patrimonio storico e culturale",
    option8: "Consumo",
    option9: "Persone/Comunità",
    option10: "Infrastruttura",
    option11: "Ricordi e/o Associazioni",
    option12: "Atmosfera",
    option13: "Non so",
  },

  screens: {
    AddCustomAnnotationTagModel: {
      modalTitle: "Aggiungi un nuovo tag",
      textInputPlaceholder: "Scrivi il tuo nuovo tag",
      submitButtonText: "Aggiungi",
    },
    Auth: {
      welcomeLabel: "Benvenuto su Urban Belonging",
      activationCodeFlowButtonText: "Ho un codice",
      loginFlowButtonText: "Accedi al mio profilo",
      createAccountFlowButtonText: "Crea un profilo",
    },
    AuthCreateAccount: {
      invalidEmailErrorTitle: "Email non valida",
      invalidEmailErrorMessage:
        "Si prega di inserire un indirizzo email valido",
      emailAlreadyInUseErrorTitle: "Email giá in uso",
      emailAlreadyInUseErrorMessage: "Questo indirizzo email é giá stato usato",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      titleText: "Crea un profilo",
      subtitleText: "Ti invieremo un codice di attivazione via email",
      submitButtonText: "Crea un profilo",
      emailInputPlaceholder: "La tua mail",
    },
    AuthLogin: {
      invalidCredentialsErrorTitle: "Nome utente o password non validi",
      invalidCredentialsErrorMessage:
        "Ti preghiamo di verificare il tuo nome utente e password.",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      titleText: "Accedi al tuo profilo",
      usernameInputPlaceholder: "Nome utente",
      passwordInputPlaceholder: "Password",
      submitButtonText: "Accedi",
      forgotPasswordLabel: "Password dimenticata?",
    },
    AuthRecoverPassword: {
      invalidEmailOrUsernameErrorTitle:
        "Indirizzo email o nome utente non validi",
      invalidEmailOrUsernameErrorMessage:
        "Si prega di inserire un nome utente e una email validi",
      titleText: "Recupero password",
      subtitleText:
        "Ti invieremo una email con un codice che potrai usare per resettare la tua password.",
      emailOrUsernameInputPlaceholder: "Indirizzo email o nome utente",
      submitButtonText: "Invia",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
    },
    AuthResetPassword: {
      titleText: "Scegli una nuova password",
      subtitleText:
        "Ti invieremo una email con un codice che potrai usare per resettare la tua password.",
      passwordInputPlaceholder: "Password",
      confirmPasswordInputPlaceholder: "Conferma password",
      submitButtonText: "Inserisci la nuova password",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      invalidPasswordErrorTitle: "Password non valida",
      invalidPasswordErrorMessage:
        "La Password deve contenere un numero di caratteri compreso tra 8 e 24.",
      passwordsDoNotMatchErrorTitle: "Le password non corrispondono",
      passwordsDoNotMatchErrorMessage:
        "Si prega di controllare che le password corrispondano.",
    },
    AuthSetupPassword: {
      titleText: "Ciao %{username}",
      subtitleText:
        "Si prega di scegliere una password. Userai questa password insieme al tuo nome utente per accedere al tuo profilo.",
      passwordInputPlaceholder: "Password",
      confirmPasswordInputPlaceholder: "Conferma password",
      submitButtonText: "Avanti",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      usernameInUseErrorTitle: "Il nome utente é giá in uso",
      usernameInUseErrorMessage:
        "Questo nome utente é giá in uso. Si prega di tornare indietro e sceglierne un altro.",
      invalidPasswordErrorTitle: "Password non valida",
      invalidPasswordErrorMessage:
        "La Password deve contenere un numero di caratteri compreso tra 8 e 24.",
      passwordsDoNotMatchErrorTitle: "Le password non corrispondono",
      passwordsDoNotMatchErrorMessage:
        "Si prega di controllare che le password corrispondano.",
    },
    AuthSetupUsername: {
      titleText: "Scegli un nome utente",
      subtitleText:
        "Il tuo nome utente sará visibile solo agli amministratori del gruppo in cui parteciperai.",
      usernameInputPlaceholder: "Nome utente",
      submitButtonText: "Avanti",
      invalidUsernameErrorTitle: "Nome utente non valido",
      invalidUsernameErrorMessage: "Si prega di inserire un nome utente valido",
    },
    AuthVerifyActivationCode: {
      expiredOrInvalidActivationCodeErrorTitle: "Codice non valido",
      expiredOrInvalidActivationCodeErrorMessage:
        "Questo codice di attivazione é invalido o é scaduto.",
      invalidActivationCodeErrorTitle: "Codice non valido",
      invalidActivationCodeErrorMessage:
        "Si prega di inserire un codice valido",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      titleText: "Incolla il tuo codice",
      subtitleText: "Ti abbiamo inviato un codice di attivazione via email.",
      activationCodeInputPlaceholer: "Inserisci codice",
      submitButtonText: "Avanti",
    },
    Camera: {
      locationPermissionsErrorTitle: "Permessi di localizzazione",
      locationPermissionsErrorMessage:
        'Urban Belonging ha bisogno del tuo permesso per localizzare le tue foto. Clicca sul pulsante in basso per aprire le impostazioni sulle app e imposta i permessi di localizzazione su "Sempre", poi apri di nuovo la fotocamera.',
      locationPermissionsErrorDismissButtonText: "Continua",
      locationPermissionsErrorOpenSettingsButtonText: "Apri le impostazioni",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      uploadErrorTitle: "Errore nel caricamento",
      uploadErrorMessage:
        "Qualcosa é andato storto nel caricare la tua foto. Si prega di provare di nuovo.",
      cameraPermissionsErrorTitle: "Autorizzazioni per la fotocamera",
      cameraPermissionsErrorMessage:
        "É richiesta la tua autorizzazione per utilizzare la fotocamera.",
      nextButtonText: "Avanti",
      failedFetchLocationMessage:
        "Errore, impossibile ottenere la tua posizione",
    },
    Feed: {
      fetchPhotoEventsErrorTitle: "Errore",
      fetchPhotoEventsErrorMessage: "Si é verificato un errore",
    },
    FeedActivePhotoEvent: {
      titleText: "Ciao!",
      subtitleText:
        "Stai facendo una Passeggiata, or vuoi semplicemente fare una foto?",
      startWalkButtonText: "Faccio una Passeggiata",
      takePhotoButtonText: "Voglio fare una foto",
    },
    FeedPhotoDetail: {
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      annotationTitle: "Le tue note",
      reactionTitle: "La tua reazione",
    },
    FeedPhotoEventDetail: {
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
    },
    FeedPhotoEventSliderReaction: {
      fetchPhotosErrorTitle: "Errore",
      fetchPhotosErrorMessage: "Si é verificato un errore",
      reactionSubmitErrorTitle: "Errore",
      reactionSubmitErrorMessage: "Si é verificato un errore",
      reactionFormSubmitButtonText: "Prossima foto",
      emptyTitle: "Hai finito!",
      emptyLabelWithRemainingPhotos:
        "Hai ancora %{remainingCount} foto con cui interagire. Inizia un nuovo round qui sotto",
      emptyLabelWithNoRemainingPhotos:
        "Non ci sono piú foto con cui interagire.",
      newRoundButtonText: "Inizia un nuovo round",
      goBackButtonText: "Torna indietro",
    },
    FeedPhotoEventWalks: {
      headerTitle: "Le tue Passeggiate",
      fetchWalksErrorTitle: "Errore",
      fetchWalksErrorMessage: "Si é verificato un errore",
    },
    LocationTracker: {
      permissionsDeniedErrorTitle: "Permessi di localizzazione",
      permissionsDeniedErrorMessage:
        'Urban Belonging ha bisogno del tuo permesso per accedere alla tua posizione. Clicca sul pulsante in basso per aprire le impostazioni sulle app e imposta i permessi di localizzazione su "Sempre".',
      locationPermissionsErrorDismissButtonText: "Continua",
      locationPermissionsErrorOpenSettingsButtonText: "Apri le impostazioni",
      isStillTrackingPreventExitAlertTitle: "Smetti di tracciare la positione",
      isStillTrackingPreventExitAlertMessage:
        "Devi disattivare il tracciamento della posizione prima di uscire.",
      isSubmittingPreventExitAlertTitle:
        "Sei sicuro di voler cancellare la tua Passeggiata?",
      isSubmittingPreventExitAlertMessage:
        "Uscendo da questa schermata cancellerai la tua Passeggiata, sei sicuro di volerlo fare?",
      isSubmittingPreventExitAlertDeleteButtonText:
        "Cancella la mia Passeggiata",
      isSubmittingPreventExitAlertDismissButtonText: "Continua",
      locationTrackingStartedAlertTitle: "Tracciamento iniziato",
      locationTrackingStartedAlertMessage:
        "Ora la tua posizione verrá tracciata. Se vuoi fare una foto, premi il pulsante della fotocamera in basso. Quando sei pronto ad inviare la tua Passeggiata, premi il pulsante Stop.",
      stopWalkAlertTitle: "Termina la Passeggiata",
      stopWalkAlertMessage: "Sei sicuro di voler terminare la tua Passeggiata?",
      stopWalkAlertDismissButtonText: "Continua a passeggiare",
      stopWalkAlertSubmitWalkButtonText: "Invia la mia Passeggiata",
      stopWalkAlertDeleteWalkButtonText: "Cancella la mia Passeggiata",
      deleteWalkConfirmAlertTitle: "Cancella la tua Passeggiata?",
      deleteWalkConfirmAlertMessage:
        "Sei sicuro di voler cancellare la tua Passeggiata?",
      deleteWalkConfirmDeleteButtonText: "Cancella la mia Passeggiata",
      deleteWalkConfirmDismissButtonText: "Continua",
      submitWalkErrorTitle: "Errore",
      submitWalkErrorMessage: "Si é verificato un errore",
      locationTrackingPermissionDeclarationToastText:
        "Urban Belonging colleziona dati di posizione per tracciare la tua passeggiata anche quando l'App é spenta o non in uso.",
      startTrackingErrorTitle: "Errore",
      startTrackingErrorMessage:
        "Si é verificato un errore nell'iniziare il tracciamento",
      noLocationDataErrorTitle: "Nessuna geolocalizzazione",
      noLocationDataErrorMessage:
        "Non abbiamo ricevuto alcun dato sulla tua posizione dal tuo dispositivo. Si prega di provare di nuovo.",
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
      startTrackingButtonText: "Inizia ora",
    },
    PhotoEventWalkPreview: {
      unknownErrorTitle: "Errore",
      unknownErrorMessage: "Si é verificato un errore",
    },
    Profile: {
      title: "Profilo",
      subtitle: "@{username}",
      descriptionTitle: "Che cosa é l'Urban Belonging app?",
      descriptionMessage:
        "L' Urban Belonging app é disegnata per studiare il legame delle persone ai luoghi della cittá. È disegnata con l'intenzione di vedere la cittá attraverso gli occhi di chi la vive e rivelare somiglianze e differenze nel modo in cui le persone percepiscono e danno senso agli spazi urbani come luoghi di appartenenza. Nell'usare l'app, fornisci immagini, tags e dati di posizione al nostro progetto di ricerca. Ti ringraziamo di essere parte del progetto e ti incoraggiamo ad inviarci una email per qualunque domanda sull'uso dei tuoi dati. ",
      viewDataPolicyButtonText: "Vedi Data Policy",
    },
    Settings: {
      logoutConfirmAlertTitle: "Esci",
      logoutConfirmAlertMessage: "Sei sicuro di voler uscire?",
      logoutConfirmAlertLogoutButton: "Esci",
      logoutConfirmAlertDismissButton: "Indietro",
      headerTitle: "Impostazioni",
      logoutListItemTitle: "Esci",
    },
  },
  components: {
    Header: {
      settingsPageTitle: "Impostazioni",
      yourWalksPageTitle: "Le tue Passeggiate",
    },
    PhotoAnnotationInput: {
      addCustomTagButtonText: "Aggiungi altro",
    },
    PhotoAnnotationPreview: {
      goBackButtonText: "Torna indietro",
    },
    PhotoEventWalkList: {
      emptyTitle: "Non ci sono Passeggiate in questo task",
    },
    PhotoEventWalkListItem: {
      dateTitle: "Data:",
      durationTitle: "Durata:",
      distanceTitle: "Distanza:",
      emptyTitle: "Non ci sono foto in questa Passeggiata",
    },
    PhotoEventWalkSubmitModal: {
      invalidNameErrorTitle: "Nome non valido",
      invalidNameErrorMessage: "Si prega di dare un nome alla Passeggiata",
      walkNameInputTitle: "Il nome della tua Passeggiata:",
      walkNameInputPlaceholder: "Il nome della tua Passeggiata",
      summaryTitle: "Riassunto",
      durationLabel: "Durata:",
      distanceLabel: "Distanza:",
      yourPhotosTitle: "Le tue foto (%{numberOfPhotos})",
      submitButtonText: "Invia Passeggiata",
    },
    PhotoList: {
      startTaskButtonText: "Inizia un evento",
      startReactionRoundButtonText: "Inizia un round di reazioni",
      emptyTitle: "Non ci sono foto in questo evento.",
      contributionPeriodSubtitle: "Fai la prima foto!",
    },
    PhotoListItem: {
      newPhotoLabel: "nuovo",
    },
    PhotoThumbnailList: {
      emptyTitle: "Non ci sono ancora foto",
    },
    SuggestedPhotoEventList: {
      headerTitle: "Foto eventi",
      emptyTitle: "Benvenuto su Urban Belonging!",
      emptySubtitle: "Non ci sono eventi attivi.",
      emptyText: "Sarai invitato presto a un evento!",
    },
    SuggestedPhotoEventListItem: {
      eventEndedHoursAgoText: "%{hours} ore fa",
      eventEndedDaysAgoText: "%{days} giorni fa",
      eventEndsInHoursText: "%{hours} ore rimaste",
      eventEndsInDaysText: "%{days} giorni rimasti",
      contributionPeriodActiveLabel: "Attivo",
      reactionPeriodActiveLabel: "Reagisci ora",
      hasNotStartedLabel: "In arrivo",
      hasFinishedLabel: "Scaduto",
      emptyLabel: "Non ci sono ancora foto",
    },
  },
};
