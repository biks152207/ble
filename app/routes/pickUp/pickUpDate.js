import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

/* Actions */
import { setShipmentSearchQuery, clearShipments, clearAllQuery } from './../../actions/shipments';


let self;

class PickUpDate extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
      this.state = {
          dateFrom:''
      };

      this.setDropOffLocation = this.setDropOffLocation.bind(this);
      this.searchByPickUpDate = this.searchByPickUpDate.bind(this);
      this.dateSelected = this.dateSelected.bind(this);
  }

  dateSelected(date) {
    const d = new Date(date.timestamp);
    const dateFrom = d.toISOString();
    this.props.actions.setShipmentSearchQuery({
      dateFrom
    });
    this.props.actions.clearShipments();
   //  let response = await this.props.actions.searchAllAvailableShipment(query);
    this.props.navigation.navigate('PickUpHome');
  }

  searchByPickUpDate() {

  }

    setDropOffLocation(location){
        this.props.actions.setShipmentSearchQuery(this.props.shipments.searchQuery.cityState, location);
        this.props.actions.clearShipments();
       //  let response = await this.props.actions.searchAllAvailableShipment(query);
        // this.props.navigation.navigate('PickUpHome');
    }


  render(){
    const { navigate, goBack } = this.props.navigation;
    return (

      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <TouchableHighlight onPress={() =>   this.props.navigation.navigate('PickUpHome')} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :40},commonStyle.contentCenter]}>
          <Image
            style={{height:15,width:16}}
            source={images.Close_White}
          />
        </TouchableHighlight>
        <TouchableOpacity style={[commonStyle.smallHeaderBar]} onPress={() => {this.props.actions.clearAllQuery();this.props.navigation.navigate('PickUpHome'); }}>
          <Text style={[commonStyle.fontSize_12,styles.fontMullerRegular,{color:common.whiteColor,textAlign:'right',textDecorationLine:'underline',marginRight:15}]}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor:common.blackColor}}>
        <View style={[styles.textInputParentSearch,{marginTop:5,marginBottom:10}]}>
            <TouchableHighlight underlayColor="transparent"  style={{}}>
              <Text style={[commonStyle.fontSize_20,styles.fontMullerRegular,{fontSize:20,fontWeight:'500',color:common.whiteColor,lineHeight:50,paddingLeft:35}]}>Select a pickup date</Text>
            </TouchableHighlight>
          </View>
      </View>

      <View style={commonStyle.subContainer}>

            <Calendar
            style={{marginTop:25}}
            onDayPress={(day) => {this.dateSelected(day)}}
            onMonthChange={(month) => {this.dateSelected(month)}}
            />

      </View>
      <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:70}}>

      </View>
      {/*<TouchableHighlight underlayColor="transparent" onPress={() => navigate('TrailerType')} style={[commonStyle.subContainer,styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:10}]}>
        <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>NEXT</Text>
      </TouchableHighlight>*/}
      </View>
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        shipments: state.shipments,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setShipmentSearchQuery,
            clearShipments,
            clearAllQuery
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PickUpDate)
