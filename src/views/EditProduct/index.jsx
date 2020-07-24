import React from 'react';
import { withRouter } from 'react-router-dom';

// @material-ui
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import ProductPage from '../../components/ProductPage';

// hooks
import useEditPorduct from './hooks/useEditPorduct';

const EditProduct = ({ match: { params: { id } } }) => {
  const {
    productData,
    photoUrL,
    isLoading,
    isSaving,
    saveProduct
  } = useEditPorduct(id);

  return (
    <div>
      {
        isLoading
          ? <CircularProgress className="g-spiner" />
          : (
            <ProductPage
              pageData={productData}
              imageUrl={photoUrL}
              isLoading={isSaving}
              sendData={saveProduct}
            />
          ) 
      }
    </div>
  );
};

export default withRouter(EditProduct)
