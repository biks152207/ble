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
  ScrollView,
  ActivityIndicator,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import images from './../../config/images';
// import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Header from './../../layouts/common/Header/Header.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions/auth';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common';
import { HTTP } from './../../utils/HTTP';
import { showToast, searchPlaces } from './../../utils/utility';

import { getActivityLogs } from './../../actions/activity';
import SignatureCapture from 'react-native-signature-capture';
import { Uploader, fileUploader } from '../../utils/Uploader';
import  SuggestLocation from '../Common/SuggestLocation';


let window = Dimensions.get("window");
let timer;
class ReviewLog extends Component {
  constructor(props){
    super(props);
    this.state = {
        vehicle:'',
        vehicleValid:'',
        distance:'',
        distanceValid: false,
        documents: '',
        documentValid: false,
        shippingDocuments:'',
        shippingDocumentsValid: false,
        coDriver:'',
        coDriverValid: false,
        startingLoc:'',
        startingLocValid: false,
        endingLoc:'',
        endingLocValid: false,
        trailer: '',
        trailerValid: false,
        suggestions1: [],
        suggestions2: [],
        trailerData: [
          'FLATBED',
          'REEFER',
          'DRY VAN'
        ],
        trailerDataDuplicate: [],
        isDropOpen: false,
        notes: '',
        notesValid: false,
        uploading: false,
        submitting: false,
        signature:'',
        _id: ''
    }
    this.selectTrailer = this.selectTrailer.bind(this);
    this.handleVehicle = this.handleVehicle.bind(this);
    this.validation = this.validation.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.trailerDataChange = this.trailerDataChange.bind(this);
    this.submit = this.submit.bind(this);
    this.download = this.download.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleCoDriver = this.handleCoDriver.bind(this);
    this.handleStartingLocation = this.handleStartingLocation.bind(this);
    this.handleEndingLocation = this.handleEndingLocation.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.selectedLocation = this.selectedLocation.bind(this);
  }

  selectedLocation(address, type) {
    this.setState({[type]: address.place_name}, () => {
      type === 'startingLoc' ? this.setState({suggestions1: []}): this.setState({suggestions2: []})
      this.validation(type, address.place_name);
    })
  }
  searchLocation(location, type){
    searchPlaces(location)
      .then((response) => {
        if (response.features.length > 0) {
          const suggestions = [...response.features];
          if (type === 'startingLoc') {
            this.setState({suggestions1:[...suggestions]});
          } else {
            this.setState({suggestions2:[...suggestions]});
          }
        } else {
          if (type === 'startingLoc') {
            this.setState({suggestions1: []});

          }else {
            this.setState({suggestions2: []});
          }
        }
      })
      .catch((error) => {
        this.setState({suggestions: []});
      })

  }

  handleStartingLocation(startingLoc) {
    this.setState({startingLoc}, () => {
      this.validation('startingLoc', startingLoc);
    })
  }

  handleEndingLocation(endingLoc) {
    this.setState({endingLoc}, () => {
      this.validation('endingLoc', endingLoc);
    })
  }

  handleNotes(notes) {
    this.setState({notes}, () => {
      this.validation('notes', notes);
    })
  }


  handleCoDriver(coDriver) {
    this.setState({coDriver}, () =>{
      this.validation('coDriver', coDriver)
    })
  }

  handleDistance(distance) {
    this.setState({distance}, () => {
      this.validation('distance', distance)
    })
  }

  validation(fieldName, value) {
    switch (fieldName) {
      case 'vehicle':
        if (value.length > 0 && value.length <= 40) {
          this.setState({vehicleValid: true})
        }
        break;
      case 'trailer':
        if (value.length > 0 && value.length <= 40) {
          this.setState({trailerValid: true})
        }
        break;
      case 'distance':
        if (value.length > 0) {
          this.setState({distanceValid: true})
        }
        break;
      case 'shippingDocuments':
        if (value.length > 0) {
          this.setState({shippingDocumentsValid: true})
        }
        break;
      case 'documents':
        if (value.length > 0) {
          this.setState({documentValid: true})
        }
        break;
      case 'startingLoc':
        if (value.length > 0 && value.length <=200) {
          this.setState({startingLocValid: true})
        }
        break;
      case 'endingLoc':
        if (value.length > 0 && value.length <=200) {
          this.setState({endingLocValid: true})
        }
        break;
      case 'notes':
        if (value.length > 0 && value.length <=200) {
          this.setState({notesValid: true})
        }
        break;
      case 'coDriver':
        if (value.length > 0 && value.length <=40) {
          this.setState({coDriverValid: true})
        }
        break;
      default:

    }
  }

