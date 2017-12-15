import React, { Component } from 'react';

import {
  ActivityIndicator
} from 'react-native';


export default class ButtonLoader extends Component {
  render() {
    return (
      <ActivityIndicator color={'grey'} />
    )
  }
};
