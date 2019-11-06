
import * as RECCURING_PROFILE_CONSTANTS from '../constants/recurringProfiles';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestRecurringProfileData = subreddit => ({
    type: RECCURING_PROFILE_CONSTANTS.REQUEST_RECCURING_PROFILE_DATA,
    subreddit,
});

export const receiveRecurringProfileData = (subreddit, json) => ({
    type: RECCURING_PROFILE_CONSTANTS.RECEIVED_RECCURING_PROFILE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveRecurringProfileDataError = (subreddit, err, errCode) => ({
    type: RECCURING_PROFILE_CONSTANTS.RECEIVED_RECCURING_PROFILE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchRecurringProfileData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: RECCURING_PROFILE_CONSTANTS.RECCURING_PROFILE_URL,
        method: 'POST',
        body: data,
        initCb: requestRecurringProfileData,
        successCb: receiveRecurringProfileData,
        failureCb: receiveRecurringProfileDataError,
        subreddit,
        wrapperActionType: 'FETCH_RECCURING_PROFILE_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchRecurringProfileDetail = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: RECCURING_PROFILE_CONSTANTS.RECCURING_PROFILE_URL,
        method: 'POST',
        body: data,
        initCb: requestRecurringProfileData,
        successCb: receiveRecurringProfileData,
        failureCb: receiveRecurringProfileDataError,
        subreddit,
        wrapperActionType: 'FETCH_RECCURING_PROFILE_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchRecurringProfileUpdate = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: RECCURING_PROFILE_CONSTANTS.RECCURING_PROFILE_URL,
        method: 'PATCH',
        body: data,
        initCb: requestRecurringProfileData,
        successCb: receiveRecurringProfileData,
        failureCb: receiveRecurringProfileDataError,
        subreddit,
        wrapperActionType: 'FETCH_RECCURING_PROFILE_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

