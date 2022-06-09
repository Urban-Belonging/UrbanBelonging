import * as React from "react";
import { StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { componentsi18n } from "../lib/i18n";

type VariantProps =
  | {
      variant: "feed";
    }
  | {
      variant: "feedPhotoDetail";
    }
  | {
      variant: "feedPhotoEventWalks";
    }
  | {
      variant: "feedPhotoEventDetail";
      onPressViewWalks: () => void;
    }
  | {
      variant: "feedPhotoEventSliderReaction";
    }
  | {
      variant: "photoEventWalkPreview";
    }
  | {
      variant: "userGroupList";
      onPressAdd: () => void;
    }
  | {
      variant: "userGroupMembersList";
      canAdd: boolean;
      onPressAdd: () => void;
    }
  | {
      variant: "photoEventList";
      canAdd: boolean;
      onPressAdd: () => void;
    }
  | {
      variant: "profile";
      onPressSettings: () => void;
    }
  | {
      variant: "settings";
    }
  | {
      variant: "cameraCapture";
    }
  | {
      variant: "cameraConfirm";
    }
  | {
      variant: "cameraAnnotate";
    }
  | {
      variant: "locationTracker";
    };

type HeaderProps = {
  title?: string;
  onPressGoBack?: () => void;
  canGoBack?: boolean;
} & VariantProps;

export function Header(props: HeaderProps) {
  return (
    <View style={[styles.container]}>
      {getLeftButton(props)}
      {getTitleText(props)}
      {getRightButton(props)}
    </View>
  );
}

function getLeftButton(props: HeaderProps) {
  if (props.canGoBack) {
    return (
      <Icon
        width={18}
        height={18}
        icon={"chevronLeft"}
        style={styles.leftButton}
        onPress={props.onPressGoBack}
      />
    );
  }
  return <View style={styles.leftButton}></View>;
}

function getTitleText(props: HeaderProps) {
  let titleText = props.title;

  switch (props.variant) {
    case "settings":
      titleText = componentsi18n("Header.settingsPageTitle");
      break;
    case "userGroupList":
      titleText = "Your Groups";
      break;
    case "feedPhotoEventWalks":
      titleText = componentsi18n("Header.yourWalksPageTitle");
      break;
  }

  if (!titleText) return null;

  return <Text style={styles.title}>{titleText}</Text>;
}

function getRightButton(props: HeaderProps) {
  switch (props.variant) {
    case "profile":
      return (
        <Icon
          width={18}
          height={18}
          icon={"settings"}
          style={styles.rightButton}
          onPress={props.onPressSettings}
        />
      );
    case "userGroupList":
      return (
        <Icon
          width={18}
          height={18}
          icon={"add"}
          style={styles.rightButton}
          onPress={props.onPressAdd}
        />
      );
    case "photoEventList":
    case "userGroupMembersList":
      if (props.canAdd) {
        return (
          <Icon
            width={18}
            height={18}
            icon={"add"}
            style={styles.rightButton}
            onPress={props.onPressAdd}
          />
        );
      }
      break;
    case "feedPhotoEventDetail":
      return (
        <Icon
          width={18}
          height={18}
          icon={"walking"}
          style={styles.rightButton}
          onPress={props.onPressViewWalks}
        />
      );
      break;
  }
  return <View style={styles.rightButton} />;
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    height: layout.headerHeight,
    backgroundColor: theme.palette.secondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing[5],
  },
  title: {
    fontFamily: typography.primaryBold,
    fontSize: 24,
    textAlign: "center",
  },
  leftButton: {
    width: 18,
    height: 18,
    position: "absolute",
    left: theme.spacing[5],
  },
  rightButton: {
    width: 18,
    height: 18,
    position: "absolute",
    right: theme.spacing[5],
  },
});
