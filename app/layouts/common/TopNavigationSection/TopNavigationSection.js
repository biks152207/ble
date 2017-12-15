import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Button,
  Dimensions
} from 'react-native';

import images from '../../../config/images.js';
import commonStyle from '../../../config/commonStyle.js';
import styles from './styles';
let window = Dimensions.get("window");


export default class TopNavigationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [
        'LIVE',
        'UPCOMING',
        'PAST'
      ],
      selectedScreen: 1
    };
  }

  render() {
    const totalScreens = this.state.screens.length;
    return (
      <View style={styles.wrapper}>
        <View style={{flex:1}}>
            <View style={styles.titleWrapper}>
              {this.state.screens.map((screen, key) => {
                return (
                  <TouchableHighlight onPress={() =>{this.props.changeScreen(screen); this.setState({selectedScreen: key})}} style={[styles.eachTitleWrapper, totalScreens != (key +1) && styles.marginRight, this.state.selectedScreen == key && styles.selectedScreen]} key={key}>
                    <Text style={styles.buttonTitle}>{screen}</Text>
                  </TouchableHighlight>
                )
              })}
            </View>
        </View>
      </View>
    )
  }
}
