import {
  UPLOAD_DOCUMENT
} from '../constants';

export function uploadDocument(payload) {
  return {
    type: UPLOAD_DOCUMENT,
    payload
  }
}
