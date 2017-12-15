import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  Picker,
  TouchableOpacity, ActivityIndicator, Modal
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner';

import { getSize} from './../../layouts/common/RatioCalculator/ratio';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Uploader, fileUploader } from '../../utils/Uploader';
import { getState } from '../../utils/utility';

let window = Dimensions.get("window");
const state = getState();

import Hr from 'react-native-hr';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import images from './../../config/images.js';
import styles from './styles.js';
import Header from './../../layouts/common/Header/Header.js';
import Validation from './Validation';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { updateUser } from './actionCreator';
import { getAllTruckTypes } from './../register/actionCreator';



class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstNameInvalid: false,
      lastName: '',
      lastNameInvalid: false,
      email: '',
      emailInvalid:false,
      newMobile: '',
      phoneInvalid:false,

      coi: undefined,
      coiScanner: false,
      coiDocument:null,
      coiUploading: false,
      coiValid: false,
      w9:undefined,
      w9Uploading: false,
      w9Document:null,
      pickup_p: '',
      pickup_suggestion: [],
      pickup_prefferred: [],
      delivery_p: '',
      delivery_suggestion: [],
      delivery_prefferred: [],
      w9Valid: false,
      atoc: undefined,
      atocScanner: false,
      atocDocument:null,
      atocUploading: false,
      atocValid: false,
      coiPlaceholder : 'Certificate of insurance',
      w9Placeholder : 'W9',
      w9Scanner: false,
      atocPlceholder : 'Authority to Operate CDL',
      truckType: [],
      isDropOpen: false,
      isLoading: false,
      pickupSuggestionOpen: false,
      deliverySuggestionOpen: false,
      timezoneVisible:false,
      timezone:[{text:'Eastern Time (US & Canada)' ,value:'America/New_York'},
      {text:'Indiana (East)' ,value:'America/Indiana/Indianapolis'},
      {text:'Central Time (US & Canada)' ,value:'America/Chicago'},
      {text:'Saskatchewan' ,value:'America/Regina'},
      {text:'Mountain Time (US & Canada)' ,value:'America/Denver'},
      {text:'Arizona' ,value:'America/Phoenix'},
      {text:'Pacific Time (US & Canada)' ,value:'America/Los_Angeles'},
      {text:'Alaska' ,value:'America/Juneau'},
      {text:'Atlantic Time (Canada)' ,value:'America/Halifax'}
    ],
    selectedTimeZone:undefined
    }
    this.emailCheck = this.emailCheck.bind(this);
    this.firstNameCheck = this.firstNameCheck.bind(this);
    this.lastNameCheck = this.lastNameCheck.bind(this);
    this.phoneCheck = this.phoneCheck.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.newMobileNumberTextInput = this.newMobileNumberTextInput.bind(this);
    this.update = this.update.bind(this);
    this.chooseTrailer = this.chooseTrailer.bind(this);
    // this.searchLocation = this.searchLocation.bind(this);
    this.pickupPrefferedLocation = this.pickupPrefferedLocation.bind(this);
    this.selectPrefferred = this.selectPrefferred.bind(this);
    this.removeSuggestion = this.removeSuggestion.bind(this);
    this.UploadDoc = this.UploadDoc.bind(this);
    this.UploadBase64 = this.UploadBase64.bind(this);
    this.chooseTimezone = this.chooseTimezone.bind(this);

  }

  update() {

    const  {
      email,
      newMobile,
      lastName,
      name,
      MCNumber,
      company_name,
      truckType,
      pickup_prefferred,
      delivery_prefferred
    } = this.state;

    const newMob = this.state.newMobile.replace(/^\d+|[\W_]+/g, '');
    let updateFields={};
    updateFields['name']=name;
    updateFields['lastName']=lastName;


    if(this.props.user.email !=email)
    updateFields['email']=email;
    if(this.props.user.driver.mobile !=newMobile)
    updateFields['newMobile']=newMobile;

    if(this.props.user.driver.MCNumber !=MCNumber)
    updateFields['MCNumber']=MCNumber;
    if(this.props.user.driver.company_name !=company_name)
    updateFields['company_name']=company_name;
    if(this.props.user.driver.truckType !=truckType)
    updateFields['truckType']=truckType;
    if (pickup_prefferred.length > 0) {
      updateFields['pickup_prefferred']=pickup_prefferred;
    }
    if (delivery_prefferred.length > 0) {
      updateFields['delivery_prefferred']=delivery_prefferred;
    }
    if(this.state.coi){
      updateFields['certificateOfInsurance']=this.state.coi;
    }
    if(this.state.atoc){
      updateFields['authorityLetter']=this.state.atoc;
    }
    if(this.state.w9){
      updateFields['w9']=this.state.w9;
    }
    if(this.state.selectedTimeZone){
      updateFields['homeTerminalTimezone']=this.state.selectedTimeZone.value
    }


    this.props.actions.updateUser(updateFields);
  }

  newMobileNumberTextInput(value){
    if (value.length < 16) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
        value = value.replace(/(\d{4})(\d)/, "$1 - $2");
    }
    else if (value.length == 16) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
        value = value.replace(/(\d{3})(\d)/, "$1 - $2");
    }
    else {
        value = value.substring(0, value.length - 1);
    }
    this.setState({ newMobile : value })
  }


  onChangeText(input_name) {
    // if (Validation.format())
  }
  chooseTimezone(timezone) {
    this.setState({ selectedTimeZone:timezone,isTimeZoneDropOpen:false });
  }
  emailCheck(email) {
    this.setState({email});
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      this.setState({emailInvalid: false})
    } else {
      this.setState({emailInvalid: true});
    }
  }

  firstNameCheck(name) {
    this.setState({name});
    if (!name) {
      this.setState({firstNameInvalid: true})
    } else {
      this.setState({firstNameInvalid: false})
    }
  }

  lastNameCheck(lastName) {
    this.setState({lastName});
    if (!lastName) {
      this.setState({lastNameInvalid: true})
    } else {
      this.setState({lastNameInvalid: false})
    }
  }

  phoneCheck(phone) {
    this.setState({phone});
    if (!phone) {
      this.setState({phoneInvalid: true})
    } else {
      this.setState({phoneInvalid: false})
    }
  }

  onTextChange() {
    console.log(this.refs.email._lastNativeText);
  }
  checkRole(){
    let status=this.props.user.driver.carrier?'Driver':'Owner/Operator';
    return status;
  }
  chooseTrailer(type) {
    this.setState({truckType: [type], isDropOpen: false});
  }
  removeSuggestion(key, type) {
    if (type === 'pickup') {
      const pickup_prefferred = [...this.state.pickup_prefferred];
      pickup_prefferred.splice(key, 1);
      this.setState({pickup_prefferred});
    } else {
      const delivery_prefferred = [...this.state.delivery_prefferred];
      delivery_prefferred.splice(key, 1);
      this.setState({delivery_prefferred});
    }
  }

  selectPrefferred(city,key,type) {
    if (type == 'pickup') {
      const pickup_prefferred = [...this.state.pickup_prefferred,city];
      const pickup_suggestion = [...this.state.pickup_suggestion];
      pickup_suggestion.splice(key, 1);
      this.setState({pickup_prefferred, pickup_suggestion});
    } else {
      const delivery_prefferred = [...this.state.delivery_prefferred,city];
      const delivery_suggestion = [...this.state.delivery_suggestion];
      delivery_suggestion.splice(key, 1);
      this.setState({delivery_prefferred, delivery_suggestion});
    }
  }

  pickupPrefferedLocation(content, type) {
    // if (type === 'pickup') {
    //   this.setState({pickup_p: content})
    //   const pickup_suggestion = state.filter((p) => {
    //     return p.abbreviation.toLowerCase().indexOf(content.toLowerCase()) != -1;
    //   });
    //   this.setState({pickup_suggestion})
    // } else {
    //   this.setState({delivery_p: content})
    //   const delivery_suggestion = state.filter((p) => {
    //     return p.abbreviation.toLowerCase().indexOf(content.toLowerCase()) != -1;
    //   })
    //   this.setState({delivery_suggestion})
    // }
  }
  UploadBase64(type, data) {

    this.setState({[`${type}Uploading`]: true})
    let w9FormData = new FormData();
    w9FormData.append('proofOfDelivery', `data:image/jpeg;base64,${data}`)
    console.log('i am here.............');
    w9FormData.append('shipmentId', new Date().getTime().toString());
    fileUploader(w9FormData, w9FormData._boundary)
      .then((result) => {

        this.setState({[type]: result.data.data.url, [`${type}Valid`] : true});
        console.log('this is result.....', result.data);
      })
      .finally(() => {
        this.setState({[`${type}Uploading`]: false});
      })
  }

  UploadDoc(type){
    // let result = DocumentPicker.getDocumentAsync({},(err,res) =>{

    // });
    // let result = await ImagePicker.launchImageLibraryAsync();
    // if (!result.cancelled){
    //   let w9data = {
    //     uri: result.uri,
    //     type: 'image/jpeg',
    //     name: result.uri.split('/')[result.uri.split('/').length - 1]
    //   }
    //   this.setState({w9: w9data});
    // }
    // this.setState({w9Valid : true})
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
              this.setState({[`${type}Scanner`]: true});
          }
          else {
            // let coidata = {
            //   uri: response.uri,
            //   type: 'image/jpeg',
            //   name: response.uri.split('/')[response.uri.split('/').length - 1]
            // }
            // self.setState({coi: coidata, coiValid : true});
            // debugger
            this.UploadBase64(type, response.data);
          }

          // let w9data = {
          //   uri: response.uri,
          //   type: 'image/jpeg',
          //   name: response.uri.split('/')[response.uri.split('/').length - 1]
          // }
          // this.setState({w9: w9data, w9Valid : true});
      });
  }
  componentDidMount() {
    let self=this;
    this.props.actions.getAllTruckTypes();

    const newMobile = this.props.user.driver.mobile;
    const email = this.props.user.email;
    const name = this.props.user.name;
    const lastName = this.props.user.lastName;
    const MCNumber = this.props.user.driver.MCNumber;
    const company_name = this.props.user.driver.company_name;
    const truckType = this.props.user.driver.truckType;
    const pickup_prefferred = this.props.user.driver.pickup_prefferred;
    const delivery_prefferred = this.props.user.driver.delivery_prefferred;
    let selectedTimeZone;
    if(this.props.user.driver.homeTerminalTimezone){
    let getTimeZoneObj=  this.state.timezone.filter((d,k)=>{
        return d.value==self.props.user.driver.homeTerminalTimezone
      });
      if(getTimeZoneObj && getTimeZoneObj.length>0){
        selectedTimeZone=getTimeZoneObj[0];
      }
    }
    this.setState({pickup_suggestion: [...state], delivery_suggestion: [...state]});

    this.setState({newMobile, email, name, lastName,MCNumber,company_name,truckType,pickup_prefferred,delivery_prefferred,selectedTimeZone});
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { coi, coiValid, w9, w9Valid, atoc, atocValid, coiPlaceholder, w9Placeholder, atocPlceholder, pickup_p, delivery_p } = this.state;
    return (

      <View style={commonStyle.container}>

        <View style={[{backgroundColor:common.blackColor,flexDirection:'row'}]}>
          <TouchableHighlight onPress={() => navigate('Shipments')} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :20},commonStyle.contentCenter]}>
            <Image
              style={{}}
              source={images.Arrow_White_Left}
            />
          </TouchableHighlight>
          <View style={{justifyContent:'center',marginTop:20}}>
            <Text style={{color:common.whiteColor,fontSize: 20, fontWeight: '500'}}>Profile</Text>
          </View>

        </View>
        <ScrollView>
        <View style={styles.Content}>
          <View style={styles.ProfileContainer}>
            <View style={styles.Avatar}>
              <Image source={images.Pic_Empty} style={styles.avatar}/>
            </View>
            <View style={styles.ProfileInfo}>
              <Text style={styles.ProfileName}>{`${this.state.name}`}</Text>
              <Text style={styles.ProfileDesignation}>{this.checkRole()}</Text>
            </View>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.ProfileDetails}>
            <View style={styles.FormBlock}>
              <Text style={styles.Label}>FIRST NAME</Text>
                <TextInput underlineColorAndroid = "transparent" style={styles.Input} autoCorrect={false} value={this.state.name} autoCapitalize="none" onChangeText={(name) => this.firstNameCheck(name)}/>
                {this.state.firstNameInvalid &&
                  <Text style={{fontSize:10, color: 'red'}}>Enter your first name</Text>
                }
            </View>
            <View style={styles.FormBlock}>
              <Text style={styles.Label}>LAST NAME</Text>
                <TextInput style={styles.Input} underlineColorAndroid = "transparent" autoCorrect={false} value={this.state.lastName}  autoCapitalize="none" onChangeText={(lastName) => this.lastNameCheck(lastName)}/>
                {this.state.lastNameInvalid &&
                  <Text style={{fontSize:10, color: 'red'}}>Enter your last name</Text>
                }
            </View>
            <View style={styles.FormBlock}>
              <Text style={styles.Label} >EMAIL ADDRESS</Text>
                <TextInput style={styles.Input} underlineColorAndroid = "transparent" autoCorrect={false} value={this.state.email}  autoCapitalize="none" onChangeText={(email) => this.emailCheck(email)}/>
                {this.state.emailInvalid &&
                  <Text style={{fontSize:10, color: 'red'}}>Enter valid email address</Text>
                }
            </View>
            <View style={styles.FormBlock}>
              <Text style={styles.Label}>PHONE</Text>
                  <TextInput style={styles.Input} underlineColorAndroid = "transparent" value={this.state.newMobile}  onChangeText={(newMobile) => this.newMobileNumberTextInput(newMobile)}  underlineColorAndroid = "transparent"
                  keyboardType = 'numeric'
                  maxLength = {16}/>
                  {this.state.phoneInvalid &&
                    <Text style={{fontSize:10, color: 'red'}}>Enter valid phone number</Text>
                  }
            </View>
            <View style={styles.FormBlock}>
              <Text style={styles.Label}>COMPANY</Text>
                  <TextInput style={styles.Input} underlineColorAndroid = "transparent" value={this.state.company_name}  onChangeText={(company_name) => this.setState({company_name:company_name})}  underlineColorAndroid = "transparent"
                  />
                  {this.state.company_name=='' &&
                    <Text style={{fontSize:10, color: 'red'}}>Enter valid Company Name</Text>
                  }
            </View>

            <View style={commonStyle.paddingBottom_16}>
              <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>Time Zone</Text>
              <View style={styles.textInputParent}>
                <TouchableOpacity style={{flex:1,height: 40, flexDirection:'row', alignItems: 'center', marginHorizontal: 10}} onPress={() => this.setState({isTimeZoneDropOpen: !this.state.isTimeZoneDropOpen})}>
                  <View style={{flex:7}}><Text>{this.state.selectedTimeZone ? this.state.selectedTimeZone.text : 'Select Home Terminal Timezone'}</Text></View>
                  <View ><Icon name="chevron-down"/></View>
                </TouchableOpacity>
              </View>
              {this.state.isTimeZoneDropOpen &&
                <View style={[{flex:1, borderWidth: 1, borderColor: common.grayColor}]}>
                    {this.state.timezone.map((timezone,  key) => {
                      return (
                        <TouchableOpacity style={{flex:1, borderBottomWidth: 1, borderBottomColor: common.grayColor, height: 40, justifyContent: 'center'}} key={key} onPress={() => this.chooseTimezone(timezone)}><Text style={{marginHorizontal: 10}}>{timezone.text}</Text></TouchableOpacity>
                      )
                    })}
                </View>
              }
            </View>
            {(this.props.user.driver.carrier===null ||this.props.user.driver.carrier===undefined) ?
              <View>
                <View style={styles.FormBlock}>
                  <Text style={styles.Label}>MCNumber</Text>
                      <TextInput style={styles.Input} underlineColorAndroid = "transparent" value={this.state.MCNumber}  onChangeText={(MCNumber) => this.setState({MCNumber:MCNumber})}  underlineColorAndroid = "transparent"
                      />
                      {this.state.MCNumber=='' &&
                        <Text style={{fontSize:10, color: 'red'}}>Enter valid MCNumber</Text>
                      }
                </View>
                <View style={commonStyle.paddingBottom_16}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>Trailer Type</Text>
                  <View style={styles.textInputParent}>
                    <TouchableOpacity style={{flex:1,height: 40, flexDirection:'row', alignItems: 'center', marginHorizontal: 10}} onPress={() => this.setState({isDropOpen: !this.state.isDropOpen})}>
                      <View style={{flex:7}}><Text>{this.state.truckType.length ? this.state.truckType[0] : 'Select trailer type'}</Text></View>
                      <View ><Icon name="chevron-down"/></View>
                    </TouchableOpacity>
                  </View>
                  {this.state.isDropOpen &&
                    <View style={[{flex:1, borderWidth: 1, borderColor: common.grayColor}]}>
                        {this.props.data.truckType.map((truck,  key) => {
                          return (
                            <TouchableOpacity style={{flex:1, borderBottomWidth: 1, borderBottomColor: common.grayColor, height: 40, justifyContent: 'center'}} key={key} onPress={() => this.chooseTrailer(truck.name)}><Text style={{marginHorizontal: 10}}>{truck.name}</Text></TouchableOpacity>
                          )
                        })}
                    </View>
                  }
                </View>
                <View style={commonStyle.paddingBottom_16}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>Preffered pickup location</Text>
                  <View style={{justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', marginTop:4, marginBottom:4}}>
                  {this.state.pickup_prefferred.map((p, k) => {
                    return (
                      <View key={k}  style={{height: 30, borderWidth:1, borderColor: common.grayColor, marginRight:10,marginTop: 4, justifyContent: 'center'}}>
                        <View style={{flex:1, alignItems: 'center', flexDirection:'row'}}>
                          <Text style={{paddingHorizontal: 10}}>{p.abbreviation}</Text>
                          <TouchableOpacity onPress={() => this.removeSuggestion(k, 'pickup')}><Text style={{paddingRight:10}}>X</Text></TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}
                  </View>
                  <View style={styles.textInputParent}>
                      <TouchableOpacity onPress={() => this.setState({pickupSuggestionOpen: !this.state.pickupSuggestionOpen})} style={styles.txtInutStyle}>
                        <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>Select Favorite States to Pick From</Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.pickupSuggestionOpen ?
                      <View style={[{ justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', marginTop:4}]}>
                      {this.state.pickup_suggestion.map((s, k) => {
                        return(
                          <TouchableOpacity style={{height: 30, borderWidth:1, borderColor: common.grayColor, marginRight:10,marginTop: 4, width:40}} key={k} onPress={() => this.selectPrefferred(s,k, 'pickup')}>
                              <Text style={{textAlign:'center', paddingTop: 5}}>{s.abbreviation}</Text>
                          </TouchableOpacity>
                        )
                      })}
                      </View>: null
                    }
                </View>
                <View style={commonStyle.paddingBottom_16}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>Preffered delivery location</Text>
                  <View style={{justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', marginTop:4, marginBottom:4}}>
                  {this.state.delivery_prefferred.map((p, k) => {
                    return (
                      <View key={k}  style={{height: 30, borderWidth:1, borderColor: common.grayColor, marginRight:10,marginTop: 4, justifyContent: 'center'}}>
                        <View style={{flex:1, alignItems: 'center', flexDirection:'row'}}>
                          <Text style={{paddingHorizontal: 10}}>{p.abbreviation}</Text>
                          <TouchableOpacity onPress={() => this.removeSuggestion(k, 'delivery')}><Text style={{paddingRight:10}}>X</Text></TouchableOpacity>
                        </View>
                      </View>
                    )
                  })}
                  </View>
                  <View style={styles.textInputParent}>
                      <TouchableOpacity onPress={() => this.setState({deliverySuggestionOpen: !this.state.deliverySuggestionOpen})} style={styles.txtInutStyle}>
                        <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>Select Favorite State to Deliver To</Text>
                      </TouchableOpacity>
                      {/*<TextInput
                        onChangeText={(delivery_p) => this.pickupPrefferedLocation(delivery_p, 'delivery')}
                        autoCaptalize='none'
                        placeholder="Select Favorite Delivery States"
                        underlineColorAndroid = "transparent"
                        value={delivery_p}
                        style={styles.txtInutStyle}
                        />*/}
                    </View>
                    {this.state.deliverySuggestionOpen ?
                      <View style={[{ justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', marginTop:4}]}>
                      {this.state.delivery_suggestion.map((s, k) => {
                        return(
                          <TouchableOpacity style={{height: 30, borderWidth:1, borderColor: common.grayColor, marginRight:10,marginTop: 4, width:40}} key={k} onPress={() => this.selectPrefferred(s,k, 'delivery')}>
                              <Text style={{textAlign:'center', paddingTop: 5}}>{s.abbreviation}</Text>
                          </TouchableOpacity>
                        )
                      })}
                      </View>: null
                    }
                </View>
                <View style={commonStyle.paddingBottom_24}>
                  <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>UPLOAD</Text>

                  <View style={commonStyle.paddingBottom_20}>
                    <View style={styles.textInputParent}>
                    <TouchableHighlight onPress={() => this.UploadDoc('coi')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                        {this.state.coiUploading && <ActivityIndicator/>}
                             <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                             {coiPlaceholder}
                             </Text>
                         </View>
                    </TouchableHighlight>
                       {/*<TextInput
                         onChangeText={(coi) => this.coiTextInput(coi)}
                         underlineColorAndroid = "transparent"
                         value={coi}
                         style={styles.txtInutStyle2}
                         placeholder = "Certificate of insurance"
                         />*/}
                         {
                          coiValid == true
                          ?<Image
                                style={[styles.marginTop_15,{position : 'absolute',marginTop:15, right : 38}]}
                                source={images.Check_Small}
                              />
                           : null
                         }
                         <Image
                             style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute',marginTop:15, right : 10}]}
                             source={images.Upload}
                           />
                         </View>
                  </View>

                  <View style={commonStyle.paddingBottom_20}>
                  <View style={styles.textInputParent}>
                  <TouchableHighlight onPress={() => this.UploadDoc('w9')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                        {this.state.w9Uploading  && <ActivityIndicator/>}
                        <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                        {w9Placeholder}
                        </Text>

                        </View>
                  </TouchableHighlight>
                     {/*<TextInput
                       onChangeText={(w9) => this.w9TextInput(w9)}
                       underlineColorAndroid = "transparent"
                       value={w9}
                       style={styles.txtInutStyle2}
                        placeholder = "W9"
                       />*/}
                       {
                        w9Valid == true
                        ?<Image
                              style={[styles.marginTop_15,{position : 'absolute', marginTop:15,right : 38}]}
                              source={images.Check_Small}
                            />
                         : null
                       }
                       <Image
                           style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute', marginTop:15,right : 10}]}
                           source={images.Upload}
                         />
                       </View>
                  </View>

                  <View>
                  <View style={styles.textInputParent}>
                  <TouchableHighlight onPress={() => this.UploadDoc('atoc')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                      {this.state.atocUploading && <ActivityIndicator/>}
                           <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                            {atocPlceholder}
                           </Text>
                       </View>
                  </TouchableHighlight>
                     {/*<TextInput
                       onChangeText={(atoc) => this.atocTextInput(atoc)}
                       underlineColorAndroid = "transparent"
                       value={atoc}
                       style={styles.txtInutStyle2}
                         placeholder = "Authority to Operate CDL"
                       />*/}
                       {
                        atocValid == true
                        ?<Image
                              style={[styles.marginTop_15,{position : 'absolute', marginTop:15,right : 38}]}
                              source={images.Check_Small}
                            />
                         : null
                       }
                       <Image
                           style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute',marginTop:15, right : 10}]}
                           source={images.Upload}
                         />
                       </View>

                  </View>
                </View>
              </View>
              :<View></View>
              }

            <View>
              {this.state.coiUploading || this.state.atocUploading || this.state.w9Uploading?
                <View style={styles.disableButtonContainer}>
                  <TouchableHighlight underlayColor={common.tuchableUnderlayGrayColor} style={styles.ButtonFlex} onPress={() => {}}>

                  <View style={{}}>

                      <Text style={styles.ButtonText}>UPLOADING</Text>
                  </View>
                </TouchableHighlight>

                </View>
                :

                <View style={styles.ButtonContainer}>
                  <TouchableHighlight underlayColor={common.tuchableUnderlayGreenColor} style={styles.ButtonFlex} onPress={() => this.update()}>

                  <View style={{}}>

                      <Text style={styles.ButtonText}>UPDATE</Text>
                  </View>
                </TouchableHighlight>

                </View>
              }

            </View>


          </View>
        </View>
        <View style={{flex:1}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.w9Scanner}

            >
            <View style={commonStyle.container}>
                <View style={[commonStyle.headerBarHeight,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
                  <TouchableHighlight onPress={() => this.setState({w9Scanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                    <Image
                      style={{height:15,width:16}}
                      source={images.Close_White}
                    />
                  </TouchableHighlight>
                </View>
              <View style={{flex:1}}>
              {!this.state.w9Document &&
                <DocumentScanner
                    onPictureTaken={data => this.setState({
                      w9Document: data.image
                    })}
                    overlayColor="rgba(255,130,0, 0.7)"
                    enableTorch={true}
                    brightness={0}
                    saturation={1}
                    contrast={1.1}
                    quality={0.5}
                    detectionCountBeforeCapture={5}
                    detectionRefreshRateInMS={50}
                    style={{flex:1}}
                  />
              }
                  {this.state.w9Document &&
                    <Image source={{ uri: `data:image/jpeg;base64,${this.state.w9Document}`}} resizeMode="contain"  style={{flex:1}}/>

                  }
                  {this.state.w9Document &&
                    <View style={styles.ButtonContainer}>
                      <TouchableHighlight style={styles.FirstButtonContainer} onPress={() =>{this.setState({w9Document:undefined}) }}>
                        <Text  style={styles.FirstButtonText}>RETAKE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('w9', this.state.w9Document);this.setState({w9Scanner: false, w9Uploading: true})} }>
                        <Text style={styles.SecondButtonText}>SAVE</Text>
                      </TouchableHighlight>
                    </View>

                  }
              </View>
            </View>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.coiScanner}

            >
            <View style={commonStyle.container}>
                <View style={[commonStyle.headerBarHeight,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
                  <TouchableHighlight onPress={() => this.setState({coiScanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                    <Image
                      style={{height:15,width:16}}
                      source={images.Close_White}
                    />
                  </TouchableHighlight>
                </View>
              <View style={{flex:1}}>
              {!this.state.coiDocument &&
                <DocumentScanner
                    onPictureTaken={data => this.setState({
                      coiDocument: data.image
                    })}
                    overlayColor="rgba(255,130,0, 0.7)"
                    enableTorch={true}
                    brightness={0}
                    saturation={1}
                    contrast={1.1}
                    quality={0.5}
                    detectionCountBeforeCapture={5}
                    detectionRefreshRateInMS={50}
                    style={{flex:1}}
                  />
              }
                  {this.state.coiDocument &&
                    <Image source={{ uri: `data:image/jpeg;base64,${this.state.coiDocument}`}} resizeMode="contain"  style={{flex:1}}/>

                  }
                  {this.state.coiDocument &&
                    <View style={styles.ButtonContainer}>
                      <TouchableHighlight style={styles.FirstButtonContainer} onPress={() =>{this.setState({coiDocument:undefined}) }}>
                        <Text  style={styles.FirstButtonText}>RETAKE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('coi', this.state.coiDocument);this.setState({coiScanner: false, coiUploading: true})} }>
                        <Text style={styles.SecondButtonText}>SAVE</Text>
                      </TouchableHighlight>
                    </View>

                  }
              </View>
            </View>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.atocScanner}

            >
            <View style={commonStyle.container}>
                <View style={[commonStyle.headerBarHeight,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
                  <TouchableHighlight onPress={() => this.setState({atocScanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                    <Image
                      style={{height:15,width:16}}
                      source={images.Close_White}
                    />
                  </TouchableHighlight>
                </View>
              <View style={{flex:1}}>
              {!this.state.atocDocument &&
                <DocumentScanner
                    onPictureTaken={data => this.setState({
                      atocDocument: data.image
                    })}
                    overlayColor="rgba(255,130,0, 0.7)"
                    enableTorch={true}
                    brightness={0}
                    saturation={1}
                    contrast={1.1}
                    quality={0.5}
                    detectionCountBeforeCapture={5}
                    detectionRefreshRateInMS={50}
                    style={{flex:1}}
                  />
              }
                  {this.state.atocDocument &&
                    <Image source={{ uri: `data:image/jpeg;base64,${this.state.atocDocument}`}} resizeMode="contain"  style={{flex:1}}/>

                  }
                  {this.state.atocDocument &&
                    <View style={styles.ButtonContainer}>
                      <TouchableHighlight style={styles.FirstButtonContainer} onPress={() =>{this.setState({atocDocument:undefined}) }}>
                        <Text  style={styles.FirstButtonText}>RETAKE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('atoc', this.state.atocDocument);this.setState({atocScanner: false, atocUploading: true})} }>
                        <Text style={styles.SecondButtonText}>SAVE</Text>
                      </TouchableHighlight>
                    </View>

                  }
              </View>
            </View>
          </Modal>


        </View>
      </ScrollView>
      </View>

    )
  }
};

/* Map state to props */
function mapStateToProps(state){
    return {
        user: state.auth.user,
        data: state.LoginReducer

    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateUser,
            getAllTruckTypes,
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
