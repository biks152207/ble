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
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Toast from 'react-native-simple-toast'
import PercentageCircle from 'react-native-percentage-circle';
import images from './../../config/images';

// Eld Records
import {ProcessEldData} from '../../EldBLEClasses/ProcessEldData'
import * as bleDummyData from './bleDummyData'
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import BackgroundGeolocation from "react-native-background-geolocation";
import { HTTP } from './../../utils/HTTP';
import { getActivityLogs } from './../../actions/activity';
import { searchPlaces,getPlace,getOnedayErrors,getRandomInt } from './../../utils/utility';
import  './../../utils/linq.min.js';
import Drawers from './../../components/SideMenu/Drawer.js';
import { Ble } from './ble'
const firebase = require("firebase");
import firebaseApp from './../../config/firebase.js';

import { AlertInfo } from './../../utils/AlertInfo';

import  SuggestLocation from '../Common/SuggestLocation';
import LineProgressBar from './../../layouts/common/LineProgressBar/LineProgressBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { EldBroadcast } from '../../EldBLEClasses/EldBroadcast';
import { EldBufferRecord } from '../../EldBLEClasses/EldBufferRecord';
import { EldDataRecord } from '../../EldBLEClasses/EldDataRecord';
import SimpleModal from 'react-native-simple-modal';
//import { setTimeout } from 'timers';

let window = Dimensions.get("window");
let timer;
let __exclamationErrors={};
const LocalStyles=StyleSheet.create({
  switchBackground: {
    width: 35,
    height: 21,
    borderRadius: 10,
  },
  switchOnOffView: {
    backgroundColor: common.whiteColor,
    width: 20.22,
    height: 19.97,
    borderRadius: 10,
  },
  switchOn: {
    alignSelf: 'flex-end',
  },
  switchOff: {
    alignSelf: 'flex-start',
  },
  switchOnBackground: {
    backgroundColor: common.greenColor,
  },
  switchOffBackground: {
    backgroundColor: common.grayColor,
  },
})


class ActivityStatus extends Component {
  constructor(props) {

    super(props);
    moment.tz.setDefault(props.auth.user.driver.homeTerminalTimezone);
    this.barWidthTotal=window.width*0.5;
    this.barWidthActivityTotal=window.width-15;
    __exclamationErrors={}
    // TODO: Remove
    // Dummy data for BLE
    this.messageBuffer = '';
    this.sequenceNumber = 0;
    this.lastSequenceNumber = -97;
    this.dummyCounter = 0;
    // Dummy data
    this.prevLatitude =0.0;
    this.prevLongitude=0.0;
    this.dayDrivingLimit=11*60;
    this.dayOnLimit=14*60;
    this.dayOffSlLimit=10*60;
    this.maxShiftLimit=14*60;
    this.restBreakLimit=30;
    this.untilBreakLimit=8*60;
    this.consecutiveDriveLimit=8*60;
    this.weekOnDrivingLimit=60*60;
    this.lastConsideredLog=undefined;
   this.OffPersonalConveyance=false;
   this.currentSpeed = null;
    this.filteredParams={
      from:moment().add('minutes',moment().utcOffset()).tz("UTC").add('days',-8).startOf('day').toISOString(),
      to:moment().add('minutes',moment().utcOffset()).tz("UTC").endOf('day').toISOString(),
      offset:moment().utcOffset()
    }
    this.lastUpdatedTrackingTime=moment().tz("UTC");
    this.state = {
      changeStatusModal:false,
      connectELDModal:false,
      notes:'',
      eldConnected:false,
      currentStatus:'OFF',
      tempCurrentStatus:'OFF',
      isMoving:false,
      idleTimer:0,
      movementStatus:'',
      lat:'',
      lng:'',
      location:'',
      suggestions: [],
      searching: false,
      remainUntilBreakLimit:this.untilBreakLimit,
      untilBreakBarWidth:0,
      remainDriveLimitPerWeek:this.weekOnDrivingLimit,
      remainShiftLimitToday:this.maxShiftLimit,
      dayDrivingLimit:this.dayDrivingLimit ,
      dayOnLimit:this.dayOnLimit,
      dayOffSlLimit:this.dayOffSlLimit ,
      isOpen: false,
      clockTime:0,
      isStationary: false,
      openStationaryModal: false,
      timer: 0,
      ONYardMoves:false
    }
    this.ble= Ble;
    this.sendRequestRange = this.sendRequestRange.bind(this);

    this.processEldData = ProcessEldData;
    this.eldDataRecord = EldDataRecord;
    this.eldBufferRecord = EldBufferRecord;
    this.eldBroadcast = EldBroadcast;
    this.dummyData = bleDummyData;
    this.closeDrawer = this.closeDrawer.bind(this);
    this.changeStatusModal = this.changeStatusModal.bind(this);
    this.connectELDModal = this.connectELDModal.bind(this);
    this.connectELDDevice = this.connectELDDevice.bind(this);
    this.formatStatusIcon = this.formatStatusIcon.bind(this);
    this.activeStatus = this.activeStatus.bind(this);
    this.changeTempCurrentStatus = this.changeTempCurrentStatus.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.stopTracking=this.stopTracking.bind(this)
    this.renderActivityChart=this.renderActivityChart.bind(this);
    this.bluetoothDataReceived=this.bluetoothDataReceived.bind(this);
    this.stripSequenceNumberAndProcessMessage=this.stripSequenceNumberAndProcessMessage.bind(this);
    this.setPickupLocation = this.setPickupLocation.bind(this);
    this.searchPickUpLocation = this.searchPickUpLocation.bind(this);
    this.myLocation = this.myLocation.bind(this);
    this.calculateWeekLog=this.calculateWeekLog.bind(this);
    //this.changeDrawerStatus = this.changeDrawerStatus.bind(this);
    this.renderDuty = this.renderDuty.bind(this);

    this.navigateToError = this.navigateToError.bind(this);
    this.logConsole = this.logConsole.bind(this);
   this.bleRandomData=this.bleRandomData.bind(this);
   this.formatAddLog=this.formatAddLog.bind(this);
   this.openTimer = this.openTimer.bind(this);
  }

  openTimer() {
    this.setState({openStationaryModal: true})
    const interval = setInterval(() => {
      this.setState({timer: this.state.timer + 1})
      if (this.state.timer === 60) {
        this.setState({currentStatus: 'ON', openStationaryModal: false, isStationary: false, timer: 0})
        clearInterval(interval);
      }
    }, 1000);

  }

  logConsole(data){
          //if(data){
          //  firebase.database().ref('logConsole').push({
          //        date:moment().format('LLL'),
          //        msg: JSON.stringify(data),
          //       })
          //      }
          console.log(data);
  }


