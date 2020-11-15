import { writable } from "svelte/store";
import type { Category, Product } from "../models/product.model";

const createStore = () => {
  const { set, subscribe, update } = writable<{
    products: Product[];
    categories: Category[];
    loading: boolean;
  }>({
    products: [],
    categories: [],
    loading: true,
  });

  return {
    subscribe,
    initProducts: (products: Product[]) =>
      update((store) => ({
        ...store,
        products,
        loading: false,
      })),
    initCategories: (categories: Category[]) =>
      update((store) => ({
        ...store,
        categories,
        loading: false,
      })),
  };
};

export const productStore = createStore();
