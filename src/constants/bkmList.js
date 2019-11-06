export const PRODUCTS_DATA_URL = `${process.env.APPLICATION_BFF_URL}/products/list`;
export const CATEGORY_DATA_URL = `${process.env.APPLICATION_BFF_URL}/products/filters`;

export const REQUEST_BKM_LIST_SEARCH = 'REQUEST_BKM_LIST_SEARCH';
export const RECEIVED_BKM_LIST_SEARCH = 'RECEIVED_BKM_LIST_SEARCH';
export const RECEIVED_BKM_LIST_SEARCH_ERROR = 'RECEIVED_BKM_LIST_SEARCH_ERROR';

export const REQUEST_FILTER_CATEGORY_DATA = 'REQUEST_FILTER_CATEGORY_DATA';
export const RECEIVED_FILTER_CATEGORY_DATA = 'RECEIVED_FILTER_CATEGORY_DATA';
export const RECEIVED_FILTER_CATEGORY_DATA_ERROR = 'RECEIVED_FILTER_CATEGORY_DATA_ERROR';

// add to cart constants
export const CART_URL = `${process.env.APPLICATION_BFF_URL}/index/AddToCart`;
export const REQUEST_CART_LIST_SEARCH = 'REQUEST_CART_LIST_SEARCH';
export const RECEIVED_BKM_CART_SEARCH = 'RECEIVED_BKM_CART_SEARCH';
export const RECEIVED_BKM_CART_SEARCH_ERROR = 'RECEIVED_BKM_CART_SEARCH_ERROR';

/* for elastic search AUTOCOMPELETE api in header */
export const HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/search`,
    REQUEST: 'REQUEST_CATEGORY_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_CATEGORY_SEARCH_RESULT',
    ERROR: 'ERROR_IN_CATEGORY_SEARCH_RESULT',
});

/* for elastic search final result api in HEADER */
export const HEADER_CATEGORIES_FINALRESULT_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/search/list`,
    REQUEST: 'REQUEST_CATEGORY_FINALRESULT_RESULT',
    RECEIVED: 'RECEIVED_CATEGORY_FINALRESULT_RESULT',
    ERROR: 'ERROR_IN_CATEGORY_FINALRESULT_RESULT',
});

/* for home page fresh deals api */
export const HOMEPAGE_FRESH_DEALS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_FRESH_DEALS_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_FRESH_DEALS_SEARCH_RESULT',
    ERROR: 'ERROR_IN_FRESH_DEALS_SEARCH_RESULT',
});

/* for home page best seller api */
export const HOMEPAGE_BEST_SELLER_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_BEST_SELLER_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_BEST_SELLER_SEARCH_RESULT',
    ERROR: 'ERROR_IN_BEST_SELLER_SEARCH_RESULT',
});

/* for home page new arrival api */
export const HOMEPAGE_NEW_ARRIVALS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_NEW_ARRIVALS_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_NEW_ARRIVALS_SEARCH_RESULT',
    ERROR: 'ERROR_IN_NEW_ARRIVALS_SEARCH_RESULT',
});

/* for home page new arrivals second page api */
export const HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_NEW_ARRIVALS_SP_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_NEW_ARRIVALS_SP_SEARCH_RESULT',
    ERROR: 'ERROR_IN_NEW_ARRIVALS_SP_SEARCH_RESULT',
});

/* for home page new arrivals second page api */
export const HOMEPAGE_FRESH_DEALS_SP_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_FRESH_DEALS_SP_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_FRESH_DEALS_SP_SEARCH_RESULT',
    ERROR: 'ERROR_IN_FRESH_DEALS_SP_SEARCH_RESULT',
});

/* for home page best seller second page second page api */
export const HOMEPAGE_BEST_SELLER_SP_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/list`,
    REQUEST: 'REQUEST_BEST_SELLER_SP_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_BEST_SELLER_SP_SEARCH_RESULT',
    ERROR: 'ERROR_IN_BEST_SELLER_SP_SEARCH_RESULT',
});

/* for Premium membership page api */
export const PRIME_MEMBERSHIP_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/prime/products`,
    REQUEST: 'REQUEST_PRIME_MEMBERSHIP_SEARCH_RESULT',
    RECEIVED: 'RECEIVED_PRIME_MEMBERSHIP_SEARCH_RESULT',
    ERROR: 'ERROR_IN_PRIME_MEMBERSHIP_SEARCH_RESULT',
});