  // Callback function for Blutooth Low Energy class. Whenever data is
  // received from the ELD device this function will receive it
  bluetoothDataReceived(data) {
      // Get data into array
      var array=data.value;
      this.sequenceNumber = array[0]
      var result="";
      array.forEach((d)=>{
      result=result+String.fromCharCode(d)
      })

      //Combine or seperate packets based on New line markers
      this.messageBuffer += result.substring(1)
      let newLineMarker = this.messageBuffer.indexOf('\r\n')
      if(newLineMarker>0){
        var DataReceived = "";
        DataReceived = this.messageBuffer.substring(0,newLineMarker)
        this.logConsole('[' + DataReceived + ']')
        this.messageBuffer = this.messageBuffer.substring(newLineMarker + 2)
        //this.logConsole('message buffer hold over')
        //this.logConsole('[' + this.messageBuffer + ']')
        this.stripSequenceNumberAndProcessMessage(DataReceived)
      } else {
        //this.logConsole('message buffer contains a partial string: ')
        //this.logConsole('[' + this.messageBuffer + ']')
      }
    }
    // stripSequenceNumberAndProcessMessage()
    //
    // Check for the start of a sequence and
    // strip off the sequence number
    //
    // At the end of this method myMsg will be in the format correct format
    //
    stripSequenceNumberAndProcessMessage(receivedMessage){
      // TODO: figure out how to import this
      var EldBroadcastTypes =
      {
          ELD_BUFFER_RECORD:0,
          ELD_CACHED_RECORD:1,
          ELD_DATA_RECORD:2,
          ELD_UNKNOWN :3,
      }

      let myMsg = receivedMessage
      // Figure out which record type we have
      // this is for the first run... below handles all other runs
      if(this.lastSequenceNumber === -97){
        // TODO: convert to method
        this.logConsole("lastSequenceNumber: " + this.lastSequenceNumber )

        let messageType = this.processEldData.IdentifyBroadcastType(myMsg)
        //this.logConsole("MessageType-1: " + messageType )

        switch(messageType) {
          case 2:{
            /*EldBroadCastTypes.ELD_DATA_RECORD*/
            this.logConsole('Processing: ELD_DATA_RECORD')
            myMsg = this.eldDataRecord.EldDataRecord(myMsg)
            break;
          }
          case 1:{
            /*EldBroadCastTypes.ELD_CACHED_RECORD*/
            this.logConsole('Processing: ELD_CACHED_RECORD');
            myMsg = this.eldBroadcast.EldBroadcast(myMsg)
            this.ble.currentBuffer++;
            if(this.sequenceNUmber < this.ble.bufferEnd){
              this.sendRequest(this.ble.currentBuffer);
            }
            break;
          }
          case 0:{
            /*EldBroadCastTypes.ELD_BUFFER_RECORD*/
            this.logConsole('Processing: ELD_BUFFER_RECORD')
            myMsg = this.eldBufferRecord.EldBufferRecord(myMsg)
            this.ble.bufferStart = myMsg.startSeqNo;
            if(this.ble.currentBuffer == -1){
            this.ble.currentBuffer = myMsg.startSeqNo;
            }
            this.ble.bufferEnd = myMsg.endSeqNo;
            break;
          }
          default:{
            myMsg = 'Unknown: ' + myMsg
            break;
          }
        }

        //this.logConsole(myMsg )
        //this.logConsole(myMsg.toString)
        //toast.show('Seq: ' + this.sequenceNumber + ' Message: ' +myMsg, Toast.SHORT)
        //this.logConsole('Seq: ' + this.sequenceNumber + ' Message: ' +myMsg)
//        firebase.database().ref('ble').push({
  //            response:'Seq: ' + this.sequenceNumber,
    //          date:moment().format('LLL'),
      //        output:myMsg.toString,
        //     })
        this.lastSequenceNumber = this.sequenceNumber;
      }
      else{
        // if(this.sequenceNumber <= this.lastSequenceNumber && !(this.sequenceNumber == 0 && this.lastSequenceNumber == 255)){
          if (0==1) {
          this.logConsole('out of order\n')
          //toast.show('Seq: ' + this.sequenceNumber + 'Out of order.', //toast.SHORT)
          firebase.database().ref('ble').push({
                response:'Seq: ' + this.sequenceNumber,
                date:moment().format('LLL'),
                output:'Out of order',
               })
        } else{
        // TODO: convert to method
        // // Figure out which record type we have

        let messageType = this.processEldData.IdentifyBroadcastType(myMsg)
                //this.logConsole("MessageType-2: " + messageType )
                switch(messageType) {
                  case 2:{
                    /*EldBroadCastTypes.ELD_DATA_RECORD*/
                    this.logConsole('Processing: ELD_DATA_RECORD');
                    myMsg = this.eldDataRecord.EldDataRecord(myMsg);
                    break;
                  }
                  case 1:{
                    /*EldBroadCastTypes.ELD_CACHED_RECORD*/
                    this.logConsole('Processing: ELD_CACHED_RECORD');
                    myMsg = this.eldBroadcast.EldBroadcast(myMsg);
                    this.ble.currentBuffer++;
                    let timeOut = 300;
                    if(this.ble.currentBuffer < this.ble.bufferEnd){
                      let bufferTry = this.ble.currentBuffer;
                      this.sendRequest('9');
                      //setTimeout(()=>{
                      //  if(this.ble.currentBuffer == bufferTry){
                      //    this.ble.currentBuffer++;
                      //    this.sendRequest(this.ble.currentBuffer)
                      //  }
                      //},timeOut)
                    //} else {
                      // TODO: We received all of the buffer messages now delete and reset
                    }
                    break;
                  }
                  case 0:{
                    /*EldBroadCastTypes.ELD_BUFFER_RECORD*/
                    this.logConsole('Processing: ELD_BUFFER_RECORD');
                    myMsg = this.eldBufferRecord.EldBufferRecord(myMsg);
                    // TODO: check that we have completed requesting all records
                    this.ble.currentBuffer = myMsg.startSeqNo;
                    this.ble.bufferEnd = myMsg.endSeqNo;
                    if(this.ble.currentBuffer )
                    break;
                  }
                  default:{
                    myMsg = 'Unknown: ' + myMsg;
                    break;
                  }
                }
                  //toast.show('Seq: ' + this.sequenceNumber + ' Message: ' +myMsg, //toast.SHORT)
          //this.logConsole('Seq-2: ' + this.sequenceNumber + ' Message: ' +myMsg)

//          firebase.database().ref('ble').push({
  //              response:'Seq: ' + this.sequenceNumber,
    //            date:moment().format('LLL'),
      //          output:myMsg.toString,
        //       })
        }
        this.lastSequenceNumber = this.sequenceNumber;
      }
    }

    /**
     * ELD Message examples
     */

     // Send a request for a range of records based on sequence numbers
    async sendRequestRange() {
      let waitTime = 100;
      let writeEnabled = true;
      if(this.ble.bufferStart !== -1 && this.ble.bufferEnd !== -1){
        await this.ble.requestRecord(i);
      } else{
        //toast.show('No buffer sequence numbers.', //toast.SHORT)
      }
    }

    // Send a request for one individual record based on its sequence number
    sendRequest(sequenceNumber) {
        this.ble.requestRecord(sequenceNumber);
    }

    // Delete a request based on its sequence number
    deleteRequest(seqNumber) {
      this.ble.deleteRecord(seqNumber)
    }

    // Delete a range of records based on sequence number
    deleteRecordRange(start, end) {
      this.ble.deleteRange(start,end)
    }

  navigateToError(error) {
    this.props.navigation.navigate('ErrorLog');
  }
  //
  // componentWillReceiveProps(props) {
  //   this.logConsole('props..........................will recceive the prosp', props);
  // }

  // changeDrawerStatus(value) {
  //   this.setState({isOpen: value})
  // }
  changeStatusModal(){
    this.setState({
      changeStatusModal:!this.state.changeStatusModal,
      tempCurrentStatus:this.state.currentStatus
    })
  }


  connectELDModal(){
    let self=this;
    this.ble = new Ble(this.bluetoothDataReceived)
    this.ble.startBLE()
  // it will add new status based on random data
    let bleData = self.bleRandomData();
    bleData.eventType = 5; // login Activity
    bleData.eventCode = 1;
  //  self.checkRulesEld(bleData)
  }

  disConnectELDModal(){
    let self=this;
  // it will add new status based on random data
    let bleData = self.bleRandomData();
    bleData.eventType = 5; // logout Activity
    bleData.eventCode = 2;
    self.checkRulesEld(bleData)
  }

  engineStateUPorShutdown(eventCode){
    let self=this;
  // it will add new status based on random data
    let bleData = self.bleRandomData();
    bleData.eventType = 6;
    bleData.eventCode = eventCode;
    self.checkRulesEld(bleData)
  }

