import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");
let { height, width } = window;

export default {
  maps: {
    height: (width <= 320) ? 150: 250,
    width: window.width,
    opacity: 0.57,
  },
  currentLocationButton: {
    position: 'absolute',
    top: (width <= 320) ? 200 - 59: 307 - 100,
    left: width - 59
  }
};
