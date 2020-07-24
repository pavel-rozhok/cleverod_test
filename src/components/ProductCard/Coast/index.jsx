import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentCoast } from '../../../utils';
import './style.scss';

const Coast = ({ coast, discountPercent, discountExpirationDate }) => {
  const [
    currentCoast,
    oldCoast,
    expirationDate,
  ] = getCurrentCoast(coast, discountPercent, discountExpirationDate);

  const currentCoastClasses = ['coast__main'];

  if (oldCoast) {
    currentCoastClasses.push('coast__main--discount');
  }

  return (
    <div className="coast">
      <div>
        <div className={currentCoastClasses.join(' ')}>
          { currentCoast }
          $
        </div>
        {
          oldCoast && (
            <div className="coast__old">
              { oldCoast }
              $
            </div>
          )
        }
      </div>
      {
        expirationDate && (
          <span className="coast__date">
            до (
            { expirationDate }
            )
          </span>
        )
      }
    </div>
  );
};

Coast.propTypes = {
  coast: PropTypes.string,
  discountPercent: PropTypes.string,
  discountExpirationDate: PropTypes.string,
};

export default Coast;