  malFunctionStatusLog(eventCode){
    let self=this;
  // it will add new status based on random data
    let bleData = self.bleRandomData();
    bleData.eventType = 7;
    bleData.eventCode = eventCode;
    self.checkRulesEld(bleData)
  }

  connectELDDevice(){
    this.setState({
      eldConnected:!this.state.eldConnected
    })
  }

  bleRandomData(){
    let engineState=getRandomInt(0,1);
    let speed=getRandomInt(0,25);
    let gpsDate=moment().format("MM/DD/YYYY");
    let gpsTime=moment().format("HH:mm:ss");
    let gpsSpeed=speed;

    let bleResult=engineState+",4V4NC9EJ9DN143335,598,"+speed+",598775.355,0.000,,,,"+gpsDate+","+gpsTime+",40.7310,-74.0385,"+gpsSpeed+",165,6,29,1.7,8788,55";
    let bleArray=bleResult.split(',');
    let outPut={};
    outPut['engineState']=+bleArray[0];
    outPut['vin']=bleArray[1]
    outPut['rpm']=+bleArray[2]
    outPut['speed']=+bleArray[3]
    outPut['odometer']=+bleArray[4]
    outPut['tripDistance']=+bleArray[5]
    outPut['engineHours']=+bleArray[6]
    outPut['tripHours']=+bleArray[7]
    outPut['voltage']=bleArray[8]
    outPut['gpsDate']=bleArray[9]
    outPut['gpsTime']=bleArray[10]
    outPut['isoDateTime']=moment(bleArray[9]+' '+bleArray[10]).toISOString()
    outPut['latitude']=+bleArray[11]
    outPut['longitude']=+bleArray[12]
    outPut['gpsSpeed']=+bleArray[13]
    outPut['course']=bleArray[14]
    outPut['numSats']=bleArray[15]
    outPut['mslAlt']=bleArray[16]
    outPut['dop']=bleArray[17]
    outPut['sequence']=+bleArray[19]
    outPut['firmwareVersion']=bleArray[20]
    return outPut;
  }

  eventAddLog(bleLog, eventType, eventCode){
    bleLog.eventType = eventType;
    bleLog.eventCode = eventCode;
    this.formatAddLog(bleLog)
  }
  formatAddLog(bleLog){
    let self=this;
    let data={};
    // data['currentStatus']=self.state.currentStatus;
    data['day']=moment().tz("UTC").add('minutes',moment().utcOffset()).startOf('day').toISOString();
    data['offset']=moment().utcOffset();
    data['notes']='ble';
    data['logs']={
        "status": bleLog.status,
        "isManual": false,
        "timeStart": moment().tz("UTC").toISOString(),
        "location":{"address": 'manual',"lat": bleLog.latitude, "lng": bleLog.longitude},
        "vin":bleLog.vin,
        "tripDistance":bleLog.tripDistance,
        "engineHours":bleLog.engineHours,
        "tripHours":bleLog.tripHours,
        "isoDateTime":bleLog.isoDateTime,
        "sequence":bleLog.sequence,
        "firmwareVersion":'v 1.0',
        diagnosticEventStatus:false,
        locationDescription:'test location',
        eventRecordOrigin:1,
        eventRecordStatus:1,
        eventType:bleLog.eventType,
        eventCode:bleLog.eventCode,
        malFunctionStatus:false,

     }
     AsyncStorage.getItem('@Axle:token')
         .then(function(token){
             HTTP('post', '/driver/add-logs', data, {authorization: "Bearer "+token})
               .then((response) => {
                 if(response.data.error){

                 }
                 else {
                  //  self.props.actions.getActivityLogs(self.filteredParams,navigate, false).then(()=>{
                   //
                  //    if(self.props.activityLog && self.props.activityLog.activityList)
                  //    {
                  //      let _calculatedLogResult=self.calculateWeekLog(self.props.activityLog.activityList);
                   //
                  //    }else {
                  //      self.setState({currentStatus:'OFF'})
                  //    }
                  //  })
                 }
               }).
               catch((err)=>{

               })
       })

  }

  checkRulesEld(log){
    console.log('called',log);
    // if(!this.lastConsideredLog)
    // {this.lastConsideredLog=log}
    // this.ONYardMoves=false;
    // this.OffPersonalConveyance=false;
    if(log.engineState==1){
      log['status']="ON"
    }else {
      log['status']=this.lastConsideredLog?this.lastConsideredLog.status:"OFF";
    }
    if(log.speed>=5 && !this.state.ONYardMoves){
      log['status']=='D'
    }
    if (log.speed > 0 && this.state.isStationary) {
      this.setState({isStationary: false})
    }
    if(!this.lastConsideredLog){
      // insert first log
      this.lastConsideredLog=log;
      console.log('first log added',log);
      this.formatAddLog(log);
      this.currentSpeed = log.speed;
    }else {
      //check if status changed?
      let duration = moment(log.isoDateTime).diff(this.lastConsideredLog.isoDateTime, "minutes");
      // store the current speed
      this.currentSpeed = log.speed;

      if(log['status']==this.lastConsideredLog.status){
        if(log['status']=="OFF" && duration>=60){
            this.lastConsideredLog=log;
            this.formatAddLog(log);
            console.log('436 insert log',log);
            //add log here
        }else if (log['status']=="SL" && duration>=60) {
            this.lastConsideredLog=log;
            this.formatAddLog(log);
            console.log('440 insert log',log);

            //add log here

        }else if (log['status']=="ON" && duration>=60) {
          this.lastConsideredLog=log;
          this.formatAddLog(log);
          console.log('446 insert log',log);

          //add log here
        }else if (log['status']=="D" && duration>=60) {
          this.lastConsideredLog=log;
          this.formatAddLog(log);
          console.log('451 insert log',log);

          //add log here
        }
        // sets the current status to stationary for speed 0 for 3 sec.
        if (this.lastConsideredLog.speed == 0 && duration >= 0.05 && log['status'] =="D" && this.lastConsideredLog.status == "D") {
          this.setState({ isStationary: true})
        }
        if ((this.currentSpeed === 0) && (duration >= 5)) {
          this.openTimer();
        }
      }else {
        if(this.lastConsideredLog.status=="D" && log['status']=="ON"){
          if(duration>=5){
            this.lastConsideredLog=log;
            this.formatAddLog(log);
            console.log('459 insert log',log);

            //add log here
            // here we can open modal to change status to on or D

          }
        }else if (this.lastConsideredLog.status=="ON" && log['status']=="D") {
          // if(duration>=5){
            this.lastConsideredLog=log;
            this.formatAddLog(log);
            console.log('468 insert log',log);

            //add log here
          // }
        }else {
          this.lastConsideredLog=log;
          this.formatAddLog(log);
          console.log('474 insert log',log);

          //add log here
        }
      }

    }

  }
  notesTextInput(text){
    this.setState({
      notes:text
    })
  }
  formatStatusIcon(status){
    if(status=="SL"){
      return "SL"
    }else {
      return status
    }
  }
  activeStatus(status){
    if(this.state.tempCurrentStatus===status)
    return common.greenColor
    else {
      return common.whiteColor
    }
  }
  changeTempCurrentStatus(status){
    this.setState({
      tempCurrentStatus:status
    })
  }
  myLocation() {

  }

    searchPickUpLocation(location){
      searchPlaces(location)
        .then((response) => {
          if (response.features.length > 0) {
            const suggestions = [...response.features];
            this.setState({suggestions});
          } else {
            this.setState({suggestions: []});
          }
        })
        .catch((error) => {
          this.setState({suggestions: []});
        })

    }
   async setPickupLocation(location) {
     this.setState({
       location:location.place_name,
       lat:location.center[0],
       lng:location.center[1],
       suggestions:[]
     });
   }

