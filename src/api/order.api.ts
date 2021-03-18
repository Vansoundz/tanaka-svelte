import Axios from "axios";
import { backend } from "../config";
import type { Order } from "../models/product.model";
import { authHeader } from "./auth.api";

export default {
  placeOrder(order: Order) {
    return Axios.post(`${backend}/api/orders`, order);
  },
  getOrders() {
    return Axios.get(`${backend}/api/orders`, { headers: authHeader() });
  },
  deleteOrder(id: string) {
    return Axios.delete(`${backend}/api/orders/${id}`, {
      headers: authHeader(),
    });
  },
};
