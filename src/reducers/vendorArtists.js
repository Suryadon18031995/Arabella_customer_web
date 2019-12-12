import * as VENDOR_CONSTANTS from '../constants/vendorArtists';

const vendorArtistsReducer = (state = {
    data: {},
    productUploadData: {},
    productsList: {},
    locationDetails: {},
    type: '',
    error: '',
    isFetching: false,
    updatingLogistics: false
}, action) => {
    switch (action.type) {
        default:
            return state;

        /* FOR VENDOR PO MANAGEMENT */
        case VENDOR_CONSTANTS.ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                });
            }
        case VENDOR_CONSTANTS.ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                data: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR VENDOR PRODUCT UPLOADS */
        case VENDOR_CONSTANTS.ARTIST_PRODUCT_UPLOAD_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    productUploadData: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PRODUCT_UPLOAD_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                productUploadData: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_PRODUCT_UPLOAD_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR VENDOR PRODUCTS LIST */
        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_LIST_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    productsList: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_LIST_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                productsList: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_LIST_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR VENDOR LOCATION DETAILS */
        case VENDOR_CONSTANTS.ARTIST_LOGISTIC_SETTINGS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    locationDetails: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_LOGISTIC_SETTINGS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                locationDetails: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_LOGISTIC_SETTINGS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR VENDOR LOGISTIC SETTINGS UPADTE */
        case VENDOR_CONSTANTS.ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    updatingLogistics: true
                });
            }
        case VENDOR_CONSTANTS.ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                updatingLogistics: false
            });

        case VENDOR_CONSTANTS.ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                updatingLogistics: false
            });
    }
}

export default vendorArtistsReducer;