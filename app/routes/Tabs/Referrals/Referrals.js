import React,{ Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { TabNavigator } from 'react-navigation';
// import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Hr from 'react-native-hr';


import images from './../../../config/images.js';
import common from './../../../config/common.js';
import Tabs from './../../../components/Tabs/Tabs.js';

export default class Referrals extends Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <StatusBar
         backgroundColor="#000000"
         barStyle="dark-content"
       />
       <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Referrals</Text>
        <Text>Coming Soon...</Text>

       </View>
       {/* <Tabs state={state} navigate={navigate}/> */}
      </View>
    )
  }
}
