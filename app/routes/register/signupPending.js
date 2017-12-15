import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails,signUpRequest } from './../../actions/auth';
import { AsyncStorage } from 'react-native';

let self;
let window = Dimensions.get("window");

class SignupPending extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    self= this;
    this.state = {

    }

  }

onverifyOTP = () => {
  // let data = {
  //   OTPCode:"aaaa",
  // };
    let token = AsyncStorage.getItem('@Axle:token')
    console.log("TOKEN", token)
      // (this.props.actions.loginRequest(data))
      let response = self.props.actions.getUserDetails(token);
         if(response)
              self.props.navigation.navigate('Otp')
          }


  render(){
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => {navigate('PathSelection')}} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :10},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        </View>
        <View style={[{flex:1, marginTop : 10,marginRight : 24},commonStyle.contentRight]}>
          {/*<View style={[styles.oval,commonStyle.contentCenter]}>
            <Text style={[{backgroundColor : 'transparent'},commonStyle.fontSize_14,{fontWeight : '600', lineHeight : 17,color : common.greenColor}]}>3</Text>
          </View>
          */}
        </View>
      </View>
        <View style={commonStyle.subContainer}>

        <View style={[commonStyle.contentCenter,{height : window.height - 80}]}>
          <Image
          style={{}}
          source={images.Axle_NoTires}
          />
          <View style={{marginTop : 15,marginHorizontal :10}}>
            <Text style={[commonStyle.fontSize_20,{textAlign : 'center'}]}>Thank you for signing up with Axle. Please verify with the code we have sent to your mobile</Text>
          </View>
        </View>

          <TouchableHighlight onPress={() => this.onverifyOTP()} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 20}]}>
            <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>VERIFY</Text>
          </TouchableHighlight>

        </View>


      </View>
    )
  }
  //************************************** Render end*****************************//
};

function mapStateToProps(state){
    console.log("STATE", state.auth.token)
    return {
        auth: state.auth,
        token: state.auth.token,
        data: state.LoginReducer
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getUserDetails

        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPending)
