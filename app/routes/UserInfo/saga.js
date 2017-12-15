import {UPDATE_USER } from '../constants';
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

function*  UserInfoInterceptor (action) {
  const token = yield call(getItem, '@Axle:token');
  let formData = new FormData();
  if(action.payload.email)
  { formData.append("email", action.payload.email);}

  if(action.payload.newMobile)
  {formData.append("newMobile", action.payload.newMobile);}

  formData.append("lastName", action.payload.lastName);
  formData.append("name", action.payload.name);

  if(action.payload.MCNumber)
  {formData.append("MCNumber", action.payload.MCNumber);}
  if(action.payload.company_name)
  {formData.append("company_name", action.payload.company_name);}
  if(action.payload.truckType && action.payload.truckType.length>0)
  {formData.append("truckType",  JSON.stringify(action.payload.truckType));}

  if(action.payload.pickup_prefferred && action.payload.pickup_prefferred.length>0)
  {formData.append("pickup_prefferred",  JSON.stringify(action.payload.pickup_prefferred));}
  if(action.payload.delivery_prefferred && action.payload.delivery_prefferred.length>0)
  {formData.append("delivery_prefferred",  JSON.stringify(action.payload.delivery_prefferred));}

  if(action.payload.certificateOfInsurance){
    formData.append("certificateOfInsurance", action.payload.certificateOfInsurance);
  }
  if(action.payload.authorityLetter){
    formData.append("authorityLetter", action.payload.authorityLetter);
  }
  if(action.payload.w9){
    formData.append("w9", action.payload.w9);
  }
  if(action.payload.homeTerminalTimezone){
    formData.append("homeTerminalTimezone", action.payload.homeTerminalTimezone);

  }

  const response = yield call(HTTP, 'put', '/driver/update_profile', formData, {authorization: "Bearer "+token})
  if (response.status === 200) {
    AlertInfo('Profile Updated')
    const res = yield call(HTTP, 'get', '/getUser', null, {authorization: "Bearer "+token})
    yield put({
        type: 'GETUSER_SUCCESS',
        data: res.data.data
    });
  } else {

    AlertInfo(response.data.message);
  }
  // const response = yield call(fetch, url, { method: 'PUT', body: action.payload, headers:{
  //   'Content-Type': 'multipart/form-data',
  //   'authorization': 'Bearer '
  // } });
  // console.log(response);
}

export default UserInfoInterceptor;
