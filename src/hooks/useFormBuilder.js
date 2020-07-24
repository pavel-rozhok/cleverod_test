import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateField, toPatternNormalize } from '../utils';
import { alertOpen } from '../redux/actions/alert';

export const useFormBuilder = (formParam = {}, formData = {}) => {
  const initalForm = {};
  Object.keys(formParam).forEach((key) => {
    initalForm[key] = {
      ...formParam[key],
      value: formData[key] || '',
    };
  });
  const [form, setForm] = useState(initalForm);
  const dispatch = useDispatch();

  const setErorMessage = () => {
    dispatch(alertOpen({
      message: 'Форма не валидна!',
    }));
  };

  const checkingRelatedFields = (name, value) => {
    switch (name) {
      case 'discountPercent':
        if (value.trim()
          && form.discountExpirationDate
          && form.discountExpirationDate.disabled === true) {
          setForm((oldState) => ({
            ...oldState,
            discountExpirationDate: {
              ...oldState.discountExpirationDate,
              disabled: false,
              hidden: false,
              validation: {
                require: true,
              },
            },
          }));
        } else if (!value.trim()
          && form.discountExpirationDate
          && form.discountExpirationDate.disabled === false) {
          setForm((oldState) => ({
            ...oldState,
            discountExpirationDate: {
              ...oldState.discountExpirationDate,
              disabled: true,
              validation: null,
              hidden: true,
              value: '',
            },
          }));
        }
        break;
      default:
        break;
    }
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm((state) => {
      const normalizedValue = state[name].pattern
        ? toPatternNormalize(value, state[name].value, state[name].pattern)
        : value;
      return {
        ...state,
        [name]: {
          ...state[name],
          value: normalizedValue,
          error: false,
          helperText: '',
        },
      };
    });
    checkingRelatedFields(name, value);
  };

  const onBlur = ({ target }) => {
    const { name, value } = target;
    setForm((state) => {
      const processedField = validateField(value, state[name]);
      return {
        ...state,
        [name]: processedField,
      };
    });
  };

  const getFormData = () => {
    let isInvalid;
    setForm((state) => {
      const newState = Object.keys(state).reduce((acc, name) => ({
        ...acc,
        [name]: validateField(state[name].value, state[name]),
      }), {});

      isInvalid = Object.keys(newState).some((name) => newState[name].error);

      return newState;
    });

    if (isInvalid) {
      setErorMessage();
      return false;
    } else {
      return Object.keys(form).reduce((acc, key) => ({
        ...acc,
        [key]: form[key].value || '',
      }), {});
    }
  };

  return {
    form,
    getFormData,
    onChange,
    onBlur,
  };
};
