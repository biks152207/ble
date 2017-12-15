import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
// import { Components } from 'expo';
import images from '../../../config/images.js';
import styles from './styles';
const coordinates = {
  latitude: -36.8457991,
  longitude: 174.7666099,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Components.MapView style={styles.maps} initialRegion={coordinates}>
          <Components.MapView.Marker coordinate={coordinates}  image={images.wheeler_view}>
          </Components.MapView.Marker>
        </Components.MapView>
        <Image source={images.map_location} style={styles.currentLocationButton}/>
      </View>
    )
  }
};
