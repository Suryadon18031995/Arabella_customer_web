import * as BKM_CONSTANTS from '../constants/bkmList';

const bkmReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    bkmCartData: [],
    bkmSearchData: [],
    filtersData: [],
    autoCompleteData: {},
    finalSearchData: {},
    freshDealsSearchData: [],
    bestSellerSearchData: [],
    newArrivalsSearchData: [],
    newArrivalsSPSearchData: [],
    freshDealsSPSearchData: [],
    bestSellerSPSearchData: [],
    primePageData: [],
}, action) => {
    switch (action.type) {
        case BKM_CONSTANTS.REQUEST_BKM_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                bkmSearchData: {},
                lastUpdated: action.receivedAt,
            });
        case BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bkmSearchData: action.data,
                autoCompleteData: {},
                lastUpdated: action.receivedAt,
            });
        case BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case BKM_CONSTANTS.REQUEST_CART_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                bkmCartData: [],
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bkmCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case BKM_CONSTANTS.REQUEST_FILTER_CATEGORY_DATA:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                filtersData: [],
                lastUpdated: action.receivedAt,
            });
        case BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                filtersData: action.data,
                lastUpdated: action.receivedAt,
            });
        case BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        /* FOR HEADER SUGGETION SEARCH DATA */
        case BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                autoCompleteData: {},
            });
        case BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                autoCompleteData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        /* FOR HEADER FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HEADER_CATEGORIES_FINALRESULT_CONSTANTS.REQUEST:
            {
                // console.log(action.text);
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    finalSearchData: {},
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HEADER_CATEGORIES_FINALRESULT_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                finalSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HEADER_CATEGORIES_FINALRESULT_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE FRESH DEALS FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    freshDealsSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                freshDealsSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE BEST SELLER FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    bestSellerSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bestSellerSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE NEW ARRIVALS FIRST PAGE FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    newArrivalsSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                newArrivalsSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE NEW ARRIVALS SECOND PAGE FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    newArrivalsSPSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                newArrivalsSPSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE FRESH DEALS SECOND PAGE FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_SP_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    freshDealsSPSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_SP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                freshDealsSPSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_FRESH_DEALS_SP_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR HOME PAGE BEST SELLER SECOND PAGE FINAL RESULT SEARCH DATA */
        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_SP_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    bestSellerSPSearchData: [],
                    searchText: action.text,
                });
            }
        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_SP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bestSellerSPSearchData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.HOMEPAGE_BEST_SELLER_SP_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* FOR Premium PAGE DATA */
        case BKM_CONSTANTS.PRIME_MEMBERSHIP_CONSTANTS.REQUEST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                    primePageData: [],
                });
            }
        case BKM_CONSTANTS.PRIME_MEMBERSHIP_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                primePageData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BKM_CONSTANTS.PRIME_MEMBERSHIP_CONSTANTS.ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default bkmReducer;
