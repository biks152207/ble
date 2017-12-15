import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions,Modal,AsyncStorage, ActivityIndicator} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripDetailsView from './../../components/tripDetailsView/tripDetailsView.js';
// import { Components } from 'expo';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
var bbox = require('geojson-bbox');

/* Actions */
import { acceptShipment, addIdForAcceptance,selectShipment } from './../../actions/shipments';
import { sendRequest } from './actionCreator';
import { AlertInfo } from '../../utils/AlertInfo';
import { HTTP } from '../../utils/HTTP';

import { getUserDetails, setUserType } from './../../actions/auth';



import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import accessToken from './../../utils/AccessToken';
// Mapbox.setAccessToken(accessToken);



let self;
let window = Dimensions.get("window");
const coordinates = {
  latitude: -36.8457991,
  longitude: 174.7666099,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
class TripDetails extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;

    this.state = {
      tripConfirmModal : false,
      requestInProgress: false,
      shipmentAcceptFailed: false,
      annotations:[{
        coordinates: [[34.0522, -118.2437]],
        type: 'polyline',
        strokeColor: '#00FF00',
        strokeWidth: 2,
        id: 'driver path'
      }],
      isUserDataLoaded: false,
      centerCoordinate: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    };
    this.acceptShipment = this.acceptShipment.bind(this);
    this.setTripConfirmModalVisible = this.setTripConfirmModalVisible.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.getMidpoint = this.getMidpoint.bind(this);

  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('@Axle:token');
    let response = await this.props.actions.getUserDetails(token);
    if (response) {
        this.setState({isUserDataLoaded: true})
    } else {
      //something wrong
    }
  }


    getMidpoint(lat1, lng1, lat2, lng2) {

      var feature = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [lat1, lng1], [lat2, lng2]
          ]
        }
      };
      const extent = bbox(feature);
      return extent;
    }

  sendRequest(id) {
    if (id) {
      let customObj= {}
      customObj['shipment']=this.props.shipments.selectedShipment;
      customObj['shipper_Id']=id;
      this.props.actions.sendRequest(customObj)
      } else {
      AlertInfo('Shipper doesn\'t exist');
    }
  }

  setTripConfirmModalVisible(visible) {
      this.setState({tripConfirmModal: visible});
  }
    acceptShipment(shipmentId){
      const { navigate } = this.props.navigation;

      let self=this;
      if(this.props.shipments.selectedShipment.currentStatus=="ACCEPTED"){
        let formData=new FormData();
        formData.append('shipmentId',this.props.shipments.selectedShipment._id);
                AsyncStorage.getItem('@Axle:token')
                  .then(function(token){
                    HTTP('put', `/driver/startShipment`, formData, {authorization: "Bearer "+token ,'Content-Type':`multipart/form-data; boundary=${formData._boundary}`})
                    .then(function (response) {
                      if(response.data.error){
                        AlertInfo(response.data.message);

                      }else {
                        self.setTripConfirmModalVisible(false);
                        self.props.actions.selectShipment(self.props.shipments.selectedShipment,navigate).then(function(){
                          self.props.navigation.navigate('PickUpLocation');

                        });

                      }

                    })
                    .catch(error => {
                      AlertInfo(error.response.data.message);
                    })
            })
      }else if(!this.state.requestInProgress){
            self.setTripConfirmModalVisible(!self.state.tripConfirmModal);
            self.setState({requestInProgress: true});
            self.props.actions.acceptShipment(shipmentId,navigate)
                .then(function(response){
                    self.setState({tripConfirmModal: false});
                    self.setState({requestInProgress: false});
                    self.props.navigation.navigate('Shipments');
                })
                .catch(function(error){

                    console.log("error in component: ", error);
                    self.setState({requestInProgress: false, shipmentAcceptFailed: true});
                    // TODO: any processing
                });
        }
  }


  componentDidMount() {

  }

  render(){
    const { navigate,goBack } = this.props.navigation;
    let self=this;
    return (
        <View style={commonStyle.container}>
          {!this.state.isUserDataLoaded ?
            <ActivityIndicator style={{flex:1, alignItems:'center', marginTop: 10}}/>:
            <View style={{flex:1}}>
            <View style={{height:190}}>
              {this.props.shipments.selectedShipment &&  this.props.shipments.selectedShipment._id &&
                <MapView
                  ref={map => { this._map = map;
                    if (map) {
                      map.setCenterCoordinateZoomLevel(this.props.shipments.selectedShipment.pickupLocationLat, this.props.shipments.selectedShipment.pickupLocationLong, 5, animated = true, () => {
                        let getBounds=this.getMidpoint(this.props.shipments.selectedShipment.pickupLocationLat, this.props.shipments.selectedShipment.pickupLocationLong, this.props.shipments.selectedShipment.deliveryLocationLat, this.props.shipments.selectedShipment.deliveryLocationLong);
                         map.setVisibleCoordinateBounds(getBounds[0], getBounds[1], getBounds[2], getBounds[3],paddingTop = 40, paddingRight = 50, paddingBottom = 40, paddingLeft = 50, animated = true);
                      });
                    }

                  }} style={{flex:1}}
                  initialZoomLevel={2}
                  initialDirection={0}
                  rotateEnabled={false}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  styleURL={Mapbox.mapStyles.streets}
                  annotations={this.state.annotations}
                >
                <Annotation
                  id="pickupLocation"
                  coordinate={{latitude: this.props.shipments.selectedShipment.pickupLocationLat, longitude: this.props.shipments.selectedShipment.pickupLocationLong}}
                  style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                >
                  <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={images.Location_Map} />
                    {/*<Text>{this.props.shipments.selectedShipment.pickupCompanyName}</Text>*/}
                  </View>
                </Annotation>
                <Annotation
                  id="deliveryLocation"
                  coordinate={{latitude: this.props.shipments.selectedShipment.deliveryLocationLat, longitude: this.props.shipments.selectedShipment.deliveryLocationLong}}
                  style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                >
                <View style={{width: 100, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={images.Pin_Map} />
                  {/*<Text>{this.props.shipments.selectedShipment.deliveryCompanyName}</Text>*/}
                </View>
                </Annotation>
                </MapView>
              }

              <View style={[commonStyle.headerBarHeight,{flexDirection : 'row',position:'absolute',top:1}]}>
                <View style={{flex:0.5}}>
                <TouchableHighlight onPress={() =>goBack() } underlayColor="transparent" style={[{width : 60,height : 50,marginTop :22},commonStyle.contentCenter]}>
                  <Image
                    style={{width : 21, height : 18}}
                    source={images.Back_Arrow}
                  />
                </TouchableHighlight>
                </View>
                <View style={[{flex:3,marginTop:25}]}>
                  <Text style={[commonStyle.fontSize_16,{color:common.whiteColor,fontWeight: 'bold'}]}></Text>
                </View>
              </View>
            </View>

<ScrollView>
              <View style={{flex:1,marginBottom:10}}>
                {
                  this.props.shipments.selectedShipment && this.props.shipments.selectedShipment._id &&
                  <TripDetailsView dataTripDetails={this.props.shipments.selectedShipment}/>

                }


              </View>
            <View style={{borderTopWidth:1,borderTopColor:common.grayColor}}>
                <TouchableHighlight underlayColor="transparent" onPress={() => navigate('TripMessage')} >
                <View style={[commonStyle.scrollContainer,{paddingTop:15,paddingBottom:15,justifyContent:'center'}]}>
                  <Text style={[commonStyle.fontSize_12,{color:common.blackColor,fontWeight: '600',paddingLeft:10}]}>MORE LOAD INFORMATION</Text>
                  <Image
                    style={{position:'absolute',right:15}}
                    source={images.Arrow_Right}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={{borderTopWidth:1,borderTopColor:common.grayColor}}>
            </View>
            {this.props.shipments.selectedShipment && this.props.shipments.selectedShipment._id &&
              <View style={{marginTop:10,marginBottom:10}}>
              { (this.props.user.driver.carrier == undefined || this.props.user.driver.carrier == null) &&  this.props.user.approvedBy.indexOf(this.props.shipments.selectedShipment.shipper._id) == -1?
                <TouchableHighlight  onPress={() => { this.sendRequest(this.props.shipments.selectedShipment.shipper ? this.props.shipments.selectedShipment.shipper._id : null) }}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.subContainer,commonStyle.contentCenter,{backgroundColor:common.greenColor,height:50}]}>
                <Text style={[commonStyle.fontSize_14,{fontWeight:'bold',fontFamily:'ProximaNova-Bold'}]}>REQUEST</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight  onPress={() => { this.setTripConfirmModalVisible(true) }}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.subContainer,commonStyle.contentCenter,{backgroundColor:common.greenColor,height:50}]}>
                <Text style={[commonStyle.fontSize_14,{fontWeight:'bold',fontFamily:'ProximaNova-Bold'}]}>{this.props.shipments.selectedShipment.currentStatus === 'ACCEPTED' ?'START LOAD' : 'ACCEPT SHIPMENT'}</Text>
                </TouchableHighlight>
              }

              </View>

            }
            </ScrollView>





            <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.tripConfirmModal}
               style={{}}
               onRequestClose={()=>{}}
               >
              <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)', marginBottom:10}}>
                <View style={{width:window.width,backgroundColor:common.whiteColor,position:'absolute',bottom:0}}>
                    {
                        (this.state.shipmentAcceptFailed)?
                            <View>
                              <View style={{paddingTop:20,paddingHorizontal:50}}>
                                <Text style={[commonStyle.fontSize_20,{fontWeight:'500',textAlign:'center'}]}>
                                  Sorry there is something wrong
                                </Text>
                              </View>
                              <View style={{flexDirection:'row',marginTop:20,height:50}}>
                              <TouchableHighlight  onPress={() => { this.setTripConfirmModalVisible(!this.state.tripConfirmModal) }}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.subContainer,styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:10}]}>
                                <Text style={[commonStyle.fontSize_14,{fontWeight:'bold',fontFamily:'ProximaNova-Bold'}]}>BACK</Text>
                              </TouchableHighlight>
                              </View>
                            </View>
                            :
                            <View>
                              <View style={{paddingTop:10,paddingHorizontal:12}}>
                              {self.props.shipments.selectedShipment.currentStatus=="ACCEPTED" ?
                              <Text style={[commonStyle.fontSize_20,{fontWeight:'500',textAlign:'center'}]}>
                              Are you sure you want to start load?
                              </Text>

                                :
                                <View>
                                <Text style={[commonStyle.fontSize_20,{fontWeight:'500',textAlign:'center'}]}>
                                Are you sure you want to accept load?
                                </Text>
                                  <Text style={[{fontSize:12,lineHeight:13,paddingTop:5,textAlign:'center'}]}>
                                  Please review load information for this loads terms. By accepting you confirm all the load information, will receive a confirmed rate confirmation to your email, and will be tendered the load automatically
                                    </Text>
                                    </View>
                                  }
                              </View>
                              <View style={{flex:1,marginHorizontal:10}}>
                                <View>
                                  <View style={{flexDirection:'row',marginTop:20,height:50}}>
                                    <TouchableHighlight onPress={() => {  this.setTripConfirmModalVisible(!this.state.tripConfirmModal)}} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flex:0.5,marginRight:5}]}>
                                      <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>NO</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight onPress={() => this.acceptShipment(this.props.shipments.selectedShipment._id)}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,flex:0.5}]}>
                                      <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>YES</Text>
                                    </TouchableHighlight>
                                  </View>
                                </View>
                              </View>
                            </View>
                    }
               </View>
              </View>
             </Modal>
            </View>
      }
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
            acceptShipment,
            selectShipment,
            addIdForAcceptance,
            sendRequest,
            getUserDetails
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)
