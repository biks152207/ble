import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  Dimensions
} from 'react-native';

import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from './../../config/images';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import styles from './styles';

const { width } = Dimensions.get('window');

class SendEmail extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[{backgroundColor:common.grayColor, height: 55 , flexDirection:'row', borderBottomWidth:0.5}]}>
          <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{flex:0.1,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Back_Arrow}
            />
          </TouchableHighlight>
          <View style={[{backgroundColor:common.grayColor,height: 55,marginRight:10,justifyContent:'center',flex:0.6, borderBottomWidth:0.5}]}>
            <Text style={{color: common.blackColor,fontSize: 10}}>DOT INSPECTION ON MODE</Text>
            <Text style={{color: common.blackColor,fontSize: 18}}>Send Logs</Text>
          </View>

        </View>
        <View style={{flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:40}}>
            <Text style={{color: common.blackColor,fontSize:20}}>Send Logs to Inspector</Text>
            <Text style={{color: common.darkGrayColor,fontSize:12, paddingTop:10}}>Previous 6 days + Today</Text>
            <TouchableHighlight onPress={() => navigate('DotInspectionMode')}  style={{borderRadius:10, borderWidth:1, marginTop:20, backgroundColor:common.grayColor, width:width-100, borderColor:'#a8a8a8'}}><Text style={{padding:10, color:common.blackColor, fontSize:20, textAlign:'center'}}>Start DOT INSPECTION</Text></TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default SendEmail;
