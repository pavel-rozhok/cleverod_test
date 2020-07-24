export default (template, ...variables) => {
  let string = template;
  variables.forEach((variable) => {
    string = string.replace(`{${variable.key}}`, variable.value);
  });
  return string;
};
