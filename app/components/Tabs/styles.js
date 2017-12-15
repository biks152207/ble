import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';


export default StyleSheet.create({
  container: {
    height:getSize(76),
    backgroundColor: common.blackColor
  },
  eachTabContainer: {
    width:getSize(90),
    alignItems: 'center'
  },
  shipments: {
    fontSize: getSize(9),
    lineHeight: getSize(20),
    textAlign: 'center',
    fontWeight: 'bold', color: '#FFFFFF',
    fontFamily: 'ProximaNova-Bold'
  },
  payments: {
    fontSize: getSize(9),
    lineHeight: getSize(20),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingTop:getSize(5),
    fontFamily: 'ProximaNova-Bold'
  },
  referrals: {
    fontSize:getSize(9),
    lineHeight: getSize(20),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'ProximaNova-Bold'
  },
  contact: {
    fontSize: getSize(9),
    lineHeight: getSize(20),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'ProximaNova-Bold'
  }
})
