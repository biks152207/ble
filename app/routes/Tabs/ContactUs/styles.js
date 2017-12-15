import { StyleSheet , Dimensions } from 'react-native';

let window = Dimensions.get("window");
import { getSize} from './../../../layouts/common/RatioCalculator/ratio';

import common from './../../../config/common.js';

export default StyleSheet.create({
    container: {
      flex: 1
    },
    topContainer: {
      flex: 1,
      backgroundColor: '#000000'
    },

    topHeaderContainer: {
      flex:1,
      flexDirection: 'row',
      paddingTop: getSize(20),
    },
    leftArrow: {
      height: getSize(18),
      width: getSize(22),
      borderWidth: 1,
      marginHorizontal: getSize(20)
    },
    header: {
      backgroundColor: common.blackColor,
      height: getSize(50),
    },
    headerTitleContainer: {
      height: getSize(20),
      width: getSize(137)
    },
    headerTitle: {
      color:'white',
      fontSize: getSize(20),
      fontFamily: 'ProximaNova-Regular',
      lineHeight: getSize(20),
      // paddingLeft: getSize(20),
      fontWeight: '500'
    },
    paddingTop51: {
      paddingTop: getSize(10)
    },
    horizontalMargin20: {
      marginHorizontal: getSize(20)
    },
    horizontalMargin25: {
      marginHorizontal: getSize(25)
    },
  
    content: {
      flex:1,
      height: getSize(667),
      backgroundColor: common.whiteColor
    },
    subTitle: {
      fontSize: getSize(24),
      color: '#000000',
      fontWeight: 'bold',
      lineHeight: getSize(30),
      // fontFamily: 'Oswald'

    },
    contactContainer: {
      height: getSize(60),
      borderWidth: 1,
      marginBottom: getSize(20),
      borderColor:'#D1D3D4',
    },
    contactBox1: {
      marginLeft: getSize(24),
      marginVertical: getSize(16),
      width: 26,
      height: 28
    },
    contactBox2: {
      marginLeft: 24,
      width: 34,
      height: 23,
      marginTop: 19,
      marginBottom: 18
    },
    contactBox3: {
      marginLeft: 24,
      width: 24,
      height: 32,
      marginTop: 28.5,
      marginBottom: 29.5
    },
    textStyle: {
      height:18,
      width: 213,
      fontSize: 16,
      marginRight: 10,
      lineHeight: 18,
      color: '#000000',
      marginTop: 21,
      marginBottom: 21
    },
    padding26: {
      paddingTop: getSize(26)
    },
    imageHeight90: {
      height: getSize(90)
    },
    imageHeight60: {
      height: getSize(60)
    }

});
