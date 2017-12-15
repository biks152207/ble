import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions, TouchableHighlight,Image, ActivityIndicator,AsyncStorage} from 'react-native';
let window = Dimensions.get("window");
let { height, width } = window;
import ToAndFrom from './../../../layouts/common/ToAndFrom/ToAndFrom';

import styles from './styles';
import Tabs from './../../../components/Tabs/Tabs.js';
import commonStyle from './../../../config/commonStyle.js';
import common from './../../../config/common';

import { ButtonLoader ,ContentLoader} from './../../../components/loader';


import Header from './../../../layouts/common/Header/Header';
import TopNavigationSection from './../../../layouts/common/TopNavigationSection/TopNavigationSection';
import ToAndFromFooter from './../../../layouts/common/ToAndFromFooter/ToAndFromFooter';
import TripOverview from './../../../components/tripOverview/tripOverview.js';

import MessageView from './../../../components/messageView/messageView.js';
import { selectShipment, clearShipments } from './../../../actions/shipments';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { throttle,updateDriverLocation } from './../../../utils/utility';
import BackgroundGeolocation from "react-native-background-geolocation";
import { NavigationActions } from 'react-navigation';
import Drawers from './../../../components/SideMenu/Drawer.js';

/* Actions */
import { getLiveShipmentByDriver , getUpcomingShipmentByDriver , getPastShipmentByDriver , getUpcomingShipmentByDriverCount} from './../../../actions/shipments';

class UpcomingShipment extends Component {
  constructor(props){
    super(props);
    this.prevLatitude =0.0;
    this.prevLongitude=0.0;
    let message = [{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    }];
    this.state = {
      message,
      isOpen: false,
      screen: 'UPCOMING',
      pagination: {
        limit: 5,
        skip: 0
      },
      isLiveDetail: true,
      isUpComingDetail: true,
      isTripDetail: true,
      isLoadingMore: false,
      isLoading:true
    }

    this.closeDrawer = this.closeDrawer.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.loadShipments = this.loadShipments.bind(this);
    this.selectLiveShipment = this.selectLiveShipment.bind(this);
    this.onLocation=this.onLocation.bind(this);
    this.watchPosition=this.watchPosition.bind(this);
    // this.selectLiveShipment = throttle(this.selectLiveShipment, 300, this);
  }
componentDidMount(){
let self=this;
// BackgroundGeolocation.un('location', ()=>{});


AsyncStorage.getItem('@Axle:isLiveShipmentInTracking')
    .then((response) => {
    if(response==null){

      BackgroundGeolocation.removeAllListeners();
      BackgroundGeolocation.watchPosition((location)=>{
      if(this.prevLatitude!=location.coords.latitude || this.prevLongitude!=location.coords.longitude){
         this.prevLatitude=location.coords.latitude;
         this.prevLongitude=location.coords.longitude;
        updateDriverLocation(location);
      }
      },(err)=>{
        console.log(err);
      })
    }
})
// BackgroundGeolocation.removeAllListeners();


// BackgroundGeolocation.watchPosition((obj)=>{
// if(obj.is_moving && prevLatitude!=obj.coords.latitude && prevLongitude!=obj.coords.longitude){
//   let prevLatitude=obj.coords.latitude;
//   let prevLongitude=obj.coords.longitude;
//   updateDriverLocation(obj);
// }
// },(err)=>{
//   console.log(err);
// })
  // setTimeout(()=>{
  //   BackgroundGeolocation.on('location', self.onLocation);
  // })
  //
  // BackgroundGeolocation.configure({
  //   // Geolocation Config
  //   desiredAccuracy: 0,
  //   distanceFilter: 1,
  //   // Activity Recognition
  //   stopTimeout: 1,
  //   // Application config
  //   debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
  //   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  //   stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
  //   startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
  //
  // }, (state) => {
  //   console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  //
  //   if (!state.enabled) {
  //     // 3. Start tracking!
  //     BackgroundGeolocation.start(function() {
  //       console.log("- Start success");
  //     });
  //   }else {
  //
  //   }
  // });
}

  onLocation(location) {
    updateDriverLocation(location);
  }
  watchPosition(obj){

  }
  closeDrawer() {
    this.setState({isOpen: false});
  }
  changeScreen(screen) {
    this.props.actions.clearShipments();
    let self=this;
      this.setState({screen,
        isOpen: false,
        isLoading:true,
        pagination: {
        limit: 5,
        skip: 0,
      }},()=>{
         self.loadShipments(self.state.pagination.limit, self.state.pagination.skip)
      });
  }
  driverStatusShipment(upcomingLoad){
    if(upcomingLoad>0){
      return upcomingLoad+" UPCOMING LOADS";
    }else {
      return "Up-to-date"
    }
  }
  async componentWillMount(){
    const { navigate } = this.props.navigation;

    this.props.actions.clearShipments();
    await this.props.actions.getUpcomingShipmentByDriverCount({},navigate);

    await this.loadShipments(this.state.pagination.limit, this.state.pagination.skip);
  }

