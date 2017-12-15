import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import styles from './styles';
import { getDistanceFromLatLonInMile} from './../../../utils/utility';

class ToAndFromFooter extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [
        {
          heading: 'DEADHEAD',
          title: '20mi'
        },
        {
          heading: 'DEADHEAD',
          title: '20mi'
        },
        {
          heading: 'DEADHEAD',
          title: '20mi'
        }
      ]
    }
  }
  currencyFormater(num){
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  render(){
    const {details}=this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topWrapper}>
        <View style={styles.wrapper}>
          <View style={{flex:1}}>
            <Text style={styles.heading}>DEADHEAD</Text>
            {details.driver && details.driver.driver &&
            <Text style={styles.subText}>{getDistanceFromLatLonInMile(details.pickupLocationLat, details.pickupLocationLong, details.driver.driver.currentDriverLocation.coordinates[1], details.driver.driver.currentDriverLocation.coordinates[0]).toFixed(2)}mi</Text>
          }
          </View>

          {!this.props.user.driver.carrier &&
          <View style={{flex:1}}>
            <Text style={styles.heading}>PRICE</Text>
            <Text style={styles.subText}>${details.lowPrice}</Text>
          </View>
        }
          <View style={{flex:1}}>
            <Text style={styles.heading}>DISTANCE</Text>
            <Text style={styles.subText}>{details.distance} mi</Text>
          </View>

        </View>
        <View style={styles.wrapper}>

          <View style={{flex:1}}>
            <Text style={styles.heading}>REFERENCE</Text>
            <Text style={styles.subText}>{details.customId || "NA"}</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.heading}>WEIGHT</Text>
            <Text style={styles.subText}>{this.currencyFormater(details.loadingDetails.weight)} lbs</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.heading}>PALLETS</Text>
            <Text style={styles.subText}>{details.loadingDetails.pallets}</Text>
          </View>
        </View>
        <View style={styles.wrapper}>

          <View style={{flex:1}}>
            <Text style={styles.heading}>TRAILER</Text>
            <Text style={styles.subText}>{details.truckType} {details.truckType==="REEFER"?details.loadingDetails.temperature?details.loadingDetails.temperature +' °F ':0+' °F ':null}</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.heading}>COMMODITY</Text>
            <Text style={styles.subText}>{details.loadingDetails.commodity}</Text>
          </View>
        </View>
        </View>
      </View>
    )
  }
};

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
//
//         }, dispatch)
//     };
// }

/* Connect Component with Redux */
export default connect(mapStateToProps, null)(ToAndFromFooter)
