import {
    GET_BLOG_POSTS_CONSTANTS,
    GET_EACH_POST_CONSTANTS,
    GET_BLOG_CATEGORIES_CONSTANTS,
    // GET_CAT_ID_CONSTANTS,
    GET_BLOG_COMMENTS_CONSTANTS,
    POST_BLOG_COMMENT_CONSTANTS,
    GET_EACH_BLOG_COMMENTS_CONSTANTS,
    // GET_TAGS_OF_POST_CONSTANTS,
    GET_INSTA_FEEDS_CONSTANTS,
} from '../constants/blog';

const blogReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    blogPosts: [],
    eachPost: {},
    // catIds: [],
    blogComments: [],
    postComment: [],
    blogCategories: [],
    commentsData: [],
    // tagsData: [],
    instaFeedData: [],
}, action) => {
    switch (action.type) {
        case GET_BLOG_POSTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_POSTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                blogPosts: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_POSTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });
        case GET_EACH_POST_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                // tagsData: [],
                lastUpdated: action.receivedAt,
            });
        case GET_EACH_POST_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                eachPost: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_EACH_POST_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // case GET_CAT_ID_CONSTANTS.REQUEST:
        //     return Object.assign({}, state, {
        //         isFetching: true,
        //         type: action.type,
        //         lastUpdated: action.receivedAt,
        //     });
        // case GET_CAT_ID_CONSTANTS.RECEIVED:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         type: action.type,
        //         didInvalidate: false,
        //         catIds: action.data,
        //         lastUpdated: action.receivedAt,
        //     });
        // case GET_CAT_ID_CONSTANTS.RECEIVED_ERROR:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         type: action.type,
        //         error: action.error,
        //     });

        case GET_BLOG_CATEGORIES_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_CATEGORIES_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                blogCategories: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_CATEGORIES_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });
        case GET_EACH_BLOG_COMMENTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case GET_EACH_BLOG_COMMENTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                blogComments: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_EACH_BLOG_COMMENTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* Fetch Blog Comments */

        case GET_BLOG_COMMENTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_COMMENTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                commentsData: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_BLOG_COMMENTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* Fetch Blog Comments */

        /* Post blog Comments */

        case POST_BLOG_COMMENT_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case POST_BLOG_COMMENT_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                postComment: action.data,
                lastUpdated: action.receivedAt,
            });
        case POST_BLOG_COMMENT_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });

        /* Post blog Comments */

        // case GET_TAGS_OF_POST_CONSTANTS.REQUEST:
        //     return Object.assign({}, state, {
        //         isFetching: true,
        //         type: action.type,
        //         lastUpdated: action.receivedAt,
        //     });
        // case GET_TAGS_OF_POST_CONSTANTS.RECEIVED:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         type: action.type,
        //         didInvalidate: false,
        //         tagsData: action.data,
        //         lastUpdated: action.receivedAt,
        //     });
        // case GET_TAGS_OF_POST_CONSTANTS.RECEIVED_ERROR:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         type: action.type,
        //         error: action.error,
        //     });

        // get Insta Feed

        case GET_INSTA_FEEDS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                // isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case GET_INSTA_FEEDS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                didInvalidate: false,
                instaFeedData: action.data,
                lastUpdated: action.receivedAt,
            });
        case GET_INSTA_FEEDS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                // isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default blogReducer;
