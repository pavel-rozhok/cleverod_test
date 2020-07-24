import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductService from '../../../services/ProductService';

export const useProductList = () => {
  const history = useHistory();
  const [productList, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProductsList = async () => {
    try {
      setIsLoading(true);
      const products = await ProductService.getProductsList();
      setProduct(products);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id, originPhotoUrl) => {
    await ProductService.removeProductById(id, originPhotoUrl);
    getProductsList();
  };

  const openEditPage = (id) => {
    history.push(`/edit/${id}`);
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return {
    isLoading,
    productList,
    openEditPage,
    removeProduct,
  };
};
