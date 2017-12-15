import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

let self;

export default class ChangePassword extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      currentPassword: '',
      currentPasswordView: true,
      currentPasswordValid: false,
      newPassword: '',
      newPasswordView: true,
      mewPasswordValid: false,
      confirmPassword: '',
      confirmPasswordView: true,
      confirmPasswordValid: false,
      isPasswordSame : false
    }
    this.currentPasswordTextInput = this.currentPasswordTextInput.bind(this);
    this.newPasswordTextInput = this.newPasswordTextInput.bind(this);
    this.confirmPasswordTextInput = this.confirmPasswordTextInput.bind(this);
  }

  currentPasswordTextInput(password){
    this.setState({ currentPassword : password })
    //var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(password != ''){
      this.setState({ currentPasswordValid : true})
    }else{
      this.setState({ currentPasswordValid : false})
    }
  }
  newPasswordTextInput(password){
    this.setState({newPassword : password })
    //var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if(password != ''){
      this.setState({ newPasswordValid : true})
    }else{
      this.setState({ newPasswordValid : false})
    }
  }
  confirmPasswordTextInput(password){
    this.setState({confirmPassword : password })
  //var re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  //  var  re=this.state.newPassword;
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
    const { navigate } = this.props.navigation;
    return (

      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight90,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => {}} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :32},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        </View>
        <View style={[{flex:1,marginTop:35}]}>
          <Text style={[commonStyle.fontSize_16,styles.fontProximaNovaBold,{color:common.whiteColor}]}>Change Password</Text>
        </View>
      </View>
        <View style={commonStyle.subContainer}>

            <View style={{paddingTop:36}}>

                    <View style={commonStyle.paddingBottom_36}>
                        <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>CURRENT PASSWORD</Text>
                      <View style={styles.textInputParent}>
                        <TextInput
                          onChangeText={(password) => this.currentPasswordTextInput(password)}
                          underlineColorAndroid = "transparent"
                          secureTextEntry = {true}
                          value={this.state.currentPassword}
                          style={styles.txtInutStyle}
                          />
                          {
                            this.state.currentPassword != '' && this.state.currentPasswordValid == true
                             ?
                              <Image
                              style={commonStyle.marginTop15}
                              source={images.Check_Small}
                            /> :null

                         }
                          </View>
                    </View>

                    <View style={commonStyle.paddingBottom_16}>
                      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>NEW PASSWORD</Text>

                      <View style={styles.textInputParent}>
                      <TextInput
                        onChangeText={(password) => this.newPasswordTextInput(password)}
                        underlineColorAndroid = "transparent"
                        secureTextEntry = {true}
                        value={this.state.newPassword}
                        style={styles.txtInutStyle}
                        />
                        {
                          this.state.newPassword != '' && this.state.newPasswordValid == true ?
                            <Image
                            style={commonStyle.marginTop15}
                            source={images.Check_Small}
                          /> :null

                       }
                        </View>

                  </View>
                  <View style={commonStyle.paddingBottom_16}>
                    <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>CONFIRM PASSWORD</Text>
                    <View style={styles.textInputParent}>
                    <TextInput
                      onChangeText={(password) => this.confirmPasswordTextInput(password)}
                      onBlur = {() => this.checkPassword()}
                      underlineColorAndroid = "transparent"
                      secureTextEntry = {true}
                      value={this.state.confirmPassword}
                      style={styles.txtInutStyle}
                      />
                      {
                        this.state.confirmPassword != '' &&  this.state.confirmPasswordValid == true ?
                          <Image
                          style={commonStyle.marginTop15}
                          source={images.Check_Small}
                        /> :null

                     }
                      </View>
                </View>


                </View>
                <View  style={{position:'absolute',bottom:20}} >
                {
                  this.state.currentPasswordValid == true &&  this.state.newPasswordValid == true && this.state.confirmPasswordValid == true &&  this.state.isPasswordSame==true
                  ?<TouchableHighlight onPress={() => navigate('PasswordUpdateSuccessful')}  underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor}]}>
                    <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>CHANGE PASSWORD</Text>
                  </TouchableHighlight>
                  :<TouchableHighlight  underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor}]}>
                    <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>CHANGE PASSWORD</Text>
                  </TouchableHighlight>
                }
                </View>

            </View>

      </View>
    )
  }
  //************************************** Render end*****************************//
};
