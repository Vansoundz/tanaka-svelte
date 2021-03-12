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
        let p = products.find(
          (pr) => pr._id === product._id && pr.size === product.size
        );
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
    removeItem: (product: Product) =>
      update((store) => {
        let { products } = store;
        let p = products.find((pr) => pr._id === product._id);
        if (p) {
          if (p.local_quantity >= 2) {
            products = products.map((pr) => {
              if (pr._id === product._id) {
                pr.local_quantity -= 1;
              }
              return pr;
            });
          } else products = products.filter((pr) => pr._id !== product._id);

          return {
            products,
          };
        }
      }),
    deleteItem: (id: string) =>
      update((store) => {
        let { products } = store;
        products = products.filter((p) => p._id !== id);
        return {
          ...store,
          products,
        };
      }),
  };
};

export const cartStore = createStore();
