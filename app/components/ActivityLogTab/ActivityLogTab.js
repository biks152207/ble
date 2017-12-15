import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { TabNavigator, NavigationActions } from 'react-navigation';

import Hr from 'react-native-hr';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import styles from './styles';
import ActivityLog from './../../routes/ActivityLogTab/ActivityLog/ActivityLog';
import ActivityDVIR from './../../routes/ActivityLogTab/ActivityDVIR/ActivityDVIR';
import ActivityForm from './../../routes/ActivityLogTab/ActivityForm/ActivityForm';
import ActivitySign from './../../routes/ActivityLogTab/ActivitySign/ActivitySign';


// class TabBarComponent  extends Component {
//   render() {
//     const { navigate, goBack, state } = this.props.navigation;
//     const { navigationState } = this.props;
//     console.log(this.props.screenProps, 'this props....^^^^^^^^^^^^^');
//     return (
//       <View style={styles.container}>
//       <View style={{flex:1, flexDirection:'row',width:window.width, alignItems: 'center', justifyContent: 'center', marginHorizontal:20}}>
//           <TouchableOpacity onPress={() => navigate('Shipment')} style={styles.eachTabContainer}>
//             <Image source={images.Pin_Menu_White} />
//             <Text style={styles.shipments}>SHIPMENTS</Text>
//             {navigationState.index == 0 &&
//               <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
//             }
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigate('Payments')} style={styles.eachTabContainer}>
//             <Image source={images.Bill_White}  />
//             <Text style={styles.payments}>PAYMENTS</Text>
//             {navigationState.index == 1 &&
//               <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
//             }
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigate('Referrals')} style={styles.eachTabContainer}>
//             <Image source={images.Gift_Tab}  />
//             <Text style={styles.referrals}>REFERRALS</Text>
//             {navigationState.index == 2 &&
//               <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
//             }
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigate('Contact')} style={styles.eachTabContainer}>
//             <Image source={images.Phone_Tab}/>
//             <Text style={styles.contact}>CONTACT US</Text>
//             {navigationState.index == 3 &&
//               <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
//             }
//           </TouchableOpacity>
//       </View>
//       </View>
//     )
//   }
// }

export default class ActivityLogTabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  render() {
    console.log('rootNavigation', this.props);
    const { navigate, goBack, state } = this.props.screenProps.rootNavigation;

    const MainTab = TabNavigator({
        ActivityLog: {
          screen: ActivityLog,
          navigationOptions: {
                tabBarIcon: <Image source={images.Pin_Menu_White} />,
                tabBarLabel: (props) => {
                  console.log('this is props inside tab',props);
                  return (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={images.Pin_Menu_White} />
                      <Text style={styles.shipments}>ActivityLog</Text>
                      {props.focused &&
                      <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                      }
                    </View>
                  )
                },
                showIcon: true
         }

         },
        ActivityDVIR: { screen: ActivityDVIR,
          navigationOptions: {
                tabBarIcon: <Image source={images.Bill_White}  />,
                tabBarLabel: (props) => {
                  console.log('this is props inside tab',props);
                  return (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={images.Bill_White} />
                      <Text style={styles.shipments}>ActivityDVIR</Text>
                      {props.focused &&
                      <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                      }
                    </View>
                  )
                },
                showIcon: true
         }
        },
        ActivityForm: { screen: ActivityForm,
          navigationOptions: {
                tabBarIcon: <Image source={images.Gift_Tab}  />,
                tabBarLabel: (props) => {
                  console.log('this is props inside tab',props);
                  return (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={images.Gift_Tab} />
                      <Text style={styles.shipments}>ActivityForm</Text>
                      {props.focused &&
                      <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                      }
                    </View>
                  )
                },
                showIcon: true
         }
         },
        ActivitySign: { screen: ActivitySign,
          navigationOptions: {
                tabBarIcon: <Image source={images.Phone_Tab} style={{height:40}}/>,
                tabBarLabel: (props) => {
                  console.log('this is props inside tab',props);
                  return (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={images.Phone_Tab} />
                      <Text style={styles.shipments}>ActivitySign</Text>
                      {props.focused &&
                      <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                      }
                    </View>
                  )
                },
                showIcon: true
         }
        }
    }, {
      tabBarPosition: 'bottom',
      initialRouteName:state.routeName,
      tabBarOptions: {
        activeBackgroundColor: common.blackColor,
        inactiveBackgroundColor: common.blackColor,
        style: {
          // height: 60,
          backgroundColor: common.blackColor
        },
        indicatorStyle:{
          backgroundColor:common.blackColor
        }
        // iconStyle: {
        //   height: 100
        // }
      }
    });
    return (
      <MainTab screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
    )
  }
};
