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
   fontProximaNovaBold:{
     fontFamily:'ProximaNova-Bold'
   },
   fontOswaldRegular:{
     fontFamily:'Oswald-Regular',
     fontWeight:'600'
   },
   textInputParent : {
    borderWidth: 1,
    borderColor: common.grayColor,
    flexDirection : 'row',
  },
  txtInutStyle : {
    height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    },
   txtInputStyle : {
    height: 40,
    paddingHorizontal:13.5,
    borderWidth: 1,
    borderColor: common.grayColor,
    flexDirection : 'row',

  },
  fontProximaNovaBold:{
    fontFamily:'ProximaNova-Bold'
  },
  ScreenContainer : {
    backgroundColor : 'white',
    borderRadius : 2,
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
    height:14
  },
  pin: {
    marginLeft: 31,
    height: 16,
    width: 10,
    marginTop: 3
  },
  optionView:{
  backgroundColor : 'rgba(33,33,35,0.6)',
  flex: 1
},
moreOption:{
  backgroundColor : 'rgba(255,255,255,0.9)',
  position : 'absolute',
  bottom : 75,
  width : window.width -40,

},
cancelView:{
  backgroundColor : 'rgba(255,255,255,100)',
  position : 'absolute',
  bottom : 10,
  width : window.width - 40,
  height : 50
},
optionFont :{
  color : '#007AFF',
  fontSize : 20,
  lineHeight : 24,
  letterSpacing : -0.12,
  textAlign:'center',
  paddingTop:4
},
optionFont2 :{
  color : common.grayTextColor,
  fontSize : 20,
  lineHeight :24,
  letterSpacing : -0.12,
  textAlign:'center',
  paddingTop:6
},
borderBottom2:{
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(0,0,0,0.2)'
},

});
