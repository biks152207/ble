import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableHighlight,Image, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import LocationBlock from './../../layouts/common/LocationBlock/LocationBlock';
import MapContainer from './../../layouts/common/Map/Map';
import ProgressBar from './../../layouts/common/ProgressBar/ProgressBar';
import ToAndFrom from './../../layouts/common/ToAndFrom/ToAndFrom';
import styles from './styles';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';

import images from './../../config/images.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';


import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import BackgroundGeolocation from "react-native-background-geolocation";

var bbox = require('geojson-bbox');
import accessToken from './../../utils/AccessToken';
// Mapbox.setAccessToken(accessToken);
// const firebase = require("firebase");
// import firebaseApp from './../../config/firebase.js';

import { HTTP } from './../../utils/HTTP';

import { getDistanceFromLatLonInMile } from './../../utils/utility';

/* Pubnub */
import { Publish, Subscribe } from '../../services/pubnub.js';
let isNavigateDone=false;
let isMapCentered=false;
let prevLatitude=0.0;
let prevLongitude=0.0;
let isStateUpdated=false;
class PickUpLocation extends Component {
  constructor(props){
    super(props);
    isNavigateDone=false;
    isMapCentered=false;
    prevLatitude=0.0;
    prevLongitude=0.0;
    isStateUpdated=false;
    this.state = {
      shipment: {
          shipmentID: null,
          driverId: '',
          pickupLocationLat : 0.0,
          pickupLocationLong : 0.0,
          deliveryLocationLat : 0.0,
          deliveryLocationLong :0.0,
          driverCurrentLatLong : [],
          Status: "ENROUTE_TO_PICKUP"
      },
      // centerCoordinate: {
      //   latitude: 34.0522,
      //   longitude: -118.2437,
      // },
      annotations:[{
        coordinates: [[34.0522, -118.2437]],
        type: 'polyline',
        strokeColor: '#00FF00',
        strokeWidth: 2,
        id: 'driver path'
      }],
      pickUpTotalDistance: null,
      deliveryTotalDistance: null,
      progressValue: null,
      nearByMeter: 150
    }
    this.addAnnotations = this.addAnnotations.bind(this);
    this.getMidpoint = this.getMidpoint.bind(this);
    // this.onLocation = this.onLocation.bind(this);
    this.sendToShipment =this.sendToShipment.bind(this);
    this.publishUpdatedShipment=this.publishUpdatedShipment.bind(this);
  }

  addAnnotations(location) {
    let coordinateElement = [[location[0], location[1]]];
    let newCoordinates    = this.state.annotations[0].coordinates.concat(coordinateElement);
    this.setState({
      annotations: [{
        coordinates: newCoordinates,
        type: 'polyline',
        strokeColor: '#00FF00',
        strokeWidth: 2,
        id: 'driver path'
      }]
    });
  }


