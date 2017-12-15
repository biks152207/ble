const initialState = {
  truckType: []
}
import { GET_TRUCK_TYPE } from './constants';
export default function(state = initialState, actions) {
  switch (actions.type) {
    case GET_TRUCK_TYPE:
      const truckType = actions.payload;
      truckType
      return {
          ...state,
        truckType
      };
      break;
    default:
      return state;
  }
}
