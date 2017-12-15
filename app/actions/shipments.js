import {HTTP} from './../utils/HTTP';
import { AsyncStorage } from 'react-native';
import { AlertInfo } from './../utils/AlertInfo';

import {
    GET_ALL_AVAILABLE_SHIPMENTS_REQUEST,
    GET_ALL_AVAILABLE_SHIPMENTS_SUCCESS,
    GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
    SELECT_SHIPMENT,
    ACCEPT_SHIPMENT_REQUEST,
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

// example action

export function clearSelectedShipment() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_SELECTED
    })
  }
}

export function clearAllQuery() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ALL_QUERY
    })
  }
}

export function clearAssignedShipment(id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CLEAR_ASSIGNED_SHIPMENT,
        payload: id
      })
    })
  }
}

export function searchAllAvailableShipment(query,navigate) {
  return function (dispatch) {
      return new Promise(function(resolve, reject){{
          AsyncStorage.getItem('@Axle:token')
              .then(function(token){
                  HTTP('get', '/driver/getAllAvailabeShipment', {}, {authorization: "Bearer "+token}, query)
                      .then(function (response) {
                        if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    type: GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                          dispatch({
                              type: SEARCH_ALL_AVAILABLE_SHIPMENTS_SUCCESS,
                              data: response.data.data
                          });
                          resolve(true);
                        }
                      })
                      .catch(error => {
                          dispatch({
                              type: GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
                              error: error
                          });
                          reject(false);
                      })
              })
      }})
  }
}

export function clearShipments() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SHIPMENT
    })
  }
}

export function addIdForAcceptance(id) {
  return function(dispatch) {
    return new Promise(function(resolve, reject){
      dispatch({
        type: ADD_SHIPMENT_FOR_ACCEPTANCE,
        payload: id
      })
    })
  }
}

export function getAllAvailableShipmentRequest(query,navigate) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/driver/getAllAvailabeShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    type: GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            dispatch({
                                type: GET_ALL_AVAILABLE_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                          }
                        })
                        .catch(error => {
                            dispatch({
                                type: GET_ALL_AVAILABLE_SHIPMENTS_FAIL,
                                error: error
                            });
                            reject(false);
                        })
                })
        }})
    }
}

export function updateNewShipment(id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@Axle:token')
          .then((token) => {
              HTTP('get', `/shipment/getShipmentDetails/${id}`, {}, {authorization: "Bearer "+token}, {})
                .then((result) => {
                  dispatch({
                    type: GET_SHIPMENT_BY_ID,
                    payload: result.data
                  })
                })
          })
    })
  }
}
export function selectShipment(shipmentDetail,navigate){

  return function (dispatch) {
      return new Promise(function(resolve, reject){{
          AsyncStorage.getItem('@Axle:token')
              .then(function(token){
                  HTTP('get', '/shipment/getShipmentDetails/'+shipmentDetail._id, {}, {authorization: "Bearer "+token})
                      .then(function (response) {
                        if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);

                              reject(false);
                            }

                          }else {

                        var shipment=response.data.data[0];
                          dispatch({
                              type: SELECT_SHIPMENT,
                              data: {shipment}
                          });
                          resolve(true);
                        }
                      })
                      .catch(error => {

                          reject(false);
                      })
              })
      }})
  }

    // return function (dispatch) {
    //     dispatch({
    //         type: SELECT_SHIPMENT,
    //         data: {
    //             shipment
    //         }
    //     });
    // }
}

export function acceptShipment(shipmentId) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('put', '/driver/acceptShipment', {shipmentId}, {authorization: "Bearer "+token})
                        .then(function (response) {
                          console.log('this is a response from server', response);
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                            AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                            navigate('Login');
                          }else {
                              AlertInfo(response.data.message);
                            dispatch({
                                type: ACCEPT_SHIPMENT_FAIL,
                                error: response.data
                            });
                            reject(false);
                          }
                          }else {
                            dispatch({
                                type: ACCEPT_SHIPMENT_SUCCESS,
                                data: response.data.data
                            });
                            resolve(response);
                          }
                        })
                        .catch(error => {
                            dispatch({
                                type: ACCEPT_SHIPMENT_FAIL,
                                error: error
                            });
                            reject(error);
                        })
                })
        }})
    }
}

export function setShipmentSearchQuery(data){
    return function (dispatch) {

        // if(pickupLocation !== null){
        //     query.cityState = cityState;
        // }
        // if(dropOffLocation !== null){
        //     query.deliveryStateCity = deliveryStateCity;
        // }
        // if(pickupDate !== null){
        //     query.dateFrom = dateFrom;
        // }
        // if(trailer !== null){
        //     query.truckType = truckType;
        // }
        dispatch({
            type: SET_SEARCH_QUERY,
            data: data
        });
    }
}

export function getLiveShipmentByDriver(query,navigate) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getOngoingShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    Type:DRIVER_GET_LIVE_SHIPMENTS_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            dispatch({
                                type: DRIVER_GET_LIVE_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(response.data.data);
                          }
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

export function getUpcomingShipmentByDriver(query,navigate) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getUpcomingShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    Type:DRIVER_GET_UPCOMING_SHIPMENTS_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            dispatch({
                                type: DRIVER_GET_UPCOMING_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                          }
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

export function getPastShipmentByDriver(query,navigate) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getPastShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    Type:DRIVER_GET_PAST_SHIPMENTS_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            dispatch({
                                type: DRIVER_GET_PAST_SHIPMENTS_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                          }
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

export function getUpcomingShipmentByDriverCount(query,navigate) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            AsyncStorage.getItem('@Axle:token')
                .then(function(token){
                    HTTP('get', '/shipment/getUpcomingShipment', {}, {authorization: "Bearer "+token}, query)
                        .then(function (response) {
                          if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    type: DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            dispatch({
                                type: DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_SUCCESS,
                                data: response.data.data
                            });
                            resolve(true);
                          }

                        })
                        .catch(error => {
                          dispatch({
                                type: DRIVER_GET_UPCOMING_SHIPMENTS_COUNT_FAIL,
                                error: error
                            });
                            reject(false);
                        })
                })
        }})
    }
}

export function clearSearchQuery() {
    return function (dispatch) {
        dispatch({
          type: CLEAR_SEARCH_QUERY
        })
    }
}