  publishUpdatedShipment = (position, shipment) => {
    isStateUpdated=true
    const { navigate,goBack } = this.props.navigation;

      let updatedShipment = shipment;
      let distanceInMeter=0;
      if (shipment.Status === "ENROUTE_TO_PICKUP") {
        const currentDistance = getDistanceFromLatLonInMile(shipment.pickupLocationLat, shipment.pickupLocationLong, position.latitude, position.longitude);
        const progressValue = this.state.pickUpTotalDistance - currentDistance <0 ?0:this.state.pickUpTotalDistance - currentDistance;
        this.setState({ progressValue });
        distanceInMeter = currentDistance*1609.34;

        if (distanceInMeter <= this.state.nearByMeter) {
            updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status:"PICKED_UP"});
        }
      } else if (shipment.Status === "PICKED_UP") {
        const currentDistance = getDistanceFromLatLonInMile(shipment.pickupLocationLat, shipment.pickupLocationLong, position.latitude, position.longitude);
        const progressValue = this.state.pickUpTotalDistance - currentDistance <0 ?0:this.state.pickUpTotalDistance - currentDistance;
        this.setState({ progressValue });
        distanceInMeter = currentDistance*1609.34;
        console.log("distanceInMeter ","PICKED_UP",distanceInMeter);
        if (distanceInMeter >= this.state.nearByMeter) {
            updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status:"ENROUTE_TO_DELIVERY"});
        }
      } else if (shipment.Status == "ENROUTE_TO_DELIVERY") {
        const currentDistance = getDistanceFromLatLonInMile(shipment.deliveryLocationLat, shipment.deliveryLocationLong, position.latitude, position.longitude);
        const progressValue = this.state.pickUpTotalDistance - currentDistance <0 ?0:this.state.pickUpTotalDistance - currentDistance;
        this.setState({ progressValue });
        distanceInMeter = currentDistance*1609.34;
        if (distanceInMeter <= this.state.nearByMeter) {
            updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status:"DELIVERED"});
        }
      }

      const data = {
        shipmentId:  updatedShipment.shipmentID,
        shipmentCurrentStatus: updatedShipment.Status,
        currentLocationLatitude: position.latitude,
        currentLocationLongitude: position.longitude,
        milesLeft: parseInt(distanceInMeter/1609.34)
      }
        AsyncStorage.getItem('@Axle:token')
            .then(function(token){
              HTTP('put', '/driver/updateShipmentStatus', data, {authorization: "Bearer "+token})
                .then((response) => {

                  if(updatedShipment.Status === 'DELIVERED'){
                   //  BackgroundGeolocation.un('location', this.onLocation);
                    if(!isNavigateDone){
                      navigate('DocType')
                      isNavigateDone=true
                    }
                  }
                })

       })


       this.setState({
         shipment: updatedShipment
       },()=>{
         isStateUpdated=false;
       });
      // Publish(updatedShipment, shipment.driverId);
  }


  getMidpoint(lat1, lng1, lat2, lng2, lat3, lng3) {

    var feature = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      [lat1, lng1], [lat2, lng2], [lat3, lng3]
    ]
  }
};
var extent = bbox(feature);
return extent;

      // Math.degrees = function(rad) {
      //     return rad * (180 / Math.PI);
      // }
      // Math.radians = function(deg) {
      //     return deg * (Math.PI / 180);
      // }
      // lat1 = Math.radians(lat1);
      // lng1 = Math.radians(lng1);
      // lat2 = Math.radians(lat2);
      // lng = Math.radians(lng2);
      // bx = Math.cos(lat2) * Math.cos(lng - lng1)
      // by = Math.cos(lat2) * Math.sin(lng - lng1)
      // lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + Math.pow(by, 2)));
      // lon3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx);
      // return [Math.round(Math.degrees(lat3), 5), Math.round(Math.degrees(lon3), 5)]
  }

  componentWillMount() {
    const selectedShipment=this.props.shipments.selectedShipment;

    // navigator.geolocation.getCurrentPosition(position => {


        let position={};
        position['coords']={};
        position.coords['latitude']=selectedShipment.driver.driver.currentDriverLocation.coordinates[1]
        position.coords['longitude']=selectedShipment.driver.driver.currentDriverLocation.coordinates[0]
        let shipment = {};
        shipment.driverCurrentLatLong = [position.coords.latitude, position.coords.longitude];
        shipment.shipmentID  = selectedShipment._id;
        shipment.driverId = this.props.user._id;
        shipment.pickupLocationLat = selectedShipment.pickupLocationLat;
        shipment.pickupLocationLong = selectedShipment.pickupLocationLong;
        shipment.deliveryLocationLat =  selectedShipment.deliveryLocationLat;
        shipment.deliveryLocationLong = selectedShipment.deliveryLocationLong;
        shipment.Status = selectedShipment.currentStatus;
        const pickUpTotalDistance = getDistanceFromLatLonInMile(shipment.pickupLocationLat, shipment.pickupLocationLong, position.coords.latitude, position.coords.longitude, 'K');

        const deliveryTotalDistance = getDistanceFromLatLonInMile(shipment.deliveryLocationLat, shipment.deliveryLocationLong, position.coords.latitude, position.coords.longitude, 'K');

        const centerPoint = this.getMidpoint(shipment.pickupLocationLat, shipment.pickupLocationLong, shipment.deliveryLocationLat, shipment.deliveryLocationLong,position.coords.latitude, position.coords.longitude);
        // const centerCoordinate = {
        //   latitude: centerPoint[0],
        //   longitude: centerPoint[1]
        // }
        // this.setState({shipment, centerCoordinate, pickUpTotalDistance, deliveryTotalDistance});
        this.setState({shipment,  pickUpTotalDistance, deliveryTotalDistance});

        this.publishUpdatedShipment(position.coords, shipment);
      // })
  }

  componentDidMount(){

    let self=this;

AsyncStorage.setItem('@Axle:isLiveShipmentInTracking',self.props.shipments.selectedShipment._id);

    BackgroundGeolocation.removeAllListeners();
    BackgroundGeolocation.watchPosition((location)=>{
    if(prevLatitude!=location.coords.latitude || prevLongitude!=location.coords.longitude){
       prevLatitude=location.coords.latitude;
       prevLongitude=location.coords.longitude;
        if (self.state.shipment.shipmentID && !isStateUpdated) {
          self.publishUpdatedShipment(location.coords, self.state.shipment);
          // firebase.database().ref('locationDb').push({
          //       location:location.coords,
          //       screen:'LIVE'
          //      })
        }
    }
    },(err)=>{
      console.log(err);
    })


  }

 sendToShipment(){

   const { navigate,goBack } = this.props.navigation;


   const resetAction = NavigationActions.reset({
 index: 0,
 actions: [
   NavigationActions.navigate({ routeName: 'Shipments'})
 ]
})

  //  const backAction = NavigationActions.back()
this.props.navigation.dispatch(resetAction)
   // navigate("Shipments")
 }

