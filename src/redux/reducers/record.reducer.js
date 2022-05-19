import { CONSTANTS } from '../../constants/AppConst';

const initialState = {
    data: [],
    getData: false,
};

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.RECORD_SAVE_REQUEST: return { ...state };
        case CONSTANTS.RECORD_SAVE_SUCCESS:
            return { ...state };
        case CONSTANTS.RECORD_SAVE_FAILURE:
            return { ...state };

        case CONSTANTS.RECORD_GET_REQUEST: return { ...state, getData: false };
        case CONSTANTS.RECORD_GET_SUCCESS:
            return { ...state, data: action?.payload, getData: false };
        case CONSTANTS.RECORD_GET_FAILURE:
            return { ...state, getData: false };

        case CONSTANTS.RECORD_DELETE_REQUEST: return { ...state, getData: false };
        case CONSTANTS.RECORD_DELETE_SUCCESS:
            return { ...state, getData: true };
        case CONSTANTS.RECORD_DELETE_FAILURE:
            return { ...state, getData: false };
        default:
            return state;
    }
};

export default recordReducer;
