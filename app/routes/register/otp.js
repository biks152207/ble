import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions, Keyboard,StyleSheet ,TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { AsyncStorage } from 'react-native';
import { otpRequest ,getUserDetails } from './../../actions/auth';
import {bindActionCreators} from 'redux';
import { connect } from  'react-redux';

let self;
let window = Dimensions.get("window");
const TextStyle = StyleSheet.create({
  hiddenField: {
    height: 0,
    // color: Colors.clear,
  },
  fieldPart: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallMargin: {
    marginTop: 5,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    height: 53,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.knockiGrey,
  },
  inputHighlight: {
    borderBottomWidth: 3,
    // borderBottomColor: Colors.knockiBlue,
  },
  inputError: {
    borderBottomWidth: 3,
    // borderBottomColor: Colors.errorValidation,
  },
  mainView: {
    flexDirection: 'row',
  },
  errorLabel: {
    fontSize: 12,
    // color: Colors.errorValidation,
  },
});

class Otp extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    self= this;
    this.state = {
      // first : '',
      // second : '',
      // third : '',
      // fourth : '',
      // // fifth : ''

      code1: '',
     code2: '',
     code3: '',
     code4: '',
     highlightNumber: 0,
     text: '',
    }

  }
  focus() {
    this.field.focus();
  }
  clearState() {
    this.setState({
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      highlightNumber: 0,
      text: '',
    });
}


  onFinish = () => {
let self=this;
    let data = {
      OTPCode:this.state.text
    };

     AsyncStorage.getItem('@Axle:unverfiedToken')
      .then((value) => {
          if(value)
            {
               (self.props.actions.otpRequest(value,data))
                .then(function(response){
                  if(response){
                    AsyncStorage.setItem('@Axle:token',value).then(()=>{
                      self.props.actions.getUserDetails(value).then(()=>{
                        AsyncStorage.removeItem('@Axle:unverfiedToken');
                        self.props.navigation.navigate('PickUpHome');
                      })

                    });
                  }


                })
                .catch(function(){
                    // TODO: any processing
                })

            }
      })
        // navigate('SignupPending')
  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    const { first, second, third, fourth, fifth } = this.state;
    return (
      <View style={commonStyle.container}>
      <View style={[commonStyle.headerBarHeight]}>
        <View style={{}}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :22},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Back_Arrow}
          />
        </TouchableHighlight>
        </View>
      </View>
        <View style={commonStyle.subContainer}>


            <View style={[commonStyle.contentCenter,{paddingHorizontal : 50}]}>
              <Image
                style={{marginBottom : 15}}
                source={images.Axle_NoTires}
              />
                <Text style={[commonStyle.fontSize_16,{textAlign : 'center'}]}>Please enter the one-time password sent to your mobile</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => { this.focus(); }}>
                    <View>
                      <TextInput
                        maxLength={4}
                        autoFocus
                        style={TextStyle.hiddenField}
                        keyboardType="numeric"
                        value={this.state.text}
                        underlineColorAndroid="transparent"

                        ref={(c) => { this.field = c; }}
                        onChangeText={(text) => {

                          const chars = text.split("");

                          this.setState({
                            code1: chars[0],
                            code2: chars[1],
                            code3: chars[2],
                            code4: chars[3],
                            highlightNumber: text.length + 1,
                            text,
                          });
                          if (text.length === 4) {
                            Keyboard.dismiss()
                            // this.props.codeEntered(text);
                          }
                        }}
                      />
                      <View style={TextStyle.mainView}>
                        <View style={[TextStyle.input, this.state.highlightNumber <= 1 ? TextStyle.inputHighlight : {}, this.props.errorText ? TextStyle.inputError : {}]}>
                          <Text style={TextStyle.text}>{this.state.code1}</Text>
                        </View>
                        <View style={[TextStyle.input, this.state.highlightNumber === 2 ? TextStyle.inputHighlight : {}, this.props.errorText ? TextStyle.inputError : {}]}>
                          <Text style={TextStyle.text}>{this.state.code2}</Text>
                        </View>
                        <View style={[TextStyle.input, this.state.highlightNumber === 3 ? TextStyle.inputHighlight : {}, this.props.errorText ? TextStyle.inputError : {}]}>
                          <Text style={TextStyle.text}>{this.state.code3}</Text>
                        </View>
                        <View style={[TextStyle.input, this.state.highlightNumber >= 4 ? TextStyle.inputHighlight : {}, this.props.errorText ? TextStyle.inputError : {}]}>
                          <Text style={TextStyle.text}>{this.state.code4}</Text>
                        </View>
                      </View>

                    </View>
                  </TouchableWithoutFeedback>



              {
                this.state.text.length == 4
                ?<TouchableHighlight onPress={() => this.onFinish()} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,position : 'absolute', bottom : 20}]}>
                  <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>FINISH</Text>
                </TouchableHighlight>
                :<TouchableHighlight underlayColor={common.tuchableUnderlayGrayColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.grayColor,position : 'absolute', bottom : 20}]}>
                  <Text style={[commonStyle.fontSize_14,styles.fontProximaNovaBold]}>FINISH</Text>
                </TouchableHighlight>
              }


        </View>


      </View>
    )
  }
  //************************************** Render end*****************************//
};

function mapStateToProps(state){
    console.log("STATE", state.auth.token)
    return {
        auth: state.auth,
        token: state.auth.token,
        data: state.LoginReducer
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            otpRequest,
            getUserDetails

        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
