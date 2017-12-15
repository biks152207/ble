import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ButtonLoader, ScreenLoader } from '../../components/loader/';


import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import { setShipmentSearchQuery, searchAllAvailableShipment, clearShipments,clearAllQuery } from './../../actions/shipments';
import { getAllTruckTypes } from '../register/actionCreator';

import  TrailerComponent from '../Common/TrailerComponent';



let self;
let window = Dimensions.get("window");
class TrailerType extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      //searchText:''
      searching: false
    }

    this.selectTruckType = this.selectTruckType.bind(this);
    this.search = this.search.bind(this);
  }

  async search() {
    const { navigate } = this.props.navigation;

    this.setState({searching: true})
    let response = await this.props.actions.searchAllAvailableShipment(this.props.searchQuery,navigate);
    if (response) {
      this.props.navigation.navigate('PickUpResult');
      this.setState({searching: false})
    } else {
      this.setState({searching: false});
    }
  }

  selectTruckType(truckType) {
    const obj = {
      truckType
    }
    this.props.actions.clearShipments();
    this.props.actions.setShipmentSearchQuery(obj);
    this.props.navigation.navigate('PickUpHome');
  }

  componentDidMount() {
    this.props.actions.getAllTruckTypes();
  }

  render(){
    console.log(this.props.searchQuery, 'truck type.....');
    const { navigate,goBack } = this.props.navigation;
    return (

      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PickUpHome') } underlayColor="transparent" style={[{width : 60,height : 70,marginTop :40},commonStyle.contentCenter]}>
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
              <Text style={[commonStyle.fontSize_20,styles.fontMullerRegular,{color:common.whiteColor,lineHeight:50,paddingLeft:35}]}>Select a trailer type</Text>
            </TouchableHighlight>
          </View>
      </View>

      <View style={{height:window.height-220}}>
        <ScrollView contentContainerStyle={[commonStyle.scrollContainer]}>
        <View style={[commonStyle.subContainer]}>

          <View style={{marginTop:25}}>
            {this.props.truckType.map((trailer, key) => {
              return (
                <TrailerComponent key={key} {...trailer} selectTruckType={this.selectTruckType}/>
              )
            })}
            {/*<TouchableHighlight style={{marginBottom:11}}  >
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}  >
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginBottom:10}}>
              <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Trailer Type</Text>
            </TouchableHighlight>*/}

            </View>
        </View>
        </ScrollView>

      </View>
      <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:0}}>

      </View>
      {/*navigate('PickUpResult')*/}
      {this.state.searching &&
        <ScreenLoader/>

      }
      {/*<TouchableHighlight onPress={() => this.search()}   underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.subContainer,styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:10}]}>
        <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>FIND LOADS</Text>
      </TouchableHighlight>*/}
      </View>
    )
  }
  //************************************** Render end*****************************//
};


function mapStateToProps(state){
    return {
        truckType: state.LoginReducer.truckType,
        searchQuery: state.shipments.searchQuery
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setShipmentSearchQuery,
            searchAllAvailableShipment,
            getAllTruckTypes,
            clearShipments,
            clearAllQuery
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailerType)
