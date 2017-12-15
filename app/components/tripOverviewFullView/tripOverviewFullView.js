import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

let self;
let window = Dimensions.get('window');

class TripOverviewFullView extends Component {
  constructor(props) {
    super(props);
    self = this;


    this.state = {

  }
}
dateFormat(date){
  if(date){
    return moment(date).format('MMM D YYYY')
  }else {
    return ''
  }
}
fromTime(date){
  if(date){
    return moment(date).format('LT')
  }else {
    return ''
  }
}
toTime(date){
  if(date){
    return moment(date).format('LT')
  }else {
    return ''
  }
}
mobileNumberTextInput(value){
  if (value.length < 16) {
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1 - $2");
  }
  else if (value.length == 16) {
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d\d\d)(\d)/g, "($1) $2");
      value = value.replace(/(\d{3})(\d)/, "$1 - $2");
  }
  else {
      value = value.substring(0, value.length - 1);
  }
  return value
}
currencyFormater(num){
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

 render() {
    let { dataTripDetails } = this.props;

   return (
      <TouchableHighlight>
      <View style={styles.ScreenContainer}>

     <View style={[{marginTop : 19},commonStyle.contentRight]}>


      </View>

     <View style={{flexDirection :'row'}}>
        <View style={{width: 61}}>
        <Grid style={{}}>
          <Col>
            <View style={styles.dot}/>
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.dotted_line}
              style={styles.dotted_line}
            />
            <Image
              source={images.pin}
              style={styles.pin}
            />
          </Col>

        </Grid>

        </View>
        <View>
          <View>
            <Text style={[commonStyle.fontSize_18, styles.CityAndState,{marginTop :3}]}>{`${dataTripDetails.pickupCity} , ${dataTripDetails.pickupState}`}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.pickupCompanyAddress}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.dateFormat(dataTripDetails.pickupDateTimeFrom) + " • " + this.fromTime(dataTripDetails.pickupDateTimeFrom)+"-"+this.fromTime(dataTripDetails.pickupDateTimeTo)}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.mobileNumberTextInput(dataTripDetails.pickupMobile)}</Text>
          </View>
          <View style={{marginTop :15}}>
            <Text style={[commonStyle.fontSize_18,styles.CityAndState,{marginTop :3}]}>{`${dataTripDetails.deliveryCity} , ${dataTripDetails.deliveryState}`}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.deliveryCompanyAddress}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.dateFormat(dataTripDetails.deliveryDateTimeFrom) + " • " + this.fromTime(dataTripDetails.deliveryDateTimeFrom)+"-"+this.fromTime(dataTripDetails.deliveryDateTimeTo)}</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.mobileNumberTextInput(dataTripDetails.deliveryMobile)}</Text>

          </View>
        </View>
      </View>

     <View style={{marginTop :20,borderTopWidth : 1, borderTopColor : common.grayColor}}>
        <View style={{flexDirection : 'row',marginTop :25,paddingLeft : 30}}>
{!this.props.user.driver.carrier &&
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12,styles.subDetails]}>PRICE</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>$ {dataTripDetails.lowPrice}</Text>
            </View>
          }
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12,styles.subDetails]}>DISTANCE</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.distance} mi</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[commonStyle.fontSize_12, styles.subDetails]}>COMMODITY</Text>
              <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.loadingDetails.commodity}</Text>
            </View>
        </View>

        <View style={{flexDirection : 'row',marginTop :15,paddingLeft : 30}}>

            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12, styles.subDetails]}>REFERENCE #</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.customId || "NA"}</Text>
            </View>
            <View style={{flex:1}}>
            </View>
        </View>
        <View style={{flexDirection : 'row',marginTop :15,paddingLeft : 30}}>
            <View style={{flex:1}}>
              <Text style={[commonStyle.fontSize_12, styles.subDetails]}>WEIGHT</Text>
              <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{this.currencyFormater(dataTripDetails.loadingDetails.weight)} lbs</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12,styles.subDetails]}>PALLETS</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.loadingDetails.pallets}</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={[commonStyle.fontSize_12,styles.subDetails]}>TRAILER</Text>
            <Text style={[commonStyle.fontSize_14,{fontWeight : 'normal', color : '#58595B'}]}>{dataTripDetails.truckType} {dataTripDetails.truckType==="REEFER"?dataTripDetails.loadingDetails.temperature?dataTripDetails.loadingDetails.temperature +'°F':0+'°F ':null}</Text>
            </View>
        </View>
      </View>

     </View>
      </TouchableHighlight>
    )
  }
}

/* Map state to props */
function mapStateToProps(state){
    return {
        user: state.auth.user,
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//
//         }, dispatch)
//     };
// }

/* Connect Component with Redux */
export default connect(mapStateToProps, null)(TripOverviewFullView)
