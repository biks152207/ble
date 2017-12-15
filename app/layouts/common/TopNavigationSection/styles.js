import { StyleSheet, Dimensions } from 'react-native';
import { getSize} from '../RatioCalculator/ratio';
let window = Dimensions.get("window");
let { height, width } = window;

export default {
  wrapper: {
    height:getSize(50),
    marginHorizontal: getSize(10)
  },
  navBar: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleWrapper: {
    flexDirection:'row',
    marginHorizontal:getSize(10)
  },
  eachTitleWrapper: {
    flex:0.5,
    height:40,
    backgroundColor:'#333333',
    borderRadius:1
  },
  marginRight: {
    marginRight: getSize(10)
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: getSize(15),
    fontFamily: 'ProximaNova-Bold',
    textAlign: 'center',
    marginTop:14
  },
  selectedScreen: {
    backgroundColor:'#A5DB03'
  },
  button: function(backgroundColor){
    return {
      height: 40,
      width: width * 0.296,
      backgroundColor: backgroundColor,
      borderRadius: 2,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
};
