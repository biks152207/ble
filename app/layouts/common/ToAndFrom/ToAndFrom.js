import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
// import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import LocationAndTime from './../LocationAndTime/LocationAndTime';
import images from '../../../config/images.js';
import moment from 'moment';
export default class ToAndFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 dateFormat(date){
   if(date){
     return moment(date).format('MMM D YYYY')
   }else {
     return ''
   }
 }
 fromTime(date){
   if(date){
     return moment(date).format('LT')
   }else {
     return ''
   }
 }
 toTime(date){
   if(date){
     return moment(date).format('LT')
   }else {
     return ''
   }
 }
 mobileNumberTextInput(value){
   if (value.length < 16) {
       value = value.replace(/\D/g, "");
       value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
       value = value.replace(/(\d{4})(\d)/, "$1 - $2");
   }
   else if (value.length == 16) {
       value = value.replace(/\D/g, "");
       value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
       value = value.replace(/(\d{3})(\d)/, "$1 - $2");
   }
   else {
       value = value.substring(0, value.length - 1);
   }
   return value
 }
  render() {
    const { reduceWidth = 0 , borderRadius, arrowType } = this.props;
    return (
      <View style={styles.wrapper(reduceWidth, borderRadius)}>
        <View style={styles.arrowContainer(reduceWidth)}>
        {arrowType != 'none' &&
          <Image
            source={arrowType}
          />
        }
        </View>
        <Grid>
          <Col style={{ width: 61 - reduceWidth/2}}>
            <View style={styles.dotLineAndPin(reduceWidth)}>
              <View style={[styles.dot, this.props.color && styles.borderColorRed]}/>
                <View style={styles.dottedLine}>
                  <Image
                    source={images.dotted_line}
                    style={styles.dottedLineImage}
                  />
                  <Image
                    source={images.dotted_line}
                    style={styles.dottedLineImage}
                  />
                  <Image
                    source={images.dotted_line}
                    style={styles.dottedLineImage}
                  />
                </View>
                {this.props.color ?
                  <FontAwesome name="map-marker" style={{color:this.props.color}} size={18}/>:
                  <Image
                    source={images.pin}
                    style={[styles.pin]}
                  />
                }
            </View>
          </Col>
          <Col>
            <LocationAndTime
              location={`${this.props.details.pickupCity}, ${this.props.details.pickupState}, ${this.props.details.pickupZipcode}`}
              date={this.dateFormat(this.props.details.pickupDateTimeFrom)}
              timeInterval={this.fromTime(this.props.details.pickupDateTimeFrom)+"-"+this.fromTime(this.props.details.pickupDateTimeTo)}
              address={this.props.details.pickupCompanyAddress}
              phoneNumber={this.props.details.pickupMobile}
            />
            {/*<LocationAndTime
              location={`${this.props.details.pickupCity}, ${this.props.details.pickupState}`}
              date={this.dateFormat(this.props.details.pickupDateTimeFrom)}
              timeInterval={this.fromTime(this.props.details.pickupDateTimeFrom)+"-"+this.fromTime(this.props.details.pickupDateTimeTo)}
              phoneNumber={this.mobileNumberTextInput(this.props.details.pickupMobile)}
            />*/}
            {/*<LocationAndTime
              location={`${this.props.details.deliveryCity}, ${this.props.details.deliveryState}`}
              date={this.dateFormat(this.props.details.deliveryDateTimeFrom)}
              timeInterval={this.fromTime(this.props.details.deliveryDateTimeFrom)+"-"+this.fromTime(this.props.details.deliveryDateTimeTo)}
              phoneNumber={this.mobileNumberTextInput(this.props.details.deliveryMobile)}
            />*/}
            <LocationAndTime
              location={`${this.props.details.deliveryCity}, ${this.props.details.deliveryState}, ${this.props.details.deliveryZipcode}`}
              date={this.dateFormat(this.props.details.deliveryDateTimeFrom)}
              timeInterval={this.fromTime(this.props.details.deliveryDateTimeFrom)+"-"+this.fromTime(this.props.details.deliveryDateTimeTo)}
              address={this.props.details.deliveryCompanyAddress}
              phoneNumber={this.props.details.deliveryMobile}
            />
          </Col>
        </Grid>
      </View>
    )
  }
}
