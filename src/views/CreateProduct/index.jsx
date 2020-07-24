import React from 'react';

import ProductPage from '../../components/ProductPage';

import { useCreateProduct } from './hooks/useCreateProduct';

export default () => {
  const {
    sendData,
    isLoading,
  } = useCreateProduct();

  return (
    <ProductPage 
      sendData={sendData}
      isLoading={isLoading}
    />
  )
};
