import * as TRACK_ORDER_CONSTANTS from '../constants/trackOrder';

const trackOrderReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    trackOrderData: [],
}, action) => {
    switch (action.type) {
        case TRACK_ORDER_CONSTANTS.REQUEST_TRACK_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                trackOrderData: [],
                lastUpdated: action.receivedAt,
            });
        case TRACK_ORDER_CONSTANTS.RECEIVED_TRACK_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                trackOrderData: action.data,
                lastUpdated: action.receivedAt,
            });
        case TRACK_ORDER_CONSTANTS.RECEIVED_TRACK_ORDER_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default trackOrderReducer;
