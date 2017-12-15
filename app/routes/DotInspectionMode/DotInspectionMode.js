import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';

import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from './../../config/images';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import styles from './styles';
import { connect } from  'react-redux';
import { HTTP } from './../../utils/HTTP';
import { titleDate, calculateTotalTymebByStatusOfLog } from './../../utils/utility';
import moment from 'moment';
import GraphComponent from './../../components/Graph/Graph';


const { width } = Dimensions.get('window');
let window = Dimensions.get("window");


class DotInspectionMode extends Component {
  constructor(props) {
    super(props);
    moment.tz.setDefault(props.auth.user.driver.homeTerminalTimezone);

    this.hoursWorkedSelectedDay=0;
    this.hourWorkedLastSevenDays=0;
  }
  state = {
    timeValue: 0,
    logsForDay: [],
    loading: false,
    noData: false,
    from: '',
    selectedDate:'',
    coDriver:'',
    distance: '',
    trailer: '',
    vehicle: '',
    shippingDocuments: '',
    logsSeven : [],
  }

  getDifference(startTime, endtime) {
      const t = moment(endtime).diff(startTime, "minutes");
     return moment(endtime).diff(startTime, "milliseconds");
  }

  convertMilliseconds(ms) {
    return moment.utc(ms).format('HH:mm');

  }

  getHumanlyDate (m) {
  	// var g = null; //return g
    //
  	// if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
    //
  	// var split_afternoon = 12 //24hr time to split the afternoon
  	// var split_evening = 17 //24hr time to split the evening
  	// var currentHour = parseFloat(m.format("HH"));
    //
  	// if(currentHour >= split_afternoon && currentHour <= split_evening) {
  	// 	g = "AFTERNOON";
  	// } else if(currentHour >= split_evening) {
  	// 	g = "EVENING";
  	// } else {
  	// 	g = "MORNING";
  	// }

  	// return g;
    if(moment(m).isDST()){
      return moment(m).add('minutes',this.getDSTBias(moment.tz.guess())*-1).format('hh:mm a')
    }
    return moment(m).format('hh:mm a')
  }


  download(link) {
    if (link) {
      Linking.canOpenURL(link)
        .then((supported) =>{
          if (supported) {
            Linking.openURL(link);
          }
        })
    }
  }

  formatDate(date) {
    return moment(moment(date).add('minutes',moment().utcOffset()*-1)).format('MM/DD/YYYY');
  }

  nextDay() {
    if (this.state.timeValue < 0 ) {
      const timeValue = this.state.timeValue + 1;
      this.setState({ timeValue, logsForDay: [] });
      this.fetchLogsByDay(timeValue);
    }
  }

  PreviousDay() {
    if (this.state.timeValue > -6) {
      const timeValue = this.state.timeValue - 1;
      this.setState({ timeValue,  logsForDay: []});
      this.fetchLogsByDay(timeValue);
    }
  }

