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
  deleteCategory(id: string) {
    return Axios.delete(`${backend}/api/products/categories/${id}`, {
      headers: authHeader(),
    });
  },
  createCategory(name: string) {
    return Axios.post(
      `${backend}/api/products/categories`,
      { name },
      {
        headers: authHeader(),
      }
    );
  },
  editCategory(id: string, name: string) {
    return Axios.patch(
      `${backend}/api/products/categories/${id}`,
      { name },
      {
        headers: authHeader(),
      }
    );
  },
};
