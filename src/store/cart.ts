import { writable } from "svelte/store";
import type { Product } from "../models/product.model";

const createStore = () => {
  const { set, subscribe, update } = writable<{
    products: Product[];
  }>({
    products: [],
  });

  return {
    subscribe,
    init: (products) => set({ products }),
    addToCart: (product: Product) =>
      update((store) => {
        let { products } = store;
        let p = products.find((pr) => pr._id === product._id);
        if (!p) {
          product.local_quantity = 1;
          products = [...products, product];
        } else
          products = products.map((pr) => {
            if (pr._id === product._id) {
              pr.local_quantity += 1;
            }
            return pr;
          });
        return {
          products,
        };
      }),
  };
};

export const cartStore = createStore();
