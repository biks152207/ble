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
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import { HTTP } from './../../utils/HTTP';
import { getActivityLogs } from './../../actions/activity';
import SignatureCapture from 'react-native-signature-capture';

let window = Dimensions.get("window");
let timer;
class RepairDefects extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
              <TouchableHighlight onPress={() => {goBack()}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Back_Arrow}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.whiteColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Repair Vehicle Defects</Text>
              </View>
                <TouchableHighlight underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>APPLY</Text>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>
            <ScrollView>
            <View style={s.subContainer,{marginHorizontal:20, marginTop:20}}>
              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between', marginHorizontal:10}}>
              <View>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Wheels</Text>
                <Text style={{fontSize:15, color:'gray'}}>50000 mi</Text>
                </View>
                <View>
                  <Text style={{fontSize:20, fontWeight:'bold', textAlign:'right'}}>Oct 05</Text>
                  <Text style={{fontSize:15, color:'gray', textAlign:'right'}}>7: 46 AM</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row', marginTop:10, marginHorizontal:10}}>
              <Icon name="user" size={20} />
              <Text style={{fontSize:18, color:'gray', marginLeft:10}}>jong</Text>
              </View>
              <View style={{marginTop:5, marginHorizontal:10}}>
              <Text style={s.defectType}>issue</Text>
              </View>
            </View>
            <View style={{marginTop:20, backgroundColor:'lightgray', padding:10}}>
            <Text style={{color:'black', fontSize:15, fontWeight:'500'}}>Repair Details</Text>
            </View>

            <View style={s.subContainer,{marginHorizontal:20, marginTop:20}}>
              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between', marginHorizontal:10}}>
              <View>

                <Text style={{fontSize:20, color:'green'}}><Icon name="check" color={'green'} size={20} /> Repaired</Text>
                <Text style={{fontSize:15, color:'gray'}}>78000 mi</Text>
                </View>
                <View>
                  <Text style={{fontSize:20, fontWeight:'bold', textAlign:'right'}}>Oct 05</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row', marginTop:10, marginHorizontal:10}}>
              <Icon name="user" size={20} />
              <Text style={{fontSize:18, color:'gray', marginLeft:10}}>jong</Text>
              </View>
              <View style={{marginTop:5, marginHorizontal:10}}>
              <Text style={s.defectType}>done</Text>
              </View>
            </View>

            <View style={{marginTop:20, backgroundColor:'lightgray', padding:10}}>
            <Text style={{color:'black', fontSize:15, fontWeight:'500'}}>Repair Inspection Details</Text>
            </View>

            <View style={{marginHorizontal:20}}>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Odometer</Text>
              <View style={s.textInputParent}>
              <TextInput
              placeholder={'Odometer'}
                onChangeText={(text) => {this.OdometerTextInput(text)}}
                underlineColorAndroid = "transparent"
                value={this.state.Odometer}
                style={s.txtInutStyle}
                />
              </View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Mechanical Notes</Text>
              <View style={s.textInputParent}>
              <TextInput
              placeholder={'Enter Note'}
              multiline={true}
              numberOfLines={6}
                onChangeText={(text) => {this.michanicalNotesTextInput(text)}}
                underlineColorAndroid = "transparent"
                value={this.state.michanicalNotes}
                style={s.txtInutStyle}
                />
              </View>
            </View>
            <View style={{borderColor: 'lightgray', borderWidth: 1, borderRadius:5, marginTop:10, padding:10}}>
            <Text>Signature</Text>
            <SignatureCapture
                  style={{flex: 1,height:200}}
                  ref="sign"
                  onSaveEvent={this._onSaveEvent}
                  saveImageFileInExtStorage={false}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode={"portrait"}/>
                  <View style={{height:1, backgroundColor:common.blackColor}}></View>
                  <Text style={s.driverName}>Jon Grizlech</Text>
          </View>
          <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
          <TouchableHighlight onPress={() => {this.resetSign()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:20}]}>
            <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
              <Text style={{fontSize:18,fontWeight:'bold'}}>Clear Signture</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {this.resetSign()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:window.width-50,marginBottom:50}]}>
            <View style={{flexDirection:'row', borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'red',borderRadius:10}}>
            <Icon name="times" color={'red'} size={20} />
              <Text style={{fontSize:18,fontWeight:'bold', color:'red'}}> Not Repaired</Text>
            </View>
          </TouchableHighlight>
        </View>
            </View>
            </ScrollView>
          </View>


    )

}
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000'
  },
  subContainer:{
    flex:1,
    backgroundColor:'#f2efef',
  },
  cardButton:{
    fontSize:17,
    fontWeight:'bold',
    color:common.greenColor,
    paddingTop:10,
    paddingBottom:15
  },
  cardBottom:{
    flex:0.5, alignItems:'center',borderRightWidth:1, borderColor:'lightgray'
  },
  lineSeperator:{height:1, backgroundColor:'lightgray',marginTop:10, marginHorizontal:10},
  defectType:{fontSize:18,fontWeight:'500', color:common.blackColor},
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
 },
  txtInutStyle : {
    // height:40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:common.blackColor
    },
    driverName:{
      color:common.blackColor,
      fontSize:15,
      marginTop:5
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
            getActivityLogs
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RepairDefects);
