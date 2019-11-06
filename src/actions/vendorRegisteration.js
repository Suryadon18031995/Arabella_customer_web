
import * as VENDOR_REGISTRATION_CONSTANTS from '../constants/vendorRegistration';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestVendorRegistrationData = subreddit => ({
    type: VENDOR_REGISTRATION_CONSTANTS.REQUEST_VENDOR_REGISTRATION_DATA,
    subreddit,
});

export const receiveVendorRegistrationData = (subreddit, json) => ({
    type: VENDOR_REGISTRATION_CONSTANTS.RECEIVED_VENDOR_REGISTRATION_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveVendorRegistrationDataError = (subreddit, err, errCode) => ({
    type: VENDOR_REGISTRATION_CONSTANTS.RECEIVED_VENDOR_REGISTRATION_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchVendorRegistrationData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: VENDOR_REGISTRATION_CONSTANTS.VENDOR_REGISTRATION_URL,
        method: 'POST',
        body: data,
        initCb: requestVendorRegistrationData,
        successCb: receiveVendorRegistrationData,
        failureCb: receiveVendorRegistrationDataError,
        subreddit,
        wrapperActionType: 'FETCH_VENDOR_REGISTRATION_RESULT_WRAPPER',
        redirect: 'follow',
    }));
};

