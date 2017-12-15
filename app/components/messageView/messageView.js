import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

let self;
let window = Dimensions.get("window");
class MessageView extends Component {
  constructor(props){
    super(props);

    self= this;

    this.state = {

    }


  }

  render(){
    let {data} = this.props;
    self=this;
    
    return (

        <View>
        <View style={{marginBottom:30}}>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View stye={{flex:1}}>
                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Message:</Text>
              </View>
              <View stye={{flex:1}}>
                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>   {data.specialComment}</Text>
              </View>
            </View>
            {['EXPIRED', 'CANCELLED_BY_ADMIN', 'TIMEOUT', 'CANCELLED_BY_SHIPPER', 'CANCELLED_BY_CARRIER', 'CANCELLED_BY_DRIVER', 'PENDING'].indexOf(data.currentStatus) === -1
            &&
              <View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>PO #:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>  {data.poNumber}</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Bill of Lading Number:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>  {data.bolNumber}</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Pickup Number:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>  {data.pickupNumber}</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Delivery Number:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>  {data.deliveryNumber}</Text>
                </View>
              </View>
              </View>

            }
            <View style={{flex:1, flexDirection: 'row'}}>
              <View stye={{flex:1}}>
                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Company Name:</Text>
              </View>
              <View stye={{flex:1}}>
                <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>   {data.shipper.shipper.company_name  }</Text>
              </View>
            </View>
            {!this.props.user.driver.carrier  &&
              <View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Email:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>   {data.shipper.email  }</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Bold'}}>Phone:</Text>
                </View>
                <View stye={{flex:1}}>
                  <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular'}}>   {data.shipper.shipper.mobile  }</Text>
                </View>
              </View>
              </View>
            }

          <View style={[styles.flexDirectionRow,{paddingTop:5}]}>
              <Text style={[styles.message_FontSize_12]}>{data.time}</Text>
          </View>

        </View>
        {/*
          <View>
          <View style={{marginBottom:30}}>
              <View>
                  <Text style={[styles.message_FontSize_12,{fontWeight:'600'}]}>
                    {data.subject}
                  </Text>
              </View>
              <View style={{paddingTop:5}}>
                  <Text style={[styles.message_FontSize_14]}>
                  {data.message}
                  </Text>
              </View>

            <View style={[styles.flexDirectionRow,{paddingTop:5}]}>
                <Text style={[styles.message_FontSize_12]}>{data.time}</Text>
            </View>

          </View>

          </View>
          */}
    </View>

    )
  }
}
function mapStateToProps(state){
    return {
        user: state.auth.user,
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             getAllAvailableShipmentRequest,
//             selectShipment
//         }, dispatch)
//     };
// }

function mapStateToProps(state){
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, null)(MessageView);
