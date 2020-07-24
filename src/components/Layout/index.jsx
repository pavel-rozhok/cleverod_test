import React from 'react';
import PropTypes from 'prop-types';

// @material-ui
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

// components
import Navigation from '../Navigation';

export const Layout = ({ children }) => (
  <>
    <Navigation />
    <Toolbar />
    <Container
      maxWidth={false}
      style={{
        paddingTop: 20,
      }}
    >
      { children }
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
};
