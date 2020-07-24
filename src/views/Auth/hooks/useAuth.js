import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../redux/actions/auth';

const authTypes = {
  login: 'login',
  registration: 'registration',
};

export const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [authType, setAuthType] = useState(authTypes.login);

  const changeAuthType = () => {
    setAuthType((state) => (state === authTypes.login
      ? authTypes.registration
      : authTypes.login));
  };

  const sendData = async ({ email, password }) => {
    try {
      await dispatch(auth(email, password, authType));
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return {
    authType,
    sendData,
    changeAuthType,
  };
};
