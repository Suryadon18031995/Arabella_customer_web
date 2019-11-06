import { PAST_PURCHASE_URL } from '../constants/pastPurchase';

const pastPurchaseReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    pastPurchaseData: [],
}, action) => {
    switch (action.type) {
        case PAST_PURCHASE_URL.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                pastPurchaseData: [],
                lastUpdated: action.receivedAt,
            });
        case PAST_PURCHASE_URL.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                pastPurchaseData: action.data,
                lastUpdated: action.receivedAt,
            });
        case PAST_PURCHASE_URL.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default pastPurchaseReducer;
