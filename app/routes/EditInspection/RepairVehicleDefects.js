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
class RepairVehicleDefects extends Component {
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
              <TouchableHighlight onPress={() => {goBack()}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Back_Arrow}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.whiteColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Repair Vehicle Defects</Text>
              </View>
                <TouchableHighlight underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>

            <View style={s.subContainer}>
              <View style={s.cardContainer}>
              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between', marginHorizontal:10}}>
              <View>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Wheels</Text>
                <Text style={{fontSize:15, color:'gray'}}>50000 mi</Text>
                </View>
                <View>
                  <Text style={{fontSize:17, fontWeight:'bold', textAlign:'right'}}>Oct 05</Text>
                  <Text style={{fontSize:15, color:'gray', textAlign:'right'}}>7: 46 AM</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row', marginTop:10, marginHorizontal:10}}>
              <Icon name="user" size={20} />
              <Text style={{fontSize:15, color:'gray', marginLeft:10}}>jong</Text>
              </View>
              <View style={{marginTop:5, marginHorizontal:10}}>
              <Text style={s.defectType}>issue</Text>
              </View>
              <View style={s.lineSeperator}></View>
              <View style={{flexDirection:'row', marginTop:5, marginHorizontal:10, alignItems:'center'}}>
              <TouchableOpacity onPress={()=>navigate('EditDefects')} style={s.cardBottom}>
                <Text style={s.cardButton}>Edit Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigate('RepairDefects')} style={{flex:0.5, alignItems:'center'}}>
                  <Text style={s.cardButton}>Repair Defect</Text>
                  </TouchableOpacity>
              </View>
              </View>

              <View style={s.cardContainer}>
              <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between', marginHorizontal:10}}>
              <View>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Wheels</Text>
                <Text style={{fontSize:15, color:'gray'}}>50000 mi</Text>
                </View>
                <View>
                  <Text style={{fontSize:17, fontWeight:'bold', textAlign:'right'}}>Oct 05</Text>
                  <Text style={{fontSize:15, color:'gray', textAlign:'right'}}>7: 46 AM</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row', marginTop:10, marginHorizontal:10}}>
              <Icon name="user" size={20} />
              <Text style={{fontSize:15, color:'gray', marginLeft:10}}>jong</Text>
              </View>
              <View style={{marginTop:5, marginHorizontal:10}}>
              <Text style={s.defectType}>issue</Text>
              </View>
              <View style={s.lineSeperator}></View>
              <View style={{flexDirection:'row', marginTop:5, marginHorizontal:10, alignItems:'center'}}>
              <TouchableOpacity style={s.cardBottom}>
                <Text style={s.cardButton}>Edit Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:0.5, alignItems:'center'}}>
                  <Text style={s.cardButton}>Repair Defect</Text>
                  </TouchableOpacity>
              </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(RepairVehicleDefects);
