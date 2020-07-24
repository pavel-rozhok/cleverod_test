import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Auth from './views/Auth';
import EditProduct from './views/EditProduct';
import CreateProduct from './views/CreateProduct';
import ProductList from './views/ProductList';
import Snackbar from './components/Snackbar';
import { Layout } from './components/Layout'

// actions
import { autoLogin } from './redux/actions/auth';

function App({ isAuth, propAutoLogin }) {
  useEffect(() => {
    propAutoLogin();
  }, [isAuth]);

  const routes = [
    {
      path: '/',
      component: ProductList,
      exact: true,
      isLayout: true,
    },
    {
      path: '/auth',
      component: Auth,
    },
  ];

  if (isAuth) {
    const protectedRoutes = [
      {
        path: '/create',
        component: CreateProduct,
        isLayout: true,
      },
      {
        path: '/edit/:id',
        component: EditProduct,
        isLayout: true,
      },
    ];
    routes.push(...protectedRoutes);
  }

  const layout = (isLayout, Component) => {
    if (isLayout) {
      return (
        <Layout>
          <Component />
        </Layout>
      )
    }
    return <Component />;
  } 

  return (
    <>
      <Snackbar />
      <Switch>
        { 
          routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={() => layout(route.isLayout, route.component)}
            />
          ))
        }
        <Redirect to="/" />
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    propAutoLogin: () => dispatch(autoLogin()),
  };
};


App.propTypes = {
  isAuth: PropTypes.bool,
  propAutoLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
