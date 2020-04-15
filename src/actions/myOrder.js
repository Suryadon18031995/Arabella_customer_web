import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as MY_ORDER_CONSTANTS from '../constants/myOrder';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestMyOrderData = () => ({
    type: MY_ORDER_CONSTANTS.REQUEST_MY_ORDER_SEARCH,
});

export const recievedOrderDetails = data => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_MY_ORDER_SEARCH,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedOrderDetailsError = (err) => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_MY_ORDER_SEARCH_ERROR,
    errorCode: err,
  })

 
  
  export const fetchMyOrderData = (data) => {
      requestMyOrderData();
      console.log(data);
    return dispatch => {
      axios.post('https://uat.mediversal.tech/index.php/api/index/MyDashboard',qs.stringify(data))
        .then(res => dispatch(recievedOrderDetails(res.data)))
        .catch(err => dispatch(recievedOrderDetailsError(err)))
    }
  }

// my invoice action
export const requestMyInvoiceData = subreddit => ({
    type: MY_ORDER_CONSTANTS.REQUEST_MY_INVOICE_SEARCH,
    subreddit,
});

export const receiveMyInvoiceData = (subreddit, json) => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_MY_INVOICE_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveMyInvoiceDataError = (subreddit, err, errCode) => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_MY_INVOICE_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchMyInvoiceData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: MY_ORDER_CONSTANTS.MY_INVOICE_URL,
        method: 'POST',
        body: data,
        initCb: requestMyInvoiceData,
        successCb: receiveMyInvoiceData,
        failureCb: receiveMyInvoiceDataError,
        subreddit,
        wrapperActionType: 'FETCH_MY_INVOICE_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

// open term actions
export const requestOpenTermData = subreddit => ({
    type: MY_ORDER_CONSTANTS.REQUEST_OPEN_TERM_SEARCH,
    subreddit,
});

export const receiveOpenTermData = (subreddit, json) => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_OPEN_TERM_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveOpenTermDataError = (subreddit, err, errCode) => ({
    type: MY_ORDER_CONSTANTS.RECEIVED_OPEN_TERM_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchOpenTermData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: MY_ORDER_CONSTANTS.MY_OPEN_TERM_URL,
        method: 'POST',
        body: data,
        initCb: requestOpenTermData,
        successCb: receiveOpenTermData,
        failureCb: receiveOpenTermDataError,
        subreddit,
        wrapperActionType: 'FETCH_OPEN_TERM_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchViewOrderData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'VIEW_ORDER_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'VIEW_ORDER_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchDownloadInvoiceData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'DOWNLOAD_INVOICES_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'VIEW_ORDER_WRAPPER',
        redirect: 'follow',
    }));
};

export const setOrderId = (data, subreddit) => ({
    type: MY_ORDER_CONSTANTS.SET_ORDER_ID,
    subreddit,
    data,
    receivedAt: Date.now(),
  });

  export const fetchMultipleOrderPaymentOpenTermsData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'MULTIPLE_ORDER_PAYMENT_OPENTERMS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchReOrderData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'REORDER_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'REORDER_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchPrimeOrderData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'PRIME_ORDER_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRIME_ORDER_WRAPPER',
        redirect: 'follow',
    }));
};

// cancel Premium membership
export const cancelPrimeMembershipData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'CANCEL_PRIME_MEMBERSHIP_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'CANCEL_PRIME_MEMBERSHIP_WRAPPER',
        redirect: 'follow',
    }));
};

// Renew Premium membership
export const renewPrimeMembershipData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'RENEW_PRIME_MEMBERSHIP_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'RENEW_PRIME_MEMBERSHIP_WRAPPER',
        redirect: 'follow',
    }));
};

// Upgrade Premium membership
export const upgradePrimeMembershipData = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'UPGRADE_PRIME_MEMBERSHIP_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'UPGRADE_PRIME_MEMBERSHIP_WRAPPER',
        redirect: 'follow',
    }));
};

export const cancelSubscriptionOrder = (data, subreddit) => (dispatch) => {
    const constants = _get(MY_ORDER_CONSTANTS, 'CANCEL_SUBSCRIPTION_ORDER_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'CANCEL_SUBSCRIPTION_ORDER_WRAPPER',
        redirect: 'follow',
    }));
};
