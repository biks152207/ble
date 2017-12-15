import { StyleSheet, Dimensions } from 'react-native';
let window = Dimensions.get("window");

import common from '../../../config/common';


export default {
  wrapper: {
    backgroundColor: '#000000',
    flex:1
  },
  title: {
    color:common.greenColor,
    fontSize: 18,
    fontWeight: '500',
    // fontFamily: 'Proxima Nova',
    // paddingTop: 46,
    height:30,
    width: 198,
    lineHeight: 30,
  },
  name:{
    fontSize: 18,
    fontWeight: '500',
    // fontFamily: 'Proxima Nova',
    // paddingTop: 46,
    height:30,
    width: 198,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  subWrapper: {
    paddingTop:0,
    marginHorizontal:20
  },
  circleContainer: {
    flex:1,
    alignItems: 'flex-end'
  },
  directionIcon: {
    marginLeft: 10,
    marginTop: 5
  },
  circleText: {
    color: '#FFFFFF',
    fontSize: 8,
    marginLeft: 12.68,
    marginBottom: 2.56,
    height: 13,
    width: 14
  },
  address: {
    color: '#FFFFFF',
    height: 75,
    width: 262,
    fontSize: 20,
    lineHeight: 25,
  }
};
