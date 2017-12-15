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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Toast from 'react-native-simple-toast';

import PercentageCircle from 'react-native-percentage-circle';
import images from './../../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { getActivityLogs } from './../../../actions/activity';
import { getSize} from './../../../layouts/common/RatioCalculator/ratio';
import Header from './../../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import Hr from 'react-native-hr';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../../actions/auth';
import commonStyle from './../../../config/commonStyle.js';
import common from './../../../config/common';
import BackgroundGeolocation from "react-native-background-geolocation";
import { HTTP } from './../../../utils/HTTP';
import { driverStatus,getOnedayErrors } from './../../../utils/utility';
import ActionButton from 'react-native-action-button';
import Loader  from './../../../components/loader/loader';
let window = Dimensions.get("window");
import LineProgressBar from './../../../layouts/common/LineProgressBar/LineProgressBar';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderComponent from './SliderComponent';
import GraphComponent from './../../../components/Graph/Graph';



// const Data = [{
//   time: 1,
//   status: 4
// },
// {
//   time: 4,
//   status: 3
// },
// {
//   time: 24,
//   status: 4
// },
// {
//   time: 15,
//   status: 4
// },
// {
//   time: 21,
//   status: 4
// }
// ]



class EditedActivityLog extends Component {
  constructor(props) {
    super(props);
    moment.tz.setDefault(props.auth.user.driver.homeTerminalTimezone);

    this.dayDrivingLimit=11*60;
    this.dayOnLimit=14*60;
    this.dayOffSlLimit=10*60;
    this.maxShiftLimit=14*60;
    this.restBreakLimit=30;
    this.untilBreakLimit=8*60;
    this.weekOnDrivingLimit=60*60;
    this.state = {
      loading: false
    }
  }

  // componentWillMount(){
  //   const { navigate, goBack, state,dispatch } = this.props.navigation;
  //   let filteredParams={
  //     from:moment(state.params.day).tz("UTC").startOf('day').toISOString(),
  //     to:moment(state.params.day).tz("UTC").endOf('day').toISOString(),
  //     offset:moment().utcOffset()
  //   }
  // this.props.actions.getActivityLogs(filteredParams,navigate, true).then((data)=>{
  //   this.setState({  loading: false})
  // }).catch((error)=>{
  //   this.setState({  loading: false})
  // });
  // }

  goToSignLog(reviewLogs){
    const {navigate, state} = this.props.navigation;

    if(reviewLogs){
      navigate('SignLog', {day:state.params.day,reviewLogId:reviewLogs._id,reviewLogs:reviewLogs})
    }else {
      Toast.show('Please Review Log.')
    }
  }
  checkIsFormFilled(errors,logInfo){
      return errors && errors.length>0 && logInfo && !logInfo.reviewLogs
  }
  checkIsLogSigned(errors,logInfo){
    let flag=false
    if(errors && errors.length>0 && logInfo){
      if(!logInfo.reviewLogs || (logInfo.reviewLogs && !logInfo.reviewLogs.signature)){
        flag=true
      }

    }else {
      flag=false
    }
    return flag
  }

  titleDate(date){
    return moment(date).tz("UTC").format('dddd MMM DD')
  }
  getDSTBias(tz) {
    var janOffset = moment.tz({month: 0, day: 1}, tz).utcOffset();
    var junOffset = moment.tz({month: 5, day: 1}, tz).utcOffset();
    return Math.abs(junOffset - janOffset);
}

  getTime(date,day){
    if(moment(day).isDST()){
      return moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('hh:mm a')

    }
    return moment(date).format('hh:mm a')
  }

