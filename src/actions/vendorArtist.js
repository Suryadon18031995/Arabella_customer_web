import _get from 'lodash/get';
import * as VENDOR_CONSTANTS from '../constants/vendorArtists';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

// FOR PO MANAGEMENT
export const fetchPOManagementDetails = (data, subreddit) => (dispatch) => {
    const constants = _get(VENDOR_CONSTANTS, 'ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS');
    return dispatch(dynamicActionWrapper({
      path: _get(constants, 'URL'),
      method: 'POST',
      body: data,
      initCb: _get(generateFns({ constants }), 'request'),
      successCb: _get(generateFns({ constants }), 'recieved'),
      failureCb: _get(generateFns({ constants }), 'recievedErr'),
      subreddit,
      wrapperActionType: 'ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS_WRAPPER',
      redirect: 'follow',
    }));
  };

// FOR CREATE PRODUCTS
export const createProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCT_UPLOAD_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCT_UPLOAD_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const fetchArtistProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCTS_LIST_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCTS_LIST_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const fetchLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const updateLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};