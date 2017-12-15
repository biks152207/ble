/* eslint-disable global-require */

import { Platform } from 'react-native';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
let config = {};

if(__DEV__){
  config = {
    // API_URL: "http://192.168.0.100:3002",

    API_URL: "http://54.175.27.68",

      // API_URL: "http://34.235.167.56",
      // API_URL: "http://54.172.184.114",
      // API_URL: "http://54.161.33.6",
      // API_URL: "http://localhost:8007",
      DEVICE_TYPE: (Platform.OS === 'ios')?'IOS':'ANDROID',
      MAP_BOX: 'pk.eyJ1IjoiYmlrcmFtYmFzbmV0IiwiYSI6ImNqNXZhMjZtMDIzb3MzM3M2dHBpM3Z2Nm8ifQ.axKcLyOqjTsIyQ17MtnoeQ',
      ANDROID_APP_VERSION_NAME:"1.13",
      defaultMobileTimezone:moment.tz.guess()
    };
}else{
  config = {
    // API_URL: "http://192.168.0.100:3002",

    API_URL: "http://54.175.27.68",

    // API_URL: "http://192.168.0.115:5000",

      // API_URL: "http://34.201.100.188",
      // API_URL: "http://34.201.100.188",
      // API_URL: "http://54.172.184.114",
      // API_URL: "http://54.161.33.6",
      // API_URL: "https://api.axle.network",

      DEVICE_TYPE: (Platform.OS === 'ios')?'IOS':'ANDROID',
      MAP_BOX: 'pk.eyJ1IjoiYmlrcmFtYmFzbmV0IiwiYSI6ImNqNXZhMjZtMDIzb3MzM3M2dHBpM3Z2Nm8ifQ.axKcLyOqjTsIyQ17MtnoeQ',
      ANDROID_APP_VERSION_NAME:"1.13",
      defaultMobileTimezone:moment.tz.guess()
    };
}

export default config;
