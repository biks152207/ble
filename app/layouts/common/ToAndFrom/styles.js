import { StyleSheet, Dimensions } from 'react-native';
import { getSize} from '../RatioCalculator/ratio';

let window = Dimensions.get("window");
let { height, width } = window;

export default {
  wrapper: function(reduceWidth = 0, borderRadius = [0,0,0,0]){
    const [ borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius ] = borderRadius;
    return {
      width: width,
      height: getSize(208),
      backgroundColor: '#FFFFFF',
      // borderTopLeftRadius: borderTopLeftRadius,
      // borderTopRightRadius: borderTopRightRadius,
      // borderBottomLeftRadius: borderBottomLeftRadius,
      // borderBottomRightRadius: borderBottomRightRadius,
    }
  },
  arrowContainer: function(reduceWidth = 0){
    return {
      paddingTop: height * 0.03,
      paddingLeft: width - 33 - reduceWidth/2
    }
  },
  dotLineAndPin: function(reduceWidth = 0){
    return {
      paddingTop: height * 0.0135,
      paddingLeft: 30 - reduceWidth/2
    }
  },
  borderColorGreen: {
    borderColor: '#A5DB03',
  },
  borderColorRed: {
    borderColor: '#FF0033',
  },
  dot: {
    height: getSize(12),
    width: getSize(12),
    borderWidth: getSize(2),
    borderColor: '#A5DB03',
    borderRadius: 12/2,
  },
  dottedLine:{
    paddingLeft: getSize(4),
    paddingTop: getSize(7.74),
    paddingBottom: getSize(7.74)
  },
  dottedLineImage: {
    marginTop: getSize(2),
    marginBottom: getSize(2)
  },
  pin: {
    height: getSize(16),
    width: getSize(10),
  }
};
