export default {
  email: {
    type: 'text',
    name: 'email',
    label: 'Email',
    value: '',
    validation: {
      email: true,
    },
  },
  password: {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: '',
    validation: {
      minLength: 8,
      maxLength: 20,
    },
  },
};
