import * as LAB_TEST_CONSTANTS from '../constants/labTest';

const labTestReducer = (state = {
     labTestimonials: [],
     labSHCData:[],
}, action) => {
    switch (action.type) {
        case LAB_TEST_CONSTANTS.REQUEST_LAB_TESTIMONIALS:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                labTestimonials: [],
            });
        case LAB_TEST_CONSTANTS.RECEIVED_LAB_TESTIMONIALS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                labTestimonials: action.data,
                lastUpdated: action.receivedAt,
            });

        case LAB_TEST_CONSTANTS.RECEIVED_LAB_TESTIMONIALS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case LAB_TEST_CONSTANTS.REQUEST_LAB_SHC:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                labSHCData: [],
            });
        case LAB_TEST_CONSTANTS.RECEIVED_LAB_SHC:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                labSHCData: action.data,
                lastUpdated: action.receivedAt,
            });

        case LAB_TEST_CONSTANTS.RECEIVED_LAB_SHC_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default labTestReducer;
