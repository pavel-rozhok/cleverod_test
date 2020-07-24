import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ProductService from '../../../services/ProductService';
import StorageService from '../../../services/StorageService';

export default (id) => {
  const [productData, setProductData] = useState({});
  const [photoUrL, setPhotoUrL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originPhotoUrl, setIriginalPhotoUrL] = useState('');
  const history = useHistory();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const product = await ProductService.getProductById(id);
      setProductData(product);
      setPhotoUrL(product.photoUrL);
      setIriginalPhotoUrL(product.originPhotoUrl);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProduct = async (formData, image) => {
    if (isSaving) return;
    let newImageUrl;

    try {
      setIsSaving(true);
      if (image && photoUrL) {
        newImageUrl = await StorageService.replaceImage(originPhotoUrl, image);
      } else if (image) {
        newImageUrl = await StorageService.loadImage(image);
      }
      const newProductData = { ...formData };

      if (newImageUrl) {
        newProductData.photoUrL = newImageUrl;
      }

      await ProductService.updateProduct(newProductData, id);

      setTimeout(() => {
        history.push('/');
      }, 2000);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return {
    productData,
    photoUrL,
    isLoading,
    isSaving,
    saveProduct,
  };
};
