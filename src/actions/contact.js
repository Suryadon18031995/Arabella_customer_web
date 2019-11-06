import _get from 'lodash/get';
import * as SUBMIT_CONTACT_CONSTANTS from '../constants/contact';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const fetchContactData = (data, subreddit) => (dispatch) => {
    const constants = _get(SUBMIT_CONTACT_CONSTANTS, 'CONTACT_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'SUBMIT_CONTACT_REVIEWS_WRAPPER',
        redirect: 'follow',
    }));
};

