import Axios from "axios";

export default {
  getProducts() {
    return Axios.get(`https://tanaka-collection.herokuapp.com/api/products`);
  },
  getProduct(id: string) {
    return Axios.get(
      `https://tanaka-collection.herokuapp.com/api/products/${id}`
    );
  },
};
