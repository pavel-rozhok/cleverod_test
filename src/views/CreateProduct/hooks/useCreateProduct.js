import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductService from '../../../services/ProductService';

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const sendData = async (formData, image) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await ProductService.createProduct(formData, image);
      history.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendData,
    isLoading,
  };
};
