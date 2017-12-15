import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions, TouchableHighlight, Image} from 'react-native';
let window = Dimensions.get("window");
let { height, width } = window;
import ToAndFrom from './../../layouts/common/ToAndFrom/ToAndFrom';

import styles from './styles';
import Tabs from './../../components/Tabs/Tabs.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import images from './../../config/images';


import Header from './../../layouts/common/Header/Header';
import TopNavigationSection from './../../layouts/common/TopNavigationSection/TopNavigationSection';
import ToAndFromFooter from './../../layouts/common/ToAndFromFooter/ToAndFromFooter';
import MessageView from './../../components/messageView/messageView.js';


export default class PastShipment extends Component {
  constructor(props){
    super(props);

    let message = [{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    }];
    this.state = {
      message,
      screen: 'PAST'
    }
    this.changeScreen = this.changeScreen.bind(this);
  }

  changeScreen(screen) {
      this.setState({screen});
  }

  render(){
    const { navigate, state, goBack } = this.props.navigation;
    return (
      <View style={styles.topContainer}>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :40},commonStyle.contentCenter]}>
          <Image
            style={{height:15,width:16}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        <View style={[commonStyle.smallHeaderBar]}>

        </View>
      </View>
      <View style={{backgroundColor:common.blackColor}}>
        <View style={[styles.textInputParentSearch,{marginTop:5,marginBottom:10}]}>
            <TouchableHighlight underlayColor="transparent" onPress={() => navigate('SearchDropOff')}  style={{}}>
              <Text style={[commonStyle.fontSize_20,{color:common.greenColor,lineHeight:50,paddingLeft:35,fontWeight:'500'}]}>Your trip has been completed</Text>
            </TouchableHighlight>
          </View>
      </View>
        <ScrollView>
          <View style={styles.toAndFromContainer}>
            <ToAndFrom reduceWidth={20} borderRadius={[2,2,0,0]} details={{}} arrowType={'none'}/>
            <View style={styles.hr}/>
            <ToAndFromFooter />
            </View>
            <View style={styles.hr}/>
            <View style={[{paddingTop :23.5, backgroundColor: '#FFFFFF', paddingHorizontal:20}]}>
                <Text style={{fontSize:18, lineHeight: 20, paddingBottom:28}}>Messages</Text>
               {
                 this.state.message.map( (message, key) =>{
                   return (
                     <MessageView data ={message} key={key}/>
                   )
                 })
               }
             </View>
        </ScrollView>
        <View style={styles.attachment}>
          <View style={styles.hr}/>
          <View style={styles.attachmentBox}>
            <View style={styles.eachAttachment}>
              <TouchableHighlight style={styles.attachmentButton}>
                <View style={styles.attachmentInner}>
                  <View style={{flex:1}}>
                    <Image source={images.Safety_Pin}/>
                  </View>
                  <View style={styles.attachmentTitleBox}>
                    <Text style={styles.attachmentTitle}>Proof of Delivery</Text>
                  </View>
                  <View style={{flex:1, alignItems: 'flex-end'}}>
                    <Image source={images.Arrow_Right}/>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View style={[styles.eachAttachment,styles.margin10]}>
              <TouchableHighlight style={styles.attachmentButton}>
                <View style={styles.attachmentInner}>
                  <View style={{flex:1}}>
                    <Image source={images.Safety_Pin}/>
                  </View>
                  <View style={styles.attachmentTitleBox}>
                    <Text style={styles.attachmentTitle}>Document 1</Text>
                  </View>
                  <View style={{flex:1, alignItems: 'flex-end'}}>
                    <Image source={images.Arrow_Right}/>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
};