  calculateTotalTymebByStatus(status,format){
    const { navigate, state } = this.props.navigation;
    let self=this;
    let endDateTime=moment(state.params.day).tz("UTC").endOf('day')._d;
    if(state.params.day==moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()){
       endDateTime=new Date();

    }
    let calcTime = '00:00'
    let totalMinutes = 0;
    if(this.props.activityLog.activityDayLog && this.props.activityLog.activityDayLog.webLogs){

      this.props.activityLog.activityDayLog.webLogs.forEach((log,index)=>{
        if(log.status == status){

          let difference = moment(log.timeEnd || endDateTime).diff(log.timeStart, "minutes");
          totalMinutes += difference;
          if(index==self.props.activityLog.activityDayLog.webLogs.length-1){
            totalMinutes=totalMinutes+1;
          }
        }
      });
      let h = Math.floor(totalMinutes / 60);
      let m = totalMinutes % 60;
      if(m==59){
        h=h+1;
        m=0;
      }
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      calcTime = h + ':' + m;

    }
    if(format=="time"){
      return calcTime;

    }else if (format=="minutes") {
      return totalMinutes;

    }else {
      return ''
    }
  }

  calculateTotalTymebByStatusOfLog(startTime, endtime){
    if(moment(startTime).isDST()){
      startTime=moment(startTime).add('minutes',this.getDSTBias(moment.tz.guess()));
    }
    if(moment(endtime).startOf('day').isDST()){
      endtime=moment(endtime).add('minutes',this.getDSTBias(moment.tz.guess()));
    }
    const { navigate, state } = this.props.navigation;
    let endDateTime=moment(state.params.day).tz("UTC").endOf('day')._d;
    if(state.params.day==moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()){
       endDateTime=new Date();

    }

    let calcTime = '00:00';
    let difference = moment(endtime || endDateTime).diff(startTime, "minutes");
    let h = Math.floor(difference / 60);
    let m = difference % 60;
    if(m==59){
      h=h+1;
      m=0;
    }
    calcTime = h + 'hr '+(m>0?  m + 'min' : '');
      return calcTime;
  }

  getStatuscolor(status){
    let color = '#c1c7c9';
    if(status == 'ON'){
      color = '#efc764';
    }
    else if(status == 'OFF'){
      color = '#c1c7c9';
    }
    else if(status == 'D'){
      color = '#a5ef64';
    }
    else if(status == 'SL'){
      color = '#4286f4';
    }
    return color;
  }
  approveOrRejectWebLog(isApprove){
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    let data={}
    data['_id']=this.props.activityLog.activityDayLog._id;
    data['isApprove']=isApprove;
    AsyncStorage.getItem('@Axle:token')
        .then(function(token){
            HTTP('put', '/driver/approveWebLog', data, {authorization: "Bearer "+token})
              .then((response) => {
                if(response.data.error){
                  Toast.show(response.data.message);
                }
                else {
                  if(isApprove){
                    Toast.show('Log approved.')
                  }else {
                    Toast.show('Log Rejected')
                  }
                  navigate('ActivityLog', {day:state.params.day, nextDayLog:state.params.nextLog})
                }
              }).
              catch((err)=>{
                Toast.show(err.message)

              })
      })
  }





  statusMap(status){
    return driverStatus[status];
  }

