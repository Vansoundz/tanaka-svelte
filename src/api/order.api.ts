import Axios from "axios";
import { backend } from "../config";
import type { Order } from "../models/product.model";

export default {
  placeOrder(order: Order) {
    return Axios.post(`${backend}/api/orders`, order);
  },
};
