import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';

let window = Dimensions.get("window");

export default StyleSheet.create({
   btnLogin: {
     height: 50,
     position:'absolute',
     width : window.width - (common.marginHorizontal + common.marginHorizontal),
   },
  filterBoxHome:{
   height:40,
   borderRadius: 2,
   backgroundColor: 'rgba(255,255,255,0.2)',

 },
   txtInputStyleSearchPickUpHome : {
     height: 24,
     paddingHorizontal:6.2,
     paddingLeft:5,
     width : window.width - 65,
     color: common.darkGrayColor,
     //fontFamily: Muller,

   },

});
