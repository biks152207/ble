import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common';

let window = Dimensions.get("window");

export default StyleSheet.create({
   container: {
     flex:1,
     backgroundColor: common.whiteColor,
   }
});
