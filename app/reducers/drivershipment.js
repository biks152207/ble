
/* Actions */
import {

  DRIVER_GET_LIVE_SHIPMENTS_SUCCESS,
  DRIVER_GET_LIVE_SHIPMENTS_FAIL,


  DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS,
  DRIVER_GET_UPCOMING_SHIPMENTS_FAIL,


  DRIVER_GET_PAST_SHIPMENTS_SUCCESS,
  DRIVER_GET_PAST_SHIPMENTS_FAIL,
} from './../constants/actionTypes';

const shipment_reducer = (state = {}, action) => {
    switch(action.type){
        case DRIVER_GET_LIVE_SHIPMENTS_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    count: action.data.count,
                    Shipment: action.data.Shipment
                }
            );
        case DRIVER_GET_LIVE_SHIPMENTS_FAIL:
            // TODO: some alert may be
            return state;

            case DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS:
                return Object.assign(
                    {},
                    state,
                    {
                        count: action.data.count,
                        Shipment: action.data.Shipment
                    }
                );
            case DRIVER_GET_UPCOMING_SHIPMENTS_FAIL:
                // TODO: some alert may be
                return state;

                case DRIVER_GET_PAST_SHIPMENTS_SUCCESS:
                    return Object.assign(
                        {},
                        state,
                        {
                            count: action.data.count,
                            Shipment: action.data.Shipment
                        }
                    );
                case DRIVER_GET_PAST_SHIPMENTS_FAIL:
                    // TODO: some alert may be
                    return state;


        default:
            return state;
    }
}

export default shipment_reducer;
