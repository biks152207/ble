import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common';

let window = Dimensions.get("window");

export default StyleSheet.create({
   container: {
     flex:1,
     backgroundColor: common.whiteColor,
   },
   singleHead: { width: 80, height: 30, backgroundColor: '#c8e1ff' },
    head: { flex: 1, backgroundColor: '#c8e1ff' },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    text: { marginRight: 6, textAlign:'right' }
});
