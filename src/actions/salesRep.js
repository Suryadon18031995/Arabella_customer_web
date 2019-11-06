
import * as SALESREP_CONSTANTS from '../constants/salesRep';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestSalesrepData = subreddit => ({
    type: SALESREP_CONSTANTS.REQUEST_SALESREP,
    subreddit,
});

export const receiveSalesrepData = (subreddit, json) => ({
    type: SALESREP_CONSTANTS.RECEIVED_SALESREP,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveSalesrepDataError = (subreddit, err, errCode) => ({
    type: SALESREP_CONSTANTS.RECEIVED_SALESREP_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchSalesRepData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: SALESREP_CONSTANTS.SALESREP_URL,
        method: 'POST',
        body: data,
        initCb: requestSalesrepData,
        successCb: receiveSalesrepData,
        failureCb: receiveSalesrepDataError,
        subreddit,
        wrapperActionType: 'FETCH_SALESREP_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchSalesRepStoreData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: SALESREP_CONSTANTS.SALESREP_STORE_URL,
        method: 'POST',
        body: data,
        initCb: requestSalesrepData,
        successCb: receiveSalesrepData,
        failureCb: receiveSalesrepDataError,
        subreddit,
        wrapperActionType: 'FETCH_SALESREP_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

