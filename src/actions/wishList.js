import _get from 'lodash/get';
import * as WISHLIST_CONSTANTS from '../constants/wishList';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';


export const requestWishlistinfo = subreddit => ({
    type: WISHLIST_CONSTANTS.REQUEST_WISHLIST_INFO,
    subreddit,
});
export const receiveWishlistinfo = (subreddit, json) => ({
    type: WISHLIST_CONSTANTS.RECEIVE_WISHLIST_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});


const receiveWishlistinfoError = (subreddit, err, errCode) => ({
    type: WISHLIST_CONSTANTS.RECEIVED_WISHLIST_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchWishlistinfo = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: WISHLIST_CONSTANTS.WISHLIST_DATA_URL,
        method: 'POST',
        body: data,
        initCb: requestWishlistinfo,
        successCb: receiveWishlistinfo,
        failureCb: receiveWishlistinfoError,
        subreddit,
        wrapperActionType: 'FETCH_WISHLIST_INFO_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestUpdatedWishlistinfo = subreddit => ({
    type: WISHLIST_CONSTANTS.REQUEST_REMOVE_FROM_WISHLIST,
    subreddit,
});
export const receiveUpdatedWishlistinfo = (subreddit, json) => ({
    type: WISHLIST_CONSTANTS.RECEIVE_UPDATED_WISHLIST_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});


const receiveUpdatedWishlistinfoError = (subreddit, err, errCode) => ({
    type: WISHLIST_CONSTANTS.RECEIVED_UPDATED_WISHLIST_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});
export const fetchUpdatedWishlistinfo = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: WISHLIST_CONSTANTS.WISHLIST_REMOVE_URL,
        method: 'DELETE',
        body: data,
        initCb: requestUpdatedWishlistinfo,
        successCb: receiveUpdatedWishlistinfo,
        failureCb: receiveUpdatedWishlistinfoError,
        subreddit,
        wrapperActionType: 'FETCH_UPDATED_WISHLIST_INFO_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchAddToWishlistData = (data, subreddit) => (dispatch) => {
    const constants = _get(WISHLIST_CONSTANTS, 'ADD_TO_WISHLIST_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'ADD_TO_WISHLIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const clearWishlistReducer = subreddit => ({
    type: WISHLIST_CONSTANTS.CLEAR_WISHLIST_DATA,
    subreddit,
});
