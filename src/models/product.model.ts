import type { Customer } from "./customer.model";

interface Product {
  images?: string[];
  date?: string;
  _id?: string;
  price?: 400;
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
  products?: string[];
  quantities?: object;
}

export type { Product, Category, Order };
