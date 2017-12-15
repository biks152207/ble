import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

import images from '../../../config/images.js';
import commonStyle from '../../../config/commonStyle.js';
import styles from './styles';

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={[styles.horizontalMargin, styles.paddingTop51]}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => this.props.goBack()} underlayColor="transparent">
              {this.props.image ?
                <Image
                  source={this.props.image}
                />:
                <Image
                  source={images.Arrow_White_Left}
                />
              }

            </TouchableHighlight>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{this.props.title}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
};
