import * as SALESREP_CONSTANTS from '../constants/salesRep';

const salesRepReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    salesRepInfo: [],
}, action) => {
    switch (action.type) {
        case SALESREP_CONSTANTS.REQUEST_SALESREP:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                salesRepInfo: [],
                lastUpdated: action.receivedAt,
            });
        case SALESREP_CONSTANTS.RECEIVED_SALESREP:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                salesRepInfo: action.data,
                lastUpdated: action.receivedAt,
            });
        case SALESREP_CONSTANTS.RECEIVED_SALESREP_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default salesRepReducer;
