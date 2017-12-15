import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions, ScrollView, TouchableOpacity, AsyncStorage,ActivityIndicator } from 'react-native';
import Hr from 'react-native-hr';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripOverview from './../../components/tripOverview/tripOverview.js';
import Drawers from './../../components/SideMenu/Drawer.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import PubNub from 'pubnub';
import { config } from '../../../config.js';


import { ConvertDate,updateDriverLocation, showToast } from '../../utils/utility';

import BackgroundGeolocation from "react-native-background-geolocation";
import { Publish, subscribNewShipment, shipmentAssigned } from '../../services/pubnub.js';


import { HTTP } from './../../utils/HTTP.js';


/* Actions */
import { getAllAvailableShipmentRequest, selectShipment, clearShipments, clearSearchQuery, updateNewShipment, clearAssignedShipment ,getUpcomingShipmentByDriverCount} from './../../actions/shipments';
let prevLatitude=0.0;
let prevLongitude=0.0;
let self;
let window = Dimensions.get("window");



class PickUpHome extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    prevLatitude=0.0;
    prevLongitude=0.0;
    self= this;
    /* Lets keep this data for UI purpose */

    this.state = {
      isOpen: false,
        pagination: {
          limit: 5,
          skip: 0
        },
        isLoadingMore: false,
        driverCurrentLatLong: {
          latitude: null,
          longitude: null
        },
        isSearch: false,
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.loadShipments = this.loadShipments.bind(this);
    // this.selectShipment = this.selectShipment.bind(this);
    this.ConvertDate = this.ConvertDate.bind(this);
    this.upToDate = this.upToDate.bind(this);
    this.updateNewShipment = this.updateNewShipment.bind(this);
    this.updateDriverLocation = this.updateDriverLocation.bind(this);
  }

  updateDriverLocation(location) {
    updateDriverLocation(location);
  }

  updateNewShipment(id) {
    if (id) {
      AsyncStorage.getItem('@Axle:token')
          .then((token) => {
              HTTP('get', `shipment/getShipmentDetails/${id}`, {}, {authorization: "Bearer "+token}, {})
                .then((result) => {
                  console.log(result, 'result.....................................');
                  console.log(JSON.stringify(result.data));

                })
          })
    }
  }

  upToDate() {
    this.props.navigation.navigate('Shipments');
    // this.props.actions.clearSearchQuery();
    // const pagination = {
    //   limit: 5,
    //   skip: 0,
    // }
    // this.setState({pagination, isSearch: false});
    // this.loadShipments(5, 0, null);
  }
  driverStatusShipment(upcomingLoad){
    if(upcomingLoad>0){
      return upcomingLoad+" UPCOMING LOADS";
    }else {
      return "Up-to-date"
    }
  }

  ConvertDate(dateData) {
    return ConvertDate(dateData)
  }

  componentDidMount(){
    let self=this;
    const pubnub = new PubNub(config.pubnub);


    pubnub.subscribe({
        channels: ['new_shipment_created', 'shipment_assigned'],
        // channels: ['react'],
        withPresence: true,
    });

    pubnub.addListener({
        status: function(statusEvent){
            if (statusEvent.category === "PNConnectedCategory"){
                var newState = {
                    new: 'state'
                };
                pubnub.setState(
                    {
                        state: newState
                    },
                    (status) => {

                    }
                );
            }
        },
        message: (message) => {
          if (message.channel == 'new_shipment_created') {
            this.props.actions.updateNewShipment(message.message);
          }
          if (message.channel == 'shipment_assigned') {
            this.props.actions.clearAssignedShipment(message.message);
          }
        }
    });

    // pubnub.subscribe({
    //     channels: ['shipment_assigned'],
    //     // channels: ['react'],
    //     withPresence: true,
    // });

    // pubnub.addListener({
    //     status: function(statusEvent){
    //         if (statusEvent.category === "PNConnectedCategory"){
    //             var newState = {
    //                 new: 'state'
    //             };
    //             pubnub.setState(
    //                 {
    //                     state: newState
    //                 },
    //                 (status) => {
    //
    //                 }
    //             );
    //         }
    //     },
    //     message: (message) => {
    //         if (message.channel == 'shipment_assigned') {
    //           this.props.actions.clearAssignedShipment(message.message);
    //         }
    //     }
    // });


    AsyncStorage.getItem('@Axle:isLiveShipmentInTracking')
        .then((response) =>{
        if(response==null){
          BackgroundGeolocation.removeAllListeners();
          BackgroundGeolocation.watchPosition((location)=>{
          if(prevLatitude!=location.coords.latitude || prevLongitude!=location.coords.longitude){
            prevLatitude=location.coords.latitude;
            prevLongitude=location.coords.longitude;
            this.updateDriverLocation(location);
          }
          },(err)=>{
            console.log(err);
          })
        }
    })
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




    if (this.props.shipments.searchQuery && (this.props.shipments.searchQuery.cityState || this.props.shipments.searchQuery.deliveryStateCity || this.props.shipments.searchQuery.dateFrom || this.props.shipments.searchQuery.truckType)) {
      this.setState({isSearch: true, isLoadingMore: true});
    }
    console.log(this.state.driverCurrentLatLong, 'driver current lat long......');
    let driverCurrentLatLong = {}
    navigator.geolocation.getCurrentPosition(position => {
          driverCurrentLatLong.latitude = position.coords.latitude;
          driverCurrentLatLong.longitude =  position.coords.longitude
          this.setState({driverCurrentLatLong});
          // this runs when the user allows sharing their location.
          this.loadShipments(this.state.pagination.limit, this.state.pagination.skip, this.props.shipments.searchQuery,[position.coords.longitude, position.coords.latitude]);

    }, error => {
      // this runs when user doesn't allow their location sharing.
      showToast('Please update allow location sharing to get the percise shipment around your location.')
      this.loadShipments(this.state.pagination.limit, this.state.pagination.skip, this.props.shipments.searchQuery,this.props.user.driver.currentDriverLocation.coordinates);
    })
  }
  async componentWillMount(){
    this.props.actions.clearShipments();
    const { navigate} = this.props.navigation;
    await this.props.actions.getUpcomingShipmentByDriverCount({},navigate)
  }

  // componentWillReceiveProps(props) {
  //   alert('m')
  //   console.log(props, 'this is props...............');
  //   if (props.user) {
  //     this.loadShipments(this.state.pagination.limit, this.state.pagination.skip, this.props.shipments.searchQuery, props.user.driver.currentDriverLocation.coordinates);
  //   }
  // }

  // componentWillReceiveProps(props) {
  //   if (props.shipments.Shipment) {
  //     this.setState({loading: false})
  //   }
  // }

  async loadShipments(limit = this.state.pagination.limit, skip = this.state.pagination.skip, searchQuery = this.props.shipments.searchQuery, driverCurrentLocation){
      let query = { limit, skip };
      const { navigate} = this.props.navigation;

      if (searchQuery) {
        query = Object.assign({}, query, searchQuery);
        console.log('query^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', query);
      }
      if (driverCurrentLocation && !searchQuery.cityState && !searchQuery.deliveryStateCity) {
         query = Object.assign({}, query, {
           driverCurrentLocation: JSON.stringify(driverCurrentLocation)
         })

      }
      this.setState({isLoadingMore: true});
      let response = await this.props.actions.getAllAvailableShipmentRequest(query,navigate);
      if(response){
          this.updatePagination(limit, skip + limit);
          this.setState({isLoadingMore: false});
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
        console.log(this.state.isLoadingMore, 'this is loading......');
        if(!this.state.isLoadingMore){
            let windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
            if( windowHeight + offset >= height ){
                this.loadShipments(this.state.pagination.limit, this.state.pagination.skip)
                    .then(function(){})
            }
        }
    }
    onLocation(location) {
      updateDriverLocation(location);
    }
    selectShipment(shipment){
      let self=this
      const { navigate } = this.props.navigation;

        if (!shipment.shipper) {
          return;
        }
        self.props.actions.selectShipment(shipment,navigate).then(function(){

        });
        self.props.navigation.navigate('TripDetails');


    }

    closeDrawer() {
      this.setState({isOpen: false});
    }

  render(){
    // const { navigate, goBack, state,dispatch } = this.props.navigation;
    const { navigate, state, goBack,dispatch } = this.props.screenProps.rootNavigation;

    return (
      <Drawers isOpen={this.state.isOpen} closeDrawer={this.closeDrawer} navigate={navigate} navigationDispatch={dispatch}>
        <View style={[commonStyle.container,{backgroundColor : common.blackColor}]}>
        <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row',marginBottom:5}]}>
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
          <TouchableOpacity onPress={() => {this.upToDate()}}>
            <Text style={[commonStyle.fontSize_20,{color : common.greenColor,fontWeight :'500',lineHeight:20,marginRight: 15}]}>{this.driverStatusShipment(this.props.shipments.upcomingShipmentCount)}</Text>
          </TouchableOpacity>
            <Image
              style={{width : 19, height : 19}}
              source={images.Circle_Check}
            />
          </View>
        </View>

<View style={{marginHorizontal : 10}}>
        <View>
          <View style={[{flexDirection :'row',height:50,}]}>
            <TouchableHighlight onPress={() => this.setState({isSearch: !this.state.isSearch})} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.5},styles.filterBoxHome]}>
              {/*<TouchableHighlight onPress={() => navigate('SearchPickUp')} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.5},styles.filterBoxHome]}>*/}
                <View style={{flexDirection:'row'}}>
                  <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :11,marginLeft :13}]}>Search by load</Text>
                      <Image
                        style={{marginTop:8,position:'absolute',right:10}}
                        source={images.Search_Glass}
                      />

                </View>
              </TouchableHighlight>
          </View>
          {this.state.isSearch &&
            <View>
              <View style={[{flexDirection :'row',height: 50,}]}>
                  <TouchableHighlight onPress={() => navigate('SearchPickUp')} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.5,marginRight : 10},styles.filterBox]}>
                  <View>
                    <Text style={[commonStyle.fontSize_9,{fontWeight : 'bold',marginTop :11,marginLeft :14}]}>PICKUP LOCATION</Text>
                    {this.props.shipments.searchQuery && this.props.shipments.searchQuery.cityState &&
                      <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :1,marginLeft :14}]}>{this.props.shipments.searchQuery.cityState.substring(0, 24)}..</Text>

                    }
                  </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => navigate('SearchDropOff')} underlayColor={common.tuchableUnderlayWhiteColor} style={[{flex:0.5},styles.filterBox]}>
                  <View>
                    <Text style={[commonStyle.fontSize_9,{fontWeight : 'bold',marginTop :11,marginLeft :14}]}>DROP-OFF LOCATION</Text>
                    {this.props.shipments.searchQuery && this.props.shipments.searchQuery.deliveryStateCity &&
                      <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :1,marginLeft :14}]}>{this.props.shipments.searchQuery.deliveryStateCity.substring(0, 24)}..</Text>
                    }
                    {/*<Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :1,marginLeft :14}]}>{this.props.searchQuery.deliveryStateCity}</Text>*/}
                  </View>
                  </TouchableHighlight>
              </View>

              <TouchableHighlight onPress={() => navigate('PickUpDate')} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.filterBox,{marginTop : 10}]}>
              <View>
                <Text style={[commonStyle.fontSize_9,{fontWeight : 'bold',marginTop :11,marginLeft :14}]}>PICKUP DATE</Text>
                {this.props.shipments.searchQuery && this.props.shipments.searchQuery.dateFrom &&
                  <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :1,marginLeft :14}]}>{this.ConvertDate(this.props.shipments.searchQuery.dateFrom)}</Text>
                }
              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => navigate('TrailerType')} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.filterBox, {marginTop : 10}]}>
              <View>
                <Text style={[commonStyle.fontSize_9,{fontWeight : 'bold',marginTop :11,marginLeft :14}]}>TRAILER TYPE</Text>
                  {this.props.shipments.searchQuery && this.props.shipments.searchQuery.truckType &&

                    <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal',marginTop :1,marginLeft :14}]}>{this.props.shipments.searchQuery.truckType}</Text>

                  }
              </View>
              </TouchableHighlight>
              </View>
          }
          <View>
            <Text style={[commonStyle.fontSize_20,{fontWeight : 'normal',marginTop :11,marginLeft :13,color:common.whiteColor}]}>Nearby loads</Text>
          </View>
      </View>

          <View style={{height : window.height - 190,marginTop :0}}>
          <ScrollView contentContainerStyle={[{paddingBottom : this.state.isSearch ? 250 : 15,paddingTop :5}]} onScroll={this.onScroll}>
              {
                  this.props.shipments.Shipment.map((trip, key) => {
                      return(
                          <TripOverview key={key} trip = {trip} navigate={navigate} currentLocationOfDriver={this.state.driverCurrentLatLong} onPlusPress={()=>{self.selectShipment(trip)}}/>
                      )

                  })
              }

          </ScrollView>
          {this.state.isLoadingMore &&
            <ActivityIndicator/>
          }
          </View>
        </View>
        </View>
      </Drawers>
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        shipments: state.shipments,
        user: state.auth.user,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAllAvailableShipmentRequest,
            selectShipment,
            clearShipments,
            clearSearchQuery,
            updateNewShipment,
            clearAssignedShipment,
            getUpcomingShipmentByDriverCount
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PickUpHome)
