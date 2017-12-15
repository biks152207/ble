import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  CameraRoll,
  AsyncStorage,
  TouchableOpacity,TouchableHighlight,
  Platform,
  ImageStore
} from 'react-native';
// import { Expo } from 'expo';
import Header from './../../layouts/common/Header/Header.js';
import images from './../../config/images';
import { getSize} from './../../layouts/common/RatioCalculator/ratio';
let window = Dimensions.get("window");
import styles from './styles';
import Loader  from './../../components/loader/loader';
import DocumentScanner from 'react-native-document-scanner';
import { HTTP } from '../../utils/HTTP';
import { AlertInfo } from './../../utils/AlertInfo';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';
import { uploadDocument } from './actionCreator';
import Camera from 'react-native-camera';
import NativeModules from 'NativeModules';
class DocScan extends Component {
  constructor(props) {
    super(props);
    this.state ={
      image: undefined,
      uploading:false,
      capturedImage:undefined
    }
    this.uploadDoc = this.uploadDoc.bind(this);
    this.takePicture =   this.takePicture.bind(this)
  }
  takePicture() {
    
    let self = this;
      const options = {};
      //options.location = ...
      this.camera.capture({metadata: options})
        .then((data) => {
        ImageStore.getBase64ForTag(data.path,(imageBase64) =>
              {
                console.log('getBase64ForTag',imageBase64);
                self.setState({
                  image:imageBase64,
                  capturedImage:data.path
                },()=>{
                  // self.uploadDoc();
                })
              },(e) => {

              });
        })
        .catch(err => console.error(err));
    }

  uploadDoc(){
    let formData=new FormData();
    formData.append('shipmentId',this.props.shipments.selectedShipment._id);
    formData.append('proofOfDelivery',`data:image/jpeg;base64,${this.state.image}`);
    this.setState({uploading:true})
    AsyncStorage.getItem('@Axle:token')
        .then((token) => {
            HTTP('put', `/driver/uploadProofOfDelivery`, formData, {authorization: "Bearer "+token ,'Content-Type':`multipart/form-data; boundary=${formData._boundary}`})
                .then((response) => {
                  this.setState({uploading:false})
                  if(response.data.error){
                    AlertInfo(response.data.message);
                  }else {
                    this.props.scannedImage(response.data.data);
                    this.props.close();

                  }

                })
                .catch(error => {
                  this.setState({uploading:false})


                })
        })

  }
  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={{flex:1}}>
      {this.state.uploading?
        <Loader/>
        :
        <View style={styles.Container}>


          <View style={[{backgroundColor:common.blackColor, height: 70 , flexDirection:'row'}]}>
            <TouchableHighlight onPress={() => {this.props.close()}} underlayColor="transparent" style={[{width:60,alignItems:'center',justifyContent:'center'}]}>
              <Image
                style={{width : 21, height : 18}}
                source={images.Close_White}
              />
            </TouchableHighlight>
            <View style={[{backgroundColor:common.blackColor,height: 50,marginTop :10, justifyContent:'center'}]}>
              <Text style={{color: common.greenColor,fontSize: 20, fontWeight: '500'}}>Scan Doc</Text>
            </View>
          </View>

          <View style={styles.Content}>
              <View style={styles.CameraWrapper}>
              {this.state.image ?
                <Image source={{ uri: `${this.state.capturedImage}`}} resizeMode="contain" style={{flex:1}} />
                :
                Platform.os==="ios"?<DocumentScanner
                    onPictureTaken={data => this.setState({ image: data.image })}
                    overlayColor="rgba(255,130,0, 0.7)"
                    enableTorch={false}
                    brightness={0}
                    saturation={1}
                    contrast={1.1}
                    onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
                    detectionCountBeforeCapture={5}
                    detectionRefreshRateInMS={50}
                    style={{flex:1}}
                  />:
  <View style={styles.CameraWrapper}>
                <Camera
                  ref={(cam) => {
                    this.camera = cam;
                  }}
                  style={{flex:1}}
                  aspect={Camera.constants.Aspect.fill}>

                </Camera>
                <View style={{alignItems:'center'}}>

                <View style={styles.ButtonContainer}>
                  <TouchableHighlight style={styles.SecondButtonContainer} onPress={() =>{this.takePicture()}}>
                    <Text  style={styles.FirstButtonText}>CAPTURE</Text>
                  </TouchableHighlight>

                </View>

</View>
</View>

              }
              </View>
              {/*<TouchableOpacity style={styles.CameraTake} onPress={() => this.setState({image: null})}>
                <Image source={images.Camera} size={styles.Image}/>
              </TouchableOpacity>
              */}
              {this.state.image &&
                <View style={styles.ButtonContainer}>
                  <TouchableHighlight style={styles.FirstButtonContainer} onPress={() =>{this.setState({image:undefined}) }}>
                    <Text  style={styles.FirstButtonText}>RETAKE</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.SecondButtonContainer} onPress={() => {this.uploadDoc()} }>
                    <Text style={styles.SecondButtonText}>SAVE</Text>
                  </TouchableHighlight>
                </View>

              }
          </View>
        </View>
      }
      </View>
    )
  }
}

/* Map state to props */
function mapStateToProps(state){
    return {
        document: state.PODreducer,
        shipments: state.shipments,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            uploadDocument
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DocScan);
