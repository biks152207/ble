import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import {getUpcomingShipmentByDriver} from './../../actions/drivershipment';

let self;
let window = Dimensions.get("window");

class LoadCompleted extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    self= this;
    this.state = {

    }

  }
  componentWillMount(){
    const { navigate } = this.props.navigation;

    this.props.actions.getUpcomingShipmentByDriver({},navigate)
  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    const {shipments}=this.props;
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight90,commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => navigate('Shipments')} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :35},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Hamburger}
          />
        </TouchableHighlight>
        </View>

        <View style={[{flex:1, marginTop :35,marginRight : 24,flexDirection:'row'},commonStyle.contentRight]}>
        <View style={{marginRight:15}}>
            <Text style={[commonStyle.fontSize_20,{color:common.greenColor}]}>{shipments.count} upcoming loads</Text>
        </View>
          <View style={[commonStyle.contentCenter,{marginBottom:3}]}>
              <Image
                style={{}}
                source={images.Clock}
              />
          </View>
        </View>
      </View>

        <View style={commonStyle.subContainer}>

        <View style={[commonStyle.contentCenter,{marginTop:100}]}>
          <Image
          style={{}}
          source={images.Axle_NoTires}
          />
          <View style={{marginTop :19,marginHorizontal :20}}>
            <Text style={[commonStyle.fontSize_20,{textAlign : 'center'}]}>Great Job! </Text>
            <Text style={[commonStyle.fontSize_20,{textAlign : 'center'}]}>You have completed your load.</Text>
          </View>

            <View style={{marginTop:22}}>
                <Image
                style={{}}
                source={images.truck_Icon}
                />
            </View>

        </View>

        </View>
        <TouchableHighlight onPress={()=>{ navigate('Shipments') }} underlayColor={common.tuchableUnderlayGreenColor} style={[commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 10,left:10,height:50,width:window.width-20}]}>
          <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>VIEW LOADS</Text>
        </TouchableHighlight>

      </View>
    )
  }
  //************************************** Render end*****************************//
};
/* Map state to props */
function mapStateToProps(state){
    return {
        shipments: state.shipments,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getUpcomingShipmentByDriver,
          }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(LoadCompleted)
