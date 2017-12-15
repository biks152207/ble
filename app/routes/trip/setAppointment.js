import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions,TouchableOpacity,Modal} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripOverviewFullView from './../../components/tripOverviewFullView/tripOverviewFullView.js';
import MessageView from './../../components/messageView/messageView.js';
// import { Components } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';


import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import { acceptShipment, addIdForAcceptance } from './../../actions/shipments';

let self;
let window = Dimensions.get("window");
class SetAppointment extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
       pickUpIsDateTimePickerVisible: false,
       originalPickUpDate: '',
       pickUpDate:'',
       pickHr: '',
       pickAmPm: '',
       pickUpMeridiemTime:'am',
       pickUpMeridiemTimeModal:false,
       pickUpTimeZone:'PST',
       pickUpTimeZoneModal:false,
       tripConfirmModal : false,
       requestInProgress: false,
       shipmentAcceptFailed: false
    }
    this._onPressOptionPickUp = this._onPressOptionPickUp.bind(this);
    this.setHr = this.setHr.bind(this);
    this.pickMin = this.pickMin.bind(this);
    this.pickAmPm = this.pickAmPm.bind(this);
    this.setTripConfirmModalVisible = this.setTripConfirmModalVisible.bind(this);
  }

  pickAmPm() {

  }

  acceptShipment(shipmentId){
    const { navigate } = this.props.navigation;

      if(!this.state.requestInProgress){
          self.setTripConfirmModalVisible(!self.state.tripConfirmModal);
          self.setState({requestInProgress: true});
          self.props.navigation.navigate('PickUpLocation');
          (this.props.actions.acceptShipment(shipmentId,navigate))
              .then(function(response){
                  self.setState({tripConfirmModal: false});
                  self.setState({requestInProgress: false});
                  self.props.navigation.navigate('PickUpLocation');
              })
              .catch(function(error){
                  console.log("error in component: ", error);
                  self.setState({requestInProgress: false, shipmentAcceptFailed: true});
                  // TODO: any processing
              });
      }
    }

  setTripConfirmModalVisible(visible) {
      this.setState({tripConfirmModal: visible});
  }

  pickMin(pickMin) {
    var reg = /^\d+$/;
    if (reg.test(pickMin)) {
      this.setState({pickMin})
    }
  }

  setHr(pickHr) {
    var reg = /^\d+$/;
    console.log(pickHr);
    console.log(typeof pickHr);
    console.log(reg.test(pickHr));
    if (reg.test(pickHr)) {
      this.setState({pickHr})
    }
  }

 _handleDatePicked = (date) => {
    // console.log('A date has been picked: ', date);
      console.log(date);
     this.setState({pickUpIsDateTimePickerVisible:false, originalPickUpDate: date});
    //  const d = new Date(date).toISOString();
    //  var month = d.getUTCMonth() + 1; //months from 1-12
    //  var day = d.getUTCDate();
    //  var year = d.getUTCFullYear();
     const pickUpDate = new Date(date).toISOString().split('T')[0];
     console.log(pickUpDate);
     this.setState({pickUpDate})

     //this.setState({pickUpDate:date});
   };
  _hideDateTimePicker = () => this.setState({pickUpIsDateTimePickerVisible:false});
  _onPressOptionPickUp(value){
      console.log(value);
      if (value === 'pm' || value === 'am') {
        this.setState({pickUpMeridiemTime: value})
      }
      if (value === 'PST' || value === 'IST') {
        this.setState({pickUpTimeZone: value})
      }
      this.setState({pickUpMeridiemTimeModal : false})
      this.setState({pickUpTimeZoneModal : false});

      // var d = new Date(Date.UTC(, 11, 30, 12, 0, 0));

    }
  render(){
    const { navigate,goBack } = this.props.navigation;
    return (

      <View style={commonStyle.container}>

      <View style={[commonStyle.headerBarHeight90,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:1}}>
        <View style={{marginTop :22,paddingLeft:23}}>
            <Text style={[commonStyle.fontSize_20,{color:common.whiteColor}]}>Set Appointment</Text>
        </View>
      </View>
        <View style={[{flex:1, marginTop : 25,marginRight :20},commonStyle.contentRight]}>
          <View style={[styles.oval,commonStyle.contentCenter]}>
              <Text style={[commonStyle.fontSize_12,styles.fontMullerRegular,{color:common.whiteColor,textAlign:'right',textDecorationLine:'underline'}]}>Cancel</Text>
          </View>
        </View>
      </View>

      <View style={{height:window.height-160}}>
       <ScrollView>

            <View style={{marginLeft:30,marginRight:30}}>
              <View style={{marginTop:27}}>
                  <Text style={[commonStyle.fontSize_12,styles.fontProximaNovaBold,{color:common.blackColor,textAlign:'left',fontWeight:'600'}]}>PICKUP</Text>
                  <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}>{this.props.shipments.selectedShipment.pickupCompanyName}</Text>
                  <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}>{this.props.shipments.selectedShipment.pickupMobile}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={[commonStyle.fontSize_12,styles.fontProximaNovaBold,{color:common.blackColor,textAlign:'left',fontWeight:'600'}]}>REF# </Text>
                    <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}>{this.props.shipments.selectedShipment.pickupNumber}</Text>
                  </View>
              </View>
              <View style={{marginTop:20}}>
              <View style={commonStyle.paddingBottom_16}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>SELECT A DATE</Text>
                  <View style={styles.textInputParent}>
                      <TouchableOpacity onPress={() => { this.setState({pickUpIsDateTimePickerVisible:true}) }} >
                          <View style={{flexDirection:'row'}}>
                            <View>
                                <Text style={{height:40,width:window.width - 95,paddingLeft:12,paddingTop:9}}>{this.state.pickUpDate}</Text>
                            </View>
                            <View>
                            <Image
                                style={{marginTop :8,height:24,width:24}}
                                source={images.calendar_icon}
                              />
                            </View>
                          </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                       <DateTimePicker
                          titleIOS='Select a date'
                          mode="date"
                         isVisible={this.state.pickUpIsDateTimePickerVisible}
                         onConfirm={() => this._handleDatePicked()}
                         onCancel={this._hideDateTimePicker}
                       />
                     </View>
                </View>
                <View style={commonStyle.paddingBottom_16}>
                    <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>SELECT A TIME</Text>
                  <View style={{flexDirection:'row'}}>
                    <TextInput
                      underlineColorAndroid = "transparent"
                      keyboardType='numeric'
                      placeholder = '00'
                      maxLength = {2}
                      onChangeText={(pickHr) => {this.setHr(pickHr)}}
                      style={[styles.txtInputStyle,{width :50}]}
                      />
                      <View><Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold,{color:common.blackColor,marginRight:8,marginTop:10,marginLeft:8}]}>:</Text></View>
                      <TextInput
                        underlineColorAndroid = "transparent"
                        keyboardType='numeric'
                        placeholder = '00'
                        maxLength = {2}
                        onChangeText={(pickMin) => {this.pickMin(pickMin)}}
                        style={[styles.txtInputStyle,{width :50,height:40}]}
                        />

                        <View style={[styles.textInputParent,{marginLeft:20}]}>
                          <TouchableOpacity onPress={() => { this.setState({pickUpMeridiemTimeModal:true}) }} >
                              <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{height:40,width:55,paddingLeft:12,paddingTop:9}}>{this.state.pickUpMeridiemTime}</Text>
                                </View>
                                <View>
                                <Image
                                    style={{marginTop :16,marginRight:10}}
                                    source={images.Arrow_Down}
                                  />
                                </View>
                              </View>
                          </TouchableOpacity>
                          </View>

                          <View style={[styles.textInputParent,{marginLeft:15}]}>
                            <TouchableOpacity onPress={() => { this.setState({pickUpTimeZoneModal:true}) }} >
                              <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{height:40,width:55,paddingLeft:12,paddingTop:12}}>{this.state.pickUpTimeZone}</Text>
                                </View>
                                <View>
                                <Image
                                    style={{marginTop :16,marginRight:10}}
                                    source={images.Arrow_Down}
                                  />
                                </View>
                              </View>
                              </TouchableOpacity>
                            </View>


                    </View>
                </View>
                </View>
            </View>


            <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:0,marginTop:10}}>
            </View>


            <View style={{marginLeft:30,marginRight:30}}>
              <View style={{marginTop:27}}>
                  <Text style={[commonStyle.fontSize_12,styles.fontProximaNovaBold,{color:common.blackColor,textAlign:'left',fontWeight:'600'}]}>DROP OFF</Text>
                  <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}>{this.props.shipments.selectedShipment.deliveryCompanyName}</Text>
                  <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}>{this.props.shipments.selectedShipment.deliveryMobile}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={[commonStyle.fontSize_12,styles.fontProximaNovaBold,{color:common.blackColor,textAlign:'left',fontWeight:'600'}]}>REF# </Text>
                    <Text style={[commonStyle.fontSize_14,{color:common.grayTextColor,textAlign:'left'}]}> {this.props.shipments.selectedShipment.deliveryNumber}</Text>
                  </View>
              </View>
              <View style={{marginTop:20}}>
              <View style={commonStyle.paddingBottom_16}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>SELECT A DATE</Text>
                  <View style={styles.textInputParent}>
                      <TouchableOpacity onPress={() => { this.setState({pickUpIsDateTimePickerVisible:true}) }} >
                          <View style={{flexDirection:'row'}}>
                            <View>
                                <Text style={{height:40,width:window.width - 95,paddingLeft:12,paddingTop:9}}>{this.state.pickUpDate}</Text>
                            </View>
                            <View>
                            <Image
                                style={{marginTop :8,height:24,width:24}}
                                source={images.calendar_icon}
                              />
                            </View>
                          </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                       <DateTimePicker
                          titleIOS='Select a date'
                          mode="date"
                         isVisible={this.state.pickUpIsDateTimePickerVisible}
                         onConfirm={this._handleDatePicked}
                         onCancel={this._hideDateTimePicker}
                       />
                     </View>
                </View>
                <View style={commonStyle.paddingBottom_16}>
                    <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>SELECT A TIME</Text>
                  <View style={{flexDirection:'row'}}>
                    <TextInput
                      underlineColorAndroid = "transparent"
                      keyboardType='numeric'
                      placeholder = '00'
                      maxLength = {2}
                      style={[styles.txtInputStyle,{width :50}]}
                      />
                      <View><Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold,{color:common.blackColor,marginRight:8,marginTop:10,marginLeft:8}]}>:</Text></View>
                      <TextInput
                        underlineColorAndroid = "transparent"
                        keyboardType='numeric'
                        placeholder = '00'
                        maxLength = {2}
                        style={[styles.txtInputStyle,{width :50,height:40}]}
                        />

                        <View style={[styles.textInputParent,{marginLeft:20}]}>
                          <TouchableOpacity onPress={() => { this.setState({pickUpMeridiemTimeModal:true}) }} >
                              <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{height:40,width:55,paddingLeft:12,paddingTop:9}}>{this.state.pickUpMeridiemTime}</Text>
                                </View>
                                <View>
                                <Image
                                    style={{marginTop :16,marginRight:10}}
                                    source={images.Arrow_Down}
                                  />
                                </View>
                              </View>
                          </TouchableOpacity>
                          </View>

                          <View style={[styles.textInputParent,{marginLeft:15}]}>
                            <TouchableOpacity onPress={() => { this.setState({pickUpTimeZoneModal:true}) }} >
                              <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{height:40,width:55,paddingLeft:12,paddingTop:12}}>{this.state.pickUpTimeZone}</Text>
                                </View>
                                <View>
                                <Image
                                    style={{marginTop :16,marginRight:10}}
                                    source={images.Arrow_Down}
                                  />
                                </View>
                              </View>
                              </TouchableOpacity>
                            </View>


                    </View>
                </View>
                </View>
            </View>


          </ScrollView>
        </View>





      <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:0}}>
      </View>
      <TouchableHighlight onPress={() => { this.setTripConfirmModalVisible(true) }} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 10,left:10,height:50,width:window.width-20}]}>
        <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>ACCEPT SHIPMENT</Text>
      </TouchableHighlight>


      <Modal
      animationType={"slide"}
      transparent={true}
      visible={this.state.pickUpMeridiemTimeModal}
      >
     <View style={[styles.optionView,commonStyle.contentCenter]}>
        <View style={[styles.moreOption,{borderRadius :10}]}>

            <TouchableOpacity onPress={() => this._onPressOptionPickUp('am')} activeOpacity={0.2} style={[commonStyle.contentCenter,styles.borderBottom2,{height : 57}]}>
                <Text style={styles.optionFont2}>am</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._onPressOptionPickUp('pm')} activeOpacity={0.2} style={[commonStyle.contentCenter,{height : 57}]}>
                <Text style={styles.optionFont2}>pm</Text>
            </TouchableOpacity>

        </View>

        <TouchableOpacity onPress={() => this.setState({pickUpMeridiemTimeModal : false})} activeOpacity={0.2} style={[commonStyle.contentCenter, styles.cancelView,{borderRadius : 10}]}>
            <Text style={styles.optionFont}>Cancel</Text>
        </TouchableOpacity>
     </View>
    </Modal>

    <Modal
    animationType={"slide"}
    transparent={true}
    visible={this.state.pickUpTimeZoneModal}
    >

    <View style={[styles.optionView,commonStyle.contentCenter]}>
      <View style={[styles.moreOption,{borderRadius :10}]}>

          <TouchableOpacity onPress={() =>this._onPressOptionPickUp('PST')} activeOpacity={0.2} style={[commonStyle.contentCenter,styles.borderBottom2,{height : 50}]}>
              <Text style={styles.optionFont2}>PST</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._onPressOptionPickUp('IST')} activeOpacity={0.2} style={[commonStyle.contentCenter,{height :50}]}>
              <Text style={styles.optionFont2}>IST</Text>
          </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => this.setState({pickUpTimeZoneModal : false})} activeOpacity={0.2} style={[commonStyle.contentCenter, styles.cancelView,{borderRadius :10}]}>
          <Text style={styles.optionFont}>Cancel</Text>
      </TouchableOpacity>


    </View>
    </Modal>
    <Modal
       animationType={"slide"}
       transparent={true}
       visible={this.state.tripConfirmModal}
       style={{}}
       onRequestClose={()=>{}}
       >
      <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
        <View style={{height:180,width:window.width,backgroundColor:common.whiteColor,position:'absolute',bottom:0}}>
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
                    <Text style={[commonStyle.fontSize_20,{fontWeight:'500',textAlign:'center'}]}>
                    Are you sure you want to accept load?
                    </Text>
                      <Text style={[{fontSize:12,lineHeight:13,paddingTop:5,textAlign:'center'}]}>
                      Please review load information for this loads terms. By accepting you confirm all the load information, will receive a confirmed rate confirmation to your email, and will be tendered the load automatically
                        </Text>

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
            acceptShipment,
            addIdForAcceptance
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAppointment);
