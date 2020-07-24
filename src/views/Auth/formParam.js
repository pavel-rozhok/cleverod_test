export default {
  email: {
    type: 'text',
    name: 'email',
    label: 'email',
    value: '',
    validation: {
      email: true,
    },
  },
  password: {
    type: 'password',
    name: 'password',
    label: 'password',
    value: '',
    validation: {
      minLength: 8,
      maxLength: 20,
    },
  },
};
