import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';

let window = Dimensions.get("window");
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
export default StyleSheet.create({
  btnLogin: {
    height: 50,
    width : window.width - (common.marginHorizontal + common.marginHorizontal),
  },
  subContainer:{
    height: window.height - 120,
    marginHorizontal:common.marginHorizontal,
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
   txtInutStyle2 : {
   height: 40,
   paddingHorizontal:6.2,
   width : window.width - 40,
   },
   forgotTextInput:{
     borderBottomColor: common.grayColor,
     borderBottomWidth: 1,

   },
   marginTop_15 : {
     marginTop : 15,
   },
   marginRight_10:{
     marginRight :10
   },
   marginLeft_10:{
     marginLeft : 10
   },
   marginTop_10 :{
     marginTop : 10
   },
   oval:{
     width: 26,
     height : 26,
     borderWidth: 1,
     borderColor: common.greenColor,
     borderRadius : 26/2
   },
   otpView:{
     borderBottomColor: common.monochromaticColor,
      borderBottomWidth: 2,
      height: 45,
      marginRight :11
   },
   fontOswaldRegular:{
     fontFamily:'Oswald-Regular',
     fontWeight:'600'
   },
   fontProximaNovaBold:{
     fontFamily:'ProximaNova-Bold'
   },
   retakeButton:{
     width: 150,
     height: 40,
     backgroundColor: 'grey',
     marginRight:50
   },
   ButtonContainer: {
     marginHorizontal: getSize(9),
     marginBottom: getSize(10),
     marginTop: getSize(18),
     height: 20,
     marginBottom: 40,
     flexDirection:'row'
   },
   FirstButtonContainer: {
     flex:1,
     height: getSize(50),
     backgroundColor:'#000000',
     marginRight: getSize(10)
   },
   FirstButtonText: {
     textAlign:'center',
     color: '#FFFFFF',
     marginVertical: getSize(16),
     fontSize: getSize(14),
     fontWeight:'bold',
     lineHeight: getSize(20)
   },
   SecondButtonContainer: {
     height: getSize(50),
     flex:1,
     backgroundColor: '#A5DB03'
   },
   SecondButtonText: {
     textAlign:'center',
     color: '#FFFFFF',
     marginVertical: getSize(16),
     fontSize: getSize(14),
     fontWeight:'bold',
     lineHeight: getSize(20)
   }

});
