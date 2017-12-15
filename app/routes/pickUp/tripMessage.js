import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import MessageView from './../../components/messageView/messageView.js';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

let self;
let window = Dimensions.get("window");
class TripMessage extends Component {
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
        feedView : {
          height: window.height - 80,
        }

      }
  }


  render(){
    const { navigate,goBack } = this.props.navigation;
    const selectedShipment=this.props.shipments.selectedShipment;
    const message = {
      message: this.props.shipments.selectedShipment.specialComment,
      fullData: this.props.shipments.selectedShipment
    }
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        </View>
        <View style={[{flex:3}]}>
          <Text style={[commonStyle.fontSize_16,styles.fontProximaNovaBold,{color:common.whiteColor}]}>Message</Text>
        </View>
      </View>
         <ScrollView>
         <View style={commonStyle.subContainer}>
         <View style={[{paddingTop :30}]}>
            {/*{
              this.state.message.map( (message) =>{
                return (
                  <MessageView data ={message}/>
                )
              })
            }*/}
            <MessageView data={selectedShipment}/>
          </View>
            </View>
         </ScrollView>
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
//
// /* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             acceptShipment,
//             addIdForAcceptance
//         }, dispatch)
//     };
// }


export default connect(mapStateToProps, null)(TripMessage)
