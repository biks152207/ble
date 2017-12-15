import React , { Component }from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, AsyncStorage } from 'react-native';
import { throttle } from './../../utils/utility';

import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

import Loader  from './../../components/loader/loader';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { NavigationActions } from 'react-navigation'
/* Actions */
import { getUserDetails, setUserType } from './../../actions/auth';
import { getLiveShipmentByDriver,selectShipment } from './../../actions/shipments';
import config from './../../config/config'
var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;

let self;

class PathSelection extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
      this.state = {
          isTokenPresent: true,
          userDataReceived: false,
          userSelected: false,
          canSelect: true
      };

      this.setUserType = this.setUserType.bind(this);
      this.routeTo = this.routeTo.bind(this);

  }

  routeTo(type) {
    if (this.state.canSelect) {
      this.setState({ canSelect: false });
      this.props.navigation.navigate(type);
    }
    setTimeout(() => {
      this.setState({ canSelect: true})
    }, 200)
  }

    async componentWillMount(){
        const token = await AsyncStorage.getItem('@Axle:token')
        const { navigate } = this.props.navigation;
        let self=this;
        if(token && !this.state.userDataReceived){
            this.setState({isTokenPresent: true});
            console.log("TOKEN IN STORAGE: ",token );

            let response = await this.props.actions.getUserDetails(token);
            console.log(response, 'this is a response....');
            if(response){
              Crashlytics.setUserName(this.props.auth.user.name);
              Crashlytics.setUserEmail(this.props.auth.user.name);
                this.setState({userDataReceived: true})
                this.props.actions.getLiveShipmentByDriver({},navigate).then(function(res){

                  if(res && res.Shipment && res.Shipment.length>0){
                    self.props.actions.selectShipment(res.Shipment[0],navigate).then(function(){
                                          // self.props.navigation.navigate('PickUpLocation');
                                          const resetAction = NavigationActions.reset({
                                                              index: 0,
                                                              actions: [
                                                                NavigationActions.navigate({ routeName: 'PickUpLocation'})
                                                              ]
                                                            })
                                          self.props.navigation.dispatch(resetAction)

                    });
                  }else {
                    if(self.props.auth.user.driver.carrier===null ||self.props.auth.user.driver.carrier===undefined){
                      const resetAction = NavigationActions.reset({
                                          index: 0,
                                          actions: [
                                            // NavigationActions.navigate({ routeName: 'PickUpHome'})
                                            NavigationActions.navigate({ routeName: 'ActivityStatus'})
                                          ]
                                        })
                      self.props.navigation.dispatch(resetAction)


                      // this.props.navigation.navigate('PickUpHome')
                    }else {
                      const resetAction = NavigationActions.reset({
                                          index: 0,
                                          actions: [
                                            // NavigationActions.navigate({ routeName: 'Shipments'})
                                            NavigationActions.navigate({ routeName: 'ActivityStatus'})
                                          ]
                                        })
                      self.props.navigation.dispatch(resetAction)
                      // this.props.navigation.navigate('Shipments')
                    }
                  }
                })
                // self.props.actions.selectShipment(shipment,navigate).then(function(){
                //   self.setState({ isLiveDetail : true})
                //
                //   self.props.navigation.navigate('PickUpLocation');
                //
                // });

            }
            else{

                this.setState({userDataReceived: false, isTokenPresent: false})
                await AsyncStorage.removeItem('@Axle:token')
            }

        }
        else if(this.state.isTokenPresent && this.state.userDataReceived){
            // do nothing
        }
        else{
            this.setState({isTokenPresent: false});
        }


    }

    setUserType(flag){
        this.setState({
            userSelected: true,
        });
        this.props.actions.setUserType(flag);
    }


  render(){
    const { navigate } = this.props.navigation;
    return (
    (!this.state.isTokenPresent)?
        (<View style={commonStyle.container}>
          {this.state.userSelected && <View style={{position:'absolute',width : 60,height : 50,top:10,zIndex:10}}>
           <TouchableOpacity onPress={() => {this.setState({userSelected:false})}} underlayColor="transparent" style={[{alignItems:'center',justifyContent:'center',width : 60,height : 50,}]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Back_Arrow}
            />
          </TouchableOpacity>
          </View>}
            <View style={[commonStyle.subContainer,commonStyle.contentCenter]}>
                <View style={commonStyle.contentCenter}>
                    <Image
                    style={{}}
                    source={images.splash_logo}
                  />
                  <View style={{alignItems:'center',position:'absolute',zIndex:999,bottom:170}}>
                    <Text style={{fontFamily:'ProximaNova-Bold',color:'#dcdcdc'}}>Version {config.ANDROID_APP_VERSION_NAME}</Text>
                  </View>

                </View>


                {
                (!this.state.userSelected)?
                    <View style={commonStyle.contentCenter}>

                        <TouchableOpacity onPress={() => this.setUserType(false)} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:107}]}>
                            <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>COMPANY DRIVER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setUserType(true)} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.whiteColor,bottom:37,borderColor:common.blackColor,borderWidth:1}]}>
                            <Text style={[commonStyle.fontSize_14,{color:common.blackColor,fontFamily:'ProximaNova-Bold'}]}>OWNER OPERATOR</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={commonStyle.contentCenter}>
                        <TouchableOpacity onPress={() => this.routeTo('Login')} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:107}]}>
                            <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>LOGIN</Text>
                        </TouchableOpacity>

                        {
                            (this.props.auth.isOwner)?(
                                <TouchableOpacity onPress={() => this.routeTo('SignUp')} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.whiteColor,bottom:37,borderColor:common.blackColor,borderWidth:1}]}>
                                    <Text style={[commonStyle.fontSize_14,{color:common.blackColor,fontFamily:'ProximaNova-Bold'}]}>SIGN UP</Text>
                                </TouchableOpacity>
                            ):null
                        }
                    </View>
                }
                </View>
          </View>
        )
        :<Loader />
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails,
            setUserType,
            getLiveShipmentByDriver,
            selectShipment
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PathSelection)
