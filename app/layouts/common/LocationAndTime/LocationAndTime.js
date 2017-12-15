import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';

export default class ToAndFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, date, timeInterval, phoneNumber,address } = this.props
    return (
      <View style={ styles.wrapper }>
      {address &&
        <Text style={ styles.address }>{ address }</Text>
      }
        <Text style={ styles.dateTimePhoneNumber }>{ location }</Text>

        <Text style={ styles.dateTimePhoneNumber }>{ date }  •  {timeInterval} (pt)</Text>
        <Text style={ styles.dateTimePhoneNumber }>{ phoneNumber }</Text>

      </View>
    )
  }
}
