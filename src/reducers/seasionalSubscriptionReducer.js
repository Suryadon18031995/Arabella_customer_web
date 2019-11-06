import * as SUBSCRIPTION_HEAD from '../constants/seasonalsubscriptionConstants';

const seasonalSubscriptionReducer = (
  state = {
    type: '',
    error: '',
    isFetching: false,
    seasonalHead: [],
    seasonalCategories: [],
  },
  action,
) => {
  switch (action.type) {
    case SUBSCRIPTION_HEAD.REQUEST_SEASONALOPTION_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        seasonalHead: [],
        seasonalProdList: [],
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECEIVED_SEASONALOPTION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        seasonalHead: action.data,
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECEIVED_SEASONALOPTOIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });

    /* for categories based on seasonal selection */

    case SUBSCRIPTION_HEAD.REQUEST_SEASONALCATEGORIES:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        seasonalCategories: [],
        seasonalProdList: [],
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        seasonalCategories: action.data,
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    /* for seasonal product list based on category selection */
    case SUBSCRIPTION_HEAD.REQUEST_SEASONALCATEGORIES_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        seasonalProdList: [],
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        seasonalProdList: action.data,
        lastUpdated: action.receivedAt,
      });
    case SUBSCRIPTION_HEAD.RECIVED_SEASONALCATEGORIES_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    default:
      return state;
  }
};

export default seasonalSubscriptionReducer;
