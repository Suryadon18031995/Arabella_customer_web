import _get from 'lodash/get';
import * as ADDRESS_CONSTANTS from '../constants/address';
// import * as ALL_ADDRESS_CONSTANTS from '../constants/address';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const fetchAllAddressData = (data, subreddit) => (dispatch) => {
    const constants = _get(ADDRESS_CONSTANTS, 'ALL_ADDRESS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'ADD_PRODUCT_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchAddAddressData = (data, subreddit) => (dispatch) => {
    const constants = _get(ADDRESS_CONSTANTS, 'ADD_ADDRESS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'ADD_ADDRESS_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchDeleteAddress = (data, subreddit) => (dispatch) => {
    const constants = _get(ADDRESS_CONSTANTS, 'DELETE_ADDRESS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'DELETE',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'DELETE_ADDRESS_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchEditAddress = (data, subreddit) => (dispatch) => {
    const constants = _get(ADDRESS_CONSTANTS, 'EDIT_ADDRESS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'PATCH',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'EDIT_ADDRESS_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

export const setAddrId = (data, subreddit) => ({
    type: ADDRESS_CONSTANTS.SET_ADDR_ID_CONSTANTS,
    subreddit,
    data,
    receivedAt: Date.now(),
  });
