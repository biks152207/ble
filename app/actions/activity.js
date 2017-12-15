import {HTTP} from './../utils/HTTP';
import { AsyncStorage } from 'react-native';
import { AlertInfo } from './../utils/AlertInfo';

import {
  GET_ACTIVITY_LOG_REQUEST,
  GET_ACTIVITY_LOG_SUCCESS,
  GET_ACTIVITY_LOG_DAY_SUCCESS,
  GET_ACTIVITY_LOG_FAIL,
} from './../constants/actionTypes';

// example action


export function getActivityLogs(query,navigate, isDayLog) {
  return function (dispatch) {
      return new Promise(function(resolve, reject){{
          AsyncStorage.getItem('@Axle:token')
              .then(function(token){
                  HTTP('get', '/driver/getLogs', {}, {authorization: "Bearer "+token}, query)
                      .then(function (response) {
                        if(response.data.error){
                            if(response.data.error=="Unauthorized"){
                              AlertInfo("Someone else has logged into this account"); AsyncStorage.removeItem('@Axle:token')
                              navigate('Login');
                            }else {
                              AlertInfo(response.data.message);
                              dispatch({
                                    type: GET_ACTIVITY_LOG_FAIL,
                                    error: response.data
                                });
                              reject(false);
                            }

                          }else {
                            if(isDayLog){
                              dispatch({
                                  type: GET_ACTIVITY_LOG_DAY_SUCCESS,
                                  data: response.data.data
                              });
                            }
                            else {
                              dispatch({
                                  type: GET_ACTIVITY_LOG_SUCCESS,
                                  data: response.data.data
                              });
                            }
                          resolve(response.data.data);
                        }
                      })
                      .catch(error => {
                          dispatch({
                              type: GET_ACTIVITY_LOG_FAIL,
                              error: error
                          });
                          reject(false);
                      })
              })
      }})
  }
}
