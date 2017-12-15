import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, progressValue, total } = this.props;
    return (
      <View style={[styles.wrapper]}>
          {/*<Text style={styles.pickUpInProgress}>{title}</Text>*/}
          <View style={styles.progressTextContainer(progressValue, total)}>
          </View>
          {(this.props.title === 'ENROUTE_TO_PICKUP' || this.props.title === 'PICKED_UP') ?
            <Text style={[styles.pickUpInProgress]}>Pick in progress</Text>
            :<Text style={[styles.pickUpInProgress]}>Delivery in progress</Text>
          }
      </View>

    )
  }
}
