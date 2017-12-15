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
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'

import moment from 'moment';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import commonStyle from './../../../config/commonStyle.js';
import common from './../../../config/common';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import DateTimePicker from 'react-native-modal-datetime-picker';


const GeneralRoute = () => {
  return (<View style={[ s.innerContainer]}>
    <View style={[commonStyle.paddingBottom_16,{marginTop:10}]}>
      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{marginHorizontal:10}]}>TIME</Text>
      <View style={s.textInputParent}>

        <TouchableOpacity style={[s.txtInutStyle,{justifyContent:'center'}]} onPress={() => { this.setState({startTimePickerVisible:true}) }} >
          <View style={[s.txtInutStyle,{justifyContent:'center'}]}>
            <Text style={{fontSize:15}}>04:00:00 PM</Text>
          </View>
        </TouchableOpacity>

        <Icon name="clock-o" style={{marginTop:8,marginLeft:20}} color={common.greenColor} size={22}/>

        </View>
    </View>

    <View style={[commonStyle.paddingBottom_16,{marginTop:10}]}>
      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{marginHorizontal:10}]}>CARRIER</Text>
      <View style={s.textInputParent}>

      <TextInput
        onChangeText={(carrier) => { }}
        underlineColorAndroid = "transparent"
        value={''}
        style={s.txtInutStyle}
        />
        {/* <Icon name="clock-o" style={{marginTop:8,marginLeft:20}} color={common.greenColor} size={22}/> */}

        </View>
    </View>
    <View style={[commonStyle.paddingBottom_16,{marginTop:10}]}>
      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{marginHorizontal:10}]}>LOCATION</Text>
      <View style={s.textInputParent}>

      <TextInput
        onChangeText={(location) => {}}
        underlineColorAndroid = "transparent"
        value={''}
        style={s.txtInutStyle}
        />
        <Icon name="compass" style={{marginTop:8,marginLeft:20}} color={common.greenColor} size={22}/>

        </View>
    </View>
    <View style={[commonStyle.paddingBottom_16,{marginTop:10}]}>
      <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,{marginHorizontal:10}]}>ODOMETER</Text>
      <View style={s.textInputParent}>

      <TextInput
        onChangeText={(odometer) => {}}
        underlineColorAndroid = "transparent"
        value={''}
        style={s.txtInutStyle}
        />
        {/* <Icon name="clock-o" style={{marginTop:8,marginLeft:20}} color={common.greenColor} size={22}/> */}

        </View>
    </View>
    <View style={{ flex: 1 }}>
       <DateTimePicker
          titleIOS='Select Start Time'
          mode="time"
         isVisible={true}
         onConfirm={this._handleStartTimePicked}
         onCancel={this._hideStartTimePicker}
       />
     </View>
  </View>
)
};
const VehicleRoute = () => {
  return (
    <View style={[ s.Container,{}]}>
      <View style={{marginTop:20,backgroundColor:common.whiteColor,borderWidth:1,borderColor:common.grayColor}}>
        <Text style={[commonStyle.fontSize_18,{marginTop:10,marginBottom:10,marginHorizontal:10,color:common.greenColor,fontWeight:'bold'}]}>VEHICLE</Text>
        <View style={{borderWidth:1,borderColor:common.grayColor,height:30,alignItems:'center',justifyContent:'center',width:80,marginHorizontal:10}}><Text style={{fontWeight:'bold'}}>PT3732</Text></View>
        <View style={{height:5,borderBottomWidth:1,borderColor:common.grayColor,marginHorizontal:10}}></View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
          <Icon name="cog" style={{marginHorizontal:20}} color={common.greenColor} size={22}/>
            <Text>No Defects Found</Text>
        </View>
        <TouchableOpacity style={{height:50}} onPress={() => {}} >
          <View style={[{justifyContent:'center'}]}>
            <Text style={[commonStyle.paddingBottom_6,{marginHorizontal:10,color:common.greenColor,fontSize:18}]}> + Add/Remove Vehicle Defects</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20,backgroundColor:common.whiteColor,borderWidth:1,borderColor:common.grayColor}}>
        <Text style={[commonStyle.fontSize_18,{marginTop:10,marginBottom:10,marginHorizontal:10,color:common.greenColor,fontWeight:'bold'}]}>TRAILERS</Text>
        <View style={{borderWidth:1,borderColor:common.grayColor,height:30,alignItems:'center',justifyContent:'center',width:80,marginHorizontal:10}}><Text style={{fontWeight:'bold'}}>T47245</Text></View>
        <View style={{height:5,borderBottomWidth:1,borderColor:common.grayColor,marginHorizontal:10}}></View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
          <Icon name="cog" style={{marginHorizontal:20}} color={common.greenColor} size={22}/>
            <Text>No Defects Found</Text>
        </View>
        <TouchableOpacity style={{height:50}} onPress={() => {}} >
          <View style={[{justifyContent:'center'}]}>
            <Text style={[commonStyle.paddingBottom_6,{marginHorizontal:10,color:common.greenColor,fontSize:18}]}> + Add/Remove Trailer Defects</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const SignRoute = () => {
  return (
    <View style={[ s.innerContainer]}>
      <TouchableHighlight onPress={() => {}} underlayColor={common.whiteColor} style={[{borderBottomWidth:1,borderColor:common.grayColor,height:50,backgroundColor:common.whiteColor}]}>
        <View style={{padding:10}}>

          <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
               style={{}}
               onClick={()=>{}}
               isChecked={false}
               leftText={''}
           />
           <Text style={{fontSize:15 ,fontFamily:'ProximaNova-Bold',color:'grey'}}>Defects Corrected</Text>

          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {}} underlayColor={common.whiteColor} style={[{borderBottomWidth:1,borderColor:common.grayColor,height:50,backgroundColor:common.whiteColor}]}>
        <View style={{padding:10}}>

          <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
               style={{}}
               onClick={()=>{}}
               isChecked={false}
               leftText={''}
           />
           <Text style={{fontSize:15 ,fontFamily:'ProximaNova-Bold',color:'grey'}}>Defects Need Not Be Corrected</Text>

          </View>
        </View>
      </TouchableHighlight>
      <View style={{padding:5,borderColor:common.grayColor,backgroundColor:common.whiteColor,borderWidth:1, marginTop:20}}>
        <View style={{height:50,alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>Driver Signature</Text>

        </View>
        <View style={{height:200,alignItems:'center',justifyContent:'center',borderColor:common.grayColor,borderTopWidth:1}}>
          <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{borderWidth:1,alignItems:'center',justifyContent:'center',borderColor:'red',height:50,backgroundColor:common.whiteColor,width:150}]}>
            <View><Text style={{color:'red',fontWeight:'bold'}}>Sign DVIR</Text></View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

let window = Dimensions.get("window");

class AddDVIR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
            { key: '1', title: 'General' },
            { key: '2', title: 'Vehicle' },
            { key: '3', title: 'Sign' },

          ],
      startTimePickerVisible: false,
    }


  }
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar style={{backgroundColor:'#000000'}} {...props} />;

  _renderScene = SceneMap({
    '1': GeneralRoute,
    '2': VehicleRoute,
    '3': SignRoute
  });
  _handleStartTimePicked = (date) => {

        this.setState({startTimePickerVisible:false, startTime: moment(date).format('LTS')});
  };
  _hideStartTimePicker = () => this.setState({startTimePickerVisible:false});
  render() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={s.Container}>
        <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
          <TouchableHighlight onPress={() => {navigate('ActivityStatus')}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Close_White}
            />
          </TouchableHighlight>
          <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10,alignItems:'center', justifyContent:'center',flex:0.6}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>New DVIR</Text>
          </View>
          <TouchableHighlight onPress={() => {navigate('ActivityStatus')}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex:1}}>
          <TabViewAnimated
            style={{}}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
          />
        </View>
      </View>

    )
  }
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    // backgroundColor: '#000000',
  },
  innerContainer:{
    flex:1,
    marginHorizontal:5
  },
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
  },
  txtInutStyle : {
   height: 40,
   paddingHorizontal:6.2,
  //  backgroundColor:'red',
   width : window.width - 65,
   },
})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//
//     return {
//         actions: bindActionCreators({
//             getUserDetails
//         }, dispatch)
//     };
// }


export default connect(mapStateToProps, null)(AddDVIR);
