import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/actionTypes';

const initalState = {
  token: null,
};

export default function authReducer(state = initalState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return {
        ...state,
      };
  }
}
