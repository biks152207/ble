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
import PercentageCircle from 'react-native-percentage-circle';
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
import DateTimePicker from 'react-native-modal-datetime-picker';

let window = Dimensions.get("window");
let timer;
class PastActivityStatus extends Component {
  constructor(props) {
    super(props);
    this.prevLatitude =0.0;
    this.prevLongitude=0.0;
    this.lastUpdatedTrackingTime=moment();
    this.state = {
      tempCurrentStatus:'OFF',
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startTime: '',
      endTime:''
    }
    this.formatStatusIcon=this.formatStatusIcon.bind(this);
    this.activeStatus=this.activeStatus.bind(this);
    this.changeTempCurrentStatus=this.changeTempCurrentStatus.bind(this);
    this._handleStartTimePicked=this._handleStartTimePicked.bind(this);
    this._handleEndTimePicked=this._handleEndTimePicked.bind(this);

  }
  formatStatusIcon(status){
    if(status=="SLEEPER"){
      return "SL"
    }else {
      return status
    }
  }
  activeStatus(status){
    if(this.state.tempCurrentStatus===status)
    return common.greenColor
    else {
      return '#AEB5BB'
    }
  }
  changeTempCurrentStatus(status){
    this.setState({
      tempCurrentStatus:status
    })
  }
  notesTextInput(text){
    this.setState({
      notes:text
    })
  }
  _handleStartTimePicked = (date) => {
    
        this.setState({startTimePickerVisible:false, startTime: moment(date).format('LTS')});
  };
  _hideStartTimePicker = () => this.setState({startTimePickerVisible:false});
  _handleEndTimePicked = (date) => {
        this.setState({endTimePickerVisible:false, endTime: moment(date).format('LTS')});
  };
  _hideEndTimePicker = () => this.setState({endTimePickerVisible:false});

  render() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={s.Container}>
        <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
          <TouchableHighlight onPress={() => {navigate('ActivityStatus')}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Close_White}
            />
          </TouchableHighlight>
          <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Insert Duty Status</Text>
          </View>
          <TouchableHighlight onPress={() => {navigate('ActivityStatus')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
          </TouchableHighlight>
        </View>
        <View style={[s.Content,{marginTop:10}]}>

            <View style={commonStyle.container}>

              <View style={s.Container}>

                <View style={{marginHorizontal:20,marginBottom:20,flexDirection:'row'}}>
                  <View style={{flex:0.4}}>
                    <View style={commonStyle.paddingBottom_16}>
                        <Text style={[{color:'white',marginBottom:10},s.SubHeaderText]}>START TIME</Text>
                        <View style={s.timePickerTextField}>
                            <TouchableOpacity onPress={() => { this.setState({startTimePickerVisible:true}) }} >
                                <View style={{flexDirection:'row',height:30}}>
                                  <View style={{flex:0.8}}>
                                      <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>{this.state.startTime} </Text>
                                  </View>
                                  <View style={{flex:0.2}}>
                                    <Icon name="clock-o" color={common.greenColor} size={20}/>
                                  </View>
                                </View>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flex: 1 }}>
                             <DateTimePicker
                                titleIOS='Select Start Time'
                                mode="time"
                               isVisible={this.state.startTimePickerVisible}
                               onConfirm={this._handleStartTimePicked}
                               onCancel={this._hideStartTimePicker}
                             />
                           </View>
                      </View>
                  </View>
                  <View style={{flex:0.2}}>
                  </View>
                  <View style={{flex:0.4}}>
                    <View style={commonStyle.paddingBottom_16}>
                        <Text style={[{color:'white',marginBottom:10},s.SubHeaderText]}>END TIME</Text>
                        <View style={s.timePickerTextField}>
                            <TouchableOpacity onPress={() => { this.setState({endTimePickerVisible:true}) }} >
                                <View style={{flexDirection:'row',height:30}}>
                                  <View style={{flex:0.8}}>
                                      <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>{this.state.endTime} </Text>
                                  </View>
                                  <View style={{flex:0.2}}>
                                    <Icon name="clock-o" color={common.greenColor} size={20}/>
                                  </View>
                                </View>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flex: 1 }}>
                             <DateTimePicker
                                titleIOS='Select Start Time'
                                mode="time"
                               isVisible={this.state.endTimePickerVisible}
                               onConfirm={this._handleEndTimePicked}
                               onCancel={this._hideEndTimePicker}
                             />
                           </View>
                      </View>
                  </View>
                </View>

                <View style={{marginHorizontal:20}}>
                  <Text style={s.SubHeaderText}>DUTY STATUS</Text>
                </View>
                <View style={{flexDirection:"row",marginBottom:10}}>
                  <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('ON')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
                  <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                    <View style={{width:50,height:50, borderRadius:25, backgroundColor:this.activeStatus('ON'),alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>ON</Text>
                    </View>
                    <Text style={{fontWeight:'bold',fontSize:15,marginTop:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>ON DUTY</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('OFF')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
                <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                  <View style={{width:50,height:50, borderRadius:25, backgroundColor:this.activeStatus('OFF'),alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>OFF</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize:15,marginTop:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>OFF DUTY</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('SLEEPER')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
              <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                <View style={{width:50,height:50, borderRadius:25, backgroundColor:this.activeStatus('SLEEPER'),alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>SL</Text>
                </View>
                <Text style={{fontWeight:'bold',fontSize:15,marginTop:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>SLEEPER DUTY</Text>
              </View>
            </TouchableHighlight>
                </View>
                <View style={{marginHorizontal:20,marginTop:20}}>
                  <View style={{}}>
                    <Text style={[{color:'white',marginBottom:10},s.SubHeaderText]}>NOTES</Text>
                    <View style={s.textInputParent}>

                    <TextInput
                      onChangeText={(text) => {this.notesTextInput(text)}}
                      underlineColorAndroid = "transparent"
                      value={this.state.notes}
                      style={s.txtInutStyle}
                      />

                      </View>
                  </View>
                </View>
              </View>
            </View>






        </View>



      </View>

    )
  }
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },
  Header: {
    height: getSize(80),
    backgroundColor: '#000000',
  },
  HeaderContent: {
    flexDirection: 'row',
    // marginHorizontal: getSize(20)
  },
  HeaderTextContainer: {
    // marginTop: getSize(20),
    flex:0.5,
  },
  HeaderText: {
    fontSize: getSize(16),
    color: 'white'
  },
  SubHeaderText:{
    fontSize: getSize(20),
    color: common.greenColor,
    fontWeight:'bold',
    fontFamily:'ProximaNova-Bold'
  },
  connectStatus:{
    alignItems:'flex-end'
  },

  Content: {
    flex:1
  },
  fontOswaldRegular:{
    fontFamily:'Oswald-Regular',
    fontWeight:'600'
  },
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
 },
 timePickerTextField:{
   borderBottomWidth:1,
   borderColor: common.grayColor,

 },
  txtInutStyle : {
    height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:'white'
    },
    txtInputStyle : {
     height: 40,
     paddingHorizontal:13.5,
     borderWidth: 1,
     borderColor: common.grayColor,
     flexDirection : 'row',

    },
})


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
            getUserDetails
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PastActivityStatus);
