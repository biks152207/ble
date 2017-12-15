import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Picker,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import images from './../../config/images';
import Modal from 'react-native-simple-modal';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { searchPlaces, getPlace } from './../../utils/utility';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';
import { AlertInfo } from './../../utils/AlertInfo';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import config from './../../config/config'

import { HTTP } from './../../utils/HTTP';
import { getActivityLogs } from './../../actions/activity';
import DateTimePicker from 'react-native-modal-datetime-picker';
import  SuggestLocation from '../Common/SuggestLocation';
import { WheelPicker, DatePicker, TimePicker } from 'react-native-wheel-picker-android'
let window = Dimensions.get("window");

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderComponent from '../ActivityLogTab/ActivityLog/SliderComponent';
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Text as Tct,
    Defs,
    Stop
} from 'react-native-svg';
let timer;


class Axis extends Component {
  constructor(props){
    super(props);
    this.state = {
      secondPointer: 1
    }
    this.getTickPoints = this.getTickPoints.bind(this);
    this.renderAxisPoint = this.renderAxisPoint.bind(this);
    this.renderXAxisPoint = this.renderXAxisPoint.bind(this);
    this.secondPointer = 1;
  }

  renderAxisPoint(i) {
    if (i === 1) {
      return 'SL';
    }
    if (i === 2) {
      return 'D';
    }
    if (i === 3) {
      return 'OFF';
    }
    if (i === 4) {
      return 'ON';
    }
  }

  renderXAxisPoint(i) {
    let pointer;
    if (i == 0) {
      pointer = 'M';
    } else if (i == 12) {
      pointer = 'N';
    }  else if (i > 12) {
      if (i == 24) {
        pointer = 'M';
      } else {
        pointer = i-12;

      }

    }
    else {
      pointer = i
    }
    return pointer;
  }

  getTickPoints (vertical, start, end, numTicks) {
    let res = []
    let ticksEvery = Math.floor(this.props.width / (numTicks - 1))
    if (vertical) {
      for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }
  render() {
    let { width, ticks, x, y, startVal, endVal, vertical } = this.props
    console.log(width, ticks,x,y,startVal,endVal, vertical);
    const TICKSIZE = width / 150
    x = x || 0
    y = y || 0
    let endX = vertical ? x : x + width
    let endY = vertical ? y - width : y
    let scale = this.props.scale
    if (!scale) {
      scale = typeof startVal === 'number' ? d3scale.scaleLinear() : d3scale.scaleTime()
      scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
    }
    let tickPoints = vertical ? this.getTickPoints(vertical, y, endY, ticks)
      : this.getTickPoints(vertical, x, endX, ticks)
      console.log(tickPoints, 'tick points..');
    return (
      <G fill='none'>
            <Line
              stroke='#000'
              strokeWidth='3'
              x1={x}
              x2={endX}
              y1={y}
              y2={endY} />
            {tickPoints.map(
               pos => <Line
                        key={pos}
                        stroke='#000'
                        strokeWidth='3'
                        x1={pos}
                        y1={y}
                        x2={pos}
                y2={y + TICKSIZE} />
             )}
            {tickPoints.map((pos, i) => {
               return (<Tct
                        key={i}
                        fill='#000'
                        stroke='#000'
                        fontSize='8'
                        textAnchor='middle'
                        x={vertical ? x - 14 * TICKSIZE : pos}
                        y={vertical ? pos-10 : y + 2 * TICKSIZE}>

                        {vertical ? this.renderAxisPoint(i): this.renderXAxisPoint(i)}
                      </Tct>)
             })}
        </G>
    )
  }
}

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculating: true,
      dimensions: undefined,
      startTime:'',
      endTime: ''
    }
    this.padding = 46;
    this.createScales = this.createScales.bind(this);
    this.renderAxis = this.renderAxis.bind(this);
    this.slider = this.slider.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }


  clickEdit() {
    const {navigate, state} = this.props.navigationValue;
    navigate('AddEvent',{day:state.params.day,startTime: this.state.startTime, endTime: this.state.endTime})
  }

  onLayout(event) {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  slider(e) {
    console.log(e.nativeEvent);
  }

  createScales(dataPoints, width, height, padding) {
    let xScale = d3scale.scaleLinear()
    .domain([padding, width - padding])
    .range([0, 24])
    let yScale = d3scale.scaleLinear().domain([height - padding, padding]).range([0, 4]);
    return {xScale, yScale}
  }


  renderAxis() {
    let xScale;
    let yScale;
    let width;
    let height;
    let lineGenerator;
    let data;
    if (this.state.dimensions) {
      width = this.state.dimensions.width;
      height = this.state.dimensions.height;
      xScale = this.createScales(this.props.data, width, height, this.padding).xScale;
      yScale = this.createScales(this.props.data, width, height, this.padding).yScale;
      lineGenerator = d3shape.line().curve(d3shape.curveStep)
        .x(d => xScale.invert(d.time))
        .y(d => yScale.invert(d.status))
      data = lineGenerator(this.props.data);
    }
    return (
      <View style={{flex: 1,alignItems:'center'}}>
      <View style={{width: window.width, height:180}} onLayout={this.onLayout} >
        {this.state.dimensions ?
          <Svg width={width} height={height}>
          <Axis
            width={width - 2 * this.padding}
            x={this.padding}
            y={height - this.padding}
            ticks={24}
            startVal={0}
            endVal={24}
            scale={xScale} />
            <Axis
            width={height - 2 * 50}
            x={this.padding}
            y={height - this.padding}
            ticks={5}
            startVal={0}
            endVal={4}
            scale={yScale}
            vertical={true} />
                      <Path
                                fill='none'
                                stroke="#9eb068"
                                strokeWidth='2'
                                d={data}
                                onPressIn={(e) => this.slider(e)}
                                />
             </Svg>: null
        }
      </View>
      {/*<Svg width={width} height={height}>
      <Axis
        width={width - 2 * this.padding}
        x={this.padding}
        y={height - 50}
        ticks={24}
        startVal={0}
        endVal={24}
        scale={xScale} />
        <Axis
        width={height - 2 * 50}
        x={this.padding}
        y={height - 50}
        ticks={4}
        startVal={0}
        endVal={4}
        scale={yScale}
        vertical={true} />
                  <Path
                            fill='none'
                            stroke="red"
                            strokeWidth='5'
                            d={data}
                            onPressIn={(e) => this.slider(e)}
                            />
         </Svg>*/}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex:1, backgroundColor:'white'}}>
      <SliderComponent editLog={this.props.editLog}/>

          {this.renderAxis()}
      </View>
    )
  }
}

