import type { Customer } from "./customer.model";

interface Product {
  images?: string[];
  date?: string;
  _id?: string;
  price?: number;
  name?: string;
  quantity?: string;
  category?: Category;
  image?: string;
  sizes?: string[];
  size?: string;
  description?: string;
  user?: string;
  local_quantity?: number;
}

interface Category {
  _id?: string;
  name?: string;
}

interface Order {
  _id?: string;
  customer?: Customer;
  products?: Product[] | string[];
  // when placcing an order convert to products
  selected?: string[];
  quantities?: object;
  status?: "pending" | "delivered" | "failed";
}

export type { Product, Category, Order };
