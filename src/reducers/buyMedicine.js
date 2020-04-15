import * as BUY_MEDICINE_CONSTANTS from '../constants/buyMedicine';

const buyMedicineReducer = (state = {
     hcData: [],
     exploreData:[],
     postReviewStatus:[],
     genericMedicine:[],
     onlineSalesMain:[],
     onlineSalesSub:[],
     testData:[],
     featuredBrand:[],
     topBrand:[],
}, action) => {
    switch (action.type) {
        case BUY_MEDICINE_CONSTANTS.REQUEST_FEATURED_BRAND_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                featuredBrand: [],
            });
        case BUY_MEDICINE_CONSTANTS.RECEIVED_FEATURED_BRAND_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                featuredBrand: action.data,
                lastUpdated: action.receivedAt,
            });

        case BUY_MEDICINE_CONSTANTS.RECEIVED_FEATURED_BRAND_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case BUY_MEDICINE_CONSTANTS.REQUEST_TOP_BRAND_DETAIL:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    topBrand: [],
                });
            case BUY_MEDICINE_CONSTANTS.RECEIVED_TOP_BRAND_DETAIL:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    topBrand: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case BUY_MEDICINE_CONSTANTS.RECEIVED_TOP_BRAND_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
        case BUY_MEDICINE_CONSTANTS.REQUEST_ONLINE_SALES_MAIN:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                onlineSalesMain: [],
            });
        case BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_MAIN:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                onlineSalesMain: action.data,
                lastUpdated: action.receivedAt,
            });

        case BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_MAIN_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case BUY_MEDICINE_CONSTANTS.REQUEST_ONLINE_SALES_SUB:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    onlineSalesSub: [],
                });
            case BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_SUB:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    onlineSalesSub: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_SUB_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
        case BUY_MEDICINE_CONSTANTS.REQUEST_SHOP_HC_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                hcData: [],
            });
        case BUY_MEDICINE_CONSTANTS.RECEIVED_SHOP_HC_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                hcData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BUY_MEDICINE_CONSTANTS.RECEIVED_SHOP_HC_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

            case BUY_MEDICINE_CONSTANTS.REQUEST_GENERIC_MEDICINE_DETAIL:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    genericMedicine: [],
                });
            case BUY_MEDICINE_CONSTANTS.RECEIVED_GENERIC_MEDICINE_DETAIL:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    genericMedicine: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case BUY_MEDICINE_CONSTANTS.RECEIVED_GENERIC_MEDICINE_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
            case BUY_MEDICINE_CONSTANTS.REQUEST_EXPLORE_DETAIL:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                exploreData: [],
            });
        case BUY_MEDICINE_CONSTANTS.RECEIVED_EXPLORE_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                exploreData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BUY_MEDICINE_CONSTANTS.RECEIVED_EXPLORE_DETAIL_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case BUY_MEDICINE_CONSTANTS.RECEIVED_REVIEW_POST_SUBMIT_DETAIL:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    postReviewStatus: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case BUY_MEDICINE_CONSTANTS.RECEIVED_REVIEW_POST_SUBMIT_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
        default:
            return state;
    }
};

export default buyMedicineReducer;
