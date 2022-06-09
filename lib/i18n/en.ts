export const enTranslations = {
  // Capture prompt
  "capture-prompt": {
    "general:thing-place-situation":
      "Take a picture of a thing/place/situation in your city that you want to share",
  },

  // Used for annotations/reactions
  "add-custom-tag-button-label": "Other",

  /* Annotations */

  // annotation:annotation-creation-motivation
  "annotation:describe-creation-motivation": {
    title: "What made you take this picture?",
    option1: "Architecture",
    option2: "Urban Environment",
    option3: "Objects",
    option4: "Signs & symbols",
    option5: "Urban Nature",
    option6: "Wind & Weather",
    option7: "Culture",
    option8: "Consumption",
    option9: "People /community",
    option10: "Infrastucture",
    option11: "Memories & associations",
    option12: "Atmosphere",
  },

  // annotation:describe-attachment
  "annotation:describe-attachment": {
    title: "Do you feel this is for you?",
    value1: "Not for me",
    value3: "Ambiguous",
    value5: "For me",
  },

  /* Reactions */

  // reaction:describe-attachment
  "reaction:describe-attachment": {
    title: "Do you feel this is for you?",
    value1: "Not for me",
    value3: "Ambiguous",
    value5: "For me",
  },

  // reaction:describe-creation-motivation
  "reaction:describe-creation-motivation": {
    title: "What do you notice in this picture?",
    option1: "Architecture",
    option2: "Urban Environment",
    option3: "Objects",
    option4: "Signs & symbols",
    option5: "Urban Nature",
    option6: "Wind & Weather",
    option7: "Culture",
    option8: "Consumption",
    option9: "People /community",
    option10: "Infrastucture",
    option11: "Memories & associations",
    option12: "Atmosphere",
    option13: "Don't Know",
  },

  screens: {
    AddCustomAnnotationTagModel: {
      modalTitle: "Add a new tag",
      textInputPlaceholder: "Type your new tag",
      submitButtonText: "Add",
    },
    Auth: {
      welcomeLabel: "Welcome to Urban Belonging",
      activationCodeFlowButtonText: "I have a code",
      loginFlowButtonText: "Login to my account",
      createAccountFlowButtonText: "Create an account",
    },
    AuthCreateAccount: {
      invalidEmailErrorTitle: "Invalid Email",
      invalidEmailErrorMessage: "Please enter a valid email",
      emailAlreadyInUseErrorTitle: "Email Already in Use",
      emailAlreadyInUseErrorMessage: "This email is already being used",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      titleText: "Create an account",
      subtitleText: "We'll send you an activation code by email.",
      submitButtonText: "Create an account",
      emailInputPlaceholder: "Your email",
    },
    AuthLogin: {
      invalidCredentialsErrorTitle: "Invalid Username or Password",
      invalidCredentialsErrorMessage:
        "Please double check your username and password.",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      titleText: "Login to your account",
      usernameInputPlaceholder: "Username",
      passwordInputPlaceholder: "Password",
      submitButtonText: "Login",
      forgotPasswordLabel: "Forgot your password?",
    },
    AuthRecoverPassword: {
      invalidEmailOrUsernameErrorTitle: "Invalid Email or Username",
      invalidEmailOrUsernameErrorMessage:
        "Please enter a valid email or username",
      titleText: "Password recovery",
      subtitleText:
        "We'll send you an email with a code you can use to reset your password.",
      emailOrUsernameInputPlaceholder: "Email or username",
      submitButtonText: "Submit",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
    },
    AuthResetPassword: {
      titleText: "Choose a new password",
      subtitleText:
        "We'll send you an email with a code you can use to reset your password.",
      passwordInputPlaceholder: "Password",
      confirmPasswordInputPlaceholder: "Confirm password",
      submitButtonText: "Set new password",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      invalidPasswordErrorTitle: "Invalid Password",
      invalidPasswordErrorMessage:
        "Please enter a password between 8 and 24 characters in length.",
      passwordsDoNotMatchErrorTitle: "Passwords Don't Match",
      passwordsDoNotMatchErrorMessage:
        "Please double check your passwords match.",
    },
    AuthSetupPassword: {
      titleText: "Hi %{username}",
      subtitleText:
        "Please choose a password. You'll use this password to access your account together with your username.",
      passwordInputPlaceholder: "Password",
      confirmPasswordInputPlaceholder: "Confirm password",
      submitButtonText: "Next",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      usernameInUseErrorTitle: "Username Already in Use",
      usernameInUseErrorMessage:
        "This username is already being used. You can go back and choose another one.",
      invalidPasswordErrorTitle: "Invalid Password",
      invalidPasswordErrorMessage:
        "Please enter a password between 8 and 24 characters in length.",
      passwordsDoNotMatchErrorTitle: "Passwords Don't Match",
      passwordsDoNotMatchErrorMessage:
        "Please double check your passwords match.",
    },
    AuthSetupUsername: {
      titleText: "Choose a username",
      subtitleText:
        "Your username will only be visible to admins of the groups in which you participate.",
      usernameInputPlaceholder: "Username",
      submitButtonText: "Next",
      invalidUsernameErrorTitle: "Invalid Username",
      invalidUsernameErrorMessage: "Please enter a valid username",
    },
    AuthVerifyActivationCode: {
      expiredOrInvalidActivationCodeErrorTitle: "Invalid Code",
      expiredOrInvalidActivationCodeErrorMessage:
        "This activation code is invalid or has expired.",
      invalidActivationCodeErrorTitle: "Invalid Code",
      invalidActivationCodeErrorMessage: "Please enter a valid code",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      titleText: "Paste your code",
      subtitleText: "We sent you an activation code by email.",
      activationCodeInputPlaceholer: "Enter code",
      submitButtonText: "Next",
    },
    Camera: {
      locationPermissionsErrorTitle: "Location Permissions",
      locationPermissionsErrorMessage:
        'Urban Belonging needs your permission to tag your photos with a location. Press the button below to open your app settings and enable location permissions for "All The Time", then open the camera again.',
      locationPermissionsErrorDismissButtonText: "Continue",
      locationPermissionsErrorOpenSettingsButtonText: "Open Settings",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      uploadErrorTitle: "Upload Error",
      uploadErrorMessage:
        "Something went wrong when uploading your photo. Please try again.",
      cameraPermissionsErrorTitle: "Camera Permissions",
      cameraPermissionsErrorMessage:
        "Your permissions are needed to use your camera.",
      nextButtonText: "Next",
      failedFetchLocationMessage: "Error, unable to get your location",
    },
    Feed: {
      fetchPhotoEventsErrorTitle: "Error",
      fetchPhotoEventsErrorMessage: "An error occurred",
    },
    FeedActivePhotoEvent: {
      titleText: "Hey there!",
      subtitleText:
        "Are you going for a belonging walk, or do you just want to take a picture?",
      startWalkButtonText: "I am going for a walk",
      takePhotoButtonText: "I want to take a picture",
    },
    FeedPhotoDetail: {
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      annotationTitle: "Your annotation",
      reactionTitle: "Your reaction",
    },
    FeedPhotoEventDetail: {
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
    },
    FeedPhotoEventSliderReaction: {
      fetchPhotosErrorTitle: "Error",
      fetchPhotosErrorMessage: "An error occurred",
      reactionSubmitErrorTitle: "Error",
      reactionSubmitErrorMessage: "An error occurred",
      reactionFormSubmitButtonText: "Next photo",
      emptyTitle: "You're done!",
      emptyLabelWithRemainingPhotos:
        "You have %{remainingCount} more photos to react to. Start a new round below",
      emptyLabelWithNoRemainingPhotos: "There's no more pictures to react to.",
      newRoundButtonText: "Start new round",
      goBackButtonText: "Go back",
    },
    FeedPhotoEventWalks: {
      headerTitle: "Your Walks",
      fetchWalksErrorTitle: "Error",
      fetchWalksErrorMessage: "An error occurred",
    },
    LocationTracker: {
      permissionsDeniedErrorTitle: "Location Permissions",
      permissionsDeniedErrorMessage:
        'Urban Belonging needs your permission to track your location. Press the button below to open your app settings and enable location permissions for "All The Time"',
      locationPermissionsErrorDismissButtonText: "Continue",
      locationPermissionsErrorOpenSettingsButtonText: "Open Settings",
      isStillTrackingPreventExitAlertTitle: "Stop Tracking Location",
      isStillTrackingPreventExitAlertMessage:
        "You must stop location tracking before exiting.",
      isSubmittingPreventExitAlertTitle:
        "Are you sure you want to delete your walk?",
      isSubmittingPreventExitAlertMessage:
        "By exiting this screen you will delete your walk. Are you sure you want to do this?",
      isSubmittingPreventExitAlertDeleteButtonText: "Delete my walk",
      isSubmittingPreventExitAlertDismissButtonText: "Continue",
      locationTrackingStartedAlertTitle: "Tracking Started",
      locationTrackingStartedAlertMessage:
        "Your location will now be tracked. If you want to take a picture, press the camera button below. When you are ready to submit your walk, press the stop button.",
      stopWalkAlertTitle: "Stop Walk",
      stopWalkAlertMessage: "Are you sure you want to stop your walk?",
      stopWalkAlertDismissButtonText: "Keep on walking",
      stopWalkAlertSubmitWalkButtonText: "Submit my walk",
      stopWalkAlertDeleteWalkButtonText: "Delete my walk",
      deleteWalkConfirmAlertTitle: "Delete your walk?",
      deleteWalkConfirmAlertMessage:
        "Are you sure you want to delete your walk?",
      deleteWalkConfirmDeleteButtonText: "Delete my walk",
      deleteWalkConfirmDismissButtonText: "Continue",
      submitWalkErrorTitle: "Error",
      submitWalkErrorMessage: "An error occurred",
      locationTrackingPermissionDeclarationToastText:
        "Urban Belonging collects location data to enable tracking your walk around the city even when the app is closed or not in use.",
      startTrackingErrorTitle: "Error",
      startTrackingErrorMessage: "An error occurred starting location tracking",
      noLocationDataErrorTitle: "No location data",
      noLocationDataErrorMessage:
        "We didn't get any location data from your device. Please try again.",
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
      startTrackingButtonText: "Start now",
    },
    PhotoEventWalkPreview: {
      unknownErrorTitle: "Error",
      unknownErrorMessage: "An error occurred",
    },
    Profile: {
      title: "Profile",
      subtitle: "@{username}",
      descriptionTitle: "What is the Urban Belonging app?",
      descriptionMessage:
        "The Urban Belonging app is built to study people's attachment to urban places. It is built with the intention to see the city through the eyes of its citizens and reveal patterns in the way differrent participants make sense of urban space as a place of belonging. While using the app you provide images, tags and location data to our reserach project. We thank you for being part of the project and encourage you to write and email the project leader if you have questions concerning the use of your data. ",
      viewDataPolicyButtonText: "View Data Policy",
    },
    Settings: {
      logoutConfirmAlertTitle: "Logout",
      logoutConfirmAlertMessage: "Are you sure you want to logout?",
      logoutConfirmAlertLogoutButton: "Logout",
      logoutConfirmAlertDismissButton: "Cancel",
      headerTitle: "Settings",
      logoutListItemTitle: "Logout",
    },
  },
  components: {
    Header: {
      settingsPageTitle: "Settings",
      yourWalksPageTitle: "Your Walks",
    },
    PhotoAnnotationInput: {
      addCustomTagButtonText: "Add other",
    },
    PhotoAnnotationPreview: {
      goBackButtonText: "Go back",
    },
    PhotoEventWalkList: {
      emptyTitle: "There's no walks in this task",
    },
    PhotoEventWalkListItem: {
      dateTitle: "Date:",
      durationTitle: "Duration:",
      distanceTitle: "Distance:",
      emptyTitle: "There's no photos in this walk",
    },
    PhotoEventWalkSubmitModal: {
      invalidNameErrorTitle: "Invalid Name",
      invalidNameErrorMessage: "Please give your walk a name.",
      walkNameInputTitle: "Your walk name:",
      walkNameInputPlaceholder: "The name of your walk",
      summaryTitle: "Your summary",
      durationLabel: "Duration:",
      distanceLabel: "Distance:",
      yourPhotosTitle: "Your photos (%{numberOfPhotos})",
      submitButtonText: "Submit walk",
    },
    PhotoList: {
      startTaskButtonText: "Start task",
      startReactionRoundButtonText: "Start a reaction round",
      emptyTitle: "There's no photos in this task.",
      contributionPeriodSubtitle: "Be the one to add the first photo!",
    },
    PhotoListItem: {
      newPhotoLabel: "new",
    },
    PhotoThumbnailList: {
      emptyTitle: "No photos yet",
    },
    SuggestedPhotoEventList: {
      headerTitle: "Photo tasks",
      emptyTitle: "Welcome to Urban Belonging!",
      emptySubtitle: "There are no active tasks.",
      emptyText: "You'll be invited to a task soon!",
    },
    SuggestedPhotoEventListItem: {
      eventEndedHoursAgoText: "%{hours} hours ago",
      eventEndedDaysAgoText: "%{days} days ago",
      eventEndsInHoursText: "%{hours} hours left",
      eventEndsInDaysText: "%{days} days left",
      contributionPeriodActiveLabel: "Active",
      reactionPeriodActiveLabel: "React now",
      hasNotStartedLabel: "Upcoming",
      hasFinishedLabel: "Expired",
      emptyLabel: "No photos yet",
    },
  },
};

export type MasterTranslations = typeof enTranslations;
export type MasterTranslationKey = keyof MasterTranslations;
export type ScreenKey = Leaves<typeof enTranslations.screens>;
export type ComponentKey = Leaves<typeof enTranslations.components>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];
