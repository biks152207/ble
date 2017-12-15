import { AsyncStorage } from 'react-native';
import moment from 'moment';
import stateData from './state.json';
import timestampNow from 'performance-now'
import config from './../config/config';
import { HTTP } from './HTTP';
import Toast from 'react-native-simple-toast';
import axios from 'axios';


const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${config.MAP_BOX}`;
console.log('api url***************************', apiUrl);

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

export function ConvertDate(dateData) {
  const result = new Date(dateData);
  return result.toLocaleString();
}

export async function getItem(key) {
  const response = await AsyncStorage.getItem(key);
  return response;
}

export function getDistanceFromLatLonInMile(lat1,lon1,lat2,lon2) {

  const deg2rad = function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  var R = 3959; // Radius of the earth in mile
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in mile
  return d;
}

export function getMonth(dateData) {
  const monthInt = new Date(dateData).getMonth();
  return months[monthInt];
}

export function getMonthNumber(dateData) {
  let convertedMonth = new Date(dateData).getMonth().toString();
  if (convertedMonth.length == 1) {
    convertedMonth = `0${convertedMonth}`
  }
  return convertedMonth;
}

export function getDay(dateData) {
  return new Date(dateData).getDate();
}

export function getYear(dateData) {
  return new Date(dateData).getFullYear();
}

export function getHr(dateData) {
  return moment(dateData).format('hh:mm a');
}

export function getState() {
  return stateData.state;
}

export function throttle(func, wait, ctx, immediate = true) {
      let timeoutRefId;
      let args;
      let context;
      let timestamp;
      let result;

      const later = () => {
        const last = timestampNow() - timestamp;

        if (last < wait && last >= 0) {
          timeoutRefId = setTimeout(later, wait - last);
        } else {
          timeoutRefId = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeoutRefId) context = args = null;
          }
        }
      };

      return () => {
        context = ctx || this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        timestamp = timestampNow();
        const callNow = immediate && !timeoutRefId;
        if (!timeoutRefId) timeoutRefId = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    }

export async function searchPlaces(searchTerm) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?country=us&access_token=${config.MAP_BOX}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
}

export function updateDriverLocation(location) {
 const data = {
   currentLocationLatitude: location.coords.latitude,
   currentLocationLongitude: location.coords.longitude,
 }
 console.log('trying to update the location',  data);
 AsyncStorage.getItem('@Axle:token')
     .then((token) => {
       HTTP('put', '/driver/updateLocation', data, {authorization: "Bearer "+token})
         .then((response) => {
           console.log('update location........', response);
         })
       })
}

export function showToast(msg) {
  Toast.show(msg, Toast.LONG);
}

export function getPlace(resolve) {
  let latlng='';
  navigator.geolocation.getCurrentPosition((position) => {
     latlng=position.coords.longitude+','+position.coords.latitude;
     let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng}.json?access_token=${config.MAP_BOX}`;
     axios({
       method: 'get',
       url: url
     })
       .then((result) => {
         resolve(result)
       })
       .catch((error) => {
         reject(error);
       });
   },
   (error) => {},
   {timeout: 20000, maximumAge: 1000}
 );

}

export const driverStatus = {
  ON: 'ON Duty',
  OFF: 'OFF Duty',
  SL: 'Sleeper Berth',
  D: 'Driving'
}

export function titleDate(date) {
  return moment(date).format('dddd MMM DD');
}

export function calculateTotalTymebByStatusOfLog(startTime, endtime){
  let calcTime = '00:00';
  let difference = moment(endtime).diff(startTime, "minutes");
  let h = Math.floor(difference / 60);
  let m = difference % 60;
  if(m==59){
    h=h+1;
    m=0;
  }
  calcTime = h + 'hr ' + m + 'min';
    return calcTime;
}
export function getOnedayErrors(currentDay, nextDay) {
  let allErrors = [];
  let combinedLog = [];
  let isNeedToConsiderInPrevDay = true;
  var total_DriveHoursInDay = 0;
  var total_OnHoursInDay = 0;
  currentDay.logs.forEach((_log, k) => {
    if ((["ON", "D"]).indexOf(_log.status) > -1) {
      _log['combinedStatus'] = 'ON-D';
    } else {
      _log['combinedStatus'] = 'OFF-SL';
    }
    combinedLog.push(_log);
  })
  if (nextDay && nextDay.logs) {

    nextDay.logs.forEach((_log, k) => {

      let lastAddedLog = combinedLog[combinedLog.length - 1]
      if ((["ON", "D"]).indexOf(_log.status) > -1) {
        _log['combinedStatus'] = 'ON-D';
      } else {
        _log['combinedStatus'] = 'OFF-SL';
      }
      if(_log.combinedStatus==lastAddedLog.combinedStatus){
        combinedLog.push(_log);
      }
    })
  }

  let consiCutiveON_D_Hours = 0;
  let partialOFFSLBreak=0;

  combinedLog.forEach((log, k) => {
    let endDateTime = moment(log.day).tz("UTC").endOf('day')._d;
    if (log.day == moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()) {
      endDateTime = new Date();
    }
    let duration = moment(log.timeEnd || endDateTime).diff(log.timeStart, "minutes");
    if (log.combinedStatus == "ON-D") {
      consiCutiveON_D_Hours = consiCutiveON_D_Hours + duration
    } else {
      partialOFFSLBreak+=duration
      if (partialOFFSLBreak >= 30) {
        consiCutiveON_D_Hours = 0;
        partialOFFSLBreak=0
      }
    }
    if (consiCutiveON_D_Hours > 8 * 60) {
      allErrors.push('Break Limit Exceeded')
    }
  })

  combinedLog.forEach((_log, k) => {
    let endDateTime = moment(_log.day).tz("UTC").endOf('day')._d;
    if (_log.day == moment().add('minutes',moment().utcOffset()).tz("UTC").startOf('day').toISOString()) {
      endDateTime = new Date();
    }
    let duration = moment(_log.timeEnd || endDateTime).diff(_log.timeStart, "minutes");
    if (_log.status == "ON") {
      total_OnHoursInDay += duration;
    }
    if (_log.status == "D") {
      total_DriveHoursInDay += duration;
    }
  })

  if (total_DriveHoursInDay > 11 * 60) {
    allErrors.push('Exceeded 11 Hours Driving Limit')
  }
  if ((total_OnHoursInDay + total_DriveHoursInDay) > 14 * 60) {
    allErrors.push('Exceeded 14 Hours Shift Limit')
  }
  if(currentDay.day != moment().tz("UTC").startOf('day').toISOString()){
    if(currentDay.reviewLogs == undefined){
    allErrors.push('Review Logs Form is not filled up')
  }
  else{
    if(currentDay.reviewLogs.signature == undefined){
      allErrors.push('Logs are not Signed')
    }
  }
}
  var uniqueErrors = allErrors.filter((v, i, a) => a.indexOf(v) === i);
  return uniqueErrors;
}
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
