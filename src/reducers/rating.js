import { SEND_RATING_REQUEST, SET_RESULT } from '../constants/ActionTypes';

export default function counter(state = {}, action) {
    console.log('action', action);
    switch (action.type) {
        case SEND_RATING_REQUEST:
            return {
                loading: true,
                data: state.data
            };
        case SET_RESULT:
            return {
                data: action.data,
                loading: false
            };
        default:
            return state;
    }
}
