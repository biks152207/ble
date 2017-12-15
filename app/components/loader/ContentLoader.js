import React, { Component } from 'react';

import {
  ActivityIndicator,View
} from 'react-native';


export default class ContentLoader extends Component {
  render() {
    return (
      <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}><ActivityIndicator color={'white'} /></View>
    )
  }
};
