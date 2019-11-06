import _get from 'lodash/get';
import * as BLOG_CONSTANTS from '../constants/blog';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const fetchBlogPostsData = subreddit => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_BLOG_POSTS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_BLOG_POSTS_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchEachPostData = (data, subreddit) => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_EACH_POST_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_EACH_POST_WRAPPER',
        redirect: 'follow',
    }));
};

export const fetchBlogCategoriesData = subreddit => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_BLOG_CATEGORIES_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'GET',
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_BLOG_CATEGORIES_WRAPPER',
        redirect: 'follow',
    }));
};

// export const fetchCatIdData = (data, subreddit) => (dispatch) => {
//     const constants = _get(BLOG_CONSTANTS, 'GET_CAT_ID_CONSTANTS');
//     return dispatch(dynamicActionWrapper({
//         path: _get(constants, 'URL') + data,
//         method: 'GET',
//         initCb: _get(generateFns({ constants }), 'request'),
//         successCb: _get(generateFns({ constants }), 'recieved'),
//         failureCb: _get(generateFns({ constants }), 'recievedErr'),
//         subreddit,
//         wrapperActionType: 'FETCH_CATEGORY_IDS_WRAPPER',
//         redirect: 'follow',
//     }));
// };
export const fetchBlogCommentsData = (data, subreddit) => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_EACH_BLOG_COMMENTS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_EACH_BLOG_COMMENTS_WRAPPER',
        redirect: 'follow',
    }));
};
export const postBlogCommentData = (data, subreddit) => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'POST_BLOG_COMMENT_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'POST_BLOG_COMMENT_WRAPPER',
        redirect: 'follow',
    }));
};
export const fetchCommentsData = subreddit => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_BLOG_COMMENTS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_BLOG_COMMENTS_WRAPPER',
        redirect: 'follow',
    }));
};

// export const fetchTagNamesData = (data, subreddit) => (dispatch) => {
//     const constants = _get(BLOG_CONSTANTS, 'GET_TAGS_OF_POST_CONSTANTS');
//     return dispatch(dynamicActionWrapper({
//         path: _get(constants, 'URL') + data,
//         method: 'GET',
//         initCb: _get(generateFns({ constants }), 'request'),
//         successCb: _get(generateFns({ constants }), 'recieved'),
//         failureCb: _get(generateFns({ constants }), 'recievedErr'),
//         subreddit,
//         wrapperActionType: 'FETCH_TAGS_DATA_WRAPPER',
//         redirect: 'follow',
//     }));
// };

export const fetchInstaFeedData = subreddit => (dispatch) => {
    const constants = _get(BLOG_CONSTANTS, 'GET_INSTA_FEEDS_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_INSTA_FEED_WRAPPER',
        redirect: 'follow',
    }));
};
