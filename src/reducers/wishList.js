import _get from 'lodash/get';
import * as WISHLIST_CONSTANTS from '../constants/wishList';
import { ADD_TO_WISHLIST_URL_CONSTANTS } from '../constants/wishList';

const wishListReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    wishListInfo: [],
    removeWishListInfo: [],
    addToWishlist: [],
    showWishListData: undefined,
}, action) => {
    switch (action.type) {
        case WISHLIST_CONSTANTS.REQUEST_WISHLIST_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                wishListInfo: [],
                removeWishListInfo: [],
                lastUpdated: action.receivedAt,
            });
        case WISHLIST_CONSTANTS.RECEIVE_WISHLIST_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                wishListInfo: action.data,
                lastUpdated: action.receivedAt,
            });
        case WISHLIST_CONSTANTS.RECEIVED_WISHLIST_INFO_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });


        case WISHLIST_CONSTANTS.REQUEST_REMOVE_FROM_WISHLIST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                removeWishListInfo: [],
                lastUpdated: action.receivedAt,
            });

        case WISHLIST_CONSTANTS.RECEIVE_UPDATED_WISHLIST_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                removeWishListInfo: action.data,
                lastUpdated: action.receivedAt,
            });

        case WISHLIST_CONSTANTS.RECEIVED_UPDATED_WISHLIST_INFO_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case ADD_TO_WISHLIST_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                addToWishlist: [],
                // removeWishListInfo: [],
                lastUpdated: action.receivedAt,
            });

        case ADD_TO_WISHLIST_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addToWishlist: action.data,
                showWishListData: _get(action.data, 'result'),
                lastUpdated: action.receivedAt,
            });

        case ADD_TO_WISHLIST_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case WISHLIST_CONSTANTS.CLEAR_WISHLIST_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                isFetching: false,
                wishListInfo: [],
                removeWishListInfo: [],
                addToWishlist: [],
                showWishListData: undefined,
            });
        default:
            return state;
    }
};

export default wishListReducer;
