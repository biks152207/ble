import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
let self;
export default class NewPassword extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    self= this;
    this.state = {
      newPassword: '',
      newPasswordValid: false,
      confirmPassword: '',
      confirmPasswordValid: false,
      isPasswordSame : false
    }

    this.newPasswordTextInput = this.newPasswordTextInput.bind(this);
    this.confirmPasswordTextInput = this.confirmPasswordTextInput.bind(this);
  }

  newPasswordTextInput(password){
    this.setState({newPassword : password })
    // var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(password != ''){
      this.setState({ newPasswordValid : true})
    }else{
      this.setState({ newPasswordValid : false})
    }
  }
  confirmPasswordTextInput(password){
    this.setState({confirmPassword : password })
  // var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(password != ''){
      this.setState({ confirmPasswordValid : true})
    }else{
      this.setState({ confirmPasswordValid : false})
    }
  }

  checkPassword(){
    if(this.state.confirmPassword != '' && this.state.newPassword != ''){
    if(this.state.confirmPassword == this.state.newPassword){
      this.setState({isPasswordSame : true});
    }else{
      this.setState({isPasswordSame : false});
    }
  }
  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    const { newPassword, newPasswordValid, confirmPassword, confirmPasswordValid, isPasswordSame } = this.state;
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight90,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
      <View style={{flex:0.5}}>
      <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :32},commonStyle.contentCenter]}>
        <Image
          style={{width : 21, height : 18}}
          source={images.Arrow_White_Left}
        />
      </TouchableHighlight>
      </View>

        <View style={[{flex:1, marginTop : 35}]}>
          <Text style={[commonStyle.fontSize_16,styles.fontProximaNovaBold,{color: common.whiteColor}]}>Forgot Password</Text>
        </View>
      </View>
        <View style={commonStyle.subContainer}>
            <View style={{paddingTop:26}}>

                    <View style={commonStyle.paddingBottom_16}>
                      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{fontFamily:'ProximaNova-Bold'}]}>NEW PASSWORD</Text>
                      <View style={styles.textInputParent}>
                      <TextInput
                        onChangeText={(password) => this.newPasswordTextInput(password)}
                        underlineColorAndroid = "transparent"
                        secureTextEntry = {true}
                        value={newPassword}
                        style={styles.txtInutStyle}
                        />
                        {
                          newPassword != '' && newPasswordValid == true
                          ?<Image
                            style={styles.marginTop_15}
                            source={images.Check_Small}
                          />
                          :null

                       }
                        </View>
                  </View>
                  <View style={commonStyle.paddingBottom_16}>
                    <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{fontFamily:'ProximaNova-Bold'}]}>CONFIRM PASSWORD</Text>
                    <View style={styles.textInputParent}>
                    <TextInput
                      onChangeText={(password) => this.confirmPasswordTextInput(password)}
                      onBlur = {() => this.checkPassword()}
                      underlineColorAndroid = "transparent"
                      secureTextEntry = {true}
                      value={confirmPassword}
                      style={styles.txtInutStyle}
                      />
                      {
                        confirmPassword != '' && confirmPasswordValid == true ?
                          <Image
                          style={styles.marginTop_15}
                          source={images.Check_Small}
                        /> :null

                     }
                      </View>
                </View>
                </View>
                <View  style={{position:'absolute',bottom:20}} >
                {
                  newPasswordValid == true && confirmPasswordValid == true && isPasswordSame == true
                  ?<TouchableHighlight  underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor}]}>
                    <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>UPDATE PASSWORD</Text>
                  </TouchableHighlight>
                  :<TouchableHighlight  underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor}]}>
                    <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>UPDATE PASSWORD</Text>
                  </TouchableHighlight>
                }
                </View>
            </View>
      </View>
    )
  }
  //************************************** Render end*****************************//
};
