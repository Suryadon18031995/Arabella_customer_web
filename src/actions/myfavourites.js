import _get from 'lodash/get';
import * as MYFAVOURITE_CONSTANTS from '../constants/myfavourites';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestMyFavouritesinfo = subreddit => ({
    type: MYFAVOURITE_CONSTANTS.REQUEST_MYFAVOURITE_INFO,
    subreddit,
});
export const receiveMyFavouritesinfo = (subreddit, json) => ({
    type: MYFAVOURITE_CONSTANTS.RECEIVE_MYFAVOURITE_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});


const receiveMyFavouritesinfoError = (subreddit, err, errCode) => ({
    type: MYFAVOURITE_CONSTANTS.RECEIVED_MYFAVOURITE_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchMyFavouritesinfo = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: MYFAVOURITE_CONSTANTS.MYFAVOURITE_DATA_URL,
        method: 'POST',
        body: data,
        initCb: requestMyFavouritesinfo,
        successCb: receiveMyFavouritesinfo,
        failureCb: receiveMyFavouritesinfoError,
        subreddit,
        wrapperActionType: 'FETCH_MYFAVOURITE_INFO_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestUpdatedMyfavouriteinfo = subreddit => ({
    type: MYFAVOURITE_CONSTANTS.REQUEST_REMOVE_FROM_MYFAVOURITE,
    subreddit,
});
export const receiveUpdatedMyfavouriteinfo = (subreddit, json) => ({
    type: MYFAVOURITE_CONSTANTS.RECEIVE_UPDATED_MYFAVOURITE_INFO,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});


const receiveUpdatedMyfavouriteinfoError = (subreddit, err, errCode) => ({
    type: MYFAVOURITE_CONSTANTS.RECEIVED_UPDATED_MYFAVOURITE_INFO_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});
export const fetchUpdatedMyfavouriteinfo = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: MYFAVOURITE_CONSTANTS.MYFAVOURITE_REMOVE_URL,
        method: 'DELETE',
        body: data,
        initCb: requestUpdatedMyfavouriteinfo,
        successCb: receiveUpdatedMyfavouriteinfo,
        failureCb: receiveUpdatedMyfavouriteinfoError,
        subreddit,
        wrapperActionType: 'FETCH_UPDATED_MYFAVOURITE_INFO_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};


export const fetchAddToFavsData = (data, subreddit) => (dispatch) => {
    const constants = _get(MYFAVOURITE_CONSTANTS, 'ADD_TO_FAVORITES_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'ADD_TO_FAVS_WRAPPER',
        redirect: 'follow',
    }));
};


export const clearMyfavouriteReducer = subreddit => ({
    type: MYFAVOURITE_CONSTANTS.CLEAR_MYFAVOURITE_DATA,
    subreddit,
});
