import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';
let window = Dimensions.get("window");
import { getSize} from './../../layouts/common/RatioCalculator/ratio';


export default StyleSheet.create({
  wrapper: {
    height: getSize(119.5),
    marginHorizontal: getSize(20),
    marginVertical: getSize(29.5)
  },
  mainTitle: {
    fontSize: getSize(20),
    fontWeight: '500',
    // lineHeight:getSize(20)
  },
  horizontalMargin: {
    marginHorizontal: getSize(20)
  },
  horizontalMargin30: {
    marginHorizontal: getSize(30)
  },
  padding34: {
    paddingTop: getSize(2)
  },
  buttonTitle: {
    fontSize:getSize(20),
    lineHeight:getSize(30),
    height: getSize(30),
    width: getSize(315),
    fontFamily: "ProximaNova-Bold"
  },
  hr: {
    height: 1,
    width:window.width <= 320 ? getSize(310): window.width >= 414? getSize(315): getSize(315),
    backgroundColor: '#D1D3D4'
  }
});
