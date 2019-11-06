import * as SUBSCRIPTION_HEAD from '../constants/seasonalsubscriptionConstants';
import dynamicActionWrapper from '../utils/actionHelper';

export const requestSeasonalSubscriptionData = subreddit => ({
  type: SUBSCRIPTION_HEAD.REQUEST_SEASONALOPTION_DATA,
  subreddit,
});

export const receiveSeasonalSubscriptionData = (subreddit, json) => ({
  type: SUBSCRIPTION_HEAD.RECEIVED_SEASONALOPTION_DATA,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

export const receiveSeasonalSubscriptionError = (subreddit, err) => ({
  type: SUBSCRIPTION_HEAD.RECEIVED_SEASONALOPTOIN_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchSeasonalSubscriptoinData = subreddit => dispatch =>
  dispatch(dynamicActionWrapper({
    path: SUBSCRIPTION_HEAD.SEASONAL_URL,
    method: 'Get',
    initCb: requestSeasonalSubscriptionData,
    successCb: receiveSeasonalSubscriptionData,
    failureCb: receiveSeasonalSubscriptionError,
    subreddit,
    wrapperActionType: 'FETCH_SUBSCRIPTION_WRAPPER',
    redirect: 'follow',
  }));

/* fetching seasonal categories based on seasone selection */

export const requestSeasonalCategories = subreddit => ({
  type: SUBSCRIPTION_HEAD.REQUEST_SEASONALCATEGORIES,
  subreddit,
});

export const reciveSeasonaCategories = (subreddit, catData) => ({
  type: SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES,
  subreddit,
  data: catData,
  receivedAt: Date.now(),
});

export const reciveSeasonalCategoriesError = (subreddit, err) => ({
  type: SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchSubscriptionCategories = (data, subreddit) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: SUBSCRIPTION_HEAD.SEASONAL_CATEGORIES,
    method: 'post',
    body: data,
    initCb: requestSeasonalCategories,
    successCb: reciveSeasonaCategories,
    failureCb: reciveSeasonalCategoriesError,
    subreddit,
    wrapperActionType: 'FETCH_SUBSCRIPTION_WRAPPER',
    redirect: 'follow',
  }));

/* For getting subscription product list based on category selection */

export const requestSeasonalSubProdList = subreddit => ({
  type: SUBSCRIPTION_HEAD.REQUEST_SEASONALCATEGORIES_LIST,
  subreddit,
});

export const reciveSeasonalSubProdList = (subreddit, prodList) => ({
  type: SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_LIST,
  subreddit,
  data: prodList,
  recievedAt: Date.now(),
});

export const reciveSeasonalSubProdListError = (subreddit, err) => ({
  type: SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_LIST_ERROR,
  subreddit,
  error: err,
});

export const getSeasonalSubscriptionListProd = (data, subreddit) => dispatch =>
  dispatch(dynamicActionWrapper({
    path: SUBSCRIPTION_HEAD.SEASONAL_CATEGORIES_LIST,
    method: 'post',
    body: data,
    initCb: requestSeasonalSubProdList,
    successCb: reciveSeasonalSubProdList,
    failureCb: reciveSeasonalSubProdListError,
    subreddit,
    wrapperActionType: 'FETCH_SUBSCRIPTION_PROD_LIST_WRAPPER',
    redirect: 'follow',
  }));