  saveStatus(){
    let self=this;
    const { navigate, goBack, state,dispatch } = this.props.screenProps.rootNavigation;
    if(self.state.location){


    this.setState({
      currentStatus:this.state.tempCurrentStatus,
      changeStatusModal:!this.state.changeStatusModal,
      idleTimer:0,
      movementStatus:'',
      isStationary: false

    },()=>{
      let data={};
      // data['currentStatus']=self.state.currentStatus;
      data['day']=moment().tz("UTC").add('minutes',moment().utcOffset()).startOf('day').toISOString();
      data['offset']=moment().utcOffset();
      if(self.state.notes)
      data['notes']=self.state.notes;
      data['logs']={
          "status": self.state.currentStatus,
          "isManual": false,
          "timeStart": moment().tz("UTC").toISOString(),
          "location":{"address": self.state.location,"lat": self.state.lat, "lng": self.state.lng}
       }


      AsyncStorage.getItem('@Axle:token')
          .then(function(token){
              HTTP('post', '/driver/add-logs', data, {authorization: "Bearer "+token})
                .then((response) => {
                  if(response.data.error){

                  }
                  else {
                    self.props.actions.getActivityLogs(self.filteredParams,navigate, false).then(()=>{

                      if(self.props.activityLog && self.props.activityLog.activityList)
                      {
                        let _calculatedLogResult=self.calculateWeekLog(self.props.activityLog.activityList);

                      }else {
                        self.setState({currentStatus:'OFF'})
                      }
                    })
                  }
                }).
                catch((err)=>{

                })
        })

    })
  }else {
    AlertInfo('please select Location');
  }
  }


  startTracking(){
    let self=this;
          BackgroundGeolocation.removeAllListeners();
          BackgroundGeolocation.watchPosition((location)=>{

            // is_moving
          if(this.prevLatitude!=location.coords.latitude || this.prevLongitude!=location.coords.longitude){
             this.prevLatitude=location.coords.latitude;
             this.prevLongitude=location.coords.longitude;
             this.lastUpdatedTrackingTime=moment().tz("UTC");
            // updateDriverLocation(location);
            self.setState({movementStatus:'IN MOTION'})

          }else {
            self.setState({movementStatus:'STATIONARY'})
            // let currentTime=moment();
            // let duration = moment.duration(currentTime.diff(this.lastUpdatedTrackingTime));
            // let minutes = duration.asMinutes();
            // if(minutes>=5){
            //
            // }
          }
          },(err)=>{
            this.logConsole(err);
          })
  }
  stopTracking(){
    BackgroundGeolocation.removeAllListeners();
  }
  getCycleLimitValues(allLogs){

    let tempLog = [];
    let combinedLog=[]
    if(allLogs && allLogs.length>0){
      allLogs.forEach((dayLog)=>{
        tempLog = tempLog.concat(dayLog.logs)
      });
    }

    let sortedLogHistory = tempLog.sort(function(a, b) {
      return new Date(b.timeStart) - new Date(a.timeStart);
    });

    sortedLogHistory.forEach((_log, k) => {
      if ((["ON", "D"]).indexOf(_log.status) > -1) {
        _log['combinedStatus'] = 'ON-D';
      } else {
        _log['combinedStatus'] = 'OFF-SL';
      }
      combinedLog.push(_log)
    });
    let isOneDayCycleComplete = false;
    let isWeekCycleComplete = false;

    let consOffSlDuration = 0;
    let oneDay_Cycle_Drive=0;
    let week_Cycle_Drive=0;
    let consiCutiveOFF_SL_Hours = 0;
    let total_D_day_drive=0;
    let total_ON_day_drive=0;
    let total_D_week_drive=0;
    let total_ON_week_drive=0;
    let untilBreack_limit_drive=0;
    let partialOFFSLBreak=0;
    let isBreakFound=false;
    combinedLog.forEach((log, k) => {
      let endDateTime = moment(log.day).tz("UTC").endOf('day')._d;
      if (log.day == moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()) {
        endDateTime = new Date();
      }
      let duration = moment(log.timeEnd || endDateTime).diff(log.timeStart, "minutes");


      if(!isBreakFound){
          if (log.combinedStatus == "ON-D") {
            untilBreack_limit_drive=untilBreack_limit_drive+duration;
          }else {
              partialOFFSLBreak+=duration
            if(partialOFFSLBreak>=30){
              isBreakFound=true;
            }

          }

      }






      if (log.combinedStatus == "OFF-SL") {
        consiCutiveOFF_SL_Hours = consiCutiveOFF_SL_Hours + duration
      } else {

          consiCutiveOFF_SL_Hours = 0;

      }
      if(!isOneDayCycleComplete)
      {
        if(log.status=="ON"){total_ON_day_drive=total_ON_day_drive+duration}
        if(log.status=="D"){total_D_day_drive=total_D_day_drive+duration}
      }
      if(!isWeekCycleComplete)
      {
        if(log.status=="ON"){total_ON_week_drive=total_ON_week_drive+duration}
        if(log.status=="D"){total_D_week_drive=total_D_week_drive+duration}
      }

      if (consiCutiveOFF_SL_Hours > 10 * 60) {
        isOneDayCycleComplete=true
      }
      if (consiCutiveOFF_SL_Hours > 34 * 60) {
        isWeekCycleComplete=true
      }
    });
    let remainDayLimit=this.maxShiftLimit-total_ON_day_drive-total_D_day_drive;
    let remainWeekLimit=this.weekOnDrivingLimit-total_ON_week_drive-total_D_week_drive;
    let remainDriveLimitToday=this.dayDrivingLimit-total_D_day_drive;

    let remainUntillBreak=this.untilBreakLimit - untilBreack_limit_drive;
    if(remainDriveLimitToday<remainUntillBreak){
      remainUntillBreak=remainDriveLimitToday;
    }
    let result={
      'remainDayLimit':remainDayLimit>0?remainDayLimit:0,
      'remainWeekLimit':remainWeekLimit>0?remainWeekLimit:0,
      'remainDriveLimitToday':remainDriveLimitToday>0?remainDriveLimitToday:0,
      'remainUntillBreak':remainUntillBreak>0?remainUntillBreak:0
    }

    return result
  }
  calculateWeekLog(allLogs){
    let self=this;

    if(timer){
        clearInterval(timer);
    }
    if(allLogs.length>0)
    {

      let lastUpdatedLog=allLogs[0];
      let newStatus=lastUpdatedLog.currentStatus;
      let getCycleLimitValues=this.getCycleLimitValues(allLogs);

      let stateToUpdate={
        currentStatus:lastUpdatedLog.currentStatus,
        remainDriveLimitPerWeek:getCycleLimitValues.remainWeekLimit,
        remainShiftLimitToday:getCycleLimitValues.remainDayLimit,
        remainUntilBreakLimit:getCycleLimitValues.remainUntillBreak,
        clockTime:getCycleLimitValues.remainDriveLimitToday
      }
    if (newStatus=="ON") {
        timer= setInterval(()=>{
        self.setState({
          'clockTime':(self.state.clockTime-1)>0?(self.state.clockTime-1):0,
          'remainUntilBreakLimit':(self.state.remainUntilBreakLimit-1)>0?(self.state.remainUntilBreakLimit-1):0,
          'remainShiftLimitToday':(self.state.remainShiftLimitToday-1)>0 ? (self.state.remainShiftLimitToday-1):0,'remainDriveLimitPerWeek':(self.state.remainDriveLimitPerWeek-1)>0?(self.state.remainDriveLimitPerWeek-1):0});
        },60000)
      }else if (newStatus=="D") {
        timer= setInterval(()=>{
          self.setState({'remainUntilBreakLimit':(self.state.remainUntilBreakLimit-1)>0?(self.state.remainUntilBreakLimit-1):0,'clockTime':(self.state.clockTime-1)>0?(self.state.clockTime-1):0,'remainShiftLimitToday':(self.state.remainShiftLimitToday-1)>0?(self.state.remainShiftLimitToday-1):0
          ,'remainDriveLimitPerWeek':(self.state.remainDriveLimitPerWeek-1)>0?self.state.remainDriveLimitPerWeek-1:0});
        },60000)
      }
      this.setState(stateToUpdate)

    }else {
      this.setState({currentStatus:'OFF'})
    }
    return {}
  }
  componentWillReceiveProps(nextProps) {

  }


