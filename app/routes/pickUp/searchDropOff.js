import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { HTTP } from '../../utils/HTTP';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import  SuggestLocation from '../Common/SuggestLocation';

import { searchPlaces } from './../../utils/utility';



/* Actions */
import { setShipmentSearchQuery, clearShipments, clearAllQuery } from './../../actions/shipments';

let self;

class SearchDropOff extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      deliveryStateCity:'',
      suggestions: []
    };
    this.setDropOffLocation = this.setDropOffLocation.bind(this);
    this.searchPickUpLocation = this.searchPickUpLocation.bind(this);

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
      .catch(() => {
        this.setState({suggestions: []});
      })
    // HTTP('get', `/driver/getAddress/delivery?searchTerm=${location}`)
    //   .then((response) => {
    //     if (response) {
    //       console.log(response, 'response....');
    //       const suggestions = response.data.data;
    //       this.setState({suggestions});
    //     }
    //   })
    // this.props.actions.setShipmentSearchQuery(location);
    // this.props.navigation.navigate('SearchDropOff');
  }
 setDropOffLocation(deliveryStateCity) {
   let query = {}
   query['deliveryStateCityLatLong'] = JSON.stringify(deliveryStateCity.center);
   query['deliveryStateCity'] = deliveryStateCity.place_name;
   this.props.actions.clearShipments();
   this.props.actions.setShipmentSearchQuery(query);
  //  let response = await this.props.actions.searchAllAvailableShipment(query);
   this.props.navigation.navigate('PickUpHome');
  //  const query = {
  //    deliveryStateCity
  //  }
  //  this.props.actions.clearShipments();
  //  this.props.actions.setShipmentSearchQuery(query);
  // //  let response = await this.props.actions.searchAllAvailableShipment(query);
  //  this.props.navigation.navigate('PickUpHome');
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
            value={this.state.deliveryStateCity}
            placeholder = "Enter drop-off location"
            autoFocus = {true}
            autoCapitalize="none"
            placeholderTextColor={common.darkGrayColor}
            onChangeText={(deliveryStateCity) => {this.setState({deliveryStateCity}); this.searchPickUpLocation(deliveryStateCity)}}
            style={[styles.txtInutStyleSearch,styles.fontMullerRegular,{fontSize:20,fontWeight:'500'}]}
            />
              <Image
                style={{marginTop:15}}
                source={images.Search_Glass}
              />
            </View>
      </View>
      <View style={{height:70,borderBottomWidth:1,borderBottomColor:common.grayColor}}>
          <TouchableHighlight underlayColor="transparent" onPress={() =>{this.setDropOffLocation(null)}}  style={{marginTop:10,marginBottom:10}}>
            <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,paddingLeft:35}]}>Anywhere</Text>
          </TouchableHighlight>
      </View>

      <View style={commonStyle.subContainer}>
        <View style={{marginTop:25}}>
          <ScrollView keyboardShouldPersistTaps="always">
            {this.state.suggestions &&
              <View>
              {this.state.suggestions.map((address, key) => {
                return (
                  <SuggestLocation address={address} key={key} pick={this.setDropOffLocation}/>
                )
              })}
              </View>
            }
          </ScrollView>
          {/*<TouchableHighlight style={{marginBottom:11}} underlayColor="transparent" onPress={this.setDropOffLocation(this.state.searchText)} >
            <Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>Select Above Location</Text>
          </TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('PickUpDate')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('PickUpDate')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('PickUpDate')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('PickUpDate')} >*/}
            {/*<Text style={[commonStyle.fontSize_16,styles.fontMullerRegular,{lineHeight:50,color:common.grayTextColor,paddingLeft:15}]}>City name,State Initial</Text>*/}
          {/*</TouchableHighlight>*/}
          {/*<TouchableHighlight style={{marginBottom:10}} underlayColor="transparent" onPress={() => navigate('PickUpDate')} >*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchDropOff)
