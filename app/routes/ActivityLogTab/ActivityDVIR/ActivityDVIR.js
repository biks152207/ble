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

class ActivityDVIR extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    const { navigate, state, goBack,dispatch } = this.props.screenProps.rootNavigation;

    return(
      <View style={s.Container}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Icon name="wrench" color={common.greenColor} size={50}/>
          <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <Text style={{fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>No Vehicle Inspection Reports</Text>
            <Text style={{fontSize:15 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>For Jan 30</Text>

          </View>

        </View>
        <View style={{bottom:20,right:20,position:'absolute'}}>
          <TouchableHighlight onPress={() => {navigate('AddDVIR')}} underlayColor={common.tuchableUnderlayGreenColor} style={{width:50,height:50, borderRadius:25,alignItems:'center',justifyContent:'center',backgroundColor:'red'}}>
            <View style={{}}>
              <Text style={{fontSize:25 ,fontFamily:'ProximaNova-Bold',color:common.whiteColor}}>+</Text>
            </View>
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


export default connect(mapStateToProps, null)(ActivityDVIR);
