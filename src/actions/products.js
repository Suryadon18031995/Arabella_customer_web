import _get from 'lodash/get';
import * as PRODUCT_CONSTANTS from '../constants/products';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestProductDetails = subreddit => ({
    type: PRODUCT_CONSTANTS.REQUEST_PRODUCT_DETAIL,
    subreddit,
});

export const recievedProductDetails = (subreddit, json) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const recievedProductDetailsError = (subreddit, err, errCode) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchProductDetails = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANTS.PRODUCTS_DETAIL_URL,
        method: 'POST',
        body: data,
        initCb: requestProductDetails,
        successCb: recievedProductDetails,
        failureCb: recievedProductDetailsError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_DETAIL_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestRelatedProducts = subreddit => ({
    type: PRODUCT_CONSTANTS.REQUEST_RELATED_PRODUCT,
    subreddit,
});

export const recievedRelatedProducts = (subreddit, json) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const recievedRelatedProductsError = (subreddit, err, errCode) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchRelatedProducts = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANTS.RELATED_PRODUCTS_URL,
        method: 'POST',
        body: data,
        initCb: requestRelatedProducts,
        successCb: recievedRelatedProducts,
        failureCb: recievedRelatedProductsError,
        subreddit,
        wrapperActionType: 'FETCH_RELATED_PRODUCT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestAddProductTags = subreddit => ({
    type: PRODUCT_CONSTANTS.REQUEST_ADD_PRODUCT_TAGS,
    subreddit,
});

export const recievedAddProductTags = (subreddit, json) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const recievedAddProductTagsError = (subreddit, err, errCode) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});


export const postTags = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANTS.ADD_PRODUCT_TAGS_URL,
        method: 'POST',
        body: data,
        initCb: requestAddProductTags,
        successCb: recievedAddProductTags,
        failureCb: recievedAddProductTagsError,
        subreddit,
        wrapperActionType: 'ADD_PRODUCT_TAGS_WRAPPER',
        redirect: 'follow',
    }));
};

export const postReviews = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'PRODUCT_REVIEWS_URL_CONSTANTS');
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

export const fetchProductReviews = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'PRODUCT_REVIEWS_LIST_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRODUCT_REVIEWS_LIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchHoverProductReviews = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRODUCT_HOVER_REVIEWS_LIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchProductTags = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'PRODUCT_TAGS_LIST_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRODUCT_TAGS_LIST_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchProductTagDetails = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'PRODUCT_TAG_DETAILS_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PRODUCT_TAG_DETAILS_WRAPPER',
        redirect: 'follow',
    }));
};

export const removeProductTagDetails = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'REMOVE_TAG_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'DELETE',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'REMOVE_TAG_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchUpsellingProducts = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'UPSELL_PRODUCTS_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_UPSELL_PRODUCTS_WRAPPER',
        redirect: 'follow',
    }));
};
