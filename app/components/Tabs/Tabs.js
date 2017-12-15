import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { TabNavigator, NavigationActions } from 'react-navigation';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import Hr from 'react-native-hr';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import styles from './styles';
import PickUpHome from './../../routes/pickUp/pickUpHome.js';
import Shipments from './../../routes/Tabs/Shipments/Shipments';
import ContactUs from './../../routes/Tabs/ContactUs/ContactUs';
import Referrals from './../../routes/Tabs/Referrals/Referrals';
import Payments from './../../routes/Tabs/Payments/Payments';
import ActivityStatus from './../../routes/ActivityStatus/ActivityStatus';


class TabBarComponent  extends Component {
  render() {
    const { navigate, goBack, state } = this.props.navigation;
    const { navigationState } = this.props;
    console.log(this.props.screenProps, 'this props....^^^^^^^^^^^^^');
    return (
      <View style={styles.container}>
      <View style={{flex:1, flexDirection:'row',width:window.width, alignItems: 'center', justifyContent: 'center', marginHorizontal:20}}>
          <TouchableOpacity onPress={() => navigate('ActivityStatus')} style={styles.eachTabContainer}>
            <Image source={images.Pin_Menu_White} />
            <Text style={styles.shipments}>SHIPMENTS</Text>
            {navigationState.index == 0 &&
              <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Payments')} style={styles.eachTabContainer}>
            <Image source={images.Bill_White}  />
            <Text style={styles.payments}>PAYMENTS</Text>
            {navigationState.index == 1 &&
              <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Referrals')} style={styles.eachTabContainer}>
            <Image source={images.Gift_Tab}  />
            <Text style={styles.referrals}>Referrals</Text>
            {navigationState.index == 2 &&
              <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Contact')} style={styles.eachTabContainer}>
            <Image source={images.Phone_Tab}/>
            <Text style={styles.contact}>CONTACT US</Text>
            {navigationState.index == 3 &&
              <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('ActivityStatus')} style={styles.eachTabContainer}>
            <Image source={images.Gift_Tab}  />
            <Text style={styles.referrals}>ActivityStatus</Text>
            {navigationState.index == 4 &&
              <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,marginTop: 5}} />
            }
          </TouchableOpacity>
      </View>
      </View>
    )
  }
}

class Tabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  render() {
    const { navigate, goBack, state } = this.props.screenProps.rootNavigation;

    let tabOptions={};
    tabOptions['ActivityStatus']={
      screen: ActivityStatus,
      navigationOptions: {
            tabBarIcon: <Image source={images.Phone_Tab} style={{height:40}}/>,
            tabBarLabel: (props) => {
              console.log('this is props inside tab',props);
              return (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Image style={{width : 21, height : 21}} source={images.elog_white} />
                  <Text style={styles.shipments}>ELOGS</Text>
                  {props.focused &&
                  <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                  }
                </View>
              )
            },
            showIcon: true
     }
    }
    if(this.props.user && this.props.user.driver && (this.props.user.driver.carrier===null ||this.props.user.driver.carrier===undefined)){
      tabOptions['PickUpHome']={
        screen: PickUpHome,
        navigationOptions: {
              tabBarIcon: <Image source={images.Pin_Menu_White} />,
              tabBarLabel: (props) => {
                console.log('this is props inside tab',props);
                return (
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={images.Pin_Menu_White} />
                    <Text style={styles.shipments}>AVAILABLE LOADS</Text>
                    {props.focused &&
                    <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                    }
                  </View>
                )
              },
              showIcon: true
       }

       }
    }

     tabOptions['Shipments']={
       screen: Shipments,
       navigationOptions: {
             tabBarIcon: <Image source={images.Pin_Menu_White} />,
             tabBarLabel: (props) => {
               console.log('this is props inside tab',props);
               return (
                 <View style={{justifyContent:'center',alignItems:'center'}}>
                   <Image   source={images.Gift_Tab} />
                   <Text style={styles.shipments}>MY LOADS</Text>
                   {props.focused &&
                   <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                   }
                 </View>
               )
             },
             showIcon: true
      }

      }
      tabOptions['ContactUs']={
        screen: ContactUs,
        navigationOptions: {
              tabBarIcon: <Image source={images.Phone_Tab} style={{height:40}}/>,
              tabBarLabel: (props) => {
                console.log('this is props inside tab',props);
                return (
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={images.Phone_Tab} />
                    <Text style={styles.shipments}>CONTACT US</Text>
                    {props.focused &&
                    <Hr lineStyle={{backgroundColor: common.greenColor,height: 3,}} />

                    }
                  </View>
                )
              },
              showIcon: true
       }
     }

    const MainTab = TabNavigator(tabOptions, {
      tabBarPosition: 'bottom',
      lazy:true,
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
  /* Map state to props */
  function mapStateToProps(state){
      return {
          user: state.auth.user
      }
  }



  /* Connect Component with Redux */
  export default connect(mapStateToProps, null)(Tabs)
