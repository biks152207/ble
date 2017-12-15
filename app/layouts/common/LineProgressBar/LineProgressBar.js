import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';

export default class LineProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, progressValue, total, totalWidth } = this.props;
    return (
      <View style={styles.wrapper(totalWidth)}>
          <View style={styles.progressTextContainer(progressValue, total, totalWidth)}>
          </View>
      </View>

    )
  }
}
