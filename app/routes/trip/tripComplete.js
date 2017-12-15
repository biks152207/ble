import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions,Modal} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripOverviewFullView from './../../components/tripOverviewFullView/tripOverviewFullView.js';
import MessageView from './../../components/messageView/messageView.js';
import Loader  from './../../components/loader/loader';

// import { Components } from 'expo';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
let self;
let window = Dimensions.get("window");
class TripComplete extends Component {
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
    let dataTripDetails={
      source : 'Los Angeles, California',
      sourceAddress:'1234 John Street, 90001',
      startDate : 'Aug 1, 2017  •  12:00 am - 4:00 am (pt)',
      sourceMobile:'(123) 456 - 7890',
      destination : 'Las Vegas, Nevada',
      destinationAddress:'927 Casino Ave, 45900',
      endDate : 'Aug 2, 2017  •  7:00 pm - 9:00 pm (pt)',
      destinationMobile:'(123) 456 - 7890',
      deadheadKey : 'DEADHEAD',
      deadheadValue : '20mi',
      priceKey : 'PRICE',
      priceValue : '$2000',
      distanceKey : 'DISTANCE',
      distanceValue : '600mi',
      commodityKey:'COMMODITY',
      commodityValue:'Produce',
      referenceKey:'REFERENCE #',
      referenceValue:'1234ASD98B',
      wightKey:'WIGHT',
      wightValue:'500kg',
      palletsKey:'PALLETS',
      palletsValue:'200',
      trailerKey:'TRAILER',
      trailerValue:'Reefer - 32°'
    };
    this.state = {
      message:message,
      dataTripDetails:dataTripDetails
    }


  }


  render(){
    const { navigate,goBack } = this.props.navigation;
    const shipment=this.props.shipments.selectedShipment;
        return (
shipment && Object.keys(shipment).length>0?
<View style={commonStyle.container}>

<View style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
  <View style={{flex:0.5}}>
  <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :7},commonStyle.contentCenter]}>
    <Image
      style={{width : 21, height : 18}}
      source={images.Arrow_White_Left}
    />
  </TouchableHighlight>
  </View>
  <View style={{}}>
      <Text style={[commonStyle.fontSize_20,{color:common.greenColor}]}>Your trip is complete</Text>
  </View>
  <View style={[{flex:1, marginTop : 5,marginRight : 24},commonStyle.contentRight]}>
    <View style={[styles.oval,commonStyle.contentCenter]}>
        <Image
          style={{}}
          source={images.Circle_Check}
        />
    </View>
  </View>
</View>


<View>
    <ScrollView>

    <View style={{flex:1,marginBottom:20}}>
        <TripOverviewFullView dataTripDetails={shipment}/>
      </View>
      <View style={{borderTopWidth:1,borderTopColor:common.grayColor}}>
            <Text style={[commonStyle.fontSize_18,{color:common.blackColor,fontWeight: '600',paddingLeft:30,paddingTop:20}]}>MESSAGES</Text>
        </View>
        <View style={{paddingLeft:30,paddingTop:20,paddingRight:30}}>

             <MessageView data ={shipment}/>

       </View>
    </ScrollView>

  </View>




</View>
:<Loader/>

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

export default connect(mapStateToProps, null)(TripComplete)
