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
  CameraRoll,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';


import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';
import DocumentScanner from 'react-native-document-scanner';
import DocScan from '../DocScan/DocScan'
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { uploadDocument } from './../DocScan/actionCreator';
import { HTTP } from '../../utils/HTTP';
import { ButtonLoader } from './../../components/loader';
import { getDistanceFromLatLonInMile, getMonth, getDay, getYear, getHr} from './../../utils/utility';


let window = Dimensions.get("window");

class DocType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: 'Document Type',
      modalUpload:false,
      scannedImage:[],
      isLoading:false
    }
    this.uploadImage = this.uploadImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.confirmDelivery = this.confirmDelivery.bind(this);

  }
  dateFormat(date){
    if(date){
      return moment(date).format('MMM D YYYY')
    }else {
      return ''
    }
  }
  fromTime(date){
    if(date){
      return moment(date).format('LT')
    }else {
      return ''
    }
  }
  toTime(date){
    if(date){
      return moment(date).format('LT')
    }else {
      return ''
    }
  }
  uploadImage(image){
    let uploadedDoc = [...this.state.scannedImage];
    uploadedDoc.push(image);
    this.setState({scannedImage:uploadedDoc})
  }
  removeImage(index){
    let uploadedDoc=this.state.scannedImage;
    uploadedDoc.splice(index, 1);
    this.setState({scannedImage:uploadedDoc})

  }
  confirmDelivery(){
    let proofOfDelivery=[];
    this.state.scannedImage.forEach((d,i)=>{
      if (d && d.url) {
        proofOfDelivery.push(d.url);
      }
    })
    if (!proofOfDelivery.length > 0) {
      return;
    }

    let formData=new FormData();
    formData.append('shipmentId',this.props.shipments.selectedShipment._id);
    formData.append('proofOfDelivery',JSON.stringify(proofOfDelivery));
    this.setState({isLoading:true})
          AsyncStorage.getItem('@Axle:token')
              .then((token) =>{
                HTTP('put', `/driver/confirmDelivery`, formData, {authorization: "Bearer "+token ,'Content-Type':`multipart/form-data; boundary=${formData._boundary}`})
                .then((response) => {
                  this.setState({isLoading:false})
                  AsyncStorage.removeItem('@Axle:isLiveShipmentInTracking')
                  this.props.navigation.navigate('LoadCompleted');

                })
                .catch(error => {
                  this.setState({isLoading:false})

                })
        })
  // this.props.actions.uploadDocument({shipmentId: this.props.shipments.selectedShipment._id, proofOfDelivery: this.state.scannedImage})
  }
  render() {
    const dataTripDetails=this.props.shipments.selectedShipment;
    const { navigate, goBack } = this.props.navigation;
    return(
      <View style={s.Container}>
        <StatusBar
             backgroundColor="white"
             barStyle="light-content"
           />
        <View style={s.Header}>
          <View style={s.HeaderContent}>
            <View style={s.HeaderTextContainer}>
              <Text style={s.HeaderText}>Your trip is Complete</Text>
            </View>
            <View style={s.Icon}>
              {/*<EvilIcons name="check" color="#A5DB03" size={getSize(28)}/>*/}
            </View>
          </View>
        </View>
        <View style={s.Content}>
          <View style={s.Location}>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={s.LeftIcon}>
                <View style={[s.dot]}/>
                  <View style={s.dottedLine}>
                    <Image
                      source={images.dotted_line}
                      style={s.dottedLineImage}
                    />
                    <Image
                      source={images.dotted_line}
                      style={s.dottedLineImage}
                    />
                    <Image
                      source={images.dotted_line}
                      style={s.dottedLineImage}
                    />
                    <Image
                      source={images.pin}
                      style={s.pin}
                    />
                  </View>
                  {/*<FontAwesome name="map-marker"  size={18} color="#A5DB03" style={{marginTop: getSize(6)}}/>*/}
              </View>
              <View style={{ flex:5}}>
                <View style={{paddingTop: getSize(24)}}>
                  <Text style={s.MiddleHeadingText}>{`${dataTripDetails.pickupCity} , ${dataTripDetails.pickupState}`}</Text>
                  <Text style={s.SubTitleText}>{this.dateFormat(dataTripDetails.pickupDateTimeFrom) + " • " + this.fromTime(dataTripDetails.pickupDateTimeFrom)+"-"+this.fromTime(dataTripDetails.pickupDateTimeTo)}</Text>
                  <Text style={s.SubTitleText}>{dataTripDetails.pickupMobile}</Text>
                </View>
                <View style={{paddingTop: getSize(24)}}>
                <Text style={s.MiddleHeadingText}>{`${dataTripDetails.deliveryCity} , ${dataTripDetails.deliveryState}`}</Text>
                <Text style={s.SubTitleText}>{this.dateFormat(dataTripDetails.deliveryDateTimeFrom) + " • " + this.fromTime(dataTripDetails.deliveryDateTimeFrom)+"-"+this.fromTime(dataTripDetails.deliveryDateTimeTo)} </Text>
                <Text style={s.SubTitleText}>{dataTripDetails.deliveryMobile}</Text>
                </View>
              </View>
              <TouchableHighlight underlayColor="transparent" onPress={() => navigate('FullInfo')} >
              <View style={{alignItems: 'center',flex:1 ,width:50}} onPress={()=>{navigate('FullInfo')}}>
                <Image source={images.Arrow_Right} style={{marginTop: getSize(22)}}/>
              </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={s.Hr}/>
          <View style={s.UploadSection}>

           <TouchableHighlight underlayColor="transparent" onPress={()=>{ this.setState({modalUpload:true}) }}>
             <Text style={{paddingLeft:getSize(14),paddingTop:getSize(14), borderWidth: 1.5, height:getSize(44), borderColor: '#D1D3D4', color: '#D1D3D4'}}>UPLOAD NECESSARY DOCUMENTS</Text>
           </TouchableHighlight>
              {/*<Text style={{fontSize: getSize(12),fontFamily: 'ProximaNova-Bold', fontWeight: 'bold'}}>UPLOAD NECESSARY DOCUMENTS</Text>*/}

            {/*<View style={{height:getSize(44), paddingTop: getSize(10)}}>
                <EvilIcons name="camera"  color="#D1D3D4" size={30} style={{position: 'absolute', marginLeft: getSize(290), marginTop:getSize(20),zIndex:1, width:getSize(40)}}/>
                <TextInput style={{paddingLeft:getSize(14),borderWidth: 1.5, height:getSize(44), borderColor: '#D1D3D4', placeholderTextColor: '#D1D3D4'}} placeholder="Scan Proof Of Delivery (POD)*"/>
            </View>
            */}
            {this.state.scannedImage.map((image,i)=>{
              return (
                <View key={i}>
                          <View style={{flexDirection:'row', paddingTop: getSize(10) , paddingBottom: getSize(20)}}>
                            <View style={{flex:1}}>
                                <View><Text style={{fontWeight:'bold'}}>DOC TYPE</Text></View>
                                {/*<View ><Text style={{fontStyle:'oblique'}}>proof_{i}.jpg</Text></View>*/}
                                {/*  fontstyle oblique doesn't seem to work */}
                                <View ><Text>proof_{i}.jpg</Text></View>
                            </View>
                            <View style={{alignItems:'flex-end',flex:1}}>
                            <TouchableHighlight  onPress={() =>{this.removeImage(i)}}>
                                <Text style={{fontSize:getSize(20)}}> X </Text>
                            </TouchableHighlight>


                            </View>
                          </View>


                          </View>
                  )
            })}
          {this.state.scannedImage.length > 0 ?
            <View>
              <TouchableHighlight underlayColor="transparent" style={s.confirmDeliverButtonContainer,{backgroundColor:'#A5DB03',height:50,justifyContent:'center'}} onPress={() =>{this.confirmDelivery()}}>
              <View>{this.state.isLoading &&
                <ButtonLoader/>
              }
              <Text  style={s.confirmDeliverText}>CONFIRM DELIVERY</Text>
              </View>
              </TouchableHighlight>
            </View>:null
          }

            </View>


        </View>

        <Modal
          animationType={'none'}
          transparent={true}
        visible={this.state.modalUpload}
          >
          <DocScan scannedImage={(image)=>{ this.uploadImage(image) }} close={()=>{this.setState({modalUpload:false})}} navigation={this.props.navigation}/>
            </Modal>
      </View>
    )
  }
}

