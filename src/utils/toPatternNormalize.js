export default (newValue, oldValue, pattern) => {
  const regexp = new RegExp(...pattern);
  if (!newValue || regexp.test(newValue)) {
    return newValue;
  }
  return oldValue;
};