componentWillUnmount(){

}
  statusRender(status){
    if(status=="ENROUTE_TO_PICKUP" ||status=="PICKED_UP" ){
      return 'Pickup Location'
    }else if (status=="ENROUTE_TO_DELIVERY") {
      return 'Drop-off Location'

    }else {
      return ''

    }
  }


  render(){
    const { navigate,goBack } = this.props.navigation;
    let self=this;
    // if (this.state.shipment.Status === 'DELIVERED') {
    //   navigate('DocType')
    // }
    return (
      <View style={commonStyle.container}>
      <View style={[{backgroundColor:common.blackColor,flexDirection:'row'}]}>
        <TouchableHighlight onPress={() => this.sendToShipment()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :20},commonStyle.contentCenter]}>
          <Image
            style={{}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        <View style={{justifyContent:'center',marginTop:20}}>
          <Text style={{color:common.greenColor,fontSize: 20, fontWeight: '500'}}>{self.statusRender(self.state.shipment.Status)}</Text>
        </View>

      </View>
          { this.state.shipment && this.state.shipment.shipmentID &&
            <View style={{height: 120}}>
              {(this.state.shipment.Status === 'ENROUTE_TO_PICKUP' || this.state.shipment.Status === 'PICKED_UP') &&
                <LocationBlock

                  name={this.props.shipments.selectedShipment.pickupCompanyName}
                  place={this.props.shipments.selectedShipment.pickupCompanyAddress}
                  location={`${this.props.shipments.selectedShipment.pickupCity} , ${this.props.shipments.selectedShipment.pickupState} , ${this.props.shipments.selectedShipment.pickupZipcode}, ${this.props.shipments.selectedShipment.pickupMobile}`} />
              }
              {(this.state.shipment.Status === 'ENROUTE_TO_DELIVERY' || this.state.shipment.Status === 'DELIVERED') &&
                <LocationBlock

                  name={this.props.shipments.selectedShipment.deliveryCompanyName}
                  place={this.props.shipments.selectedShipment.deliveryCompanyAddress}
                  location={`${this.props.shipments.selectedShipment.deliveryCity}, ${this.props.shipments.selectedShipment.deliveryState} , ${this.props.shipments.selectedShipment.deliveryZipcode}, ${this.props.shipments.selectedShipment.deliveryMobile}`} />
              }
              </View>
          }
          <TouchableHighlight   style={{marginTop:0}}>
            <View style={{height:200}}>
              { this.state.shipment && this.state.shipment.shipmentID  ?
                <MapView
                  ref={map => { this._map = map;
                    let getBounds=self.getMidpoint(self.props.shipments.selectedShipment.pickupLocationLat, self.props.shipments.selectedShipment.pickupLocationLong, self.props.shipments.selectedShipment.deliveryLocationLat, self.props.shipments.selectedShipment.deliveryLocationLong,self.props.shipments.selectedShipment.driver.driver.currentDriverLocation.coordinates[1], self.props.shipments.selectedShipment.driver.driver.currentDriverLocation.coordinates[0]);
                     if(map){
                       if(!isMapCentered){
                         isMapCentered=true;
                         setTimeout(()=>{ map.setVisibleCoordinateBounds(getBounds[0], getBounds[1], getBounds[2], getBounds[3], paddingTop = 0, paddingRight = 50, paddingBottom = 0, paddingLeft = 50, animated = true)},500)

                       }
                   }

                   }} style={{flex:1}}
                  // initialCenterCoordinate={this.state.centerCoordinate}
                  initialZoomLevel={2}
                  initialDirection={0}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  showsUserLocation={true}
                  userLocationVisible={true}
                  styleURL={Mapbox.mapStyles.streets}
                  userTrackingMode={Mapbox.userTrackingMode.none}
                  // annotations={this.state.annotations}
                >

                   <Annotation
                    id="driverCurrentLocation"
                    coordinate={{latitude: this.state.shipment.driverCurrentLatLong[0], longitude: this.state.shipment.driverCurrentLatLong[1]}}
                    style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                  >
                    <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={images.Truck} />
                    </View>
                  </Annotation>
                  <Annotation
                    id="pickupLocation"
                    coordinate={{latitude: this.props.shipments.selectedShipment.pickupLocationLat, longitude: this.props.shipments.selectedShipment.pickupLocationLong}}
                    style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                  >
                    <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={images.Location_Map} />
                      <Text>{this.props.shipments.selectedShipment.pickupCompanyName}</Text>
                    </View>
                  </Annotation>
                  <Annotation
                    id="deliveryLocation"
                    coordinate={{latitude: this.props.shipments.selectedShipment.deliveryLocationLat, longitude: this.props.shipments.selectedShipment.deliveryLocationLong}}
                    style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                  >
                    <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={images.Pin_Map} />
                      <Text>{this.props.shipments.selectedShipment.deliveryCompanyName}</Text>
                    </View>
                  </Annotation>
                </MapView>
                : null
              }
            </View>
          </TouchableHighlight>
          <View style={{height:50}}>
          <TouchableHighlight onPress={() => {}} >
            <View>
             { this.state.shipment && this.state.shipment.shipmentID &&
               <ProgressBar title={this.state.shipment.Status} progressValue={this.state.progressValue} total={this.state.pickUpTotalDistance} />

             }
          </View>
        </TouchableHighlight>
          </View>
          <View style={{height: 187}}>
          <TouchableHighlight onPress={() => navigate('FullInfo')} >
            <View>
            <ToAndFrom arrowType={images.arrow_up} details={this.props.shipments.selectedShipment}/>
            </View>
          </TouchableHighlight>
          </View>
      </View>
    )
  }
};

function mapStateToProps(state){
    return {
        shipments: state.shipments,
        user: state.auth.user
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             acceptShipment
//         }, dispatch)
//     };
// }

export default connect(mapStateToProps, null)(PickUpLocation)
