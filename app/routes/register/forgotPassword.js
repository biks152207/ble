import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions, Keyboard, ActivityIndicator ,Alert} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { ButtonLoader } from './../../components/loader';


import { getResetPasswordToken } from './../../actions/auth';

let self;
let window = Dimensions.get("window");

class ForgotPassword extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    this.state = {
      forgotEmail : '',
      forgotEmailValid: false,
      phone: '',
      phoneValid: false,
      loading: false
    }
    this.emailTextInput = this.emailTextInput.bind(this);
    this.phoneTextInput = this.phoneTextInput.bind(this);
    this.onResetPassWord = this.onResetPassWord.bind(this);


  }

  emailTextInput(forgotEmail) {
    this.setState({ forgotEmail : forgotEmail })
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(forgotEmail)){
      this.setState({ forgotEmailValid : true})
    }else{
      this.setState({ forgotEmailValid : false})
    }
  }

  phoneTextInput(phone){
    this.setState({ phone : phone })
    if(phone != ''){
      this.setState({ phoneValid : true})
    }else{
      this.setState({ phoneValid : false})
    }
  }

  onResetPassWord(){
      let prefix = this.state.phone.split(" ")[0]
      let num = this.state.phone.split(" ")[1]
      let query = {prefix, num}
      this.setState({loading:true})
      this.props.actions.getResetPasswordToken(query)
          .then(response => {
            Alert.alert(
              'Info',
              `Please check your text messages for a link to reset your password.`,
              [

    {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
  ]
              )
              // console.log("aaa", response);
              // this.props.navigation.navigate('NewPassword')
          })
          .catch((error) =>{
            Alert.alert(
              'Info',
              `${error.message}`,
              )
          })
          .finally(() => {
            this.setState({
              loading: false
            })
          })

  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    const { forgotEmail, forgotEmailValid, phone, phoneValid } = this.state;
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :10},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        </View>
        <View style={[{flex:1, marginTop : 10}]}>
          <Text style={[commonStyle.fontSize_16,styles.fontProximaNovaBold,{color: common.whiteColor}]}>Forgot Password</Text>
        </View>
      </View>
        <View style={commonStyle.subContainer}>
            <View style={[commonStyle.contentCenter,{paddingHorizontal : 30,paddingTop : 35}]}>
                <Text style={[commonStyle.fontSize_16,{textAlign : 'center'}]}>Enter your registered phone number to reset your password</Text>
            </View>


            <View style={[{paddingTop : 59},styles.forgotTextInput]}>

              <View style={commonStyle.contentCenter}>

                <TextInput
                  onChangeText={(phone) => this.phoneTextInput(phone)}
                  underlineColorAndroid = "transparent"
                  value={phone}
                  placeholder= "Phone number"

                  style={[commonStyle.fontSize_16,styles.txtInutStyle,{width : window.width - 40,textAlign:'center'}]}
                  onSubmitEditing={Keyboard.dismiss}
                  />

                </View>
            </View>

            {
              phone != '' && phoneValid == true
              ?<TouchableHighlight onPress={() => this.onResetPassWord()} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 20}]}>
                <View style={{flex:1, justifyContent:'center'}}>
                  {this.state.loading &&
                    <ActivityIndicator/>
                  }
                <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>CONTINUE</Text>
                </View>
              </TouchableHighlight>
              :<TouchableHighlight underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor,position : 'absolute', bottom : 20}]}>
                <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>CONTINUE</Text>
              </TouchableHighlight>

            }


        </View>


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
            getResetPasswordToken
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
