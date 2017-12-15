
/* Actions */
import {
    GET_ACTIVITY_LOG_REQUEST,
    GET_ACTIVITY_LOG_SUCCESS,
    GET_ACTIVITY_LOG_DAY_SUCCESS,
    GET_ACTIVITY_LOG_FAIL,

} from './../constants/actionTypes';
import  './../utils/linq.min.js';


const activity_reducer = (state = {}, action) => {
    switch(action.type){
        case GET_ACTIVITY_LOG_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    count: action.data && action.data.count ?  action.data.count: 0,
                    activityList: action.data ? Enumerable.From(action.data.logInfo).OrderByDescending('$.day').ToArray(): [],
                    driverInfo:action.data ?action.data.userInfo:null,
                    carrierInfo:action.data ?action.data.carrierInfo:null
                }
            );
            case GET_ACTIVITY_LOG_DAY_SUCCESS:
                return Object.assign(
                    {},
                    state,
                    {
                        activityDayLog: action.data &&  action.data.logInfo &&  action.data.logInfo.length>0 ? action.data.logInfo[0]: [],
                        driverInfo:action.data ?action.data.userInfo:null,
                        carrierInfo:action.data ?action.data.carrierInfo:null
                    }
                );
        case GET_ACTIVITY_LOG_FAIL:
          return Object.assign(
            {},
            state,
            {
              activityList: [],
              count: 0,
            }
          )


        default:
            return state;
    }
}

export default activity_reducer;
