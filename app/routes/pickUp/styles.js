import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';

let window = Dimensions.get("window");

export default StyleSheet.create({
  textInputParentSearch : {
   flexDirection : 'row',
  backgroundColor:common.blackColor,
  marginLeft:15,
  marginRight:15,
  marginTop:20,
  marginBottom:25,
 },
 txtInutStyleSearch : {
  //  height: 30,
   paddingHorizontal:6.2,
   paddingLeft:20,
   width : window.width - 65,
   color: common.darkGrayColor,
   //fontFamily: Muller,
},
   btnLogin: {
     height: 50,
     position:'absolute',
     width : window.width - (common.marginHorizontal + common.marginHorizontal),
   },
   filterBox:{
  	height: 50,
  	borderRadius: 2,
  	backgroundColor: 'rgba(255,255,255,0.2)',
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
  fontMullerRegular:{
    // fontFamily:'Muller-Regular',
  },
  fontProximaNovaBold:{
    fontFamily:'ProximaNova-Bold'
  },

});
