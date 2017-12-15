import {HTTP} from './../utils/HTTP';
import { AsyncStorage } from 'react-native';

import {
    DRIVER_GET_LIVE_SHIPMENTS_REQUEST,
    DRIVER_GET_LIVE_SHIPMENTS_SUCCESS,
    DRIVER_GET_LIVE_SHIPMENTS_FAIL,

    DRIVER_GET_UPCOMING_SHIPMENTS_REQUEST,
    DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS,
    DRIVER_GET_UPCOMING_SHIPMENTS_FAIL,

    DRIVER_GET_PAST_SHIPMENTS_REQUEST,
    DRIVER_GET_PAST_SHIPMENTS_SUCCESS,
    DRIVER_GET_PAST_SHIPMENTS_FAIL,

} from './../constants/actionTypes';

// example action
export function getLiveShipmentByDriver(query) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getUpcomingShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                            dispatch({
                                type: DRIVER_GET_LIVE_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                        })
                        .catch(error => {
                            dispatch({
                                type: DRIVER_GET_LIVE_SHIPMENTS_FAIL,
                                error: error
                            });
                            reject(false);
                        })
                })
        }})
    }
}

export function getUpcomingShipmentByDriver(query) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getUpcomingShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                            dispatch({
                                type: DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                        })
                        .catch(error => {
                            dispatch({
                                type: DRIVER_GET_UPCOMING_SHIPMENTS_FAIL,
                                error: error
                            });
                            reject(false);
                        })
                })
        }})
    }
}

export function getPastShipmentByDriver(query) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getPastShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                            dispatch({
                                type: DRIVER_GET_PAST_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                        })
                        .catch(error => {
                            dispatch({
                                type: DRIVER_GET_PAST_SHIPMENTS_FAIL,
                                error: error
                            });
                            reject(false);
                        })
                })
        }})
    }
}


// export function setShipmentSearchQuery(cityState = null, deliveryStateCity = null, dateFrom = null, truckType = null){
//     return function (dispatch) {
//         let query = {};
//         if(pickupLocation !== null){
//             query.cityState = cityState;
//         }
//         if(dropOffLocation !== null){
//             query.deliveryStateCity = deliveryStateCity;
//         }
//         if(pickupDate !== null){
//             query.dateFrom = dateFrom;
//         }
//         if(trailer !== null){
//             query.truckType = truckType;
//         }
//         dispatch({
//             type: DRIVER_SHIPMENT_SET_SEARCH_QUERY,
//             data: query
//         });
//     }
// }
