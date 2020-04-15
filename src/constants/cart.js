// Show Cart Constants
export const FIRST_CART_URL = ' https://uat.mediversal.tech/index.php/api/cart/ShowCart';
export const REQUEST_FIRST_CART_SEARCH = 'REQUEST_FIRST_CART_SEARCH';
export const RECEIVED_FIRST_CART_SEARCH = 'RECEIVED_FIRST_CART_SEARCH';
export const RECEIVED_FIRST_CART_SEARCH_ERROR = 'RECEIVED_FIRST_CART_SEARCH_ERROR';

export const ADD_TO_CART_URL = 'https://uat.mediversal.tech/index.php/api/cart/AddToCart';
export const REQUEST_ADD_TO_CART = 'REQUEST_ADD_TO_CART';
export const RECEIVED_ADD_TO_CART = 'RECEIVED_ADD_TO_CART';
export const RECEIVED_ADD_TO_CART_ERROR = 'RECEIVED_ADD_TO_CART_ERROR';

// Apply Discount Coupon Constants
export const DISCOUNT_COUPON_URL = 'https://uat.mediversal.tech/index.php/api/coupon/ApplyCoupon';
export const REQUEST_DISCOUNT_COUPON_SEARCH = 'REQUEST_DISCOUNT_COUPON_SEARCH';
export const RECEIVED_DISCOUNT_COUPON_SEARCH = 'RECEIVED_DISCOUNT_COUPON_SEARCH';
export const RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR = 'RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR';

// Cancel Discount Coupon Constants
export const CANCEL_DISCOUNT_COUPON_URL = 'https://uat.mediversal.tech/index.php/api/coupon/RemoveCoupon';
export const REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH = 'REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH';
export const RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH = 'RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH';
export const RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR = 'RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR';

// Remove From Cart Constants
export const REMOVE_FROM_CART_URL_CONSTANTS = ({
    URL: 'https://uat.mediversal.tech/index.php/api/cart/deleteitem',
    REQUEST: 'REQUEST_REMOVE_FROM_CART',
    RECEIVED: 'RECEIVED_REMOVE_FROM_CART',
    RECEIVED_ERROR: 'RECEIVED_REMOVE_FROM_CART_ERROR',
});

// Update Cart Constants
export const UPDATE_CART_URL_CONSTANTS = ({
    URL: 'https://uat.mediversal.tech/index.php/api/cart/editCart',
    REQUEST: 'REQUEST_UPDATE_CART',
    RECEIVED: 'RECEIVED_UPDATE_CART',
    RECEIVED_ERROR: 'RECEIVED_UPDATE_CART_ERROR',
});

// Move to WishList Constants
export const MOVE_TO_WISHLIST_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/wishlist`,
    REQUEST: 'REQUEST_MOVE_TO_WISHLIST',
    RECEIVED: 'RECEIVED_MOVE_TO_WISHLIST',
    RECEIVED_ERROR: 'RECEIVED_MOVE_TO_WISHLIST_ERROR',
});

// Remove Expired Products Constants
export const REMOVE_EXPIRED_PRODUCTS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/expired`,
    REQUEST: 'REQUEST_REMOVE_EXPIRED_PRODUCTS_DATA',
    RECEIVED: 'RECEIVED_REMOVE_EXPIRED_PRODUCTS_DATA',
    RECEIVED_ERROR: 'RECEIVED_REMOVE_EXPIRED_PRODUCTS_ERROR',
});

export const CLEAR_CART_DATA = 'CLEAR_CART_DATA';

// cart Type Constants
export const SET_CART_TYPE = 'SET_CART_TYPE';

export const SET_REMOVE_PRODUCT_TYPE = 'SET_REMOVE_PRODUCT_TYPE';

export const FLUSH_CART_VIEW_DATA = 'FLUSH_CART_VIEW_DATA';

// Bulk Add to cart Constants
export const BULK_ADD_TO_CART_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/cart/bulk`,
    REQUEST: 'REQUEST_BULK_ADD_TO_CART',
    RECEIVED: 'RECEIVED_BULK_ADD_TO_CART',
    RECEIVED_ERROR: 'RECEIVED_BULK_ADD_TO_CART_ERROR',
});

// Clear Cart
export const CLEAR_CART_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/cart/details`,
    // URL: 'https://bloomkonnect.com:2001/admin-bff/cart/details',
    REQUEST: 'REQUEST_CLEAR_CART_DATA',
    RECEIVED: 'RECEIVED_CLEAR_CART_DATA',
    RECEIVED_ERROR: 'RECEIVED_CLEAR_CART_DATA_ERROR',
});

