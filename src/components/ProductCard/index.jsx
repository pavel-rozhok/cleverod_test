import React from 'react';
import PropTypes from 'prop-types';

// @material-ui
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// components
import Coast from './Coast';

import './style.scss';

const ProductCard = (props) => {
  const {
    title,
    description,
    photoUrL,
    coast,
    discountPercent,
    discountExpirationDate,
    onChange,
    onRemove,
    isAuth
  } = props;

  const action = isAuth && (
    <div className="product-card__action">
    <IconButton
      color="primary"
      onClick={onChange}
    >
      <EditIcon />
    </IconButton>
    <IconButton
      color="primary"
      onClick={onRemove}
    >
      <DeleteIcon />
    </IconButton>
  </div>
  );

  return (
    <div className="product-card">
      <header className="product-card__header">
        <h2 className="product-card__title">
          { title }
        </h2>
        <Coast
          coast={coast}
          discountExpirationDate={discountExpirationDate}
          discountPercent={discountPercent}
        />
      </header>
      <img
        alt={title}
        src={photoUrL}
        className="product-card__image"
      />
      <div className="product-card__description">
        { description }
      </div>
      { action }
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  photoUrL: PropTypes.string,
  coast: PropTypes.string, 
  discountPercent: PropTypes.string,
  discountExpirationDate: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default ProductCard;