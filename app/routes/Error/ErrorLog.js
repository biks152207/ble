import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
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

class ErrorLog extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    console.log('navgiation props', this.props.navigation);
    return (
      <View style={styles.container}>
        <View style={[{backgroundColor:common.blackColor, height: 55 , flexDirection:'row', borderBottomWidth:0.5}]}>
          <TouchableOpacity onPress={() => goBack()} underlayColor="transparent" style={[{flex:0.1,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Arrow_White_Left}
            />
          </TouchableOpacity>
          <View style={[{backgroundColor:common.blackColor,height: 55,marginRight:10,justifyContent:'center',flex:0.6, borderBottomWidth:0.5}]}>
            <Text style={{color: common.whiteColor,fontSize: 18}}>Log Error Details</Text>
          </View>

        </View>
        <View style={{flex:1}}>
          {this.props.navigation.state.params && this.props.navigation.state.params.errors.map((error, i) => {
            return (
              <View key={i} style={{flexDirection:'row',backgroundColor:'#f2f2f2', height:35,borderBottomWidth:2, borderColor:'#D8D8D8', alignItems:'center', padding:5}}>
                <Icon name="exclamation-circle" size={20} color={'red'}/>
                <TouchableOpacity style={{flex:1, paddingLeft:20}}>
                  <Text style={{color: common.whiteColor, fontSize:14, fontWeight:'400', paddingTop:0, color:'red'}}>{error}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default ErrorLog;
