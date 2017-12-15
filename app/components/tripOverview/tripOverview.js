import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

import config from './../../config/config';
import { selectShipment, clearSelectedShipment } from './../../actions/shipments';


import { getDistanceFromLatLonInMile, getMonth, getDay, getYear, getHr} from './../../utils/utility';



// import Mapbox from 'react-native-mapbox-gl';
// Mapbox.setAccessToken(config.MAP_BOX);

let window = Dimensions.get('window');

class TripOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.selectShipment = this.selectShipment.bind(this);

  }

  selectShipment(shipment) {
      this.props.actions.clearSelectedShipment();
      if (!shipment.shipper) {

        return;
      }
      this.props.navigate('TripDetails');
      this.props.actions.selectShipment(shipment,this.props.navigate).then(() =>{
    });

  }

  render() {
    let {trip, onPress,onPlusPress} = this.props;

    return (
      <TouchableHighlight onPress={() => this.selectShipment(trip)}>
      <View style={styles.ScreenContainer}>
      {!this.props.user.driver.carrier &&
        <View style={{borderBottomWidth: 1, borderColor:common.grayColor, height:20}}>
          <Text style={[{paddingHorizontal:20, fontWeight: '500'}, common.fontSize_18]}>{trip.shipper && trip.shipper.shipper && trip.shipper.shipper.company_name? trip.shipper.shipper.company_name : 'Not available'} {trip.shipper ? trip.shipper.shipper.MCNumber ? `${trip.shipper.shipper.MCNumber}`: ': MC Not available' : null}</Text>
        </View>
      }

      <View style={{flexDirection :'row', marginTop:10}}>
        <View style={{width: 61}}>
        <Grid style={{}}>
          <Col>
            <View style={styles.dot}/>
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.pin}
              style={styles.pin}
            />
          </Col>

        </Grid>
        </View>
        <View style={{flex:1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:6}}>
              <Text style={[commonStyle.fontSize_18,styles.CityAndState]}>{trip.pickupCity}, {trip.pickupState}</Text>
              <View style={{flex:1}}>
                  <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getMonth(trip.pickupDateTimeFrom)} {getDay(trip.pickupDateTimeFrom)}, {getYear(trip.pickupDateTimeFrom)}  •  {getHr(trip.pickupDateTimeFrom)} - {getHr(trip.pickupDateTimeTo)}</Text>
              </View>
            </View>
            <View style={[{flex:1,justifyContent: 'center',alignItems:'center', marginTop:-10}]}>
                <TouchableHighlight underlayColor ="transparent" onPress={() => onPlusPress()} style={[{height : 50, width : 60,paddingBottom: 0},commonStyle.contentCenter]}>
                  <Image
                        style={{}}
                        source={images.Plus}
                      />
                </TouchableHighlight>
            </View>
          </View>
          <View style={{height :56, marginTop: 20}}>
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_18,{marginTop :3}, styles.CityAndState]}>{trip.deliveryCity }, {trip.deliveryState}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B', fontSize: 14}]}>{getMonth(trip.deliveryDateTimeFrom)} {getDay(trip.deliveryDateTimeFrom)}, {getYear(trip.deliveryDateTimeFrom)}  •  {getHr(trip.deliveryDateTimeFrom)} - {getHr(trip.deliveryDateTimeTo)}</Text>
            </View>
            </View>

          </View>

        </View>
      </View>

      <View style={{marginTop : 0,borderTopWidth : 1, borderTopColor : common.grayColor}}>
        <View style={[{flexDirection : 'row',paddingLeft : 20, paddingVertical: !this.props.user.driver.carrier ? 10: 10}]}>
              <View style={{flex:1}}>
              <Text style={[commonStyle.fontSize_12,styles.subDetails]}>{'DEADHEAD'}</Text>
              {
                this.props.currentLocationOfDriver && this.props.currentLocationOfDriver.latitude ?
                <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getDistanceFromLatLonInMile(trip.pickupLocationLat, trip.pickupLocationLong, this.props.currentLocationOfDriver.latitude, this.props.currentLocationOfDriver.longitude).toFixed(2)}mi</Text>
:trip.driver && trip.driver.driver?
<Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getDistanceFromLatLonInMile(trip.pickupLocationLat, trip.pickupLocationLong, trip.driver.driver.currentDriverLocation.coordinates[1], trip.driver.driver.currentDriverLocation.coordinates[0]).toFixed(2)}mi</Text>:null

              }

            </View>

{!this.props.user.driver.carrier &&
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12,styles.subDetails]}>{'PRICE'}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>${trip.lowPrice}</Text>
            </View>
          }
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'DISTANCE'}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{trip.distance ? trip.distance + 'mi' : 'Unavailable'}</Text>
            </View>
        </View>
      </View>

      </View>
      </TouchableHighlight>
    )
  }
}

/* Map state to props */
function mapStateToProps(state){
    return {
        user: state.auth.user,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            selectShipment,
            clearSelectedShipment
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(TripOverview)
