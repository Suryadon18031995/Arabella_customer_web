import _get from 'lodash/get';
import * as CART_CONSTANTS from '../constants/cart';
import {
    REMOVE_FROM_CART_URL_CONSTANTS,
    UPDATE_CART_URL_CONSTANTS,
    MOVE_TO_WISHLIST_CONSTANTS,
    REMOVE_EXPIRED_PRODUCTS_CONSTANTS,
    BULK_ADD_TO_CART_CONSTANTS,
    CLEAR_CART_CONSTANTS,
} from '../constants/cart';

const cartReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    cancelDiscountCouponData: [],
    discountCouponData: [],
    firstCartData: [],
    productInfo: [],
    addCartResponseDetails: [],
    RemoveFromCartData: [],
    updateCartData: [],
    moveToWishListData: [],
    removeExpiredProductsData: [],
    showCartResult: undefined,
    cartType: '',
    bulkCartData: [],
}, action) => {
    switch (action.type) {
        case CART_CONSTANTS.REQUEST_FIRST_CART_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                addCartResponseDetails: [],
                showCartResult: undefined,
                updateCartData: [],
                RemoveFromCartData: [],
                moveToWishListData: [],
                productInfo: [],
                removeExpiredProductsData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                firstCartData: action.data,
                productInfo: _get(action.data, ['cart', 0, 'result']),
                showCartResult: _get(action.data, ['cart', 0, 'result']),
                cartType: _get(action.data, ['cart', 0, 'result', 0, 'type']),
                updateCartData: [],
                discountCouponData: [],
                removeExpiredProductsData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.REQUEST_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                // addCartResponseDetails: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addCartResponseDetails: action.data,
                showCartResult: _get(action.data, 'result'),
                cartType: _get(action.data, ['result', 0, 'type']),
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_ADD_TO_CART_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.REQUEST_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                firstCartData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                moveToWishListData: [],
                discountCouponData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // cancelled Discount Coupon reducers case
        case CART_CONSTANTS.REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                discountCouponData: [],
                cancelDiscountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                cancelDiscountCouponData: action.data,
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Remove From Cart reducers case
        case REMOVE_FROM_CART_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                RemoveFromCartData: [],
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                discountCouponData: [],
                moveToWishListData: [],
                RemoveFromCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Update Cart reducers case
        case UPDATE_CART_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                updateCartData: [],
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case UPDATE_CART_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                updateCartData: action.data,
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case UPDATE_CART_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // move to wishlist reducers case
        case MOVE_TO_WISHLIST_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                moveToWishListData: [],
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case MOVE_TO_WISHLIST_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                moveToWishListData: action.data,
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case MOVE_TO_WISHLIST_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Remove Expired products reducers case
        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                moveToWishListData: [],
                discountCouponData: [],
                removeExpiredProductsData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                removeExpiredProductsData: action.data,
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.CLEAR_CART_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                cartType: '',
                isFetching: false,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                firstCartData: [],
                addCartResponseDetails: [],
                RemoveFromCartData: [],
                updateCartData: [],
                moveToWishListData: [],
                showCartResult: undefined,
            });
        case CART_CONSTANTS.SET_CART_TYPE:
            return Object.assign({}, state, {
                type: action.type,
                cartType: action.data,
            });

        // Bulk Add to cart reducers case
        case BULK_ADD_TO_CART_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                bulkCartData: [],
                lastUpdated: action.receivedAt,
            });

        case BULK_ADD_TO_CART_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bulkCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BULK_ADD_TO_CART_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.FLUSH_CART_VIEW_DATA:
            return Object.assign({}, state, {
                type: action.type,
                firstCartData: [],
                cartType: '',
                showCartResult: undefined,
            });

        // Clear cart
        case CLEAR_CART_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                clearedCartData: [],
                lastUpdated: action.receivedAt,
            });

        case CLEAR_CART_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                clearedCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CLEAR_CART_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default cartReducer;
