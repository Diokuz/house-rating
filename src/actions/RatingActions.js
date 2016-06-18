import { SEND_RATING_REQUEST, SET_RESULT } from '../constants/ActionTypes';

export function sendRequest(id) {
  return {
    type: SEND_RATING_REQUEST,
    id
  };
}

export function setResult(data) {
  console.log('data', data);
  return {
    type: SET_RESULT,
    data
  };
}
