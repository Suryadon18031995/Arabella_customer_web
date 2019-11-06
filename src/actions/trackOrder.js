
import * as TRACK_ORDER_CONSTANTS from '../constants/trackOrder';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestTrackOrderData = subreddit => ({
    type: TRACK_ORDER_CONSTANTS.REQUEST_TRACK_ORDER_SEARCH,
    subreddit,
});

export const receiveTrackOrderData = (subreddit, json) => ({
    type: TRACK_ORDER_CONSTANTS.RECEIVED_TRACK_ORDER_SEARCH,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveTrackOrderDataError = (subreddit, err, errCode) => ({
    type: TRACK_ORDER_CONSTANTS.RECEIVED_TRACK_ORDER_SEARCH_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchTrackOrderData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: TRACK_ORDER_CONSTANTS.TRACK_ORDER_URL,
        method: 'POST',
        body: data,
        initCb: requestTrackOrderData,
        successCb: receiveTrackOrderData,
        failureCb: receiveTrackOrderDataError,
        subreddit,
        wrapperActionType: 'FETCH_TRACK_ORDER_SEARCH_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};
