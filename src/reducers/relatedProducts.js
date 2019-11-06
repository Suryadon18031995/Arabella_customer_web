import * as PRODUCT_CONSTANTS from '../constants/products';

const relatedProductReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    relatedProductsData: [],
}, action) => {
    switch (action.type) {
        case PRODUCT_CONSTANTS.REQUEST_RELATED_PRODUCT:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                relatedProductsData: [],
            });
        case PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                relatedProductsData: action.data,
                lastUpdated: action.receivedAt,
            });
        case PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default relatedProductReducer;
