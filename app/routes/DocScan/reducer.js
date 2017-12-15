const initialState = {
  document: {}
}
import { UPLOAD_DOCUMENT } from '../constants';
export default function(state = initialState, actions) {
  switch (actions.type) {
    case UPLOAD_DOCUMENT:
      return {
          ...state,
          document: Object.assign({}, actions.payload)
      };
      break;
    default:
      return state;
  }
}
