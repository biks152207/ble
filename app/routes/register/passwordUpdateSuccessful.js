import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

let self;
let window = Dimensions.get("window");

export default class PasswordUpdateSuccessful extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    self= this;
    this.state = {

    }

  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={commonStyle.container}>
        <View style={commonStyle.subContainer}>

        <View style={[commonStyle.contentCenter,{marginTop:100}]}>
          <Image
          style={{}}
          source={images.Axle_NoTires}
          />
          <View style={{marginTop :30,marginHorizontal :50}}>
            <Text style={[commonStyle.fontSize_20,{textAlign : 'center'}]}>Your password has been updated successfully</Text>
          </View>
          <View style={{marginTop :30}}>
          <Image
          style={{}}
          source={images.Check_Confirmation_Large}
          />
          </View>
        </View>

          <TouchableHighlight onPress={() => navigate('Login')} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 20}]}>
            <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>LOGIN</Text>
          </TouchableHighlight>

        </View>


      </View>
    )
  }
  //************************************** Render end*****************************//
};
