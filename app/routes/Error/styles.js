import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common';

let window = Dimensions.get("window");

export default StyleSheet.create({
   container: {
     flex:1,
     backgroundColor: common.whiteColor,
   },
   txtInutStyle : {
     height: 40,
     paddingHorizontal:6.2,
     width : window.width - 65,
     color:common.blackColor
     },
     textInputParent : {
      borderWidth: 1,
      borderColor: common.grayColor,
      flexDirection : 'row',
    },
});