class AddEvent extends Component {
  constructor(props) {
    super(props);
    const { navigate, state } = props.navigation;

    var now = moment(state.params.day);
    now.tz(config.defaultMobileTimezone);
    var localOffset = now.utcOffset();
    now.tz(props.auth.user.driver.homeTerminalTimezone); // your time zone, not necessarily the server's
    var centralOffset = now.utcOffset();
    var diffInMinutes = localOffset - centralOffset;
    this.actualOffset=diffInMinutes;
    moment.tz.setDefault(props.auth.user.driver.homeTerminalTimezone);


    this.state = {
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startTime: '',
      endTime:'',
      startTimeISO: moment(state.params.day).add('minutes', this.actualOffset).toISOString(),
      endTimeISO:moment(state.params.day).add('minutes', this.actualOffset).toISOString(),
      lat:'',
      lng:'',
      location:'',
      suggestions: [],
      eventNotes:''
    }
    this.activeStatus=this.activeStatus.bind(this);
    this._handleStartTimePicked=this._handleStartTimePicked.bind(this);
    this._handleEndTimePicked=this._handleEndTimePicked.bind(this);
    this.setPickupLocation = this.setPickupLocation.bind(this);
    this.searchPickUpLocation = this.searchPickUpLocation.bind(this);
    this.saveStatus = this.saveStatus.bind(this);
    this.editLog = this.editLog.bind(this);
  }

  editLog(sTime, eTime) {
    const { navigate, state } = this.props.navigation;
    const startTime=  moment(state.params.day).startOf('day').add('minutes',sTime).format('LT');
    //moment.utc().startOf('day').add(sTime, 'minutes').format('LT');
    const startTimeISO= moment(state.params.day).add('minutes', moment().utcOffset()*-1).startOf('day').add('minutes',sTime).toISOString()
    //moment.utc().startOf('day').add(sTime, 'minutes').toISOString();
    const endTime=  moment(state.params.day).startOf('day').add('minutes',eTime).format('LT');
    //  moment.utc().startOf('day').add(eTime, 'minutes').format('LT');
    const endTimeISO=  moment(state.params.day).add('minutes', moment().utcOffset()*-1).startOf('day').add('minutes',eTime).toISOString()
    this.setState({startTime,startTimeISO,endTime,endTimeISO})
  }

