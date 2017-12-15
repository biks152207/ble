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
import moment from 'moment';
import PercentageCircle from 'react-native-percentage-circle';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import commonStyle from './../../../config/commonStyle.js';
import common from './../../../config/common';
let window = Dimensions.get("window");

class ActivitySign extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    return(
      <View style={s.Container}>
        <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
          <TouchableHighlight onPress={() => {}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Close_White}
            />
          </TouchableHighlight>
          <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10,alignItems:'center', justifyContent:'center',flex:0.6}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Sign Log</Text>
          </View>
          <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
            <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text>
          </TouchableHighlight>
        </View>
        <View style={{height:200,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:common.whiteColor,fontSize:18}}>I certify these entries are true</Text>
          <Text style={{color:common.whiteColor,fontSize:18}}>and correct</Text>

        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{borderWidth:1,alignItems:'center',justifyContent:'center',borderColor:'red',height:50,backgroundColor:common.whiteColor,width:150}]}>
            <View><Text style={{color:'red',fontWeight:'bold'}}>Sign DVIR</Text></View>
          </TouchableHighlight>
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


export default connect(mapStateToProps, null)(ActivitySign);
