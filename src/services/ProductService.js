import $axios from 'axios';
import StorageService from './StorageService';

const baseURL = 'https://cleverod-test.firebaseio.com/';

const url = {
  path: '/products/',
  postfix: '.json',
};

const axiosInstance = $axios.create({
  baseURL,
});

export default class PostService {
  static async parseProductsList(productsList) {
    const parsedProductList = [];
    const productsListIds = Object.keys(productsList);
    for (let i = 0; i < productsListIds.length; i++) {
      const id = productsListIds[i];
      const product = productsList[id];
      const photoUrL = await StorageService.getImage(product.photoUrL);
      parsedProductList.push({
        ...product,
        id,
        originPhotoUrl: product.photoUrL,
        photoUrL,
      });
    }
    return parsedProductList;
  }

  static async getProductsList() {
    const { data } = await axiosInstance.get(url.path + url.postfix);
    return await this.parseProductsList(data || {});
  }

  static async createProduct(data, image) {
    const photoUrL = await StorageService.loadImage(image);
    const productData = {
      ...data,
      photoUrL,
    };
    await axiosInstance.post(url.path + url.postfix, productData);
  }

  static async getProductById(id) {
    const { data } = await axiosInstance.get(url.path + id + url.postfix);
    const photoUrL = await StorageService.getImage(data.photoUrL);
    return {
      ...data,
      originPhotoUrl: data.photoUrL,
      photoUrL,
    };
  }

  static async updateProduct(data, id) {
    axiosInstance.patch(url.path + id + url.postfix, data)
  }

  static async removeProductById(id, originPhotoUrl) {
    if (originPhotoUrl) {
      StorageService.removeImage(originPhotoUrl);
    }
    await axiosInstance.delete(url.path + id + url.postfix);
  }
}
