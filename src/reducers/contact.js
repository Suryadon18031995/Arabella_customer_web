import { CONTACT_CONSTANTS } from '../constants/contact';

const contactReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    contactData: [],
}, action) => {
    switch (action.type) {
        case CONTACT_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                contactData: [],
                lastUpdated: action.receivedAt,
            });
        case CONTACT_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                contactData: action.data,
                lastUpdated: action.receivedAt,
            });
        case CONTACT_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default contactReducer;
