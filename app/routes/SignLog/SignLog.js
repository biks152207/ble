import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Modal,
  Picker,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails, updateUser } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import { HTTP } from './../../utils/HTTP';
import { showToast } from './../../utils/utility';
import { getActivityLogs } from './../../actions/activity';
import SignatureCapture from 'react-native-signature-capture';

let window = Dimensions.get("window");
let timer;
class SignLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: false
    }
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this.saveSignature = this.saveSignature.bind(this);

  }

  saveSignature() {
    this.refs["sign"].saveImage();
  }

  _onSaveEvent(result) {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    if (result && result.encoded) {
      this.setState({progress: true})
      let formData=new FormData();
      formData.append('reviewID',state.params.reviewLogId);
      formData.append('document',`data:image/png;base64,${result.encoded}`);
      AsyncStorage.getItem('@Axle:token')
        .then((token) =>{
          HTTP('post', `/driver/uploadSignature`, formData, {authorization: "Bearer "+token})
            .then((result) => {
              this.setState({progress: false})
              // const updatedDriver = Object.assign({}, this.props.auth.user);
              // updatedDriver.driver = Object.assign({}, updatedDriver.driver);
              // updatedDriver.driver.signature = result.data.data.url;
              // this.props.actions.updateUser(updatedDriver);
              if(result.data.error){
                showToast(result.data.message)
              }else {
                showToast('Successfully signed');
                const { state, navigate } = this.props.navigation;
                if (state.params.from) {
                  navigate('ReviewLog', {signed: true, reviewLogs: state.params.reviewLogs});
                } else {
                  navigate('ActivityStatus')
                }
              }
            })
        })
    }

  }

  resetSign() {
         this.refs["sign"].resetImage();
     }

  render() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={commonStyle.container}>
            <View style={[{backgroundColor:common.whiteColor, height: 70 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() =>{goBack()} } underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Back_Arrow}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.whiteColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
              <Text style={{color: common.greenColor,fontSize: 10, fontWeight: '500'}}>{moment(state.params.day).tz('UTC').format('ll')}</Text>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Sign Log</Text>
              </View>
                <TouchableHighlight onPress={() => {this.saveSignature()}} underlayColor='transparent' style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <View style={{flexDirection:'row'}}>{this.state.progress ? <ActivityIndicator/>:null}<Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text></View>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>

              <View style={s.ModalContainer,{marginHorizontal:25, borderColor: 'lightgray', borderWidth: 1, borderRadius:10, marginTop:10, padding:10}}>
              <Text>Signature</Text>
              <SignatureCapture
                    style={{height:200}}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
            </View>
            <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
            <TouchableHighlight onPress={() => {this.resetSign()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:50}]}>
              <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Clear Signture</Text>
              </View>
            </TouchableHighlight>
          </View>
          {state.params.reviewLogs && state.params.reviewLogs.signature && <View style={{backgroundColor:common.whiteColor,alignItems:'center', flex:1, marginHorizontal:20}}>
            <Image source={{uri: state.params.reviewLogs.signature}} style={{width:window.width, height:300}}/>
          </View>}
          </View>

    )

}
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },
  ModalContainer: {
   flex:1,
  backgroundColor: common.whiteColor,
 }
})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
        activityLog:state.activityReducer
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails,
            getActivityLogs,
            updateUser
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignLog);
