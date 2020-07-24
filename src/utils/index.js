import validateField from './validateField';
import uploadImage from './uploadImage';
import toPatternNormalize from './toPatternNormalize';
import getCurrentCoast from './getCurrentCoast';
import replacePatterString from './replacePatterString';

const copyObj = (obj) => JSON.parse(JSON.stringify(obj));

export {
  replacePatterString,
  copyObj,
  validateField,
  uploadImage,
  toPatternNormalize,
  getCurrentCoast,
};