const s = StyleSheet.create({
  Container: {
    flex:1
  },
  Header: {
    height: getSize(80),
    backgroundColor: '#000000',
  },
  HeaderContent: {
    flexDirection: 'row',
    marginHorizontal: getSize(20)
  },
  HeaderTextContainer: {
    marginTop: getSize(40),
    flex:1,
  },
  HeaderText: {
    fontSize: getSize(16),
    color: '#A5DB03'
  },
  Icon: {
    marginTop: getSize(40),
    flex:1,
    alignItems: 'flex-end'
  },
  TopIcon: {
    width: getSize(20),
    height: getSize(20)
  },
  Content: {
    flex:1
  },
  Location: {
    height: getSize(210),
    marginHorizontal: 20
  },
  dot: {
    height: getSize(12),
    width: getSize(12),
    borderWidth: getSize(2),
    borderColor: '#A5DB03',
    borderRadius: getSize(12/2),
    marginTop: getSize(6),
    marginBottom: getSize(6)
  },
  dottedLine: {
    paddingLeft: 8
  },
  dottedLineImage: {
    marginTop: getSize(2),
    marginBottom: getSize(2)
  },
  LeftIcon: {
    flex:1,
    alignItems:'center',
    paddingLeft: getSize(10),
    paddingTop: getSize(24)
  },
  MiddleHeadingText: {
    height: getSize(24),
    color: "#000000",
    fontFamily: "ProximaNova-Regular",
    fontSize: getSize(18),
    lineHeight: getSize(20)
  },
  SubTitleText: {
    height: getSize(24),
    color: '#58595B',
    fontFamily: "ProximaNova-Regular",
    fontSize: getSize(14),
    lineHeight: getSize(20)
  },
  UploadSection: {
    // height: getSize(90),
    margin: getSize(20),
  },
  Hr: {
    height: 1,
    width: window.width,
    backgroundColor: '#D1D3D4',
  },
  Hr1: {
    height: 2,
    width: window.width,
    backgroundColor: '#D1D3D4',
  },
  ModalContainer: {
    height:getSize(230),
    backgroundColor: '#FFFFFF',
    bottom: 0,
    position: 'absolute',
    width:window.width
  },
  ButtonWrapper: {
    width: getSize(85),
    height: getSize(40),
    backgroundColor: '#A5DB03',
    borderRadius: getSize(4),
    borderWidth: getSize(2),
    borderColor: '#A5DB03'
  },
  ButtonText: {
    textAlign: 'center',
    marginVertical: getSize(9),
    color: '#FFFFFF',
    fontSize:getSize(14),
    fontWeight: 'bold',
    lineHeight: getSize(20)
  },
  CameraWrapper: {
    height: getSize(447),
    marginTop: getSize(20),
    marginHorizontal: getSize(20),
  },
  CameraTake: {
    alignItems: 'center',
    bottom: getSize(40)
  },
  Image: {
    height: getSize(80),
    width: getSize(80)
  },
  uploadButton: {
    width: 100,
    height: 100,
    backgroundColor: 'grey',

  },
  confirmDeliverText: {
    textAlign:'center',
    color: '#FFFFFF',
    // marginVertical: getSize(16),
    fontSize: getSize(14),
    fontWeight:'bold',
    // lineHeight: getSize(50)
  },
  pin: {
    height: 16,
    width: 10,
    marginTop: 3
  },
  confirmDeliverButtonContainer: {
    flex:1,
    // height: getSize(100),
    backgroundColor: '#A5DB03',
    marginRight: getSize(10)
  },
})


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
            uploadDocument
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DocType);
