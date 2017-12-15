import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  TextInput,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import { connect } from  'react-redux';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import images from './../../config/images';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import styles from './styles';
import { HTTP } from './../../utils/HTTP';
import { AlertInfo } from './../../utils/AlertInfo';

const { width } = Dimensions.get('window');

class EmailLog extends Component {
  constructor(props) {
    super(props);
    moment.tz.setDefault(props.auth.user.driver.homeTerminalTimezone);
    this.state = {
      email: '',
      formValid: false,
      emailValid: true,
      sending: false
    }
    this.sendEmail = this.sendEmail.bind(this);
    this.emailInputChange = this.emailInputChange.bind(this);
  }

  sendEmail() {
    const {day} = this.props.navigation.state.params;
    const { email } = this.state;
    const formData = new FormData();
    formData.append('email', email);
    // formData.append('logs', JSON.stringify(logs));
    formData.append('offset', moment().utcOffset());
    formData.append('day', moment(day).tz("UTC").startOf('day').toISOString());
    this.setState({ sending: true });
    AsyncStorage.getItem('@Axle:token')
      .then((token) =>{
        HTTP('post', `/driver/sendEmailLogs`, formData, {authorization: "Bearer "+token})
          .then((result) => {
            if(result.data.statusCode==200){
              AlertInfo('Email sent.')
            }
            this.setState({ sending: false });

          })
          console.log('token........................', token);
      })
  }

  emailInputChange(e) {
    const email = e.nativeEvent.text;
    this.setState({ email }, () => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(email)){
        this.setState({ emailValid : true, formValid: true})
      }else{
        this.setState({ emailValid : false, formValid: false})
      }
    })
  }

  render() {
    const { navigate, goBack,state } = this.props.navigation;
    console.log(moment().tz("UTC").startOf('day').toISOString(),moment(state.params.day).tz("UTC").startOf('day').toISOString());

    return (
          <View style={styles.container}>
            <View style={[{backgroundColor:common.grayColor, height: 55 , flexDirection:'row', borderBottomWidth:0.5}]}>
              <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{flex:0.1,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  style={{width : 21, height : 18}}
                  source={images.Back_Arrow}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.grayColor,height: 55,marginRight:10,justifyContent:'center',flex:0.6, borderBottomWidth:0.5}]}>
                <Text style={{color: common.blackColor,fontSize: 10}}>DOT INSPECTION ON MODE</Text>
                <Text style={{color: common.blackColor,fontSize: 18}}>Email Logs</Text>
              </View>
              <View style={[{backgroundColor:common.grayColor,height: 55,justifyContent:'center',alignItems:'flex-end', flexDirection:'row', marginRight:10,borderBottomWidth:0.5}]}>
                {this.state.sending &&
                  <ActivityIndicator style={{paddingBottom:8}}/>
                }
                <TouchableHighlight style={{padding:10}} underlayColor="transparent"  onPress={this.sendEmail.bind(this)}>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>Send Logs</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flex:1}}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:40}}>
                <Text style={{color: common.blackColor,fontSize:20}}>Previous 6 days + {moment(state.params.day).format('dddd')}</Text>
                <Text style={{color: common.darkGrayColor,fontSize:12, paddingTop:10}}>Enter Inspector Email Address</Text>
                <View style={{marginTop:10}}>
                  <View style={styles.textInputParent}>
                    <TextInput
                      underlineColorAndroid = "transparent"
                      style={styles.txtInutStyle} value={this.state.email}
                      onChange={this.emailInputChange.bind(this)}
                      />
                  </View>
                  {!this.state.emailValid ?
                    <Text style={{color:'red', fontSize:14, fontWeight:'bold'}}>Please enter valid email</Text>
                    : null
                  }

                </View>
              </View>
            </View>
          </View>
        )
  }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, null)(EmailLog);
