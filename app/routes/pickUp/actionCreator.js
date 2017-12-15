import {
  SEND_CARRIER_REQUEST
} from '../constants';

export function sendRequest(payload) {
  return {
    type: SEND_CARRIER_REQUEST,
    payload
  }
}
