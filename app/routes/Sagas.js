import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import UserInfoSaga from './UserInfo/saga';
import PickupSaga from './pickUp/saga';
import DocumentInterceptor from './DocScan/saga';

import {
  UPDATE_USER,
  SEND_CARRIER_REQUEST,
  UPLOAD_DOCUMENT
} from './constants';
export default function* rootSaga() {
  yield [
       takeEvery(UPDATE_USER, UserInfoSaga),
       takeEvery(SEND_CARRIER_REQUEST, PickupSaga),
       takeEvery(UPLOAD_DOCUMENT,DocumentInterceptor)
   ];
}
