import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");
let { height, width } = window;
import { getSize} from '../RatioCalculator/ratio';


export default {
  wrapper: {
    marginBottom: getSize(19),
  },
  address: {
    height:  getSize(24),
    width: getSize(width - 93),
    fontSize: getSize(18),
    lineHeight: getSize(20),
    color: '#000000',
  },
  dateTimePhoneNumber: {
    height: getSize(20),
    width: getSize(width - 74),
    color: '#58595B',
    fontSize: getSize(14),
    lineHeight: getSize(20),
  },

};
