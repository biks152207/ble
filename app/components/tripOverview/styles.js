import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';

let window = Dimensions.get("window");

export default StyleSheet.create({
  CityAndState: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '900',
    lineHeight: 24,
    fontSize: 18
  },
  ScreenContainer : {
    backgroundColor : 'white',
    borderRadius : 2,
    // height : 180,
    marginTop : 10
  },
  arrowUp: {
    width: 13,
    height: 8,
    marginRight: 20
  },
  dot: {
    height: 12,
    width: 12,
    borderWidth: 2,
    borderColor: '#A5DB03',
    borderRadius: 12/2,
    marginTop: 6,
    marginLeft: 29,
    marginBottom:2
  },
  dotted_line: {
    marginLeft: 34,
    marginTop:2,
    marginBottom:1,
    width:2,
    height:18
  },
  pin: {
    marginLeft: 31,
    height: 16,
    width: 10,
    marginTop: 3
  },
  subDetails: {
    fontWeight: '900',
    fontSize: 12,
    fontFamily: 'ProximaNova-Bold'
  }


})
