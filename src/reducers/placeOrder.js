import * as PLACE_ORDER_CONSTANTS from '../constants/placeOrder';
import {
    ADD_FIRST_DATA_CREDIT_CARD_CONSTANTS,
    ADD_PAYPAL_CREDIT_CARD_CONSTANTS,
    GET_SAVED_CARD_CONSTANTS,
    GET_ORDER_ID_CONSTANTS,
    UPDATE_PRODUCTS_CONSTANTS,
    GET_BRAINTREE_CLIENT_TOKEN_CONSTANTS,
} from '../constants/placeOrder';

const placeOrderReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    placeOrderData: [],
    firstData: [],
    paymentMethodInfoData: [],
    subscriptionHelperData: [],
    firstDataCreditCardRes: [],
    paypalCreditCardRes: [],
    savedCardResult: [],
    orderIdData: [],
    updatedProductsQty: {},
    braintreeClientToken: '',
}, action) => {
    switch (action.type) {
        case PLACE_ORDER_CONSTANTS.REQUEST_PLACE_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                placeOrderData: [],
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_PLACE_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                placeOrderData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_PLACE_ORDER_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case PLACE_ORDER_CONSTANTS.REQUEST_FIRSTDATA_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                firstData: [],
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_FIRSTDATA_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                firstData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_FIRSTDATA_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case PLACE_ORDER_CONSTANTS.CLEAR_PLACE_ORDER_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                isFetching: false,
                placeOrderData: [],
                paypalCreditCardRes: [],
                firstDataCreditCardRes: [],
            });
        case PLACE_ORDER_CONSTANTS.SET_FIRST_DATA_REDIRECTION:
            return Object.assign({}, state, {
                type: action.type,
                firstDataRedirection: action.data,
            });

        case PLACE_ORDER_CONSTANTS.REQUEST_PAYMENT_METHOD_INFO_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                paymentMethodInfoData: [],
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_PAYMENT_METHOD_INFO_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                paymentMethodInfoData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_PAYMENT_METHOD_INFO_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case PLACE_ORDER_CONSTANTS.REQUEST_SUBSCRIPTION_HELPER:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                subscriptionHelperData: [],
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_SUBSCRIPTION_HELPER:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                subscriptionHelperData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PLACE_ORDER_CONSTANTS.RECEIVED_SUBSCRIPTION_HELPER_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case ADD_FIRST_DATA_CREDIT_CARD_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                firstDataCreditCardRes: [],
                lastUpdated: action.receivedAt,
            });

        case ADD_FIRST_DATA_CREDIT_CARD_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                firstDataCreditCardRes: action.data,
                lastUpdated: action.receivedAt,
            });

        case ADD_FIRST_DATA_CREDIT_CARD_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case ADD_PAYPAL_CREDIT_CARD_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                paypalCreditCardRes: [],
                lastUpdated: action.receivedAt,
            });

        case ADD_PAYPAL_CREDIT_CARD_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                paypalCreditCardRes: action.data,
                lastUpdated: action.receivedAt,
            });

        case ADD_PAYPAL_CREDIT_CARD_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case GET_SAVED_CARD_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                savedCardResult: [],
                lastUpdated: action.receivedAt,
            });

        case GET_SAVED_CARD_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                savedCardResult: action.data,
                lastUpdated: action.receivedAt,
            });

        case GET_SAVED_CARD_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case GET_ORDER_ID_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                orderIdData: [],
                lastUpdated: action.receivedAt,
            });

        case GET_ORDER_ID_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                orderIdData: action.data,
                lastUpdated: action.receivedAt,
            });

        case GET_ORDER_ID_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case UPDATE_PRODUCTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });

        case UPDATE_PRODUCTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                updatedProductsQty: action.data,
                lastUpdated: action.receivedAt,
            });

        case UPDATE_PRODUCTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

            case GET_BRAINTREE_CLIENT_TOKEN_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });

        case GET_BRAINTREE_CLIENT_TOKEN_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                braintreeClientToken: action.data,
                lastUpdated: action.receivedAt,
            });

        case GET_BRAINTREE_CLIENT_TOKEN_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default placeOrderReducer;
