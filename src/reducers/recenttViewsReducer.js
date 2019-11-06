import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import _remove from 'lodash/remove';
import UPDATE_RECENT_VIEWS from '../constants/recentViews';

const fetchData = (actionData, oldData) => {
    if (_get(actionData, 'productInfo')) {
        let products = _get(oldData, 'products', []);
        _remove(products, o => o.pid === _get(actionData.productInfo, 'pid'));
        // oldData.products[_get(actionData.productInfo, 'pid')] = actionData.productInfo;
        products.push(actionData.productInfo);
        products = _sortBy(products, ['time']);
        if (products.length > 5) {
            products = products.slice(products.length - 5, products.length);
        }
        oldData.products = products;
    }
    return oldData;
};

const viewsReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    recentViews: { products: [], orders: {} },
}, action) => {
    switch (action.type) {
        case UPDATE_RECENT_VIEWS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                recentViews: fetchData(action.data, state.recentViews),
                lastUpdated: action.receivedAt,
            });

        default:
            return state;
    }
};

export default viewsReducer;
