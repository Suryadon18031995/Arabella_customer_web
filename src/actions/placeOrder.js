import _get from 'lodash/get';
import * as PLACE_ORDER_CONSTANTS from '../constants/placeOrder';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestPlaceOrderData = subreddit => ({
    type: PLACE_ORDER_CONSTANTS.REQUEST_PLACE_ORDER_SEARCH,
    subreddit,
});

export const receivePlaceOrderData = (subreddit, json) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_PLACE_ORDER_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receivePlaceOrderDataError = (subreddit, err, errCode) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_PLACE_ORDER_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchPlaceOrderData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PLACE_ORDER_CONSTANTS.PLACE_ORDER_URL,
        method: 'POST',
        body: data,
        initCb: requestPlaceOrderData,
        successCb: receivePlaceOrderData,
        failureCb: receivePlaceOrderDataError,
        subreddit,
        wrapperActionType: 'FETCH_PLACE_ORDER_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestFirstData = subreddit => ({
    type: PLACE_ORDER_CONSTANTS.REQUEST_FIRSTDATA_SEARCH,
    subreddit,
});

export const receiveFirstData = (subreddit, json) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_FIRSTDATA_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveFirstDataError = (subreddit, err, errCode) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_FIRSTDATA_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchFirstData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PLACE_ORDER_CONSTANTS.REDIRECTION_TO_FIRSTDATA_URL,
        method: 'POST',
        body: data,
        initCb: requestFirstData,
        successCb: receiveFirstData,
        failureCb: receiveFirstDataError,
        subreddit,
        wrapperActionType: 'FETCH_FIRST_DATA_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};


export const clearPlaceOrderReducer = subreddit => ({
    type: PLACE_ORDER_CONSTANTS.CLEAR_PLACE_ORDER_DATA,
    subreddit,
});

export const setFirstDataRedirection = (data, subreddit) => ({
    type: PLACE_ORDER_CONSTANTS.SET_FIRST_DATA_REDIRECTION,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const requestPaymentMethodInfoData = subreddit => ({
    type: PLACE_ORDER_CONSTANTS.REQUEST_PAYMENT_METHOD_INFO_SEARCH,
    subreddit,
});

export const receivePaymentMethodInfoData = (subreddit, json) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_PAYMENT_METHOD_INFO_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receivePaymentMethodInfoDataError = (subreddit, err, errCode) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_PAYMENT_METHOD_INFO_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchPaymentMethodInfo = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PLACE_ORDER_CONSTANTS.PAYMENT_METHOD_INFO_URL,
        method: 'POST',
        body: data,
        initCb: requestPaymentMethodInfoData,
        successCb: receivePaymentMethodInfoData,
        failureCb: receivePaymentMethodInfoDataError,
        subreddit,
        wrapperActionType: 'FETCH_PAYMENT_METHOD_INFO_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestSubscriptionHelperData = subreddit => ({
    type: PLACE_ORDER_CONSTANTS.REQUEST_SUBSCRIPTION_HELPER,
    subreddit,
});

export const receiveSubscriptionHelperData = (subreddit, json) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_SUBSCRIPTION_HELPER,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveSubscriptionHelperError = (subreddit, err, errCode) => ({
    type: PLACE_ORDER_CONSTANTS.RECEIVED_SUBSCRIPTION_HELPER_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const getSubscriptionHelperDetails = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PLACE_ORDER_CONSTANTS.SUBSCRIPTION_HELPER_URL,
        method: 'POST',
        body: data,
        initCb: requestSubscriptionHelperData,
        successCb: receiveSubscriptionHelperData,
        failureCb: receiveSubscriptionHelperError,
        subreddit,
        wrapperActionType: 'FETCH_SUBSCRIPTION_HELPER_WRAPPER',
        redirect: 'follow',
    }));
};

export const addFirstDataCreditCard = (data, url, subreddit) => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'ADD_FIRST_DATA_CREDIT_CARD_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, url),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_ADD_FIRST_DATA_CREDIT_CARD_WRAPPER',
        redirect: 'follow',
    }));
};

export const addPaypalCreditCard = (data, subreddit) => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'ADD_PAYPAL_CREDIT_CARD_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_ADD_PAYPAL_CREDIT_CARD_WRAPPER',
        redirect: 'follow',
    }));
};

export const getSavedCardDetails = (data, subreddit) => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'GET_SAVED_CARD_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_GET_SAVED_CARD_WRAPPER',
        redirect: 'follow',
    }));
};

export const getOrderId = (data, subreddit) => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'GET_ORDER_ID_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_GET_ORDER_ID_WRAPPER',
        redirect: 'follow',
    }));
};

export const updateProductQty = (data, subreddit) => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'UPDATE_PRODUCTS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_UPDATE_PRODUCTS_WRAPPER',
        redirect: 'follow',
    }));
};

export const getBraintreeClientToken = subreddit => (dispatch) => {
    const constants = _get(PLACE_ORDER_CONSTANTS, 'GET_BRAINTREE_CLIENT_TOKEN_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: {},
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_BRAINTREE_CLIENT_TOKEN_WRAPPER',
        redirect: 'follow',
    }));
};
