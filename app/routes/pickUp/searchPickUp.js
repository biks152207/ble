import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { HTTP } from '../../utils/HTTP';

import { searchPlaces } from './../../utils/utility';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

/* Actions */
import { setShipmentSearchQuery, searchAllAvailableShipment, clearShipments, clearAllQuery } from './../../actions/shipments';
import  SuggestLocation from '../Common/SuggestLocation';

let self;

class SearchPickUp extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      cityState:'',
      suggestions: [],
      searching: false
    };
    this.setPickupLocation = this.setPickupLocation.bind(this);
    this.searchPickUpLocation = this.searchPickUpLocation.bind(this);
    this.myLocation = this.myLocation.bind(this);

  }

  myLocation() {

      this.props.actions.clearAllQuery();
      const query = {
        driverCurrentLocation: JSON.stringify(this.props.user.driver.currentDriverLocation.coordinates)
      }
      this.props.actions.setShipmentSearchQuery(query);
     //  let response = await this.props.actions.searchAllAvailableShipment(query);
      this.props.navigation.navigate('PickUpHome');
  }

    searchPickUpLocation(location){
      searchPlaces(location)
        .then((response) => {
          if (response.features.length > 0) {
            const suggestions = [...response.features];
            this.setState({suggestions});
          } else {
            this.setState({suggestions: []});
          }
        })
        .catch((error) => {
          this.setState({suggestions: []});
        })
      // HTTP('get', `/driver/getAddress/pickup?searchTerm=${location}`)
      //   .then((response) => {
      //     if (response) {
      //       const suggestions = response.data.data;
      //       this.setState({suggestions});
      //     }
      //   })
      // this.props.actions.setShipmentSearchQuery(location);
      // this.props.navigation.navigate('SearchDropOff');
    }
   async setPickupLocation(cityState) {
     let query = {}
     query['cityStateLatLong'] = JSON.stringify(cityState.center);
     query['cityState'] = cityState.place_name;
     this.props.actions.clearShipments();
     this.props.actions.setShipmentSearchQuery(query);
    //  let response = await this.props.actions.searchAllAvailableShipment(query);
     this.props.navigation.navigate('PickUpHome');
   }

  render(){
    const { navigate,goBack } = this.props.navigation;
    return (

      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PickUpHome')} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :40},commonStyle.contentCenter]}>
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
        <View style={[styles.textInputParentSearch]}>
          <TextInput
            underlineColorAndroid = "transparent"
            value={this.state.cityState}
            autoCapitalize={'none'}
            placeholder = "Enter pickup location"
            autoFocus = {true}
            placeholderTextColor={common.darkGrayColor}
            onChangeText={(cityState) => {this.setState({cityState}); this.searchPickUpLocation(cityState)}}
            style={[styles.txtInutStyleSearch,styles.fontMullerRegular,{fontSize:20}]}
            />
              <Image
                style={{marginTop:15}}
                source={images.Search_Glass}
              />
            </View>
      </View>
      <View style={{height:70,borderBottomWidth:1,borderBottomColor:common.grayColor}}>
          <TouchableHighlight underlayColor="transparent"   style={{marginTop:10,marginBottom:10}} onPress={() => this.myLocation()}>
            <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,paddingLeft:35}]}>My Location</Text>
          </TouchableHighlight>
      </View>

      <View style={commonStyle.subContainer}>
        <View style={{marginTop:25}}>
          {/*<TouchableHighlight style={{marginBottom:11}} underlayColor="transparent" onPress={() => this.setPickupLocation(this.state.cityState)} >
            <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Select Above Location</Text>
          </TouchableHighlight>*/}
          <ScrollView>
          {this.state.suggestions &&
            <View>
              {this.state.suggestions.map((address, key) => {
                return (
                  <SuggestLocation address={address} key={key} pick={this.setPickupLocation}/>
                )
              })}
            </View>

          }
          </ScrollView>
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('SearchDropOff')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('SearchDropOff')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('SearchDropOff')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('SearchDropOff')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('SearchDropOff')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}

        </View>
      </View>


      </View>
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        shipments: state.shipments,
        user: state.auth.user
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setShipmentSearchQuery,
            searchAllAvailableShipment,
            clearShipments,
            clearAllQuery
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SearchPickUp)
