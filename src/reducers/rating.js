import { SEND_RATING_REQUEST, SET_RESULT, SET_SUGGEST } from '../constants/ActionTypes';

export default function counter(state = {}, action) {
    switch (action.type) {
        case SEND_RATING_REQUEST:
            return {
                loading: true,
                data: state.data,
                suggest: []
            };
        case SET_RESULT:
            return {
                loading: false,
                data: action.data,
                suggest: state.suggest
            };
        case SET_SUGGEST:
            return {
                loading: state.loading,
                // В сагесты пропускаем только настоящие здания
                suggest: action.suggest.filter(item => item.hint && item.hint.id && item.hint.hint_type == 'building'),
                data: state.data
            };
        default:
            return state;
    }
}
