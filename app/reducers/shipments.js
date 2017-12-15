
/* Actions */
import {
    GET_ALL_AVAILABLE_SHIPMENTS_REQUEST,
    GET_ALL_AVAILABLE_SHIPMENTS_SUCCESS,
    GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
    SELECT_SHIPMENT,
    ACCEPT_SHIPMENT_SUCCESS,
    ACCEPT_SHIPMENT_FAIL,
    SET_SEARCH_QUERY,
    SEARCH_ALL_AVAILABLE_SHIPMENTS_SUCCESS,
    ADD_SHIPMENT_FOR_ACCEPTANCE,
    CLEAR_SHIPMENT,
    CLEAR_SEARCH_QUERY,
    CLEAR_SELECTED,
    GET_SHIPMENT_BY_ID,
    CLEAR_ASSIGNED_SHIPMENT,
    CLEAR_ALL_QUERY,

    DRIVER_GET_LIVE_SHIPMENTS_REQUEST,
    DRIVER_GET_LIVE_SHIPMENTS_SUCCESS,
    DRIVER_GET_LIVE_SHIPMENTS_FAIL,

    DRIVER_GET_UPCOMING_SHIPMENTS_REQUEST,
    DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS,
    DRIVER_GET_UPCOMING_SHIPMENTS_FAIL,

    DRIVER_GET_PAST_SHIPMENTS_REQUEST,
    DRIVER_GET_PAST_SHIPMENTS_SUCCESS,
    DRIVER_GET_PAST_SHIPMENTS_FAIL,

    DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_SUCCESS,
    DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_FAIL

} from './../constants/actionTypes';

const shipment_reducer = (state = {}, action) => {
    switch(action.type){
        case GET_ALL_AVAILABLE_SHIPMENTS_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    count: action.data ?  action.data.count: 0,
                    Shipment: action.data ? state.Shipment.concat(action.data.Shipment): []
                }
            );
        case CLEAR_SEARCH_QUERY:
          return Object.assign(
            {},
            state,
            {
              Shipment: [],
              count: 0,
              searchQuery: null
            }
          )

        case CLEAR_ALL_QUERY:
          return Object.assign(
              {},
              state,
              {
                  searchQuery: {}
              }
          );

        case CLEAR_ASSIGNED_SHIPMENT:
          let newShipment = state.Shipment.filter((shipment) => shipment._id !== action.payload);
          return Object.assign(
            {},
            state,
            {
              Shipment:newShipment
            }
          )
        case GET_SHIPMENT_BY_ID:
          let Shipment = state.Shipment.slice();
          Shipment.unshift(action.payload.data[0]);
          return Object.assign(
            {},
            state,
            {
              Shipment
            }
          )
        case CLEAR_SHIPMENT:
          return Object.assign(
            {},
            state,
            {
              count: 0,
              Shipment:[]
            }
          )
          case CLEAR_SELECTED:
          return Object.assign(
              {},
              state,
              {
                  selectedShipment: {}
              }
          );
        case GET_ALL_AVAILABLE_SHIPMENTS_FAIL:
            // TODO: some alert may be
            return state;
        case SELECT_SHIPMENT:
            console.log("SELECT_SHIPMENT");
            return Object.assign(
                {},
                state,
                {
                    selectedShipment: action.data.shipment
                }
            );
        case ACCEPT_SHIPMENT_SUCCESS:
            console.log("ACCEPT_SHIPMENT_SUCCESS: ", action.data);
            // Remove shipment from available shipment
            return Object.assign(
                {},
                state,
                {
                    Shipment: state.Shipment.filter(element => {
                        return element._id !== action.data[0]._id
                    })
                },
                {
                  accepted: action.data[0]
                }
            );
            return state;
        case ACCEPT_SHIPMENT_FAIL:
            console.log("ACCEPT_SHIPMENT_FAIL: ");
            // TODO: some alert may be
            return state;
        case SET_SEARCH_QUERY:
            console.log("SET_SEARCH_QUERY: ", action.data);
            return Object.assign(
                {},
                state,
                {
                    searchQuery: Object.assign({},state.searchQuery, action.data)
                }
            );
            return state;
        case SEARCH_ALL_AVAILABLE_SHIPMENTS_SUCCESS:
            return Object.assign(
              {},
              state,
              {
                  count: action.data.count,
                  Shipment: action.data.Shipment
              },
            )
            break;
        case ADD_SHIPMENT_FOR_ACCEPTANCE:
          return Object.assign(
            {},
            state,
            {
              id_for_acceptance: action.payload
            }
          )

          case DRIVER_GET_LIVE_SHIPMENTS_SUCCESS:
              console.log("DRIVER_GET_LIVE_SHIPMENTS_SUCCESS");
              return Object.assign(
                  {},
                  state,
                  {
                      count: action.data.count,
                      Shipment: action.data.Shipment
                  }
              );
          case DRIVER_GET_LIVE_SHIPMENTS_FAIL:
              console.log("DRIVER_GET_LIVE_SHIPMENTS_FAIL");
              // TODO: some alert may be
              return state;

              case DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS:
                  console.log("DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS");

                  return Object.assign(
                      {},
                      state,
                      {
                          count: action.data && action.data.count ? action.data.count: 0,
                          Shipment: action.data ? state.Shipment.concat(action.data.Shipment): []
                      }
                  );
              case DRIVER_GET_UPCOMING_SHIPMENTS_FAIL:
                  console.log("DRIVER_GET_UPCOMING_SHIPMENTS_FAIL");
                  // TODO: some alert may be
                  return state;

                  case DRIVER_GET_PAST_SHIPMENTS_SUCCESS:
                      console.log("DRIVER_GET_PAST_SHIPMENTS_SUCCESS");

                      return Object.assign(
                          {},
                          state,
                          {
                              count: action.data.count,
                              Shipment: action.data ? state.Shipment.concat(action.data.Shipment): []
                          }
                      );
                  case DRIVER_GET_PAST_SHIPMENTS_FAIL:
                      console.log("DRIVER_GET_PAST_SHIPMENTS_FAIL");
                      // TODO: some alert may be
                      return state;
                      case DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_SUCCESS:
                          console.log("DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_SUCCESS");

                          return Object.assign(
                              {},
                              state,
                              {
                                  upcomingShipmentCount:action.data.count
                              }
                          );
                      case DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_FAIL:
                          console.log("DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_FAIL");
                          // TODO: some alert may be
                          return state;
        default:
            return state;
    }
}

export default shipment_reducer;