  fetchLogsByDay(timeValue) {
    const selectedDate=moment().tz(this.props.auth.user.driver.homeTerminalTimezone).add(timeValue, 'days').tz('UTC').startOf('day').toISOString()
    const from = moment().tz(this.props.auth.user.driver.homeTerminalTimezone).add(timeValue, 'days').add(-6,'days').tz('UTC').startOf('day').toISOString();
    this.setState({selectedDate, noData: false});
    const to = moment().tz(this.props.auth.user.driver.homeTerminalTimezone).add(timeValue, 'days').tz('UTC').endOf('day').toISOString();
    this.hourWorkedLastSevenDays=0;
    this.hoursWorkedSelectedDay=0;
    this.setState({ loading: true, logsForDay: [],logsSeven:[] })
    AsyncStorage.getItem('@Axle:token')
      .then((token) =>{
        HTTP('get', `/driver/getLogs?from=${from}&to=${to}&offset=${moment().utcOffset()}`, {}, {authorization: "Bearer "+token})
        .then((result) => {
          const noData = result.data.data.logInfo.length == 0 ? true: false;
          this.setState({ noData});
          if (!noData) {
            let sortedLogHistory = result.data.data.logInfo.sort(function(a, b) {
             return new Date(b.day) - new Date(a.day);
           });
            this.setState({ logsForDay: [sortedLogHistory[0]],logsSeven:sortedLogHistory });
            // if (result.data.data.logInfo[0] && result.data.data.logInfo[0].reviewLogs) {
            //   HTTP('get', `/driver/getReview?id=${result.data.data[0].reviewLogs}`, {}, {authorization: "Bearer "+token})
            //   .then((res) => {
            //     const {
            //       coDriver,
            //       distance,
            //       trailer,
            //       vehicle,
            //       shippingDocuments
            //     } = res.data.data;
            //     this.setState({
            //       coDriver,
            //       distance,
            //       trailer,
            //       vehicle,
            //       shippingDocuments
            //     })
            //   })
            // }
          }
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  renderDuty(data) {
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

    return status
  }
  timeShowFromMinutes(minutes){
      let calcTime='00:00';
      let h = Math.floor(minutes / 60);
      let m = minutes % 60;
      if(m==59){
        h=h+1;
        m=0;
      }
      if(h<10){
        h="0"+""+h
      }
      if(m<10){
        m="0"+""+m
      }
      calcTime=h+':'+m;
      return calcTime;
    }
    getDSTBias(tz) {
      var janOffset = moment.tz({month: 0, day: 1}, tz).utcOffset();
      var junOffset = moment.tz({month: 5, day: 1}, tz).utcOffset();
      return Math.abs(junOffset - janOffset);
  }
  componentWillMount() {
    this.fetchLogsByDay(this.state.timeValue);
  }
  render() {
    const { navigate, goBack } = this.props.navigation;
    this.hoursWorkedSelectedDay=0;
    this.hourWorkedLastSevenDays=0;
    let self=this;
    let dataForGraph = [];
    return (
      <View style={styles.container}>
        {this.state.loading ?
          <ActivityIndicator/>:
          <View style={{flex:1}}>
          <View style={[{backgroundColor:common.grayColor, height: 55 , flexDirection:'row', borderBottomWidth:0.5}]}>
            <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{flex:0.1,width:60,alignItems:'center',justifyContent:'center'}]}>
              <Image
                style={{width : 21, height : 18}}
                source={images.Back_Arrow}
              />
            </TouchableHighlight>
            <View style={[{backgroundColor:common.grayColor,height: 55,marginRight:10,justifyContent:'center',flex:0.6, borderBottomWidth:0.5}]}>
              <Text style={{color: common.blackColor,fontSize: 10}}>DOT INSPECTION ON MODE</Text>
              <Text style={{color: common.blackColor,fontSize: 18}}>{this.state.selectedDate ? moment(moment(this.state.selectedDate).add('minutes',moment().utcOffset()*-1)).format("LL"): null}</Text>
            </View>
            <View style={[{backgroundColor:common.grayColor,height: 55,justifyContent:'center',alignItems:'flex-end', marginRight:10,borderBottomWidth:0.5}]}>

              <TouchableHighlight onPress={() => navigate('EmailLogs', {day: this.state.selectedDate})}>
                <Text style={{fontSize:15, fontWeight:'500'}}>Send Logs</Text>
              </TouchableHighlight>
            </View>

          </View>
          <ScrollView>
          {this.state.noData ? <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>No Logs</Text>
          </View>:
          <View style={{flex:1}}>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:10, marginHorizontal:10}}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'flex-start'}}>
                  <Text style={{fontSize:16, fontWeight:'400',color:common.blackColor}}>Driver Daily Log</Text>
                  <Text style={{fontSize:10, fontWeight:'300'}}>USA 60 hours/7 days</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={{fontSize:14, fontWeight:'400',color:common.blackColor}}>{this.state.logsForDay.length> 0 ? this.formatDate(this.state.logsForDay[0].day):null}</Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:10, borderWidth:0.5, marginTop:10,borderColor:'#E0E0E0'}}>
              <View style={{flex:1,  height:45, alignItems:'flex-start', borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>DRIVER</Text>
                  <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{this.props.auth.user.name}</Text>
              </View>
              <View style={{flex:1,height:45, alignItems:'flex-start'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>CO DRIVER</Text>
                <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{(this.state.logsForDay[0] && this.state.logsForDay[0].reviewLogs) ?this.state.logsForDay[0].reviewLogs.coDriver:'-'}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:10, borderBottomWidth:0.5, borderRightWidth:0.5, borderLeftWidth:0.5,borderColor:'#E0E0E0'}}>
              <View style={{flex:1,  height:45, alignItems:'flex-start', borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>DISTANCE</Text>
                <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{this.state.logsForDay[0] && this.state.logsForDay[0].reviewLogs?this.state.logsForDay[0].reviewLogs.distance:'-'} Miles</Text>
              </View>
              <View style={{flex:1,height:45, alignItems:'flex-start'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>VEHICLE</Text>
                <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{this.state.logsForDay[0] && this.state.logsForDay[0].reviewLogs?this.state.logsForDay[0].reviewLogs.vehicle:'-'}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:10, borderBottomWidth:0.5, borderRightWidth:0.5, borderLeftWidth:0.5,borderColor:'#E0E0E0'}}>
              <View style={{flex:1,  height:45, alignItems:'flex-start', borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>CARRIER</Text>
                <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>ACCEM WAREHOUSE</Text>
              </View>
              <View style={{flex:1,height:45, alignItems:'flex-start'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>TRAILER</Text>
                <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{this.state.logsForDay[0] && this.state.logsForDay[0].reviewLogs?this.state.logsForDay[0].reviewLogs.trailer: '-'}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:10, borderBottomWidth:0.5, borderRightWidth:0.5, borderLeftWidth:0.5,borderColor:'#E0E0E0'}}>
              <View style={{flex:1,  height:45, alignItems:'flex-start'}}>
              <Text style={{textAlign:'center' ,paddingLeft:10,fontSize:12}}>MAIN OFFICE</Text>
              <Text style={{textAlign:'center',paddingLeft:10, fontSize:16, fontWeight:'400',color:common.blackColor}}>{this.props.auth.user.defaultAddressId.company_address} </Text>
              </View>
            </View>
            {this.state.shippingDocuments ?
              <View style={{flexDirection:'row',marginHorizontal:10, borderBottomWidth:0.5, borderRightWidth:0.5, borderLeftWidth:0.5,borderColor:'#E0E0E0'}}>
                <View style={{flex:1,  height:45, alignItems:'flex-start'}}>
                <Text style={{textAlign:'center' ,paddingLeft:10}}>SHIPPING DOCS</Text>
                  <TouchableOpacity style={{paddingLeft:10}} onPress={() => this.download(this.state.shippingDocuments)}>
                    <Icon name="paperclip" size={20} style={{color:this.state.shippingDocuments ? common.greenColor: 'black'}} />
                  </TouchableOpacity>
                </View>
              </View>: null
            }
            {/* FOR STATUS */}
            <View style={{flexDirection:'row',marginHorizontal:10, borderWidth:0.5, marginTop:20,borderColor:'#E0E0E0'}}>
              <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontWeight:'500',fontSize:14,color:common.blackColor,marginLeft:5}}>Status</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontWeight:'500',fontSize:14,color:common.blackColor,marginLeft:5}}>Start</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontWeight:'500',fontSize:14,color:common.blackColor,marginLeft:5}}>Duration</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontWeight:'500',fontSize:14,color:common.blackColor,marginLeft:5}}>Location</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontWeight:'500',fontSize:14,color:common.blackColor,marginLeft:5}}>Notes</Text>
              </View>
            </View>
            {this.state.logsForDay[0] && this.state.logsForDay[0].logs && this.state.logsForDay[0].logs.map((log, key) =>{
              if(log.status=="D"){

                let endDateTime=(log.day==moment().tz('UTC').startOf('day').toISOString())? new Date() : moment(log.day).endOf('day').toISOString();
                let _duration=moment(log.timeEnd || endDateTime).diff(log.timeStart, "minutes")
                self.hoursWorkedSelectedDay+=_duration;
              }
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

              let endDateTime=moment(this.state.selectedDate).endOf('day')._d;
               if(this.state.selectedDate == moment().tz('UTC').startOf('day').toISOString()){
                  endDateTime= new Date()
               }
               let __timeStart=log.timeStart
               let __timeEnd=log.timeEnd || endDateTime;
               if(moment(log.timeStart).isDST()){
                 __timeStart= moment(log.timeStart).add('minutes',self.getDSTBias(moment.tz.guess())*-1)
               }
               if(moment(log.timeEnd || endDateTime).isDST()){
                 __timeEnd= moment(log.timeEnd || endDateTime).add('minutes',self.getDSTBias(moment.tz.guess())*-1)
               }

               dataForGraph.push({
                 time:moment(__timeStart).hour() + (moment(__timeStart).minute()/60) + (moment(__timeStart).second()/(60*60)),
                 status: status
               }, {
                 time:moment(__timeEnd).hour() + (moment(__timeEnd).minute()/60) + (moment(__timeEnd).second()/(60*60)),
                 status: status
               });
              dataForGraph.sort((a, b) => a.time -b.time);
                return(
                  <View style={{flexDirection:'row',marginHorizontal:10, borderBottomWidth:0.5, borderRightWidth:0.5, borderLeftWidth:0.5,borderColor:'#E0E0E0'}} key={key}>
                        <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                            <Text style={{fontWeight:'300',fontSize:10,marginLeft:5}}>{this.renderDuty(log.status)}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                            <Text style={{fontWeight:'300',fontSize:10,marginLeft:5}}>{this.getHumanlyDate(log.timeStart)}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                            <Text style={{fontWeight:'300',fontSize:10,marginLeft:5}}>{calculateTotalTymebByStatusOfLog(log.timeStart,log.timeEnd)}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                            <Text style={{fontWeight:'300',fontSize:10,marginLeft:5}}>{log.location ? log.location.address : null}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  height:30,  borderRightWidth:0.5,borderColor:'#E0E0E0'}}>
                            <Text style={{fontWeight:'300',fontSize:10,marginLeft:5}}>{log.notes}</Text>
                        </View>


                </View>
              )
            })}
            {dataForGraph.length > 0 &&
             <View style={{flex:1}}>
                 <GraphComponent data={dataForGraph} navigationValue={this.props.navigation}/>
             </View>
           }
            <View>
            <Text style={{fontSize:18, paddingLeft:10, paddingTop:20,color:common.blackColor}}>Recep</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{marginHorizontal:10,  marginTop:14, width:100,borderWidth:0.8,borderColor:'#E0E0E0'}}>
                  {this.state.logsSeven.map((daylog,k) =>{
                    let day;
                    let driveHour;

                    if(k!=0){
                        let drivingDuration=0;
                        daylog.logs.forEach((innerLog,l)=>{
                          if(innerLog.status=="D"){
                            let endDateTime=moment(innerLog.day).endOf('day')._d;
                            let _duration=moment(innerLog.timeEnd || endDateTime).diff(innerLog.timeStart, "minutes")
                            drivingDuration=drivingDuration+_duration;
                          }
                        });
                        day= moment(moment(daylog.day).add('minutes',moment().utcOffset()*-1)).format('MM/DD');
                        self.hourWorkedLastSevenDays+=drivingDuration
                        driveHour=self.timeShowFromMinutes(drivingDuration);
                        return (
                          <View style={{flexDirection:'row', borderTopWidth:0.5,borderColor:'#E0E0E0'}}>
                            <View style={{flex:1, borderRightWidth:0.5,height:30,borderColor:'#E0E0E0'}}>
                              <Text style={{textAlign:'center', fontWeight:'400',paddingTop:4,color:common.blackColor}}>{day}</Text>
                            </View>
                            <View style={{flex:1}}>
                              <Text style={{textAlign:'center',paddingTop:4}}>{driveHour}</Text>
                            </View>
                          </View>
                        )
                      }else {
                        return (<View></View>)
                      }

                  })}

              </View>
              <View style={{ marginTop:14, borderWidth:0.8,height:155,paddingLeft:5,paddingRight:5,borderColor:'#E0E0E0'}}>
                <View style={{alignItems:'center',paddingTop:5,paddingBottom:5}}>
                  <Text style={{fontSize:15}}>Total Hours</Text>
                  <Text style={{fontSize:14, fontWeight:'400',color:common.blackColor}}>Last 6 days</Text>
                </View>
                <View style={{alignItems:'center',paddingBottom:5}}>
                  <Text style={{fontSize:14, fontWeight:'400'}}>{this.timeShowFromMinutes(this.hourWorkedLastSevenDays)}</Text>
                </View>
                <View style={{borderTopWidth:0.5,alignItems:'center',paddingTop:5,paddingBottom:5,borderColor:'#E0E0E0'}}>
                  <Text style={{fontSize:15}}>Hours</Text>
                  <Text style={{fontSize:14, fontWeight:'400',color:common.blackColor}}>Worked Today</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:14, fontWeight:'400'}}>{this.timeShowFromMinutes(this.hoursWorkedSelectedDay)}</Text>
                </View>
              </View>
              <View style={{marginLeft:10, marginTop:14, borderWidth:1,marginHorizontal:5, height:160, width:120, alignItems:'flex-end',borderColor:'#E0E0E0'}}>
                <Text style={{fontWeight:'400', paddingLeft:4,color:common.blackColor}}>I certify these entries are true and correct</Text>
                <View style={{marginTop:10}}><Image source={{uri: this.state.logsForDay[0] && this.state.logsForDay[0].reviewLogs?this.state.logsForDay[0].reviewLogs.signature:''}} style={{height:65, width:114, marginRight:2,marginTop:10}}/>
                </View>
              </View>
            </View>

          </View>
        }
          </ScrollView>
          <View style={{borderTopWidth:0.2, height:50}}>

            <View style={{flexDirection:'row', marginHorizontal:50,justifyContent:'center',alignItems:'center'}}>

              <TouchableHighlight underlayColor="transparent" style={{flex:1,height:45,justifyContent:'center'}} onPress={() => this.PreviousDay()}>
                <View style={{flexDirection:'row'}}>
                <Icon name="chevron-left" style={{paddingTop:5, paddingRight:10,color:common.blackColor}}/>
                <Text style={{fontSize:15, fontWeight:'700',color:common.blackColor}}>Previous Day</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" style={{flex:1, alignItems:'flex-end',height:45,justifyContent:'center'}} onPress={() => this.nextDay()} >
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:15,fontWeight:'700',color:common.blackColor}}>Next Day</Text>
                  <Icon name="chevron-right" style={{paddingTop:6, paddingLeft:10,color:common.blackColor}}/>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          </View>
        }

      </View>
    )
  }
}

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(DotInspectionMode);