  async loadShipments(limit = this.state.pagination.limit, skip = this.state.pagination.skip){
      let query = { limit, skip };
      const { navigate } = this.props.navigation;
let self=this;
      this.setState({isLoadingMore: true});

      let response ;

      if(this.state.screen==="LIVE"){
      response =  await this.props.actions.getLiveShipmentByDriver(query,navigate);

      }
      else if (this.state.screen==="UPCOMING") {
      response =  await this.props.actions.getUpcomingShipmentByDriver(query,navigate);

      }else if (this.state.screen==="PAST") {
      response =  await this.props.actions.getPastShipmentByDriver(query,navigate);

      }
      if(response){

          this.updatePagination(limit, skip + limit);

             //
            //  self.setState({isLoading:false})
             self.setState({isLoading:false,isLoadingMore: false});


      }
  }

  updatePagination(limit, skip){
      this.setState({
          pagination: {
              limit: limit,
              skip: skip
          }
      })
  }

    onScroll(e){
      console.log("@@@@@@@@@@@@ LIMIT & SKIP",this.state.pagination.limit,this.state.pagination.skip);
        if(!this.state.isLoadingMore && !(this.state.pagination.skip >= this.props.shipments.count)){
            let windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
            if( windowHeight + offset >= height ){
                this.loadShipments(this.state.pagination.limit, this.state.pagination.skip)
                    .then(function(){})
            }
        }
    }
    selectLiveShipment(shipment){
      const { navigate } = this.props.navigation;
        // if (this.state.isLiveDetail) {
          this.setState({ isLiveDetail : false})
          let self=this;
            self.props.actions.selectShipment(shipment,navigate).then(function(){
              self.setState({ isLiveDetail : true})

              self.props.screenProps.rootNavigation.navigate('PickUpLocation');

            });
        // }

    }
    selectPastShipment(shipment){
      const { navigate } = this.props.navigation;
        // if (this.state.isLiveDetail) {
        //   this.setState({ isLiveDetail : false})
          let self=this;
          self.props.screenProps.rootNavigation.navigate('TripComplete');

            self.props.actions.selectShipment(shipment,navigate).then(function(){

            });
        // }

    }
    selectUpcomingShipment(shipment){
      const { navigate } = this.props.navigation;
      if (this.state.isUpComingDetail) {
        this.setState({isUpComingDetail: false })
        let self=this;
        self.props.screenProps.rootNavigation.navigate('UpComingLoad');
          self.props.actions.selectShipment(shipment,navigate).then(function(){

          });
      }
      setTimeout(() => {
        this.setState({ isUpComingDetail: true})
      }, 300)

    }
    selectTripDetails(shipment){
      const { navigate } = this.props.navigation;

      if (this.state.isTripDetail) {
        this.setState({isTripDetail: false})
        let self=this;
        self.props.screenProps.rootNavigation.navigate('TripDetails');
          self.props.actions.selectShipment(shipment,navigate).then(function(){

          });
      }
      setTimeout(() => {
        this.setState({ isTripDetail: true})
      }, 300)
    }

    liveShipment(shipment , navigate){

        return (
          <View>
          {this.state.isLoading?<ContentLoader/>:
              shipment &&  <View>
                <ToAndFrom reduceWidth={20} borderRadius={[2,2,0,0]} arrowType={'none'} details={shipment} color={this.state.screen === "PAST" ? '#FF0033': null}/>
                <ToAndFromFooter details={shipment}/>
                <View>
                  <View style={styles.hr}/>

                    <View style={[{paddingTop :23.5, backgroundColor: '#FFFFFF', paddingHorizontal:20}]}>
                        <Text style={{fontSize:18, lineHeight: 20, paddingBottom:28}}>Messages</Text>

                             <MessageView data ={shipment}/>

                     </View>
                   <View style={{position: 'relative', height: 122.5,backgroundColor: '#FFFFFF',width: window.width, bottom: 0}}>
                     <View style={{paddingTop: 10}}>
                      <View style={styles.hr}/>
                     </View>
                     <TouchableHighlight onPress={() => this.selectLiveShipment(shipment)}  underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:0, height: 50, marginTop: 30, marginHorizontal:10}]}>
                      <View>
                      {!this.state.isLiveDetail &&
                        <ButtonLoader/>
                      }
                      <Text style={[commonStyle.fontSize_14,{fontWeight:'bold',fontFamily:'ProximaNova-Bold'}]}>VIEW SHIPMENT</Text>

                      </View>
                     </TouchableHighlight>
                   </View>
                </View>

