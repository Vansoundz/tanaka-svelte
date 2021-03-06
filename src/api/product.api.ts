import Axios from "axios";
import { backend } from "../config";
import { authHeader } from "./auth.api";

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
  createProduct(product: FormData) {
    return Axios.post(`${backend}/api/products`, product, {
      headers: authHeader(),
    });
  },
  editProduct(id: string, product: FormData) {
    return Axios.patch(`${backend}/api/products/${id}`, product, {
      headers: authHeader(),
    });
  },
  deleteProduct(id: string) {
    return Axios.delete(`${backend}/api/products/${id}`, {
      headers: authHeader(),
    });
  },
};
