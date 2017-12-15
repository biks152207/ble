import {UPLOAD_DOCUMENT } from '../constants';
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

function*  DocumentInterceptor (action) {
  const token = yield call(getItem, '@Axle:token');
  const payload = action.payload;
  console.log('payload',payload);
  let formData=new FormData();
  formData.append('shipmentId',payload.shipmentId);
  formData.append('proofOfDelivery',payload.proofOfDelivery);
  // payload.shipmentId = '597b06606d943b15955ff5ae';
  const response = yield call(HTTP, 'put', `/driver/uploadProofOfDelivery`, formData, {authorization: "Bearer "+token ,'Content-Type':`multipart/form-data; boundary=${formData._boundary}`});
  console.log(response);
  if (response)
  {
    
    yield put({type: "UPLOAD_DOCUMENT", payload: response.data.data});

  }
}

export default DocumentInterceptor;
