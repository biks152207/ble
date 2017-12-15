import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions, ActivityIndicator } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import { getDistanceFromLatLonInMile, getMonth, getDay, getYear, getHr} from './../../utils/utility';


let self;
let window = Dimensions.get('window');

class TripDetailsView extends Component {
  constructor(props) {
    super(props);
    self = this;


      this.state = {
        driverCurrentLatLong: {
          latitude: null,
          longitude: null
        },
    }
  }
  currencyFormater(num){
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
 componentWillMount() {
   navigator.geolocation.getCurrentPosition(position => {
       let driverCurrentLatLong = {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
       };
       this.setState({driverCurrentLatLong});
   });
 }

 render() {
    let { dataTripDetails } = this.props;


   return (
      <TouchableHighlight>
          {dataTripDetails._id &&
            <View style={styles.ScreenContainer}>

            <View style={[{marginTop : 19},commonStyle.contentRight]}>


            </View>

            <View style={{flexDirection :'row'}}>
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
            <View>
            <View>
            <Text style={[commonStyle.fontSize_18,styles.CityAndState,{marginTop :3}]}>{dataTripDetails.pickupCity + ', ' + dataTripDetails.pickupState}</Text>
            {dataTripDetails.currentStatus === 'ACCEPTED' &&
            <Text style={[commonStyle.fontSize_10,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.pickupCompanyAddress}</Text>

          }
          <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getMonth(dataTripDetails.pickupDateTimeFrom)} {getDay(dataTripDetails.pickupDateTimeFrom)}, {getYear(dataTripDetails.pickupDateTimeFrom)}  •  {getHr(dataTripDetails.pickupDateTimeFrom)} - {getHr(dataTripDetails.pickupDateTimeTo)}</Text>

          </View>
          <View style={{marginTop :15}}>
          <Text style={[commonStyle.fontSize_18,styles.CityAndState,{marginTop :3}]}>{dataTripDetails.deliveryCity + ', ' + dataTripDetails.deliveryState}</Text>
          {dataTripDetails.currentStatus === 'ACCEPTED' &&
          <Text style={[commonStyle.fontSize_10,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.deliveryCompanyAddress}</Text>

        }
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getMonth(dataTripDetails.deliveryDateTimeFrom)} {getDay(dataTripDetails.deliveryDateTimeFrom)}, {getYear(dataTripDetails.deliveryDateTimeFrom)}  •  {getHr(dataTripDetails.deliveryDateTimeFrom)} - {getHr(dataTripDetails.deliveryDateTimeTo)}</Text>

        {/*<Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{new Date(dataTripDetails.deliveryDateTimeTo).toLocaleString()}</Text>*/}
        </View>
        </View>
        </View>

        <View style={{marginTop :10,borderTopWidth : 1, borderTopColor : common.grayColor}}>
        <View style={{flexDirection : 'row',marginTop :14,paddingLeft : 30}}>

        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'DEADHEAD'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{getDistanceFromLatLonInMile(dataTripDetails.pickupLocationLat, dataTripDetails.pickupLocationLong, this.state.driverCurrentLatLong.latitude, this.state.driverCurrentLatLong.longitude).toFixed(2)}mi</Text>
        </View>
        {!this.props.user.driver.carrier &&
          <View style={{flex:1}}>
          <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'PRICE'}</Text>
          <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>${dataTripDetails.lowPrice}</Text>
          </View>
        }
        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'DISTANCE'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.distance ? `${dataTripDetails.distance}mi` : 'Not available'}</Text>
        </View>

        </View>

        <View style={{flexDirection : 'row',marginTop :15,paddingLeft : 30}}>
        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'COMMODITY'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.loadingDetails.commodity}</Text>
        </View>
        {!this.props.user.driver.carrier &&
          <View style={{flex:1}}>
          <Text style={[commonStyle.fontSize_12,styles.subDetails]}>{'REFERENCE #'}</Text>
          <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.customId || 'NA'}</Text>
          </View>
        }
        <View style={{flex:1}}>
        </View>
        </View>
        <View style={{flexDirection : 'row',marginTop :15,paddingLeft : 30}}>
        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'WEIGHT'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.currencyFormater(dataTripDetails.loadingDetails.weight)} lbs</Text>
        </View>
        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12,styles.subDetails]}>{'PALLETS'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.loadingDetails.pallets}</Text>
        </View>
        <View style={{flex:1}}>
        <Text style={[commonStyle.fontSize_12, styles.subDetails]}>{'TRAILER'}</Text>
        <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.truckType} {dataTripDetails.truckType === 'REEFER' ? `${dataTripDetails.loadingDetails.temperature} °F ` : null}</Text>
        </View>
        </View>
        </View>

        </View>


          }
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
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             getAllAvailableShipmentRequest,
//             selectShipment,
//             clearShipments,
//             clearSearchQuery
//         }, dispatch)
//     };
// }

/* Connect Component with Redux */
export default connect(mapStateToProps, null)(TripDetailsView)
