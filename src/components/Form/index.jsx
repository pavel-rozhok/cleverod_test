import React from 'react';
import PropTypes from 'prop-types';

// @material-ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const Form = (props) => {
  const {
    form,
    onChange,
    onBlur,
    onSubmit,
    children,
  } = props;

  const fieldDefaultParams = {
    variant: 'outlined',
    margin: 'normal',
    fullWidth: true,
  };

  const inputProps = (field) => {
    if (field.prefix) {
      return {
        startAdornment: (
          <InputAdornment position="start">
            {field.prefix}
          </InputAdornment>
        ),
      };
    }
    return null;
  };

  return (
    <form onSubmit={onSubmit}>
      {
        Object.keys(form).map((key) => {
          const field = form[key];
          if (field.hidden) {
            return null;
          }
          return (
            <TextField
              key={key}
              {...field}
              {...fieldDefaultParams}
              onChange={onChange}
              onBlur={onBlur}
              InputProps={inputProps(field)}
            />
          );
        })
      }
      { children }
    </form>
  );
};

Form.propTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default Form;