  download(link) {
    if (link) {
      Linking.canOpenURL(link)
        .then((supported) =>{
          if (supported) {
            Linking.openURL(link);
          }
        })
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params, 'prams..................................');
    if (this.props.navigation.state.params.signed) {
      this.setState({signature:this.props.auth.user.driver.signature});
    }
    if (this.props.navigation.state.params.reviewLogs && this.props.navigation.state.params.reviewLogs._id) {
      AsyncStorage.getItem('@Axle:token')
        .then((token) =>{
          HTTP('get', `/driver/getReview?id=${this.props.navigation.state.params.reviewLogs._id}`, {}, {authorization: "Bearer "+token})
          .then((result) => {
            console.log(result, 'this is result.............');
            const {
              coDriver,
              distance,
              endingLoc,
              notes,
              shippingDocuments,
              startingLoc,
              trailer,
              vehicle,
              _id,
              documents,
              signature
            } = result.data.data;
            const values = {
              coDriver,
              distance: distance.toString(),
              endingLoc,
              notes,
              shippingDocuments,
              documents,
              startingLoc,
              trailer,
              vehicle,
              _id,
              signature
            }
            Object.keys(values).forEach((key) => {
              console.log(values[key],'values key................');
              if (!values[key] || (values[key] == "undefined")) {
                delete values[key];
              } else {
                this.setState({[key]: values[key]}, () => {
                  this.validation(key,values[key]);
                })
              }
            })
            // this.setState({coDriver, distance: distance.toString(), endingLoc, notes, shippingDocuments,startingLoc, trailer, vehicle, _id, documents});
            // Object.keys(values).map((value, key) =>{
            //   this.validation(value, values[value]);
            // })
          })
          .catch((error) =>{
          })
        })
    }

  }

