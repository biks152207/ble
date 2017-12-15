import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions, StatusBar } from 'react-native';

import commonStyle from './../../../config/commonStyle.js';
import images from './../../../config/images.js';
import styles from './styles';

export default class ContactBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imageName, info } = this.props;
    let imageStyle, textMargin;

    switch (imageName) {
      case 'Phone_Green_Contact':
        imageStyle = styles.contactBox1;
        textMargin = 24;
        break;
      case 'Email_Green_Contact':
        imageStyle =  styles.contactBox2;
        textMargin = 18;
        break;
      case 'Pin_Green_Contact':
        imageStyle = styles.contactBox3;
        textMargin =28;
        break;
      default:
        imageStyle = styles.contactBox1;
    }
    return (
      <View style={[styles.contactContainer, {height: (imageName == 'Pin_Green_Contact' )? 90: 60}]}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <Image source={images[imageName]} style={imageStyle}/>
          <Text style={[styles.textStyle,{marginLeft:textMargin, flex:1, flexWrap: 'wrap', height: (imageName == 'Pin_Green_Contact' ) ? 61: 18}]}>{ info }</Text>
        </View>
      </View>
    )
  }
}
