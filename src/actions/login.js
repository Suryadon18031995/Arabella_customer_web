
import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as LOGIN_CONSTANTS from '../constants/login';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';
import * as SALESREP_CONSTANTS from '../constants/salesRep';

export const requestLoginData = subreddit => ({
    type: LOGIN_CONSTANTS.REQUEST_LOGIN_DATA,
    subreddit,
});

export const receiveLoginData = (subreddit, json) => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveLoginDataError = (subreddit, err, errCode) => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const logoutFunction = subreddit => ({
    type: LOGIN_CONSTANTS.REQUEST_LOGOUT,
    subreddit,
});

export const clearSalesRepFlag = subreddit => ({
    type: LOGIN_CONSTANTS.CLEAR_SALES_REP_FLAG,
    subreddit,
});

export const fetchLoginData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: LOGIN_CONSTANTS.LOGIN_URL,
        method: 'POST',
        body: data,
        initCb: requestLoginData,
        successCb: receiveLoginData,
        failureCb: receiveLoginDataError,
        subreddit,
        wrapperActionType: 'FETCH_LOGIN_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};


export const requestForgotPasswordData = subreddit => ({
    type: LOGIN_CONSTANTS.REQUEST_FORGOT_PASSWORD_DATA,
    subreddit,
});

export const receiveForgotPasswordData = (subreddit, json) => ({
    type: LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveForgotPasswordError = (subreddit, err, errCode) => ({
    type: LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchForgotPassword = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: LOGIN_CONSTANTS.FORGOT_PASSWORD_URL,
        method: 'POST',
        body: data,
        initCb: requestForgotPasswordData,
        successCb: receiveForgotPasswordData,
        failureCb: receiveForgotPasswordError,
        subreddit,
        wrapperActionType: 'FETCH_FORGOT_PASSWORD_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const receiveShowLoginModalData = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.SHOW_LOGIN_MODAL,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const receiveHideLoginModalData = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.HIDE_LOGIN_MODAL,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const updateCartData = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.UPDATE_CART,
    subreddit,
    data,
    receivedAt: Date.now(),
});
export const fetchProfileData = (data, subreddit) => (dispatch) => {
    const constants = _get(LOGIN_CONSTANTS, 'PROFILE_DATA_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PROFILE_DATA_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchCategoriesList = (data, subreddit) => (dispatch) => {
    const constants = _get(LOGIN_CONSTANTS, 'CATEGORIES_LIST_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'CATEGORIES_LIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const setZipcodeData = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.SET_ZIPCODE,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const setStoreId = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.SET_STORE_ID,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const setCartId = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.SET_CART_ID,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const flushCartData = subreddit => ({
    type: LOGIN_CONSTANTS.FLUSH_CART_DATA,
    subreddit,
    receivedAt: Date.now(),
});

export const clearForgotReducerData = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.RESET_FORGOT_PASSWORD_DATA,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const requestSalesrepData = subreddit => ({
    type: SALESREP_CONSTANTS.REQUEST_SALESREP_LOGIN,
    subreddit,
});

export const receiveSalesrepData = (subreddit, json) => ({
    type: SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveSalesrepDataError = (subreddit, err, errCode) => ({
    type: SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchSalesRepLoginData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: SALESREP_CONSTANTS.SALESREP_LOGIN_URL,
        method: 'POST',
        body: data,
        initCb: requestSalesrepData,
        successCb: receiveSalesrepData,
        failureCb: receiveSalesrepDataError,
        subreddit,
        wrapperActionType: 'FETCH_SALESREP_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const postNewsletterSubscription = (data, subreddit) => (dispatch) => {
    const constants = _get(LOGIN_CONSTANTS, 'NEWSLETTER_SUBSCRIPTION_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'POST_NEWSLETTER_SUBSCRIPTION_WRAPPER',
        redirect: 'follow',
    }));
};

export const clearNewsletterSubscription = subreddit => ({
    type: LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_DATA,
    subreddit,
    receivedAt: Date.now(),
});

export const requestUserLogout = (data, subreddit) => (dispatch) => {
    const constants = _get(LOGIN_CONSTANTS, 'USER_LOGOUT_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'REQUEST_USER_LOGOUT_WRAPPER',
        redirect: 'follow',
    }));
};

// update Premium flag enable/disable
export const updatePrimeValue = (data, subreddit) => ({
    type: LOGIN_CONSTANTS.UPDATE_PRIME_ID,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const verifyEmailId = (data, subreddit) => (dispatch) => {
    const constants = _get(LOGIN_CONSTANTS, 'ARTIST_EMAIL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: `${_get(constants, 'URL')}${data.email}`,
        method: 'GET',
        // body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'REQUEST_ARTIST_EMAIL_WRAPPER',
        redirect: 'follow',
    }));
};

export const recievedLoginDetails = data => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN_RESPONSE_DATA,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedLoginError = (err) => ({
    type: LOGIN_CONSTANTS.RECEIVED_LOGIN_RESPONSE_ERROR,
    errorCode: err,
  })

 
  
  export const fetchLoginResponseData = (data) => {
      console.log(data);      
    return dispatch => {
      axios.post('https://uat.mediversal.tech/index.php/api/customer/login',qs.stringify(data))
        .then(res => dispatch(recievedLoginDetails(res.data)))
        .catch(err => dispatch(recievedLoginError(err)))
    }
  }
