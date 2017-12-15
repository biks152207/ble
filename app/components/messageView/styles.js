import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';

let window = Dimensions.get("window");

export default StyleSheet.create({
  flexDirectionRow :{
    flexDirection : 'row'
  },
  message_FontSize_12:{
    color:common.blackColor,
    fontFamily:'ProximaNova-Regular',
    fontSize: 12,
    lineHeight:20
  },
  message_FontSize_14:{
    color:common.grayTextColor,
    //fontFamily: "Proxima Nova",
    fontFamily:'ProximaNova-Regular',
    fontSize: 14,
    lineHeight:20
  },
})
