import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @material-ui
import Button from '@material-ui/core/Button';

// compomemts
import Form from '../../components/Form';

// hooks
import { useFormBuilder } from '../../hooks/useFormBuilder';
import { useAuth } from './hooks/useAuth';

//actions
import { logout } from '../../redux/actions/auth';

import formParam from './formParam';
import './style.scss';

const Auth = ({ onLogout }) => {
  const {
    form,
    getFormData,
    onChange,
    onBlur,
  } = useFormBuilder(formParam);

  const {
    authType,
    changeAuthType,
    sendData,
  } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData();
    if (formData) {
      sendData(formData);
    }
  };

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  const Title = <h2>{ authType === 'login' ? 'Вход' : 'Регистрация' }</h2>;
  const chngeTypeButton = (
    <Button
      color="primary"
      type="button"
      onClick={changeAuthType}
    >
      { authType === 'login' ? 'регистрация' : 'войти' }
    </Button>
  );
  const subbmitButton = (
    <Button
      variant="contained"
      color="primary"
      type="submit"
    >
      { authType === 'login' ? 'Вход' : 'Зарегистрироваться' }
    </Button>
  );

  return (
    <div className="auth">
      <div className="auth__form-wrapper">
        { Title }
        <Form
          form={form}
          onSubmit={onSubmit}
          onChange={onChange}
          onBlur={onBlur}
        >
          <div className="auth__footer">
            { chngeTypeButton }
            { subbmitButton }
          </div>
        </Form>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
};

Auth.propTypes = {
  onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Auth);