  componentWillMount(){
    const { navigate, state } = this.props.navigation;
    if(state.params.log){
      this.setState({
        tempCurrentStatus: state.params.log.status,
        startTime: moment(state.params.log.timeStart).add('minutes',moment(state.params.log.timeStart).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).format('LT'),
        endTime: moment(state.params.log.timeEnd).add('minutes',moment(state.params.log.timeEnd).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).format('LT'),
        startTimeISO: moment(state.params.log.timeStart).add('minutes',moment(state.params.log.timeStart).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).toISOString(),
        endTimeISO:  moment(state.params.log.timeEnd).add('minutes',moment(state.params.log.timeEnd).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).toISOString(),
        lat: state.params.log.location ? state.params.log.location.lat :0,
        lng: state.params.log.location ? state.params.log.location.lng:0,
        location: state.params.log.location ? state.params.log.location.address : '',
        eventNotes: state.params.log.notes,
      },()=>{
        if(!state.params.log.location){
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
        }

      })
    }
    else{
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
    }
  }

  async setPickupLocation(location) {
    this.setState({
      location:location.place_name,
      lat:location.center[0],
      lng:location.center[1],
      suggestions:[]
    });
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
  titleDate(date){
    return moment(date).tz('UTC').format('dddd MMM DD')
  }
  saveStatus(){

    const { navigate, state } = this.props.navigation;
    if(new Date(this.state.startTimeISO) >= new Date(this.state.endTimeISO)){
      AlertInfo('Please select proper Time');
      return;
    }else if (new Date(this.state.startTimeISO) >= new Date() || new Date(this.state.endTimeISO) >= new Date()) {
      AlertInfo('You can not add future time');
      return;
    }
    // alert('m')its ne
    // this.state.location
    if(this.state.location){
    let data={};
    data['offset']=moment().utcOffset();
    data['day']=state.params.day;
    if(this.state.eventNotes)
      data['notes']=this.state.eventNotes;
    data['logs']={
        "status": this.state.tempCurrentStatus,
        "isManual": true,
        "timeStart": this.state.startTimeISO,
        "timeEnd": this.state.endTimeISO,
        "location":{"address": this.state.location,"lat": this.state.lat, "lng": this.state.lng},
        "eventRecordStatus":1,
        "eventRecordOrigin":2,
        "eventType":2,
        "eventCode":1,
     }


    AsyncStorage.getItem('@Axle:token')
        .then((token) =>{
            HTTP('post', '/driver/add-logs', data, {authorization: "Bearer "+token})
              .then((response) => {
                console.log(response,'response.................');
                console.log(this.props.navigation);
                // alert('m')
                if(response.data.error){

                }
                else {
                  console.log('state params%%%%%%%%%%%%%%%%%%', state.params.day);
                  this.props.navigation.navigate('ActivityLog', {day:state.params.day});
                }
              }).
              catch((err)=>{

              })
      })
    }
    else {
      AlertInfo('please select Location');
    }
  }
  getDSTBias(tz) {
    var janOffset = moment.tz({month: 0, day: 1}, tz).utcOffset();
    var junOffset = moment.tz({month: 5, day: 1}, tz).utcOffset();
    return Math.abs(junOffset - janOffset);
}

  onStartTimeSelected(date){
    const { navigate, state } = this.props.navigation;

    let selectedDay=state.params.day;
    let minutes= moment().diff(moment().startOf('day')._d, "minutes");
    let selectedDate=moment(selectedDay).add(minutes,'minutes').toISOString();
    let _finalDate=moment(selectedDay).add('minutes', moment().utcOffset() * -1).startOf('day').add(date.getHours()*60+date.getMinutes(), 'minutes').toISOString();

debugger
// if(!moment(state.params.day).isDST()){
//   console.log("message@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.actualOffset,moment(date).add('minutes',this.actualOffset).format('LT'));
//
//   // this.setState({startTime: moment(date).add('minutes',this.actualOffset).format('LT'), startTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
//   this.setState({startTime: moment(date).add('minutes',this.actualOffset).format('LT'), startTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
//
// }else {
//   console.log("message@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.getDSTBias(moment.tz.guess())*-1,moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('LT'));
//
//   // this.setState({startTime: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('LT'), startTimeISO: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).toISOString()});
//   this.setState({startTime: moment(date).add('minutes',this.actualOffset).format('LT'), startTimeISO: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())).toISOString()});
//
// }
  this.setState({startTime: moment(date).add('minutes',this.actualOffset).format('LT'), startTimeISO: _finalDate});

    // this.setState({startTime: moment(date).add('minutes',this.actualOffset).format('LT'), startTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
  }

  componentDidMount() {
    const { navigate, state } = this.props.navigation;
    if (state.params.startTime) {
      const startTime=  moment.utc().startOf('day').add('minutes',moment(state.params.day).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).add(state.params.startTime, 'minutes').format('LT');
      const startTimeISO=   moment.utc().startOf('day').add('minutes',moment(state.params.day).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).add(state.params.startTime, 'minutes').toISOString();
      const endTime=  moment.utc().startOf('day').add('minutes',moment(state.params.day).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).add(state.params.endTime, 'minutes').format('LT');
      const endTimeISO=  moment.utc().startOf('day').add('minutes',moment(state.params.day).isDST()?this.getDSTBias(moment.tz.guess())*-1:this.actualOffset*-1).add(state.params.endTime, 'minutes').toISOString();
      this.setState({startTime,startTimeISO,endTime,endTimeISO})
    }
  }

  onEndTimeSelected(date){
    const { navigate, state } = this.props.navigation;
    let selectedDay=state.params.day;
    let minutes= moment(selectedDay).diff(moment().startOf('day')._d, "minutes");
    let selectedDate=moment(selectedDay).add(minutes,'minutes').toISOString();
let _finalDate=moment(selectedDay).add('minutes', moment().utcOffset() * -1).startOf('day').add(date.getHours()*60+date.getMinutes(), 'minutes').toISOString();
debugger
    // if(!moment(state.params.day).isDST()){
    //   console.log("message@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.actualOffset,moment(date).add('minutes',this.actualOffset).format('LT'));
    //
    //   // this.setState({endTime: moment(date).add('minutes',this.actualOffset).format('LT'), endTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
    //   this.setState({endTime: moment(date).add('minutes',this.actualOffset).format('LT'), endTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
    //
    //
    // }else {
    //   console.log("message@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.getDSTBias(moment.tz.guess())*-1,moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('LT'));
    //
    //   // this.setState({endTime: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('LT'), endTimeISO: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())*-1).toISOString()});
    //
    //   this.setState({endTime: moment(date).add('minutes',this.actualOffset).format('LT'), endTimeISO: moment(date).add('minutes',this.getDSTBias(moment.tz.guess())).toISOString()});
    //
    // }

      this.setState({endTime: moment(date).add('minutes',this.actualOffset).format('LT'), endTimeISO:_finalDate});

    // this.setState({endTime: moment(date).add('minutes',this.actualOffset).format('LT'), endTimeISO: moment(date).add('minutes',this.actualOffset).toISOString()});
  }

  _handleStartTimePicked = (date) => {
        this.setState({startTimePickerVisible:false, startTime: moment(date).format('LT'), startTimeISO: moment(date).toISOString()});
  };
  _hideStartTimePicker = () => this.setState({startTimePickerVisible:false});
  _handleEndTimePicked = (date) => {
        this.setState({endTimePickerVisible:false, endTime: moment(date).format('LT'), endTimeISO: moment(date).toISOString()});
  };
  _hideEndTimePicker = () => this.setState({endTimePickerVisible:false});


  render() {
    let minutesArray = [];
    for(let min=0;min<60;min++){
      if(min<10){
        minutesArray.push('0'+min);
      }
      else{
        minutesArray.push(min.toString());
      }
    }
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={commonStyle.container}>
            <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() => {goBack()}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Arrow_White_Left}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
              <Text style={{color: common.greenColor,fontSize: 10, fontWeight: '500'}}>{this.titleDate(state.params.day)}</Text>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Create New Event</Text>
              </View>
                <TouchableHighlight onPress={() => {this.saveStatus()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>

            <ScrollView>
            <View style={s.ModalContainer, {marginTop:20}}>
            <View style={{marginHorizontal:20,marginBottom:20,flexDirection:'row'}}>
              <View style={{flex:0.4}}>
              <View style={commonStyle.paddingBottom_16}>
                  <Text style={[{color:'white',marginBottom:10},s.SubHeaderText]}>START TIME</Text>
                  <View style={s.timePickerTextField}>
                      <TouchableOpacity onPress={() => { this.setState({startTimePickerVisible:true}) }} >
                          <View style={{flexDirection:'row',height:30}}>
                            <View style={{flex:0.8}}>
                                <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.greenColor}}>{this.state.startTime} </Text>
                            </View>
                            <View style={{flex:0.2}}>
                              <Icon name="clock-o" color={common.greenColor} size={20}/>
                            </View>
                          </View>
                      </TouchableOpacity>
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
                                <Text style={{fontWeight:'bold',fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.greenColor}}>{this.state.endTime} </Text>
                            </View>
                            <View style={{flex:0.2}}>
                              <Icon name="clock-o" color={common.greenColor} size={20}/>
                            </View>
                          </View>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
            </View>
            {this.props.navigation.state.params.dataForGraph && this.props.navigation.state.params.dataForGraph.length > 0 &&
             <View style={{flex:1, marginTop: -36}}>
                 <GraphComponent data={this.props.navigation.state.params.dataForGraph} navigationValue={this.props.navigation} editLog={this.editLog.bind(this)}/>
             </View>
           }
            <View style={{height:1, backgroundColor:'gray'}}></View>
            <View style={s.ModalContainer, {marginTop:20}}>
              <View style={{flexDirection:"row",marginBottom:10}}>
                <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('OFF')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
                <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                  <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('OFF'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                    <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold'}}>OFF</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Off Duty</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('SL')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
              <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('SL'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                  <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>SB</Text>
                </View>
                <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Sleeper</Text>
                <Text style={{fontWeight:'bold',fontSize:15,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Berth</Text>

              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('D')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
            <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
              <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('D'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>D</Text>
              </View>
              <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>Driving</Text>
            </View>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.changeTempCurrentStatus('ON')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{flex:0.33}]}>
            <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
              <View style={{width:70,height:70, borderRadius:35, backgroundColor:this.activeStatus('ON'),alignItems:'center',justifyContent:'center', borderColor:'black', borderWidth:1}}>
                <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>ON</Text>
              </View>
              <Text style={{fontWeight:'bold',fontSize:15,marginTop:10 ,fontFamily:'ProximaNova-Bold',color:common.blackColor}}>On Duty</Text>
            </View>
          </TouchableHighlight>
            </View>
              <View style={{marginHorizontal:20,marginTop:10}}>
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
                    <View>
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
                  numberOfLines={6}
                    onChangeText={(text) => {this.setState({eventNotes: text})}}
                    underlineColorAndroid = "transparent"
                    value={this.state.eventNotes}
                    style={s.txtInutStyle}
                    />
                    </View>
                </View>
              </View>
            </View>
            </ScrollView>
            <Modal
              open={this.state.startTimePickerVisible}
              offset={0}
              overlayBackground={'rgba(0, 0, 0, 0.75)'}
              animationDuration={200}
              animationTension={40}
              modalDidOpen={() => undefined}
              modalDidClose={() => this.setState({startTimePickerVisible:false})}
              closeOnTouchOutside={true}
              containerStyle={{
                 justifyContent: 'center'
              }}
              modalStyle={{
                 borderRadius: 2,
                 height:200,
                 margin: 20,
                 padding: 10,
                 backgroundColor: '#F5F5F5'
              }}
              disableOnBackPress={false}>
              <View style={{ flex: 1 }}>
              <TimePicker
                 minutes={minutesArray}
                 onTimeSelected={(date)=>this.onStartTimeSelected(date)}
                 initDate={this.state.startTimeISO}/>
               </View>
              </Modal>
              <Modal
                open={this.state.endTimePickerVisible}
                offset={0}
                overlayBackground={'rgba(0, 0, 0, 0.75)'}
                animationDuration={200}
                animationTension={40}
                modalDidOpen={() => undefined}
                modalDidClose={() => this.setState({endTimePickerVisible:false})}
                closeOnTouchOutside={true}
                containerStyle={{
                   justifyContent: 'center'
                }}
                modalStyle={{
                   borderRadius: 2,
                   height:200,
                   margin: 20,
                   padding: 10,
                   backgroundColor: '#F5F5F5'
                }}
                disableOnBackPress={false}>
                <View style={{ flex: 1 }}>
                <TimePicker
                   minutes={minutesArray}
                   onTimeSelected={(date)=>this.onEndTimeSelected(date)}
                   initDate={this.state.endTimeISO}/>
                 </View>
                </Modal>

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
    color: common.blackColor,
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
  txtInutStyle : {
    // height: 40,
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
      backgroundColor:'red'
    },
    indicatorText:{
      color:common.whiteColor,
      fontSize:10
    },
    activityLogIndicatorLine:{
      height:5,
    },
    timePickerTextField:{
      borderBottomWidth:1,
      borderColor: common.grayColor,
    },

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


export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