  componentWillMount(){
    let self=this;

    let startDayOfWeek=moment().tz("UTC").startOf('week').add('days',1)._d;
    const { navigate, goBack, state,dispatch } = this.props.screenProps.rootNavigation;
    if(!this.props.auth.user.driver.homeTerminalTimezone){
      AlertInfo('You must need to set Home Terminal timezone first')
      navigate('UserInfo')
      return
    }

    this.setState({idleTimer:0})

    getPlace((result)=>{
      let address=''
      let lat=0.0;
      let lng=0.0;
      result.data.features.forEach((feature)=>{
              if(feature.id.indexOf('place')==0){
                address = feature.place_name;
                lat=feature.center[1]
                lng=feature.center[0]
              }
      });
      this.setState({
          lat:lat,
          lng:lng,
          location:address
      })
      })
      // let filteredParams={
      //   from:moment().add('days',-7).startOf('day').toISOString(),
      //   to:moment().endOf('day').toISOString(),
      //
      // }

  this.props.actions.getActivityLogs(this.filteredParams,navigate, false).then(()=>{

    if(self.props.activityLog && self.props.activityLog.activityList)
    {
      self.weekOnDrivingLimit = self.props.activityLog.driverInfo && self.props.activityLog.driverInfo.driver && self.props.activityLog.driverInfo.driver.primaryCycle ? +self.props.activityLog.driverInfo.driver.primaryCycle.split('_')[0]*60 :self.weekOnDrivingLimit;
      let _calculatedLogResult=self.calculateWeekLog(self.props.activityLog.activityList);

    }else {
      self.setState({currentStatus:'OFF'})
    }
  });

  }



  renderActivityChart(logs){
    let self=this;
    if(logs)
    {
      let OnStatusLogs=logs.filter((obj,j)=>{
        return obj.status==="ON"
      })
      let OffStatusLogs=logs.filter((obj,j)=>{
        return obj.status==="OFF"
      })
      let SleeperStatusLogs=logs.filter((obj,j)=>{
        return obj.status==="SL"
      })
      return (
        <View>
        <View style={{flexDirection:'row'}}>
          {OnStatusLogs.map((activity,i)=>{
            return (<View style={self.drawLine(OnStatusLogs,i)}></View>)
          })
          }
        </View>
        <View style={{flexDirection:'row'}}>
          {OffStatusLogs.map((activity,i)=>{
            return (<View style={self.drawLine(OffStatusLogs,i)}></View>)
          })
          }
        </View>
        <View style={{flexDirection:'row'}}>
          {SleeperStatusLogs.map((activity,i)=>{
            return (<View style={self.drawLine(SleeperStatusLogs,i)}></View>)
          })
          }
        </View>
        </View>
      )
    }else {
      return (<View></View>)
    }

  }
  titleDate(date){
    return moment(date).tz("UTC").format('ll')
  }
  remainTimeFormatShow(minutes,format){
    let isNegativeMinute='';
    if(minutes<0){
      isNegativeMinute='-';
      minutes=minutes*-1
    }
    let hour= parseInt(minutes/60);
    let remainminutes= parseInt(minutes%60);
    if(hour<10){
      hour="0"+hour;
    }
    if(remainminutes<10){
      remainminutes="0"+remainminutes;
    }
    if(format=='time'){
      return isNegativeMinute+' '+hour+':'+remainminutes

    }else if(format="minutes") {
      return minutes
    }else {
      return ''
    }
  }
  calculateTotalHoursFromDay(log){
    totalTime=0;
    if(!log.noData){
      log.logs.forEach((loginfo,j)=>{
        //if(loginfo.status=="ON" ||loginfo.status=="D" ){
        if(loginfo.status=="ON" || loginfo.status=="D" ){
          let duration=moment(loginfo.timeEnd || new Date()).diff(loginfo.timeStart, "minutes");
          //moment.duration(moment(loginfo.timeEnd || new Date()).diff(loginfo.timeStart)).asMinutes()
          totalTime=totalTime+duration;
        }
      })

    }
    let calcTime = '00:00';
   let h = Math.floor(totalTime / 60);
   let m = totalTime % 60;
   if(m==59){
     h=h+1;
     m=0;
   }
   calcTime = h + 'hr '+(m>0?  m + 'min' : '');
     return calcTime;

  }

