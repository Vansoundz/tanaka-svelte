import Axios from "axios";
import { backend } from "../config";

export default {
  getProducts() {
    return Axios.get(`${backend}/api/products`);
  },
  getProduct(id: string) {
    return Axios.get(`${backend}/api/products/${id}`);
  },
  getCategories() {
    return Axios.get(`${backend}/api/products/categories`);
  },
  getProductsBycategory(id: string) {
    return Axios.get(`${backend}/api/products/categories/${id}`);
  },
};
