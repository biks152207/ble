import React , { Component }from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Picker, ActivityIndicator, Modal} from 'react-native';
import DocumentScanner from 'react-native-document-scanner';
var PushNotification = require('react-native-push-notification');


// import { DocumentPicker, ImagePicker } from 'expo';
import styles from './styles';
import images from './../../config/images.js';
import common from './../../config/common.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import config from './../../config/config';
import { Uploader, fileUploader } from '../../utils/Uploader';
import { getAllTruckTypes } from './actionCreator';
import { getState } from '../../utils/utility';
var PushNotification= require('react-native-push-notification');
var DeviceInfo = require('react-native-device-info');

const state = getState();
/* Actions */
import { signUpRequest } from './../../actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonLoader, ScreenLoader } from '../../components/loader/';

let self;
let window = Dimensions.get("window");

class SignUp extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {
      email: null,
      emailValid: false,
      password: null,
      passwordValid: false,
      company: null,
      companyValid: false,
      name: null,
      nameValid: false,
      phone: null,
      phoneValid: false,
      image: null,
      mc: null,
      mcValid: false,
      coi: {},
      coiScanner: false,
      coiDocument:null,
      coiUploading: false,
      coiValid: false,
      w9:{},
      w9Uploading: false,
      w9Document:null,
      pickup_p: '',
      pickup_suggestion: [],
      pickup_prefferred: [],
      delivery_p: '',
      delivery_suggestion: [],
      delivery_prefferred: [],
      w9Valid: false,
      atoc: {},
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
      latitude: null,
      longitude: null,
      pickupSuggestionOpen: false,
      deliverySuggestionOpen: false,

    }

    this.onSignUp = this.onSignUp.bind(this);
    this.chooseTrailer = this.chooseTrailer.bind(this);
    // this.searchLocation = this.searchLocation.bind(this);
    this.pickupPrefferedLocation = this.pickupPrefferedLocation.bind(this);
    this.selectPrefferred = this.selectPrefferred.bind(this);
    this.removeSuggestion = this.removeSuggestion.bind(this);
    this.UploadDoc = this.UploadDoc.bind(this);
    this.UploadBase64 = this.UploadBase64.bind(this);
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

  // searchLocation(query, type) {
  //   const place = encodeURIComponent(query);
  //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${config.MAP_BOX}`)
  //     .then((result) => {
  //       return result.json()
  //     })
  //     .then((res) => {
  //       if (type == 'pickup') {
  //         this.setState({pickup_suggestion:res.features});
  //       } else {
  //         this.setState({delivery_suggestion:res.features});
  //       }
  //     })
  // }

  componentDidMount() {
    let self=this;
    this.props.actions.getAllTruckTypes();
    navigator.geolocation.getCurrentPosition(
       (position) => {
         const longitude = position.coords.longitude;
         const latitude = position.coords.latitude;
         this.setState({longitude, latitude});
       },
       (error) => alert(error.message),
       {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
     );
     this.setState({pickup_suggestion: [...state], delivery_suggestion: [...state]});
     PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: (token) => {
          console.log(token, 'token.........');
            self.setState({deviceToken: token.token})
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: (notification) => {
            console.log( 'NOTIFICATION:', notification );
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
  }
  emailTextInput(email) {
    this.setState({ email : email })
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      this.setState({ emailValid : true})
    }else{
      this.setState({ emailValid : false})
    }
  }

  passwordTextInput(password){
    this.setState({ password : password })
    if(password != ''){
      this.setState({ passwordValid : true})
    }else{
      this.setState({ passwordValid : false})
    }
  }

  companyTextInput(company){
    this.setState({ company : company })
    if(company != ''){
      this.setState({ companyValid : true})
    }else{
      this.setState({ companyValid : false})
    }
  }

  nameTextInput(name){
    this.setState({ name : name })
    if(name != ''){
      this.setState({ nameValid : true})
    }else{
      this.setState({ nameValid : false})
    }
  }
  phoneTextInput(phone){
    this.setState({ phone : phone })
    if(phone != ''){
      this.setState({ phoneValid : true})
    }else{
      this.setState({ phoneValid : false})
    }
  }
  mcTextInput(mc){
    this.setState({ mc : mc })
    if(mc != ''){
      this.setState({ mcValid : true})
    }else{
      this.setState({ mcValid : false})
    }
  }
  coiTextInput(coi){
    this.setState({ coi : coi })
    if(coi != ''){
      this.setState({ coiValid : true})
    }else{
      this.setState({ coiValid : false})
    }
  }
  w9TextInput(w9){
    this.setState({ w9 : w9 })
    if(w9 != ''){
      this.setState({ w9Valid : true})
    }else{
      this.setState({ w9Valid : false})
    }
  }
  atocTextInput(atoc){
    this.setState({ atoc : atoc })
    if(atoc != ''){
      this.setState({ atocValid : true})
    }else{
      this.setState({ atocValid : false})
    }
  }
  coiDoc = async () => {
    let self=this;
    // let result = DocumentPicker.getDocumentAsync({},(err,res) =>{

    // });
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
          }
          else {
            let coidata = {
              uri: response.uri,
              type: 'image/jpeg',
              name: response.uri.split('/')[response.uri.split('/').length - 1]
            }
            self.setState({coi: coidata, coiValid : true});
          }



        // if (response) {
        //   let coidata = {
        //     uri: response.uri,
        //     type: 'image/jpeg',
        //     name: response.uri.split('/')[response.uri.split('/').length - 1]
        //   }
        //   this.setState({coi: coidata, coiValid : true});
        // }
      });
    // let result = await ImagePicker.launchImageLibraryAsync();
    // console.log("status = ", result.cancelled);
    // if (!result.cancelled){
    //   console.log("image url", result.uri);
    //   console.log("daf", result.uri.split('/')[result.uri.split('/').length - 1]);
    //   let coidata = {
    //     uri: result.uri,
    //     type: 'image/jpeg',
    //     name: result.uri.split('/')[result.uri.split('/').length - 1]
    //   }
    //   this.setState({coi: coidata});
    // }
    // this.setState({coiValid : true})
  }

  UploadBase64(type, data) {
    self = this;
    self.setState({[`${type}Uploading`]: true})
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
  atocDoc = async () => {
    // let result = DocumentPicker.getDocumentAsync({},(err,res) =>{

    // });
    Uploader()
      .then((response) => {
        if (response) {
            let atocdata = {
              uri: response.uri,
              type: 'image/jpeg',
              name: response.uri.split('/')[response.uri.split('/').length - 1]
            }
            this.setState({atoc: atocdata, atocValid : true});
        }
      })
    // let result = await ImagePicker.launchImageLibraryAsync();
    // if (!result.cancelled){
    //   let atocdata = {
    //     uri: result.uri,
    //     type: 'image/jpeg',
    //     name: result.uri.split('/')[result.uri.split('/').length - 1]
    //   }
    //   this.setState({atoc: atocdata});
    // }
    // this.setState({atocValid : true})
  }
  onSignUp(){
      let formData = new FormData();
      formData.append("name", this.state.name)
      formData.append("email",this.state.email)
      formData.append("password", this.state.password)
      formData.append("mobile", this.state.phone)
      formData.append("company_name", this.state.company)
      formData.append("deviceToken", DeviceInfo.getUniqueID())
      // formData.append("deviceToken", this.state.deviceToken)
      formData.append("country_code", "+1")
      formData.append( "appVersion", "4.0")
      formData.append("latitude", this.state.latitude)
	    formData.append("longitude", this.state.longitude)
	    formData.append("MCNumber",this.state.mc)
      formData.append("deviceType", config.DEVICE_TYPE)
      formData.append("certificateOfInsurance",this.state.coi),
      formData.append("authorityLetter",this.state.atoc),
      formData.append("w9",this.state.w9)
      formData.append("truckType",  JSON.stringify(this.state.truckType))
      if (this.state.pickup_prefferred.length > 0) {
        formData.append("pickup_prefferred",  JSON.stringify(this.state.pickup_prefferred));
      }
      if (this.state.delivery_prefferred.length > 0) {
        formData.append("delivery_prefferred",  JSON.stringify(this.state.delivery_prefferred));
      }

      this.setState({isLoading: true});
     (this.props.actions.signUpRequest(formData))
          .then(function(){

            self.props.navigation.navigate('SignupPending')
          })
          .catch(function(){

              // TODO: any processing
          })
          .finally(() => {

            this.setState({isLoading: false});
          })
  }

  chooseTrailer(type) {
    this.setState({truckType: [type], isDropOpen: false});
  }

  render(){
    console.log('coi', this.state.w9);
    console.log('atoc', this.state.atoc);
    const { navigate, goBack } = this.props.navigation;
    const pickupSuggestionLength = this.state.pickup_suggestion.length;
    const { email, emailValid, password, passwordValid, company, companyValid, name, nameValid, phone, phoneValid, mc,
      mcValid, coi, coiValid, w9, w9Valid, atoc, atocValid, coiPlaceholder, w9Placeholder, atocPlceholder, pickup_p, delivery_p } = this.state;
       var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large' color= 'red'/>) :
            ( <View/>)
    return (
      this.state.isLoading ?
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>{spinner}</View>
      :<View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight]}>
        <TouchableOpacity onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop : 10},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Back_Arrow}
          />
        </TouchableOpacity>
      </View>
        <ScrollView contentContainerStyle={[commonStyle.scrollContainer]}>
            <View style={[commonStyle.contentCenter]}>
                <Image
                style={{}}
                source={images.Axle_NoTires}
                />
                <View style={{paddingHorizontal : 40,paddingTop : 15}}>
                <Text style={[commonStyle.fontSize_16,{textAlign : 'center'}]}>
                  Please enter the following details to create your account
                </Text>
                </View>
            </View>

            <View style={commonStyle.paddingTop_41}>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>EMAIL ADDRESS</Text>

                <View style={styles.textInputParent}>
                <TextInput
                  onChangeText={(email) => this.emailTextInput(email)}
                  underlineColorAndroid = "transparent"
                  value={email}
                  keyboardType = "email-address"
                  autoCapitalize="none"
                  style={styles.txtInutStyle}
                  />

                  {
                    email != '' && emailValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }

                  </View>
              </View>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>PASSWORD*</Text>
                <View style={styles.textInputParent}>

                <TextInput
                  onChangeText={(password) => this.passwordTextInput(password)}
                  underlineColorAndroid = "transparent"
                  value={password}
                  secureTextEntry ={true}
                  style={styles.txtInutStyle}
                  />
                  {
                   password != '' && passwordValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }
                  </View>
              </View>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>COMPANY</Text>
                <View style={styles.textInputParent}>

                <TextInput
                  onChangeText={(company) => this.companyTextInput(company)}
                  underlineColorAndroid = "transparent"
                  value={company}
                  style={styles.txtInutStyle}
                  />
                  {
                   company != '' && companyValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }
                  </View>
              </View>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>CONTACT NAME</Text>
                <View style={styles.textInputParent}>

                <TextInput
                  onChangeText={(name) => this.nameTextInput(name)}
                  underlineColorAndroid = "transparent"
                  value={name}
                  style={styles.txtInutStyle}
                  />
                  {
                   name != '' && nameValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }
                  </View>
              </View>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>PHONE</Text>
                <View style={styles.textInputParent}>

                <TextInput
                  onChangeText={(phone) => this.phoneTextInput(phone)}
                  underlineColorAndroid = "transparent"
                  value={phone}
                  keyboardType={'numeric'}
                  style={styles.txtInutStyle}
                  />
                  {
                   this.state.phone != '' && this.state.phoneValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }
                  </View>
              </View>
              <View style={commonStyle.paddingBottom_16}>
                <Text style={[commonStyle.fontSize_12,commonStyle.paddingBottom_6,styles.fontOswaldRegular]}>MC#*</Text>
                <View style={styles.textInputParent}>

                <TextInput
                  onChangeText={(mc) => this.mcTextInput(mc)}
                  underlineColorAndroid = "transparent"
                  value={mc}
                  style={styles.txtInutStyle}
                  />

                  {
                   mc != '' && mcValid == true
                   ?<Image
                         style={[styles.marginTop_15]}
                         source={images.Check_Small}
                       />
                    : null
                  }
                  </View>
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
                  <TouchableOpacity onPress={() => this.UploadDoc('coi')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                      {this.state.coiUploading && <ActivityIndicator/>}
                           <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                           {coiPlaceholder}
                           </Text>
                       </View>
                  </TouchableOpacity>
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
                              style={[styles.marginTop_15,{position : 'absolute', right : 38}]}
                              source={images.Check_Small}
                            />
                         : null
                       }
                       <Image
                           style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute', right : 10}]}
                           source={images.Upload}
                         />
                       </View>
                </View>

                <View style={commonStyle.paddingBottom_20}>
                <View style={styles.textInputParent}>
                <TouchableOpacity onPress={() => this.UploadDoc('w9')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                      {this.state.w9Uploading  && <ActivityIndicator/>}
                      <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                      {w9Placeholder}
                      </Text>

                      </View>
                </TouchableOpacity>
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
                            style={[styles.marginTop_15,{position : 'absolute', right : 38}]}
                            source={images.Check_Small}
                          />
                       : null
                     }
                     <Image
                         style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute', right : 10}]}
                         source={images.Upload}
                       />
                     </View>
                </View>

                <View>
                <View style={styles.textInputParent}>
                <TouchableOpacity onPress={() => this.UploadDoc('atoc')} underlayColor= "transparent" style={styles.txtInutStyle2}>
                    <View style={{flex:1, flexDirection: 'row'}}>
                    {this.state.atocUploading && <ActivityIndicator/>}
                         <Text style={[commonStyle.fontSize_14,{color: common.darkGrayColor,fontWeight : 'normal',marginTop : 10}]}>
                          {atocPlceholder}
                         </Text>
                     </View>
                </TouchableOpacity>
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
                            style={[styles.marginTop_15,{position : 'absolute', right : 38}]}
                            source={images.Check_Small}
                          />
                       : null
                     }
                     <Image
                         style={[styles.marginTop_15,styles.marginLeft_10,{position : 'absolute', right : 10}]}
                         source={images.Upload}
                       />
                     </View>

                </View>
              </View>

              <View>
              </View>

              <View style={{paddingHorizontal : 40,paddingBottom : 26}}>
                <Text style={[commonStyle.fontSize_11,{textAlign : 'center'}]}>By creating an account, you agree to Axle’s Privacy</Text>
                <View style={{flexDirection: 'row', justifyContent:'center'}}><TouchableOpacity onPress={() => navigate("Privacy")}><Text style={[commonStyle.fontSize_11, {color: '#0080ff'}]}>Policy</Text></TouchableOpacity><Text style={[commonStyle.fontSize_11]}> and</Text><TouchableOpacity onPress={() => navigate("Terms")}><Text style={[commonStyle.fontSize_11,{textAlign : 'center', color: '#0080ff'}]}> Terms & Conditions</Text></TouchableOpacity></View>
              </View>

              {
                emailValid == true && passwordValid == true && companyValid == true && nameValid == true && phoneValid == true && mcValid == true && coiValid == true && w9Valid == true && atocValid == true
                ?<TouchableOpacity onPress={() => this.onSignUp()} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor}]}>
                     <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>{this.state.isLoading && <ButtonLoader/>}CREATE ACCOUNT</Text>
                </TouchableOpacity>
                :<TouchableOpacity underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor}]}>
                     <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              }

              <View style={[commonStyle.contentCenter,{paddingTop : 26,paddingBottom : 27}]}>
                <Text onPress={() => navigate('Login')} style={[commonStyle.fontSize_14,{color : common.blackColor,fontWeight:'normal'}]}>
                Already have an account?  Login here
                </Text>
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
                      <TouchableOpacity onPress={() => this.setState({w9Scanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                        <Image
                          style={{height:15,width:16}}
                          source={images.Close_White}
                        />
                      </TouchableOpacity>
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
                          <TouchableOpacity style={styles.FirstButtonContainer} onPress={() =>{this.setState({w9Document:undefined}) }}>
                            <Text  style={styles.FirstButtonText}>RETAKE</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('w9', this.state.w9Document);this.setState({w9Scanner: false, w9Uploading: true})} }>
                            <Text style={styles.SecondButtonText}>SAVE</Text>
                          </TouchableOpacity>
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
                      <TouchableOpacity onPress={() => this.setState({coiScanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                        <Image
                          style={{height:15,width:16}}
                          source={images.Close_White}
                        />
                      </TouchableOpacity>
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
                          <TouchableOpacity style={styles.FirstButtonContainer} onPress={() =>{this.setState({coiDocument:undefined}) }}>
                            <Text  style={styles.FirstButtonText}>RETAKE</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('coi', this.state.coiDocument);this.setState({coiScanner: false, coiUploading: true})} }>
                            <Text style={styles.SecondButtonText}>SAVE</Text>
                          </TouchableOpacity>
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
                      <TouchableOpacity onPress={() => this.setState({atocScanner: false})} underlayColor="transparent" style={[{width : 60,height : 70,marginTop :20},commonStyle.contentCenter]}>
                        <Image
                          style={{height:15,width:16}}
                          source={images.Close_White}
                        />
                      </TouchableOpacity>
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
                          <TouchableOpacity style={styles.FirstButtonContainer} onPress={() =>{this.setState({atocDocument:undefined}) }}>
                            <Text  style={styles.FirstButtonText}>RETAKE</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.SecondButtonContainer} onPress={() => {this.UploadBase64('atoc', this.state.atocDocument);this.setState({atocScanner: false, atocUploading: true})} }>
                            <Text style={styles.SecondButtonText}>SAVE</Text>
                          </TouchableOpacity>
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
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
        data: state.LoginReducer
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            signUpRequest,
            getAllTruckTypes
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
