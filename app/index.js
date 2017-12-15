import React ,{Component} from 'react';
import { Text, View,Alert} from 'react-native';
// import { Font } from 'expo';
import { AppScreen } from './layouts/AppScreen/AppScreen.js';
import   Loader  from './components/loader/loader.js';
import NativeEventEmitter from 'NativeEventEmitter';
// import PushNotification from 'react-native-push-notification';
import BackgroundGeolocation from "react-native-background-geolocation";
var PushNotification= require('react-native-push-notification');

export default class AppRoute extends Component {
    constructor(props){
      super(props);
    //   this.state = {
    //    fontLoaded: false,
    //  }

    }

    componentDidMount() {

      BackgroundGeolocation.configure({
        // Geolocation Config
        desiredAccuracy: 0,
        distanceFilter: 1,
        // Activity Recognition
        stopTimeout: 100,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true,        // <-- Auto start tracking when device is powered-up.

      }, (state) => {
        console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

        if (!state.enabled) {
          // 3. Start tracking!
          BackgroundGeolocation.start(function() {
            console.log("- Start success");
          });
        }else {
          // navigator.geolocation.watchPosition(position => {
          //   console.log('watch posion');
          //   if (self.state.shipment.shipmentID) {
          //     self.publishUpdatedShipment(position.coords, self.state.shipment);
          //   }
          // });
        }
      });
      PushNotification.configure({

       // (optional) Called when Token is generated (iOS and Android)
       onRegister: function(token) {
           console.log( 'TOKEN:', token );
          
           this.setState({'deviceToken':token});

       },

       // (required) Called when a remote or local notification is opened or received
       onNotification: function(notification) {
           console.log( 'NOTIFICATION:', notification );
       },

       // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
       senderID: "YOUR GCM SENDER ID",

       // IOS ONLY (optional): default: all - Permissions to register.
       permissions: {
           alert: true,
           badge: true,
           sound: true
       },

       // Should the initial notification be popped automatically
       // default: true
       popInitialNotification: true,

       /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
       requestPermissions: true,
   });

    }

 //    async componentDidMount() {
 //   await Font.loadAsync({
 //       'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
 //       'ProximaNova-Regular': require('./assets/fonts/ProximaNova-Regular.ttf'),
 //       'ProximaNova-Bold': require('./assets/fonts/ProximaNova-Bold.ttf'),
 //       'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
 //       'Verdana': require('./assets/fonts/Verdana.ttf'),
 //       'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
 //       'Muller-Regular': require('./assets/fonts/muller_regular.ttf'),
 //   });
 //
 //   this.setState({ fontLoaded: true });
 // }


    render(){
      return (
            <AppScreen />
         );
    }
}
