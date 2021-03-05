import orderApi from "../api/order.api";
import type { Customer } from "../models/customer.model";
import type { Order, Product } from "../models/product.model";

const getIds = (products: Product[]): string[] =>
  products.map((product) => product._id);
const getQuantities = (products: Product[]): object => {
  let quantities = {};
  products.forEach((product) => {
    quantities[product._id] = product.local_quantity;
  });
  return quantities;
};

const placeOrder = async (products: Product[], customer: Customer) => {
  let order: Order = {
    customer,
    products: getIds(products),
    quantities: getQuantities(products),
  };

  try {
    let data = (await orderApi.placeOrder(order)).data;
    return data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

const getOrders = async () => {
  try {
    let data = (await orderApi.getOrders()).data;
    return data.orders;
  } catch (error) {
    if (error.response.data) throw error.response.data.errors;
    throw error;
  }
};

export { placeOrder, getOrders };
