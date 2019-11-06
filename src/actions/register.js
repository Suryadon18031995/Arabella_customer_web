
import * as REGISTER_CONSTANTS from '../constants/register';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestRegisterData = subreddit => ({
    type: REGISTER_CONSTANTS.REQUEST_REGISTER_SEARCH,
    subreddit,
});

export const receiveRegisterData = (subreddit, json) => ({
    type: REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveRegisterDataError = (subreddit, err, errCode) => ({
    type: REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchCustomerRegisterData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: REGISTER_CONSTANTS.REGISTER_URL,
        method: 'POST',
        body: data,
        initCb: requestRegisterData,
        successCb: receiveRegisterData,
        failureCb: receiveRegisterDataError,
        subreddit,
        wrapperActionType: 'FETCH_REGISTER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestStateListData = subreddit => ({
    type: REGISTER_CONSTANTS.REQUEST_STATE_LIST_SEARCH,
    subreddit,
});

export const receiveStateListData = (subreddit, json) => ({
    type: REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveStateListDataError = (subreddit, err, errCode) => ({
    type: REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchStateListData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: REGISTER_CONSTANTS.STATE_LIST_URL,
        method: 'POST',
        body: data,
        initCb: requestStateListData,
        successCb: receiveStateListData,
        failureCb: receiveStateListDataError,
        subreddit,
        wrapperActionType: 'FETCH_STATE_LIST_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestTrackUrlData = subreddit => ({
    type: REGISTER_CONSTANTS.REQUEST_TRACK_URL,
    subreddit,
});

export const receiveTrackUrlData = (subreddit, json) => ({
    type: REGISTER_CONSTANTS.RECEIVED_TRACK_URL,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveTrackUrlDataError = (subreddit, err, errCode) => ({
    type: REGISTER_CONSTANTS.RECEIVED_TRACK_URL_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchTrackUrlData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: REGISTER_CONSTANTS.TRACK_URL,
        method: 'POST',
        body: data,
        initCb: requestTrackUrlData,
        successCb: receiveTrackUrlData,
        failureCb: receiveTrackUrlDataError,
        subreddit,
        wrapperActionType: 'FETCH_TRACK_URL_WRAPPER',
        redirect: 'follow',
    }));
};
