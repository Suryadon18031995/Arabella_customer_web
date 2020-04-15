import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as BKM_CONSTANTS from '../constants/bkmList';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';


export const requestBkmListSearchData = () => ({
  type: BKM_CONSTANTS.REQUEST_BKM_LIST_SEARCH,
});

export const receiveBkmListSearchData = data => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH,
   data,
   receivedAt: Date.now(),
})  
export const receiveBkmListSearchDataError = (err) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH_ERROR,
  errorCode: err,
})



export const fetchBKMListingData = (data) => {
  requestBkmListSearchData();
    console.log(data);
  return dispatch => {
    axios.post( BKM_CONSTANTS.PRODUCTS_DATA_URL,qs.stringify(data))
      .then(res => dispatch(receiveBkmListSearchData(res.data)))
      .catch(err => dispatch(receiveBkmListSearchDataError(err)))
  }
}

export const requestBkmCartData = subreddit => ({
  type: BKM_CONSTANTS.REQUEST_CART_LIST_SEARCH,
  subreddit,
});

export const receiveBkmCartData = (subreddit, json) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveBkmCartDataError = (subreddit, err, errCode) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchCartData = (data, subreddit) => (dispatch) => {
  return dispatch(dynamicActionWrapper({
    path: BKM_CONSTANTS.CART_URL,
    method: 'POST',
    body: data,
    initCb: requestBkmCartData,
    successCb: receiveBkmCartData,
    failureCb: receiveBkmCartDataError,
    subreddit,
    wrapperActionType: 'FETCH_BKM_CART_SEARCH_RESULT_WRAPPER',
    redirect: 'follow',
  }),
  );
};


export const requestFilterCategoryData = () => ({
  type: BKM_CONSTANTS.REQUEST_FILTER_CATEGORY_DATA,
});

export const receiveFilterCategoryData = data => ({
  type: BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA,
   data,
   receivedAt: Date.now(),
})  
export const receiveFilterCategoryDataError = (err) => ({
  type: BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA_ERROR,
  errorCode: err,
})



export const fetchFilterCategoryData = (data) => {
  requestFilterCategoryData();
    console.log(data);
  return dispatch => {
    axios.post( BKM_CONSTANTS.CATEGORY_DATA_URL,qs.stringify(data))
      .then(res => dispatch(receiveFilterCategoryData(res.data)))
      .catch(err => dispatch(receiveFilterCategoryDataError(err)))
  }
}

/* FOR HEADER SUGGETION SEARCH DATA */
export const fetchCategoriesAutoCompleteResult = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HEADER_CATEGORIES_AUTOCOMPLETE_WRAPPER',
    redirect: 'follow',
  }));
};
/* FOR HEADER FINAL RESULT SEARCH DATA */
export const requestHeaderFinalResultData = (text, subreddit) => {
  // const constants = _get(BKM_CONSTANTS, 'HEADER_CATEGORIES_FINALRESULT_CONSTANTS');
  return ({
    type: 'REQUEST_CATEGORY_FINALRESULT_RESULT',
    // type: _get(generateFns({ constants }), 'request'),
    subreddit,
    text,
    receivedAt: Date.now(),
  });
};
export const fetchCategoriesfinalSearchResult = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HEADER_CATEGORIES_FINALRESULT_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HEADER_CATEGORIES_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE FRESH DEALS PRODUCTS
export const fetchHomePageFreshDealsProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_FRESH_DEALS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_FRESH_DEALS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE BEST SELLER PRODUCTS
export const fetchHomePageBestSellerProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_BEST_SELLER_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_BEST_SELLER_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

export const fetchHomePageNewArrivalsProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_NEW_ARRIVALS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE NEW ARRIVALS SECOND PAGE PRODUCTS
export const fetchHomePageNewArrivalsSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE FRESH DEALS SECOND PAGE PRODUCTS
export const fetchHomePageFreshDealsSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_FRESH_DEALS_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE BEST SELLER SECOND PAGE PRODUCTS
export const fetchHomePageBestSellerSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_BEST_SELLER_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR Premium PAGE PRODUCTS
export const fetchPrimePageProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'PRIME_MEMBERSHIP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'PRIME_MEMBERSHIP_CONSTANTS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

