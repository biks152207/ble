import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Modal,
  Picker,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle';
import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';

let window = Dimensions.get("window");

class ELDDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }


  }

  render() {
    return(
      <View style={s.Container}>

        <View style={s.Header}>
          <View style={s.HeaderContent}>
            <View style={[s.HeaderTextContainer]}>
              <Text style={s.HeaderText}>Driver</Text>
              <Text style={s.SubHeaderText}>Bob Jorgenson</Text>

            </View>
            <View style={[s.HeaderTextContainer,s.connectStatus]}>
              <Text style={s.HeaderText}>Truck Adapter</Text>
              <Text style={s.SubHeaderText}>Connected</Text>

            </View>
          </View>
        </View>
        <View style={s.Content}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:0.35,alignItems:'center',justifyContent:'center'}}>
              <View style={{}}>
                <PercentageCircle radius={60} bgcolor={'gray'} innerColor={'#000000'} borderWidth={5} percent={80} color={common.greenColor}>
                  <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>08:16</Text>
                  <Text style={{fontWeight:'bold',fontSize:18 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>DRIVE</Text>

                </PercentageCircle>
              </View>
            </View>
            <View style={{flex:0.3,alignItems:'center'}}>
              <View style={{}}>
                <View style={{}}>
                  <PercentageCircle radius={40} bgcolor={'gray'} innerColor={'#000000'} borderWidth={5} percent={80} color={common.greenColor}>
                    <Text style={{fontWeight:'bold',fontSize:18 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>08:27</Text>
                    <Text style={{fontWeight:'bold',fontSize:16 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>DUTY</Text>
                  </PercentageCircle>
                </View>
                <View style={{marginTop:10}}>
                  <PercentageCircle radius={40} bgcolor={'gray'} innerColor={'#000000'} borderWidth={5} percent={80} color={common.greenColor}>
                    <Text style={{fontWeight:'bold',fontSize:18 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>14:38</Text>
                    <Text style={{fontWeight:'bold',fontSize:16 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>CYCLE</Text>
                  </PercentageCircle>
                </View>
              </View>
            </View>
            <View style={{flex:0.35,alignItems:'center',justifyContent:'center'}}>
              <View style={{}}>
                <PercentageCircle radius={60} bgcolor={'gray'} innerColor={'#000000'} borderWidth={5} percent={80} color={common.greenColor}>
                  <Text style={{fontWeight:'bold',fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>06:04</Text>
                  <Text style={{fontWeight:'bold',fontSize:18 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>BREAK</Text>
                </PercentageCircle>
              </View>
            </View>

          </View>
          <View>
            <TouchableHighlight onPress={() => {}}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:0, height: 50, marginTop: 30, marginHorizontal:10}]}>
               <View>
                 <Text style={[commonStyle.fontSize_20,{fontWeight:'bold',fontFamily:'ProximaNova-Bold',color:common.whiteColor}]}>ON DUTY</Text>
                 <Text style={[commonStyle.fontSize_9,{fontWeight:'bold',fontFamily:'ProximaNova-Bold',color:common.whiteColor}]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From 10:25 am</Text>
               </View>
            </TouchableHighlight>
         </View>
          <View style={{marginTop:10}}>
            <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{height : 50,justifyContent:'center'}]}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:0.2,alignItems:'center'}}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.whiteColor}]}>&lt;</Text>

                </View>
                <View style={{alignItems:'center',flex:0.6}}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.whiteColor}]}>TODAY-NOVEMBER 5TH</Text>
                </View>
                <View style={{alignItems:'center',flex:0.2}}>

                </View>
              </View>


            </TouchableHighlight>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
              <View style={{flex:0.1}}>

              </View>
              <View style={{flex:0.35}}>
                <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{borderColor:common.greenColor,borderWidth:1,height: 50,marginHorizontal:10}]}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.greenColor}]}>FORM</Text>
                </TouchableHighlight>
              </View>
              <View style={{flex:0.1}}>

              </View>
              <View style={{flex:0.35}}>
                <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{borderColor:common.greenColor,borderWidth:1,height: 50,marginHorizontal:10}]}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.greenColor}]}>CERTIFY</Text>
                </TouchableHighlight>
              </View>

              <View style={{flex:0.1}}>

              </View>
            </View>

            <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
              <View style={{flex:0.3}}>
                <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{height: 50,marginHorizontal:10}]}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.whiteColor}]}>ACTIVITY</Text>
                </TouchableHighlight>
              </View>

              <View style={{flex:0.3}}>

              </View>


              <View style={{flex:0.4}}>
                <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{height: 50,marginHorizontal:10}]}>
                  <Text style={[{fontWeight:'bold',fontSize:18,fontFamily:'ProximaNova-Bold',color:common.greenColor}]}>ADD EVENT + </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
         <View></View>

          </View>
        </View>

    )
  }
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },
  Header: {
    height: getSize(80),
    backgroundColor: '#000000',
  },
  HeaderContent: {
    flexDirection: 'row',
    marginHorizontal: getSize(20)
  },
  HeaderTextContainer: {
    marginTop: getSize(20),
    flex:0.5,
  },
  HeaderText: {
    fontSize: getSize(16),
    color: 'white'
  },
  SubHeaderText:{
    fontSize: getSize(20),
    color: common.greenColor,
    fontWeight:'bold',
    fontFamily:'ProximaNova-Bold'
  },
  connectStatus:{
    alignItems:'flex-end'
  },
  Icon: {
    marginTop: getSize(40),
    flex:1,
    alignItems: 'flex-end'
  },
  TopIcon: {
    width: getSize(20),
    height: getSize(20)
  },
  Content: {
    flex:1
  },


})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ELDDashboard);
