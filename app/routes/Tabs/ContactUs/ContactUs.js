import React , { Component }from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
  Button
} from 'react-native';

let window = Dimensions.get("window");
// import { FontAwesome } from '@expo/vector-icons';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import commonStyle from './../../../config/commonStyle.js';
import images from './../../../config/images.js';
import styles from './styles';
import ContactBlock from './ContactBlock';
import Hr from 'react-native-hr';

import common from './../../../config/common.js';
import Tabs from './../../../components/Tabs/Tabs.js';
import Drawers from './../../../components/SideMenu/Drawer.js';

class ContactUs extends Component {
  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
    }
    this.closeDrawer = this.closeDrawer.bind(this);

  }
  closeDrawer() {
    this.setState({isOpen: false});
  }
  driverStatusShipment(upcomingLoad){
    if(upcomingLoad>0){
      return upcomingLoad+" UPCOMING LOADS";
    }else {
      return "Up-to-date"
    }
  }
  render() {
    // const { navigate, goBack, state } = this.props.navigation;
    const { navigate, state, goBack,dispatch } = this.props.screenProps.rootNavigation;
    const {shipments}=this.props;

    return (
      <Drawers isOpen={this.state.isOpen} closeDrawer={this.closeDrawer} navigate={navigate} navigationDispatch={dispatch}>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5,flexDirection : 'row'}}>
        <TouchableHighlight onPress={() => {this.setState({isOpen: true})}} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :5},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Hamburger}
          />
        </TouchableHighlight>
          {/*<Text style={[commonStyle.fontSize_20,{color : common.whiteColor,fontWeight :'500',lineHeight:20,marginTop :39}]}>Results</Text>*/}
        </View>
        <View style={[{flex:1, marginTop : 5,marginRight : 24,flexDirection : 'row'},commonStyle.contentRight]}>
        <Text style={[commonStyle.fontSize_20,{color : common.greenColor,fontWeight :'500',lineHeight:20,marginRight: 15}]}>{this.driverStatusShipment(shipments.upcomingShipmentCount)}</Text>
          <Image
            style={{width : 19, height : 19}}
            source={images.Circle_Check}
          />
        </View>
      </View>
      <View style={styles.container}>

      <View style={[styles.header]}>
        <View style={[styles.horizontalMargin, styles.paddingTop51]}>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle,{marginLeft: 20}]}>Contacts</Text>
          </View>
        </View>
      </View>
        <View style={[styles.content]}>
            <Text style={[styles.horizontalMargin25,styles.subTitle, {height: 60, paddingTop: 24, width: 320}]}>ASK US ANYTHING</Text>
            <Text style={[styles.horizontalMargin25,styles.subTitle]}>& EVERYTHINGs</Text>
          <View style={[styles.horizontalMargin20,styles.padding26]}>
              <ContactBlock imageName="Phone_Green_Contact" info={'201-691-5297'}/>
              <ContactBlock imageName="Email_Green_Contact" info={'support@axletrucking.com'}/>
              <ContactBlock imageName="Pin_Green_Contact" info={'580 Marin Blvd Jersey City NJ 07310'}/>
          </View>
        </View>
        {/* <Tabs state={state} navigate={navigate}/> */}
      </View>
      </Drawers>
    )
  }
}

function mapStateToProps(state){
    return {
      shipments: state.shipments,
      user: state.auth.user,
    }
}

export default connect(mapStateToProps, null)(ContactUs);
