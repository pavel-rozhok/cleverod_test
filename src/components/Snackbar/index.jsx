import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @material-ui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// actions
import { alertClear } from '../../redux/actions/alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertSnackbar = (props) => {
  const {
    type = 'error',
    message = '',
    onClose,
    open = false,
    vertical = 'top',
    horizontal = 'center',
    touchedTime,
  } = props;

  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    clearTimeout(closeTimeout);
    setCloseTimeout(setTimeout(onClose, 4000));
  }, [touchedTime]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={onClose}
        severity={type}
      >
        { message }
      </Alert>
    </Snackbar>
  );
};

function mapStateToProps(state) {
  return {
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(alertClear()),
  };
};

AlertSnackbar.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  touchedTime: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertSnackbar);
