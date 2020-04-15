import * as PRODUCT_CONSTANTS from '../constants/products';

const productDetailReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    productDetailsData: [],
    postTagsData: [],
    productReviewsData: [],
    upsellProductsData: [],
    reviewData:[],
    productListing:[],
    postPRSuccess:[],
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
        case PRODUCT_CONSTANTS.REQUEST_UPSELL_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                upsellProductsData: [],
            });
        case PRODUCT_CONSTANTS.RECEIVED_UPSELL_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                upsellProductsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_CONSTANTS.RECEIVED_UPSELL_PRODUCTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case PRODUCT_CONSTANTS.REQUEST_PRODUCTS_REVIEW_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                reviewData: [],
            });
        case PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_REVIEW_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                reviewData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_REVIEW_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case PRODUCT_CONSTANTS.REQUEST_PRODUCTS_LISTING_DATA:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    productListing: [],
                });
            case PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_LISTING_DATA:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    productListing: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_LISTING_DATA_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
                case PRODUCT_CONSTANTS.RECEIVED_POST_PRODUCT_REVIEW_SUCCESS:
                    return Object.assign({}, state, {
                        isFetching: false,
                        type: action.type,
                        didInvalidate: false,
                        postPRSuccess: action.data,
                        lastUpdated: action.receivedAt,
                    });
                case PRODUCT_CONSTANTS.RECEIVED_POST_PRODUCT_REVIEW_ERROR:
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
