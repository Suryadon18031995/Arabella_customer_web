import { PRODUCT_REVIEWS_LIST_URL_CONSTANTS, HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS } from '../constants/products';

const productReviewsReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    productReviewsData: [],
    hoverProductReviewsData: [],
}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEWS_LIST_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                productReviewsData: [],
            });
        case PRODUCT_REVIEWS_LIST_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                productReviewsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_REVIEWS_LIST_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                productReviewsData: [],
                hoverProductReviewsData: [],
            });
        case HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                hoverProductReviewsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default productReviewsReducer;
