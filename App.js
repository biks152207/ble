import React, {Component} from 'react';
import {Linking,Alert,Platform} from 'react-native';
import AppRoute from './app/index.js';
import { Provider } from 'react-redux';
var codePush = require("react-native-code-push");
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import config from './app/config/config'
import moment from 'moment';
import momentTimezone from 'moment-timezone';
var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;
import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import { AsyncStorage } from 'react-native';

import accessToken from './app/utils/AccessToken';
Mapbox.setAccessToken(accessToken);


// let codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESUME
// }
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL ,updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE };

import configureStore from './app/store/configureStore';
import initialState from './app/store/initialState';
// import codePush from "react-native-code-push";
// let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const store = configureStore(initialState);

class App extends Component {
    constructor(props){
        super(props);

    }
  //   onSyncStatusChange(SyncStatus) {
  //   switch (SyncStatus) {
  //       case SyncStatus.CHECKING_FOR_UPDATE:
  //       Toast.show("CODE PUSH CHECKING_FOR_UPDATE");
  //       console.log("CODE PUSH CHECKING_FOR_UPDATE");
  //           // Show "Checking for update" notification
  //           break;
  //       case SyncStatus.AWAITING_USER_ACTION:
  //       Toast.show("CODE PUSH AWAITING_USER_ACTION");
  //       console.log("CODE PUSH AWAITING_USER_ACTION");
  //
  //           // Show "Checking for update" notification
  //           break;
  //       case SyncStatus.DOWNLOADING_PACKAGE:
  //       Toast.show("CODE PUSH DOWNLOADING_PACKAGE");
  //       console.log("CODE PUSH DOWNLOADING_PACKAGE");
  //
  //           // Show "downloading" notification
  //           break;
  //       case SyncStatus.INSTALLING_UPDATE:
  //       Toast.show("CODE PUSH INSTALLING_UPDATE");
  //       console.log("CODE PUSH INSTALLING_UPDATE");
  //
  //           // Show "installing" notification
  //           break;
  //   }
  // }
  // onError(error) {
  //   Toast.show("An error occurred. " + error);
  //   console.log("An error occurred. " + error);
  // }
  //
  // onDownloadProgress(downloadProgress) {
  //   if (downloadProgress) {
  //     Toast.show("Downloading " + downloadProgress.receivedBytes + " of " + JSON.stringify(downloadProgress));
  //     if(downloadProgress.receivedBytes>=downloadProgress.totalBytes){
  //       Toast.show("App updated and restarted");
  //
  //       codePush.restartApp()
  //     }
  //       console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress)
  //   }
  // }
componentWillMount(){
  config.defaultMobileTimezone=moment.tz.guess();
}
    componentDidMount() {
      // // codePush.sync(codePushOptions);
      // codePush.sync({ updateDialog: true }, this.onSyncStatusChange, this.onDownloadProgress, this.onError);
      Crashlytics.setUserName('dharmesh');

      Crashlytics.setUserEmail('dbkhunt@email.com');
      // Forces a native crash for testing
      if(Platform.OS == 'ios'){
           // Record a non-fatal JS error only on iOS
           Crashlytics.recordError('App crashed...:(');
         }else{
           // Record a non-fatal JS error only on Android
           Crashlytics.logException('App crashed...:(');
         }


        axios({"method":"GET",
        "url":"http://carreto.pt/tools/android-store-version/?package=com.axle"})
        .then((result)=>{
          if(result.data && result.data.version && result.data.version!=config.ANDROID_APP_VERSION_NAME)
          {
              Alert.alert(
              'Update',
              'Newer Version is available',
              [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'C?ancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'UPDATE', onPress: () => Linking.openURL("https://play.google.com/store/apps/details?id=com.axle")},
              ],
              { cancelable: false }
            )
          }


        })
        .catch((error)=>{
        })


      // Linking.openURL("https://play.google.com/store/apps/details?id=com.axle");
      codePush.sync({ updateDialog: true },
        (status) => {
            switch (status) {
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                Toast.show('DOWNLOADING APP')
                    // Show "downloading" modal
                    break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                Toast.show('INSTALLING APP')

                    // Hide "downloading" modal
                    break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                    // Toast.show('APP INSTALLED')
                    codePush.allowRestart();
                    codePush.restartApp()
                        // Hide "downloading" modal
                        break;
            }
        },
        ({ receivedBytes, totalBytes, }) => {
          /* Update download modal progress */
          if(receivedBytes>=totalBytes){
            Toast.show("APP DOWNLOADED");

          }
        }
      );
    }

    render(){
        return (<Provider store={store}>
                    <AppRoute />
                </Provider>);
    }
}

App = codePush(codePushOptions)(App);
module.exports = App;
