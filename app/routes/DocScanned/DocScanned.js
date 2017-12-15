import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';

import Header from './../../layouts/common/Header/Header.js';
import images from './../../config/images';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
let window = Dimensions.get("window");
import styles from './styles';

export default class DocScanned extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header title={"Scan POD"}  image={images.Close_White}/>
        <View style={styles.Content}>
          <View style={styles.DocContainer}>
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableHighlight style={styles.FirstButtonContainer}>
              <Text  style={styles.FirstButtonText}>RETAKE</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.SecondButtonContainer} >
              <Text style={styles.SecondButtonText}>SAVE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
};
