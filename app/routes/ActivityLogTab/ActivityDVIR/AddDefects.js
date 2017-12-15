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
import PercentageCircle from 'react-native-percentage-circle';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import CheckBox from 'react-native-check-box'
import commonStyle from './../../../config/commonStyle.js';
import common from './../../../config/common';

let window = Dimensions.get("window");

class AddDefects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defectList:["other","Air Compressor","Air Lines","Battey","Belts & Hoses","Body","Brake Accessories","Clutch","Coupling Devices"]
    }


  }

  render() {
    return(
        <Modal
          animationType={'slide'}
          transparent={true}
          onRequestClose={()=>{}}
          >
            <View>
            <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() => {}} underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  style={{width : 21, height : 18}}
                  source={images.Close_White}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10,alignItems:'center', justifyContent:'center',flex:0.6}]}>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Add Defects</Text>
              </View>
              <TouchableHighlight onPress={() => {}} underlayColor={common.tuchableUnderlayGreenColor} style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Done</Text>
              </TouchableHighlight>
            </View>
            <View style={{height : (window.height)-70}}>
              <ScrollView>
                {this.state.defectList.map((d,i)=>{
                  return (<View>
                    <TouchableHighlight onPress={() => {}} underlayColor={common.whiteColor} style={[{borderBottomWidth:1,borderColor:common.grayColor,height:50,backgroundColor:common.whiteColor}]}>
                      <View style={{padding:10}}>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <CheckBox
                             style={{}}
                             onClick={()=>{}}
                             isChecked={false}
                             leftText={''}
                         />
                         <Text style={{fontSize:15 ,fontFamily:'ProximaNova-Bold',color:'grey'}}>{d}</Text>

                        </View>
                      </View>
                    </TouchableHighlight>
                      </View>)
                  })
                }
              </ScrollView>
            </View>
            </View>
        </Modal>
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


export default connect(mapStateToProps, null)(AddDefects);
