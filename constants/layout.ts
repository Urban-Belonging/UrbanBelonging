import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const photoColumnCount = 3;

export default {
  window: {
    width,
    height,
  },
  headerHeight: 50,
  isSmallDevice: width < 375,
  photoWidth: width / photoColumnCount,
  photoHeight: width / photoColumnCount,
  photoColumnCount,
};
