import is from 'is_js';
import replacePatterString from './replacePatterString';

const messages = {
  require: 'Поле не может быть пустым',
  minLength: 'Поле должно содержать более {minLength} символов',
  maxLength: 'Поле должно содержать до {maxLength} символов',
  minMaxLength: 'Поле должно содержать от {minLength} до {maxLength} символов',
  email: 'Введите валидный Email',
  minMax: 'Значение должно быть не ниже {min} и не больше {max}',
  min: 'Значение должно быть не мение чем {min}',
  max: 'Значение должно быть не больше чем {max}',
};

export default (value, field = {}) => {
  let error = false;
  let helperText = '';
  const { validation } = field;

  if (validation) {
    if (validation.require) {
      if (!value.trim()) {
        error = true;
        helperText = messages.require;
      }
    }

    if (validation.minLength && validation.maxLength) {
      if (value.trim().length < validation.minLength
      || value.trim().length > validation.maxLength) {
        error = true;
        helperText = replacePatterString(
          messages.minMaxLength,
          {
            key: 'minLength',
            value: validation.minLength,
          },
          {
            key: 'maxLength',
            value: validation.maxLength,
          },
        );
      }
    } else if (validation.minLength) {
      if (value.trim().length < validation.minLength) {
        error = true;
        helperText = replacePatterString(
          messages.minLength,
          {
            key: 'minLength',
            value: validation.minLength,
          },
        );
      }
    } else if (validation.maxLength) {
      if (value.trim().length > validation.maxLength) {
        error = true;
        helperText = replacePatterString(
          messages.maxLength,
          {
            key: 'maxLength',
            value: validation.maxLength,
          },
        );
      }
    }

    if (is.number(+value) && value) {
      if (validation.min && validation.max) {
        if (+value < validation.min || +value > validation.max) {
          error = true;
          helperText = replacePatterString(
            messages.minMax,
            {
              key: 'min',
              value: validation.min,
            },
            {
              key: 'max',
              value: validation.max,
            },
          );
        }
      } else if (validation.min) {
        if (+value < validation.min) {
          error = true;
          helperText = replacePatterString(
            messages.min,
            {
              key: 'min',
              value: validation.min,
            },
          );
        }
      } else if (validation.max) {
        if (+value > validation.max) {
          error = true;
          helperText = replacePatterString(
            messages.max,
            {
              key: 'max',
              value: validation.max,
            },
          );
        }
      }
    }

    if (validation.email) {
      if (is.not.email(value)) {
        error = true;
        helperText = messages.email;
      }
    }
  }

  return {
    ...field,
    error,
    helperText,
    value,
  };
};
