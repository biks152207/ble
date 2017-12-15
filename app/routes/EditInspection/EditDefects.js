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
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import { HTTP } from './../../utils/HTTP';
import { getActivityLogs } from './../../actions/activity';


let window = Dimensions.get("window");
let timer;
class EditDefects extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={commonStyle.container}>
      <View style={[{backgroundColor:common.whiteColor, height: 70 , flexDirection:'row'}]}>
        <TouchableHighlight onPress={() =>{goBack()} } underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
          <Image
            source={images.Back_Arrow}
          />
        </TouchableHighlight>
        <View style={[{backgroundColor:common.whiteColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
        <Text style={{color: common.greenColor,fontSize: 10, fontWeight: '500'}}>Thursday Oct 05</Text>
          <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Edit Defects</Text>
        </View>
          <TouchableHighlight onPress={() => {this.saveStatus()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
          </TouchableHighlight>
      </View>

            <View style={{height:2, backgroundColor:'gray'}}></View>

            <View style={s.subContainer}>
            <View style={{padding:10, marginHorizontal:20}}>
            <Text style={{}}>CURRENT DEFFECTS</Text>
            <Text style={{fontSize:20, color:common.blackColor}}>Wheels, Tires</Text>
            </View>
              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between', marginHorizontal:20}}>
              <View style={{flex:0.4}}>
                <Text style={{color:'black',marginBottom:10}}>DEFECT</Text>
                <View style={s.textInputParent}>
                <TouchableOpacity style={{flex:1,height:35, flexDirection:'row', alignItems: 'center', marginHorizontal: 10}} onPress={() => this.setState({isDropOpen: !this.state.isDropOpen})}>
                  <View style={{flex:7}}><Text>Select Defect</Text></View>
                  <View ><Icon name="chevron-down"/></View>
                </TouchableOpacity>
                </View>
              </View>
              <View style={{flex:0.2}}></View>
              <View style={{flex:0.4}}>
                <View style={{}}>
                  <Text style={{color:'black',marginBottom:10}}>Time</Text>
                  <View style={s.textInputParent}>
                  <TextInput
                    underlineColorAndroid = "transparent"
                    value={this.state.defectTime}
                    style={s.txtInutStyle}
                    />
                    </View>
                </View>
              </View>
              </View>

              <View style={{marginTop:10, marginHorizontal:20}}>
              <View style={{}}>
                <Text style={{color:'black',marginBottom:10}}>NOTE</Text>
                <View style={s.textInputParent}>
                <TextInput
                placeholder={'Enter Note'}
                multiline={true}
                numberOfLines={6}
                  underlineColorAndroid = "transparent"
                  value={this.state.location}
                  style={s.txtInutStyle}
                  />
                  </View>
              </View>
              </View>

              <View style={{marginTop:10, padding:15}}>
              <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'lightgray', borderRadius:5, padding:15}}>
              <Icon name="paperclip" size={20} />
              <Text style={{color:'black', fontSize:20}}> Attach Image</Text>
              </TouchableOpacity>
              </View>

            </View>

          </View>


    )

}
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000'
  },
  subContainer:{
    flex:1,
    backgroundColor:'#f2efef',
  },
  cardContainer:{
    backgroundColor:common.whiteColor,
    marginTop:20,
    // height:100,
    marginHorizontal:20,
    borderWidth:1,
    borderRadius:5,
    borderColor:common.whiteColor
  },
  cardButton:{
    fontSize:17,
    fontWeight:'bold',
    color:common.greenColor,
    paddingTop:10,
    paddingBottom:15
  },
  cardBottom:{
    flex:0.5, alignItems:'center',borderRightWidth:1, borderColor:'lightgray'
  },
  lineSeperator:{height:1, backgroundColor:'lightgray',marginTop:10, marginHorizontal:10},
  defectType:{fontSize:18,fontWeight:'500'},
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
 },
  txtInutStyle : {
    // height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:common.blackColor
    },
})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
        activityLog:state.activityReducer
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails,
            getActivityLogs
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditDefects);
