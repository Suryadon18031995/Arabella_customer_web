import _get from 'lodash/get';
import * as MYFAVOURITE_CONSTANTS from '../constants/myfavourites';
import { ADD_TO_FAVORITES_URL_CONSTANTS } from '../constants/myfavourites';

const myFavouritesReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    MyFavouritesInfo: [],
    removeMyfavouriteInfo: [],
    addToFavs: '',
    showFavsData: undefined,
}, action) => {
    switch (action.type) {
        case MYFAVOURITE_CONSTANTS.REQUEST_MYFAVOURITE_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                MyFavouritesInfo: [],
                removeMyfavouriteInfo: [],
                lastUpdated: action.receivedAt,
            });
        case MYFAVOURITE_CONSTANTS.RECEIVE_MYFAVOURITE_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                MyFavouritesInfo: action.data,
                lastUpdated: action.receivedAt,
            });
        case MYFAVOURITE_CONSTANTS.RECEIVED_MYFAVOURITE_INFO_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });




        case MYFAVOURITE_CONSTANTS.REQUEST_REMOVE_FROM_MYFAVOURITE:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                removeMyfavouriteInfo: [],
                lastUpdated: action.receivedAt,
            });

        case MYFAVOURITE_CONSTANTS.RECEIVE_UPDATED_MYFAVOURITE_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                removeMyfavouriteInfo: action.data,
                lastUpdated: action.receivedAt,
            });

        case MYFAVOURITE_CONSTANTS.RECEIVED_UPDATED_MYFAVOURITE_INFO_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });




        case ADD_TO_FAVORITES_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });

        case ADD_TO_FAVORITES_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addToFavs: action.data,
                showFavsData: _get(action.data, 'result'),
                lastUpdated: action.receivedAt,
            });

        case ADD_TO_FAVORITES_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case MYFAVOURITE_CONSTANTS.CLEAR_MYFAVOURITE_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                isFetching: false,
                MyFavouritesInfo: [],
                removeMyfavouriteInfo: [],
                addToWishlist: [],
                showFavsData: undefined,
            });




        default:
            return state;
    }
};

export default myFavouritesReducer;
