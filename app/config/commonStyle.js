import { StyleSheet , Dimensions, Platform } from 'react-native';
import common from './common.js';

let window = Dimensions.get("window");

export default commonStyle = {
  container: {
      flex: 1,
      backgroundColor:common.whiteColor,
  },
  subContainer:{
    flex: 1,
    marginHorizontal:common.marginHorizontal,
  },
  scrollContainer:{
    marginHorizontal:common.marginHorizontal,
  },

  headerBarHeight :{
    // height : 80
  },
  headerBarHeight90 :{
    height : 90
  },

  fontSize_9:{
	color: common.grayColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 9,
	lineHeight: 11,
  },

  fontSize_14:{
    color:common.whiteColor,
    fontFamily:'ProximaNova-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 17,
  },

  fontSize_16:{
	color: common.blackColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 16,
	lineHeight: 20,
  },
  fontSize_20:{
  color: common.whiteColor,
  fontFamily:'ProximaNova-Regular',
  fontSize: 20,
  lineHeight: 24,

  },

  fontSize_12:{
	color: common.blackColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 12,
	fontWeight: '600',
	lineHeight: 18,
  },

  fontSize_11:{
	color: common.darkGrayColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 11,
	lineHeight: 20,

  },

  fontSize_20:{
	color: common.blackColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 20,
	lineHeight: 30,
  },

  fontSize_36:{
	color: common.blackColor,
	fontFamily:'ProximaNova-Regular',
	fontSize: 36,
	lineHeight: 40,
  },

  textInput:{
    height: 40,
    borderColor: common.grayColor,
    borderWidth: 1,
    paddingHorizontal : 6.2
  },

  contentCenter : {
      justifyContent : 'center',
      alignItems : 'center'
  },
  contentRight : {
      justifyContent : 'flex-end',
      alignItems : 'flex-end'
  },
  paddingBottom_6:{
    paddingBottom : 6
  },
  paddingBottom_16:{
    paddingBottom : 16
  },
  paddingBottom_15:{
    paddingBottom : 15
  },
  paddingBottom_20 :{
    paddingBottom : 20
  },
  paddingBottom_24 :{
    paddingBottom : 24
  },
  paddingTop_41:{
    paddingTop : 41
  },
  marginTop_80:{
    marginTop : 80
  },
  paddingBottom_36:{
    paddingBottom :36
  },
  smallHeaderBar:{
    marginTop :55,
    marginBottom :10,
    flex:1
  },
  searchBar:{
    marginTop :35,
    marginBottom :33,
    flex:1,
    marginLeft:-30
  },
  marginTop10:{
    marginTop : 10,
  },
  marginTop15:{
    marginTop : 15,
  }

};