  submit() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    this.setState({submitting: true})
    const newFormData = new FormData();
    const {
      vehicle,
      distance,
      shippingDocuments,
      trailer,
      notes,
      startingLoc,
      coDriver,
      endingLoc,
      documents,
      // signature
    } = this.state;
    const dataForSubmit = {
      vehicle,
      distance,
      shippingDocuments,
      trailer,
      notes,
      startingLoc,
      coDriver,
      endingLoc,
      documents,
      // signature
    }
    Object.keys(dataForSubmit).forEach((key) => {
      if (!dataForSubmit[key]) {
        delete dataForSubmit[key];
      }
      newFormData.append(key,dataForSubmit[key]);
    })
    if (this.props.navigation.state.params.day) {
      newFormData.append('day', this.props.navigation.state.params.day);
    }
    if (this.state._id) {
      newFormData.append('id', this.state._id);
    }
    // newFormData.append('signature', this.props.auth.user.driver.signature);
    AsyncStorage.getItem('@Axle:token')
      .then((token) =>{
        HTTP('post', '/driver/addReview', newFormData, {authorization: "Bearer "+token})
        .then((result) => {
          console.log(result,'after submit response');
          if(result.data.error){
            showToast(result.data.message);

          }else {
            if (this.state._id) {
              showToast('Successfully updated');
              navigate('ActivityLog', {day:state.params.day})
            } else {
              showToast('Successfully added');
              navigate('ActivityLog', {day:state.params.day})

            }
          }

          this.setState({submitting: false})
        })
        .catch((error) =>{
          this.setState({submitting: false})
        })
      })

  }

  trailerDataChange(e) {
    const trailerValue = e.nativeEvent.text;
    this.setState({trailer: trailerValue},
      () => {
        this.validation('trailer', trailerValue);
      });

    const trailerDataDuplicate = this.state.trailerData.filter((trailer) => {
      return trailer.toLowerCase().indexOf(trailerValue.toLowerCase()) != -1
    });
    this.setState({trailerDataDuplicate})
  }

  uploadDocument() {
    Uploader()
      .then((response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
              // this.setState({[`${type}Scanner`]: true});
          }
          else {

            // this.setState({ shippingDocuments: response.data});
            let documentData = new FormData();
            documentData.append('proofOfDelivery', `data:image/jpeg;base64,${response.data}`)
            documentData.append('shipmentId', new Date().getTime().toString());
            this.setState({uploading: true});
            fileUploader(documentData, documentData._boundary)
              .then((result) => {
                this.setState({documents: result.data.data.url}, () => {
                  this.validation('documents', result.data.data.url)
                });
              })
              .finally(() => {
                this.setState({uploading: false});
                // this.setState({[`${type}Uploading`]: false});
              })
            // let coidata = {
            //   uri: response.uri,
            //   type: 'image/jpeg',
            //   name: response.uri.split('/')[response.uri.split('/').length - 1]
            // }
            // self.setState({coi: coidata, coiValid : true});
            // this.UploadBase64(type, response.data);
          }
      });
  }

  handleShippingDocument(shippingDocuments) {
    this.setState({shippingDocuments},
      () => {
        this.validation('shippingDocuments', shippingDocuments)
      }
    )
  }

  handleVehicle(vehicle) {
    this.setState({vehicle},
      () => {
        this.validation('vehicle', vehicle)
      }
    )
  }

  selectTrailer(trailer) {
    this.setState({trailer, trailerDataDuplicate: []})
  }

  // componentDidMount() {
  //   HTTP('get', '/getAllTruckType', {})
  //     .then((data) => {
  //       const trailerData = data.data.data.data;
  //       this.setState({trailerData});
  //     })
  // }
  resetSign() {
         this.refs["sign"].resetImage();
     }

  render() {
    const { navigate, goBack, state,dispatch } = this.props.navigation;

    return(
      <View style={commonStyle.container}>
            <View style={[{backgroundColor:common.whiteColor, height: 70 , flexDirection:'row'}]}>
              <TouchableHighlight onPress={() =>{goBack()} } underlayColor="transparent" style={[{flex:0.2,width:60,alignItems:'center',justifyContent:'center'}]}>
                <Image
                  source={images.Back_Arrow}
                />
              </TouchableHighlight>
              <View style={[{backgroundColor:common.whiteColor,height: 50,marginTop :10, justifyContent:'center',flex:0.6}]}>
              <Text style={{color: common.greenColor,fontSize: 10, fontWeight: '500'}}>{moment(state.params.day).tz('UTC').format('ll')}</Text>
                <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Review Log</Text>
              </View>
                <TouchableHighlight onPress={() => {this.submit()}} underlayColor='transparent' style={[{width:60,flex:0.2,alignItems:'center',justifyContent:'center'}]}>
                  <View style={{flexDirection:'row'}}>{this.state.submitting ? <ActivityIndicator/>: null}<Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>SAVE</Text></View>
                </TouchableHighlight>
            </View>
            <View style={{height:2, backgroundColor:'gray'}}></View>
            <ScrollView>
            <View style={s.ModalContainer, {marginHorizontal:20,marginTop:20}}>
            <View style={{marginTop:10}}>
              <Text style={{color:'gray',marginBottom:5}}>DRIVER</Text>
              <Text style={{color:'black',marginBottom:10,fontSize: 18, fontWeight: '500'}}>{this.props.auth.user.name} {this.props.auth.user.lastName?this.props.auth.user.lastName:''}</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Vehicle</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.vehicle}
                style={s.txtInutStyle}
                name="vehicle"
                onChangeText={(vehicle) => this.handleVehicle(vehicle)}
                />
                {
                  this.state.vehicle != '' && this.state.vehicleValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
                </View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Trailer</Text>
              <View style={s.textInputParent}>
                <TextInput
                  underlineColorAndroid = "transparent"
                  value={this.state.trailer}
                  style={s.txtInutStyle}
                  onChange={this.trailerDataChange}
                  />
                  {
                    this.state.trailer != '' && this.state.trailerValid == true
                   ?<Image
                         style={[{marginTop:15}]}
                         source={images.Check_Small}
                       />
                    : null
                  }
              </View>
              <View>
              {this.state.trailerDataDuplicate.length> 0 && this.state.trailerData.map((trailer, key) =>{
                return (
                  <TouchableOpacity  style={s.dropDown} key={key} onPress={() => this.selectTrailer(trailer)}>
                    <Text style={{paddingLeft:10}}>{trailer}</Text>
                  </TouchableOpacity>
                )
              })
              }
              </View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Distance</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.distance}
                style={s.txtInutStyle}
                keyboardType="numeric"
                onChangeText={(distance) => this.handleDistance(distance)}
                />
                {
                  this.state.distance != '' && this.state.distanceValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
              </View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Shipping Documents</Text>
              <View style={s.textInputParent}>
                    <View style={{flex:1, flexDirection: 'row'}}>
                    <TextInput
                      underlineColorAndroid = "transparent"
                      value={this.state.shippingDocuments}
                      style={s.txtInutStyle}
                      onChangeText={(shippingDocuments) => this.handleShippingDocument(shippingDocuments)}
                      />
                      {
                        this.state.shippingDocuments != '' && this.state.shippingDocumentsValid == true
                       ?<Image
                             style={[{marginTop:15}]}
                             source={images.Check_Small}
                           />
                        : null
                      }
                    {/*{this.state.uploading ?
                      <ActivityIndicator/>: null
                    }
                        {
                          this.state.shippingDocuments != '' && this.state.shippingDocumentsValid == true
                         ?<Image
                               style={[{marginTop:15, position : 'absolute', right : 8}]}
                               source={images.Check_Small}
                             />
                          :   <Image
                                  style={[{position : 'absolute', right : 38, marginTop:15}]}
                                  source={images.Upload}
                                />
                        }*/}
                    </View>

              </View>

            </View>
            </View>
            <View style={s.ModalContainer, {marginTop:20, backgroundColor:'lightgray', padding:15}}>
            <Text style={{color:'black', fontSize:20, fontWeight:'500'}}>Attached Documents</Text>
            </View>
            <View style={s.ModalContainer, {marginTop:10, padding:15, flexDirection:'row'}}>
            <TouchableOpacity style={{flex:10,  flexDirection:'row',alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'lightgray', borderRadius:5, padding:15}} onPress={() => this.uploadDocument()} >
            <Icon name="paperclip" size={20} style={{color:this.state.documents ? common.greenColor: 'black'}} />
            <Text style={{color:this.state.documents ? common.greenColor: 'black', fontSize:20}}> Attached Document</Text>
            {this.state.uploading ?
              <ActivityIndicator/>: null
            }
            </TouchableOpacity>
            {
              this.state.documents != '' && this.state.documentValid == true
             ?<TouchableOpacity style={{alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'lightgray', borderRadius:5, padding:15}} onPress={() => this.download(this.state.documents)} >
               <Icon name="eye"/>
             </TouchableOpacity>
              :  null
            }
            </View>
            <View style={s.ModalContainer, {marginTop:10, backgroundColor:'lightgray', padding:15}}>
            <Text style={{color:'black', fontSize:20, fontWeight:'500'}}>Operational Info</Text>
            </View>
            <View style={s.ModalContainer, {marginHorizontal:20,marginTop:20}}>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Co-Drivers</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.coDriver}
                style={s.txtInutStyle}
                onChangeText={(coDriver) => this.handleCoDriver(coDriver)}
                />
                {
                  this.state.coDriver != '' && this.state.coDriverValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
              </View>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Starting Location</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.startingLoc}
                style={s.txtInutStyle}
                onChangeText={(startingLoc) => {this.handleStartingLocation(startingLoc); this.searchLocation(startingLoc, "startingLoc")}}
                />
                {
                  this.state.startingLoc != '' && this.state.startingLocValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
              </View>
              {this.state.suggestions1 &&
                <View>
                  {this.state.suggestions1.map((address, key) => {
                    return (
                      <SuggestLocation address={address} key={key} pick={this.selectedLocation} type={"startingLoc"}/>
                    )
                  })}
                </View>

              }
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Ending Location</Text>
              <View style={s.textInputParent}>
              <TextInput
                underlineColorAndroid = "transparent"
                value={this.state.endingLoc}
                style={s.txtInutStyle}
                onChangeText={(endingLoc) => {this.handleEndingLocation(endingLoc);this.searchLocation(endingLoc, "endingLoc")}}
                />
                {
                  this.state.endingLoc != '' && this.state.endingLocValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
              </View>
              {this.state.suggestions2 &&
                <View>
                  {this.state.suggestions2.map((address, key) => {
                    return (
                      <SuggestLocation address={address} key={key} pick={this.selectedLocation} type={"endingLoc"}/>
                    )
                  })}
                </View>

              }
            </View>
            <View style={{marginTop:10}}>
              <Text style={{color:'black',marginBottom:10}}>Notes</Text>
              <View style={s.textInputParent}>
              <TextInput
              placeholder={'Enter Note'}
              multiline={true}
              numberOfLines={6}
                onChangeText={(notes) => {this.setState({notes})}}
                underlineColorAndroid = "transparent"
                value={this.state.notes}
                style={s.txtInutStyle}
                />
                {
                  this.state.notes != '' && this.state.notesValid == true
                 ?<Image
                       style={[{marginTop:15}]}
                       source={images.Check_Small}
                     />
                  : null
                }
              </View>
            </View>
            </View>
            <View style={s.ModalContainer, {marginTop:10, backgroundColor:'lightgray', padding:15}}>
            <Text style={{color:'black', fontSize:20, fontWeight:'500'}}>Carrier Info</Text>
            </View>
              <View style={s.ModalContainer, {marginHorizontal:25}}>
                <View style={{marginTop:10}}>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>CARRIER NAME</Text>
                  <Text style={{fontSize:15}}>{this.props.auth.user.driver.company_name}</Text>
                </View>
                <View style={{marginTop:10}}>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>CARRIER PHONE</Text>
                  <Text style={{fontSize:15}}>{this.props.auth.user.driver.mobile}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:10, justifyContent:'space-between'}}>
                <View>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>ADDRESS</Text>
                  <Text style={{fontSize:15}}>{state.params.carrierInfo? state.params.carrierInfo.defaultAddressId.company_address: 'N/A'}</Text>
                  </View>
                  {/*<View>
                    <Text style={{fontSize:15, fontWeight:'bold'}}>STATE</Text>
                    <Text style={{fontSize:15, }}>{this.props.auth.user.driver.state ? this.props.auth.user.driver.state: 'N/A'}</Text>
                    </View>*/}
                </View>
                {/*<View style={{marginTop:10}}>
                  <Text style={{fontSize:15, fontWeight:'bold'}}>ZIP</Text>
                  <Text style={{fontSize:15}}>{this.props.auth.user.driver.zip ? this.props.auth.user.driver.zip: 'N/A'}</Text>
                </View>*/}
              </View>

              {/*this.state.signature ?
                <View style={{marginTop:10, marginHorizontal: 20,flex:1}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Your signature</Text>
                    <Image source={{uri: this.state.signature}} style={{width:window.width, height:200}}/>
                    <TouchableHighlight onPress={() => {navigate('SignLog', {from: 'review', reviewLogs: state.params.reviewLogs,day:state.params.day,reviewLogId:this.state._id})}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:50}]}>
                      <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Change</Text>
                      </View>
                    </TouchableHighlight>

                </View>:
                <View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
                  <TouchableHighlight onPress={() => {navigate('SignLog', {from: 'review', reviewLogs: state.params.reviewLogs})}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:50}]}>
                    <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                      <Text style={{fontSize:18,fontWeight:'bold'}}>ADD SIGNATURE</Text>
                    </View>
                  </TouchableHighlight>
              </View>
          */  }


              {/*<View style={s.ModalContainer,{marginHorizontal:25, borderColor: 'lightgray', borderWidth: 1, borderRadius:10, marginTop:10, padding:10}}>
              <Text>Signature</Text>
              <SignatureCapture
                    style={{flex: 1,  height:200}}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
            </View>*/}
            {/*<View style={{backgroundColor:common.whiteColor,alignItems:'center'}}>
            <TouchableHighlight onPress={() => {this.resetSign()}} underlayColor={common.tuchableUnderlayGreenColor} style={[{marginTop:30,width:window.width-50,marginBottom:50}]}>
              <View style={{borderWidth:1,height:50,alignItems:'center',justifyContent:'center',borderColor:'#d5dde0',borderRadius:10}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Clear Signture</Text>
              </View>
            </TouchableHighlight>
          </View>*/}
            </ScrollView>
          </View>

    )

}
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },
  ModalContainer: {
   flex:1,
  backgroundColor: common.whiteColor,
 },
  Header: {
    height: getSize(80),
    backgroundColor: '#000000',
  },
  HeaderContent: {
    flexDirection: 'row',
    // marginHorizontal: getSize(20)
  },
  HeaderTextContainer: {
    // marginTop: getSize(20),
    flex:0.5,
  },
  HeaderText: {
    fontSize: getSize(16),
    color: 'white'
  },
  SubHeaderText:{
    fontSize: getSize(20),
    color: common.greenColor,
    fontWeight:'bold',
    fontFamily:'ProximaNova-Bold'
  },
  connectStatus:{
    alignItems:'flex-end'
  },

  Content: {
    flex:1
  },
  fontOswaldRegular:{
    fontFamily:'Oswald-Regular',
    fontWeight:'600'
  },
  textInputParent : {
   borderWidth: 1,
   borderColor: common.grayColor,
   flexDirection : 'row',
 },
  txtInutStyle : {
    height: 40,
    paddingHorizontal:6.2,
    width : window.width - 65,
    color:common.blackColor
    },
    indicatorVal:{
      color:common.whiteColor,
      fontWeight:'bold'
    },
    indicator:{
      height:5,
      backgroundColor:'red'
    },
    indicatorText:{
      color:common.whiteColor,
      fontSize:10
    },
    activityLogIndicatorLine:{
      height:5,

    }
    ,
    dropDown: {
      flex:1,
      height: 40,
      flexDirection:'row',
      alignItems: 'center',
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor:common.grayColor
    }

})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
        activityLog:state.activityReducer,

    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails,
            getActivityLogs
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewLog);
