import UPDATE_RECENT_VIEWS from '../constants/recentViews';

const updateRecentViewsData = (data, subreddit) => ({
    type: UPDATE_RECENT_VIEWS,
    subreddit,
    data,
    receivedAt: Date.now(),
});

export default updateRecentViewsData;
