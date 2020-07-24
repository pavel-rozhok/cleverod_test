import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// @material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './style.scss';
import { connect } from 'react-redux';

const Navigation = ({ isAuth }) => {
  const links = [
    {
      to: '/',
      label: 'Все продукты',
    },
  ];

  if (isAuth) {
    links.push({
      to: '/create',
      label: 'Создать продукт',
    })
  }

  const logout = {
    to: '/auth',
    label: isAuth ? 'Выход' : 'Вход',
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="navigation__container">
        <nav>
          { links.map((link) => (
            <Link
              className="navigation__link"
              to={link.to}
              key={link.to}
            >
              { link.label }
            </Link>
          )) }
        </nav>
        <Link
          to={logout.to}
          className="navigation__link"
        >
          { logout.label }
        </Link>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
};

Navigation.propTypes = {
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps)(Navigation);
