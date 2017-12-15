import { StyleSheet, Dimensions } from 'react-native';
let window = Dimensions.get("window");
let { height, width } = window;
import { getSize} from '../RatioCalculator/ratio';

export default {
  container: {
    width: width,
    backgroundColor: '#FFFFFF'
  },
  topWrapper: {
    marginVertical: getSize(25.5)
  },
  wrapper: {
    height: getSize(60),
    width: width,
    // borderBottomLeftRadius: 2,
    // borderBottomRightRadius: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginHorizontal: getSize(30)
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000'
  },
  subText: {
    fontSize: 14,
    color: '#58595B',
  }
};
