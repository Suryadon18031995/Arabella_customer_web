import * as VENDOR_CONSTANTS from '../constants/vendorArtists';

const vendorArtistsReducer = (state = {
    data: {},
    productUploadData: {},
    uploadingProduct: false,
    productsList: {},
    locationDetails: {},
    type: '',
    error: '',
    isFetching: false,
    updatingLogistics: false,
    updatingProduct: false,
    poData: {},
    poStatusUpdating: false,
    fetchingRID: false,
    ridData: {},
    raisingInvoice: false,
    loggingIn: false,
    artistDetails: {},
    productRequirements: {}
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
                    uploadingProduct: true,
                    productUploadData: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PRODUCT_UPLOAD_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                uploadingProduct: false,
                productUploadData: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_PRODUCT_UPLOAD_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                uploadingProduct: false
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

        /* FOR UPDATE VENDOR LOGISTIC SETTINGS UPADTE */
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

        /* FOR CREATE VENDOR LOGISTIC SETTINGS UPADTE */
        case VENDOR_CONSTANTS.ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    updatingLogistics: true
                });
            }
        case VENDOR_CONSTANTS.ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                updatingLogistics: false
            });

        case VENDOR_CONSTANTS.ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                updatingLogistics: false
            });

        /* FOR UPADTE PRODUCT */
        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_UPDATE_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    updatingProduct: true
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_UPDATE_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                updatingProduct: false
            });

        case VENDOR_CONSTANTS.ARTIST_PRODUCTS_UPDATE_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                updatingProduct: false
            });

        /* FOR CONFIRM PO DETAILS */
        case VENDOR_CONSTANTS.ARTIST_SHOW_PO_DETAILS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    poData: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_SHOW_PO_DETAILS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                poData: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_SHOW_PO_DETAILS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error
            });

        /* FOR CONFIRM PO */
        case VENDOR_CONSTANTS.ARTIST_PO_ACTION_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    poStatusUpdating: true
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PO_ACTION_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                poStatusUpdating: false
            });

        case VENDOR_CONSTANTS.ARTIST_PO_ACTION_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                poStatusUpdating: false
            });

        /* FOR GET RAISE VENDOR INVOICE DETAILS */
        case VENDOR_CONSTANTS.ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    fetchingRID: true,
                    ridData: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                fetchingRID: false,
                ridData: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                fetchingRID: false,
                ridData: {}
            });

        /* FOR RAISING VENDOR INVOICE */
        case VENDOR_CONSTANTS.ARTIST_RAISE_INVOICE_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    raisingInvoice: true
                });
            }
        case VENDOR_CONSTANTS.ARTIST_RAISE_INVOICE_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                raisingInvoice: false
            });

        case VENDOR_CONSTANTS.ARTIST_RAISE_INVOICE_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                raisingInvoice: false
            });

        /* FOR ARTIST LOGIN */
        case VENDOR_CONSTANTS.ARTIST_LOGIN_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    loggingIn: true,
                    artistDetails: { code: 1, result: { vendor_id: 440, vendor_name: "Jnanesh Kumar", api_token: "2454b00fce0b633efc24714f7f0131fa:Wb" }}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_LOGIN_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                loggingIn: false,
                // artistDetails: action.data
                artistDetails: { code: 1, result: { vendor_id: 440, vendor_name: "Jnanesh Kumar",api_token: "2454b00fce0b633efc24714f7f0131fa:Wb" }}
            });

        case VENDOR_CONSTANTS.ARTIST_LOGIN_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                loggingIn: false,
                artistDetails: { code: 1, result: { vendor_id: 440, vendor_name: "Jnanesh Kumar",api_token: "2454b00fce0b633efc24714f7f0131fa:Wb" }}
            });

        /* FOR ARTIST LOGOUT */
        case VENDOR_CONSTANTS.ARTIST_LOGOUT_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    artistDetails: {}
                });
            }
        case VENDOR_CONSTANTS.ARTIST_LOGOUT_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                artistDetails: {}
            });

        case VENDOR_CONSTANTS.ARTIST_LOGOUT_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                artistDetails: {}
            });

        /* FOR PRODUCT REQUIREMENTS */
        case VENDOR_CONSTANTS.ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                });
            }
        case VENDOR_CONSTANTS.ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                productRequirements: action.data
            });

        case VENDOR_CONSTANTS.ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
    }
}

export default vendorArtistsReducer;