                </View>
              }
                </View>
              )


    }
    upcomingShipment(shipments){
      let self=this;

              return  (
                <View>
                {this.state.isLoading?<ContentLoader/>:
      shipments && shipments.Shipment && shipments.Shipment.length>0 &&  shipments.Shipment.map((shipment,i)=>{

            return (
                    <View key={i}>
                    <TripOverview trip = {shipment} navigate={this.props.screenProps.rootNavigation.navigate} onPress={() => this.selectUpcomingShipment(shipment)} onPlusPress={()=>{self.selectTripDetails(shipment)}}/>
                    </View>
                  )
        })
      }
        </View>
      )





    }
    pastShipment(shipments){
let self=this;

              return  (
                <View>
                {this.state.isLoading?<ContentLoader/>:
      shipments && shipments.Shipment && shipments.Shipment.length>0 &&  shipments.Shipment.map((shipment,i)=>{

            return (
                  <View style={styles.topContainer} key={i}>
                  <TouchableHighlight onPress={() => self.selectPastShipment(shipment)}  underlayColor={common.tuchableUnderlayGreenColor} style={{}}>
                    <View style={styles.toAndFromContainer}>
                    {self.props.user.driver.carrier===null || self.props.user.driver.carrier=== undefined?

                      <View style={{borderBottomWidth: 1,flexDirection:'row',flex:1 ,backgroundColor:'#ffffff', borderColor:common.grayColor, height:40}}>
                          <View style={{alignItems: 'flex-start',flex:1, paddingTop:12}}>
                              <Text style={[{paddingHorizontal:20, fontWeight: '500'}, common.fontSize_18]}>{shipment.shipper && shipment.shipper.shipper && shipment.shipper.shipper.company_name? shipment.shipper.shipper.company_name : 'Not available'} {shipment.shipper ? shipment.shipper.shipper.MCNumber ? `${shipment.shipper.shipper.MCNumber}`: ': MC Not available' : null}</Text>
                          </View>
                      </View>
                      :null}
                    <ToAndFrom reduceWidth={20} borderRadius={[2,2,0,0]} arrowType={'none'} details={shipment} />

                    <View style={{backgroundColor: '#FFFFFF'}}>
                    <View style={[styles.hr,{marginTop:5}]}/>
                    <View  style={[styles.wrapper]}>
                              <View style={{flex:0.5}}>
                                <Text  style={styles.subHeading}>{shipment.currentStatus}</Text>
                              </View>
                                {self.props.user.driver.carrier===null || self.props.user.driver.carrier=== undefined?
                              <View style={{flex:0.5}}>
                                <Text style={[styles.subHeading, {textAlign: 'center'}]}>PAID ${shipment.lowPrice}</Text>
                              </View>
                              :null}
                            </View>

                    </View>
                  </View>
                  </TouchableHighlight>
                  </View>
                  )

        })
      }
      </View>
    )




    }



  render(){
    let self=this;
    const { navigate, state, goBack,dispatch } = this.props.screenProps.rootNavigation;
    const {shipments}=this.props;
    return (
    <Drawers isOpen={this.state.isOpen} closeDrawer={this.closeDrawer} navigate={navigate} navigationDispatch={dispatch}>
    <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
      <View style={{flex:0.5,flexDirection : 'row'}}>
      <TouchableHighlight onPress={() => {this.setState({isOpen: true})}} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :5},commonStyle.contentCenter]}>
        <Image
          style={{width : 21, height : 18}}
          source={images.Hamburger}
        />
      </TouchableHighlight>
        {/*<Text style={[commonStyle.fontSize_20,{color : common.whiteColor,fontWeight :'500',lineHeight:20,marginTop :39}]}>Results</Text>*/}
      </View>
      <View style={[{flex:1, marginTop : 5,marginRight : 24,flexDirection : 'row'},commonStyle.contentRight]}>
      <Text style={[commonStyle.fontSize_20,{color : common.greenColor,fontWeight :'500',lineHeight:20,marginRight: 15}]}>{this.driverStatusShipment(shipments.upcomingShipmentCount)}</Text>
        <Image
          style={{width : 19, height : 19}}
          source={images.Circle_Check}
        />
      </View>
    </View>
      <View style={styles.topContainer}>
      <View style={styles.header}>
        <View style={[styles.horizontalMargin, styles.paddingTop51]}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Shipments</Text>
          </View>
        </View>
      </View>
        <TopNavigationSection changeScreen={this.changeScreen} />
        <ScrollView onScroll={this.onScroll} contentContainerStyle={[{paddingBottom : 30}]}>
          <View style={styles.toAndFromContainer}>


              {this.state.screen === "UPCOMING" ||  this.state.screen === "PAST"?
                <View>
                    {this.state.screen === "UPCOMING" ?
                     self.upcomingShipment(shipments)  :
                    self.pastShipment(shipments)
                    }
                </View>:
                self.liveShipment(shipments && shipments.Shipment && shipments.Shipment.length>0?shipments.Shipment[0]:undefined , navigate)
              }

            </View>
            {this.state.isLoadingMore && !this.state.isLoading &&
              <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                <ActivityIndicator/>
              </View>
            }

        </ScrollView>
        {/* <Tabs navigate={navigate} state={state} /> */}
      </View>
      </Drawers>
    )
  }
};

/* Map state to props */
function mapStateToProps(state){
    return {
        shipments: state.shipments,
        user: state.auth.user
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getLiveShipmentByDriver,
            getUpcomingShipmentByDriver,
            getPastShipmentByDriver,
            selectShipment,
            getUpcomingShipmentByDriverCount,
            clearShipments
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingShipment)
