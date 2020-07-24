import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @material-ui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import ProductCard from '../../components/ProductCard';

// hooks
import { useProductList } from './hooks/useProductList';

const Products = ({ isAuth }) => {
  const {
    productList,
    isLoading,
    removeProduct,
    openEditPage,
  } = useProductList();

  const gridSizeParams = {
    xl: 2,
    lg: 3,
    md: 4,
    sm: 6,
    xs: 12,
  };

  const loader = isLoading && <CircularProgress className="g-spiner" />;

  return (
    <>
      { loader }
      <Grid container spacing={3}>
        { productList.map(((product) => (
          <Grid
            item
            {...gridSizeParams}
            key={product.id}
          >
            <ProductCard
              {...product}
              isAuth={isAuth}
              onChange={() => openEditPage(product.id)}
              onRemove={() => removeProduct(product.id, product.originPhotoUrl)}
            />
          </Grid>
        ))) }
      </Grid>
    </>
  );
};

Products.propTypes = {
  isAuth: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Products);
