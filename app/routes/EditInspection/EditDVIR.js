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
class EditDVIR extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.activeStatus=this.activeStatus.bind(this);
  }
  activeStatus(status){
    if(this.state.tempCurrentStatus===status)
    return common.greenColor
    else {
      return common.whiteColor
    }
  }
  changeTempCurrentStatus(status){
    this.setState({
      tempCurrentStatus:status
    })
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
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Edit DVIR</Text>
              </View>
                <TouchableHighlight onPress={() => {this.saveStatus()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>
            <ScrollView>
            <View style={s.ModalContainer, {marginHorizontal:20,marginTop:20}}>
            <View style={{marginTop:10}}>
              <Text style={{color:'gray',marginBottom:5}}>Vehicle</Text>
              <Text style={{color:'black',marginBottom:10,fontSize: 18, fontWeight: '500'}}>AT672B</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Odometer</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.notes}
                style={s.txtInutStyle}
                />
                </View>
            </View>

            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>LOCATION</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.notes}
                style={s.txtInutStyle}
                />
              </View>
            </View>

            </View>
            {/* <View style={s.ModalContainer, {marginTop:20, backgroundColor:'lightgray', padding:15}}>
            <Text style={{color:'black', fontSize:20, fontWeight:'500'}}>Attached Documents</Text>
            </View> */}
            <View style={s.ModalContainer, {marginTop:10, padding:15}}>
              <View style={{borderWidth:1, borderColor:'lightgray', borderRadius:5, padding:15}}>
                <View style={{flexDirection:'row', }}>
                  <Icon name="wrench" size={20} style={{color:'black', fontSize:20,fontWeight:'bold'}}/>
                  <Text style={{color:'black', fontSize:20,fontWeight:'bold'}}> Vehicle Defects</Text>
                </View>

                <TouchableHighlight onPress={() => {navigate('RepairVehicleDefects')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[]}>
                  <View style={[s.defectView,{backgroundColor:'red'}]}>
                    <Icon name="exclamation-triangle" size={20} style={[s.iconDefect,{color:common.whiteColor}]}/>
                    <View style={{}}>
                      <Text style={[s.titleDefect,{color:common.whiteColor}]}>2 Defects Need Repair</Text>
                      <Text style={[s.descDefect,{color:common.whiteColor}]}>Wheels, Tires</Text>
                    </View>
                    <Icon name="chevron-right" size={20} style={[s.actionDefect,{color:common.whiteColor}]}/>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {navigate('InspectVehicleRepairs')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[]}>
                  <View style={[s.defectView,{backgroundColor:'#e2d0b1'}]}>
                    <Icon name="exclamation-triangle" size={20} style={[s.iconDefect,{color:'#56411e'}]}/>
                    <View style={{}}>
                      <Text style={[s.titleDefect,{color:'#56411e'}]}>2 Defects Need Repair</Text>
                      <Text style={[s.descDefect,{color:'#56411e'}]}>Wheels, Tires</Text>
                    </View>
                    <Icon name="chevron-right" size={20} style={[s.actionDefect,{color:'#56411e'}]}/>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
              <TouchableHighlight onPress={() => {navigate('RepairDefects')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{width:window.width-50,marginBottom:20}]}>
                <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10,backgroundColor:'#23addb'}}>
                  <Text style={{fontSize:18,fontWeight:'bold',color:common.whiteColor}}>+ Add Vehicle Defects</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={s.ModalContainer, {marginTop:10, backgroundColor:'#dee5e8', padding:15}}>
              <Text style={{fontSize:20, fontWeight:'500'}}>Trailer Inspection</Text>
            </View>
            <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
              <TouchableHighlight onPress={() => {navigate('RepairDefects')}} underlayColor={common.tuchableUnderlayWhiteColor} style={[{marginTop:20,width:window.width-50,marginBottom:50}]}>
                <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>+ Add Trailer Defects</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>


    )

}
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },
  ModalContainer: {
   flex:1,
  backgroundColor: common.whiteColor,
 },
  Header: {
    height: getSize(80),
    backgroundColor: '#000000',
  },
  HeaderContent: {
    flexDirection: 'row',
    // marginHorizontal: getSize(20)
  },
  HeaderTextContainer: {
    // marginTop: getSize(20),
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

  Content: {
    flex:1
  },
  fontOswaldRegular:{
    fontFamily:'Oswald-Regular',
    fontWeight:'600'
  },
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
 },
  txtInutStyle : {
    height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:'white'
    },
    defectView:{
      flexDirection:'row',
      height:70,
      alignItems:'center',
      borderRadius:10,
      justifyContent:'space-between',
      marginTop:20
    },
    iconDefect:{
      marginLeft:20
    },
    titleDefect:{
      fontSize:18,
      fontWeight:'bold',

    },
    descDefect:{
      fontSize:15
    },
    actionDefect:{
      marginRight:15,

    }

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


export default connect(mapStateToProps, mapDispatchToProps)(EditDVIR);
