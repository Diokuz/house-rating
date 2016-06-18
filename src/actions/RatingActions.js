import { SEND_RATING_REQUEST, SET_RESULT, SET_SUGGEST } from '../constants/ActionTypes';

export function sendRequest(id) {
  return {
    type: SEND_RATING_REQUEST,
    id
  };
}

export function setResult(data) {
  return {
    type: SET_RESULT,
    data
  };
}

export function setSuggest(suggest) {
  return {
    type: SET_SUGGEST,
    suggest
  };
}
