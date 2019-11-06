import _get from 'lodash/get';
import * as VENDOR_CONSTANTS from '../constants/vendorReviews';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestVenderReviewsData = subreddit => ({
    type: VENDOR_CONSTANTS.REQUEST_VENDOR_REVIEWS_DATA,
    subreddit,
});

export const receiveVenderReviewsData = (subreddit, json) => ({
    type: VENDOR_CONSTANTS.RECEIVED_VENDOR_REVIEWS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveVenderReviewsDataError = (subreddit, err, errCode) => ({
    type: VENDOR_CONSTANTS.RECEIVED_VENDOR_REVIEWS_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchVendorPendingReviewsData = (data, subreddit) => dispatch => dispatch(dynamicActionWrapper({
    path: VENDOR_CONSTANTS.VENDOR_REVIEWS_DATA_URL,
    method: 'POST',
    body: data,
    initCb: requestVenderReviewsData,
    successCb: receiveVenderReviewsData,
    failureCb: receiveVenderReviewsDataError,
    subreddit,
    wrapperActionType: 'FETCH_VENDER_PENDING_REVIEWS_WRAPPER',
    redirect: 'follow',
}));

export const requestPostVenderReviewData = subreddit => ({
    type: VENDOR_CONSTANTS.REQUEST_POST_VENDOR_REVIEWS_DATA,
    subreddit,
});

export const receivePostVenderReviewData = (subreddit, json) => ({
    type: VENDOR_CONSTANTS.RECEIVED_POST_VENDOR_REVIEWS_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receivePostVenderReviewDataError = (subreddit, err, errCode) => ({
    type: VENDOR_CONSTANTS.RECEIVED_POST_VENDOR_REVIEWS_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchPostVendorPendingReviewData = (data, subreddit) => dispatch => dispatch(dynamicActionWrapper({
    path: VENDOR_CONSTANTS.POST_VENDOR_REVIEW_URL,
    method: 'POST',
    body: data,
    initCb: requestPostVenderReviewData,
    successCb: receivePostVenderReviewData,
    failureCb: receivePostVenderReviewDataError,
    subreddit,
    wrapperActionType: 'FETCH_POST_VENDER_PENDING_REVIEWS_WRAPPER',
    redirect: 'follow',
}));

export const fetchMyVendorreviews = (data, subreddit) => (dispatch) => {
    const constants = _get(VENDOR_CONSTANTS, 'MY_VENDOR_REVIEWS_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'MY_VENDOR_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchProductVendorReviews = (data, subreddit) => (dispatch) => {
    const constants = _get(VENDOR_CONSTANTS, 'PRODUCT_VENDOR_REVIEWS_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRODUCT_VENDOR_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};
