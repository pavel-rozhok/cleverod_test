import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from './actionTypes';

import { alertOpen } from './alert';

import AuthService from '../../services/AuthService';

function loginSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: token,
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(token));
    }
  };
}

export function auth(email, password, type) {
  return async (dispatch) => {
    try {
      const { idToken } = await AuthService.auth(email, password, type);
      dispatch(loginSuccess(idToken));
    } catch (e) {
      const errorMessage = type === 'login'
        ? 'Ошибка при авторизации'
        : 'Ошибка при регистрации';
      dispatch(alertOpen({ message: errorMessage }));
      dispatch(logout());
      throw (e);
    }
  };
}
