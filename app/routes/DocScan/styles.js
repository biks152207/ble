import {
  StyleSheet,
  Dimensions
} from 'react-native';

let window = Dimensions.get("window");
import { getSize} from './../../layouts/common/RatioCalculator/ratio';

export default StyleSheet.create({
    Container: {
      flex:1,
      backgroundColor: 'white'
    },
    Content: {
      flex:1,
      width:window.width,
      backgroundColor: 'rgba(235,235,235,1)'
    },
    CameraWrapper: {
      height: getSize(447),
      marginTop: getSize(20),
      marginHorizontal: getSize(20),
    },
    CameraTake: {
      alignItems: 'center',
      bottom: getSize(40)
    },
    Image: {
      height: getSize(80),
      width: getSize(80)
    },
    uploadButton: {
      width: 150,
      height: 40,
      backgroundColor: 'grey',

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
});
