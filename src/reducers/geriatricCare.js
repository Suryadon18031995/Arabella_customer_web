import * as GERIATRIC_CARE_CONSTANTS from '../constants/geriatricCare';

const geriatricCareReducer = (state = {
     emergencyHealth: [],
     testimonials: [],
}, action) => {
    switch (action.type) {
        case GERIATRIC_CARE_CONSTANTS.REQUEST_EMERGENCY_HEALTH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                emergencyHealth: [],
            });
        case GERIATRIC_CARE_CONSTANTS.RECEIVED_EMERGENCY_HEALTH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                emergencyHealth: action.data,
                lastUpdated: action.receivedAt,
            });

        case GERIATRIC_CARE_CONSTANTS.RECEIVED_EMERGENCY_HEALTH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
            case GERIATRIC_CARE_CONSTANTS.REQUEST_GC_TESTIMONIALS:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
                testimonials: [],
            });
        case GERIATRIC_CARE_CONSTANTS.RECEIVED_GC_TESTIMONIALS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                testimonials: action.data,
                lastUpdated: action.receivedAt,
            });

        case GERIATRIC_CARE_CONSTANTS.RECEIVED_GC_TESTIMONIALS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        default:
            return state;
    }
};

export default geriatricCareReducer;
