import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import images from '../../../config/images.js';

import styles from './styles';

export default class LocationBlock extends Component {
  render() {
    const { title,name, place, location } = this.props
    return (
      <View style={styles.wrapper}>
        <View style={styles.subWrapper}>
          <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1}}>
                {/*<Text style={styles.title}>{ title }</Text>*/}
                <Text style={styles.name}>{ name }</Text>
                <Text style={styles.address}>
                  { place } {"\n"}

                  { location }
                </Text>
              </View>
              <View style={styles.circleContainer} >
                <Image source={images.google_direction} style={{height:39, width:39}} />
              </View>
          </View>
          <View style={{paddingTop:6}}>

          </View>
        </View>
      </View>
    )
  }
}
