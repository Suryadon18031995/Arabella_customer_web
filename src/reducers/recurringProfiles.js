import * as RECCURING_PROFILE_CONSTANTS from '../constants/recurringProfiles';

const recurringProfileReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    recurringProfileData: [],
}, action) => {
    switch (action.type) {
        case RECCURING_PROFILE_CONSTANTS.REQUEST_RECCURING_PROFILE_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                recurringProfileData: [],
                lastUpdated: action.receivedAt,
            });
        case RECCURING_PROFILE_CONSTANTS.RECEIVED_RECCURING_PROFILE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                recurringProfileData: action.data,
                lastUpdated: action.receivedAt,
            });
        case RECCURING_PROFILE_CONSTANTS.RECEIVED_RECCURING_PROFILE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default recurringProfileReducer;
