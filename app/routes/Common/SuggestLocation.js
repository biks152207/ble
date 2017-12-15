import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import styles from './Styles';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class SuggestLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }
    this.selected = this.selected.bind(this);
  }

  selected() {
    this.setState({selected: !this.state.selected})
  }

  render() {
    console.log(this.props);
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{marginBottom:11, flex:6}} underlayColor="transparent" onPress={() => { this.selected(); this.props.pick(this.props.address, this.props.type) }} >
          <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>{this.props.address.place_name}</Text>
        </TouchableOpacity>
        {this.state.selected &&
          <View style={{flex:1, marginTop: 14}}>
            <Icon name="check-circle" size={20}/>
          </View>
        }
      </View>
    )
  }
}
