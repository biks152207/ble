import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,ScrollView,Dimensions,Modal} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import TripDetailsView from './../../components/tripDetailsView/tripDetailsView.js';
// import { Components } from 'expo';

let self;
let window = Dimensions.get("window");
const coordinates = {
  latitude: -36.8457991,
  longitude: 174.7666099,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
export default class TripDetails extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    let dataTripDetails={
      source : 'Los Angeles, California',
      startDate : 'Aug 1, 2017  •  12:00 am - 4:00 am (pt)',
      destination : 'Las Vegas, Nevada',
      endDate : 'Aug 2, 2017  •  7:00 pm - 9:00 pm (pt)',
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
      dataTripDetails:dataTripDetails
    }


  }


  render(){
    const { navigate,goBack } = this.props.navigation;
    return (

      <View style={commonStyle.container}>
      <View style={{height:190}}>
      <Components.MapView style={{ flex: 1 }} initialRegion={coordinates}>
        <Components.MapView.Marker coordinate={coordinates}  image={images.Pin_Map}>
        </Components.MapView.Marker>

        <Components.MapView.Marker coordinate={coordinates}  image={images.Pin_Map}>
        </Components.MapView.Marker>
      </Components.MapView>

        <View style={[commonStyle.headerBarHeight,{flexDirection : 'row',position:'absolute',top:1}]}>
          <View style={{flex:0.5}}>
          <TouchableHighlight onPress={() =>goBack() } underlayColor="transparent" style={[{width : 60,height : 50,marginTop :22},commonStyle.contentCenter]}>
            <Image
              style={{width : 21, height : 18}}
              source={images.Back_Arrow}
            />
          </TouchableHighlight>
          </View>
          <View style={[{flex:3,marginTop:25}]}>
            <Text style={[commonStyle.fontSize_16,{color:common.whiteColor,fontWeight: 'bold'}]}></Text>
          </View>
        </View>
      </View>

        <View style={{flex:1}}>

          <TripDetailsView dataTripDetails={this.state.dataTripDetails}/>


        </View>
      <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:40}}>
          <TouchableHighlight underlayColor="transparent" onPress={() => navigate('TripMessage')} >
          <View style={[commonStyle.subContainer,{paddingTop:20,flex:1}]}>
            <Text style={[commonStyle.fontSize_12,{color:common.blackColor,fontWeight: '600',paddingLeft:10}]}>MESSAGES</Text>
            <Image
              style={{position:'absolute',right:15,top:20}}
              source={images.Arrow_Right}
            />
          </View>
        </TouchableHighlight>
      </View>
      <View style={{borderTopWidth:1,borderTopColor:common.grayColor,bottom:0}}>
      </View>

      <View style={{marginHorizontal:10,bottom:10}}>
        <View>
           <View style={{flexDirection:'row',marginTop:20,height:50}}>
               <TouchableHighlight  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flex:0.5,marginRight:5}]}>
                 <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>REJECT</Text>
               </TouchableHighlight>

               <TouchableHighlight onPress={() => navigate('SetAppointment')}  underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,flex:0.5}]}>
                 <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>ACCEPT</Text>
               </TouchableHighlight>
           </View>
         </View>
       </View>




      </View>
    )
  }
  //************************************** Render end*****************************//
};
