import {SEND_CARRIER_REQUEST } from '../constants';
import {
  put,
  takeEvery,
  call,
  fork
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { getItem } from '../../utils/utility';
import { HTTP } from '../../utils/HTTP';
import { AlertInfo } from '../../utils/AlertInfo';

function*  PickUpInterceptor (action) {

  const token = yield call(getItem, '@Axle:token');
  const response = yield call(HTTP, 'put', `/carrier/notify/${action.payload.shipper_Id}`, {}, {authorization: "Bearer "+token})
  if (response.status == 200) {
      AlertInfo(`The customer has been notified that you would like to move this load. Please wait for approval.     name:${action.payload.shipment.shipperName} , Mobile: ${action.payload.shipment.shipperMobile} ,MCNumber: ${action.payload.shipment.shipper.shipper.MCNumber} ` )


  } else {
    AlertInfo(response.data.message)

  }
  

  // const response = yield call(fetch, url, { method: 'PUT', body: action.payload, headers:{
  //   'Content-Type': 'multipart/form-data',
  //   'authorization': 'Bearer '
  // } });
  // console.log(response);
}

export default PickUpInterceptor;
