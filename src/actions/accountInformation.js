
import * as ACCOUNT_INFORMATION_CONSTANTS from '../constants/accountInformation';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';
import _get from 'lodash/get';

export const requestAccountInformation = subreddit => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.REQUEST_ACCOUNT_INFORMATION,
    subreddit,
});

export const receiveAccountInformation = (subreddit, json) => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_ACCOUNT_INFORMATION,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveAccountInformationError = (subreddit, err, errCode) => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_ACCOUNT_INFORMATION_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchAccountInformationData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: ACCOUNT_INFORMATION_CONSTANTS.ACCOUNT_INFORMATION_URL,
        method: 'POST',
        body: data,
        initCb: requestAccountInformation,
        successCb: receiveAccountInformation,
        failureCb: receiveAccountInformationError,
        subreddit,
        wrapperActionType: 'FETCH_ACCOUNT_INFORMATION_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const requestEditAccountInformationRes = subreddit => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.REQUEST_EDIT_ACCOUNT_INFORMATION_RES,
    subreddit,
});

export const receiveEditAccountInformationRes = (subreddit, json) => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_EDIT_ACCOUNT_INFORMATION_RES,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveEditAccountInformationError = (subreddit, err, errCode) => ({
    type: ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_EDIT_ACCOUNT_INFORMATION_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchEditAccountInformationResult = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: ACCOUNT_INFORMATION_CONSTANTS.EDIT_ACCOUNT_INFORMATION_URL,
        method: 'PATCH',
        body: data,
        initCb: requestEditAccountInformationRes,
        successCb: receiveEditAccountInformationRes,
        failureCb: receiveEditAccountInformationError,
        subreddit,
        wrapperActionType: 'FETCH_EDIT_ACCOUNT_INFORMATION_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

// FOR MY Rewards
export const fetchMyRewardsData = (data, subreddit) => (dispatch) => {
    const constants = _get(ACCOUNT_INFORMATION_CONSTANTS, 'MY_REWARDS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
      path: _get(constants, 'URL'),
      method: 'POST',
      body: data,
      initCb: _get(generateFns({ constants }), 'request'),
      successCb: _get(generateFns({ constants }), 'recieved'),
      failureCb: _get(generateFns({ constants }), 'recievedErr'),
      subreddit,
      wrapperActionType: 'MY_REWARDS_CONSTANTS_WRAPPER',
      redirect: 'follow',
    }));
  };
