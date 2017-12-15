import React, { Component } from 'react';
import { Text, ScrollView, View,TouchableHighlight,Image ,AsyncStorage } from 'react-native';

import LocationBlock from './../../layouts/common/LocationBlock/LocationBlock';
import MapContainer from './../../layouts/common/Map/Map';
import ProgressBar from './../../layouts/common/ProgressBar/ProgressBar';
import ToAndFrom from './../../layouts/common/ToAndFrom/ToAndFrom';

import styles from './styles';
import commonStyle from './../../config/commonStyle.js';
import images from './../../config/images.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import accessToken from './../../utils/AccessToken';
// Mapbox.setAccessToken(accessToken);

import { HTTP } from './../../utils/HTTP';

/* Pubnub */
import { Publish, Subscribe } from '../../services/pubnub.js';
class DropOffLocation extends Component {
  constructor(props){
    super(props);

    this.state = {
      shipment: {
          shipmentID: '',
          driverId: '',
          pickupLocationLat : 0.0,
          pickupLocationLong : 0.0,
          deliveryLocationLat : 0.0,
          deliveryLocationLong :0.0,
          driverCurrentLatLong : [],
          Status: "ENROUTE_TO_PICKUP"
      },
      centerCoordinate: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      annotations:[{
        coordinates: [[34.0522, -118.2437]],
        type: 'polyline',
        strokeColor: '#00FF00',
        strokeWidth: 2,
        id: 'driver path'
      }],
    }
    this.addAnnotations = this.addAnnotations.bind(this);
    this.getMidpoint = this.getMidpoint.bind(this);
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

      let updatedShipment;
      if(position.latitude === shipment.pickupLocationLat && position.longitude === shipment.pickupLocationLong){
        updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status:"PICKED_UP"})
      } else if(shipment.Status === "PICKED_UP" && position.latitude != shipment.deliveryLocationLat) {
        updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status:"ENROUTE_TO_DELIVERY"})
      } else if(position.latitude === shipment.deliveryLocationLat && position.longitude === shipment.deliveryLocationLong){
        updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status: "DELIVERED"})
      } else {
        updatedShipment = Object.assign({}, shipment, {driverCurrentLatLong:[position.latitude, position.longitude], Status: "ENROUTE_TO_PICKUP"})
      }
      this.setState({
        shipment: updatedShipment
      })
      const data = {
        shipmentId:  updatedShipment.shipmentID,
        shipmentCurrentStatus: updatedShipment.Status,
        currentLocationLatitude: position.latitude,
        currentLocationLongitude: position.longitude
      }
      AsyncStorage.getItem('@Axle:token')
          .then(function(token){
            HTTP('put', '/driver/updateShipmentStatus', data, {authorization: "Bearer "+token})
              .then((response) => {
                console.log('this is response', response);
              })
     })
      // Publish(updatedShipment, shipment.driverId);
  }


  getMidpoint(lat1, lng1, lat2, lng2) {
    Math.degrees = function(rad) {
        return rad * (180 / Math.PI);
    }
    Math.radians = function(deg) {
        return deg * (Math.PI / 180);
    }
    lat1 = Math.radians(lat1);
    lng1 = Math.radians(lng1);
    lat2 = Math.radians(lat2);
    lng = Math.radians(lng2);
    bx = Math.cos(lat2) * Math.cos(lng - lng1)
    by = Math.cos(lat2) * Math.sin(lng - lng1)
    lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + Math.pow(by, 2)));
    lon3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx);
    return [Math.round(Math.degrees(lat3), 5), Math.round(Math.degrees(lon3), 5)]
}

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //       this.publishUpdatedShipment(position.coords);
  //     })
  //
  // }
  componentWillMount() {
    const selectedShipment=this.props.shipments.selectedShipment;
    navigator.geolocation.getCurrentPosition(position => {
        let shipment = {};
        shipment.driverCurrentLatLong = [position.coords.latitude, position.coords.longitude];
        shipment.shipmentID  = selectedShipment._id;
        shipment.driverId = this.props.user._id;
        shipment.pickupLocationLat = selectedShipment.pickupLocationLat;
        shipment.pickupLocationLong = selectedShipment.pickupLocationLong;
        shipment.deliveryLocationLat =  selectedShipment.deliveryLocationLat;
        shipment.deliveryLocationLong = selectedShipment.deliveryLocationLong;
        shipment.Status = "ENROUTE_TO_PICKUP";
        const centerPoint = this.getMidpoint(shipment.pickupLocationLat, shipment.pickupLocationLong, shipment.deliveryLocationLat, shipment.deliveryLocationLong);
        const centerCoordinate = {
          latitude: centerPoint[0],
          longitude: centerPoint[1]
        }
        this.setState({shipment, centerCoordinate});
        this.publishUpdatedShipment(position.coords, shipment);
      })
  }

  componentDidMount(){

      // (Subscribe(this.props.user._id)).then(response => {
      //   this.setState({
      //     shipment : response,
      //   });
      //   this.addAnnotations(response.driverCurrentLatLong);
      // })
      navigator.geolocation.watchPosition(position => {
        this.publishUpdatedShipment(position.coords, this.state.shipment);
      })
  }

  render(){
    const { navigate,goBack } = this.props.navigation;
    const shipment=this.props.shipments.selectedShipment
    const driverLocation=this.state.shipment;
    return (
      <View style={[styles.container, commonStyle.container]}>

      <View style={[{backgroundColor:common.blackColor}]}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 20,marginTop :10},commonStyle.contentCenter]}>
          <Image
            style={{}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>

      </View>
      <LocationBlock
        title={'Drop-off Location'}
        name={shipment.deliveryCompanyName}
        place={shipment.deliveryCompanyAddress}
        location={`${shipment.deliveryCity}, ${shipment.deliveryState} , ${shipment.deliveryZipcode}`} />

        <TouchableHighlight>
        <View style={{height:200}}>
          {this.props.shipments.selectedShipment && driverLocation.shipmentID ?
            <MapView
              ref={map => { this._map = map; }} style={{flex:1}}
              initialCenterCoordinate={this.state.centerCoordinate}
              initialZoomLevel={2}
              initialDirection={0}
              rotateEnabled={false}
              scrollEnabled={true}
              zoomEnabled={true}
              showsUserLocation={true}
              userLocationVisible={true}
              styleURL={Mapbox.mapStyles.streets}
              userTrackingMode={Mapbox.userTrackingMode.none}
              annotations={this.state.annotations}
            >
            {/*<Annotation
                id="initialPosition"
                coordinate={this.state.centerCoordinate}
                style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
              >
                <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={images.Pin_Map} />
                  <Text>{"truck company"}</Text>
                </View>
              </Annotation>*/}
               <Annotation
                id="driverCurrentLocation"
                coordinate={{latitude: driverLocation.driverCurrentLatLong[0], longitude: driverLocation.driverCurrentLatLong[1]}}
                style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
              >
                <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={images.Truck} />
                  <Text>{driverLocation.Status}</Text>
                </View>
              </Annotation>
              <Annotation
                id="pickupLocation"
                coordinate={{latitude: this.props.shipments.selectedShipment.pickupLocationLat, longitude: this.props.shipments.selectedShipment.pickupLocationLong}}
                style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
              >
                <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={images.Pin_Menu} />
                  <Text>{this.props.shipments.selectedShipment.pickupCompanyName}</Text>
                </View>
              </Annotation>
              <Annotation
                id="deliveryLocation"
                coordinate={{latitude: this.props.shipments.selectedShipment.deliveryLocationLat, longitude: this.props.shipments.selectedShipment.deliveryLocationLong}}
                style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
              >
                <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={images.Pin_Menu} />
                  <Text>{this.props.shipments.selectedShipment.deliveryCompanyName}</Text>
                </View>
              </Annotation>
            </MapView>
            : null
          }
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('DocType')} >
        <View>
          <ProgressBar title="Delivery in progress" progressValue={173}/>
        </View>
      </TouchableHighlight>
        <View style={{height: 187}}>
        <TouchableHighlight onPress={() => navigate('DeliveryInProgress')} >
          <View>
          <ToAndFrom details={shipment} arrowType={images.Arrow_Right}/>
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

export default connect(mapStateToProps, null)(DropOffLocation)
