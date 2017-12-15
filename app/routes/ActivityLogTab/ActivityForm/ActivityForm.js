import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Modal,
  Picker,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import PercentageCircle from 'react-native-percentage-circle';
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

let window = Dimensions.get("window");

class ActivityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    return(
      <View style={s.Container}>


      </View>

    )
  }
}

const s = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#000000',
  },

})


/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
// function mapDispatchToProps(dispatch) {
//
//     return {
//         actions: bindActionCreators({
//             getUserDetails
//         }, dispatch)
//     };
// }


export default connect(mapStateToProps, null)(ActivityForm);
