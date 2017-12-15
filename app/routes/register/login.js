import React , { Component }from 'react';
import { Text, View, TouchableOpacity, Image, TextInput,Dimensions, Keyboard, AsyncStorage} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import config from './../../config/config';

/* Actions */
import { loginRequest } from './../../actions/auth';
import { ButtonLoader } from './../../components/loader/ButtonLoader';
import { AlertInfo } from './../../utils/AlertInfo';
import { throttle, showToast } from './../../utils/utility';
var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;


// import BackgroundFetch from "react-native-background-fetch";
// import BackgroundTask from 'react-native-background-task'

let self;
let window = Dimensions.get("window");

// BackgroundTask.define(() => {
//   console.log('Hello from a background task')
//   BackgroundTask.finish()
// })
class Login extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      mobile:'',
      password: '',
      processing: false,
      isOtp: false
    }
    this.mobileNumberTextInput = this.mobileNumberTextInput.bind(this);
    this.passwordTextInput = this.passwordTextInput.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogin = throttle(this.onLogin, 300, this);
  }
  componentDidMount(){
    AsyncStorage.getItem('@Axle:unverfiedToken')
     .then((value) => {
       if (value) {
         this.setState({ isOtp: true });
       } else {
         this.setState({ isOtp: false });
       }
     })
    // BackgroundTask.schedule({
    //       period: 20, // Aim to run every 30 mins - more conservative on battery
    //     })



//     BackgroundFetch.configure({
//       minimumFetchInterval:1,
//    stopOnTerminate: true
//  }, function() {
//    console.log("[js] Received background-fetch event");
// debugger;
//    // To signal completion of your task to iOS, you must call #finish!
//    // If you fail to do this, iOS can kill your app.
//    BackgroundFetch.start(function(){
//      console.log('1');
//    }, function(){
//      console.log('2');
//    });
//  }, function(error) {
//    console.log("[js] RNBackgroundFetch failed to start");
//  });
//
//  // Optional: Query the authorization status.
//  BackgroundFetch.status(function(status) {
//    switch(status) {
//      case BackgroundFetch.STATUS_RESTRICTED:
//        console.log("BackgroundFetch restricted");
//        break;
//      case BackgroundFetch.STATUS_DENIED:
//        console.log("BackgroundFetch denied");
//        break;
//      case BackgroundFetch.STATUS_AVAILABLE:
//        console.log("BackgroundFetch is enabled");
//        break;
//    }
//  });


  }
  mobileNumberTextInput(value){
    if (value.length < 16) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
        value = value.replace(/(\d{4})(\d)/, "$1 - $2");
    }
    else if (value.length == 16) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
        value = value.replace(/(\d{3})(\d)/, "$1 - $2");
    }
    else {
        value = value.substring(0, value.length - 1);
    }
    this.setState({ mobile : value })
  }
  passwordTextInput(password){
    this.setState({ password : password })
  }
  onLogin(){
    let data = {
          mobile: this.state.mobile.replace(/[- )(]/g,'', ''),
          password: this.state.password,
          deviceType: config.DEVICE_TYPE,
          role: "driver",
          // temporary till testing
          flushPreviousSessions: true
      };
      this.setState({ processing : true });
      (this.props.actions.loginRequest(data))
          .then(function(){
            Crashlytics.setUserName(self.props.auth.user.name);
            Crashlytics.setUserEmail(self.props.auth.user.email);

            if(self.props.auth.user.driver.carrier===null || self.props.auth.user.driver.carrier=== undefined){
              // self.props.navigation.navigate('PickUpHome');
              self.props.navigation.navigate('ActivityStatus');
            }else {
              // self.props.navigation.navigate('Shipments');
              self.props.navigation.navigate('ActivityStatus');
            }
          })
          .catch((data) => {
              if (data.verify) {
                  AsyncStorage.setItem('@Axle:unverfiedToken',data.token).then(()=>{
                  showToast('You are not verified please contact administrator.');
                  this.props.navigation.navigate('Otp');

                });

              }
          })
          .finally(() => {
            this.setState({ loading: false });
          });

  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={commonStyle.container}>
      <View style={commonStyle.headerBarHeight}>
        <TouchableOpacity onPress={() => goBack() } underlayColor="transparent" style={[{width : 60,height : 50,marginTop : 10},commonStyle.contentCenter]}>

          <Image
            style={{width : 21, height : 18}}
            source={images.Back_Arrow}
          />
        </TouchableOpacity>
      </View>
        <View style={styles.subContainer}>
            <View style={commonStyle.contentCenter}>
              <Image
              style={{}}
              source={images.Axle_NoTires}
              />

              <Text style={[commonStyle.fontSize_16,{color:common.blackColor,lineHeight:30,paddingTop:10}]}>Login to access your account</Text>
            </View>

            <View style={{paddingTop:56}}>

                    <View style={commonStyle.paddingBottom_16}>
                        <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>MOBILE NUMBER</Text>
                      <View style={styles.textInputParent}>

                      <TextInput
                        onChangeText={(mobile) => this.mobileNumberTextInput(mobile)}
                        underlineColorAndroid = "transparent"
                        value={this.state.mobile}
                        keyboardType = 'numeric'
                        maxLength = {16}
                        placeholder = '( _ _ _ ) _ _ _  -  _ _ _ _'
                        style={[styles.txtInutStyle,{width : window.width - 70,}]}
                        onSubmitEditing={Keyboard.dismiss}
                        />
                        <Image
                            style={{marginTop :8}}
                            source={images.Phone_Menu}
                          />
                        </View>
                    </View>

                    <View style={commonStyle.paddingBottom_16}>
                      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>PASSWORD</Text>

                      <View style={styles.textInputParent}>

                      <TextInput
                         onChangeText={(password) => this.passwordTextInput(password)}
                        underlineColorAndroid = "transparent"
                        value={this.state.password}
                        secureTextEntry ={true}
                        style={styles.txtInutStyle}
                        onSubmitEditing={Keyboard.dismiss}
                        />
                        <Image
                            style={[styles.marginTop_10,{marginRight :8}]}
                            source={images.Lock}
                          />
                        </View>
                  </View>
                  {
                    this.state.mobile !='' &&  this.state.password != ''
                    ?<TouchableOpacity onPress={() => this.onLogin() } underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,marginTop:20}]}>
                      <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>LOGIN</Text>
                    </TouchableOpacity>
                    :<TouchableOpacity underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor,marginTop:20}]}>
                      <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>LOGIN</Text>
                    </TouchableOpacity>
                  }
                </View>
            </View>

            <View style={{}}>
                  <TouchableOpacity underlayColor="transparent" onPress={() => navigate('ForgotPassword')}  style={[commonStyle.contentCenter,{bottom:47}]}>
                    <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold,{color:common.blackColor}]}>Forgot your Password?</Text>
                  </TouchableOpacity>

                {
                    (this.props.auth.isOwner)?(
                        <TouchableOpacity underlayColor="transparent" onPress={() => navigate('SignUp')} style={[commonStyle.contentCenter,{bottom:34}]}>
                            <Text style={[commonStyle.fontSize_14,{color:common.blackColor,fontWeight : 'normal'}]}>Don’t have an account? Sign up here</Text>
                        </TouchableOpacity>
                    ):null
                }

            </View>
            {this.state.isOtp &&
              <View style={{marginTop:20}}>
              <TouchableOpacity underlayColor="transparent" onPress={() => navigate('Otp')}  style={[commonStyle.contentCenter,{bottom:47}]}>
                <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold,{color:common.blackColor}]}>Verify Again</Text>
              </TouchableOpacity>
              </View>

            }
      </View>
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginRequest
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(Login)
