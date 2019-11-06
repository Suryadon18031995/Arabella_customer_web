import * as VENDOR_CONSTANTS from '../constants/vendorReviews';
import { MY_VENDOR_REVIEWS_URL_CONSTANTS, PRODUCT_VENDOR_REVIEWS_URL_CONSTANTS } from '../constants/vendorReviews';

const vendorReviewsReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    vendorReviewsData: [],
    reviewsResponseData: [],
    myReviewsData: [],
    productVendorReviews: [],
}, action) => {
    switch (action.type) {
        case VENDOR_CONSTANTS.REQUEST_VENDOR_REVIEWS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                vendorReviewsData: [],
                reviewsResponseData: [],
                myReviewsData: [],
                productVendorReviews: [],
            });
        case VENDOR_CONSTANTS.RECEIVED_VENDOR_REVIEWS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                vendorReviewsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case VENDOR_CONSTANTS.RECEIVED_VENDOR_REVIEWS_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case VENDOR_CONSTANTS.REQUEST_POST_VENDOR_REVIEWS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                vendorReviewsData: [],
            });
        case VENDOR_CONSTANTS.RECEIVED_POST_VENDOR_REVIEWS_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                reviewsResponseData: action.data,
                lastUpdated: action.receivedAt,
            });

        case VENDOR_CONSTANTS.RECEIVED_POST_VENDOR_REVIEWS_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case MY_VENDOR_REVIEWS_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                myReviewsData: [],
                productVendorReviews: [],
            });
        case MY_VENDOR_REVIEWS_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                myReviewsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case MY_VENDOR_REVIEWS_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case PRODUCT_VENDOR_REVIEWS_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                myReviewsData: [],
                productVendorReviews: [],
            });
        case PRODUCT_VENDOR_REVIEWS_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                productVendorReviews: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_VENDOR_REVIEWS_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default vendorReviewsReducer;
