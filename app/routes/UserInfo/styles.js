import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';
let window = Dimensions.get("window");
import { getSize} from './../../layouts/common/RatioCalculator/ratio';

export default StyleSheet.create({
  Content: {
    flex:1,
    backgroundColor: '#FFFFFF'
  },
  ProfileContainer: {
    height: getSize(119.5),
    flexDirection: 'row',
    marginHorizontal: getSize(20)
  },
  Avatar: {
    paddingTop: getSize(30),
    height: getSize(60),
    width: getSize(60)
  },
  ProfileInfo: {
    paddingTop: getSize(44),
    paddingLeft: getSize(20),
    width: getSize(195),
    height: getSize(40),
    paddingBottom: getSize(35.5)
  },
  hr: {
    height: 1,
    marginHorizontal: getSize(20),
    backgroundColor: '#D1D3D4',
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
  ProfileName: {
    color: '#000000',
    fontWeight: '500',
    // lineHeight: getSize(20),
    fontSize: getSize(20)
  },
  ProfileDesignation: {
    fontSize: getSize(14)
  },
  ProfileDetails: {
    // height: getSize(458),
    paddingTop: getSize(25.5),
    paddingBottom: getSize(20),
    marginHorizontal: getSize(20)
  },
  FormBlock: {
    marginBottom: getSize(16),

  },
  Label: {
    height: getSize(18),
    width: getSize(242.16),
    color: '#000000',
    fontFamily: 'Oswald-Regular',
    fontSize: getSize(12),
    fontWeight: '900',
    lineHeight: getSize(18)
  },
  Input: {
    height: getSize(40),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: getSize(13),
    borderColor: '#D1D3D4',
    borderWidth: getSize(1),
    marginTop: getSize(6),

  },
  InputContainer: {
    borderWidth: getSize(1),
    flexDirection : 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D3D4',
  },
  InvalidImage: {
    marginTop: getSize(10),
    backgroundColor: '#FFFFFF'
  },
  ButtonContainer: {
    marginTop: getSize(57),
    bottom: getSize(20),
    height: getSize(50),
    backgroundColor: '#A5DB03'
  },
  disableButtonContainer: {
    marginTop: getSize(57),
    bottom: getSize(20),
    height: getSize(50),
    backgroundColor:'rgba(209,211,212,0.7)'
  },
  ButtonFlex: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonText: {
    height: getSize(17),
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: getSize(17),
    fontSize: getSize(14),
    textAlign: 'center'
  }
});
