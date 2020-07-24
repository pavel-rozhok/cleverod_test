export default {
  title: {
    type: 'text',
    name: 'title',
    label: 'Title',
    value: '',
    validation: {
      require: true,
      minLength: 20,
      maxLength: 60,
    },
  },
  description: {
    type: 'text',
    name: 'description',
    label: 'description',
    multiline: true,
    rows: 4,
    value: '',
    validation: {
      maxLength: 200,
    },
  },
  coast: {
    type: 'text',
    name: 'coast',
    label: 'coast',
    value: '',
    prefix: '$',
    pattern: ['^(?=.*\\d)\\d*(?:\\.\\d{0,2})?$', 'g'],
    validation: {
      require: true,
      min: 0,
      max: 99999999.99,
    },
  },
  discountPercent: {
    type: 'text',
    name: 'discountPercent',
    label: 'discount',
    prefix: '%',
    value: '',
    pattern: ['^[0-9]+$', 'g'],
    validation: {
      min: 10,
      max: 90,
    },
  },
  discountExpirationDate: {
    hidden: true,
    disabled: true,
    prefix: ' ',
    type: 'date',
    name: 'discountExpirationDate',
    label: 'discount Expiration Date',
    value: '',
  },
};
