import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions,Modal, ActivityIndicator} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripOverviewFullView from './../../components/tripOverviewFullView/tripOverviewFullView.js';
import MessageView from './../../components/messageView/messageView.js';
// import { Components } from 'expo';
import { Col, Grid } from "react-native-easy-grid";
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

let self;
let window = Dimensions.get("window");
class UpComingLoad extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    let message = [{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    },{
      subject : 'SUBJECT OF MESSAGE',
      message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis finibus mi, non accumsan neque. Nunc in dui ut neque laoreet dapibus.',
      time : 'Jul 31, 2017  |  6:38 pm'
    }]

    this.state = {
      message:message,
    }


  }
  dateFormatUpcoming(date){
    return moment(date).format('MMM DD, YYYY');
  }


  render(){
    const { navigate,goBack } = this.props.navigation;
    const shipment=this.props.shipments.selectedShipment;

    return (

      <View style={commonStyle.container}>
    {this.props.shipments.selectedShipment._id ?
          <View>
      <View style={[commonStyle.headerBarHeight,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60, height : 70,marginTop :0},commonStyle.contentCenter]}>
          <Image
            style={{height:15,width:16}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        <View style={[styles.textInputParentSearch,{flexDirection:'row'}]}>
                <Text style={[commonStyle.fontSize_20,{color:common.whiteColor,lineHeight:50,fontWeight:'500'}]}>Upcoming load for: </Text>
              <Text style={[commonStyle.fontSize_20,{color:common.greenColor,lineHeight:50,fontWeight:'500'}]}>{this.dateFormatUpcoming(shipment.pickupDateTimeFrom)}</Text>

          </View>
        <View style={[commonStyle.smallHeaderBar]}>

        </View>
      </View>

    <View style={{marginBottom:20}}>
        <ScrollView>

        <View style={{flex:1,marginBottom:20}}>

        <TripOverviewFullView dataTripDetails={shipment}/>


            </View>
      <View style={{marginBottom:20}}>

          <View style={{flex:1,marginBottom:20}}>

          <TripOverviewFullView dataTripDetails={shipment}/>


            </View>
            <View style={{borderTopWidth:1,borderTopColor:common.grayColor}}>
                  <Text style={[commonStyle.fontSize_18,{color:common.blackColor,fontWeight: '600',paddingLeft:30,paddingTop:20}]}>MESSAGES</Text>
              </View>
              <View style={{paddingLeft:30,paddingTop:20,paddingRight:30}}>
              <MessageView data ={shipment}/>
             </View>
          </View>

        </ScrollView></View></View>:
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      }

      </View>
    )
  }
  //************************************** Render end*****************************//
};
function mapStateToProps(state){
    return {
        shipments: state.shipments,
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

export default connect(mapStateToProps, null)(UpComingLoad)
