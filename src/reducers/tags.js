import {
    PRODUCT_TAGS_LIST_URL_CONSTANTS,
    PRODUCT_TAG_DETAILS_URL_CONSTANTS,
    REMOVE_TAG_URL_CONSTANTS,
} from '../constants/products';

const tagsReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    tagsData: [],
    tagsDetailsData: [],
    deleteTags: [],
}, action) => {
    switch (action.type) {
        case PRODUCT_TAGS_LIST_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                tagsData: [],
            });
        case PRODUCT_TAGS_LIST_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                tagsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_TAGS_LIST_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case PRODUCT_TAG_DETAILS_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                tagsDetailsData: [],
            });
        case PRODUCT_TAG_DETAILS_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                tagsDetailsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case PRODUCT_TAG_DETAILS_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case REMOVE_TAG_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                deleteTags: [],
            });
        case REMOVE_TAG_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                deleteTags: action.data,
                lastUpdated: action.receivedAt,
            });

        case REMOVE_TAG_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default tagsReducer;
