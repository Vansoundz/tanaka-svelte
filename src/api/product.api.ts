import Axios from "axios";

export default {
  getProducts() {
    return Axios.get(`http://localhost:5000/api/products`);
  },
  getProduct(id: string) {
    return Axios.get(`http://localhost:5000/api/products/${id}`);
  },
  getCategories() {
    return Axios.get(`http://localhost:5000/api/products/categories`);
  },
  getProductsBycategory(id: string) {
    return Axios.get(`http://localhost:5000/api/products/categories/${id}`);
  },
};
