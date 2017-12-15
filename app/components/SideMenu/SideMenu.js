import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  TouchableHighlight,
    AsyncStorage
} from 'react-native';
import Hr from 'react-native-hr';
let window = Dimensions.get("window");
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import { NavigationActions } from 'react-navigation'

// import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import images from './../../config/images.js';
import styles from './SideMenuStyle';


let self;

class SideMenu extends Component {

  constructor(props){
      super(props);
        self = this;
      this.state = {
        logout: false,
        images: [

        ]
      }
      this.onLogout = this.onLogout.bind(this);
      this.navigateTo = this.navigateTo.bind(this);
  }
  navigateTo() {
     const navigateAction = NavigationActions.navigate({
               routeName: "UserInfo",
               params: {}
             });
             this.props.navigate.dispatch(navigateAction);
    }
  onLogout(){
    let self=this
      AsyncStorage.removeItem('@Axle:token')
          .then(function(){

              // self.props.navigate('PathSelection');
              const resetAction = NavigationActions.reset({
                                  index: 0,
                                  actions: [
                                    NavigationActions.navigate({ routeName: 'PathSelection'})
                                  ]
                                })
              self.props.navigationDispatch(resetAction)
          })
  }
  componentWillMount(){
    if(this.props.userInfo && this.props.userInfo.driver &&  (this.props.userInfo.driver.carrier===null ||this.props.userInfo.driver.carrier===undefined)){
      this.setState({
        images:[
          {
            image: images.Pin_Menu,
            title: 'PickUpHome',
            displayText:'Home'
          },
          {
            image: images.Pin_Menu,
            title: 'Shipments',
            displayText:'Shipments'
          },
          // {
          //   image: images.Dollars_Menu,
          //   title: 'Payments',
          //   displayText:'Payments'
          // },
          // {
          //   image: images.Gift_Menu,
          //   title: 'Referrals',
          //   displayText:'Referrals'
          // },
          // {
          //   image: images.Phone_Menu,
          //   title: 'ContactUs',
          //   displayText:'Contact'
          // },
          // {
          //   image: images.Phone_Menu,
          //   title: 'ELDDashboard',
          //   displayText:'ELDDashboard'
          // },
          {
            image: images.Phone_Menu,
            title: 'ActivityStatus',
            displayText:'ActivityStatus'
          }
        ]
      })
    }else {
      this.setState({
        images:[
          {
            image: images.Pin_Menu,
            title: 'Shipments',
            displayText:'Shipments'
          },
          // {
          //   image: images.Dollars_Menu,
          //   title: 'Payments',
          //   displayText:'Payments'
          // },
          // {
          //   image: images.Gift_Menu,
          //   title: 'Referrals',
          //   displayText:'Referrals'
          // },
          // {
          //   image: images.Phone_Menu,
          //   title: 'ContactUs',
          //   displayText:'Contact'
          // },
          // {
          //   image: images.Phone_Menu,
          //   title: 'ELDDashboard',
          //   displayText:'ELDDashboard'
          // },
          {
            image: images.Phone_Menu,
            title: 'ActivityStatus',
            displayText:'ActivityStatus'
          }
        ]
      })
    }
  }
  checkRole(){
    let status=this.props.userInfo.driver.carrier?'Driver':'Owner/Operator';
    return status;
  }

  render() {
    const { navigate,userInfo } = this.props;

    return(
      <View style={commonStyle.container}>
        <StatusBar
           backgroundColor="black"
         />
        <View style={[styles.wrapper, styles.horizontalMargin]}>
          <View style={{flex:1, flexDirection:'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigate('UserInfo')}>
              <Image source={userInfo && userInfo.driver && userInfo.driver.image ? userInfo.driver.image :images.Pic_Empty}/>
            </TouchableOpacity>
            <View style={{paddingLeft:18}}>
              <Text  style={styles.mainTitle}>{userInfo.name}</Text>
              <Text style={{fontSize:14, fontWeight: '400'}}>{this.checkRole()}</Text>
            </View>
          </View>
          <View style={{width:window.width <=320 ? 280: window.width >=414 ? 354: 324, marginLeft: -36}}>
            <View style={styles.hr}/>
          </View>
        </View>
        <View style={{flex:9}}>
            <View style={[styles.horizontalMargin30]}>
              {this.state.images.map((img, key) =>{
                return (
                  <TouchableOpacity key={key} onPress={() => {navigate(img.title)}}>
                  <View style={{flexDirection: 'row', paddingTop: key == 0 ? 0: 34.4}}>
                    <View style={{width:29, height:18}}>
                      <Image source={img.image} />
                    </View>
                    <Text style={{paddingLeft:20.4, fontSize: 20}}>{img.displayText}</Text>
                  </View>
                  </TouchableOpacity>
                )
              })}
            </View>
        </View>
        <View>
        {this.state.logout &&
          <Modal
            animationType={'none'}
            transparent={true}
            onRequestClose={()=>{}}
            >
            <View  style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}} >
              <View  style={{height:130, backgroundColor: '#FFFFFF', bottom: 0, position: 'absolute', width:window.width}}>
                <View style={{paddingTop:19, marginHorizontal:30, alignItems:'center'}}>
                  <Text style={styles.buttonTitle}>Are you sure you want to Log out?</Text>
                </View>
                <View style={{flex:1,marginHorizontal:10}}>
                  <View>
                     <View style={{flexDirection:'row',marginTop:20,height:50}}>
                         <TouchableHighlight onPress={() => {this.setState({logout: false})}}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flex:0.5,marginRight:5}]}>
                           <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>NO</Text>
                         </TouchableHighlight>

                         <TouchableHighlight onPress={() => {this.setState({logout: false}); this.onLogout()}}   underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,flex:0.5}]}>
                           <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>YES</Text>
                         </TouchableHighlight>
                     </View>
                   </View>
                 </View>
              </View>
            </View>
          </Modal>
        }
        </View>
        <View style={[styles.horizontalMargin,{flex:1,bottom: window.width <= 320 ? 10: 20}]}>
          <TouchableOpacity onPress={() => {this.setState({logout: true}); this.props.closeDrawer()}}>
            <Text  style={{fontSize:16,lineHeight: 20, height:20}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state){
    return {
        userInfo: state.auth.user,
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             acceptShipment
//         }, dispatch)
//     };
// }

export default connect(mapStateToProps, null)(SideMenu)
