import { StyleSheet , Dimensions } from 'react-native';
import common from '../../../config/common.js';
import { getSize} from '../RatioCalculator/ratio';

let window = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    backgroundColor: common.blackColor,
    height: getSize(50),
  },
  headerTitleContainer: {
    height: getSize(20),
    width: getSize(137)
  },
  headerTitle: {
    color:'white',
    fontSize: getSize(20),
    fontFamily: 'ProximaNova-Regular',
    lineHeight: getSize(20),
    paddingLeft: getSize(20),
    fontWeight: '500'
  },
  paddingTop51: {
    paddingTop: getSize(10)
  },
  horizontalMargin: {
    marginHorizontal: getSize(20)
  },

});