  renderEachDateLog(log,nextLog){
    let self=this;
    let exclamationError=false;
    const { navigate, goBack, state,dispatch } = this.props.screenProps.rootNavigation;
    let endDateTime=moment(log.day).tz("UTC").endOf('day')._d;
    if(log.day==moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()){

       endDateTime=new Date();
     }
    let statusWiseTotalTime={ OFF:0,ON:0,SL:0,D:0 }
    let statusWiseTotalConsecutiveTime={ OFF:0,ON:0,SL:0,D:0 }
    let exclamationErrors=[];

    log.logs && log.logs.forEach((details,k)=>{
      let isConsecutive = false;
      let _timeElapse=moment(details.timeEnd || endDateTime).diff(details.timeStart, "minutes");
      let currentElapse=moment(details.timeEnd).diff(details.timeStart, "minutes");
      statusWiseTotalConsecutiveTime[details.status] += (currentElapse);


      if(nextLog && k==log.logs.length-1 && nextLog.logs && nextLog.logs[0].status==details.status){
        let sameStatusFound=true, prevConsStatus = false, nextConsStatus = false;

        if(log.logs[k-1] && details.status == log.logs[k-1].status){
          prevConsStatus = true;
          let consElapse=moment(details.timeStart).diff(log.logs[k-1].timeEnd, "minutes");
          statusWiseTotalConsecutiveTime[details.status] += (consElapse);
        }
        else{
          if(details.status == 'D'&&statusWiseTotalConsecutiveTime[details.status] < 8*60){
            //statusWiseTotalConsecutiveTime[details.status]= 0;
          }
          else{
            //statusWiseTotalConsecutiveTime[details.status]= 0;
          }
          //statusWiseTotalConsecutiveTime[details.status]= 0;
        }
        let _timeEnd=nextLog.logs[0].timeEnd
        nextLog.logs.forEach((nextDayLog,index)=>{
          if(nextDayLog.status==details.status && sameStatusFound){
            isConsecutive = true;
            nextConsStatus = true
             _timeEnd=nextDayLog.timeEnd;
             let consElapse=moment(nextDayLog.timeEnd).diff(nextDayLog.timeStart, "minutes");
             statusWiseTotalConsecutiveTime[details.status] += consElapse;
          }else {
            sameStatusFound=false
          }

        })
        if(prevConsStatus == true || nextConsStatus == true){

        }
        else{
          //statusWiseTotalConsecutiveTime[details.status]= 0;
        }
        _timeElapse=moment(_timeEnd).diff(details.timeStart, "minutes");

      }
      if(details.status == 'D'&&statusWiseTotalConsecutiveTime[details.status] < 8*60){
        statusWiseTotalConsecutiveTime[details.status]= 0;
      }
      if((details.status == 'OFF' || details.status == 'SL') && ((statusWiseTotalConsecutiveTime['OFF']+statusWiseTotalConsecutiveTime['SL']) < 10*60)){
        statusWiseTotalConsecutiveTime['OFF']= 0;
        statusWiseTotalConsecutiveTime['SL']= 0;
      }
      statusWiseTotalTime[details.status]+= _timeElapse;

    });

    // if(statusWiseTotalConsecutiveTime['D']>this.consecutiveDriveLimit){
    //   exclamationError=true;
    //   exclamationErrors.push('30 Minute Rest Break Missed');
    // }
    // if((statusWiseTotalConsecutiveTime['OFF']+ statusWiseTotalConsecutiveTime['SL'])>this.dayOffSlLimit){
    //   exclamationError=true;
    //   exclamationErrors.push('Exceeded 10 Hours Off Duty');
    // }
    if((statusWiseTotalTime['ON']+statusWiseTotalTime['D'])>this.dayOnLimit){
      exclamationError=true;
      exclamationErrors.push('Exceeded 14 Hours Shift Limit');

    }
    if(statusWiseTotalTime['D']>this.dayDrivingLimit){
      exclamationError=true;
      exclamationErrors.push('Exceeded 11 Hours Driving Limit');

    }
    if(__exclamationErrors[log.day] &&  __exclamationErrors[log.day].error.length>0){
      exclamationError=true;
      exclamationErrors=exclamationErrors.concat(__exclamationErrors[log.day].error);

    }


      if(log.day != moment().tz("UTC").startOf('day').toISOString()){
        if(log.reviewLogs == undefined){
          exclamationError=true;
        exclamationErrors.push('Review Logs Form is not filled up')
      }
      else{
        if(log.reviewLogs.signature == undefined){
          exclamationError=true;
          exclamationErrors.push('Logs are not Signed')
        }
      }
      }
    let __onedayErrors=getOnedayErrors(log,nextLog);
    // if (this.props.drawer.drawer === false ) {
    //   this.setState({ isOpen: false})
    // }
    return(
      <TouchableHighlight onPress={() => {navigate('ActivityLog', {day:log.day, nextDayLog:nextLog, error:__onedayErrors})}}  underlayColor={common.tuchableUnderlayGreenColor} style={[{borderBottomWidth:1}]}>
        <View style={{backgroundColor:common.whiteColor,padding:2,flexDirection:'row',flex:1}}>
          <View style={{width:5,backgroundColor:exclamationError?'red':common.whiteColor,flex:0.01}}></View>
          <View style={{flex:0.99}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}} >
              <Text style={{fontSize:15 ,color:'black'}}>{this.titleDate(log.day)}</Text>
              {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name="wrench" color={'#d3d7e2'} size={15}/>
                <Text style={{fontSize:15 ,color:'#d3d7e2'}}> 2 Defects</Text>
              </View> */}
              <Text style={{fontSize:15 ,fontWeight:'bold',color:'black'}}>{this.calculateTotalHoursFromDay(log)}</Text>
            </View>

            <View style={{flexDirection:'row',padding:5}}>
              {log.logs && log.logs.map((details,k)=>{
                let _color='white';
                let _width=0;
                let _timeElapse=moment(details.timeEnd || endDateTime).diff(details.timeStart, "minutes");
                if(details.status=="ON"){
                  _color='#DFEC8D';
                }else if (details.status=="D") {
                  _color=common.greenColor;

                }else if (details.status=="OFF") {
                  _color='lightgray';

                }else if (details.status=="SL") {
                  _color='lightgray';

                }
                statusWiseTotalTime[details.status]+= _timeElapse;
                _width=(_timeElapse*this.barWidthActivityTotal)/1440;

                return(
                  <View style={[s.activityLogIndicatorLine,{backgroundColor:_color,width:_width}]}></View>

                )
              })
              }


            </View>
            <View style={{flexDirection:'row', alignItems:'flex-end',justifyContent:'flex-end'}}>
            {__onedayErrors && __onedayErrors.length > 0 ?
              <View style={{marginHorizontal:0}}>
                {/* <Text>{JSON.stringify(statusWiseTotalConsecutiveTime)}</Text> */}
                  <TouchableOpacity  style={{marginHorizontal:4, alignItems:'flex-end'}}><Icon name="exclamation-circle" style={{color:'red'}} /></TouchableOpacity>
                </View>:null
            }
            {log.webLogs && log.webLogs.length > 0 ?
              <View style={{marginHorizontal:0}}>
                {/* <Text>{JSON.stringify(statusWiseTotalConsecutiveTime)}</Text> */}
                  <TouchableOpacity  style={{marginHorizontal:4, alignItems:'flex-end'}}><Icon name="pencil-square-o" style={{color:'red'}} /></TouchableOpacity>
                </View>:null
            }
            </View>
          </View>

        </View>
      </TouchableHighlight>
    )
  }

  renderDuty(data, type) {
    let status;
    switch (data) {
      case 'D':
        status = 'DRIVING'
        break;
      case 'SL':
        status = 'SLEEPER BERTH';
        break;
      case 'OFF':
        status = 'OFF DUTY';
        break;
      case 'ON':
        status = 'ON DUTY';
        break;
      default:

    }

    return (
      <View>
        {type == 1 ?
          <Text style={[s.SubHeaderText,{fontSize:15}]}>{status}</Text>
          :<Text style={{fontWeight:'bold',fontSize:10 ,marginHorizontal:5,fontFamily:'ProximaNova-Bold',color:common.greenColor}}>{status}</Text>
        }
      </View>
    )
  }

  closeDrawer() {
    this.setState({isOpen: false});
  }

  render() {
    let self=this;
//    console.log('#########################&&&&&&&&&&&&&&&&',this.bleRandomData());
     //this.logConsole('#########################################################reder ^^^^^^^^^^^^^^^^^^^',this.state.isOpen);
    const { navigate, goBack, state,dispatch } = this.props.screenProps.rootNavigation;
    const switchBackgroundColor = this.state.ONYardMoves ? LocalStyles.switchOnBackground : LocalStyles.switchOffBackground;
    const switchLeftOrRight = this.state.ONYardMoves ? LocalStyles.switchOn : LocalStyles.switchOff;
    // let processedChartLogs=[];
    // if(this.props.activityLog && this.props.activityLog.activityList){
    //   let allLogs=this.props.activityLog.activityList
    //     allLogs.forEach((activity,k)=>{
    //     let startDate=moment().startOf('day');
    //     activity['startMinute']=moment.duration(moment(activity.createdAt).diff(startDate)).asMinutes();
    //     if(k<allLogs.length-1){
    //       activity['endMinute']=moment.duration(moment(allLogs[k+1].createdAt).diff(startDate)).asMinutes();
    //
    //     }else {
    //       activity['endMinute']=moment.duration(moment(activity.createdAt).diff(startDate)).asMinutes();
    //
    //     }
    //     processedChartLogs.push(activity);
    //   })
    //
    // }
    let getCycleLimitValues=this.getCycleLimitValues(this.props.activityLog.activityList)
    let last8Dates=[];
    for(var a=0;a>-8;a--){
      last8Dates.push(moment().tz("UTC").add('days',a).startOf('day').toISOString());
    }
    let finalLogData=[];
    if(this.props.activityLog && this.props.activityLog.activityList && this.props.activityLog.activityList){

      last8Dates.forEach((date,l)=>{
        let isDayFound=false
        this.props.activityLog.activityList.forEach((log,k)=>{
          if(log.day==date)
          {
            isDayFound=true
            finalLogData.push(log)
          }
        })
        if(!isDayFound){

          // finalLogData.push({day:date,
          // //   logs:[{
          // // timeStart:moment(date).startOf('day')._d,
          // // timeEnd:moment(date).endOf('day')._d,
          // // status:'OFF',
          // // isManual:true
          // //   }],
          //   noData:true
          // });

        }
      })
finalLogData.forEach((log,k)=>{

  // if(log.noData){
  //   if(finalLogData[k+1] && finalLogData[k+1].currentStatus){
  //     finalLogData[k]['logs']=[{
  //     timeStart:moment(log.day).startOf('day')._d,
  //     timeEnd: (log.day==moment().startOf('day').toISOString()) ? new Date() :moment(log.day).endOf('day')._d,
  //     status:finalLogData[k+1].currentStatus,
  //     isManual:true
  //       }]
  //
  //   }
  //
  //
  // }
})
    }
    return(
      <Drawers isOpen={this.state.isOpen} closeDrawer={this.closeDrawer} navigate={navigate} navigationDispatch={dispatch}  >

      <View style={s.Container}>
        <View style={s.Header}>
        <TouchableHighlight onPress={() => {this.setState({isOpen: true})}} underlayColor="transparent" style={[{width : 60,height : 30,marginTop :5},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Hamburger}
          />
        </TouchableHighlight>
          <View style={[s.HeaderContent]}>
            <View style={[s.HeaderTextContainer]}>
              <TouchableHighlight onPress={() => {this.changeStatusModal()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{paddingLeft:8}]}>
                <View style={{flexDirection:'row',marginTop:10}}>
                  <View style={{width:40,height:40, borderRadius:20, backgroundColor:common.greenColor,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>{this.formatStatusIcon(this.state.currentStatus)}</Text>
                  </View>
                  <View style={[this.state.isStationary ? s.stationaryIndicator:null,{marginLeft:10}]}>
                    {this.state.isStationary ? <Text style={{color:'white',fontWeight:'900',color:'red'}}>STATIONARY</Text>: this.renderDuty(this.state.currentStatus,1)}
                    <Text style={s.HeaderText}>Current Status</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View style={[s.HeaderTextContainer,s.connectStatus]}>
              <TouchableHighlight onPress={() => {this.connectELDModal()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{}]}>
                <View style={{marginTop:10}}>
                  {this.state.eldConnected?
                    <View style={{}}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={[s.SubHeaderText,{marginRight:10}]}>V-3088</Text>
                        <Icon name="bluetooth-b" color={common.greenColor} size={20}/>
                      </View>
                      <Text style={s.HeaderText}>Current Vehicle</Text>
                    </View>
                    :
                    <View style={{flexDirection:'row'}}>
                      <TouchableHighlight onPress={() => {this.connectELDModal()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{}]}>

                      <View style={{flexDirection:'row',borderWidth:1,borderColor:common.greenColor,paddingTop:5,paddingBottom:5}}>
                        <Text style={[s.HeaderText,{marginRight:10}]}>Connect</Text>
                        <Icon name="bluetooth-b" color={common.whiteColor} size={20}/>
                      </View>
                    </TouchableHighlight>
                      <TouchableHighlight onPress={() => {this.sendRequest(this.ble.currentBuffer)}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginLeft:6}]}>
                        <View style={{borderWidth:1,borderColor:common.greenColor,paddingTop:5,paddingBottom:5}}>
                          <Text style={s.HeaderText}>Send Request</Text>

                        </View>
                    </TouchableHighlight>
                    </View>
                  }

                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={[s.Content,{}]}>
          <ScrollView>
            <View style={{flexDirection:'row'}}>


              <View style={{flex:0.40,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {navigate('ActivityLog', {day:last8Dates[0]})}} style={{}} >
                <View style={{}}>
                  <PercentageCircle radius={60} bgcolor={'gray'} innerColor={'#000000'} borderWidth={5} percent={0} color={common.greenColor}>
                    <View style={{borderRadius:10}}><Text style={{fontWeight:'bold',fontSize:10 ,fontFamily:'ProximaNova-Bold',color:common.greenColor}}>DRIVING</Text></View>
                    <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>{this.remainTimeFormatShow(this.state.clockTime,'time')}</Text>
                    <Text style={{fontWeight:'bold',fontSize:10 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>Remaining</Text>
                    <Text style={{fontWeight:'bold',fontSize:10 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>Today</Text>

                    {/* <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>{this.state.movementStatus}</Text> */}

                  </PercentageCircle>
                </View>

              </TouchableOpacity>
              </View>
              <View style={{flex:0.60}}>
                {/* <View style={{}}> */}


                <View style={{flex:1,marginHorizontal:10}}>
                  <View style={{}}>
                    <Text style={s.indicatorVal}>{this.remainTimeFormatShow(this.state.remainUntilBreakLimit,'time')}</Text>
                    <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.remainTimeFormatShow(this.state.remainUntilBreakLimit,'minutes')} total={this.untilBreakLimit} totalWidth={150} /></View>
                    <Text style={s.indicatorText}>UNTIL BREAK</Text>
                  </View>

                </View>
                <View style={{flex:1,marginHorizontal:10,marginTop:5,marginBottom:5}}>
                  <View style={{}}>
                    <Text style={s.indicatorVal}>{this.remainTimeFormatShow(this.state.remainShiftLimitToday,'time')}</Text>
                    <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.remainTimeFormatShow(this.state.remainShiftLimitToday,'minutes')} total={this.maxShiftLimit} totalWidth={150} /></View>
                    <Text style={s.indicatorText}>SHIFT AVAILABLE</Text>
                  </View>

                </View>
                <View style={{flex:1,marginHorizontal:10}}>
                  <View style={{}}>
                    <Text style={s.indicatorVal}>{this.remainTimeFormatShow(this.state.remainDriveLimitPerWeek,'time')}</Text>
                    <View style={s.statusIndicatorBorder}><LineProgressBar progressValue={this.remainTimeFormatShow(this.state.remainDriveLimitPerWeek,'minutes')} total={this.weekOnDrivingLimit} totalWidth={150} /></View>
                    <Text style={s.indicatorText}>CYCLE AVAILABLE</Text>
                  </View>
                </View>

                {/* <View style={{flex:0.5,marginHorizontal:10}}>
                  <View style={{}}>
                    <Text style={s.indicatorVal}>11:00</Text>
                    <View style={s.indicator}></View>
                    <Text style={s.indicatorText}>AVAILABLE DRIVE</Text>
                    <Text style={s.indicatorText}>TIME TOMORROW</Text>
                  </View>

                </View> */}
                {/* </View> */}
                {/* <View style={{flexDirection:'row',marginTop:20}}>



                </View> */}
              </View>


            </View>
            {/* <View style={{marginTop:10,backgroundColor:'#eaeef7',height:50,alignItems:'center',flexDirection:'row'}}>
              <View style={{flex:0.4}}>
                <Icon name="exclamation-circle" style={{marginLeft:10}} color={'#5e6370'} size={30}/>

              </View>
              <View style={{flex:0.6,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:15}}>Total on Duty : </Text>

                <Text style={{fontWeight:'bold',fontSize:18 }}>15hr 49min</Text>

              </View>

            </View> */}

            {/* <View style={{marginTop:10,backgroundColor:'#DBE2D8',height:50,justifyContent:'center'}}>
              <Text style={{marginLeft:20,fontWeight:'bold',fontSize:20 ,fontFamily:'ProximaNova-Bold',color:'grey'}}>LAST 14 DAYS</Text>
            </View> */}
            <View style={{marginTop:20}}>
                  <View style={{flexDirection:'row',backgroundColor:'#f2f2f2', marginTop:10, height:35,borderBottomWidth:2, borderColor:'#D8D8D8'}}>
                    <TouchableOpacity onPress={() => {}} style={{flex:3.5, paddingLeft:10}} >
                      <Text style={{color: '#919191', fontSize:14, fontWeight:'300', paddingTop:7}}>LAST 7 DAYS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate("DotInspection")} style={{backgroundColor:common.greenColor,paddingLeft:5,paddingRight:5}}>
                      <Text style={{color: common.whiteColor, fontSize:14, fontWeight:'300', paddingTop:7}}>INSPECTION</Text>
                    </TouchableOpacity>
                  </View>

                  {finalLogData.map((log,l)=>{

                    return (<View key={l}>
                        {self.renderEachDateLog(log,finalLogData[l-1])}
                        </View>)
                    })
                  }
            </View>
          </ScrollView>
        </View>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.changeStatusModal}
            onRequestClose={()=>{}}
            >

          <View style={commonStyle.container}>
            <View style={[{backgroundColor:common.whiteColor, height: 55 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() => this.changeStatusModal()} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Close}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.whiteColor,height: 55, justifyContent:'center',flex:0.6}]}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Change Duty Status</Text>
              </View>
                <TouchableHighlight onPress={() => {this.saveStatus()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>SAVE</Text>
                </TouchableHighlight>
            </View>

            <View style={{height:2, backgroundColor:'gray'}}></View>
            <ScrollView>
            <View style={s.ModalContainer, {marginTop:20}}>
              <View style={{flexDirection:"row",marginBottom:10}}>
                <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('OFF')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.33}]}>
                <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                  <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('OFF'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                    <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold'}}>OFF</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Off Duty</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('SL')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.33}]}>
              <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('SL'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                  <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>SL</Text>
                </View>
                <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Sleeper Berth</Text>
              </View>
            </TouchableHighlight>
            </View>
            <View style={{flexDirection:"row",marginBottom:10}}>
            <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('D')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.33}]}>
            <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
              <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('D'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>D</Text>
              </View>
              <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Driving</Text>
            </View>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('ON')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.33}]}>
            <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
              <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('ON'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>ON</Text>
              </View>
              <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>On Duty</Text>
            </View>
          </TouchableHighlight>
              </View>

              <View style={{marginHorizontal:20,marginTop:20,flexDirection:'row'}}>
                <TouchableWithoutFeedback onPress={() => {this.setState({ ONYardMoves: !this.state.ONYardMoves });}} >
                  <View style={[LocalStyles.switchBackground, switchBackgroundColor]}>
                    <View style={[LocalStyles.switchOnOffView, switchLeftOrRight]} />
                  </View>
                </TouchableWithoutFeedback>
                <View style={{marginLeft:20}}>
                  <Text style={{color:common.blackColor}}>Yard Moves / Personal Conveyance</Text>
                </View>
              </View>
              <View style={{marginHorizontal:20,marginTop:20}}>
                <View style={{}}>
                  <Text style={{color:'black',marginBottom:10}}>LOCATION</Text>
                  <View style={s.textInputParent}>
                    <TextInput
                      underlineColorAndroid = "transparent"
                      value={this.state.location}
                      autoCapitalize={'none'}
                      placeholder = "Enter pickup location"
                      placeholderTextColor={common.darkGrayColor}
                      onChangeText={(location) => {this.setState({location}); this.searchPickUpLocation(location)}}
                      style={[s.txtInutStyle]}
                      />
                    </View>
                    <View style={{}}>
                      {/*<TouchableHighlight style={{marginBottom:11}} underlayColor="transparent" onPress={() => this.setPickupLocation(this.state.cityState)} >
                        <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Select Above Location</Text>
                      </TouchableHighlight>*/}
                      <ScrollView>
                      {this.state.suggestions &&
                        <View>
                          {this.state.suggestions.map((address, key) => {
                            return (
                              <SuggestLocation address={address} key={key} pick={this.setPickupLocation}/>
                            )
                          })}
                        </View>

                      }
                      </ScrollView>

                    </View>
                </View>
              </View>
              <View style={{marginHorizontal:20,marginTop:20}}>
                <View style={{}}>
                  <Text style={{color:'black',marginBottom:10}}>NOTES</Text>
                  <View style={s.textInputParent}>
                  <TextInput
                  placeholder={'Enter Note'}
                  multiline={true}
                  numberOfLines={4}
                    onChangeText={(text) => {this.notesTextInput(text)}}
                    underlineColorAndroid = "transparent"
                    value={this.state.notes}
                    style={s.txtInutStyle}
                    />
                    </View>
                </View>
              </View>
            </View>
            </ScrollView>
          </View>

        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.connectELDModal}
            onRequestClose={()=>{}}
            >
          <View style={commonStyle.container}>
            <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() => this.connectELDModal()} underlayColor="transparent" style={[{width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  style={{width : 21, height : 18}}
                  source={images.Close_White}
                />
              </TouchableHighlight>


            </View>
            <View style={{backgroundColor:'#027DBC',flex:1}}>
              <View style={{alignItems:'center'}}>
              <Image
                style={{width:window.width,height:window.height-70}}
                source={images.connectELD}
              />
            </View>
            </View>
          </View>

        </Modal>
        <SimpleModal
        	open={this.state.openStationaryModal}
        	offset={0}
        	overlayBackground={'rgba(0, 0, 0, 0.75)'}
        	animationDuration={200}
        	animationTension={40}
        	modalDidOpen={() => undefined}
        	modalDidClose={() => this.setState({openStationaryModal: false})}
        	closeOnTouchOutside={true}
        	containerStyle={{
        	   justifyContent: 'center'
        	}}
        	modalStyle={{
        	   borderRadius: 2,
        	   margin: 20,
        	   padding: 10,
        	   backgroundColor: '#F5F5F5'
        	}}
          disableOnBackPress={true}>
          <View style={{height:200}}>
            <View style={{marginHorizontal:20,  flex:1, alignItems:'center'}}>
            <View style={{width:70,height:70, borderRadius:35,alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
              <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>{this.state.timer}</Text>
            </View>
            </View>
            <View style={{marginHorizontal:20,  flex:1, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'grey'}}>
                <Text style={{textAlign:'center',fontWeight:'400'}}>Do you want to continue driving or change your duty status?</Text>
            </View>
            <View style={{flexDirection:'row', height:50, alignItems:'center',marginBottom:0}}>
              <TouchableOpacity onPress={() => {this.setState({currentStatus: 'D'})}} style={{ alignItems:'flex-start', flex:1, borderWidth:1, borderColor:'grey',alignItems:'center'}}><Text style={{textAlign:'center', fontWeight:'800'}}>Continue Driving</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {this.setState({changeStatusModal: true,openStationaryModal: false})}} style={{ alignItems:'flex-end',flex:1,borderWidth:1, borderColor:'grey',alignItems:'center'}}><Text style={{textAlign:'center',fontWeight:'800'}}>Change Status</Text></TouchableOpacity>
            </View>
          </View>
        </SimpleModal>

      </View>
      </Drawers>
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
 },
  Header: {
    height: getSize(100),
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
    // alignItems:'flex-end'
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
  txtInutStyle : {
    height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:common.blackColor
    },
    indicatorVal:{
      color:common.whiteColor,
      fontWeight:'bold'
    },
    indicator:{
      height:5,
      borderColor:common.greenColor,
      borderWidth:0.2
    },
    indicatorText:{
      color:common.whiteColor,
      fontSize:10
    },
    activityLogIndicatorLine:{
      height:5,

    },
    txtInutStyleSearch : {
     //  height: 30,
      paddingHorizontal:6.2,
      paddingLeft:20,
      width : window.width - 65,
      color: common.darkGrayColor,
      //fontFamily: Muller,
   },
   statusIndicatorBorder:{
     height:5,
     borderColor:common.whiteColor,
     borderWidth:0.2,
     width:151
   },
   stationaryIndicator:{
      borderColor:'red',
      borderWidth:1
   }
})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
        activityLog:state.activityReducer,
        drawer: state.drawerReducer
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


export default connect(mapStateToProps, mapDispatchToProps)(ActivityStatus);
