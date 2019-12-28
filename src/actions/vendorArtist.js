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

// FOR PRODUCT UPDATE
export const updateProduct = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCTS_UPDATE_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCTS_UPDATE_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR LOGISTIC SETTINGS
export const addLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PO DETAILS
export const poDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_SHOW_PO_DETAILS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_SHOW_PO_DETAILS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PO Action
export const poAction = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PO_ACTION_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PO_ACTION_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR GETTING RAISE VENDOR INVOICE DETAILS
export const getRaiseVendorInvoiceDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR RAISING INVOICE
export const raiseVendorInvoice = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_RAISE_INVOICE_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_RAISE_INVOICE_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR ARTIST LOGIN
export const login = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGIN_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGIN_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

export const logout = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGOUT_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGOUT_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT REQUIREMENTS
export const fetchProductRequirements = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'GET',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};