  render() {
    console.log(this.props.activityLog.activityDayLog, 'activityDayLog....................................................................');
    let self=this;
    const { navigate, state, goBack,dispatch } = this.props.navigation;
    let dataForGraph = [];
    if (!this.state.loading && this.props.activityLog.activityDayLog && this.props.activityLog.activityDayLog.webLogs) {
      this.props.activityLog.activityDayLog.webLogs.forEach((log) =>{
        let data = {}
        let time;
        let status;
        if (log.status === 'ON') {
          status = 4
        }
        if (log.status === 'OFF') {
          status = 3
        }
        if (log.status === 'D') {
          status = 2
        }
        if (log.status === 'SL') {
          status = 1
        }
        data ={
          time,
          status
        }
        let endDateTime=moment(state.params.day).endOf('day')._d;
         if(state.params.day==moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()){
            endDateTime= new Date();
         }
         let __timeStart=log.timeStart
         let __timeEnd=log.timeEnd || endDateTime;
         if(moment(log.timeStart).isDST()){
           __timeStart= moment(log.timeStart).add('minutes',this.getDSTBias(moment.tz.guess())*-1)
         }
         if(moment(log.timeEnd || endDateTime).isDST()){
           __timeEnd= moment(log.timeEnd || endDateTime).add('minutes',this.getDSTBias(moment.tz.guess())*-1)
         }
        dataForGraph.push({
          time:moment(__timeStart).hour() + (moment(__timeStart).minute()/60) + (moment(__timeStart).second()/(60*60)),
          status: status
        }, {
          time:moment(__timeEnd).hour() + (moment(__timeEnd).minute()/60) + (moment(__timeEnd).second()/(60*60)),
          status: status
        });
      })
    }
    dataForGraph.sort((a, b) => a.time -b.time);
    let endDateTime=moment(state.params.day).tz("UTC").endOf('day')._d;
    if(state.params.day==moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()){
       endDateTime=new Date();
    }

  let __AllCombinedErrors=[]
  if(this.props.activityLog.activityDayLog){
    __AllCombinedErrors=getOnedayErrors(this.props.activityLog.activityDayLog,state.params.nextDayLog)

  }
    return(
      <View style={s.Container}>
        <View style={[{backgroundColor:common.blackColor, height: 55 , flexDirection:'row'}]}>
          <TouchableHighlight onPress={() => {goBack()}} underlayColor="transparent" style={[{flex:0.1,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Close_White}
            />
          </TouchableHighlight>
          <View style={[{backgroundColor:common.blackColor,height: 55, alignItems:'flex-end',marginRight:10,justifyContent:'center',flex:0.6}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>{this.titleDate(state.params.day)}</Text>
          </View>

        </View>
        <View style={{height : (window.height)-55}}>
          <ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={s.statusContainer}>
                <Text style={s.statusIndicatorVal}>{this.calculateTotalTymebByStatus('D','time')}</Text>
                <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.calculateTotalTymebByStatus('D','minutes')} total={660} totalWidth={60} /></View>
                <Text style={s.statusIndicatorText}>DRIVING</Text>
              </View>
              <View style={s.statusContainer}>
                <Text style={s.statusIndicatorVal}>{this.calculateTotalTymebByStatus('ON','time')}</Text>
                <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.calculateTotalTymebByStatus('ON','minutes')} total={840} totalWidth={60} /></View>
                <Text style={s.statusIndicatorText}>ON DUTY</Text>
              </View>
              <View style={s.statusContainer}>
                <Text style={s.statusIndicatorVal}>{this.calculateTotalTymebByStatus('SL','time')}</Text>
                <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.calculateTotalTymebByStatus('SL','minutes')} total={120} totalWidth={60} /></View>
                <Text style={s.statusIndicatorText}>SLEEPER BERTH</Text>
              </View>
              <View style={s.statusContainer}>
                <Text style={s.statusIndicatorVal}>{this.calculateTotalTymebByStatus('OFF','time')}</Text>
                <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.calculateTotalTymebByStatus('OFF','minutes')} total={480} totalWidth={60} /></View>
                <Text style={s.statusIndicatorText}>OFF DUTY</Text>
              </View>
            </View>

          {/*  <View style={s.editLogView}>

              <TouchableHighlight underlayColor={common.tuchableUnderlayGreenColor} style={[{justifyContent:'center',alignItems:'center',marginHorizontal:20}]}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <View style={{flexDirection:'row', alignItems:'center', marginTop:4}}><Text style={{color:common.blackColor,fontSize:13}}>LOG</Text>{__AllCombinedErrors.length > 0 && <Icon name="exclamation-circle" color={'red'} size={16} style={{paddingLeft:10}}/>}</View>
                  <View style={{width:48, borderColor:common.greenColor, borderWidth:1,marginTop:4}}></View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {navigate('ReviewLog', {day:state.params.day,carrierInfo:this.props.activityLog.carrierInfo, reviewLogs: this.props.activityLog.activityDayLog.reviewLogs ?this.props.activityLog.activityDayLog.reviewLogs: null })}} underlayColor={common.tuchableUnderlayGreenColor} style={[{justifyContent:'center',alignItems:'center',marginHorizontal:20,paddingLeft:5,paddingRight:5}]}>
                <View style={{flexDirection:'row'}}><Text style={{color:common.blackColor,fontSize:13}}>FORM</Text>{this.checkIsFormFilled( __AllCombinedErrors,this.props.activityLog.activityDayLog) && <Icon name="exclamation-circle" color={'red'} size={16} style={{paddingLeft:10}}/>}</View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.goToSignLog(this.props.activityLog.activityDayLog.reviewLogs ?this.props.activityLog.activityDayLog.reviewLogs: null )}}
              underlayColor={common.tuchableUnderlayGreenColor} style={[{justifyContent:'center',alignItems:'center',marginHorizontal:20,paddingLeft:5,paddingRight:5}]}>
                <View style={{flexDirection:'row'}}><Text style={{color:common.blackColor,fontSize:13}}>SIGN</Text>{this.checkIsLogSigned( __AllCombinedErrors,this.props.activityLog.activityDayLog) && <Icon name="exclamation-circle" color={'red'} size={16} style={{paddingLeft:10}}/>}</View>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => {navigate('EditDVIR')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{justifyContent:'center',alignItems:'center',marginHorizontal:20}]}>
                <View style={{}}><Text style={{color:common.blackColor,fontSize:13}}>DVIR</Text></View>
              </TouchableHighlight>
            </View>
            */}
            <View style={{flex:1}}>
              {__AllCombinedErrors.map((error, i) => {
                return (
                  <View key={i} style={{flexDirection:'row',backgroundColor:common.whiteColor, height:40,borderBottomWidth:1, borderColor:'#D8D8D8', alignItems:'center', padding:5, borderTopWidth:i == 0 ? 1:0}}>
                    <Icon name="exclamation-circle" size={14} color={'red'} style={{}}/>
                    <TouchableOpacity style={{flex:1, paddingLeft:14}}>
                      <Text style={{color:common.blackColor, fontSize:14, paddingTop:0, color:'red'}}>{error}</Text>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
             {dataForGraph.length > 0 &&
              <View style={{flex:1}}>
                  <GraphComponent data={dataForGraph} navigationValue={this.props.navigation}/>
              </View>
            }
            {this.state.loading && <View style={{flex:1, backgroundColor:'#efefef'}}><ActivityIndicator
              animating={true}
              style={[{height: 80}]}
              size="large"
              color = {common.greenColor}
            /></View>}
            {!this.state.loading && this.props.activityLog.activityDayLog && this.props.activityLog.activityDayLog.webLogs && this.props.activityLog.activityDayLog.webLogs.length>0 && <View style={{backgroundColor:common.whiteColor}}>
                <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{height:30,backgroundColor:common.greenColor,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
                  <View><Text style={{color:common.whiteColor,fontSize:18}}>Edited By : {this.props.activityLog.carrierInfo.name}</Text></View>
                </TouchableHighlight>
              </View>
            }
            {!this.state.loading && this.props.activityLog.activityDayLog && this.props.activityLog.activityDayLog.webLogs && this.props.activityLog.activityDayLog.webLogs.map((logData, index)=>{
              return (
                <View>

                  {true && <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{}]}>
                  <View style={[s.mainSection, ]}>
                    <View style={s.indexSection}>
                      <Text style={s.index}>{index}</Text>
                    </View>
                    <View style={s.leftSection}>
                      <View style={[s.statusRoundView,{backgroundColor:'#c1c7c9'}]}>
                        <Text style={{fontWeight:'bold'}}>{logData.status}</Text>
                      </View>
                    </View>
                    <View style={s.rightSection}>
                      <View style={s.timeLineView}>
                        <Text style={s.timeText}>{this.getTime(logData.timeStart,logData.day)}</Text>
                        <Text style={s.durationText}>{this.calculateTotalTymebByStatusOfLog(logData.timeStart, logData.timeEnd)}</Text>

                      </View>
                      <View style={{paddingLeft:7}}>
                        <Text style={{paddingTop:2}}>{this.statusMap(logData.status)}</Text>
                        {logData.location ?
                          <Text style={s.locationInfo}><Icon name="map-marker" size={18} /> {logData.location.address.split(',').slice(0,2).join(',')}</Text>
                          :null
                        }
                      </View>
                    </View>

                  </View>
                  </TouchableHighlight>
                }
                  </View>
               )
              })
            }
            <View style={{backgroundColor:common.whiteColor,alignItems:'center',justifyContent:'center',flexDirection:'row',paddingTop:30,paddingBottom:50}}>
                <TouchableHighlight onPress={() => {this.approveOrRejectWebLog(false)}} underlayColor="transparent" style={[{alignItems:'center',justifyContent:'center',backgroundColor:'red',width:50,height:50,borderRadius:25,marginRight:20}]}>
                  <View style={{}}>
                    <Icon name="times" color={'white'} size={18} style={{}}/>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.approveOrRejectWebLog(true)}} underlayColor={common.tuchableUnderlayGreenColor} style={[{alignItems:'center',justifyContent:'center',backgroundColor:common.greenColor,width:50,height:50,borderRadius:25,marginLeft:20}]}>
                  <View style={{}}>
                  <Icon name="check" color={'white'} size={18} style={{}}/>
                  </View>
                </TouchableHighlight>
            </View>
        {/*  <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
            <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:50}]}>
              <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>+ Add Event</Text>
              </View>
            </TouchableHighlight>
          </View>
          */}
          </ScrollView>

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
  actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    statusContainer:{
      marginHorizontal:10,
      marginBottom:10
    },
    statusIndicatorVal:{
      fontSize:15,
      color:common.whiteColor,
      fontWeight:'bold',
      marginBottom:5
    },
    statusIndicatorBorder:{
      height:5,
      borderColor:common.whiteColor,
      borderWidth:0.2,
      width:61
    },
    statusIndicatorInner:{
      height:5,
      backgroundColor:common.greenColor,

    },
    statusIndicatorText:{
      fontSize:12,
      color:common.whiteColor,
      marginTop:5
    },
    editLogView:{
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:common.whiteColor,
      height:35
    },
    mainSection:{
      backgroundColor:'#FFFFFF',flexDirection:'row',height:90,
      borderWidth:0.9,
      paddingTop:4,
      borderColor:'#d5dde0'
    },
    indexSection:{
      flex:0.04,
      backgroundColor: '#FFFFFF',
    },
    leftSection:{
      flex:0.2,backgroundColor:'#FFFFFF',
      backgroundColor: '#FFFFFF'
    },
    rightSection:{
      flex:0.75,
      backgroundColor: '#FFFFFF'
    },
    index:{
      fontSize:15,
      marginLeft:4,
      fontWeight:'bold'
    },
    statusRoundView:{
      width:50,height:50,borderRadius:25,marginLeft:10,marginTop:12,alignItems:'center',justifyContent:'center'
    },
    timeLineView:{
      flexDirection:'row', justifyContent:'space-between'
    },
    timeText:{
      color:'black',fontSize:20,paddingLeft:7,fontWeight:'bold'
    },
    durationText:{
      color:'black',fontSize:15,paddingLeft:7,fontWeight:'bold'
    },
    locationInfo:{
      borderRadius:20,paddingLeft:0,paddingRight:10,paddingTop:2,paddingBottom:2,
      color:'#caced1'
    },
    currentInfo:{
      backgroundColor:'#ce374b',borderRadius:20,paddingLeft:10,paddingRight:10,paddingTop:2,paddingBottom:2,
      color:common.whiteColor
    },
    verticleLine:{
      height:30,
      width:3,
      backgroundColor:'#c1c7c9',
      justifyContent:'center',
      alignItems:'center'
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
            getActivityLogs,
            getUserDetails
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditedActivityLog);
