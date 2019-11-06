import * as PRODUCT_CONSTANTS from '../constants/products';

const productDetailReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    productDetailsData: [],
    postTagsData: [],
    productReviewsData: [],
    upsellProductsData: [],
}, action) => {
    switch (action.type) {
        case PRODUCT_CONSTANTS.REQUEST_PRODUCT_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                productDetailsData: [],
                lastUpdated: action.receivedAt,
            });
        case PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                productDetailsData: action.data,
                lastUpdated: action.receivedAt,
            });
        case PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case PRODUCT_CONSTANTS.REQUEST_ADD_PRODUCT_TAGS:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                postTagsData: [],
            });
        case PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                postTagsData: action.data,
                lastUpdated: action.receivedAt,
            });
        case PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case PRODUCT_CONSTANTS.PRODUCT_REVIEWS_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                productReviewsData: [],
            });
        case PRODUCT_CONSTANTS.PRODUCT_REVIEWS_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                productReviewsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_CONSTANTS.PRODUCT_REVIEWS_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case PRODUCT_CONSTANTS.UPSELL_PRODUCTS_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                upsellProductsData: [],
            });
        case PRODUCT_CONSTANTS.UPSELL_PRODUCTS_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                upsellProductsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_CONSTANTS.UPSELL_PRODUCTS_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default productDetailReducer;
