import _get from 'lodash/get';
import * as PAST_PURCHASE_CONSTANTS from '../constants/pastPurchase';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const fetchPastPurchaseData = (data, subreddit) => (dispatch) => {
    const constants = _get(PAST_PURCHASE_CONSTANTS, 'PAST_PURCHASE_URL');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'PAST_PURCHASE_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

