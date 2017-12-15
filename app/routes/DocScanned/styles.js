import {
  StyleSheet
} from 'react-native';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';

export default {
  Container: {
    flex:1,
    backgroundColor: '#EDEDED'
  },
  Content: {
    flex:1,
  },
  DocContainer: {
    marginTop: getSize(15),
    marginHorizontal: getSize(16),
    height: getSize(window.width == 320 ? 472 : 484),
    borderWidth: 1,
    borderColor: '#AEAFB1'
  },
  ButtonContainer: {
    marginHorizontal: getSize(9),
    marginBottom: getSize(10),
    marginTop: getSize(18),
    flex:1,
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
}
