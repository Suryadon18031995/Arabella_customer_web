import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as CART_CONSTANTS from '../constants/cart';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';



export const receiveFirstCartData = data => ({
    type: CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH,
     data,
     receivedAt: Date.now(),
  })  
  export const receiveFirstCartDataError = (err) => ({
    type: CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH_ERROR,
    errorCode: err,
  })
  
  export const fetchFirstCartData = (data) => {
      console.log(data);
    return dispatch => {
      axios.post(CART_CONSTANTS.FIRST_CART_URL,qs.stringify(data))
        .then(res => dispatch(receiveFirstCartData(res.data)))
        .catch(err => dispatch(receiveFirstCartDataError(err)))
    }
  }

export const requestAddToCart = subreddit => ({
    type: CART_CONSTANTS.REQUEST_ADD_TO_CART,
    subreddit,
});

export const receiveAddToCart = (subreddit, json) => ({
    type: CART_CONSTANTS.RECEIVED_ADD_TO_CART,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

// Apply Discount Coupon Action
export const requestDiscountCouponData = subreddit => ({
    type: CART_CONSTANTS.REQUEST_DISCOUNT_COUPON_SEARCH,
    subreddit,
});

export const receiveDiscountCouponData = (subreddit, json) => ({
    type: CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveAddToCartError = (subreddit, err, errCode) => ({
    type: CART_CONSTANTS.RECEIVED_ADD_TO_CART_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});
const receiveDiscountCouponDataError = (subreddit, err, errCode) => ({
    type: CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const postAddToCartData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: CART_CONSTANTS.ADD_TO_CART_URL,
        method: 'POST',
        body: data,
        initCb: requestAddToCart,
        successCb: receiveAddToCart,
        failureCb: receiveAddToCartError,
        subreddit,
        wrapperActionType: 'FETCH_ADD_TO_CART_WRAPPER',
        redirect: 'follow',
    }));
};
export const fetchDiscountCouponData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: CART_CONSTANTS.DISCOUNT_COUPON_URL,
        method: 'POST',
        body: data,
        initCb: requestDiscountCouponData,
        successCb: receiveDiscountCouponData,
        failureCb: receiveDiscountCouponDataError,
        subreddit,
        wrapperActionType: 'FETCH_DISCOUNT_COUPON_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

// Cancel Discount Coupon Action
export const requestCancelDiscountCouponData = subreddit => ({
    type: CART_CONSTANTS.REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH,
    subreddit,
});

export const receiveCancelDiscountCouponData = (subreddit, json) => ({
    type: CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveCancelDiscountCouponDataError = (subreddit, err, errCode) => ({
    type: CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchCancelDiscountCouponData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: CART_CONSTANTS.CANCEL_DISCOUNT_COUPON_URL,
        method: 'POST',
        body: data,
        initCb: requestCancelDiscountCouponData,
        successCb: receiveCancelDiscountCouponData,
        failureCb: receiveCancelDiscountCouponDataError,
        subreddit,
        wrapperActionType: 'FETCH_CANCEL_DISCOUNT_COUPON_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};


export const fetchMoveToWishlistData = (data, type, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, 'MOVE_TO_WISHLIST_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'MOVE_TO_WISHLIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchRemoveExpiredProductData = (data, type, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, 'REMOVE_EXPIRED_PRODUCTS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'DELETE',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'REMOVE_EXPIRED_PRODUCTS_WRAPPER',
        redirect: 'follow',
    }));
};

export const clearCartReducer = subreddit => ({
    type: CART_CONSTANTS.CLEAR_CART_DATA,
    subreddit,
});

export const setCartTypeData = (data, subreddit) => ({
    type: CART_CONSTANTS.SET_CART_TYPE,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export const setRemoveCartTypeData = (data, subreddit) => ({
    type: CART_CONSTANTS.SET_REMOVE_PRODUCT_TYPE,
    subreddit,
    data,
    receivedAt: Date.now(),
});

// Bulk Add to cart action
export const bulkAddToCartData = (data, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, 'BULK_ADD_TO_CART_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_BULK_ADD_TO_CART_WRAPPER',
        redirect: 'follow',
    }));
};

export const flushCartViewData = subreddit => ({
    type: CART_CONSTANTS.FLUSH_CART_VIEW_DATA,
    subreddit,
    receivedAt: Date.now(),
});

// Clear cart action
export const clearCartData = (data, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, 'CLEAR_CART_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'DELETE',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_CLEAR_CART_WRAPPER',
        redirect: 'follow',
    }));
};


export const recievedPostCartData = data => ({
    type: CART_CONSTANTS.RECEIVED_ADD_TO_CART,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedPostError = (err) => ({
    type: CART_CONSTANTS.RECEIVED_ADD_TO_CART_ERROR,
    errorCode: err,
  })
  
  export const postProductAddToCartData = (data) => {
      console.log(data);
    return dispatch => {
      axios.post(CART_CONSTANTS.ADD_TO_CART_URL,qs.stringify(data))
        .then(res => dispatch(recievedPostCartData(res.data)))
        .catch(err => dispatch(recievedPostError(err)))
    }
  }

  export const recievedRemoveFromCartData = data => ({
    type: CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedRemoveFromCartDataError = (err) => ({
    type: CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })



  export const fetchRemoveFromCartData = (data) => {
    console.log(data);
  return dispatch => {
    axios.post(CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.URL,qs.stringify(data))
      .then(res => dispatch(recievedRemoveFromCartData(res.data)))
      .catch(err => dispatch(recievedRemoveFromCartDataError(err)))
  }
}

export const recievedUpdateFromCartData = data => ({
    type: CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedUpdateFromCartDataError = (err) => ({
    type: CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })



  export const fetchUpdateCartData = (data) => {
    console.log(data);
  return dispatch => {
    axios.post(CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.URL,qs.stringify(data))
      .then(res => dispatch(recievedUpdateFromCartData(res.data)))
      .catch(err => dispatch(recievedUpdateFromCartDataError(err)))
  }
}

