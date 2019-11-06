import _get from 'lodash/get';
import * as MY_ORDER_CONSTANTS from '../constants/myOrder';
import {
    VIEW_ORDER_URL_CONSTANTS, DOWNLOAD_INVOICES_URL_CONSTANTS, MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS, REORDER_CONSTANTS
} from '../constants/myOrder';

const myOrderReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    myOrderData: [],
    myInvoiceData: [],
    openTermData: [],
    viewOrderData: [],
    invoicePdfData: [],
    multipleOrderPaymentData: [],
    reorderData: [],
    orderId: '',
    primeOrdersData: [],
    primeCancelData: [],
    primeRenewalData: [],
    primeUpgradeData: [],
    cancelSubscriptionData: [],
}, action) => {
    switch (action.type) {
        case MY_ORDER_CONSTANTS.REQUEST_MY_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                myOrderData: [],
                myInvoiceData: [],
                openTermData: [],
                cancelSubscriptionData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.RECEIVED_MY_ORDER_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                myInvoiceData: [],
                openTermData: [],
                myOrderData: action.data,
            });
        case MY_ORDER_CONSTANTS.RECEIVED_MY_ORDER_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // my invoice
        case MY_ORDER_CONSTANTS.REQUEST_MY_INVOICE_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                myInvoiceData: [],
                myOrderData: [],
                openTermData: [],
                lastUpdated: action.receivedAt,
                invoicePdfData: [],
            });
        case MY_ORDER_CONSTANTS.RECEIVED_MY_INVOICE_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                openTermData: [],
                myOrderData: [],
                myInvoiceData: action.data,
                invoicePdfData: [],
            });
        case MY_ORDER_CONSTANTS.RECEIVED_MY_INVOICE_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // open term
        case MY_ORDER_CONSTANTS.REQUEST_OPEN_TERM_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                openTermData: [],
                myOrderData: [],
                myInvoiceData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.RECEIVED_OPEN_TERM_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                myOrderData: [],
                myInvoiceData: [],
                openTermData: action.data,
                invoicePdfData: [],
            });
        case MY_ORDER_CONSTANTS.RECEIVED_OPEN_TERM_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // view Order
        case VIEW_ORDER_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                viewOrderData: [],
                lastUpdated: action.receivedAt,
                invoicePdfData: [],
            });
        case VIEW_ORDER_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                viewOrderData: action.data,
                invoicePdfData: [],
            });
        case VIEW_ORDER_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Download pdf
        case DOWNLOAD_INVOICES_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                invoicePdfData: [],
                openTermData: [],
                multipleOrderPaymentData: [],
                lastUpdated: action.receivedAt,
            });
        case DOWNLOAD_INVOICES_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                openTermData: [],
                multipleOrderPaymentData: [],
                invoicePdfData: action.data,
            });
        case DOWNLOAD_INVOICES_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Multiple Order Payment Open terms
        case MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                invoicePdfData: [],
                openTermData: [],
                multipleOrderPaymentData: [],
                lastUpdated: action.receivedAt,
            });
        case MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                openTermData: [],
                multipleOrderPaymentData: action.data,
            });
        case MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case MY_ORDER_CONSTANTS.SET_ORDER_ID:
            return Object.assign({}, state, {
                type: action.type,
                orderId: action.data,
            });
        // Multiple Order Payment Open terms
        case REORDER_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                reorderData: [],
                lastUpdated: action.receivedAt,
            });
        case REORDER_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                reorderData: action.data,
            });
        case REORDER_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Premium Order History
        case MY_ORDER_CONSTANTS.PRIME_ORDER_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                primeOrdersData: [],
                primeCancelData: [],
                primeRenewalData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.PRIME_ORDER_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                primeOrdersData: action.data,
            });
        case MY_ORDER_CONSTANTS.PRIME_ORDER_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Premium Membership Cancel
        case MY_ORDER_CONSTANTS.CANCEL_PRIME_MEMBERSHIP_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                primeCancelData: [],
                primeRenewalData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.CANCEL_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                primeCancelData: action.data,
            });
        case MY_ORDER_CONSTANTS.CANCEL_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Premium Membership Renewal
        case MY_ORDER_CONSTANTS.RENEW_PRIME_MEMBERSHIP_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                primeCancelData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.RENEW_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                primeRenewalData: action.data,
            });
        case MY_ORDER_CONSTANTS.RENEW_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Premium Membership Upgrade
        case MY_ORDER_CONSTANTS.UPGRADE_PRIME_MEMBERSHIP_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                primeCancelData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.UPGRADE_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                primeUpgradeData: action.data,
            });
        case MY_ORDER_CONSTANTS.UPGRADE_PRIME_MEMBERSHIP_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        // Cancel Subscription Order
        case MY_ORDER_CONSTANTS.CANCEL_SUBSCRIPTION_ORDER_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cancelSubscriptionData: [],
                lastUpdated: action.receivedAt,
            });
        case MY_ORDER_CONSTANTS.CANCEL_SUBSCRIPTION_ORDER_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                cancelSubscriptionData: action.data,
            });
        case MY_ORDER_CONSTANTS.CANCEL_SUBSCRIPTION_ORDER_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default myOrderReducer;
