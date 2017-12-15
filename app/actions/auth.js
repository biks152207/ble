import {HTTP} from './../utils/HTTP';
import { AlertInfo } from './../utils/AlertInfo';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GETUSER_SUCCESS,
    GETUSER_FAIL,
    SET_USER_TYPE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    UPDATE_USER_STATE
} from './../constants/actionTypes';

// example action
export function loginRequest(data) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            HTTP('post', '/login', data)
                .then(function (response) {
                  console.log(response, 'login response.....');

                  if(response.data.error){
                    AlertInfo(response.data.message);
                    dispatch({
                        type: LOGIN_FAIL,
                        error: response.data
                    });
                    reject(response.data.message);
                  }else if(!response.data.data.user.isMobileVerified){
                    dispatch({
                        type: LOGIN_FAIL,
                        error: response.data
                    });
                    reject({verify: true,token:response.data.data.token});
                  }else {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: response.data.data
                    });
                    resolve(true);
                  }

                })
                .catch(error => {
                  console.log(error, 'err login response.....');
                    dispatch({
                        type: LOGIN_FAIL,
                        error: error
                    });
                    reject(error.data.message);
                })
        }})
    }
}

export function signUpRequest(data) {
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            HTTP('post', '/driver/register_from_email', data)
                .then(function (response) {

                    if(response.data.error){
                      AlertInfo(response.data.message);
                      dispatch({
                          type: SIGNUP_FAIL,
                          error: response.data
                      });
                      reject(false);
                    }else {
                      dispatch({
                          type: SIGNUP_SUCCESS,
                          data: response.data.data
                      });
                      resolve(true);
                    }


                })
                .catch(error => {

                    AlertInfo(error.data.message);
                    dispatch({
                        type: SIGNUP_FAIL,
                        error: error
                    });
                    reject(false);
                })
        }})
    }
}

export function getUserDetails(token){
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            HTTP('get', '/getUser', null, {authorization: "Bearer "+token})
                .then(function (response) {
                  console.log('response%%%%%%%%%%%%%%%%%%%%%%', response);
                  if (response.status === 200) {
                    dispatch({
                        type: GETUSER_SUCCESS,
                        data: response.data.data
                    });
                    resolve(true);
                  } else {
                    dispatch({
                        type: GETUSER_FAIL,
                        error: false
                    });
                    resolve(false);
                  }
                })
                .catch(error => {
                  console.log('this is error');
                  console.log(error, 'error%%%%%%%%%%%%%%%');
                    dispatch({
                        type: GETUSER_FAIL,
                        error: false
                    });
                    resolve(false);
                })
        }})
    }
}

export function setUserType(isOwner){
    return function (dispatch) {
        dispatch({
            type: SET_USER_TYPE,
            data: {
                isOwner
            }
        });
    }
}

export function updateUser(data){
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_STATE,
            data: data
        });
    }
}

export function getResetPasswordToken(query) {
    return function (dispatch) {
        return new Promise((resolve, reject) =>{
            HTTP('get', `/getResetPasswordToken?country_code=${`+1`}&mobile=${query.prefix}`)
                .then( (response)  => {
                  console.log(response);
                  if (response.status === 200){
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        data: response.data.message
                    });
                    resolve(true);
                  } else {
                    reject(response.data);
                  }
                })
                .catch(error => {
                  console.log(error);
                    dispatch({
                        type: RESET_PASSWORD_FAIL,
                        error: error
                    });
                    reject(false);
                })
        })
    }
}

export function otpRequest(token, data){
    return function (dispatch) {
        return new Promise(function(resolve, reject){{
            HTTP('put', '/verifyOTP', data, {authorization: "Bearer "+token})
                .then(function (response) {
                  if(response.data.error){
                      AlertInfo(response.data.message);
                    dispatch({
                        type: VERIFY_OTP_FAIL,
                        error: response.data
                    });
                    reject(false);
                  }else {
                    dispatch({
                        type: VERIFY_OTP_SUCCESS,
                        data: response.data.message
                    });
                    resolve(true);
                  }

                })
                .catch(error => {

                    dispatch({
                        type: VERIFY_OTP_FAIL,
                        error: error
                    });
                    reject(false);
                })
        }})
    }
}
