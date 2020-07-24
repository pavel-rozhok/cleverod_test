import is from 'is_js';

export default (coast, discountPercent, discountExpirationDate) => {
  if (
    !discountExpirationDate
    || !discountPercent
    || is.not.number(+coast)
    || is.not.number(+discountPercent)
  ) {
    return [coast, null, null];
  }

  const moment = Date.now();
  const discountExpirationDateValueOf = new Date(discountExpirationDate).valueOf();
  if (discountExpirationDateValueOf > moment) {
    let currentCoast = coast - (coast / 100) * discountPercent;
    currentCoast = currentCoast.toFixed(2);

    return [currentCoast, coast, discountExpirationDate];
  }
  return [coast, null, null];
};
