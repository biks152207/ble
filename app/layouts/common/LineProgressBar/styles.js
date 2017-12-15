import { StyleSheet, Dimensions } from 'react-native';
let window = Dimensions.get("window");
let { height, width } = window;

import common from '../../../config/common';

export default {
  wrapper: function(paramWidth) {
    return {
    width: paramWidth,
    backgroundColor: '#000000',
    height: 4,
  }
  },
  progressTextContainer: function(progressValue, total, paramWidth) {
    return {
      flex: 1,
      width: progressValue * (paramWidth/total),
      backgroundColor: common.greenColor,
    }
  },
};
