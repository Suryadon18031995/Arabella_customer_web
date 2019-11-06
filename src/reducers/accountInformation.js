import * as ACCOUNT_INFORMATION_CONSTANTS from '../constants/accountInformation';

const accountInformationReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    accountInformationData: [],
    editAccountInformationResult: [],
    myRewardsData: [],
}, action) => {
    switch (action.type) {
        case ACCOUNT_INFORMATION_CONSTANTS.REQUEST_ACCOUNT_INFORMATION:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                accountInformationData: [],
                editAccountInformationResult: [],
                lastUpdated: action.receivedAt,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_ACCOUNT_INFORMATION:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                editAccountInformationResult: [],
                accountInformationData: action.data,
                lastUpdated: action.receivedAt,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_ACCOUNT_INFORMATION_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.REQUEST_EDIT_ACCOUNT_INFORMATION_RES:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                editAccountInformationResult: [],
                lastUpdated: action.receivedAt,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_EDIT_ACCOUNT_INFORMATION_RES:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                editAccountInformationResult: action.data,
                lastUpdated: action.receivedAt,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.RECEIVED_EDIT_ACCOUNT_INFORMATION_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.MY_REWARDS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                editAddressData: [],
                allAddressData: [],
                lastUpdated: action.receivedAt,
            });
        case ACCOUNT_INFORMATION_CONSTANTS.MY_REWARDS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                myRewardsData: action.data,
                lastUpdated: action.receivedAt,
            });

        case ACCOUNT_INFORMATION_CONSTANTS.MY_REWARDS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });


        default:
            return state;
    }
};

export default accountInformationReducer;
